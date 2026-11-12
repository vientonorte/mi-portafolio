import { GMAIL_SEND_URL, GMAIL_TOKEN_URL } from "./constants.js";
import { normalizeEmail } from "./store.js";

const SECRET_MIN = 8;
const TOKEN_SKEW_MS = 60_000;
const MAX_LINE = 78;
const MAX_CHUNK_BYTES = 45;
const WORD_PREFIX = "=?UTF-8?B?";
const WORD_SUFFIX = "?=";

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
  return normalizeEmail(typeof email === "string" ? email.trim() : "") != null;
}

export async function refreshTokenCacheKey(refreshToken) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(refreshToken),
  );
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function gmailError(kind, step) {
  const error = new Error("gmail");
  error.kind = kind;
  error.step = step;
  return error;
}

export async function getAccessToken(env, fetchImpl, nowMs) {
  const id = await refreshTokenCacheKey(env.GMAIL_REFRESH_TOKEN.trim());
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

  if (response.status === 401) {
    resetGmailTokenCache();
    const error = gmailError("status", "token");
    error.status = 401;
    throw error;
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

function chunkByteLimit(prefix) {
  const room = MAX_LINE - prefix.length - WORD_PREFIX.length - WORD_SUFFIX.length;
  const b64 = room - (room % 4);
  if (b64 < 4) throw gmailError("mime", "mime");
  return Math.min(MAX_CHUNK_BYTES, (b64 / 4) * 3);
}

// Encoded-words are split on code points, at most 45 UTF-8 bytes, and each
// physical header line stays within 78 characters including `firstPrefix`.
export function encodeRfc2047(value, firstPrefix) {
  if (typeof value !== "string" || value.length === 0) throw gmailError("mime", "mime");
  if (typeof firstPrefix !== "string" || firstPrefix.length === 0) throw gmailError("mime", "mime");
  const encoder = new TextEncoder();
  const chars = Array.from(value);
  const chunks = [];
  let buf = [];
  let bufBytes = 0;
  const limit = () => chunkByteLimit(chunks.length === 0 ? firstPrefix : " ");

  for (const ch of chars) {
    const size = encoder.encode(ch).length;
    if (size > limit()) throw gmailError("mime", "mime");
    if (buf.length > 0 && bufBytes + size > limit()) {
      chunks.push(buf.join(""));
      buf = [];
      bufBytes = 0;
      if (size > limit()) throw gmailError("mime", "mime");
    }
    buf.push(ch);
    bufBytes += size;
  }
  if (buf.length > 0) chunks.push(buf.join(""));

  const words = chunks.map((chunk) => `${WORD_PREFIX}${bytesToBase64(encoder.encode(chunk))}${WORD_SUFFIX}`);
  words.forEach((word, index) => {
    const line = `${index === 0 ? firstPrefix : " "}${word}`;
    if (line.length > MAX_LINE || word.length > 75) throw gmailError("mime", "mime");
  });
  return words.join("\r\n ");
}

// RFC 5322 folding: a line longer than 78 is broken with CRLF + SP.
// Removing that CRLF+SP restores the header. The SP is only the fold.
function foldHeaderLines(block) {
  const out = [];
  for (const line of block.split("\r\n")) {
    if (line.length <= MAX_LINE) {
      out.push(line);
      continue;
    }
    let rest = line;
    out.push(rest.slice(0, MAX_LINE));
    rest = rest.slice(MAX_LINE);
    while (rest.length > 0) {
      const room = MAX_LINE - 1;
      out.push(` ${rest.slice(0, room)}`);
      rest = rest.slice(room);
    }
  }
  return out.join("\r\n");
}

function assertPlainHeader(value) {
  if (typeof value !== "string" || value.length === 0 || /[\r\n]/.test(value)) {
    throw gmailError("mime", "mime");
  }
}

export function buildRawMessage({ fromName, fromEmail, to, subject, text, html, replyTo }) {
  assertPlainHeader(fromName.trim());
  assertPlainHeader(fromEmail);
  assertPlainHeader(to);
  assertPlainHeader(subject);
  assertPlainHeader(replyTo);
  if (normalizeEmail(fromEmail) !== fromEmail || normalizeEmail(to) !== to || normalizeEmail(replyTo) !== replyTo) {
    throw gmailError("mime", "mime");
  }

  const fromValue = encodeRfc2047(fromName.trim(), "From: ");
  const addressLine = ` <${fromEmail}>`;
  if (addressLine.length > MAX_LINE) throw gmailError("mime", "mime");
  const boundaryBytes = crypto.getRandomValues(new Uint8Array(8));
  let boundaryHex = "";
  for (const byte of boundaryBytes) boundaryHex += byte.toString(16).padStart(2, "0");
  const boundary = `vn_${boundaryHex}`;
  const headers = [
    `From: ${fromValue}\r\n${addressLine}`,
    `Reply-To: ${replyTo}`,
    `To: ${to}`,
    `Subject: ${encodeRfc2047(subject, "Subject: ")}`,
    `List-Unsubscribe: <mailto:${replyTo}?subject=baja>`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ];
  const headerBlock = foldHeaderLines(headers.join("\r\n"));
  for (const line of headerBlock.split("\r\n")) {
    if (line.length > MAX_LINE) throw gmailError("mime", "mime");
  }
  const mime = [
    headerBlock,
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
    const fromEmail = normalizeEmail(typeof env.SENDER_EMAIL === "string" ? env.SENDER_EMAIL.trim() : "");
    if (!fromEmail) throw gmailError("mime", "mime");
    raw = buildRawMessage({
      fromName: env.SENDER_NAME,
      fromEmail,
      replyTo: fromEmail,
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
