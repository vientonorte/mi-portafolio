/**
 * Fase 2: read-only Google Ads client (Search / SearchStream / GAQL only).
 * Never mutates campaigns, keywords, or budgets.
 */
import { config as loadDotenv } from "dotenv";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { GoogleAdsApi } from "google-ads-api";
import {
  CUSTOMER_ID as DEFAULT_CUSTOMER_DISPLAY,
  DEFAULT_CAMPAIGN_ID,
  MockAdsClient,
} from "./query-processor.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ADS_QUERY_ROOT = join(__dirname, "..");

/** Load ads-query/.env once (never commit .env). */
let dotenvLoaded = false;
export function loadAdsEnv({ path } = {}) {
  if (dotenvLoaded && !path) return;
  loadDotenv({ path: path ?? join(ADS_QUERY_ROOT, ".env") });
  dotenvLoaded = true;
}

export const MICROS_PER_UNIT = 1_000_000;

export function digitsOnly(value) {
  return String(value ?? "").replace(/\D/g, "");
}

export function formatCustomerDisplay(digits) {
  const d = digitsOnly(digits);
  if (d.length === 10) {
    return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  }
  return d || DEFAULT_CUSTOMER_DISPLAY;
}

/** Convert Google Ads micros (int/string/Long) to a JS number in currency units. */
export function fromMicros(value) {
  if (value == null || value === "") return 0;
  let n;
  if (typeof value === "object" && value !== null && typeof value.toNumber === "function") {
    n = value.toNumber();
  } else if (typeof value === "bigint") {
    n = Number(value);
  } else {
    n = Number(value);
  }
  if (!Number.isFinite(n)) return 0;
  return n / MICROS_PER_UNIT;
}

export function roundMetric(n, digits = 4) {
  if (!Number.isFinite(n)) return 0;
  const f = 10 ** digits;
  return Math.round(n * f) / f;
}

function enumName(value) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (typeof value === "object" && value.name) return String(value.name);
  return String(value);
}

function pickFinalUrl(criterion = {}) {
  const urls = criterion.final_urls || criterion.finalUrls || [];
  if (Array.isArray(urls) && urls.length) return String(urls[0] ?? "");
  return "";
}

function pickReason(criterion = {}) {
  const reasons =
    criterion.primary_status_reasons ||
    criterion.primaryStatusReasons ||
    criterion.system_serving_status_reasons ||
    [];
  if (Array.isArray(reasons) && reasons.length) {
    return enumName(reasons[0]);
  }
  return undefined;
}

export function mapKeywordRow(row = {}) {
  const criterion = row.ad_group_criterion || row.adGroupCriterion || {};
  const keyword = criterion.keyword || {};
  const metrics = row.metrics || {};
  const campaign = row.campaign || {};

  const impressions = Number(metrics.impressions ?? 0) || 0;
  const clicks = Number(metrics.clicks ?? 0) || 0;
  const conversions = Number(metrics.conversions ?? 0) || 0;
  const cost = roundMetric(fromMicros(metrics.cost_micros ?? metrics.costMicros), 0);
  const avgCpc = roundMetric(fromMicros(metrics.average_cpc ?? metrics.averageCpc), 0);
  const ctr =
    metrics.ctr != null
      ? roundMetric(Number(metrics.ctr), 4)
      : impressions
        ? roundMetric(clicks / impressions, 4)
        : 0;
  const conversionRate =
    metrics.conversions_from_interactions_rate != null
      ? roundMetric(Number(metrics.conversions_from_interactions_rate), 4)
      : metrics.conversionsFromInteractionsRate != null
        ? roundMetric(Number(metrics.conversionsFromInteractionsRate), 4)
        : clicks
          ? roundMetric(conversions / clicks, 4)
          : 0;
  const cpaRaw = metrics.cost_per_conversion ?? metrics.costPerConversion;
  const cpa =
    cpaRaw != null
      ? roundMetric(fromMicros(cpaRaw), 0)
      : conversions
        ? roundMetric(cost / conversions, 0)
        : 0;

  const statusRaw =
    criterion.system_serving_status ??
    criterion.systemServingStatus ??
    criterion.status ??
    "";
  const out = {
    keyword: String(keyword.text ?? ""),
    matchType: enumName(keyword.match_type ?? keyword.matchType),
    status: enumName(statusRaw),
    finalUrl: pickFinalUrl(criterion),
    impressions,
    clicks,
    ctr,
    avgCpc,
    cost,
    conversions,
    conversionRate,
    cpa,
  };
  const reason = pickReason(criterion);
  if (reason) out.reason = reason;

  // Attach campaign meta for report assembly (stripped later if unused)
  out._campaignId = campaign.id != null ? String(campaign.id) : undefined;
  out._campaignName = campaign.name != null ? String(campaign.name) : undefined;
  return out;
}

function sumField(rows, field) {
  return rows.reduce((acc, r) => acc + (Number(r[field]) || 0), 0);
}

export function buildReportFromRows(rows, { customerId, campaignId, account }) {
  const keywords = rows.map((r) => {
    const { _campaignId, _campaignName, ...rest } = r;
    void _campaignId;
    void _campaignName;
    return rest;
  });

  const impressions = sumField(keywords, "impressions");
  const clicks = sumField(keywords, "clicks");
  const cost = sumField(keywords, "cost");
  const conversions = sumField(keywords, "conversions");
  const ctr = impressions ? roundMetric(clicks / impressions, 4) : 0;
  const avgCpc = clicks ? roundMetric(cost / clicks, 0) : 0;
  const conversionRate = clicks ? roundMetric(conversions / clicks, 4) : 0;
  const cpa = conversions ? roundMetric(cost / conversions, 0) : 0;

  const campaignMeta = rows.find((r) => r._campaignId || r._campaignName) || {};
  const resolvedCampaignId =
    campaignId ||
    campaignMeta._campaignId ||
    DEFAULT_CAMPAIGN_ID;

  return {
    customerId: formatCustomerDisplay(customerId),
    campaign: {
      id: String(resolvedCampaignId),
      name: campaignMeta._campaignName || "",
    },
    account: {
      impressions,
      clicks,
      ctr,
      avgCpcClp: avgCpc,
      costClp: cost,
      conversions,
      conversionRate,
      cpaClp: cpa,
    },
    view: {
      impressions,
      clicks,
      costClp: cost,
      conversions,
    },
    keywords,
    removedKeywordsCount: 0,
    removedWhich: account ? "NO DATO" : "NO DATO",
    iaMax: { impressions: 0, clicks: 0, cost: 0 },
  };
}

export function buildKeywordViewGaql({ campaignId, dateRange = "LAST_30_DAYS" } = {}) {
  const lines = [
    "SELECT",
    "  campaign.id,",
    "  campaign.name,",
    "  ad_group_criterion.keyword.text,",
    "  ad_group_criterion.keyword.match_type,",
    "  ad_group_criterion.status,",
    "  ad_group_criterion.system_serving_status,",
    "  ad_group_criterion.final_urls,",
    "  ad_group_criterion.primary_status_reasons,",
    "  metrics.impressions,",
    "  metrics.clicks,",
    "  metrics.ctr,",
    "  metrics.average_cpc,",
    "  metrics.cost_micros,",
    "  metrics.conversions,",
    "  metrics.conversions_from_interactions_rate,",
    "  metrics.cost_per_conversion",
    "FROM keyword_view",
    `WHERE segments.date DURING ${dateRange}`,
  ];
  if (campaignId) {
    lines.push(`  AND campaign.id = ${digitsOnly(campaignId)}`);
  }
  return lines.join("\n");
}

export function readLiveConfig(env = process.env) {
  const developerToken = env.GOOGLE_ADS_DEVELOPER_TOKEN?.trim() || "";
  const clientId = env.GOOGLE_ADS_CLIENT_ID?.trim() || "";
  const clientSecret = env.GOOGLE_ADS_CLIENT_SECRET?.trim() || "";
  const refreshToken = env.GOOGLE_ADS_REFRESH_TOKEN?.trim() || "";
  const customerId = digitsOnly(env.GOOGLE_ADS_CUSTOMER_ID);
  const loginCustomerId = digitsOnly(env.GOOGLE_ADS_LOGIN_CUSTOMER_ID) || undefined;
  const campaignId =
    digitsOnly(env.GOOGLE_ADS_CAMPAIGN_ID) || DEFAULT_CAMPAIGN_ID;

  const missing = [];
  if (!developerToken) missing.push("GOOGLE_ADS_DEVELOPER_TOKEN");
  if (!clientId) missing.push("GOOGLE_ADS_CLIENT_ID");
  if (!clientSecret) missing.push("GOOGLE_ADS_CLIENT_SECRET");
  if (!refreshToken) missing.push("GOOGLE_ADS_REFRESH_TOKEN");
  if (!customerId) missing.push("GOOGLE_ADS_CUSTOMER_ID");

  return {
    ok: missing.length === 0,
    missing,
    developerToken,
    clientId,
    clientSecret,
    refreshToken,
    customerId,
    loginCustomerId,
    campaignId,
  };
}

export class LiveAdsClient {
  /**
   * @param {object} opts
   * @param {object} [opts.config] resolved env config
   * @param {object} [opts.customer] injectable customer with .query(gaql)
   * @param {typeof GoogleAdsApi} [opts.Api] injectable GoogleAdsApi ctor
   */
  constructor({ config, customer, Api = GoogleAdsApi } = {}) {
    this.config = config ?? readLiveConfig();
    if (!this.config.ok && !customer) {
      throw new Error(
        `LiveAdsClient missing env: ${this.config.missing.join(", ")}`
      );
    }
    this._customer = customer;
    this._Api = Api;
  }

  getCustomer() {
    if (this._customer) return this._customer;
    const api = new this._Api({
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      developer_token: this.config.developerToken,
    });
    const opts = {
      customer_id: this.config.customerId,
      refresh_token: this.config.refreshToken,
    };
    if (this.config.loginCustomerId) {
      opts.login_customer_id = this.config.loginCustomerId;
    }
    this._customer = api.Customer(opts);
    return this._customer;
  }

  /** READ ONLY: GAQL Search via customer.query (no mutate). */
  async query({ account = false, campaignId } = {}) {
    const filterCampaign = !account;
    const cid = filterCampaign
      ? campaignId || this.config.campaignId || DEFAULT_CAMPAIGN_ID
      : null;
    const gaql = buildKeywordViewGaql({ campaignId: cid });
    const customer = this.getCustomer();
    const rows = await customer.query(gaql);
    const mapped = (rows || []).map(mapKeywordRow);
    return buildReportFromRows(mapped, {
      customerId: this.config.customerId,
      campaignId: cid || this.config.campaignId,
      account: Boolean(account),
    });
  }

  async fetchKeywords(scope = {}) {
    const account = !scope.campaignId;
    return this.query({
      account,
      campaignId: scope.campaignId ?? null,
    });
  }
}

/**
 * Factory: Live when required GOOGLE_ADS_* env are set; otherwise Mock.
 * Loads dotenv from ads-query/.env.
 */
export function createAdsClient(options = {}) {
  if (options.loadEnv !== false) {
    loadAdsEnv({ path: options.envPath });
  }
  const config = options.config ?? readLiveConfig(options.env ?? process.env);
  if (config.ok) {
    return new LiveAdsClient({
      config,
      customer: options.customer,
      Api: options.Api,
    });
  }
  return new MockAdsClient();
}

export function createQueryProcessorDeps(options = {}) {
  const client = createAdsClient(options);
  const config = options.config ?? readLiveConfig(options.env ?? process.env);
  return {
    client,
    mode: client instanceof LiveAdsClient ? "live" : "mock",
    customerId: config.customerId
      ? formatCustomerDisplay(config.customerId)
      : DEFAULT_CUSTOMER_DISPLAY,
    campaignId: config.campaignId || DEFAULT_CAMPAIGN_ID,
  };
}
