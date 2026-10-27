import { QR_POINTS } from '../qr-points.ts';
// Contador QR FRUTA · GET /q/:punto → 302 al Google Form, GET /q/stats (Bearer QR_STATS_TOKEN).
// Privacidad: no se guarda IP, UA, cookies ni se loguea el request. Conteo en ADMIN_KV
// (aproximado: KV no es atómico, escrituras simultáneas pueden perder incrementos).

export const QR_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfRpG5wLwm2jJp2AjCGsyFGFxyJEPWB4c0UBvwUSOerrEtjXg/viewform';

export const QR_PUNTOS = QR_POINTS;

// Prellenado futuro: claves `entry.<dígitos>` permitidas. Vacía por ahora → no se reenvía nada.
export const QR_PREFILL_ALLOWLIST = Object.freeze([]);

const REDIRECT_HEADERS = {
  'Cache-Control': 'no-store',
  'Referrer-Policy': 'no-referrer',
};

export function santiagoDate(now = new Date()) {
  // en-CA → YYYY-MM-DD
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Santiago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

export function buildFormUrl(url, allowlist = QR_PREFILL_ALLOWLIST) {
  const target = new URL(QR_FORM_URL);
  const p = url.searchParams.get('p');
  if (p && allowlist.length) {
    let parsed;
    try {
      parsed = new URLSearchParams(p);
    } catch {
      parsed = null;
    }
    if (parsed) {
      for (const [k, v] of parsed) {
        if (/^entry\.\d+$/.test(k) && allowlist.includes(k)) target.searchParams.set(k, v);
      }
    }
  }
  return target.toString();
}

async function incr(kv, key) {
  const cur = parseInt((await kv.get(key)) || '0', 10) || 0;
  await kv.put(key, String(cur + 1));
}

export async function countHit(env, punto, now = new Date()) {
  const kv = env.ADMIN_KV;
  if (!kv) return;
  await Promise.all([
    incr(kv, `qr:${punto}:${santiagoDate(now)}`),
    incr(kv, `qr:${punto}:total`),
  ]);
}

export function handleQrRedirect(request, env, ctx, punto) {
  if (!QR_PUNTOS.includes(punto)) {
    return new Response('Not found', { status: 404, headers: { 'Cache-Control': 'no-store' } });
  }
  const p = countHit(env, punto).catch(() => {});
  if (ctx && typeof ctx.waitUntil === 'function') ctx.waitUntil(p);
  const location = buildFormUrl(new URL(request.url));
  return new Response(null, { status: 302, headers: { Location: location, ...REDIRECT_HEADERS } });
}

function timingSafeEqual(a, b) {
  const enc = new TextEncoder();
  const x = enc.encode(a);
  const y = enc.encode(b);
  let diff = x.length ^ y.length;
  const len = Math.max(x.length, y.length);
  for (let i = 0; i < len; i++) diff |= (x[i % (x.length || 1)] || 0) ^ (y[i % (y.length || 1)] || 0);
  return diff === 0;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

export async function handleQrStats(request, env) {
  const noStore = { 'Cache-Control': 'no-store' };
  const secret = env.QR_STATS_TOKEN;
  if (!secret) return new Response('Unauthorized', { status: 401, headers: noStore });
  const auth = request.headers.get('Authorization') || '';
  const m = /^Bearer\s+(.+)$/.exec(auth);
  if (!m || !timingSafeEqual(m[1].trim(), secret)) {
    return new Response('Unauthorized', {
      status: 401,
      headers: { ...noStore, 'WWW-Authenticate': 'Bearer' },
    });
  }
  const kv = env.ADMIN_KV;
  const stats = {};
  for (const punto of QR_PUNTOS) stats[punto] = { total: 0, days: {} };
  if (kv) {
    let cursor;
    do {
      const res = await kv.list({ prefix: 'qr:', cursor });
      for (const { name } of res.keys) {
        const [, punto, day] = name.split(':');
        if (!stats[punto]) continue;
        const n = parseInt((await kv.get(name)) || '0', 10) || 0;
        if (day === 'total') stats[punto].total = n;
        else stats[punto].days[day] = n;
      }
      cursor = res.list_complete ? undefined : res.cursor;
    } while (cursor);
  }
  const url = new URL(request.url);
  const wantsHtml =
    url.searchParams.get('format') === 'html' ||
    (url.searchParams.get('format') !== 'json' &&
      (request.headers.get('Accept') || '').includes('text/html'));
  if (wantsHtml) {
    const rows = [];
    for (const [punto, s] of Object.entries(stats)) {
      for (const day of Object.keys(s.days).sort()) {
        rows.push(`<tr><td>${escapeHtml(punto)}</td><td>${escapeHtml(day)}</td><td>${s.days[day]}</td></tr>`);
      }
      rows.push(`<tr><th>${escapeHtml(punto)}</th><th>total</th><th>${s.total}</th></tr>`);
    }
    const html = `<!doctype html><meta charset="utf-8"><title>QR FRUTA</title><h1>QR FRUTA · conteo (aproximado)</h1><table border="1" cellpadding="4"><tr><th>punto</th><th>día (Santiago)</th><th>escaneos</th></tr>${rows.join('')}</table>`;
    return new Response(html, { status: 200, headers: { ...noStore, 'Content-Type': 'text/html; charset=utf-8' } });
  }
  return new Response(JSON.stringify({ ok: true, approximate: true, stats }), {
    status: 200,
    headers: { ...noStore, 'Content-Type': 'application/json' },
  });
}
