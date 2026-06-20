/**
 * mi-portafolio-contact — Relay de formulario sin exponer Gmail.
 * POST /api/contact → reenvía a CONTACT_INBOX (secreto) vía Cloudflare Email Sending.
 */

const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 4000;

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

function isAllowedOrigin(request, env) {
  const origin = request.headers.get('Origin') || '';
  const allowed = (env.ALLOWED_ORIGIN || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
    return origin;
  }
  if (allowed.includes(origin)) return origin;
  return null;
}

function json(data, status, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= MAX_EMAIL;
}

async function sendViaCloudflareEmail(env, payload) {
  await env.EMAIL.send({
    to: payload.inbox,
    from: { email: payload.fromEmail, name: payload.fromName },
    replyTo: { email: payload.safeEmail, name: payload.safeName },
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
  });
  return { ok: true };
}

/** Fallback cuando Email Sending del dominio aún no está activo */
async function sendViaFormSubmit(inbox, payload) {
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Referer: 'https://vientonorte.github.io/mi-portafolio/',
      Origin: 'https://vientonorte.github.io',
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

  if (!response.ok) {
    return { ok: false, error: `formsubmit ${response.status}` };
  }

  const data = await response.json().catch(() => ({}));
  if (data.success === 'true' || data.success === true) {
    return { ok: true };
  }
  const message = typeof data.message === 'string' ? data.message : 'formsubmit rejected';
  if (/activation/i.test(message)) {
    return { ok: false, error: 'pending_activation', message };
  }
  return { ok: false, error: message };
}

async function sendContactEmail(env, payload) {
  if (env.EMAIL) {
    try {
      await sendViaCloudflareEmail(env, payload);
      return { ok: true, channel: 'cloudflare' };
    } catch (err) {
      console.warn('[contact] cloudflare email failed, trying fallback:', err?.message || err);
    }
  }

  const fallback = await sendViaFormSubmit(payload.inbox, payload);
  if (fallback.ok) return { ok: true, channel: 'formsubmit' };
  return fallback;
}

export default {
  async fetch(request, env) {
    const origin = isAllowedOrigin(request, env);
    if (!origin) {
      return new Response('Forbidden', { status: 403 });
    }

    const cors = corsHeaders(origin);
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    if (url.pathname !== '/api/contact' || request.method !== 'POST') {
      return json({ ok: false, error: 'Not found' }, 404, cors);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ ok: false, error: 'JSON inválido' }, 400, cors);
    }

    const { name, email, message, _gotcha } = body || {};

    if (_gotcha) {
      return json({ ok: true }, 200, cors);
    }

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return json({ ok: false, error: 'Nombre inválido' }, 400, cors);
    }
    if (!email || !isValidEmail(String(email).trim())) {
      return json({ ok: false, error: 'Email inválido' }, 400, cors);
    }
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return json({ ok: false, error: 'Mensaje demasiado corto' }, 400, cors);
    }

    const safeName = name.trim().slice(0, MAX_NAME);
    const safeEmail = String(email).trim().toLowerCase();
    const safeMessage = message.trim().slice(0, MAX_MESSAGE);

    const inbox = env.CONTACT_INBOX;
    if (!inbox) {
      return json(
        { ok: false, error: 'Relay no configurado (CONTACT_INBOX)' },
        503,
        cors,
      );
    }

    const fromEmail = env.CONTACT_FROM || 'contacto@vientonorte.cl';
    const fromName = env.CONTACT_FROM_NAME || 'Portfolio Contact';

    const subject = `Portfolio · mensaje de ${safeName}`;
    const text = [
      'Nuevo mensaje desde el portafolio',
      '',
      `Nombre: ${safeName}`,
      `Email: ${safeEmail}`,
      '',
      safeMessage,
      '',
      `— Enviado vía mi-portafolio-contact (${new Date().toISOString()})`,
    ].join('\n');

    const html = `
      <p><strong>Nuevo mensaje desde el portafolio</strong></p>
      <p><strong>Nombre:</strong> ${escapeHtml(safeName)}<br>
         <strong>Email:</strong> <a href="mailto:${escapeHtml(safeEmail)}">${escapeHtml(safeEmail)}</a></p>
      <pre style="white-space:pre-wrap;font-family:system-ui,sans-serif">${escapeHtml(safeMessage)}</pre>
      <p style="color:#666;font-size:12px">Relay mi-portafolio-contact · ${new Date().toISOString()}</p>
    `;

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
      console.error('[contact] relay failed:', sent.error, sent.message || '');
      if (sent.error === 'pending_activation') {
        return json(
          {
            ok: false,
            error:
              'El relay de correo está pendiente de activación. Revisa tu bandeja de entrada y confirma el enlace de FormSubmit.',
          },
          503,
          cors,
        );
      }
      return json(
        {
          ok: false,
          error:
            'No se pudo enviar el mensaje. Usa el email público del sitio o LinkedIn.',
        },
        502,
        cors,
      );
    }

    return json({ ok: true }, 200, cors);
  },
};