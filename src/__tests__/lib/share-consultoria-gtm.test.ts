import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const html = readFileSync(
  resolve(process.cwd(), "public/s/consultoria/index.html"),
  "utf8"
);

describe("share /s/consultoria Google tag", () => {
  it("embeds gtag.js with G-G7JXJKGCDV for tag-coverage crawlers", () => {
    expect(html).toContain("gtag/js?id=G-G7JXJKGCDV");
    expect(html).toContain('data-ga4-id="G-G7JXJKGCDV"');
    expect(html).toContain('gtag("config", "G-G7JXJKGCDV"');
    expect(html).toContain("https://vientonorte.io/s/consultoria/");
    expect(html).not.toContain("GTM-PM5LBQRP");
    expect(html).not.toContain("gtag/js?id=GT-");
  });

  it("keeps Ads click IDs on the funnel redirect", () => {
    expect(html).toContain("location.search");
    expect(html).toContain("#/consultoria");
  });

  it("does not add a GTM noscript iframe on the share hop", () => {
    expect(html).not.toMatch(/googletagmanager\.com\/ns\.html/);
  });
});
