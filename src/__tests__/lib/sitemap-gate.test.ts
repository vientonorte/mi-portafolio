import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  deriveCanonicalRoutes,
  isDeniedPath,
  isW3cDatetime,
  routeFromIndexHtml,
  SITEMAP_ORIGIN,
  validateSitemap,
  type BuildPage,
} from "@/lib/sitemap-canon";

/**
 * Gate del sitemap. Política en src/data/sitemap-canon.json; lógica en src/lib/sitemap-canon.ts.
 * - Siempre (`npm test`): reglas estáticas sobre public/sitemap.xml (XML real, urlset, origen,
 *   denylist, duplicados, lastmod W3C y no futuro).
 * - `npm run qa:sitemap` tras `npm run build` (job Build de CI): además dist/sitemap.xml debe tener
 *   EXACTAMENTE las rutas públicas de dist/**\/index.html (ni falta ni sobra). No se deriva de las
 *   fuentes porque el prerender emite rutas que no están en ellas (p. ej. rubros/index.html →
 *   dist/servicios/<slug>/ en #281).
 *
 * lastmod: solo W3C datetime + no-futuro. No se compara con `git log` de las fuentes: la home depende
 * de todo src/** (cualquier commit la "toca") y CI usa checkout shallow (depth 1), así que el chequeo
 * fallaría en casi todos los PR o mentiría en CI. Ver cuerpo del PR ci/sitemap-gate.
 */
const root = process.cwd();

function walkIndexHtml(dir: string, base: string, out: string[]): void {
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name);
    if (statSync(abs).isDirectory()) walkIndexHtml(abs, base, out);
    else if (name === "index.html") out.push(relative(base, abs));
  }
}

/** Páginas de un build ya generado (`dist/**\/index.html`). `/qa/` nunca cuenta. */
function collectDistPages(distDir: string): BuildPage[] {
  const rels: string[] = [];
  walkIndexHtml(distDir, distDir, rels);
  return rels
    .map((rel) => ({ route: routeFromIndexHtml(rel), html: readFileSync(join(distDir, rel), "utf8") }))
    .filter((p) => !p.route.startsWith("/qa/"));
}

const O = SITEMAP_ORIGIN;

function xml(urls: { loc: string; lastmod?: string | null }[]): string {
  const body = urls
    .map(({ loc, lastmod = "2026-09-27" }) =>
      `  <url><loc>${loc}</loc>${lastmod === null ? "" : `<lastmod>${lastmod}</lastmod>`}</url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

const page = (route: string, head = `<link rel="canonical" href="${O}${route}" />`): BuildPage => ({
  route,
  html: `<!doctype html><html><head><meta name="robots" content="index, follow" />${head}</head><body></body></html>`,
});
const noindex = (route: string): BuildPage => ({
  route,
  html: `<html><head><meta name="robots" content="noindex, follow" /></head></html>`,
});
const redirect = (route: string): BuildPage => ({
  route,
  html: `<html><head><meta http-equiv="refresh" content="0;url=../" /></head></html>`,
});

const CANON = ["/", "/servicios/"];
const ok = xml([{ loc: `${O}/` }, { loc: `${O}/servicios/` }]);

describe("sitemap-canon · derivación desde el build", () => {
  it("routeFromIndexHtml", () => {
    expect(routeFromIndexHtml("index.html")).toBe("/");
    expect(routeFromIndexHtml("servicios/index.html")).toBe("/servicios/");
    expect(routeFromIndexHtml("servicios/web-dental/index.html")).toBe("/servicios/web-dental/");
  });

  it("denylist exacta del Tech Lead (2026-10-01); rubros aprobados no se bloquean", () => {
    for (const p of [
      "/servicios/diagnostico-accesibilidad-wcag/",
      "/servicios/consultoria-ux-pymes/",
      "/s/",
      "/s/consultoria/",
      "/#/consultoria",
      "/news/",
      "/news/2026/",
      "/qa/",
      "/qa/servicios/",
      "/mi-portafolio/",
    ]) {
      expect(isDeniedPath(p), p).toBe(true);
    }
    for (const p of ["/", "/servicios/", "/servicios/web-dental/", "/servicios/web-contable/", "/servicios/web-juridico/", "/s/polijuego-privacy/"]) {
      expect(isDeniedPath(p), p).toBe(false);
    }
  });

  it("solo entran páginas indexables, sin redirección, con canonical propio y fuera de la denylist", () => {
    const routes = deriveCanonicalRoutes([
      page("/"),
      page("/servicios/"),
      page("/servicios/web-dental/"),
      page("/servicios/consultoria-ux-pymes/"),
      page("/news/"),
      page("/s/polijuego-privacy/"),
      page("/otra/", `<link rel="canonical" href="${O}/servicios/" />`),
      noindex("/poc/"),
      redirect("/servicios/asistente-ia/"),
    ]);
    expect(routes).toEqual(["/", "/servicios/", "/servicios/web-dental/"]);
  });

  it("W3C datetime", () => {
    for (const v of ["2026", "2026-09", "2026-09-27", "2026-09-27T10:05-03:00", "2026-09-27T13:05:00Z", "2026-09-27T13:05:00.123+00:00"]) {
      expect(isW3cDatetime(v), v).toBe(true);
    }
    for (const v of ["27-09-2026", "2026/09/27", "2026-9-27", "2026-02-30", "2026-13-01", "2026-09-27T13:05", "2026-09-27 13:05Z", "ayer", ""]) {
      expect(isW3cDatetime(v), v).toBe(false);
    }
  });
});

describe("sitemap-canon · validateSitemap", () => {
  const now = new Date("2026-10-01T12:00:00Z");

  it("pasa con exactamente las rutas canónicas", () => {
    expect(validateSitemap(ok, CANON, now)).toEqual([]);
  });

  it("falla si falta una ruta canónica o si sobra alguna", () => {
    expect(validateSitemap(xml([{ loc: `${O}/` }]), CANON, now)).toContain("falta ruta canónica: /servicios/");
    const extra = xml([{ loc: `${O}/` }, { loc: `${O}/servicios/` }, { loc: `${O}/servicios/web-dental/` }]);
    expect(validateSitemap(extra, CANON, now)).toContain("sobra ruta (no canónica): /servicios/web-dental/");
    const dup = xml([{ loc: `${O}/` }, { loc: `${O}/` }, { loc: `${O}/servicios/` }]);
    expect(validateSitemap(dup, CANON, now)).toContain("ruta duplicada: /");
    // Sin canon (sin dist/) solo aplican las reglas estáticas.
    expect(validateSitemap(extra, null, now)).toEqual([]);
    expect(validateSitemap(dup, null, now)).toEqual(["ruta duplicada: /"]);
  });

  it.each([
    "/qa/",
    "/s/consultoria/",
    "/#/consultoria",
    "/news/",
    "/mi-portafolio/",
    "/servicios/diagnostico-accesibilidad-wcag/",
    "/servicios/consultoria-ux-pymes/",
  ])("falla si aparece %s", (path) => {
    const errs = validateSitemap(xml([{ loc: `${O}/` }, { loc: `${O}/servicios/` }, { loc: `${O}${path}` }]), CANON, now);
    expect(errs.some((e) => e.startsWith("loc en denylist"))).toBe(true);
  });

  it.each(["https://finanzas.vientonorte.io/", "http://vientonorte.io/", "https://www.vientonorte.io/", "https://vientonorte.io.evil.com/", "/servicios/"])(
    "falla con URL fuera de https://vientonorte.io: %s",
    (loc) => {
      const errs = validateSitemap(xml([{ loc: `${O}/` }, { loc: `${O}/servicios/` }, { loc }]), CANON, now);
      expect(errs.some((e) => e.startsWith("loc fuera de") || e.startsWith("loc inválida"))).toBe(true);
    }
  );

  it("falla si el XML no es válido o no es un urlset del protocolo", () => {
    expect(validateSitemap(ok.replace("</urlset>", ""), CANON, now)).toEqual(["sitemap: XML mal formado"]);
    expect(validateSitemap(ok.replace("<loc>", "<loc><b>"), CANON, now)).toEqual(["sitemap: XML mal formado"]);
    expect(validateSitemap(ok.replace("http://www.sitemaps.org/schemas/sitemap/0.9", "urn:x"), CANON, now)[0]).toMatch(/raíz debe ser/);
    expect(validateSitemap("", CANON, now)).toEqual(["sitemap: XML mal formado"]);
  });

  it("falla si lastmod no es W3C datetime, falta o está en el futuro", () => {
    const bad = xml([{ loc: `${O}/`, lastmod: "27/09/2026" }, { loc: `${O}/servicios/`, lastmod: null }]);
    const errs = validateSitemap(bad, CANON, now);
    expect(errs).toContain(`lastmod no es W3C datetime (ISO 8601): ${O}/ → 27/09/2026`);
    expect(errs).toContain(`sin <lastmod>: ${O}/servicios/`);
    const future = xml([{ loc: `${O}/` }, { loc: `${O}/servicios/`, lastmod: "2027-01-01" }]);
    expect(validateSitemap(future, CANON, now)).toContain(`lastmod en el futuro: ${O}/servicios/ → 2027-01-01`);
  });
});

describe("sitemap-gate · repo", () => {
  it("public/sitemap.xml cumple las reglas estáticas (XML, origen, denylist, lastmod)", () => {
    const errs = validateSitemap(readFileSync(resolve(root, "public/sitemap.xml"), "utf8"), null);
    expect(errs).toEqual([]);
  });

  const requireDist = process.env.SITEMAP_REQUIRE_DIST === "1";
  it.runIf(requireDist)("dist/sitemap.xml = dist/**/index.html públicos (SITEMAP_REQUIRE_DIST=1)", () => {
    const dist = resolve(root, "dist");
    expect(existsSync(resolve(dist, "sitemap.xml")), "falta dist/: corre `npm run build` antes").toBe(true);
    const canonical = deriveCanonicalRoutes(collectDistPages(dist));
    const errs = validateSitemap(readFileSync(resolve(dist, "sitemap.xml"), "utf8"), canonical);
    expect(errs, `canon derivado de dist/: ${canonical.join(", ")}`).toEqual([]);
  });
});
