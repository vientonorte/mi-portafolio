import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const FIXTURE_PATH = join(__dirname, "../ssot/fixture-2026-09-02.json");

export const CUSTOMER_ID = "811-405-3092";
export const DEFAULT_CAMPAIGN_ID = "24184249593";
export const PAID_FINAL_URL =
  "https://vientonorte.io/s/consultoria/?utm_source=google&utm_medium=cpc&utm_campaign=a11y_gratis_pymes";

/** Lock: match type amplia (BROAD) desactivada; landing must be /s/consultoria. */
export const LOCK = {
  ampliaDesactivada: true,
  allowedPath: "/s/consultoria",
};

export function normalizeRow(row = {}) {
  const out = {
    keyword: row.keyword ?? "",
    matchType: row.matchType ?? "",
    status: row.status ?? "",
    finalUrl: row.finalUrl ?? "",
    impressions: row.impressions ?? 0,
    clicks: row.clicks ?? 0,
    ctr: row.ctr ?? 0,
    avgCpc: row.avgCpc ?? 0,
    cost: row.cost ?? 0,
    conversions: row.conversions ?? 0,
    conversionRate: row.conversionRate ?? 0,
    cpa: row.cpa ?? 0,
  };
  if (row.reason != null) out.reason = row.reason;
  return out;
}

export function lockFails(row = {}) {
  const fails = [];
  const url = row.finalUrl || "";
  if (url.includes("/news") || /gtm_debug/i.test(url)) {
    fails.push("FAIL_FINAL_URL_NEWS_OR_DEBUG");
  }
  let path = "";
  try {
    path = url ? new URL(url).pathname : "";
  } catch {
    path = url;
  }
  if (!path.includes(LOCK.allowedPath)) {
    fails.push("FAIL_FINAL_URL_NOT_S_CONSULTORIA");
  }
  if (row.matchType === "BROAD" && LOCK.ampliaDesactivada) {
    fails.push("FAIL_BROAD_MATCH_LOCK");
  }
  return fails;
}

export function checkLocks(row = {}) {
  const fails = lockFails(row);
  return {
    finalUrl: fails.some((f) => f.startsWith("FAIL_FINAL_URL")) ? "FAIL" : "PASS",
    matchType: fails.includes("FAIL_BROAD_MATCH_LOCK") ? "FAIL" : "PASS",
    reasons: fails,
  };
}

export function annotate(report) {
  return {
    ...report,
    keywords: (report.keywords || []).map((row) => ({
      ...row,
      lockFails: lockFails(row),
      lockChecks: checkLocks(row),
    })),
  };
}

export class MockAdsClient {
  async query({ account = false } = {}) {
    const data = JSON.parse(await readFile(FIXTURE_PATH, "utf8"));
    return { ...data, _accountRequested: Boolean(account) };
  }
  async fetchKeywords(scope = {}) {
    return this.query({ account: !scope.campaignId });
  }
}

export class QueryProcessor {
  constructor({ client, customerId = CUSTOMER_ID, campaignId = DEFAULT_CAMPAIGN_ID } = {}) {
    this.client = client ?? new MockAdsClient();
    this.customerId = customerId;
    this.campaignId = campaignId;
  }

  checkLocks(row) {
    return checkLocks(row);
  }

  parse(raw = {}) {
    const { _accountRequested, ...rest } = raw;
    void _accountRequested;
    return {
      customerId: rest.customerId,
      campaign: rest.campaign ? { ...rest.campaign } : rest.campaign,
      account: rest.account ? { ...rest.account } : rest.account,
      view: rest.view ? { ...rest.view } : rest.view,
      keywords: Array.isArray(rest.keywords) ? rest.keywords.map(normalizeRow) : [],
      removedKeywordsCount: rest.removedKeywordsCount,
      removedWhich: rest.removedWhich,
      iaMax: rest.iaMax ? { ...rest.iaMax } : rest.iaMax,
    };
  }

  async fetchKeywords({ account = false, client } = {}) {
    const ads = client ?? this.client;
    const scope = account
      ? { customerId: this.customerId }
      : { customerId: this.customerId, campaignId: this.campaignId };
    let raw;
    if (typeof ads.fetchKeywords === "function") {
      raw = await ads.fetchKeywords(scope);
    } else if (typeof ads.query === "function") {
      raw = await ads.query({ account: Boolean(account), campaignId: scope.campaignId ?? null });
    } else {
      throw new Error("QueryProcessor requires injectable client");
    }
    const ssot = this.parse(raw);
    ssot.scope = account ? "account" : "campaign";
    return annotate(ssot);
  }
}
