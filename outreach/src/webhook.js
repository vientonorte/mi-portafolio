import { WEBHOOK_TOLERANCE_SEC } from "./constants.js";
import { claimWebhookId, normalizeEmail, setHalt, suppressEmail, writeLog } from "./store.js";

function decodeWebhookSecret(secret) {
  if (typeof secret !== "string") return null;
  const trimmed = secret.trim();
  if (!trimmed) return null;
  const raw = trimmed.startsWith("whsec_") ? trimmed.slice("whsec_".length) : trimmed;
  if (raw.length < 16) return null;
  try {
    const bin = atob(raw);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);
    if (bytes.length < 16) return null;
    return bytes;
  } catch {
    return null;
  }
}

function timingSafeEqual(a, b) {
  const enc = new TextEncoder();
  const left = enc.encode(a);
  const right = enc.encode(b);
  const len = Math.max(left.length, right.length, 1);
  let diff = left.length ^ right.length;
  for (let i = 0; i < len; i += 1) diff |= (left[i] || 0) ^ (right[i] || 0);
  return diff === 0;
}

function bytesToBase64(bytes) {
  let bin = "";
  for (const byte of bytes) bin += String.fromCharCode(byte);
  return btoa(bin);
}

export async function verifySvixSignature({ secret, id, timestamp, signature, body, now = Date.now() }) {
  const key = decodeWebhookSecret(secret);
  if (!key) return false;
  if (typeof id !== "string" || id.length < 1 || id.length > 256 || /\s/.test(id)) return false;
  if (typeof timestamp !== "string" || !/^\d{1,12}$/.test(timestamp)) return false;
  if (typeof signature !== "string" || signature.length < 4 || signature.length > 4096) return false;
  if (typeof body !== "string") return false;

  const ts = Number(timestamp);
  const skew = Math.abs(now / 1000 - ts);
  if (skew > WEBHOOK_TOLERANCE_SEC) return false;

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    key,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signed = await crypto.subtle.sign(
    "HMAC",
    cryptoKey,
    new TextEncoder().encode(`${id}.${timestamp}.${body}`),
  );
  const expected = bytesToBase64(new Uint8Array(signed));
  const candidates = signature.split(" ").filter((part) => part.startsWith("v1,"));
  if (candidates.length === 0) return false;
  let ok = false;
  for (const candidate of candidates) {
    if (timingSafeEqual(candidate.slice(3), expected)) ok = true;
  }
  return ok;
}

function recipientList(data) {
  const to = data?.to;
  const values = Array.isArray(to) ? to : typeof to === "string" ? [to] : [];
  const emails = [];
  for (const value of values) {
    const email = normalizeEmail(value);
    if (email) emails.push(email);
  }
  return emails;
}

export async function handleWebhook(request, env) {
  const secret = env.RESEND_WEBHOOK_SECRET;
  if (decodeWebhookSecret(secret) == null) {
    return json({ error: "forbidden" }, 403);
  }

  const body = await request.text();
  if (body.length > 256 * 1024) return json({ error: "invalid" }, 400);

  const svixId = request.headers.get("svix-id") || "";
  const ok = await verifySvixSignature({
    secret,
    id: svixId,
    timestamp: request.headers.get("svix-timestamp") || "",
    signature: request.headers.get("svix-signature") || "",
    body,
  });
  if (!ok) return json({ error: "forbidden" }, 403);
  if (!(await claimWebhookId(env.OUTREACH_KV, svixId))) {
    return json({ error: "forbidden" }, 403);
  }

  let event;
  try {
    event = JSON.parse(body);
  } catch {
    return json({ error: "invalid" }, 400);
  }

  const type = event?.type;
  const emails = recipientList(event?.data);
  const resendId = typeof event?.data?.email_id === "string" ? event.data.email_id : null;
  const bounceType = event?.data?.bounce?.type;

  if (type === "email.bounced" && bounceType === "Permanent") {
    await applySuppression(env, emails, "bounce", resendId, "hard_bounce");
    return json({ ok: true, suppressed: emails.length, halted: true }, 200);
  }
  if (type === "email.complained") {
    await applySuppression(env, emails, "complaint", resendId, "complaint");
    return json({ ok: true, suppressed: emails.length, halted: true }, 200);
  }
  if (type === "email.bounced") {
    await writeLog(env.OUTREACH_KV, {
      id: crypto.randomUUID(),
      to: emails[0] || "",
      template: "webhook",
      timestamp: new Date().toISOString(),
      resend_id: resendId,
      result: "soft_bounce",
      error: typeof bounceType === "string" ? bounceType : "undetermined",
    });
    console.log(JSON.stringify({ event: "outreach_webhook", result: "soft_bounce" }));
    return json({ ok: true, suppressed: 0, halted: false }, 200);
  }

  return json({ ok: true, ignored: true }, 200);
}

async function applySuppression(env, emails, reason, resendId, result) {
  for (const email of emails) {
    await suppressEmail(env.OUTREACH_KV, email, reason);
    await writeLog(env.OUTREACH_KV, {
      id: crypto.randomUUID(),
      to: email,
      template: "webhook",
      timestamp: new Date().toISOString(),
      resend_id: resendId,
      result,
      error: null,
    });
  }
  await setHalt(env.OUTREACH_KV, {
    reason: result,
    at: new Date().toISOString(),
    resend_id: resendId,
  });
  console.log(JSON.stringify({ event: "outreach_webhook", result, halted: true }));
}

function json(payload, status) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
