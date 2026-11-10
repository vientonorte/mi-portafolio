import { DAILY_CAP, SANTIAGO_TZ } from "./constants.js";

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

export async function readCap(kv, date = new Date()) {
  const raw = await kv.get(capKey(date));
  if (raw == null) return 0;
  if (!/^\d+$/.test(raw)) throw new Error("cap-corrupt");
  return Number(raw);
}

export async function incrementCap(kv, date = new Date()) {
  const next = (await readCap(kv, date)) + 1;
  await kv.put(capKey(date), String(next), { expirationTtl: 60 * 60 * 72 });
  return next;
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
  await kv.put(`log:${entry.id}`, JSON.stringify(record));
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

export function isLiveMode(mode) {
  return mode === "live";
}

export { DAILY_CAP, HALT_KEY };
