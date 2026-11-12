import { verifyAccessJwt } from "./access.js";
import { DAILY_CAP, TEMPLATE_ID } from "./constants.js";
import { getAccessToken, gmailReady, postGmailSend, resetGmailTokenCache } from "./gmail.js";
import { buildMessage } from "./render.js";
import {
  allowlistHas,
  isInsideSendWindow,
  isLiveMode,
  hasAtomicCounter,
  isSuppressed,
  normalizeEmail,
  readHalt,
  reserveCap,
  resolveLiveCap,
  rollbackCap,
  setHalt,
  suppressEmail,
  writeLog,
} from "./store.js";

export { OutreachCounter } from "./counter.js";

const BASES = new Set(["interes_legitimo", "fuente_publica"]);

export default {
  fetch(request, env) {
    return handleRequest(request, env);
  },
};

export async function handleRequest(request, env, fetchImpl = globalThis.fetch, now) {
  const clock = now instanceof Date ? now : new Date();
  const url = new URL(request.url);
  if (request.method === "OPTIONS") return json({ error: "method" }, 405);
  if (request.method !== "POST") return json({ error: "not_found" }, 404);

  if (url.pathname === "/send") return handleSend(request, env, fetchImpl, clock);
  if (url.pathname === "/suppress") return handleSuppress(request, env, fetchImpl);
  if (url.pathname === "/halt") return handleHalt(request, env, fetchImpl);
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

function readCompliance(payload) {
  if (!payload || typeof payload !== "object") return null;
  if (typeof payload.fuente !== "string" || /[\r\n]/.test(payload.fuente)) return null;
  const fuente = payload.fuente.trim();
  if (!fuente || fuente.length > 200) return null;
  if (typeof payload.base !== "string" || !BASES.has(payload.base)) return null;
  return { fuente, base: payload.base };
}

async function handleSend(request, env, fetchImpl, clock) {
  const denied = await authorize(request, env, fetchImpl);
  if (denied) return denied;

  let payload;
  try {
    payload = await readJson(request);
  } catch {
    return json({ error: "invalid" }, 400);
  }

  const to = normalizeEmail(payload.to);
  if (!to || Array.isArray(payload.to)) return json({ error: "invalid" }, 400);

  if (typeof payload.subject !== "string" || /[\r\n]/.test(payload.subject)) {
    return json({ error: "invalid" }, 400);
  }
  const originalSubject = payload.subject.trim();
  if (!originalSubject) return json({ error: "invalid" }, 400);

  const compliance = readCompliance(payload);
  if (!compliance) return json({ error: "invalid" }, 400);

  if (env.OUTREACH_MODE === "live" && !isLiveMode(env)) {
    await logAttempt(env, to, "live_gate", null, null, compliance, undefined, clock);
    return json({ error: "live_gate" }, 503);
  }

  const live = isLiveMode(env);
  if (!live && !allowlistHas(env.TEST_ALLOWLIST, to)) {
    await logAttempt(env, to, "test_recipient", null, null, compliance, undefined, clock);
    return json({ error: "test_recipient" }, 403);
  }

  const subject = !live && !originalSubject.startsWith("[PRUEBA] ")
    ? `[PRUEBA] ${originalSubject}`
    : originalSubject;

  let message;
  const replyTo = typeof env.SENDER_EMAIL === "string" ? normalizeEmail(env.SENDER_EMAIL.trim()) : null;
  try {
    if (!replyTo) throw new Error("reply");
    message = buildMessage({ subject, fields: payload.fields, replyTo });
  } catch (error) {
    if (error instanceof Error && error.message === "reply") {
      await logAttempt(env, to, "unconfigured", null, "sender", compliance, undefined, clock);
      return json({ error: "unconfigured" }, 503);
    }
    await logAttempt(env, to, "invalid", null, "render", compliance, undefined, clock);
    return json({ error: "invalid" }, 400);
  }

  if (await isSuppressed(env.OUTREACH_KV, to)) {
    await logAttempt(env, to, "suppressed", null, null, compliance, undefined, clock);
    return json({ error: "suppressed" }, 409);
  }

  if (await readHalt(env)) {
    await logAttempt(env, to, "halted", null, null, compliance, undefined, clock);
    return json({ error: "halted" }, 409);
  }

  if (live && !isInsideSendWindow(clock)) {
    await logAttempt(env, to, "outside_window", null, null, compliance, undefined, clock);
    return json({ error: "outside_window" }, 403);
  }

  if (!gmailReady(env)) {
    await logAttempt(env, to, "unconfigured", null, "gmail", compliance, undefined, clock);
    return json({ error: "unconfigured" }, 503);
  }

  const cap = live ? resolveLiveCap(env) : DAILY_CAP;
  if (cap == null) {
    await logAttempt(env, to, "cap", null, "cap_config", compliance, undefined, clock);
    return json({ error: "cap" }, 503);
  }

  let reservation = null;
  try {
    const outcome = await reserveCap(env, clock, cap);
    if (!outcome.ok) {
      if (outcome.halted) {
        await logAttempt(env, to, "halted", null, null, compliance, undefined, clock);
        return json({ error: "halted" }, 409);
      }
      await logAttempt(env, to, "cap", null, null, compliance, undefined, clock);
      return json({ error: "cap" }, 429);
    }
    reservation = outcome;
  } catch (error) {
    if (error instanceof Error && (error.message === "cap-corrupt" || error.message === "cap-key")) {
      return json({ error: "cap" }, 503);
    }
    console.log(JSON.stringify({ event: "outreach_cap_reserve", result: "failed" }));
    return json({ error: "cap" }, 500);
  }

  const releaseReservation = async () => {
    if (!reservation) return;
    const pending = reservation;
    reservation = null;
    try {
      await rollbackCap(env, pending.key, pending.store);
    } catch {
      // The day key is cap:YYYY-MM-DD. No recipient and no JWT.
      console.log(JSON.stringify({
        event: "outreach_cap_rollback",
        result: "failed",
        store: pending.store,
        key: pending.key,
      }));
    }
  };

  const id = crypto.randomUUID();

  let accessToken;
  try {
    accessToken = await tokenForSend(env, fetchImpl, clock.getTime());
  } catch (error) {
    // The Gmail send was not called. A token failure is a definite miss.
    await releaseReservation();
    const reason = error?.kind === "network" ? "token_network" : "token_status";
    await logAttempt(env, to, "gmail_error", null, reason, compliance, id, clock);
    console.log(JSON.stringify({
      event: "outreach_send",
      id,
      template: TEMPLATE_ID,
      result: "gmail_error",
      reason,
    }));
    return json({ error: "gmail_error" }, 502);
  }

  let response;
  try {
    response = await postGmailSend({
      env,
      fetchImpl,
      accessToken,
      to,
      subject: message.subject,
      html: message.html,
      text: message.text,
    });
    // A 401 is a definite rejection, so one retry reuses this reservation.
    if (response.status === 401) {
      resetGmailTokenCache();
      accessToken = await getAccessToken(env, fetchImpl, clock.getTime());
      response = await postGmailSend({
        env,
        fetchImpl,
        accessToken,
        to,
        subject: message.subject,
        html: message.html,
        text: message.text,
      });
      if (response.status === 401) resetGmailTokenCache();
    }
  } catch (error) {
    // A timeout, abort, or network error on messages.send may still have sent.
    // A MIME build failure, or a token fetch that never reached messages.send, is refunded.
    const refund = error?.step === "mime" || error?.step === "token";
    if (refund) await releaseReservation();
    const reason = error?.step === "mime"
      ? "mime"
      : error?.step === "token"
        ? (error.kind === "network" ? "token_network" : "token_status")
        : "network";
    await logAttempt(env, to, "gmail_error", null, reason, compliance, id, clock);
    console.log(JSON.stringify({
      event: "outreach_send",
      id,
      template: TEMPLATE_ID,
      result: "gmail_error",
      reason,
    }));
    return json({ error: "gmail_error" }, 502);
  }

  if (!response.ok) {
    await releaseReservation();
    await logAttempt(env, to, "gmail_error", null, `status_${response.status}`, compliance, id, clock);
    console.log(JSON.stringify({
      event: "outreach_send",
      id,
      template: TEMPLATE_ID,
      result: "gmail_error",
    }));
    return json({ error: "gmail_error" }, 502);
  }

  let gmailId = null;
  try {
    const data = await response.json();
    if (typeof data?.id === "string" && data.id.length > 0 && data.id.length <= 256 && !/[\r\n]/.test(data.id)) {
      gmailId = data.id;
    }
  } catch {
    gmailId = null;
  }

  await logAttempt(env, to, "sent", gmailId, null, compliance, id, clock);
  console.log(JSON.stringify({
    event: "outreach_send",
    id,
    template: TEMPLATE_ID,
    result: "sent",
    gmail_id: gmailId,
  }));
  return json({ id, gmail_id: gmailId, template: TEMPLATE_ID }, 200);
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
  if (!payload || typeof payload !== "object" || payload.emails != null) {
    return json({ error: "invalid" }, 400);
  }
  const email = normalizeEmail(payload.email);
  if (!email) return json({ error: "invalid" }, 400);
  if (payload.reason !== "bounce" && payload.reason !== "baja") {
    return json({ error: "invalid" }, 400);
  }
  await suppressEmail(env.OUTREACH_KV, email, payload.reason);
  console.log(JSON.stringify({ event: "outreach_suppress", reason: payload.reason }));
  return json({ ok: true, suppressed: 1 }, 200);
}

async function handleHalt(request, env, fetchImpl) {
  const denied = await authorize(request, env, fetchImpl);
  if (denied) return denied;
  let payload;
  try {
    payload = await readJson(request);
  } catch {
    return json({ error: "invalid" }, 400);
  }
  if (!payload || typeof payload !== "object" || typeof payload.on !== "boolean") {
    return json({ error: "invalid" }, 400);
  }
  if (!hasAtomicCounter(env)) return json({ error: "unavailable" }, 503);
  try {
    await setHalt(env, payload.on);
  } catch {
    return json({ error: "unavailable" }, 503);
  }
  console.log(JSON.stringify({ event: "outreach_halt", on: payload.on }));
  return json({ ok: true, halted: payload.on }, 200);
}

async function tokenForSend(env, fetchImpl, nowMs) {
  try {
    return await getAccessToken(env, fetchImpl, nowMs);
  } catch (error) {
    if (error?.status !== 401) throw error;
    // The cap is already reserved. A second token fetch does not reserve again.
    resetGmailTokenCache();
    return getAccessToken(env, fetchImpl, nowMs);
  }
}

async function handleResume(request, env, fetchImpl) {
  const denied = await authorize(request, env, fetchImpl);
  if (denied) return denied;
  let payload;
  try {
    payload = await readJson(request);
  } catch {
    return json({ error: "invalid" }, 400);
  }
  if (!payload || payload.confirm !== true) return json({ error: "invalid" }, 400);
  if (!hasAtomicCounter(env)) return json({ error: "unavailable" }, 503);
  try {
    await setHalt(env, false);
  } catch {
    return json({ error: "unavailable" }, 503);
  }
  console.log(JSON.stringify({ event: "outreach_resume", result: "cleared" }));
  return json({ ok: true, halted: false }, 200);
}

async function logAttempt(env, to, result, gmailId, error, compliance, id = crypto.randomUUID(), clock = new Date()) {
  await writeLog(env.OUTREACH_KV, {
    id,
    to,
    template: TEMPLATE_ID,
    timestamp: clock.toISOString(),
    gmail_id: gmailId,
    result,
    error,
    fuente: compliance?.fuente ?? null,
    base: compliance?.base ?? null,
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
