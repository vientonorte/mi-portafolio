import { json } from '../lib/cors.js';
import { getCases, getCompany, getServices } from '../data/catalog.js';
import { SKILLS_CATALOG, getSkill, getSkills } from '../data/skills.js';
import { listRecords, newId, nowIso, prependRecord, updateRecord } from '../lib/store.js';
import { notifyInbox, notifyVisitor } from '../lib/notify.js';
import { ga4MpConfigured, sendGa4MpEvent } from '../lib/ga4-mp.js';
import { buildKickoffBookingConfirmation } from '../lib/email-templates.js';

const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 4000;
const MAX_TEXT = 2000;

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= MAX_EMAIL;
}

function calendarUrl(env) {
  return (
    env.CALENDAR_BOOKING_URL ||
    env.A11Y_FREE_SCHEDULE_URL ||
    'https://vientonorte.io/#/contacto'
  );
}

/**
 * Comparación en tiempo constante para evitar timing attacks al validar el
 * secreto del puente Calendar → Worker.
 */
function timingSafeStringEqual(a, b) {
  const bufA = new TextEncoder().encode(a);
  const bufB = new TextEncoder().encode(b);
  // Longitud distinta: igual recorremos el máximo largo para no filtrar
  // la longitud real por timing, y forzamos resultado falso al final.
  const maxLength = Math.max(bufA.length, bufB.length, 1);
  let diff = bufA.length === bufB.length ? 0 : 1;
  for (let i = 0; i < maxLength; i += 1) {
    const byteA = i < bufA.length ? bufA[i] : 0;
    const byteB = i < bufB.length ? bufB[i] : 0;
    diff |= byteA ^ byteB;
  }
  return diff === 0;
}

/**
 * `eventId` solo lo envía el puente Calendar → Worker (Apps Script) cuando el
 * evento ya está confirmado en Google Calendar — a diferencia del registro de
 * click desde el front (sin `eventId`, ver `recordBookingIntent`). Si hay un
 * secreto configurado, exigimos el header para evitar bookings falsos con
 * `eventId` inventado. Sin secreto configurado (aún no aprovisionado) se deja
 * pasar para no romper el flujo mientras se habilita el puente.
 */
function isTrustedBookingWebhook(request, env) {
  const expected = env.VN_BOOKING_WEBHOOK_KEY;
  if (!expected) return true;
  const header = request.headers.get('X-VN-BOOKING-KEY') || '';
  return timingSafeStringEqual(header, expected);
}

export function handleHealth(env, cors) {
  return json(
    {
      ok: true,
      service: 'vientonorte-api',
      time: nowIso(),
      kv: Boolean(env.ADMIN_KV),
      ga4Mp: ga4MpConfigured(env),
    },
    200,
    cors
  );
}

export function handleGetServices(cors) {
  return json({ ok: true, services: getServices() }, 200, cors);
}

export function handleGetCases(cors) {
  return json({ ok: true, cases: getCases() }, 200, cors);
}

export function handleGetCompany(cors) {
  return json({ ok: true, company: getCompany() }, 200, cors);
}

export async function handleGetSkills(env, cors, kind) {
  const fromKv = env.ADMIN_KV ? await listRecords(env, 'skills') : [];
  const skills = fromKv.length ? fromKv : getSkills(kind);
  return json(
    {
      ok: true,
      source: fromKv.length ? 'kv' : 'catalog',
      hosted: SKILLS_CATALOG.hosted,
      metodo_ro: SKILLS_CATALOG.metodo_ro,
      skills,
    },
    200,
    cors
  );
}

export function handleGetSkill(id, cors) {
  const skill = getSkill(id);
  if (!skill) return json({ ok: false, error: 'skill no encontrada' }, 404, cors);
  return json({ ok: true, skill, metodo_ro: SKILLS_CATALOG.metodo_ro }, 200, cors);
}

export async function persistLead(env, fields) {
  const record = {
    id: newId('lead'),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    status: 'nuevo',
    name: fields.name,
    email: fields.email,
    message: fields.message,
    intent: fields.intent || '',
    source: fields.source || 'form',
    language: fields.language || 'es',
    channel: fields.channel || 'api',
  };
  await prependRecord(env, 'leads', record);
  return record;
}

async function upsertLeadFromBooking(env, booking) {
  const email = typeof booking.email === 'string' ? booking.email.trim().toLowerCase() : '';
  if (!isValidEmail(email)) return null;
  const leads = await listRecords(env, 'leads');
  const existing = leads.find(
    (item) =>
      item.email === email &&
      (item.eventId === booking.eventId || item.source === 'calendar')
  );
  const message = [
    booking.startAt ? `Cita: ${booking.startAt}` : null,
    booking.phone ? `Tel: ${booking.phone}` : null,
    booking.website ? `Sitio a revisar: ${booking.website}` : null,
    booking.notes || null,
    'Siguiente: informe WCAG de un flujo → walkthrough en la cita.',
  ]
    .filter(Boolean)
    .join('\n');
  if (existing) {
    return updateRecord(env, 'leads', existing.id, {
      name: booking.name || existing.name,
      phone: booking.phone || existing.phone,
      website: booking.website || existing.website,
      startAt: booking.startAt || existing.startAt,
      eventId: booking.eventId || existing.eventId,
      message,
      updatedAt: nowIso(),
    });
  }
  return persistLead(env, {
    name: booking.name || email,
    email,
    message,
    intent: booking.intent || 'radar-free',
    source: 'calendar',
    language: 'es',
    channel: 'calendar',
  }).then(async (lead) => {
    await updateRecord(env, 'leads', lead.id, {
      phone: booking.phone || '',
      website: booking.website || '',
      startAt: booking.startAt || '',
      eventId: booking.eventId || '',
    });
    return lead;
  });
}

export async function handleCreateLead(request, env, cors, { persistOnly = false } = {}) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'JSON inválido' }, 400, cors);
  }

  if (body?._gotcha) return json({ ok: true }, 200, cors);

  const name = typeof body.name === 'string' ? body.name.trim().slice(0, MAX_NAME) : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, MAX_MESSAGE) : '';
  const intent = typeof body.intent === 'string' ? body.intent.trim().slice(0, 80) : '';
  const source = typeof body.source === 'string' ? body.source.trim().slice(0, 40) : 'api';
  const language = body.language === 'en' ? 'en' : 'es';

  if (name.length < 2) return json({ ok: false, error: 'Nombre inválido' }, 400, cors);
  if (!isValidEmail(email)) return json({ ok: false, error: 'Email inválido' }, 400, cors);
  if (message.length < 10) return json({ ok: false, error: 'Mensaje demasiado corto' }, 400, cors);
  if (body.consent !== true && !persistOnly) {
    return json({ ok: false, error: 'Se requiere consentimiento de contacto' }, 400, cors);
  }

  const record = await persistLead(env, {
    name,
    email,
    message,
    intent,
    source,
    language,
    channel: 'leads',
  });

  const packageId =
    typeof body.packageId === 'string' ? body.packageId.trim().slice(0, 40) : '';
  await sendGa4MpEvent(env, {
    eventName: 'generate_lead',
    params: {
      lead_type: intent || 'form',
      channel: 'leads',
      package_id: packageId,
    },
  });

  return json({ ok: true, lead: { id: record.id, status: record.status } }, 201, cors);
}

export async function handleCreateBooking(request, env, cors) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'JSON inválido' }, 400, cors);
  }

  const nameRaw = typeof body.name === 'string' ? body.name.trim().slice(0, MAX_NAME) : '';
  const emailRaw = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const notes = typeof body.notes === 'string' ? body.notes.trim().slice(0, MAX_TEXT) : '';
  const intent = typeof body.intent === 'string' ? body.intent.trim().slice(0, 80) : 'kickoff';
  const origin = typeof body.origin === 'string' ? body.origin.trim().slice(0, 80) : '';
  const packageId =
    typeof body.packageId === 'string'
      ? body.packageId.trim().slice(0, 40)
      : typeof body.package_id === 'string'
        ? body.package_id.trim().slice(0, 40)
        : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim().slice(0, 40) : '';
  const website = typeof body.website === 'string' ? body.website.trim().slice(0, 400) : '';
  const startAt = typeof body.startAt === 'string' ? body.startAt.trim().slice(0, 40) : '';
  const eventId = typeof body.eventId === 'string' ? body.eventId.trim().slice(0, 120) : '';
  const htmlLink = typeof body.htmlLink === 'string' ? body.htmlLink.trim().slice(0, 500) : '';

  const name = nameRaw.length >= 2 ? nameRaw : 'Agenda abierta';
  const email = isValidEmail(emailRaw) ? emailRaw : '';
  const url = calendarUrl(env);

  if (eventId && !isTrustedBookingWebhook(request, env)) {
    return json({ ok: false, error: 'No autorizado' }, 401, cors);
  }

  if (eventId) {
    const existing = await listRecords(env, 'bookings');
    const dup = existing.find((item) => item.eventId === eventId);
    if (dup) {
      const merged = {
        phone: phone || dup.phone || '',
        website: website || dup.website || '',
        startAt: startAt || dup.startAt || '',
        notes: notes || dup.notes || '',
        name: nameRaw.length >= 2 ? name : dup.name,
        email: email || dup.email || '',
        calendarUrl: htmlLink || dup.calendarUrl || url,
        updatedAt: nowIso(),
      };
      const updated = await updateRecord(env, 'bookings', dup.id, merged);
      await upsertLeadFromBooking(env, { ...dup, ...merged, intent, origin });
      await sendGa4MpEvent(env, {
        eventName: 'book_call',
        params: {
          origin,
          intent,
          package_id: packageId,
        },
      });
      return json({ ok: true, booking: updated, deduped: true }, 200, cors);
    }
  }

  const record = {
    id: newId('book'),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    status: email ? 'pendiente' : 'abierto',
    name,
    email,
    phone,
    website,
    notes,
    intent,
    origin,
    startAt,
    eventId,
    calendarUrl: htmlLink || url,
  };
  await prependRecord(env, 'bookings', record);
  await upsertLeadFromBooking(env, record);
  await sendGa4MpEvent(env, {
    eventName: 'book_call',
    params: {
      origin,
      intent,
      package_id: packageId,
    },
  });

  const subject = email
    ? `VN · agenda · ${name}${startAt ? ` · ${startAt}` : ''}`
    : `VN · alguien abrió la agenda${origin ? ` · ${origin}` : ''}`;
  const text = [
    'Registro automático de agenda · vientonorte.io',
    '',
    `Nombre: ${name}`,
    `Email: ${email || '(aún no)'}`,
    phone ? `Tel: ${phone}` : null,
    website ? `Sitio: ${website}` : null,
    startAt ? `Slot: ${startAt}` : null,
    origin ? `Origen: ${origin}` : null,
    intent ? `Intent: ${intent}` : null,
    notes ? `Notas: ${notes}` : null,
    htmlLink || url,
    '',
    `Admin: https://vientonorte.io/#/admin`,
  ]
    .filter(Boolean)
    .join('\n');

  const mailed = await notifyInbox(env, {
    subject,
    text,
    replyTo: email || undefined,
    replyName: name,
  });

  if (email) {
    const isKickoffFunnel = origin === 'ads-a11y-landing';
    const visitorEmail = isKickoffFunnel
      ? buildKickoffBookingConfirmation({
          safeName: name,
          startAt,
          calendarUrl: htmlLink || url,
        })
      : {
          subject: 'Tu cita con Viento Norte está registrada',
          text: [
            `Hola ${name},`,
            '',
            'Quedó registrada tu agenda con Viento Norte.',
            startAt ? `Horario: ${startAt}` : 'Te confirmamos el horario en Google Calendar.',
            website ? `Sitio a revisar: ${website}` : null,
            '',
            'En la cita recorremos el informe WCAG del flujo que nos pasaste.',
            htmlLink || url,
            '',
            '— Viento Norte · vientonorte.io',
          ]
            .filter(Boolean)
            .join('\n'),
          html: `<p>Hola ${name},</p><p>Quedó registrada tu agenda con Viento Norte.</p>${
            startAt ? `<p>Horario: ${startAt}</p>` : ''
          }<p><a href="${htmlLink || url}">Abrir Calendar</a></p><p>— Viento Norte</p>`,
        };
    await notifyVisitor(env, {
      to: email,
      name,
      subject: visitorEmail.subject,
      text: visitorEmail.text,
      html: visitorEmail.html,
    });
  }

  return json(
    {
      ok: true,
      booking: { id: record.id, status: record.status, calendarUrl: record.calendarUrl },
      emailed: mailed.ok,
    },
    201,
    cors
  );
}

export async function handleCreateDiagnostico(request, env, cors) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'JSON inválido' }, 400, cors);
  }

  const name = typeof body.name === 'string' ? body.name.trim().slice(0, MAX_NAME) : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const company = typeof body.company === 'string' ? body.company.trim().slice(0, MAX_NAME) : '';
  const url = typeof body.url === 'string' ? body.url.trim().slice(0, 400) : '';
  const friction = typeof body.friction === 'string' ? body.friction.trim().slice(0, MAX_TEXT) : '';

  if (name.length < 2) return json({ ok: false, error: 'Nombre inválido' }, 400, cors);
  if (!isValidEmail(email)) return json({ ok: false, error: 'Email inválido' }, 400, cors);
  if (friction.length < 10) {
    return json({ ok: false, error: 'Describe la fricción (mín. 10 caracteres)' }, 400, cors);
  }

  const summary = {
    es: `Diagnóstico recibido. Eje sugerido: ${suggestAxis(friction)}. Próximo paso: call de 30 min para cerrar alcance (Radar / Marco / Ops).`,
    en: `Diagnostic received. Suggested axis: ${suggestAxis(friction)}. Next step: 30-min call to lock scope (Radar / Marco / Ops).`,
  };

  const record = {
    id: newId('dx'),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    status: 'nuevo',
    name,
    email,
    company,
    url,
    friction,
    response: summary,
  };
  await prependRecord(env, 'diagnosticos', record);

  return json(
    {
      ok: true,
      diagnostico: { id: record.id, status: record.status, response: summary },
    },
    201,
    cors
  );
}

function suggestAxis(text) {
  const t = text.toLowerCase();
  if (/token|design system|componente|wcag|a11y|handoff/.test(t)) return 'design-systems';
  if (/dato|analytics|ia|ai|research|métrica|metric/.test(t)) return 'research-ai';
  return 'interfaces';
}
