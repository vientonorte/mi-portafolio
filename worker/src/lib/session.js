const COOKIE_NAME = 'vn_admin_session';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 días

function toBase64Url(bytes) {
  const bin = String.fromCharCode(...bytes);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(str) {
  const pad = '='.repeat((4 - (str.length % 4)) % 4);
  const base64 = (str + pad).replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(base64);
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

async function sign(payload, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return toBase64Url(new Uint8Array(sig));
}

async function verify(payload, signature, secret) {
  const expected = await sign(payload, secret);
  return expected === signature;
}

export async function createSessionCookie(user, env) {
  const secret = env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET no configurado');

  const exp = Date.now() + MAX_AGE * 1000;
  const payload = JSON.stringify({ user, exp });
  const payloadB64 = toBase64Url(new TextEncoder().encode(payload));
  const sig = await sign(payloadB64, secret);
  const token = `${payloadB64}.${sig}`;

  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=${MAX_AGE}`;
}

export async function readSession(request, env) {
  const secret = env.SESSION_SECRET;
  if (!secret) return null;

  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (!match) return null;

  const [payloadB64, sig] = match[1].split('.');
  if (!payloadB64 || !sig) return null;

  const valid = await verify(payloadB64, sig, secret);
  if (!valid) return null;

  try {
    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(payloadB64)));
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload.user;
  } catch {
    return null;
  }
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=0`;
}