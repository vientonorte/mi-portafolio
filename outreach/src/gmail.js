import { GMAIL_SEND_URL, GMAIL_TOKEN_URL, REPLY_TO } from "./constants.js";
import { normalizeEmail } from "./store.js";

const SECRET_MIN = 8;
const TOKEN_SKEW_MS = 60_000;
const RFC2047_BYTES = 45;

// Per-isolate only. A new isolate fetches again. The refresh token never lands in KV.
let tokenCache = null;

export function resetGmailTokenCache() {
  tokenCache = null;
}

function secretOk(value) {
  return typeof value === "string"
    && value.trim().length >= SECRET_MIN
    && !/[\r\n]/.test(value);
}

export function gmailReady(env) {
  if (!env) return false;
  if (!secretOk(env.GMAIL_CLIENT_ID) || !secretOk(env.GMAIL_CLIENT_SECRET) || !secretOk(env.GMAIL_REFRESH_TOKEN)) {
    return false;
  }
  const name = env.SENDER_NAME;
  if (typeof name !== "string" || /[\r\n]/.test(name)) return false;
  const trimmedName = name.trim();
  if (trimmedName.length < 1 || trimmedName.length > 200) return false;
  const email = env.SENDER_EMAIL;
  if (typeof email !== "string" || /[\r\n]/.test(email)) return false;
  const trimmedEmail = email.trim();
  return normalizeEmail(trimmedEmail) === trimmedEmail;
}

function cacheId(env) {
  return `${env.GMAIL_CLIENT_ID.trim()}\0${env.GMAIL_REFRESH_TOKEN.trim()}`;
}

function gmailError(kind, step) {
  const error = new Error("gmail");
  error.kind = kind;
  error.step = step;
  return error;
}

export async function getAccessToken(env, fetchImpl, nowMs) {
  const id = cacheId(env);
  if (tokenCache && tokenCache.id === id && tokenCache.expiresAt > nowMs + TOKEN_SKEW_MS) {
    return tokenCache.token;
  }

  let response;
  try {
    response = await fetchImpl(GMAIL_TOKEN_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: env.GMAIL_CLIENT_ID.trim(),
        client_secret: env.GMAIL_CLIENT_SECRET.trim(),
        refresh_token: env.GMAIL_REFRESH_TOKEN.trim(),
      }),
    });
  } catch {
    throw gmailError("network", "token");
  }

  if (!response.ok) throw gmailError("status", "token");

  let data;
  try {
    data = await response.json();
  } catch {
    throw gmailError("status", "token");
  }
  if (typeof data?.access_token !== "string" || data.access_token.trim().length < SECRET_MIN) {
    throw gmailError("status", "token");
  }

  const expiresIn = Number(data.expires_in);
  const ttlMs = Number.isFinite(expiresIn) && expiresIn > 0 ? expiresIn * 1000 : 0;
  tokenCache = {
    id,
    token: data.access_token,
    expiresAt: nowMs + ttlMs,
  };
  return tokenCache.token;
}

function bytesToBase64(bytes) {
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(bin);
}

function bytesToBase64Url(bytes) {
  return bytesToBase64(bytes).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function wrapBase64(text) {
  const encoded = bytesToBase64(new TextEncoder().encode(text));
  const lines = [];
  for (let i = 0; i < encoded.length; i += 76) lines.push(encoded.slice(i, i + 76));
  return lines.join("\r\n");
}

function encodeRfc2047(value) {
  const bytes = new TextEncoder().encode(value);
  const words = [];
  for (let i = 0; i < bytes.length; i += RFC2047_BYTES) {
    const slice = bytes.subarray(i, Math.min(i + RFC2047_BYTES, bytes.length));
    const word = `=?UTF-8?B?${bytesToBase64(slice)}?=`;
    if (word.length > 75) throw gmailError("mime", "mime");
    words.push(word);
  }
  if (words.length === 0) throw gmailError("mime", "mime");
  return words.join("\r\n ");
}

function assertPlainHeader(value) {
  if (typeof value !== "string" || value.length === 0 || /[\r\n]/.test(value)) {
    throw gmailError("mime", "mime");
  }
}

export function buildRawMessage({ fromName, fromEmail, to, subject, text, html, replyTo = REPLY_TO }) {
  assertPlainHeader(fromName.trim());
  assertPlainHeader(fromEmail);
  assertPlainHeader(to);
  assertPlainHeader(subject);
  assertPlainHeader(replyTo);
  if (normalizeEmail(fromEmail) !== fromEmail || normalizeEmail(to) !== to || normalizeEmail(replyTo) !== replyTo) {
    throw gmailError("mime", "mime");
  }

  const boundary = `vn_${crypto.randomUUID().replaceAll("-", "")}`;
  const headers = [
    `From: ${encodeRfc2047(fromName.trim())} <${fromEmail}>`,
    `Reply-To: ${replyTo}`,
    `To: ${to}`,
    `Subject: ${encodeRfc2047(subject)}`,
    `List-Unsubscribe: <mailto:${replyTo}?subject=baja>`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ];
  const mime = [
    headers.join("\r\n"),
    "",
    `--${boundary}`,
    "Content-Type: text/plain; charset=\"UTF-8\"",
    "Content-Transfer-Encoding: base64",
    "",
    wrapBase64(text),
    `--${boundary}`,
    "Content-Type: text/html; charset=\"UTF-8\"",
    "Content-Transfer-Encoding: base64",
    "",
    wrapBase64(html),
    `--${boundary}--`,
    "",
  ].join("\r\n");
  return bytesToBase64Url(new TextEncoder().encode(mime));
}

export async function postGmailSend({ env, fetchImpl, accessToken, to, subject, html, text }) {
  let raw;
  try {
    raw = buildRawMessage({
      fromName: env.SENDER_NAME,
      fromEmail: env.SENDER_EMAIL.trim(),
      to,
      subject,
      text,
      html,
    });
  } catch (error) {
    if (error?.step === "mime") throw error;
    throw gmailError("mime", "mime");
  }

  try {
    return await fetchImpl(GMAIL_SEND_URL, {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ raw }),
    });
  } catch {
    throw gmailError("network", "send");
  }
}
