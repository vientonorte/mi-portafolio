import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { getCompanyLogo } from "@/lib/company-logos";
import { render as renderServicios } from "@/servicios/entry-server";
import {
  BRAND_CASES,
  SERVICIOS_ANCHORS,
  SERVICIOS_CASE_ANCHORS,
  SERVICIOS_SHOW_VN_WCAG_CASE,
  SERVICIOS_EXPERIENCE,
  SERVICIOS_FUNNEL,
  SERVICIOS_VN_CASE_GROUPS,
} from "@/servicios/servicios-content";

/** Componentes nuevos del branding. Fallan si aparece una ruta fuera del canon. */
const FILES = [
  "src/components/marketing/ExperienceStrip.tsx",
  "src/components/marketing/FounderBand.tsx",
  "src/components/marketing/CaseCards.tsx",
  "src/components/organisms/HomeMarketing.tsx",
  "src/servicios/ServiciosPage.tsx",
  "src/servicios/ServiciosCasos.tsx",
  "src/servicios/servicios-nav.ts",
  // Nav minimal canónico (SSOT de links del header) y sus consumidores.
  "src/lib/site-nav.ts",
  "src/rubros/rubros-nav.ts",
  "src/components/organisms/Navigation.tsx",
];

/** Componentes de QA (banner de /qa/): sus links tampoco pueden salir del canon. */
const QA_FILES = ["src/components/molecules/QaEnvBanner.tsx"];

/**
 * Denylist exacta (Tech Lead, 1-oct). Las páginas de rubro (/servicios/web-<rubro>/) solo se
 * publican cuando existen en el build: no se rechaza todo /servicios/<slug>/.
 */
const FORBIDDEN = [
  /\/servicios\/diagnostico-accesibilidad-wcag\//,
  /\/servicios\/consultoria-ux-pymes\//,
  /\/s\/(?!polijuego-privacy\/)/,
  /\/#\//,
  /\/news\//,
  /\/qa\//,
  /\/mi-portafolio\//,
  // TL + Rö, 1-oct 10:42: destinos viejos, en cualquier esquema (http, https, //) y con o sin barra final.
  /vnmkt\.figma\.site/i,
  /vientonorte\.github\.io\/mi-portafolio\/(?:#\/)?consultoria/i,
];
const APPROVED_RUBROS = ["/servicios/web-dental/"];
const forbiddenHit = (text: string) => FORBIDDEN.find((re) => re.test(text));
/** Los comentarios del código no son rutas (p. ej. «prod o /qa/» en ExperienceStrip). */
const stripComments = (src: string) => src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:"'`])\/\/.*$/gm, "$1");

describe("branding-home canon", () => {
  it("la denylist rechaza las rutas prohibidas y deja pasar los rubros aprobados y /s/polijuego-privacy/", () => {
    for (const bad of [
      "/servicios/diagnostico-accesibilidad-wcag/",
      "/servicios/consultoria-ux-pymes/",
      "/s/web-express/",
      "/#/consultoria",
      "/news/01/",
      "/qa/servicios/",
      "/mi-portafolio/",
      "https://vnmkt.figma.site",
      "http://vnmkt.figma.site/",
      "//vnmkt.figma.site/consultoria",
      "https://vientonorte.github.io/mi-portafolio/consultoria",
      "http://vientonorte.github.io/mi-portafolio/consultoria/",
      "vientonorte.github.io/mi-portafolio/#/consultoria",
    ]) {
      expect(forbiddenHit(bad), bad).toBeDefined();
    }
    for (const ok of [
      ...APPROVED_RUBROS,
      "/s/polijuego-privacy/",
      "/servicios/",
      "/servicios/#web-pymes",
      "https://vientonorte.io/servicios/#consultoria-ux",
    ]) {
      expect(forbiddenHit(ok), ok).toBeUndefined();
    }
  });

  it("los componentes del branding no enlazan rutas de la denylist", () => {
    for (const rel of FILES) {
      const src = stripComments(readFileSync(resolve(process.cwd(), rel), "utf8"));
      for (const re of FORBIDDEN) {
        expect(src, `${rel} ${re}`).not.toMatch(re);
      }
    }
  });

  it("los componentes de QA no enlazan rutas de la denylist (ni /#/ ni dominios viejos)", () => {
    for (const rel of QA_FILES) {
      const src = stripComments(readFileSync(resolve(process.cwd(), rel), "utf8"));
      // El banner detecta /qa/ en el pathname (no es un link): se revisan los destinos href.
      const hrefs = [...src.matchAll(/href=(?:"([^"]*)"|\{\s*["'`]([^"'`]*)["'`]\s*\})/g)].map((m) => m[1] ?? m[2]);
      expect(hrefs.length, rel).toBeGreaterThan(0);
      for (const href of hrefs) expect(forbiddenHit(href), `${rel} → ${href}`).toBeUndefined();
      expect(src, rel).not.toMatch(/\/#\//);
      expect(src, rel).not.toMatch(FORBIDDEN.at(-2)!);
      expect(src, rel).not.toMatch(FORBIDDEN.at(-1)!);
    }
  });

  it("/servicios/ renderizado y public/sitemap.xml no apuntan a destinos de la denylist", () => {
    // El gate del sitemap derivado del build vive en el #292 (src/lib/sitemap-canon.ts); aquí, el sitemap versionado.
    const page = renderServicios();
    const sitemap = readFileSync(resolve(process.cwd(), "public/sitemap.xml"), "utf8");
    for (const re of FORBIDDEN.slice(-2)) {
      expect(page, `${re}`).not.toMatch(re);
      expect(sitemap, `${re}`).not.toMatch(re);
    }
  });

  it("la franja es experiencia de Rö y toma los wordmarks de proyectos", () => {
    expect(SERVICIOS_EXPERIENCE.heading).toBe("Experiencia de Rö");
    expect(SERVICIOS_EXPERIENCE.names).toEqual(["Transvip", "Karri", "SURA Investments", "Pareti"]);
    expect(SERVICIOS_EXPERIENCE.heading.toLowerCase()).not.toContain("clientes");
    expect(getCompanyLogo("Transvip")?.wordmark).toBe(true);
    expect(getCompanyLogo("Karri")?.src).toContain("karri/logo");
    expect(getCompanyLogo("SURA Investments")?.src).toContain("sura/logo");
    expect(getCompanyLogo("Pareti")?.wordmark).toBeUndefined();
  });

  it("los casos propios apuntan solo a anclas de /servicios/", () => {
    expect(BRAND_CASES.map((c) => c.id)).toEqual(["monitas", "edu21"]);
    expect(BRAND_CASES.map((c) => c.ctaAnchor)).toEqual(["web-pymes", "revision-gratis"]);
    expect(BRAND_CASES.every((c) => c.images.length === 0)).toBe(true);
    expect(SERVICIOS_FUNNEL.map((step) => step.title)).toEqual(["Llegan", "Entienden", "Confían", "Escriben"]);
  });
});

/** Cifras de resultado: porcentajes, NPS, multiplicadores, «+N». Las razones de contraste (N:1) no son resultado. */
const RESULT_FIGURE = /\d+(?:[.,]\d+)?\s?%|\bNPS\b|\b\d+(?:[.,]\d+)?\s?[x×]\b|[+−]\s?\d|\b\d+(?:[.,]\d+)?\s?(?:s|seg|segundos)\b/i;
const HEX = /#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3}(?:[0-9a-fA-F]{2})?)?\b/;
const CANON_HREF = /^(?:\/servicios\/)?#(?:web-pymes|revision-gratis|consultoria-ux)$/;

describe("/servicios/ casos de VN (spec PO 1-oct 10:31)", () => {
  const html = renderServicios();
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, "text/html");
  const casos = doc.getElementById("casos-vn")!;
  const vnCases = SERVICIOS_VN_CASE_GROUPS.flatMap((g) => g.cases);

  it("la grilla existe y agrupa por ancla canónica (#revision-gratis solo con SERVICIOS_SHOW_VN_WCAG_CASE)", () => {
    expect(casos).not.toBeNull();
    expect(SERVICIOS_VN_CASE_GROUPS.map((g) => g.anchor)).toEqual([...SERVICIOS_CASE_ANCHORS]);
    expect([...casos.querySelectorAll("[data-case-group]")].map((g) => g.getAttribute("data-case-group"))).toEqual([
      ...SERVICIOS_CASE_ANCHORS,
    ]);
    expect(casos.querySelector('[data-case-group="revision-gratis"]') !== null).toBe(SERVICIOS_SHOW_VN_WCAG_CASE);
    for (const anchor of SERVICIOS_ANCHORS) expect(doc.getElementById(anchor), anchor).not.toBeNull();
  });

  it("casos: TodoClick.cl y Parcelas Terramar en #web-pymes; Edu 21 en #consultoria-ux; Monitas fuera de /servicios/", () => {
    // arrayContaining: la grilla recibe más productos de VN sin reescribir este test (lista de Rö pendiente).
    const byGroup = Object.fromEntries(SERVICIOS_VN_CASE_GROUPS.map((g) => [g.anchor, g.cases.map((c) => c.name)]));
    expect(byGroup["web-pymes"]).toEqual(expect.arrayContaining(["TodoClick.cl", "Parcelas Terramar"]));
    expect(byGroup["consultoria-ux"]).toEqual([
      "X|CMS · Da Pleisë",
      "CFO Dashboard · Ratio Irarrázaval",
      "Edu 21",
      "Dashboard de consultoría estratégica",
    ]);
    if (SERVICIOS_SHOW_VN_WCAG_CASE) expect(byGroup["revision-gratis"]).toEqual(["vientonorte.io · contraste WCAG"]);
    expect(vnCases.some((c) => c.id === "monitas")).toBe(false);
    expect(doc.body.textContent ?? "").not.toContain("Monitas");
    expect(html).not.toContain("cases/monitas");
    expect(new Set(vnCases.map((c) => c.id)).size).toBe(vnCases.length);
    const byId = Object.fromEntries(vnCases.map((c) => [c.id, c]));
    expect(byId.todoclick.findings.some((f) => /\bh1\b/.test(f))).toBe(true);
    expect(byId.terramar.findings.length).toBeLessThanOrEqual(7);
    expect(byId.edu21.startingPoint).toMatch(/Deficiente/);
  });

  it("secciones eliminadas: sin experiencia de Rö, quién está detrás, cómo trabajamos, Coworking ni WCAG propia", () => {
    for (const id of ["experiencia-ro", "experiencia", "quien", "como-trabajamos"]) {
      expect(doc.getElementById(id), id).toBeNull();
    }
    const text = doc.body.textContent ?? "";
    expect(text).not.toContain("Experiencia de Rö");
    expect(text).not.toContain("Quién está detrás");
    expect(text).not.toContain("Cómo trabajamos");
    for (const name of ["Transvip", "SURA", "Karri", "Pareti", "Coworking"]) {
      expect(casos.textContent ?? "", name).not.toContain(name);
    }
    const conceptos = doc.getElementById("conceptos");
    expect(conceptos?.textContent).toContain("Transvip");
    expect(conceptos?.textContent).toContain("Concepto propio");
    const rest = text.replace(conceptos?.textContent ?? "", "");
    expect(rest).not.toMatch(/Transvip|SURA Investments|Karri|Pareti/);
    expect(html).not.toContain("method/coworking/");
    expect(casos.querySelector('[data-vn-case="coworking"]')).toBeNull();
  });

  it("sin GEES, nombres ni montos; sin gees-dashboard, pos-mobile ni clientes.png en /servicios/", () => {
    expect(html).not.toMatch(/GEES|\$\s?40\.000\.000|CLP \$/i);
    for (const img of ["consultoria/gees-dashboard", "poc-modules/pos-mobile", "poc-modules/clientes"]) {
      expect(html, img).not.toContain(img);
    }
  });

  it("sin imágenes de Marca Consciente; sin Algorithmics ni Sortify", () => {
    const srcs = [...doc.querySelectorAll("img, source")].map((i) => i.getAttribute("src") ?? i.getAttribute("srcset") ?? "");
    for (const s of srcs) expect(s, s).not.toContain("cases/mc/");
    expect(html).not.toMatch(/marca consciente|algorithmics|sortify/i);
  });

  it("los links de la grilla son solo /servicios/#ancla", () => {
    const hrefs = [...casos.querySelectorAll("a")].map((a) => a.getAttribute("href") ?? "");
    expect(hrefs.length).toBe(SERVICIOS_CASE_ANCHORS.length);
    for (const h of hrefs) expect(h, h).toMatch(CANON_HREF);
    for (const re of FORBIDDEN) expect(casos.outerHTML, `${re}`).not.toMatch(re);
  });

  it("no agrega colores hex: solo tokens", () => {
    const src = readFileSync(resolve(process.cwd(), "src/servicios/ServiciosCasos.tsx"), "utf8");
    expect(src).not.toMatch(HEX);
    expect(src).toContain("bg-[var(--primary)]");
    const markup = casos.outerHTML.replace(/href="#[\w-]+"/g, "");
    expect(markup).not.toMatch(HEX);
    expect(markup).not.toMatch(/style="/);
  });

  it("títulos en Chillax y acento del isologo con var(--primary)", () => {
    const titles = [...casos.querySelectorAll("h2, h3, h4")];
    expect(titles.length).toBeGreaterThan(0);
    for (const t of titles) expect(t.className, t.textContent ?? "").toContain("var(--font-chillax)");
    const accents = casos.querySelectorAll('[data-accent="isologo"]');
    expect(accents.length).toBe(vnCases.length + 1);
    for (const a of accents) expect(a.className).toContain("bg-[var(--primary)]");
  });

  it("cada tarjeta: una imagen real del repo y dos etiquetas (rubro y servicio)", () => {
    for (const c of vnCases) {
      const card = casos.querySelector(`[data-vn-case="${c.id}"]`)!;
      expect(card, c.id).not.toBeNull();
      expect(card.querySelectorAll("img").length, c.id).toBe(1);
      expect(existsSync(resolve(process.cwd(), "public", c.image.png)), c.image.png).toBe(true);
      if (c.image.webp) expect(existsSync(resolve(process.cwd(), "public", c.image.webp)), c.image.webp).toBe(true);
      expect([...card.querySelectorAll("[data-tag]")].map((t) => t.getAttribute("data-tag"))).toEqual(["rubro", "servicio"]);
    }
  });

  it("sin cifras de resultado; la única cifra es el diagnóstico de partida, rotulado", () => {
    for (const c of vnCases) {
      const text = [c.name, c.summary, ...c.findings, c.tags.rubro, c.tags.servicio].join(" ");
      expect(text, c.id).not.toMatch(RESULT_FIGURE);
    }
    const starts = [...casos.querySelectorAll("[data-starting-point]")];
    expect(starts.length).toBe(vnCases.filter((c) => c.startingPoint).length);
    for (const p of starts) expect(p.textContent).toMatch(/^Punto de partida, no resultado:/);
    const rest = casos.cloneNode(true) as HTMLElement;
    rest.querySelectorAll("[data-starting-point]").forEach((n) => n.remove());
    expect(rest.textContent ?? "").not.toMatch(RESULT_FIGURE);
  });
});
