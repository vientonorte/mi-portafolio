import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { Miniflare } from "miniflare";

describe("workerd smoke", () => {
  it("sees OUTREACH_COUNTER as an object and keeps the live gate without it", async () => {
    const mf = new Miniflare({
      modules: true,
      scriptPath: fileURLToPath(new URL("../support/smoke-entry.js", import.meta.url)),
      modulesRoot: fileURLToPath(new URL("..", import.meta.url)),
      modulesRules: [{ type: "ESModule", include: ["**/*.js"] }],
      // The workerd binary pinned with wrangler 4.86.0 accepts dates through 2026-05-03.
      // The production compatibility_date stays 2026-11-10 in wrangler.jsonc.
      compatibilityDate: "2026-05-03",
      kvNamespaces: ["OUTREACH_KV"],
      kvPersist: false,
      durableObjects: {
        OUTREACH_COUNTER: {
          className: "OutreachCounter",
          useSQLite: true,
        },
      },
      durableObjectsPersist: false,
      bindings: {
        OUTREACH_MODE: "test",
      },
    });
    try {
      const response = await mf.dispatchFetch("https://outreach.internal/__smoke");
      assert.equal(response.status, 200);
      const body = await response.json();
      assert.equal(body.counter, "object");
      assert.equal(body.live, true);
      assert.equal(body.gate.status, 503);
      assert.equal(body.gate.error, "live_gate");
      assert.equal(body.gate.gmail, 0);
      assert.equal(body.open.status, 200);
      assert.equal(body.open.error, null);
      assert.equal(body.open.gmail, 1);
    } finally {
      await mf.dispose();
    }
  });
});
