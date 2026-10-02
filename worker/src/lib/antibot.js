/**
 * H2 · anti-bot para POST /api/contact (revisión de seguridad 2026-10-02).
 *
 * Rate limit por IP con KV (ventana fija):
 *   - Límite:  CONTACT_RATE_LIMIT        (default 5 envíos)
 *   - Ventana: CONTACT_RATE_WINDOW_SEC   (default 600 s = 10 min)
 *   - KV:      env.RATE_LIMIT_KV si existe; si no, env.ADMIN_KV.
 *   - Clave:   `rl:contact:<sha256(ip) 32 hex>:<n.º de ventana>` (la IP no se
 *              guarda en claro) con expirationTtl = ventana + 60 s.
 *   KV es eventualmente consistente: el límite es aproximado (puede dejar pasar
 *   algunos envíos de más en ráfagas concurrentes). Sin KV → no limita (falla
 *   abierto y deja un warning) para no perder leads reales.
 *
 * Tiempo mínimo de llenado: el frontend manda `formStartedAt` (epoch ms del
 * montaje del formulario). Se rechaza si falta, no es número, viene del
 * futuro, tiene más de 24 h o pasaron menos de CONTACT_MIN_FILL_MS (default
 * 3000 ms). Es una señal del cliente: frena bots simples, no a uno dirigido
 * (para eso, Turnstile — pendiente de decisión).
 */

export const RATE_LIMIT_PREFIX = 'rl:contact:';
export const DEFAULT_CONTACT_RATE_LIMIT = 5;
export const DEFAULT_CONTACT_RATE_WINDOW_SEC = 600;
export const DEFAULT_CONTACT_MIN_FILL_MS = 3000;
export const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;
const FUTURE_SKEW_MS = 5000;

function intFromEnv(value, fallback, min = 1) {
  const n = Number.parseInt(String(value ?? ''), 10);
  return Number.isFinite(n) && n >= min ? n : fallback;
}

export function clientIp(request) {
  const cf = request.headers.get('CF-Connecting-IP');
  if (cf) return cf.trim();
  const xff = request.headers.get('X-Forwarded-For');
  if (xff) return xff.split(',')[0].trim();
  return 'unknown';
}

async function hashIp(ip) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`vn-rl:${ip}`));
  return [...new Uint8Array(digest)]
    .slice(0, 16)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Cuenta este request y dice si la IP superó el límite.
 * @returns {Promise<{limited: boolean, retryAfter?: number, skipped?: boolean}>}
 */
export async function checkContactRateLimit(env, request, now = Date.now()) {
  const kv = env.RATE_LIMIT_KV || env.ADMIN_KV;
  if (!kv) {
    console.warn('[antibot] sin KV para rate limit (RATE_LIMIT_KV/ADMIN_KV): no se limita.');
    return { limited: false, skipped: true };
  }
  const limit = intFromEnv(env.CONTACT_RATE_LIMIT, DEFAULT_CONTACT_RATE_LIMIT);
  const windowSec = intFromEnv(env.CONTACT_RATE_WINDOW_SEC, DEFAULT_CONTACT_RATE_WINDOW_SEC, 60);
  const nowSec = Math.floor(now / 1000);
  const windowIdx = Math.floor(nowSec / windowSec);
  const retryAfter = Math.max(1, windowSec - (nowSec % windowSec));
  const key = `${RATE_LIMIT_PREFIX}${await hashIp(clientIp(request))}:${windowIdx}`;

  try {
    const count = Number.parseInt((await kv.get(key)) || '0', 10) || 0;
    if (count >= limit) return { limited: true, retryAfter };
    await kv.put(key, String(count + 1), { expirationTtl: windowSec + 60 });
  } catch (err) {
    console.warn('[antibot] rate limit KV error:', err?.message || err);
    return { limited: false, skipped: true };
  }
  return { limited: false };
}

/**
 * @returns {'ok' | 'missing' | 'invalid' | 'too_fast'}
 */
export function checkFillTime(formStartedAt, env = {}, now = Date.now()) {
  if (formStartedAt === undefined || formStartedAt === null || formStartedAt === '') {
    return 'missing';
  }
  const ts = typeof formStartedAt === 'number' ? formStartedAt : Number(formStartedAt);
  if (!Number.isFinite(ts)) return 'invalid';
  if (ts > now + FUTURE_SKEW_MS) return 'invalid';
  if (now - ts > MAX_FORM_AGE_MS) return 'invalid';
  const minFill = intFromEnv(env.CONTACT_MIN_FILL_MS, DEFAULT_CONTACT_MIN_FILL_MS, 0);
  if (now - ts < minFill) return 'too_fast';
  return 'ok';
}
