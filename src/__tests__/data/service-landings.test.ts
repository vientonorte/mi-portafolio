import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  SERVICE_LANDINGS,
  sitemapServiceLocs,
} from "@/data/service-landings";

const root = process.cwd();
const sitemap = readFileSync(resolve(root, "public/sitemap.xml"), "utf8");

describe("service landings registry · Austral", () => {
  it("canonicals are /servicios/* without /s/ and without hash", () => {
    const locs = sitemapServiceLocs();
    expect(locs.length).toBe(SERVICE_LANDINGS.filter((l) => l.inSitemap).length);
    for (const loc of locs) {
      expect(loc.startsWith("https://vientonorte.io/servicios")).toBe(true);
      expect(loc).not.toContain("/s/servicios");
      expect(loc).not.toContain("#");
      expect(sitemap).toContain(`<loc>${loc}</loc>`);
    }
    expect(sitemap).not.toContain("/s/servicios");
    expect(sitemap).not.toContain("vambe");
    expect(sitemap).not.toContain("/auditoria");
    expect(sitemap).not.toContain("gemini.google.com");
  });

  it("each indexable landing has 1 H1 matching registry and self canonical", () => {
    for (const item of SERVICE_LANDINGS.filter((l) => l.index)) {
      const rel = item.slug
        ? `public/servicios/${item.slug}/index.html`
        : "public/servicios/index.html";
      const html = readFileSync(resolve(root, rel), "utf8");
      expect(html.match(/<h1[\s>]/g)?.length).toBe(1);
      expect(html).toContain(`<h1>${item.h1}</h1>`);
      expect(html).toContain(
        `rel="canonical" href="https://vientonorte.io${item.path}"`
      );
      expect(html).toContain("GTM-PM5LBQRP");
      expect(html).not.toContain("gtag/js?id=");
      expect(html).not.toContain('http-equiv="refresh"');
      expect(html).not.toContain("/#/");
      expect(html).not.toContain("/auditoria");
      expect(item.title.length).toBeLessThanOrEqual(60);
    }
  });

  it("maps Austral clusters to VN offers, skips Vambe and Workana jobs", () => {
    const byId = Object.fromEntries(SERVICE_LANDINGS.map((l) => [l.id, l]));
    expect(byId["consultoria-ux"].cluster).toBe("consultoria ux");
    expect(byId["asistente-ia"].path).toBe("/servicios/asistente-ia/");
    expect(byId["ia-negocios"].cluster).toBe("inteligencia artificial negocios");
    expect(byId["privacidad"].path).toBe("/servicios/privacidad-datos/");
    expect(JSON.stringify(SERVICE_LANDINGS)).not.toMatch(/vambe/i);
  });

  it("/s/servicios hops noindex to canon", () => {
    const hop = readFileSync(
      resolve(root, "public/s/servicios/asistente-ia/index.html"),
      "utf8"
    );
    expect(hop).toContain('name="robots" content="noindex, follow"');
    expect(hop).toContain("https://vientonorte.io/servicios/asistente-ia/");
  });
});
