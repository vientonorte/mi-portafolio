import { DurableObject } from "cloudflare:workers";
import { DAILY_CAP_MAX } from "./constants.js";
import { CAP_KEY_PATTERN } from "./store.js";

// One object for the whole worker: the daily cap is global. The day key and
// the cap are arguments. These methods never recompute America/Santiago time.
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
        `CREATE TABLE IF NOT EXISTS flags (
          name TEXT PRIMARY KEY,
          value TEXT NOT NULL
        )`,
      );
    });
  }

  readHalt() {
    const rows = this.ctx.storage.sql.exec("SELECT value FROM flags WHERE name = ?", "halt").toArray();
    return { halted: rows.length > 0 && rows[0].value === "1" };
  }

  setHalt(on) {
    if (typeof on !== "boolean") throw new Error("halt");
    this.ctx.storage.sql.exec(
      "INSERT INTO flags (name, value) VALUES ('halt', ?) ON CONFLICT(name) DO UPDATE SET value = excluded.value",
      on ? "1" : "0",
    );
    return { ok: true, halted: on };
  }

  reserve(key, cap) {
    assertDayKey(key);
    if (!Number.isInteger(cap) || cap < 1 || cap > DAILY_CAP_MAX) throw new Error("cap");
    const current = readCount(this.ctx.storage.sql, key);
    if (this.readHalt().halted) return { ok: false, halted: true, key, count: current };
    if (current >= cap) return { ok: false, key, count: current };
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
