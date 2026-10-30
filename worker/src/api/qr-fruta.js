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

// Valores de src/styles/vn-tokens.css (el worker no importa CSS del sitio).
const PAGE_CSS =
  ':root{--vn-naranja:#FF931E;--vn-naranja-700:#9E4F00;--vn-azul-noche:#0d1b3d;--vn-marfil:#f7f2e7;--vn-pizarra:#4a5568;' +
  "--vn-font-ui:'Inter',system-ui,-apple-system,BlinkMacSystemFont,sans-serif;--bg:#fff;--fg:var(--vn-azul-noche);--muted:var(--vn-pizarra);--line:#d9d4c7;--head:var(--vn-marfil)}" +
  'body{font-family:var(--vn-font-ui);margin:0;padding:16px;max-width:900px;margin-inline:auto;color:var(--fg);background:var(--bg);border-top:6px solid var(--vn-naranja)}' +
  'h1{font-size:1.25rem;margin:8px 0 4px}h2{font-size:1.05rem;margin:24px 0 8px}h3{font-size:1rem;margin:16px 0 6px}p.meta{color:var(--muted);font-size:.85rem;margin:0 0 12px}' +
  '.nota{border-left:4px solid var(--vn-naranja);background:var(--head);padding:8px 12px;font-size:.9rem;margin:0 0 16px}' +
  'table{width:100%;border-collapse:separate;border-spacing:0;font-size:.9rem}caption{text-align:left;font-weight:600;padding:0 0 6px}' +
  'th,td{padding:8px 6px;border-bottom:1px solid var(--line);text-align:left;white-space:nowrap}thead th{background:var(--head)}' +
  'td.n,th.n{text-align:right;font-variant-numeric:tabular-nums}.c{color:var(--muted);font-size:.8rem;display:block}' +
  'tbody th[scope=row]{font-weight:500}th.tot,td.tot{font-weight:700}tfoot th,tfoot td{font-weight:700;border-top:2px solid var(--fg)}' +
  '.wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;border:1px solid var(--line)}.wrap:focus{outline:3px solid var(--vn-naranja-700);outline-offset:2px}' +
  '.wrap th:first-child,.wrap td:first-child{position:sticky;left:0;background:var(--bg);z-index:1;box-shadow:1px 0 0 var(--line)}.wrap thead th:first-child{background:var(--head);z-index:2}' +
  '@media(prefers-color-scheme:dark){:root{--bg:#0d1b3d;--fg:#f7f2e7;--muted:#c9c3b5;--line:#2c3b60;--head:#16264d}.wrap:focus{outline-color:var(--vn-naranja)}}';

export const QR_GROUPS = Object.freeze([
  { id: 'ro', title: 'Puntos de Rö', match: (p) => p.who === 'Rö' },
  { id: 'jhordan', title: 'Puntos de Jhordan', match: (p) => p.who === 'Jhordan' },
  { id: 'otros', title: 'Otros', match: (p) => p.who !== 'Rö' && p.who !== 'Jhordan' },
]);

export const LAUNCH_TEST_DAY = '2026-10-27';

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
      who: p.who || null,
      total: Math.max(s.total, sumDays),
      days: s.days,
      drift: s.total - sumDays,
    };
  });
}

function dayLabel(d) {
  return d === LAUNCH_TEST_DAY ? `${d}*` : d;
}

function groupTable(group, pts, days) {
  const head = days.map((d) => `<th scope="col" class="n">${escapeHtml(dayLabel(d))}</th>`).join('');
  const rows = pts
    .map(
      (p) =>
        `<tr><th scope="row">${escapeHtml(p.label)}<span class="c">${escapeHtml(p.comuna)}</span></th>${days
          .map((d) => `<td class="n">${p.days[d] || 0}</td>`)
          .join('')}<td class="n tot">${p.total}</td></tr>`
    )
    .join('');
  const sum = pts.reduce((a, p) => a + p.total, 0);
  const foot = `<tr><th scope="row">Subtotal</th>${days
    .map((d) => `<td class="n">${pts.reduce((a, p) => a + (p.days[d] || 0), 0)}</td>`)
    .join('')}<td class="n tot">${sum}</td></tr>`;
  return `<section aria-labelledby="g-${group.id}"><h2 id="g-${group.id}">${escapeHtml(group.title)} · ${sum}</h2>
<div class="wrap" role="region" aria-labelledby="g-${group.id}" tabindex="0"><table><caption>${escapeHtml(group.title)}: escaneos por día (fecha Chile) y total</caption>
<thead><tr><th scope="col">Punto · comuna</th>${head}<th scope="col" class="n tot">Total</th></tr></thead><tbody>${rows}</tbody><tfoot>${foot}</tfoot></table></div></section>`;
}

export function renderStatsHtml(puntos, now = new Date()) {
  const days = [...new Set(puntos.flatMap((p) => Object.keys(p.days)))].sort();
  const totalAll = puntos.reduce((a, p) => a + p.total, 0);
  const sections = QR_GROUPS.map((g) => [g, puntos.filter(g.match)])
    .filter(([, pts]) => pts.length)
    .map(([g, pts]) => groupTable(g, pts, days))
    .join('\n');
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>QR FRUTA · conteo</title><style>${PAGE_CSS}</style></head><body>
<h1>QR FRUTA · escaneos</h1><p class="meta">actualizado a las ${santiagoTime(now)} CL · conteo aproximado · total ${totalAll}</p>
<p class="nota" id="nota-27"><strong>Nota:</strong> los conteos del ${LAUNCH_TEST_DAY} (marcado con *) son pruebas de lanzamiento, no escaneos de terreno.</p>
<p class="meta">Filas = puntos, columnas = días. En celular, desliza la tabla hacia el lado.</p>
${sections}
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
