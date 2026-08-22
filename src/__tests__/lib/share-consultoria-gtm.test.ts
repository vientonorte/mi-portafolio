import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const html = readFileSync(
  resolve(process.cwd(), "public/s/consultoria/index.html"),
  "utf8"
);

describe("share /s/consultoria GTM", () => {
  it("embeds GTM-PM5LBQRP and not a parallel gtag.js", () => {
    expect(html).toContain("GTM-PM5LBQRP");
    expect(html).toContain("googletagmanager.com/gtm.js?id=");
    expect(html).toContain("https://vientonorte.io/s/consultoria/");
    expect(html).not.toContain("gtag/js?id=G-G7JXJKGCDV");
    expect(html).not.toContain('data-ga4-id="G-G7JXJKGCDV"');
    expect(html).not.toContain('gtag("config"');
    expect(html).not.toContain("gtag/js?id=GT-");
  });

  it("keeps Ads click IDs on the funnel redirect", () => {
    expect(html).toContain("location.search");
    expect(html).toContain("#/consultoria");
  });

  it("stays on /s/consultoria for Tag Assistant and coverage bots", () => {
    expect(html).toContain("tagassistant");
    expect(html).toContain("gtm_debug");
    expect(html).toContain("AdsBot-Google");
    expect(html).toMatch(/if \(stay\)/);
  });

  it("includes the official GTM noscript iframe with accessible title", () => {
    expect(html).toMatch(/googletagmanager\.com\/ns\.html\?id=GTM-PM5LBQRP/);
    expect(html).toContain('title="Google Tag Manager"');
  });
});
