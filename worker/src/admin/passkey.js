import { json } from '../lib/cors.js';
import { createSessionCookie, readSession } from '../lib/session.js';

const RP_NAME = 'Viento Norte Portfolio Admin';
const CREDENTIALS_KEY = 'passkey:credentials';

function toBase64Url(buffer) {
  const bytes = buffer instanceof ArrayBuffer ? new Uint8Array(buffer) : buffer;
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(str) {
  const pad = '='.repeat((4 - (str.length % 4)) % 4);
  const base64 = (str + pad).replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(base64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function getRpId(request, env) {
  if (env.WEBAUTHN_RP_ID) return env.WEBAUTHN_RP_ID;
  const origin = (env.ALLOWED_ORIGIN || '').split(',')[0].trim();
  try {
    return new URL(origin).hostname;
  } catch {
    return 'vientonorte.io';
  }
}

async function getCredentials(env) {
  const raw = await env.ADMIN_KV.get(CREDENTIALS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function saveCredentials(env, creds) {
  await env.ADMIN_KV.put(CREDENTIALS_KEY, JSON.stringify(creds));
}

export async function handlePasskeyRegisterBegin(request, env, cors) {
  const user = await readSession(request, env);
  if (!user) {
    return json({ ok: false, error: 'Inicia sesión con GitHub (@vientonorte) primero' }, 401, cors);
  }

  const challenge = crypto.randomUUID();
  await env.ADMIN_KV.put(`passkey_challenge:${challenge}`, 'register', { expirationTtl: 300 });

  const rpId = getRpId(request, env);
  const userId = toBase64Url(new TextEncoder().encode(user.login));

  const options = {
    rp: { name: RP_NAME, id: rpId },
    user: {
      id: userId,
      name: user.login,
      displayName: user.name || user.login,
    },
    challenge: toBase64Url(new TextEncoder().encode(challenge)),
    pubKeyCredParams: [
      { type: 'public-key', alg: -7 },
      { type: 'public-key', alg: -257 },
    ],
    timeout: 60000,
    authenticatorSelection: {
      residentKey: 'preferred',
      userVerification: 'preferred',
    },
    attestation: 'none',
  };

  return json({ options }, 200, cors);
}

export async function handlePasskeyRegisterFinish(request, env, cors) {
  const user = await readSession(request, env);
  if (!user) {
    return json({ ok: false, error: 'Sesión requerida' }, 401, cors);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'JSON inválido' }, 400, cors);
  }

  const clientData = JSON.parse(new TextDecoder().decode(fromBase64Url(body.response.clientDataJSON)));
  const challengePlain = new TextDecoder().decode(fromBase64Url(clientData.challenge));
  const validChallenge = await env.ADMIN_KV.get(`passkey_challenge:${challengePlain}`);
  if (!validChallenge) {
    return json({ ok: false, error: 'Challenge inválido o expirado' }, 400, cors);
  }
  await env.ADMIN_KV.delete(`passkey_challenge:${challengePlain}`);

  const creds = await getCredentials(env);
  creds.push({
    id: body.id,
    rawId: body.rawId,
    publicKey: body.response.attestationObject,
    user: user.login,
    counter: 0,
    createdAt: new Date().toISOString(),
  });
  await saveCredentials(env, creds);

  return json({ ok: true }, 200, cors);
}

export async function handlePasskeyLoginBegin(request, env, cors) {
  const creds = await getCredentials(env);
  if (creds.length === 0) {
    return json({ ok: false, error: 'No hay passkey registrada. Entra con GitHub primero.' }, 404, cors);
  }

  const challenge = crypto.randomUUID();
  await env.ADMIN_KV.put(`passkey_challenge:${challenge}`, 'login', { expirationTtl: 300 });

  const rpId = getRpId(request, env);
  const options = {
    challenge: toBase64Url(new TextEncoder().encode(challenge)),
    timeout: 60000,
    rpId,
    allowCredentials: creds.map((c) => ({ id: c.rawId, type: 'public-key' })),
    userVerification: 'preferred',
  };

  return json({ options }, 200, cors);
}

export async function handlePasskeyLoginFinish(request, env, cors) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'JSON inválido' }, 400, cors);
  }

  const clientData = JSON.parse(new TextDecoder().decode(fromBase64Url(body.response.clientDataJSON)));
  const challengePlain = new TextDecoder().decode(fromBase64Url(clientData.challenge));
  const stored = await env.ADMIN_KV.get(`passkey_challenge:${challengePlain}`);
  if (!stored) {
    return json({ ok: false, error: 'Challenge inválido o expirado' }, 400, cors);
  }
  await env.ADMIN_KV.delete(`passkey_challenge:${challengePlain}`);

  const creds = await getCredentials(env);
  const match = creds.find((c) => c.id === body.id || c.rawId === body.rawId);
  if (!match) {
    return json({ ok: false, error: 'Passkey no reconocida' }, 401, cors);
  }

  const allowed = (env.ADMIN_GITHUB_USER || 'vientonorte').toLowerCase();
  if (match.user?.toLowerCase() !== allowed) {
    return json({ ok: false, error: 'Usuario no autorizado' }, 403, cors);
  }

  const cookie = await createSessionCookie(
    { login: match.user, name: match.user, via: 'passkey' },
    env
  );

  return json({ ok: true }, 200, { ...cors, 'Set-Cookie': cookie });
}

export async function hasPasskey(env) {
  const creds = await getCredentials(env);
  return creds.length > 0;
}