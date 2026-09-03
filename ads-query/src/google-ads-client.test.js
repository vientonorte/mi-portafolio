import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  fromMicros,
  mapKeywordRow,
  buildKeywordViewGaql,
  buildReportFromRows,
  readLiveConfig,
  createAdsClient,
  LiveAdsClient,
  digitsOnly,
  formatCustomerDisplay,
} from "./google-ads-client.js";
import { MockAdsClient, DEFAULT_CAMPAIGN_ID } from "./query-processor.js";

describe("micros helpers", () => {
  it("fromMicros divides by 1e6 carefully", () => {
    assert.equal(fromMicros(1_000_000), 1);
    assert.equal(fromMicros("6363000000"), 6363);
    assert.equal(fromMicros(null), 0);
    assert.equal(fromMicros({ toNumber: () => 58_000_000 }), 58);
  });

  it("digitsOnly strips dashes", () => {
    assert.equal(digitsOnly("811-405-3092"), "8114053092");
    assert.equal(formatCustomerDisplay("8114053092"), "811-405-3092");
  });
});

describe("GAQL builder", () => {
  it("filters campaign when account=false", () => {
    const gaql = buildKeywordViewGaql({ campaignId: "24184249593" });
    assert.match(gaql, /FROM keyword_view/);
    assert.match(gaql, /campaign\.id = 24184249593/);
    assert.match(gaql, /ad_group_criterion\.keyword\.text/);
    assert.match(gaql, /metrics\.cost_micros/);
  });

  it("omits campaign filter for account scope", () => {
    const gaql = buildKeywordViewGaql({ campaignId: null });
    assert.doesNotMatch(gaql, /campaign\.id =/);
  });
});

describe("mapKeywordRow", () => {
  it("maps keyword_view row to fixture-shaped fields", () => {
    const mapped = mapKeywordRow({
      campaign: { id: 24184249593, name: "VN · piloto a11y_gratis_pymes" },
      ad_group_criterion: {
        keyword: { text: "tecnologia para pymes", match_type: "BROAD" },
        system_serving_status: "ELIGIBLE",
        final_urls: ["https://vientonorte.io/s/consultoria/"],
      },
      metrics: {
        impressions: 1282,
        clicks: 109,
        ctr: 0.085,
        average_cpc: 58_000_000,
        cost_micros: 6_363_000_000,
        conversions: 7,
        conversions_from_interactions_rate: 0,
        cost_per_conversion: 909_000_000,
      },
    });
    assert.equal(mapped.keyword, "tecnologia para pymes");
    assert.equal(mapped.matchType, "BROAD");
    assert.equal(mapped.status, "ELIGIBLE");
    assert.equal(mapped.finalUrl, "https://vientonorte.io/s/consultoria/");
    assert.equal(mapped.impressions, 1282);
    assert.equal(mapped.clicks, 109);
    assert.equal(mapped.avgCpc, 58);
    assert.equal(mapped.cost, 6363);
    assert.equal(mapped.conversions, 7);
    assert.equal(mapped.cpa, 909);
  });
});

describe("readLiveConfig / factory", () => {
  it("missing env => MockAdsClient", () => {
    const client = createAdsClient({
      loadEnv: false,
      env: {},
    });
    assert.ok(client instanceof MockAdsClient);
  });

  it("complete env => LiveAdsClient (customer injected, no network)", async () => {
    const env = {
      GOOGLE_ADS_DEVELOPER_TOKEN: "dev",
      GOOGLE_ADS_CLIENT_ID: "cid",
      GOOGLE_ADS_CLIENT_SECRET: "sec",
      GOOGLE_ADS_REFRESH_TOKEN: "ref",
      GOOGLE_ADS_CUSTOMER_ID: "811-405-3092",
      GOOGLE_ADS_CAMPAIGN_ID: DEFAULT_CAMPAIGN_ID,
    };
    const cfg = readLiveConfig(env);
    assert.equal(cfg.ok, true);
    assert.equal(cfg.customerId, "8114053092");

    let sawAccount = false;
    const fakeCustomer = {
      async query(gaql) {
        assert.match(gaql, /FROM keyword_view/);
        if (gaql.includes("campaign.id =")) {
          assert.match(gaql, /campaign\.id = 24184249593/);
        } else {
          sawAccount = true;
        }
        return [
          {
            campaign: { id: DEFAULT_CAMPAIGN_ID, name: "piloto" },
            ad_group_criterion: {
              keyword: { text: "x", match_type: "PHRASE" },
              status: "ENABLED",
              system_serving_status: "ELIGIBLE",
              final_urls: ["https://vientonorte.io/s/consultoria/"],
            },
            metrics: {
              impressions: 10,
              clicks: 2,
              ctr: 0.2,
              average_cpc: 100_000_000,
              cost_micros: 200_000_000,
              conversions: 1,
              conversions_from_interactions_rate: 0.5,
              cost_per_conversion: 200_000_000,
            },
          },
        ];
      },
    };

    const live = new LiveAdsClient({ config: cfg, customer: fakeCustomer });
    const report = await live.query({ account: false });
    assert.equal(report.customerId, "811-405-3092");
    assert.equal(report.keywords.length, 1);
    assert.equal(report.keywords[0].keyword, "x");
    assert.equal(report.keywords[0].cost, 200);
    assert.equal(report.campaign.id, DEFAULT_CAMPAIGN_ID);

    const viaFactory = createAdsClient({
      loadEnv: false,
      env,
      customer: fakeCustomer,
    });
    assert.ok(viaFactory instanceof LiveAdsClient);
    const accountReport = await viaFactory.query({ account: true });
    assert.equal(accountReport.keywords[0].matchType, "PHRASE");
    assert.equal(sawAccount, true);
  });

  it("buildReportFromRows aggregates account metrics", () => {
    const report = buildReportFromRows(
      [
        {
          keyword: "a",
          matchType: "BROAD",
          status: "ELIGIBLE",
          finalUrl: "",
          impressions: 100,
          clicks: 10,
          ctr: 0.1,
          avgCpc: 5,
          cost: 50,
          conversions: 2,
          conversionRate: 0.2,
          cpa: 25,
          _campaignId: "1",
          _campaignName: "c",
        },
      ],
      { customerId: "8114053092", campaignId: "1", account: false }
    );
    assert.equal(report.account.costClp, 50);
    assert.equal(report.view.clicks, 10);
    assert.equal(report.keywords[0].keyword, "a");
    assert.equal(report.keywords[0]._campaignId, undefined);
  });
});
