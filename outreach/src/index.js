import { verifyAccessJwt } from "./access.js";
import { DAILY_CAP, FROM, REPLY_TO, RESEND_EMAILS_URL, TEMPLATE_ID } from "./constants.js";
import { buildMessage } from "./render.js";
import {
  allowlistHas,
  clearHalt,
  emailKey,
  incrementCap,
  isLiveMode,
  isSuppressed,
  normalizeEmail,
  readCap,
  readHalt,
  suppressEmail,
  writeLog,
} from "./store.js";
import { handleWebhook } from "./webhook.js";

export default {
  fetch(request, env) {
    return handleRequest(request, env);
  },
};

export async function handleRequest(request, env, fetchImpl = globalThis.fetch) {
  const url = new URL(request.url);
  if (request.method === "OPTIONS") return json({ error: "method" }, 405);
  if (request.method !== "POST") return json({ error: "not_found" }, 404);

  if (url.pathname === "/webhook/resend") return handleWebhook(request, env);
  if (url.pathname === "/send") return handleSend(request, env, fetchImpl);
  if (url.pathname === "/suppress") return handleSuppress(request, env, fetchImpl);
  if (url.pathname === "/resume") return handleResume(request, env, fetchImpl);
  return json({ error: "not_found" }, 404);
}

async function authorize(request, env, fetchImpl) {
  const result = await verifyAccessJwt(request, env, fetchImpl);
  if (!result.ok) {
    console.log(JSON.stringify({ event: "outreach_auth", result: "reject" }));
    return json({ error: "forbidden" }, 403);
  }
  return null;
}

async function handleSend(request, env, fetchImpl) {
  const denied = await authorize(request, env, fetchImpl);
  if (denied) return denied;

  let payload;
  try {
    payload = await readJson(request);
  } catch (error) {
    return json({ error: error.message === "too-large" ? "invalid" : "invalid" }, 400);
  }

  const to = normalizeEmail(payload.to);
  if (!to || Array.isArray(payload.to)) return json({ error: "invalid" }, 400);

  const originalSubject = typeof payload.subject === "string" ? payload.subject.trim() : "";
  if (!originalSubject) return json({ error: "invalid" }, 400);

  const live = isLiveMode(env.OUTREACH_MODE);
  if (!live && !allowlistHas(env.TEST_ALLOWLIST, to)) {
    await logAttempt(env, to, "test_recipient", null, null);
    return json({ error: "test_recipient" }, 403);
  }

  const subject = !live && !originalSubject.startsWith("[PRUEBA] ")
    ? `[PRUEBA] ${originalSubject}`
    : originalSubject;

  let message;
  try {
    message = buildMessage({ subject, fields: payload.fields });
  } catch {
    await logAttempt(env, to, "invalid", null, "render");
    return json({ error: "invalid" }, 400);
  }

  if (await isSuppressed(env.OUTREACH_KV, to)) {
    await logAttempt(env, to, "suppressed", null, null);
    return json({ error: "suppressed" }, 409);
  }

  if (await readHalt(env.OUTREACH_KV)) {
    await logAttempt(env, to, "halted", null, null);
    return json({ error: "halted" }, 409);
  }

  const sentToday = await readCap(env.OUTREACH_KV);
  if (sentToday >= DAILY_CAP) {
    await logAttempt(env, to, "cap", null, null);
    return json({ error: "cap" }, 429);
  }

  if (typeof env.RESEND_API_KEY !== "string" || env.RESEND_API_KEY.trim().length < 8) {
    await logAttempt(env, to, "unconfigured", null, "resend_key");
    return json({ error: "unconfigured" }, 503);
  }

  const id = crypto.randomUUID();
  const resendBody = {
    from: FROM,
    to: [to],
    reply_to: REPLY_TO,
    subject: message.subject,
    html: message.html,
    text: message.text,
  };

  let response;
  try {
    response = await fetchImpl(RESEND_EMAILS_URL, {
      method: "POST",
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY.trim()}`,
        "content-type": "application/json",
        "Idempotency-Key": id,
      },
      body: JSON.stringify(resendBody),
    });
  } catch {
    await logAttempt(env, to, "resend_error", null, "network", id);
    return json({ error: "resend_error" }, 502);
  }

  if (!response.ok) {
    await logAttempt(env, to, "resend_error", null, `status_${response.status}`, id);
    console.log(JSON.stringify({ event: "outreach_send", id, template: TEMPLATE_ID, result: "resend_error" }));
    return json({ error: "resend_error" }, 502);
  }

  let resendId = null;
  try {
    const data = await response.json();
    if (typeof data?.id === "string") resendId = data.id;
  } catch {
    resendId = null;
  }

  await incrementCap(env.OUTREACH_KV);
  await logAttempt(env, to, "sent", resendId, null, id);
  console.log(JSON.stringify({
    event: "outreach_send",
    id,
    template: TEMPLATE_ID,
    result: "sent",
    resend_id: resendId,
  }));
  return json({ id, resend_id: resendId, template: TEMPLATE_ID }, 200);
}

async function handleSuppress(request, env, fetchImpl) {
  const denied = await authorize(request, env, fetchImpl);
  if (denied) return denied;
  let payload;
  try {
    payload = await readJson(request);
  } catch {
    return json({ error: "invalid" }, 400);
  }
  const rawList = [];
  if (typeof payload.email === "string") rawList.push(payload.email);
  if (Array.isArray(payload.emails)) rawList.push(...payload.emails);
  if (rawList.length === 0 || rawList.length > 20) return json({ error: "invalid" }, 400);

  const reason = ["baja", "bounce", "complaint", "manual"].includes(payload.reason)
    ? payload.reason
    : "manual";
  const added = [];
  for (const item of rawList) {
    const email = normalizeEmail(item);
    if (!email) return json({ error: "invalid" }, 400);
    await suppressEmail(env.OUTREACH_KV, email, reason);
    added.push(emailKey(email));
  }
  console.log(JSON.stringify({ event: "outreach_suppress", count: added.length, reason }));
  return json({ ok: true, suppressed: added.length }, 200);
}

async function handleResume(request, env, fetchImpl) {
  const denied = await authorize(request, env, fetchImpl);
  if (denied) return denied;
  await clearHalt(env.OUTREACH_KV);
  console.log(JSON.stringify({ event: "outreach_resume", result: "cleared" }));
  return json({ ok: true, halted: false }, 200);
}

async function logAttempt(env, to, result, resendId, error, id = crypto.randomUUID()) {
  await writeLog(env.OUTREACH_KV, {
    id,
    to,
    template: TEMPLATE_ID,
    timestamp: new Date().toISOString(),
    resend_id: resendId,
    result,
    error,
  });
  return id;
}

async function readJson(request) {
  const length = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(length) && length > 32 * 1024) throw new Error("too-large");
  const text = await request.text();
  if (text.length > 32 * 1024) throw new Error("too-large");
  if (!text) throw new Error("invalid");
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) throw new Error("invalid");
  return JSON.parse(text);
}

function json(payload, status) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

export { DAILY_CAP };
