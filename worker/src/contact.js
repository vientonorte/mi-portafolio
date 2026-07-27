import { json } from './lib/cors.js';
import { buildAdminEmail, buildVisitorConfirmation } from './lib/email-templates.js';

const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 4000;
const DEFAULT_INBOX = 'gaete.gaona@gmail.com';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= MAX_EMAIL;
}

async function sendViaCloudflareEmail(env, message) {
  await env.EMAIL.send(message);
  return { ok: true };
}

async function sendViaFormSubmit(inbox, payload) {
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Referer: 'https://vientonorte.io/mi-portafolio/',
      Origin: 'https://vientonorte.io',
    },
    body: JSON.stringify({
      name: payload.safeName,
      email: payload.safeEmail,
      message: payload.safeMessage,
      _subject: payload.subject,
      _replyto: payload.safeEmail,
      _template: 'table',
    }),
  });

  if (!response.ok) return { ok: false, error: `formsubmit ${response.status}` };
  const data = await response.json().catch(() => ({}));
  if (data.success === 'true' || data.success === true) return { ok: true, channel: 'formsubmit' };
  const message = typeof data.message === 'string' ? data.message : 'formsubmit rejected';
  console.warn('[contact] formsubmit rejected:', message);
  if (/activation/i.test(message)) return { ok: false, error: 'pending_activation', message };
  return { ok: false, error: message };
}

async function deliverEmail(env, message) {
  if (env.EMAIL) {
    try {
      await sendViaCloudflareEmail(env, message);
      return { ok: true, channel: 'cloudflare' };
    } catch (err) {
      console.warn('[contact] cloudflare email failed:', err?.message || err);
    }
  }
  return { ok: false };
}

async function sendContactEmail(env, payload) {
  const adminMessage = {
    to: payload.inbox,
    from: { email: payload.fromEmail, name: payload.fromName },
    replyTo: { email: payload.safeEmail, name: payload.safeName },
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
  };

  // FormSubmit primero: dominio vientonorte.cl aún no está en Email Sending.
  const formsubmit = await sendViaFormSubmit(payload.inbox, payload);
  if (formsubmit.ok) return { ok: true, channel: 'formsubmit' };

  const sent = await deliverEmail(env, adminMessage);
  if (sent.ok) return { ok: true, channel: sent.channel };

  console.warn('[contact] all channels failed. formsubmit:', formsubmit.error);
  return formsubmit;
}

async function sendVisitorConfirmation(env, payload) {
  const confirmation = buildVisitorConfirmation({
    safeName: payload.safeName,
    publicFromEmail: payload.fromEmail,
    language: payload.language,
  });

  const message = {
    to: payload.safeEmail,
    from: { email: payload.fromEmail, name: payload.fromName },
    replyTo: { email: payload.fromEmail, name: payload.fromName },
    subject: confirmation.subject,
    text: confirmation.text,
    html: confirmation.html,
  };

  const sent = await deliverEmail(env, message);
  if (!sent.ok) {
    console.warn('[contact] visitor confirmation skipped (email sending unavailable)');
  }
}

export async function handleContact(request, env, cors) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'JSON inválido' }, 400, cors);
  }

  const { name, email, message, _gotcha, source, intent, consent, language } = body || {};
  if (_gotcha) return json({ ok: true }, 200, cors);

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return json({ ok: false, error: 'Nombre inválido' }, 400, cors);
  }
  if (!email || !isValidEmail(String(email).trim())) {
    return json({ ok: false, error: 'Email inválido' }, 400, cors);
  }
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return json({ ok: false, error: 'Mensaje demasiado corto' }, 400, cors);
  }
  if (consent !== true) {
    return json({ ok: false, error: 'Se requiere consentimiento de contacto' }, 400, cors);
  }

  const safeName = name.trim().slice(0, MAX_NAME);
  const safeEmail = String(email).trim().toLowerCase();
  const safeMessage = message.trim().slice(0, MAX_MESSAGE);
  const safeIntent = typeof intent === 'string' ? intent.trim().slice(0, 80) : '';
  const safeSource = typeof source === 'string' ? source.trim().slice(0, 40) : 'form';
  const safeLanguage = language === 'en' ? 'en' : 'es';

  const inbox = env.CONTACT_INBOX || DEFAULT_INBOX;
  const fromEmail = env.CONTACT_FROM || 'contacto@vientonorte.cl';
  const fromName = env.CONTACT_FROM_NAME || 'Rodrigo Gaete · Portfolio';
  const subject = safeIntent
    ? `Portfolio · ${safeIntent} · ${safeName}`
    : `Portfolio · mensaje de ${safeName}`;

  const { text, html } = buildAdminEmail({
    safeName,
    safeEmail,
    safeMessage,
    intent: safeIntent,
    source: safeSource,
    subject,
  });

  const sent = await sendContactEmail(env, {
    inbox,
    fromEmail,
    fromName,
    safeName,
    safeEmail,
    safeMessage,
    subject,
    text,
    html,
  });

  if (!sent.ok) {
    return json({ ok: false, error: 'No se pudo enviar el mensaje.' }, 502, cors);
  }

  await sendVisitorConfirmation(env, {
    safeName,
    safeEmail,
    fromEmail,
    fromName,
    language: safeLanguage,
  });

  return json({ ok: true }, 200, cors);
}