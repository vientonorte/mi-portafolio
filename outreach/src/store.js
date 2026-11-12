import { DAILY_CAP, DAILY_CAP_MAX, SANTIAGO_TZ } from "./constants.js";

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

const LOCAL_PART = /^[A-Za-z0-9._%+-]{1,64}$/;
const DOMAIN_LABEL = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;

function domainOk(domain) {
  const labels = domain.split(".");
  if (labels.length < 2 || !labels.every((label) => DOMAIN_LABEL.test(label))) return false;
  return /^[a-z]{2,}$/.test(labels[labels.length - 1]);
}

// Allowlisted addr-spec, returned in lowercase. A comma, a display name,
// or an encoded-word cannot pass. Each domain label is 1–63 characters,
// with no leading or trailing hyphen.
export function normalizeEmail(value) {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (email.length < 3 || email.length > 254) return null;
  const at = email.indexOf("@");
  if (at <= 0 || at !== email.lastIndexOf("@")) return null;
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (!LOCAL_PART.test(local)) return null;
  if (local.startsWith(".") || local.endsWith(".") || local.includes("..")) return null;
  if (!domainOk(domain)) return null;
  return email;
}

export function emailKey(email) {
  return email.trim().toLowerCase();
}

const SEND_WEEKDAYS = new Set(["Mon", "Tue", "Wed", "Thu", "Fri"]);
const WINDOW_START = 17 * 60 + 15;
const WINDOW_END = 17 * 60 + 35;

export function santiagoClock(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SANTIAGO_TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const pick = (type) => parts.find((part) => part.type === type)?.value;
  const weekday = pick("weekday");
  const hour = Number(pick("hour"));
  const minute = Number(pick("minute"));
  if (!weekday || !Number.isInteger(hour) || !Number.isInteger(minute)) throw new Error("clock");
  return { weekday, hour, minute };
}

// Inclusive minute window. Intl supplies the Santiago civil time, DST included.
export function isInsideSendWindow(date = new Date()) {
  const { weekday, hour, minute } = santiagoClock(date);
  if (!SEND_WEEKDAYS.has(weekday)) return false;
  const minutes = hour * 60 + minute;
  return minutes >= WINDOW_START && minutes <= WINDOW_END;
}

export function resolveLiveCap(env) {
  const raw = env?.DAILY_CAP;
  if (raw == null || (typeof raw === "string" && raw.trim() === "")) return DAILY_CAP;
  const value = typeof raw === "number" ? raw : Number(String(raw).trim());
  if (!Number.isInteger(value) || value < 1 || value > DAILY_CAP_MAX) return null;
  return value;
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

export async function reserveCap(env, now = new Date(), cap = DAILY_CAP) {
  if (!Number.isInteger(cap) || cap < 1 || cap > DAILY_CAP_MAX) throw new Error("cap");
  const key = capKey(now);
  if (isLiveMode(env)) {
    const stub = counterStub(env);
    const result = await stub.reserve(key, cap);
    if (result?.halted === true && result.ok === false && result.key === key) {
      return { ok: false, halted: true, key, count: result.count, store: "do" };
    }
    if (!result || result.key !== key || typeof result.count !== "number" || typeof result.ok !== "boolean") {
      if (result?.ok === true) {
        const rollbackKey = typeof result?.key === "string" ? result.key : key;
        await stub.rollback(rollbackKey);
      }
      throw new Error("cap-key");
    }
    return { ok: result.ok, key, count: result.count, store: "do" };
  }
  if (hasAtomicCounter(env)) {
    const halt = await counterStub(env).readHalt();
    if (halt?.halted === true) {
      const current = await readCapKey(env.OUTREACH_KV, key);
      return { ok: false, halted: true, key, count: current, store: "kv" };
    }
  }
  const current = await readCapKey(env.OUTREACH_KV, key);
  if (current >= cap) return { ok: false, key, count: current, store: "kv" };
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

// Halt lives on the Durable Object. KV is not a second copy.
export async function readHalt(env) {
  if (!hasAtomicCounter(env)) return null;
  const result = await counterStub(env).readHalt();
  if (!result || result.halted !== true) return null;
  return result;
}

export async function setHalt(env, on) {
  if (typeof on !== "boolean") throw new Error("halt");
  if (!hasAtomicCounter(env)) throw new Error("halt-store");
  const result = await counterStub(env).setHalt(on);
  if (!result || result.halted !== on) throw new Error("halt-store");
  return result;
}

const LOG_TTL_SEC = 90 * 24 * 60 * 60;

export async function writeLog(kv, entry) {
  const record = {
    id: entry.id,
    to: entry.to,
    template: entry.template,
    timestamp: entry.timestamp,
    gmail_id: entry.gmail_id ?? null,
    result: entry.result,
    error: entry.error ?? null,
    fuente: entry.fuente ?? null,
    base: entry.base ?? null,
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

export { DAILY_CAP, LOG_TTL_SEC };
