import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const html = readFileSync(
  resolve(process.cwd(), "public/s/consultoria/index.html"),
  "utf8"
);

describe("/s/consultoria deprecation stub keeps GTM (paid clicks legacy)", () => {
  it("embeds GTM-PM5LBQRP and not a parallel gtag.js", () => {
    expect(html).toContain("GTM-PM5LBQRP");
    expect(html).toContain("googletagmanager.com/gtm.js?id=");
    expect(html).toContain("https://vientonorte.io/#/consultoria");
    expect(html).not.toContain("https://vientonorte.io/s/consultoria/");
    expect(html).not.toContain("gtag/js?id=G-G7JXJKGCDV");
    expect(html).not.toContain('data-ga4-id="G-G7JXJKGCDV"');
    expect(html).not.toContain('gtag("config"');
    expect(html).not.toContain("gtag/js?id=GT-");
  });

  it("hops to /#/consultoria preserving query/UTMs, noindex", () => {
    expect(html).toContain('http-equiv="refresh" content="0; url=/#/consultoria"');
    expect(html).toContain('location.replace("/#/consultoria" + location.search)');
    expect(html).toContain('name="robots" content="noindex, follow"');
  });

  it("includes the official GTM noscript iframe with accessible title", () => {
    expect(html).toMatch(/googletagmanager\.com\/ns\.html\?id=GTM-PM5LBQRP/);
    expect(html).toContain('title="Google Tag Manager"');
  });
});
