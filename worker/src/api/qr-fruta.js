import { QR_POINTS, QR_POINT_DEFS } from '../qr-points.ts';
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

const STATS_HEADERS = {
  'Cache-Control': 'no-store',
  'Referrer-Policy': 'no-referrer',
  'X-Robots-Tag': 'noindex',
  'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'",
};

const PAGE_CSS =
  'body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;margin:0;padding:16px;max-width:720px;margin-inline:auto;color:#111;background:#fff}' +
  'h1{font-size:1.25rem;margin:0 0 4px}h2{font-size:1.05rem;margin:24px 0 8px}p.meta{color:#555;font-size:.85rem;margin:0 0 16px}' +
  'table{width:100%;border-collapse:collapse;font-size:.9rem}th,td{padding:8px 6px;border-bottom:1px solid #e5e5e5;text-align:left}' +
  'td.n,th.n{text-align:right;font-variant-numeric:tabular-nums}.c{color:#666;font-size:.8rem;display:block}' +
  '.wrap{overflow-x:auto}@media(prefers-color-scheme:dark){body{background:#111;color:#eee}th,td{border-color:#333}.c,p.meta{color:#aaa}}';

function unauthorized() {
  const html = `<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>401</title><style>${PAGE_CSS}</style><h1>No autorizado</h1>`;
  return new Response(html, {
    status: 401,
    headers: { ...STATS_HEADERS, 'Content-Type': 'text/html; charset=utf-8', 'WWW-Authenticate': 'Bearer' },
  });
}

function santiagoTime(now = new Date()) {
  return new Intl.DateTimeFormat('es-CL', {
    timeZone: 'America/Santiago',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(now);
}

/** Admin: Bearer QR_STATS_TOKEN · Vista: ?k=QR_VIEW_KEY. Secret sin cargar = no autoriza. */
export function statsAuth(request, env) {
  const url = new URL(request.url);
  const auth = request.headers.get('Authorization') || '';
  const m = /^Bearer\s+(.+)$/.exec(auth);
  if (m && env.QR_STATS_TOKEN && timingSafeEqual(m[1].trim(), env.QR_STATS_TOKEN)) return 'admin';
  const k = url.searchParams.get('k');
  if (k && env.QR_VIEW_KEY && timingSafeEqual(k, env.QR_VIEW_KEY)) return 'view';
  return null;
}

export async function readQrStats(env) {
  const kv = env.ADMIN_KV;
  const stats = {};
  for (const slug of QR_PUNTOS) stats[slug] = { total: 0, days: {} };
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
  // KV no es atómico (get+put, lecturas cacheadas en el edge hasta ~60 s): un hit concurrente
  // puede perder el incremento de la clave día o de la total por separado (caso facebook 29-oct:
  // total 5, día 4). Ambas solo pueden quedar cortas, así que el valor más cercano al real es el
  // máximo entre la total guardada y la suma de días. Se expone el desfase en `drift`.
  return QR_POINT_DEFS.map((p) => {
    const s = stats[p.slug];
    const sumDays = Object.values(s.days).reduce((a, n) => a + n, 0);
    return {
      slug: p.slug,
      label: p.label,
      comuna: p.comuna,
      total: Math.max(s.total, sumDays),
      days: s.days,
      drift: s.total - sumDays,
    };
  });
}

export function renderStatsHtml(puntos, now = new Date()) {
  const days = [...new Set(puntos.flatMap((p) => Object.keys(p.days)))].sort().reverse();
  const totalAll = puntos.reduce((a, p) => a + p.total, 0);
  const totRows = puntos
    .map(
      (p) =>
        `<tr><td>${escapeHtml(p.label)}<span class="c">${escapeHtml(p.comuna)}</span></td><td class="n">${p.total}</td></tr>`
    )
    .join('');
  const dayHead = puntos.map((p) => `<th class="n" title="${escapeHtml(p.comuna)}">${escapeHtml(p.label)}</th>`).join('');
  const dayRows = days
    .map(
      (d) =>
        `<tr><td>${escapeHtml(d)}</td>${puntos.map((p) => `<td class="n">${p.days[d] || 0}</td>`).join('')}</tr>`
    )
    .join('');
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>QR FRUTA · conteo</title><style>${PAGE_CSS}</style></head><body>
<h1>QR FRUTA · escaneos</h1><p class="meta">actualizado a las ${santiagoTime(now)} CL · conteo aproximado · total ${totalAll}</p>
<h2>Total por punto</h2><table><thead><tr><th>Punto · comuna</th><th class="n">Total</th></tr></thead><tbody>${totRows}</tbody></table>
<h2>Por día (fecha Chile)</h2><div class="wrap"><table><thead><tr><th>Día</th>${dayHead}</tr></thead><tbody>${dayRows || `<tr><td colspan="${puntos.length + 1}">Sin escaneos aún</td></tr>`}</tbody></table></div>
</body></html>`;
}

export async function handleQrStats(request, env) {
  const who = statsAuth(request, env);
  if (!who) return unauthorized();
  const puntos = await readQrStats(env);
  const url = new URL(request.url);
  const format = url.searchParams.get('format');
  const accept = request.headers.get('Accept') || '';
  // Vista (?k=) → HTML por defecto; admin (Bearer) → JSON por defecto (compat).
  const wantsHtml =
    format === 'html' || (format !== 'json' && (who === 'view' || accept.includes('text/html')));
  if (wantsHtml) {
    return new Response(renderStatsHtml(puntos), {
      status: 200,
      headers: { ...STATS_HEADERS, 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
  const stats = Object.fromEntries(puntos.map((p) => [p.slug, p]));
  return new Response(
    JSON.stringify({ ok: true, approximate: true, updatedAt: new Date().toISOString(), puntos, stats }),
    { status: 200, headers: { ...STATS_HEADERS, 'Content-Type': 'application/json' } }
  );
}
