import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import es from "../../lib/i18n/locales/es";
import en from "../../lib/i18n/locales/en";

const root = process.cwd();
const indexHtml = readFileSync(resolve(root, "index.html"), "utf8");
const shareHome = readFileSync(resolve(root, "public/s/index.html"), "utf8");
const shareConsultoria = readFileSync(
  resolve(root, "public/s/consultoria/index.html"),
  "utf8"
);
const sitemap = readFileSync(resolve(root, "public/sitemap.xml"), "utf8");

const PATHS = [
  "Diagnóstico",
  "Prototipo",
  "Proceso de equipo",
  "App de punta a punta",
];

describe("SEO P0 · title home vs query", () => {
  it("home title leads with Tecnología para empresas and stays ≤60", () => {
    expect(es.seo.pages.home.title).toBe(
      "Tecnología para empresas · Viento Norte"
    );
    expect(en.seo.pages.home.title).toBe(
      "Technology for business · Viento Norte"
    );
    expect(es.seo.pages.home.title.length).toBeLessThanOrEqual(60);
    expect(en.seo.pages.home.title.length).toBeLessThanOrEqual(60);
    expect(indexHtml).toContain(
      "<title>Tecnología para empresas · Viento Norte</title>"
    );
  });
});

describe("SEO P0 · crawler HTML /s/", () => {
  it("share home has H1, four paths, and query in title/description", () => {
    expect(shareHome).toMatch(/<h1>\s*Tecnología para empresas\s*<\/h1>/);
    for (const name of PATHS) {
      expect(shareHome).toContain(name);
    }
    expect(shareHome).toContain(
      "<title>Tecnología para empresas · Viento Norte</title>"
    );
    expect(shareHome).toContain('name="description"');
    expect(shareHome).toMatch(/Tecnología para empresas:/);
    expect(shareHome).toContain('rel="canonical" href="https://vientonorte.io/"');
    expect(shareHome).toContain('content="5;url=https://vientonorte.io/"');
  });

  it("share consultoria has H1, four paths, query, and no hash canonical", () => {
    expect(shareConsultoria).toMatch(/<h1>\s*Tecnología para empresas\s*<\/h1>/);
    for (const name of PATHS) {
      expect(shareConsultoria).toContain(name);
    }
    expect(shareConsultoria).toMatch(/Tecnología para empresas:/);
    expect(shareConsultoria).toContain(
      'rel="canonical" href="https://vientonorte.io/s/consultoria/"'
    );
    expect(shareConsultoria).not.toContain(
      'rel="canonical" href="https://vientonorte.io/#/consultoria"'
    );
    expect(shareConsultoria).toContain(
      'content="5;url=https://vientonorte.io/#/consultoria"'
    );
  });
});

describe("SEO P0 · sitemap HTTP only", () => {
  it("lists / /s/ /s/consultoria/ and no hash locs", () => {
    expect(sitemap).toContain("<loc>https://vientonorte.io/</loc>");
    expect(sitemap).toContain("<loc>https://vientonorte.io/s/</loc>");
    expect(sitemap).toContain(
      "<loc>https://vientonorte.io/s/consultoria/</loc>"
    );
    expect(sitemap).not.toMatch(/<loc>https:\/\/vientonorte\.io\/#\//);
    expect(sitemap).not.toContain("/admin");
    expect(sitemap).not.toContain("finanzas.vientonorte.io");
  });
});
