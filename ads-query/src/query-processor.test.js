import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  QueryProcessor,
  LOCK,
  FIXTURE_PATH,
  DEFAULT_CAMPAIGN_ID,
  lockFails,
  annotate,
} from "./query-processor.js";

const fixture = JSON.parse(await readFile(FIXTURE_PATH, "utf8"));

function stripLock(report) {
  return {
    customerId: report.customerId,
    campaign: report.campaign,
    account: report.account,
    view: report.view,
    keywords: report.keywords.map((row) => {
      const { lockFails: _a, lockChecks: _b, ...rest } = row;
      return rest;
    }),
    removedKeywordsCount: report.removedKeywordsCount,
    removedWhich: report.removedWhich,
    iaMax: report.iaMax,
  };
}

describe("QueryProcessor integration", () => {
  it("fake HTTP Google client returns fixture -> parse JSON equals fixture (zero data loss)", async () => {
    const client = {
      async query() {
        const res = { ok: true, json: async () => structuredClone(fixture) };
        return res.json();
      },
    };
    const processor = new QueryProcessor({ client });
    const raw = await client.query();
    const parsed = processor.parse(raw);
    assert.deepEqual(parsed, fixture);
  });

  it("fake HTTP fetchKeywords client round-trip keeps fixture metrics", async () => {
    const client = {
      async fetchKeywords(scope) {
        assert.equal(scope.customerId, "811-405-3092");
        assert.equal(scope.campaignId, DEFAULT_CAMPAIGN_ID);
        return structuredClone(fixture);
      },
    };
    const report = await new QueryProcessor({ client }).fetchKeywords({ account: false });
    assert.deepEqual(stripLock(report), fixture);
    assert.equal(report.keywords.length, 10);
  });
});

describe("lock checks", () => {
  it("accesibilidad URL FAIL /news + gtm_debug", () => {
    const processor = new QueryProcessor();
    const row = fixture.keywords.find((k) => k.keyword === "accesibilidad");
    assert.ok(row);
    const checks = processor.checkLocks(row);
    assert.equal(checks.finalUrl, "FAIL");
    const fails = lockFails(row);
    assert.ok(fails.includes("FAIL_FINAL_URL_NEWS_OR_DEBUG"));
    assert.ok(row.finalUrl.includes("/news"));
    assert.ok(row.finalUrl.includes("gtm_debug"));
  });

  it("BROAD flagged vs lock amplia desactivada", () => {
    assert.equal(LOCK.ampliaDesactivada, true);
    const processor = new QueryProcessor();
    const broad = processor.checkLocks({
      matchType: "BROAD",
      finalUrl: "https://vientonorte.io/s/consultoria/",
    });
    assert.equal(broad.matchType, "FAIL");
    assert.ok(lockFails({ matchType: "BROAD", finalUrl: "https://vientonorte.io/s/consultoria/" }).includes("FAIL_BROAD_MATCH_LOCK"));
    const phrase = processor.checkLocks({
      matchType: "PHRASE",
      finalUrl: "https://vientonorte.io/s/consultoria/",
    });
    assert.equal(phrase.matchType, "PASS");
  });
});

describe("scope", () => {
  it("default scope is campaign-only (piloto)", async () => {
    const processor = new QueryProcessor();
    const result = await processor.fetchKeywords({});
    assert.equal(result.scope, "campaign");
    assert.equal(result.campaign.id, DEFAULT_CAMPAIGN_ID);
  });

  it("account=true documents no campaign filter (Fase 1 still mock SSOT, no live Ads)", async () => {
    let seen;
    const client = {
      async fetchKeywords(scope) {
        seen = scope;
        return structuredClone(fixture);
      },
    };
    const result = await new QueryProcessor({ client }).fetchKeywords({ account: true });
    assert.equal(result.scope, "account");
    assert.equal(seen.campaignId, undefined);
    assert.equal(seen.customerId, "811-405-3092");
    assert.equal(annotate(fixture).account.costClp, 26621);
  });
});
