import { DAILY_CAP, SANTIAGO_TZ, WEBHOOK_DEDUPE_TTL_SEC } from "./constants.js";

export const CAP_KEY_PATTERN = /^cap:\d{4}-\d{2}-\d{2}$/;
const CAP_TTL_SEC = 60 * 60 * 72;
const COUNTER_NAME = "outreach";

export function santiagoDay(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: SANTIAGO_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const pick = (type) => parts.find((part) => part.type === type)?.value;
  const year = pick("year");
  const month = pick("month");
  const day = pick("day");
  if (!year || !month || !day) throw new Error("day");
  return `${year}-${month}-${day}`;
}

export function normalizeEmail(value) {
  if (typeof value !== "string") return null;
  const email = value.trim();
  if (email.length < 3 || email.length > 320) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  if (email.includes(",") || email.includes(";") || /[\r\n]/.test(email)) return null;
  return email;
}

export function emailKey(email) {
  return email.trim().toLowerCase();
}

export function capKey(date = new Date()) {
  return `cap:${santiagoDay(date)}`;
}

export function suppressKey(email) {
  return `suppress:${emailKey(email)}`;
}

async function readCapKey(kv, key) {
  if (typeof key !== "string" || !CAP_KEY_PATTERN.test(key)) throw new Error("cap-key");
  const raw = await kv.get(key);
  if (raw == null) return 0;
  if (!/^\d+$/.test(raw)) throw new Error("cap-corrupt");
  return Number(raw);
}

export async function readCap(kv, date = new Date()) {
  return readCapKey(kv, capKey(date));
}

export async function incrementCap(kv, date = new Date()) {
  const key = capKey(date);
  const next = (await readCapKey(kv, key)) + 1;
  await kv.put(key, String(next), { expirationTtl: CAP_TTL_SEC });
  return { key, count: next };
}

export async function decrementCap(kv, key) {
  const next = Math.max(0, (await readCapKey(kv, key)) - 1);
  await kv.put(key, String(next), { expirationTtl: CAP_TTL_SEC });
  return next;
}

export function hasAtomicCounter(env) {
  const ns = env?.OUTREACH_COUNTER;
  return !!ns
    && typeof ns === "object"
    && typeof ns.idFromName === "function"
    && typeof ns.get === "function";
}

export function counterStub(env) {
  const ns = env.OUTREACH_COUNTER;
  return ns.get(ns.idFromName(COUNTER_NAME));
}

export function isLiveMode(env) {
  return !!env && env.OUTREACH_MODE === "live" && hasAtomicCounter(env);
}

export async function reserveCap(env, now = new Date()) {
  const key = capKey(now);
  if (isLiveMode(env)) {
    const stub = counterStub(env);
    const result = await stub.reserve(key, DAILY_CAP);
    if (!result || result.key !== key || typeof result.count !== "number" || typeof result.ok !== "boolean") {
      if (result?.ok === true) {
        const rollbackKey = typeof result?.key === "string" ? result.key : key;
        await stub.rollback(rollbackKey);
      }
      throw new Error("cap-key");
    }
    return { ok: result.ok, key, count: result.count, store: "do" };
  }
  const current = await readCapKey(env.OUTREACH_KV, key);
  if (current >= DAILY_CAP) return { ok: false, key, count: current, store: "kv" };
  const reserved = await incrementCap(env.OUTREACH_KV, now);
  if (reserved.key !== key) throw new Error("cap-key");
  return { ok: true, key, count: reserved.count, store: "kv" };
}

export async function rollbackCap(env, key, store) {
  if (typeof key !== "string" || !CAP_KEY_PATTERN.test(key)) throw new Error("cap-key");
  if (store === "do") {
    const result = await counterStub(env).rollback(key);
    if (!result || result.key !== key) throw new Error("cap-key");
    return result.count;
  }
  if (store !== "kv") throw new Error("cap-key");
  return decrementCap(env.OUTREACH_KV, key);
}

export async function claimWebhookId(env, id, now = Date.now()) {
  if (hasAtomicCounter(env)) {
    const result = await counterStub(env).claimWebhook(id, WEBHOOK_DEDUPE_TTL_SEC, now);
    return result?.ok === true;
  }
  // Residual race: without the Durable Object, two deliveries can both see
  // a missing key and both be accepted. The bound counter claims atomically.
  const key = `svix:${id}`;
  if (await env.OUTREACH_KV.get(key) != null) return false;
  await env.OUTREACH_KV.put(key, "1", { expirationTtl: WEBHOOK_DEDUPE_TTL_SEC });
  return true;
}

export async function isSuppressed(kv, email) {
  const raw = await kv.get(suppressKey(email));
  return raw != null;
}

export async function suppressEmail(kv, email, reason) {
  const at = new Date().toISOString();
  await kv.put(
    suppressKey(email),
    JSON.stringify({ email: emailKey(email), reason, at }),
  );
  return { email: emailKey(email), reason, at };
}

const HALT_KEY = "state:halt";

export async function readHalt(kv) {
  const raw = await kv.get(HALT_KEY);
  if (raw == null) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return { reason: "unknown" };
    return parsed;
  } catch {
    return { reason: "unknown" };
  }
}

export async function setHalt(kv, details) {
  await kv.put(HALT_KEY, JSON.stringify(details));
}

export async function clearHalt(kv) {
  await kv.delete(HALT_KEY);
}

const LOG_TTL_SEC = 90 * 24 * 60 * 60;

export async function writeLog(kv, entry) {
  const record = {
    id: entry.id,
    to: entry.to,
    template: entry.template,
    timestamp: entry.timestamp,
    resend_id: entry.resend_id ?? null,
    result: entry.result,
    error: entry.error ?? null,
  };
  await kv.put(`log:${entry.id}`, JSON.stringify(record), { expirationTtl: LOG_TTL_SEC });
  return record;
}

export function allowlistHas(rawList, email) {
  if (typeof rawList !== "string" || !rawList.trim()) return false;
  const wanted = emailKey(email);
  return rawList
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
    .includes(wanted);
}

export { DAILY_CAP, HALT_KEY, LOG_TTL_SEC };
