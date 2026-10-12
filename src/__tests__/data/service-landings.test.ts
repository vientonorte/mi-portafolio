import { existsSync, readFileSync } from "node:fs";
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

  it("hub /servicios/ is the Vite page, not a generated public/ file", () => {
    // El hub se construye desde servicios/index.html (Vite multi-page + prerender).
    expect(existsSync(resolve(root, "public/servicios/index.html"))).toBe(false);
    const hub = readFileSync(resolve(root, "servicios/index.html"), "utf8");
    expect(hub).toContain('rel="canonical" href="https://vientonorte.io/servicios/"');
    expect(hub).toContain("<!--ssr-outlet-->");
    expect(sitemap).toContain("<loc>https://vientonorte.io/servicios/</loc>");
  });

  it("each old ficha /servicios/<slug>/ is now a redirect page (PO 2026-09-27)", () => {
    // Ya no es ficha share.css: redirige a /servicios/(#ancla) — ver legacy-redirects.test.ts.
    for (const item of SERVICE_LANDINGS.filter((l) => l.slug)) {
      const html = readFileSync(resolve(root, `public/servicios/${item.slug}/index.html`), "utf8");
      expect(html, item.slug).toContain('<meta name="robots" content="noindex, follow" />');
      expect(html, item.slug).toContain('<link rel="canonical" href="https://vientonorte.io/servicios/" />');
      expect(html, item.slug).toContain('http-equiv="refresh" content="0;url=../../servicios/');
      expect(html, item.slug).not.toContain("share.css");
      expect(html, item.slug).not.toContain("/#/");
      expect(html, item.slug).not.toContain("<h1");
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

  it("B and C (Ley 21.719) are out of the sitemap and redirect to /servicios/", () => {
    const byId = Object.fromEntries(SERVICE_LANDINGS.map((l) => [l.id, l]));
    expect(byId["seguridad-digital"].path).toBe(
      "/servicios/seguridad-privacidad-digital/"
    );
    // Canon 2026-09-27: fichas individuales fuera del sitemap (solo home + /servicios/).
    expect(byId["seguridad-digital"].inSitemap).toBe(false);
    expect(byId["ley-21719-hop"].inSitemap).toBe(false);
    expect(byId["ley-21719-hop"].hopTo).toBe(
      "/servicios/seguridad-privacidad-digital/"
    );
    // PO 2026-09-27: B y C ya no se publican como fichas; ambas redirigen directo a
    // /servicios/ (sin cadena C -> B -> /servicios/). hopTo queda en el registro como historia.
    const privacidad = readFileSync(
      resolve(root, "public/servicios/seguridad-privacidad-digital/index.html"),
      "utf8"
    );
    expect(privacidad).toContain("noindex");
    expect(privacidad).toContain('content="0;url=../../servicios/#revision-gratis"');
    expect(privacidad).not.toContain("https://vientonorte.io/servicios/seguridad-privacidad-digital/");
    const ley = readFileSync(
      resolve(root, "public/servicios/desarrollo-seguro-cumplimiento-ley-21719/index.html"),
      "utf8"
    );
    expect(ley).toContain("noindex");
    expect(ley).toContain('content="0;url=../../servicios/"');
    expect(sitemap).not.toContain("seguridad-privacidad-digital");
    expect(sitemap).not.toContain("desarrollo-seguro-cumplimiento-ley-21719");
  });

  it("/s/servicios hops noindex to /servicios/ (canon 2026-09-27)", () => {
    const hop = readFileSync(
      resolve(root, "public/s/servicios/asistente-ia/index.html"),
      "utf8"
    );
    expect(hop).toContain('name="robots" content="noindex, follow"');
    expect(hop).toContain('rel="canonical" href="https://vientonorte.io/servicios/"');
    expect(hop).toContain('content="0;url=../../../servicios/"');
    expect(hop).not.toContain("/servicios/asistente-ia/");
  });

  it("sitemap only lists the hub among service URLs (no fichas, no AI slugs)", () => {
    expect(sitemapServiceLocs()).toEqual(["https://vientonorte.io/servicios/"]);
    for (const slug of [
      "asistente-ia",
      "asistente-ecommerce",
      "inteligencia-artificial-negocios",
      "consultoria-ux-pymes",
      "diagnostico-accesibilidad-wcag",
      "privacidad-datos",
    ]) {
      expect(sitemap).not.toContain(slug);
    }
  });
});
