import { DurableObject } from "cloudflare:workers";
import { DAILY_CAP, WEBHOOK_DEDUPE_TTL_SEC } from "./constants.js";
import { CAP_KEY_PATTERN } from "./store.js";

// One object for the whole worker: the daily cap is global (10 sends), and
// webhook ids are global. The day key is an argument. These methods never
// recompute America/Santiago time.
export class OutreachCounter extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    ctx.blockConcurrencyWhile(async () => {
      this.ctx.storage.sql.exec(
        `CREATE TABLE IF NOT EXISTS caps (
          day_key TEXT PRIMARY KEY,
          sent INTEGER NOT NULL
        )`,
      );
      this.ctx.storage.sql.exec(
        `CREATE TABLE IF NOT EXISTS webhook_claims (
          id TEXT PRIMARY KEY,
          expires_at INTEGER NOT NULL
        )`,
      );
    });
  }

  reserve(key, cap) {
    assertDayKey(key);
    if (cap !== DAILY_CAP) throw new Error("cap");
    const current = readCount(this.ctx.storage.sql, key);
    if (current >= DAILY_CAP) return { ok: false, key, count: current };
    const count = current + 1;
    this.ctx.storage.sql.exec(
      "INSERT INTO caps (day_key, sent) VALUES (?, ?) ON CONFLICT(day_key) DO UPDATE SET sent = excluded.sent",
      key,
      count,
    );
    return { ok: true, key, count };
  }

  rollback(key) {
    assertDayKey(key);
    const current = readCount(this.ctx.storage.sql, key);
    const count = current > 0 ? current - 1 : 0;
    this.ctx.storage.sql.exec(
      "INSERT INTO caps (day_key, sent) VALUES (?, ?) ON CONFLICT(day_key) DO UPDATE SET sent = excluded.sent",
      key,
      count,
    );
    return { ok: true, key, count };
  }

  claimWebhook(id, ttlSec, now) {
    if (typeof id !== "string" || id.length < 1 || id.length > 256 || /\s/.test(id)) {
      throw new Error("webhook-id");
    }
    if (ttlSec !== WEBHOOK_DEDUPE_TTL_SEC) throw new Error("webhook-ttl");
    if (typeof now !== "number" || !Number.isFinite(now)) throw new Error("webhook-now");
    this.ctx.storage.sql.exec("DELETE FROM webhook_claims WHERE expires_at <= ?", now);
    const existing = this.ctx.storage.sql
      .exec("SELECT expires_at FROM webhook_claims WHERE id = ?", id)
      .toArray();
    if (existing.length > 0) return { ok: false };
    this.ctx.storage.sql.exec(
      "INSERT INTO webhook_claims (id, expires_at) VALUES (?, ?)",
      id,
      now + ttlSec * 1000,
    );
    return { ok: true };
  }
}

function assertDayKey(key) {
  if (typeof key !== "string" || !CAP_KEY_PATTERN.test(key)) throw new Error("cap-key");
}

function readCount(sql, key) {
  const rows = sql.exec("SELECT sent FROM caps WHERE day_key = ?", key).toArray();
  if (rows.length === 0) return 0;
  const value = Number(rows[0].sent);
  if (!Number.isInteger(value) || value < 0) throw new Error("cap-corrupt");
  return value;
}
