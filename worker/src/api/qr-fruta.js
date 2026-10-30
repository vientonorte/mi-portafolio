import { QR_POINTS, QR_POINT_DEFS } from '../qr-points.ts';
import { splitCounts, exclusionFor, labelFor, QR_RELABEL_FROM } from './qr-exclusions.js';
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
  'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'",
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

export const NAV_CSS =
  '.skip{position:absolute;left:-9999px;top:0;background:var(--vn-azul-noche);color:#fff;padding:12px 16px;z-index:9}.skip:focus{left:8px;top:8px}' +
  'a{color:inherit;text-decoration:underline;text-underline-offset:3px}a:focus-visible,main:focus-visible{outline:3px solid var(--vn-naranja-700);outline-offset:2px}' +
  'header nav{font-size:.9rem;padding:4px 0}dl.tot{display:flex;flex-wrap:wrap;gap:12px;margin:0 0 12px}dl.tot div{border:1px solid var(--line);padding:6px 10px}dt{font-size:.8rem;color:var(--muted)}dd{margin:0;font-weight:700;font-size:1.1rem}';

export function renderHome() {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Viento Norte · contacto</title><style>${PAGE_CSS}${NAV_CSS}</style></head><body>
<a class="skip" href="#contenido">Saltar al contenido</a>
<header><nav aria-label="Principal"><a href="https://vientonorte.io/">vientonorte.io</a> · <a href="/q/stats">Contador QR FRUTA</a></nav></header>
<main id="contenido" tabindex="-1"><h1>Viento Norte · servicio de contacto</h1>
<p>Este dominio recibe formularios y QR de Viento Norte.</p>
<p><a href="/q/stats">Ver el contador QR FRUTA</a> <span class="meta">(pide clave, solo lectura)</span></p></main>
</body></html>`;
}

export const QR_GROUPS = Object.freeze([
  { id: 'ro', title: 'Puntos de Rö', match: (p) => p.who === 'Rö' },
  { id: 'jhordan', title: 'Puntos de Jhordan', match: (p) => p.who === 'Jhordan' },
  { id: 'otros', title: 'Otros', match: (p) => p.who !== 'Rö' && p.who !== 'Jhordan' },
]);

export const LAUNCH_TEST_DAY = '2026-10-27';

/** Cliente API (Bearer o Accept JSON) → JSON 401. Navegador → formulario de clave (GET ?k=), status 401. Nunca se guarda ni se registra k. */
function unauthorized(request) {
  const accept = request.headers.get('Accept') || '';
  const isApi =
    request.headers.has('Authorization') || (accept.includes('application/json') && !accept.includes('text/html'));
  if (isApi) {
    return new Response(JSON.stringify({ ok: false, error: 'unauthorized' }), {
      status: 401,
      headers: { ...STATS_HEADERS, 'Content-Type': 'application/json', 'WWW-Authenticate': 'Bearer' },
    });
  }
  return new Response(renderKeyForm(new URL(request.url).searchParams.has('k')), {
    status: 401,
    headers: { ...STATS_HEADERS, 'Content-Type': 'text/html; charset=utf-8', 'WWW-Authenticate': 'Bearer' },
  });
}

const FORM_CSS =
  'form{display:grid;gap:8px;max-width:360px}label{font-weight:600}' +
  'input{font:inherit;min-height:48px;padding:0 12px;border:1px solid var(--vn-pizarra);border-radius:12px;box-sizing:border-box;width:100%}' +
  'button{font:inherit;font-weight:700;min-height:48px;border:0;border-radius:100px;background:var(--vn-naranja);color:var(--vn-azul-noche);cursor:pointer}' +
  'input:focus-visible,button:focus-visible{outline:3px solid var(--vn-naranja-700);outline-offset:2px}' +
  '.err{color:#c2330f;font-weight:600;margin:0}';

export function renderKeyForm(wrongKey = false) {
  const err = wrongKey
    ? '<p id="qr-err" class="err" role="alert">⚠ Esa clave no sirve. Revisa y vuelve a intentar.</p>'
    : '';
  const described = wrongKey ? 'qr-help qr-err' : 'qr-help';
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><meta name="referrer" content="no-referrer"><title>QR FRUTA · clave</title><style>${PAGE_CSS}${FORM_CSS}</style></head><body>
<main><h1>Contador QR</h1>
<p id="qr-help" class="meta">Escribe la clave del contador. Solo lectura.</p>
${err}<form method="get" action="/q/stats">
<label for="k">Clave del contador</label>
<input id="k" name="k" type="password" autocomplete="current-password" required autofocus aria-describedby="${described}"${wrongKey ? ' aria-invalid="true"' : ''}>
<button type="submit">Ver conteo</button>
</form></main>
</body></html>`;
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
  }).map((p) => ({ ...p, ...splitCounts(p) }));
}



function cellMark(slug, d) {
  const e = exclusionFor(slug, d);
  if (!e) return '';
  return e.status === 'prueba' ? ' <abbr title="prueba">P</abbr>' : ' <abbr title="por confirmar">?</abbr>';
}

function dayLabel(d) {
  return d === LAUNCH_TEST_DAY ? `${d} (prueba)` : d;
}

function groupTable(group, pts, days, today) {
  const head = days.map((d) => `<th scope="col" class="n">${escapeHtml(dayLabel(d))}</th>`).join('');
  const rows = pts
    .map(
      (p) =>
        `<tr><th scope="row">${escapeHtml(labelFor(p, today).label)}<span class="c">${escapeHtml(
          labelFor(p, today).before ? `antes: ${labelFor(p, today).before}` : p.comuna
        )}</span></th>${days
          .map((d) => `<td class="n">${p.days[d] || 0}${p.days[d] ? cellMark(p.slug, d) : ''}</td>`)
          .join('')}<td class="n tot">${p.real}</td><td class="n">${p.total}</td></tr>`
    )
    .join('');
  const sum = pts.reduce((a, p) => a + p.real, 0);
  const sumAll = pts.reduce((a, p) => a + p.total, 0);
  const foot = `<tr><th scope="row">Subtotal</th>${days
    .map((d) => `<td class="n">${pts.reduce((a, p) => a + (p.days[d] || 0), 0)}</td>`)
    .join('')}<td class="n tot">${sum}</td><td class="n">${sumAll}</td></tr>`;
  return `<section aria-labelledby="g-${group.id}"><h2 id="g-${group.id}">${escapeHtml(group.title)} · real ${sum} · con pruebas ${sumAll}</h2>
<div class="wrap" role="region" aria-labelledby="g-${group.id}" tabindex="0"><table><caption>${escapeHtml(group.title)}: escaneos por día (fecha Chile) y total</caption>
<thead><tr><th scope="col">Punto · comuna</th>${head}<th scope="col" class="n tot">Total real</th><th scope="col" class="n">Total con pruebas</th></tr></thead><tbody>${rows}</tbody><tfoot>${foot}</tfoot></table></div></section>`;
}

export function renderStatsHtml(input, now = new Date()) {
  const puntos = input.map((p) => (p.real === undefined ? { ...p, ...splitCounts(p) } : p));
  const today = santiagoDate(now);
  const days = [...new Set(puntos.flatMap((p) => Object.keys(p.days)))].sort();
  const totalAll = puntos.reduce((a, p) => a + p.total, 0);
  const totalReal = puntos.reduce((a, p) => a + p.real, 0);
  const totalPrueba = puntos.reduce((a, p) => a + p.prueba, 0);
  const totalPc = puntos.reduce((a, p) => a + p.porConfirmar, 0);
  const sections = QR_GROUPS.map((g) => [g, puntos.filter(g.match)])
    .filter(([, pts]) => pts.length)
    .map(([g, pts]) => groupTable(g, pts, days, today))
    .join('\n');
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>QR FRUTA · conteo</title><style>${PAGE_CSS}${NAV_CSS}</style></head><body>
<a class="skip" href="#contenido">Saltar al conteo</a>
<header><nav aria-label="Principal"><a href="/">Inicio</a> · <a href="/q/stats" aria-current="page">Contador QR</a></nav></header>
<main id="contenido" tabindex="-1">
<h1>QR FRUTA · escaneos</h1><p class="meta">actualizado a las ${santiagoTime(now)} CL · conteo aproximado</p>
<dl class="tot" aria-label="Totales">
<div><dt>Total real</dt><dd id="total-real">${totalReal}</dd></div>
<div><dt>Total con pruebas</dt><dd id="total-con-pruebas">${totalAll}</dd></div>
<div><dt>Pruebas</dt><dd>${totalPrueba}</dd></div>
<div><dt>Por confirmar</dt><dd id="total-por-confirmar">${totalPc}</dd></div>
</dl>
<p class="nota" id="nota-27"><strong>Nota:</strong> el ${LAUNCH_TEST_DAY} completo es prueba de lanzamiento (P). El 29-oct en los puntos nuevos y en Facebook queda «por confirmar» (?): mezcla el smoke del TL, las aperturas al pegar afiches y pruebas. No entra al total real.</p>
<p class="meta">Desde el ${QR_RELABEL_FROM}, los códigos nuevos marcan el lugar donde se pegan (debajo dice el nombre anterior).</p>
<p class="meta">Filas = puntos, columnas = días. En celular, desliza la tabla hacia el lado.</p>
${sections}
</main>
</body></html>`;
}

export async function handleQrStats(request, env) {
  const who = statsAuth(request, env);
  if (!who) return unauthorized(request);
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
