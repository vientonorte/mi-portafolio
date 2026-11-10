const TEAM_HOST = /^[a-z0-9-]+\.cloudflareaccess\.com$/;

export function normalizeTeamDomain(raw) {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim().replace(/\/+$/, "");
  if (!trimmed) return null;
  let url;
  try {
    url = new URL(trimmed.includes("://") ? trimmed : `https://${trimmed}`);
  } catch {
    return null;
  }
  if (url.protocol !== "https:") return null;
  if (url.username || url.password || url.port) return null;
  if (url.pathname !== "/" && url.pathname !== "") return null;
  if (url.search || url.hash) return null;
  if (!TEAM_HOST.test(url.hostname)) return null;
  return `https://${url.hostname}`;
}

export function policyAudOk(raw) {
  if (typeof raw !== "string") return false;
  const value = raw.trim();
  if (value.length < 8 || value.length > 128) return false;
  return /^[A-Za-z0-9_-]+$/.test(value);
}

function bytesToB64Url(bytes) {
  let bin = "";
  for (const byte of bytes) bin += String.fromCharCode(byte);
  return btoa(bin).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function b64UrlToBytes(segment) {
  const pad = segment.length % 4 === 0 ? "" : "=".repeat(4 - (segment.length % 4));
  const b64 = segment.replaceAll("-", "+").replaceAll("_", "/") + pad;
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

function decodeJson(segment) {
  return JSON.parse(new TextDecoder().decode(b64UrlToBytes(segment)));
}

function audienceMatches(aud, expected) {
  if (typeof aud === "string") return aud === expected;
  if (Array.isArray(aud)) return aud.some((item) => item === expected);
  return false;
}

async function verifyRs256(jwk, signingInput, signature) {
  if (!jwk || jwk.kty !== "RSA" || !jwk.n || !jwk.e) return false;
  const key = await crypto.subtle.importKey(
    "jwk",
    { kty: "RSA", n: jwk.n, e: jwk.e, alg: "RS256", ext: true },
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"],
  );
  return crypto.subtle.verify(
    { name: "RSASSA-PKCS1-v1_5" },
    key,
    signature,
    new TextEncoder().encode(signingInput),
  );
}

/**
 * Fail-closed Access JWT check.
 * Returns { ok: true } or { ok: false }. Never throws to the caller.
 */
export async function verifyAccessJwt(request, env, fetchImpl = globalThis.fetch) {
  const issuer = normalizeTeamDomain(env.TEAM_DOMAIN);
  const aud = typeof env.POLICY_AUD === "string" ? env.POLICY_AUD.trim() : "";
  if (!issuer || !policyAudOk(aud)) return { ok: false };

  const token = request.headers.get("cf-access-jwt-assertion");
  if (!token || token.length > 8192) return { ok: false };

  const parts = token.split(".");
  if (parts.length !== 3 || parts.some((part) => part.length === 0)) return { ok: false };

  let header;
  let payload;
  let signature;
  try {
    header = decodeJson(parts[0]);
    payload = decodeJson(parts[1]);
    signature = b64UrlToBytes(parts[2]);
  } catch {
    return { ok: false };
  }

  if (!header || header.alg !== "RS256") return { ok: false };
  if (typeof header.kid !== "string" || header.kid.length === 0 || header.kid.length > 128) {
    return { ok: false };
  }

  let jwks;
  try {
    const response = await fetchImpl(`${issuer}/cdn-cgi/access/certs`, {
      method: "GET",
      headers: { accept: "application/json" },
    });
    if (!response.ok) return { ok: false };
    jwks = await response.json();
  } catch {
    return { ok: false };
  }

  const keys = Array.isArray(jwks?.keys) ? jwks.keys : [];
  const jwk = keys.find((key) => key && key.kid === header.kid);
  if (!jwk) return { ok: false };

  let valid = false;
  try {
    valid = await verifyRs256(jwk, `${parts[0]}.${parts[1]}`, signature);
  } catch {
    return { ok: false };
  }
  if (!valid) return { ok: false };

  const now = Math.floor(Date.now() / 1000);
  if (payload.iss !== issuer) return { ok: false };
  if (!audienceMatches(payload.aud, aud)) return { ok: false };
  if (typeof payload.exp !== "number" || !Number.isFinite(payload.exp) || payload.exp <= now) {
    return { ok: false };
  }
  if (payload.nbf != null && (typeof payload.nbf !== "number" || payload.nbf > now)) {
    return { ok: false };
  }
  return { ok: true };
}

export { bytesToB64Url };
