import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const html = readFileSync(
  resolve(process.cwd(), "public/s/consultoria/index.html"),
  "utf8"
);

describe("share /s/consultoria GTM", () => {
  it("embeds the single GTM container and no parallel gtag snippet", () => {
    expect(html).toContain("GTM-PM5LBQRP");
    expect(html).toContain('data-gtm-id');
    expect(html).toContain("page_location");
    expect(html).toContain("/s/consultoria/");
    expect(html).not.toMatch(/gtag\/js\?id=G-/);
    expect(html).not.toContain("G-G7JXJKGCDV");
  });

  it("keeps Ads click IDs on the funnel redirect", () => {
    expect(html).toContain("location.search");
    expect(html).toContain("#/consultoria");
  });

  it("names the noscript iframe for a11y", () => {
    expect(html).toMatch(/iframe[\s\S]*title="Google Tag Manager"/);
  });
});
