import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { getCompanyLogo } from "@/lib/company-logos";
import { render as renderServicios } from "@/servicios/entry-server";
import {
  BRAND_CASES,
  SERVICIOS_ANCHORS,
  SERVICIOS_EXPERIENCE,
  SERVICIOS_FUNNEL,
  SERVICIOS_RO_EXPERIENCE,
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
];

/**
 * Denylist exacta (Tech Lead, 1-oct). Las páginas de rubro /servicios/web-dental/,
 * /servicios/web-contable/ y /servicios/web-juridico/ están aprobadas: no se rechaza todo /servicios/<slug>/.
 */
const FORBIDDEN = [
  /\/servicios\/diagnostico-accesibilidad-wcag\//,
  /\/servicios\/consultoria-ux-pymes\//,
  /\/s\/(?!polijuego-privacy\/)/,
  /\/#\//,
  /\/news\//,
  /\/qa\//,
  /\/mi-portafolio\//,
];
const APPROVED_RUBROS = ["/servicios/web-dental/", "/servicios/web-contable/", "/servicios/web-juridico/"];
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
    ]) {
      expect(forbiddenHit(bad), bad).toBeDefined();
    }
    for (const ok of [...APPROVED_RUBROS, "/s/polijuego-privacy/", "/servicios/", "/servicios/#web-pymes"]) {
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
const RO_COMPANIES = ["Transvip", "SURA", "Karri", "Pareti"];

describe("/servicios/ casos de VN y experiencia de Rö", () => {
  const html = renderServicios();
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, "text/html");
  const casos = doc.getElementById("casos-vn")!;
  const ro = doc.getElementById("experiencia-ro")!;
  const vnCases = SERVICIOS_VN_CASE_GROUPS.flatMap((g) => g.cases);

  it("las dos secciones existen en la página", () => {
    expect(casos).not.toBeNull();
    expect(ro).not.toBeNull();
  });

  it("agrupa por ancla canónica, en el orden de las fichas", () => {
    expect(SERVICIOS_VN_CASE_GROUPS.map((g) => g.anchor)).toEqual([...SERVICIOS_ANCHORS]);
    expect([...casos.querySelectorAll("[data-case-group]")].map((g) => g.getAttribute("data-case-group"))).toEqual([
      ...SERVICIOS_ANCHORS,
    ]);
    for (const anchor of SERVICIOS_ANCHORS) expect(doc.getElementById(anchor), anchor).not.toBeNull();
  });

  it("los links de ambas secciones son solo /servicios/#ancla", () => {
    const hrefs = [...casos.querySelectorAll("a"), ...ro.querySelectorAll("a")].map((a) => a.getAttribute("href") ?? "");
    expect(hrefs.length).toBe(SERVICIOS_ANCHORS.length);
    for (const h of hrefs) expect(h, h).toMatch(CANON_HREF);
    for (const re of FORBIDDEN) expect(casos.outerHTML + ro.outerHTML, `${re}`).not.toMatch(re);
  });

  it("no agrega colores hex: solo tokens", () => {
    const src = readFileSync(resolve(process.cwd(), "src/servicios/ServiciosCasos.tsx"), "utf8");
    expect(src).not.toMatch(HEX);
    expect(src).toContain("bg-[var(--primary)]");
    const markup = (casos.outerHTML + ro.outerHTML).replace(/href="#[\w-]+"/g, "");
    expect(markup).not.toMatch(HEX);
    expect(markup).not.toMatch(/style="/);
  });

  it("títulos en Chillax y acento del isologo con var(--primary)", () => {
    const titles = [...casos.querySelectorAll("h2, h3, h4"), ...ro.querySelectorAll("h2, h3")];
    expect(titles.length).toBeGreaterThan(0);
    for (const t of titles) expect(t.className, t.textContent ?? "").toContain("var(--font-chillax)");
    const accents = casos.querySelectorAll('[data-accent="isologo"]');
    expect(accents.length).toBe(vnCases.length + 1);
    for (const a of accents) expect(a.className).toContain("bg-[var(--primary)]");
  });

  it("cada tarjeta de VN: una imagen real del repo y dos etiquetas (rubro y servicio)", () => {
    for (const c of vnCases) {
      const card = casos.querySelector(`[data-vn-case="${c.id}"]`)!;
      expect(card, c.id).not.toBeNull();
      expect(card.querySelectorAll("img").length, c.id).toBe(1);
      expect(existsSync(resolve(process.cwd(), "public", c.image.png)), c.image.png).toBe(true);
      if (c.image.webp) expect(existsSync(resolve(process.cwd(), "public", c.image.webp)), c.image.webp).toBe(true);
      expect([...card.querySelectorAll("[data-tag]")].map((t) => t.getAttribute("data-tag"))).toEqual(["rubro", "servicio"]);
    }
  });

  it("casos de VN sin cifras de resultado; el diagnóstico va rotulado como punto de partida", () => {
    for (const c of vnCases) {
      const text = [c.name, c.summary, ...c.findings, c.startingPoint ?? "", c.tags.rubro, c.tags.servicio].join(" ");
      expect(text, c.id).not.toMatch(RESULT_FIGURE);
    }
    expect(casos.textContent ?? "").not.toMatch(RESULT_FIGURE);
    for (const p of casos.querySelectorAll("[data-starting-point]")) {
      expect(p.textContent).toMatch(/^Punto de partida, no resultado:/);
    }
    expect(casos.querySelectorAll("[data-starting-point]").length).toBe(vnCases.filter((c) => c.startingPoint).length);
  });

  it("#web-pymes: Monitas.cl, TodoClick.cl y Parcelas Terramar con nombre e imagen propia; sin Algorithmics ni Sortify", () => {
    const web = SERVICIOS_VN_CASE_GROUPS.find((g) => g.anchor === "web-pymes")!;
    expect(web.cases.map((c) => c.name)).toEqual(["Monitas.cl", "TodoClick.cl", "Parcelas Terramar"]);
    expect(web.cases.every((c) => !c.anonymized)).toBe(true);
    const byId = Object.fromEntries(web.cases.map((c) => [c.id, c]));
    expect(byId.todoclick.image.png).toContain("cases/todoclick/");
    expect(byId.terramar.image.png).toContain("cases/terramar/");
    expect(byId.todoclick.findings.some((f) => /\bh1\b/.test(f))).toBe(true);
    expect(byId.terramar.findings.length).toBeLessThanOrEqual(7);
    expect(casos.textContent ?? "").not.toMatch(/algorithmics|sortify/i);
  });

  it("el caso anonimizado lleva el rótulo y no nombra al cliente", () => {
    const anon = vnCases.filter((c) => c.anonymized);
    expect(anon.map((c) => c.id)).toEqual(["coworking"]);
    for (const c of anon) {
      const card = casos.querySelector(`[data-vn-case="${c.id}"]`)!;
      expect(card.querySelector('[data-label="anonimizado"]')?.textContent).toBe("«anonimizado»");
      expect(card.textContent ?? "").not.toMatch(/co-?work\s?latam|robotina/i);
      expect(c.image.png).toContain("method/coworking/");
    }
  });

  it("la franja se rotula «Experiencia de Rö» y nunca se presenta como clientes de VN", () => {
    expect(ro.querySelector("h2")?.textContent).toBe("Experiencia de Rö");
    expect(SERVICIOS_RO_EXPERIENCE.heading).toBe(SERVICIOS_EXPERIENCE.heading);
    expect(ro.querySelector("[data-ro-note]")?.textContent).toContain("No son clientes de Viento Norte");
    expect(ro.querySelectorAll("img").length).toBe(0);
    expect(ro.querySelector("h2")?.textContent?.toLowerCase()).not.toContain("cliente");
    const casosText = casos.textContent ?? "";
    for (const name of RO_COMPANIES) expect(casosText, name).not.toContain(name);
  });

  it("Karri y Pareti solo con el rol; Transvip y SURA solo con cifras publicadas", () => {
    const byCompany = Object.fromEntries(SERVICIOS_RO_EXPERIENCE.items.map((i) => [i.company, i]));
    expect(Object.keys(byCompany)).toEqual(["Transvip", "SURA Investments", "Karri", "Pareti"]);
    expect(byCompany.Karri.published).toEqual([]);
    expect(byCompany.Pareti.published).toEqual([]);
    expect(byCompany.Transvip.published).toEqual(["−40% en el tiempo de reserva", "+25% de conversión", "NPS 82"]);
    const projects = readFileSync(resolve(process.cwd(), "src/data/projects-data.ts"), "utf8");
    expect(projects).toContain("App Pasajeros: −40% tiempo de reserva, +25% conversión, NPS 82");
    for (const line of byCompany["SURA Investments"].published) expect(projects, line).toContain(line);
  });
});
