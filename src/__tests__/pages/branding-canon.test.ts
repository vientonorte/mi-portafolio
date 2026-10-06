import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { getCompanyLogo } from "@/lib/company-logos";
import { render as renderServicios } from "@/servicios/entry-server";
import {
  BRAND_CASES,
  SERVICIOS_ANCHORS,
  SERVICIOS_CASE_ANCHORS,
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

  it("la grilla existe y agrupa por ancla canónica (#revision-gratis siempre visible, sin flag)", () => {
    expect(casos).not.toBeNull();
    expect(SERVICIOS_VN_CASE_GROUPS.map((g) => g.anchor)).toEqual([...SERVICIOS_CASE_ANCHORS]);
    expect([...casos.querySelectorAll("[data-case-group]")].map((g) => g.getAttribute("data-case-group"))).toEqual([
      ...SERVICIOS_CASE_ANCHORS,
    ]);
    expect(SERVICIOS_CASE_ANCHORS).toEqual(["consultoria-ux"]);
    expect(casos.querySelector('[data-case-group="revision-gratis"]')).toBeNull();
    expect(casos.querySelector('[data-case-group="web-pymes"]')).toBeNull();
    for (const anchor of SERVICIOS_ANCHORS) expect(doc.getElementById(anchor), anchor).not.toBeNull();
  });

  it("casos: solo consultoría (X|CMS, Ratio, Edu21, dashboard); TodoClick, Terramar y contraste fuera; Monitas fuera", () => {
    const byGroup = Object.fromEntries(SERVICIOS_VN_CASE_GROUPS.map((g) => [g.anchor, g.cases.map((c) => c.name)]));
    expect(byGroup["web-pymes"]).toBeUndefined();
    expect(byGroup["revision-gratis"]).toBeUndefined();
    expect(byGroup["consultoria-ux"]).toEqual([
      "X|CMS · Da Pleisë",
      "CFO Dashboard · Ratio Irarrázaval",
      "Edu 21",
      "Dashboard de consultoría estratégica",
    ]);
    expect(vnCases.some((c) => c.id === "monitas" || c.id === "todoclick" || c.id === "terramar" || c.id === "vientonorte-wcag")).toBe(false);
    expect(vnCases.some((c) => c.id === "claro" || c.id === "transvip")).toBe(false);
    expect(html).not.toMatch(/monitas/i);
    expect(html).not.toContain("cases/monitas");
    expect(html).not.toContain("TodoClick");
    expect(html).not.toContain("Parcelas Terramar");
    expect(html).not.toContain("Ver el servicio:");
    expect(html).not.toContain("El recorrido");
    expect(new Set(vnCases.map((c) => c.id)).size).toBe(vnCases.length);
    const byId = Object.fromEntries(vnCases.map((c) => [c.id, c]));
    expect(byId.edu21.startingPoint).toMatch(/^Diagnóstico base \(junio de 2022\): carga de 15,4 s y calificación «deficiente»\.$/);
    expect(byId.edu21.ctaAnchor).toBe("revision-gratis");
    expect(byId["x-cms"].image?.webp).toBe("images/products/x-cms/pos-productos.webp");
    expect(byId["consultoria-estrategica"].image?.webp).toBe(
      "images/products/consultoria-estrategica/modulos.webp",
    );
  });

  it("secciones eliminadas: sin experiencia de Rö, quién está detrás, cómo trabajamos, Coworking ni WCAG propia", () => {
    for (const id of ["experiencia-ro", "experiencia", "quien", "como-trabajamos"]) {
      expect(doc.getElementById(id), id).toBeNull();
    }
    const text = doc.body.textContent ?? "";
    expect(text).not.toContain("Experiencia de Rö");
    expect(text).not.toContain("Quién está detrás");
    expect(text).not.toContain("Cómo trabajamos");
    // Transvip vive en #conceptos (in-house); la franja «Experiencia de Rö» sigue fuera.
    for (const name of ["SURA", "Karri", "Pareti", "Coworking"]) {
      expect(casos.textContent ?? "", name).not.toContain(name);
    }
    expect(text).not.toMatch(/SURA Investments|Karri|Pareti/);
    const transvipHits = [...doc.querySelectorAll("main section")].filter((sec) => /Transvip/.test(sec.textContent ?? ""));
    expect(transvipHits.map((sec) => sec.id)).toEqual(["conceptos"]);
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

  it("los links de la grilla son solo #ancla canónica (grupo + tarjeta clickeable)", () => {
    const hrefs = [...casos.querySelectorAll("a")].map((a) => a.getAttribute("href") ?? "");
    expect(hrefs.length).toBeGreaterThanOrEqual(SERVICIOS_CASE_ANCHORS.length);
    for (const h of hrefs) expect(h, h).toMatch(CANON_HREF);
    for (const re of FORBIDDEN) expect(casos.outerHTML, `${re}`).not.toMatch(re);
    // Edu21 (en consultoría) apunta a #revision-gratis
    const eduLink = casos.querySelector('[data-vn-case="edu21"] a')!.getAttribute("href");
    expect(eduLink).toBe("#revision-gratis");
  });

  it("no agrega colores hex: solo tokens", () => {
    const src = readFileSync(resolve(process.cwd(), "src/servicios/ServiciosCasos.tsx"), "utf8");
    expect(src).not.toMatch(HEX);
    expect(src).toContain("bg-[var(--primary)]");
    // El marco de navegador (DeviceMockup) es el mismo componente de la tarjeta 01 y de la home: queda fuera.
    const clone = casos.cloneNode(true) as HTMLElement;
    clone.querySelectorAll("[data-device-frame]").forEach((n) => n.remove());
    const markup = clone.outerHTML.replace(/href="#[\w-]+"/g, "");
    expect(markup).not.toMatch(HEX);
    expect(markup).not.toMatch(/style="/);
  });

  it("títulos en Chillax y acento del isologo con var(--primary) (mismo borde primario que la tarjeta 01)", () => {
    const titles = [...casos.querySelectorAll("h2, h3, h4")];
    expect(titles.length).toBeGreaterThan(0);
    for (const t of titles) expect(t.className, t.textContent ?? "").toContain("var(--font-chillax)");
    const accents = casos.querySelectorAll('[data-accent="isologo"]');
    expect(accents.length).toBe(vnCases.length + 1);
    for (const a of accents) expect(a.className).toContain("bg-[var(--primary)]");
  });

  it("cada tarjeta: mockup DS; imagen WebP del repo; chips rubro+servicio", () => {
    for (const c of vnCases) {
      const card = casos.querySelector(`[data-vn-case="${c.id}"]`)!;
      expect(card, c.id).not.toBeNull();
      expect(card.querySelector("[data-device-frame]"), c.id).not.toBeNull();
      expect(c.image, c.id).toBeTruthy();
      expect(card.querySelectorAll("[data-device-frame] img").length, c.id).toBe(1);
      expect(existsSync(resolve(process.cwd(), "public", c.image!.png)), c.image!.png).toBe(true);
      if (c.image!.webp) expect(existsSync(resolve(process.cwd(), "public", c.image!.webp)), c.image!.webp).toBe(true);
      expect(card.querySelector("[data-asset-origen]")?.getAttribute("data-asset-origen") ?? card.getAttribute("data-asset-origen")).toBe("repo");
      expect(card.innerHTML, c.id).not.toContain("gees-dashboard");
      const tags = [...card.querySelectorAll("[data-tag]")].map((el) => el.getAttribute("data-tag"));
      expect(tags.sort(), c.id).toEqual(["rubro", "servicio"]);
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

/** Fix-forward 02/03 (PO, 2-oct): misma tarjeta, color, tipografía e imagen que la 01 y la home. */
describe("/servicios/ secciones 02 (#revision-gratis) y 03 (#consultoria-ux): branding de la 01", () => {
  const html = renderServicios();
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, "text/html");
  const casos = doc.getElementById("casos-vn")!;
  const group = (anchor: string) => casos.querySelector(`[data-case-group="${anchor}"]`)!;

  it("la grilla de casos es solo consultoría; Claro/Transvip quedan en Conceptos", () => {
    const ids = (anchor: string) =>
      [...(group(anchor)?.querySelectorAll("[data-vn-case]") ?? [])].map((n) => n.getAttribute("data-vn-case"));
    expect(group("revision-gratis")).toBeNull();
    expect(group("web-pymes")).toBeNull();
    expect(ids("consultoria-ux")).toEqual(["x-cms", "ratio-irarrazaval", "edu21", "consultoria-estrategica"]);
    expect(casos.querySelector('[data-vn-case="claro"]')).toBeNull();
    expect(casos.querySelector('[data-vn-case="transvip"]')).toBeNull();
    expect(casos.querySelector('[data-vn-case="vientonorte-wcag"]')).toBeNull();
  });

  it("todas las tarjetas de casos-vn usan mockup DS 16:10 (browser); título text-xl bold", () => {
    for (const anchor of ["consultoria-ux"]) {
      for (const card of group(anchor).querySelectorAll("[data-vn-case]")) {
        expect(card.getAttribute("data-card-variant"), anchor).toBe("service");
        expect(card.querySelector("[data-device-frame]"), anchor).not.toBeNull();
        const img = card.querySelector("[data-device-frame] img");
        if (img) {
          expect(img.className).toContain("aspect-[16/10]");
          expect(img.className).toContain("object-cover");
        } else {
          expect(card.querySelector("[data-asset-gap]")).not.toBeNull();
        }
        expect(card.querySelector("h4")!.className).toContain("text-xl font-bold leading-snug");
      }
    }
  });

  it("Edu 21 como diagnóstico base, nunca resultado; el caso de contraste no está", () => {
    expect(casos.querySelector('[data-vn-case="vientonorte-wcag"]')).toBeNull();
    expect(casos.textContent).not.toContain("3,50:1");
    const edu = casos.querySelector('[data-vn-case="edu21"]')!;
    const src = edu.querySelector("img")!.getAttribute("src") ?? "";
    expect(src).toMatch(/cases\/edu21\/(?:01-[\w-]+|06-performance-seo[\w-]*)\.png$/);
    expect(edu.querySelector("[data-starting-point]")!.textContent).toMatch(/15,4 s.*«deficiente».*/);
    expect(edu.querySelector("[data-starting-point]")!.textContent).toMatch(/jun/);
  });

  it("sin imágenes 04/05 de Edu 21 (uso interno), sin edu21-extra/02, sin gees-dashboard", () => {
    for (const bad of ["edu21/04-", "edu21/05-", "edu21-extra/02", "gees-dashboard"]) expect(html, bad).not.toContain(bad);
    const src = readFileSync(resolve(process.cwd(), "src/servicios/servicios-content.ts"), "utf8");
    for (const bad of ["edu21/04-", "edu21/05-", "edu21-extra/02", "gees-dashboard"]) expect(src, bad).not.toContain(bad);
  });

  it("sin «caso de éxito», Penji, Monitas ni cifras demo en /servicios/", () => {
    const text = doc.body.textContent ?? "";
    expect(text).not.toMatch(/caso de éxito|casos de éxito|Penji|Monitas/i);
    expect(html).not.toMatch(/\$\s?40\.000\.000|CLP \$/);
  });
});

/** Tarjetas 02/03 rehechas desde main (TL, 4-oct): formato exacto de la tarjeta 01, Conceptos Claro/Walmart/Transvip. */
describe("/servicios/ tarjetas 02/03: formato de la 01, Conceptos Claro/Walmart/Transvip", () => {
  const html = renderServicios();
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, "text/html");
  const casos = doc.getElementById("casos-vn")!;
  const card01 = doc.querySelector('[data-card="web-pymes"] article')!;

  it("eyebrow mono + título bold como la 01; chip rubro DS; mockup browser compartido", () => {
    const eyebrow01 = card01.querySelector("p.font-mono")!.className;
    const title01 = card01.querySelector("h3")!.className;
    for (const anchor of ["consultoria-ux"]) {
      for (const card of casos.querySelectorAll(`[data-case-group="${anchor}"] [data-vn-case]`)) {
        expect(card.querySelector('[data-tag="servicio"]')!.className).toBe(eyebrow01);
        expect(card.querySelector('[data-tag="rubro"]')!.getAttribute("data-slot")).toBe("badge");
        for (const cls of ["text-xl", "font-bold", "leading-snug"]) {
          expect(card.querySelector("h4")!.className).toContain(cls);
        }
        for (const cls of title01.split(" ").filter((c) => ["text-xl", "font-bold", "leading-snug", "text-foreground"].includes(c))) {
          expect(card.querySelector("h4")!.className).toContain(cls);
        }
        expect(card.querySelector("[data-device-frame] figure")).not.toBeNull();
      }
    }
  });

  it("Claro, Walmart y Transvip en #conceptos (prod) con origin visible y export Figma", () => {
    const conceptos = doc.getElementById("conceptos")!;
    expect(conceptos).not.toBeNull();
    const claro = conceptos.querySelector('[data-concept="claro"]')!;
    expect(claro.querySelector("[data-origin-note]")!.textContent).toBe("Concepto propio, no encargado por la marca");
    expect(claro.querySelector("[data-device-frame] img")!.getAttribute("src")).toBe(
      "/images/cases/claro/tienda-equipos-mobile.png",
    );
    expect(claro.querySelector("[data-device-frame] img")!.getAttribute("alt")).toBeTruthy();
    const gallerySrcs = [...claro.querySelectorAll("[data-concept-gallery] img")].map((i) => i.getAttribute("src"));
    expect(gallerySrcs).toEqual([
      "/images/cases/claro/claro-chile.png",
      "/images/cases/claro/prototipo-nav.png",
    ]);
    const walmart = conceptos.querySelector('[data-concept="walmart"]')!;
    expect(walmart.querySelector("h3")!.textContent).toBe("Walmart");
    expect(walmart.querySelector("[data-origin-note]")!.textContent).toBe("Concepto propio, no encargado por la marca");
    expect(walmart.querySelector("img")!.getAttribute("src")).toBe("/images/cases/walmart/catalogo.png");
    expect(walmart.textContent ?? "").not.toMatch(/penji/i);
    const tv = conceptos.querySelector('[data-concept="transvip"]')!;
    expect(tv.querySelector("[data-origin]")!.getAttribute("data-origin")).toBe("Proyecto in-house");
    expect(tv.querySelector("[data-origin-note]")!.textContent).toMatch(/No es un cliente de Viento Norte/);
    expect(tv.textContent).not.toMatch(/cliente de VN|caso de éxito/i);
    expect(tv.querySelector("img")!.getAttribute("src")).toBe("/images/cases/transvip/system-design-proposito.png");
    expect(conceptos.querySelector('[data-concept="mascotapp"]')).toBeNull();
  });

  it("sin Maraña ni Filipinas/Penji en /servicios/; Walmart sí en Conceptos", () => {
    expect(html).not.toMatch(/maraña|marana|filipinas|philippines|penji/i);
    expect(doc.querySelector('[data-concept="walmart"]')).not.toBeNull();
  });

  it("producción: Conceptos con Claro+Walmart+Transvip; MASCOTAPP ausente; sin data-placeholder", () => {
    expect(doc.getElementById("conceptos")).not.toBeNull();
    expect(html).not.toContain("data-placeholder");
    expect(doc.querySelector('[data-concept="mascotapp"]')).toBeNull();
  });
});
