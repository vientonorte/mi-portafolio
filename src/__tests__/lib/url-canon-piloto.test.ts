import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { ROUTES } from "../../vn-core/routes";
import {
  SEO_SITE,
  canonicalFromPath,
  sanitizeCanonicalUrl,
} from "../../vn-core/seo";
import { NEWS_CATALOG, newsCanonical, newsUtm } from "../../data/news-editions";

/**
 * Canon 2026-09-27 (PO):
 * - Indexable: home `/` y `/servicios/` (únicas URLs del sitemap).
 * - /s/** redirige a /servicios/ (salvo /s/polijuego-privacy/).
 * - Rutas hash (/#/…) siguen funcionando en la app, pero nunca son canonical:
 *   canonicalizan a la home.
 * - /#/consultoria sigue siendo final URL de Ads (enlace, no canonical) hasta que Rö la cambie.
 */
const root = process.cwd();
const indexHtml = readFileSync(resolve(root, "index.html"), "utf8");

const SAMPLE_PATHS = [
  "/",
  "",
  "/consultoria",
  "/consultoria/",
  "/consultoria/modulos/dashboard",
  "/proceso/fase/ux-research",
  "/news",
  "/news/accesibilidad-transvip",
  "/ads/auditoria-accesibilidad",
  "/empresa/sura",
  "/proyecto/x",
  "/demo/x-cms",
];

describe("URL canon 2026-09-27 · canonicals sin '#'", () => {
  it("canonicalFromPath never returns a URL containing '#' (all ROUTES + samples)", () => {
    const routePaths = Object.values(ROUTES).filter(
      (v): v is string => typeof v === "string"
    );
    expect(routePaths.length).toBeGreaterThan(5);
    for (const p of [...routePaths, ...SAMPLE_PATHS]) {
      const c = canonicalFromPath(p);
      expect(c, p).not.toContain("#");
      expect(c, p).toBe("https://vientonorte.io/");
    }
  });

  it("sanitizeCanonicalUrl drops hash URLs to home and keeps HTTP canonicals", () => {
    expect(sanitizeCanonicalUrl("https://vientonorte.io/#/news/")).toBe(
      "https://vientonorte.io/"
    );
    expect(sanitizeCanonicalUrl(undefined)).toBe("https://vientonorte.io/");
    expect(sanitizeCanonicalUrl("https://vientonorte.io/servicios/")).toBe(
      "https://vientonorte.io/servicios/"
    );
  });

  it("news canonical is home (not /#/news/); share links stay SPA", () => {
    expect(NEWS_CATALOG.canonicalIndex).toBe("https://vientonorte.io/");
    expect(newsCanonical()).toBe("https://vientonorte.io/");
    for (const e of NEWS_CATALOG.editions) {
      expect(newsCanonical(e.slug)).not.toContain("#");
      expect(newsUtm(e.slug)).toContain(`/#/news/${e.slug}/?utm_source=linkedin`);
    }
  });

  it("producto UI stays HashRouter /consultoria as a link (Ads final URL), not /s/", () => {
    expect(ROUTES.consulting).toBe("/consultoria");
    expect(SEO_SITE.semOfferUrl).toBe("https://vientonorte.io/#/consultoria");
    expect(SEO_SITE.serviciosUrl).toBe("https://vientonorte.io/servicios/");
    expect(JSON.stringify(SEO_SITE)).not.toContain("/s/");
  });

  it("does not ship a third HTTP /consultoria/ clone of the SPA", () => {
    expect(existsSync(resolve(root, "public/consultoria"))).toBe(false);
  });
});

describe("URL canon 2026-09-27 · home / 404 (404.html = copia de dist/index.html)", () => {
  it("home has no rel=alternate to /#/ and canonical is the apex", () => {
    expect(indexHtml).toContain('<link rel="canonical" href="https://vientonorte.io/" />');
    expect(indexHtml).not.toMatch(/rel="alternate"[^>]*#\//);
    expect(indexHtml).not.toMatch(/<link[^>]+href="https:\/\/vientonorte\.io\/#\//);
  });

  it("home JSON-LD has no /#/ URLs; service URL is /servicios/", () => {
    const m = indexHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(m).toBeTruthy();
    const raw = m![1];
    expect(raw).not.toContain("/#/");
    const ld = JSON.parse(raw);
    const service = ld["@graph"].find(
      (n: { "@type": string }) => n["@type"] === "ProfessionalService"
    );
    expect(service.url).toBe("https://vientonorte.io/servicios/");
    for (const node of ld["@graph"]) {
      if (node.url) expect(node.url).not.toContain("#");
    }
  });

  it("deploy workflows still publish 404.html as the SPA fallback copy of index.html", () => {
    for (const wf of [".github/workflows/deploy.yml", ".github/workflows/deploy-qa.yml"]) {
      const yml = readFileSync(resolve(root, wf), "utf8");
      expect(yml, wf).toContain("cp dist/index.html dist/404.html");
    }
  });

  it("robots.txt has no useless Disallow: /#/ lines", () => {
    const robots = readFileSync(resolve(root, "public/robots.txt"), "utf8");
    expect(robots).not.toMatch(/^Disallow: \/#\//m);
    expect(robots).toContain("Sitemap: https://vientonorte.io/sitemap.xml");
  });
});

describe("URL canon 2026-09-27 · fichas /servicios/<slug>/ (fuera del sitemap, sin cambios)", () => {
  it("organic ficha keeps self canonical and does not link the old /s/consultoria/", () => {
    const html = readFileSync(
      resolve(root, "public/servicios/consultoria-ux-pymes/index.html"),
      "utf8"
    );
    expect(html).not.toContain('href="/s/consultoria/"');
    expect(html).toContain(
      'rel="canonical" href="https://vientonorte.io/servicios/consultoria-ux-pymes/"'
    );
  });
});
