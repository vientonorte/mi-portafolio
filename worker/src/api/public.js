import { json } from '../lib/cors.js';
import { getCases, getCompany, getServices } from '../data/catalog.js';
import { newId, nowIso, prependRecord } from '../lib/store.js';

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

export function handleHealth(env, cors) {
  return json(
    {
      ok: true,
      service: 'vientonorte-api',
      time: nowIso(),
      kv: Boolean(env.ADMIN_KV),
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

  return json({ ok: true, lead: { id: record.id, status: record.status } }, 201, cors);
}

export async function handleCreateBooking(request, env, cors) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'JSON inválido' }, 400, cors);
  }

  const name = typeof body.name === 'string' ? body.name.trim().slice(0, MAX_NAME) : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const notes = typeof body.notes === 'string' ? body.notes.trim().slice(0, MAX_TEXT) : '';
  const intent = typeof body.intent === 'string' ? body.intent.trim().slice(0, 80) : 'kickoff';

  if (name.length < 2) return json({ ok: false, error: 'Nombre inválido' }, 400, cors);
  if (!isValidEmail(email)) return json({ ok: false, error: 'Email inválido' }, 400, cors);

  const url = calendarUrl(env);
  const record = {
    id: newId('book'),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    status: 'pendiente',
    name,
    email,
    notes,
    intent,
    calendarUrl: url,
  };
  await prependRecord(env, 'bookings', record);

  return json(
    {
      ok: true,
      booking: { id: record.id, status: record.status, calendarUrl: url, minutes: 30 },
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
