import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { ROUTES } from "../../vn-core/routes";
import { SEO_SITE } from "../../vn-core/seo";

/**
 * Decide 14-sep-2026: /s/ no es producto.
 * UI = /#/consultoria · orgánico = /servicios/* · piloto Ads = /s/consultoria 200.
 */
describe("URL canon · producto vs piloto Ads", () => {
  it("producto UI is HashRouter consultoria, not /s/", () => {
    expect(ROUTES.consulting).toBe("/consultoria");
    expect(SEO_SITE.semOfferUrl).toBe("https://vientonorte.io/#/consultoria");
    expect(SEO_SITE.semOfferUrl).not.toContain("/s/");
  });

  it("piloto Ads leftover stays /s/consultoria (no hop in this phase)", () => {
    expect(SEO_SITE.shareConsultoriaUrl).toBe(
      "https://vientonorte.io/s/consultoria"
    );
  });

  it("does not ship a third HTTP /consultoria/ clone of the SPA", () => {
    expect(existsSync(resolve(process.cwd(), "public/consultoria"))).toBe(
      false
    );
  });

  it("organic /servicios CTAs point to product UI, not the Ads pilot", () => {
    const html = readFileSync(
      resolve(process.cwd(), "public/servicios/consultoria-ux-pymes/index.html"),
      "utf8"
    );
    expect(html).toContain('href="/#/consultoria"');
    expect(html).not.toContain('href="/s/consultoria/"');
    expect(html).toContain(
      'rel="canonical" href="https://vientonorte.io/servicios/consultoria-ux-pymes/"'
    );
  });
});
