import { json } from '../lib/cors.js';
import { createSessionCookie } from '../lib/session.js';

function timingSafeEqual(a, b) {
  const enc = new TextEncoder();
  const left = enc.encode(String(a));
  const right = enc.encode(String(b));
  if (left.length !== right.length) return false;
  let out = 0;
  for (let i = 0; i < left.length; i++) out |= left[i] ^ right[i];
  return out === 0;
}

export function handleBootstrapPage() {
  const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="robots" content="noindex">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>VN</title>
<style>
body{font:15px/1.45 system-ui,sans-serif;margin:0;background:#111;color:#eee;display:grid;place-items:center;min-height:100dvh}
form{width:min(22rem,92vw);display:grid;gap:12px}
input,button{min-height:44px;border-radius:8px;border:1px solid #444;padding:0 12px;font:inherit}
input{background:#1b1b1b;color:#fff}
button{background:#e85d26;color:#fff;border:0;font-weight:600}
p{color:#aaa;font-size:13px}
</style></head>
<body>
<form method="post" action="/api/admin/auth/bootstrap-form">
<p>Código de arranque (mail).</p>
<input type="password" name="code" autocomplete="one-time-code" required>
<button type="submit">Entrar</button>
</form>
</body></html>`;
  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex' },
  });
}

export async function handleBootstrapForm(request, env) {
  const form = await request.formData();
  const fake = new Request(request.url, {
    method: 'POST',
    headers: request.headers,
    body: JSON.stringify({ code: String(form.get('code') || '') }),
  });
  const res = await handleBootstrap(fake, env, {
    'Access-Control-Allow-Origin': 'https://vientonorte.io',
    'Access-Control-Allow-Credentials': 'true',
  });
  if (res.status !== 200) {
    return new Response('Código inválido. Vuelve atrás e intenta de nuevo.', {
      status: res.status,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
  const cookie = res.headers.get('Set-Cookie') || '';
  return new Response(null, {
    status: 302,
    headers: {
      Location: 'https://vientonorte.io/#/admin',
      'Set-Cookie': cookie,
    },
  });
}

export async function handleBootstrap(request, env, cors) {
  const expected = env.ADMIN_BOOTSTRAP_CODE;
  if (!expected) {
    return json({ ok: false, error: 'Bootstrap no configurado' }, 503, cors);
  }
  if (!env.SESSION_SECRET) {
    return json({ ok: false, error: 'SESSION_SECRET no configurado' }, 503, cors);
  }

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const rateKey = `bootstrap:rate:${ip}`;
  const hits = Number((await env.ADMIN_KV.get(rateKey)) || '0');
  if (hits >= 8) {
    return json({ ok: false, error: 'Demasiados intentos. Espera unos minutos.' }, 429, cors);
  }
  await env.ADMIN_KV.put(rateKey, String(hits + 1), { expirationTtl: 900 });

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'JSON inválido' }, 400, cors);
  }

  const code = typeof body.code === 'string' ? body.code.trim() : '';
  if (!code || !timingSafeEqual(code, expected)) {
    return json({ ok: false, error: 'Código inválido' }, 401, cors);
  }

  const login = env.ADMIN_GITHUB_USER || 'vientonorte';
  const cookie = await createSessionCookie(
    { login, name: login, avatar: '' },
    env
  );

  return json({ ok: true, user: login }, 200, {
    ...cors,
    'Set-Cookie': cookie,
  });
}
