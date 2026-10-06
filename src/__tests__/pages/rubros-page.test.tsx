import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { render as rtlRender } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, renderHead } from "@/rubros/entry-server";
import { RubroPage } from "@/rubros/RubroPage";
import { RUBROS, RUBRO_OFFER, RUBRO_SLUGS, getRubro, rubroCanonical } from "@/rubros/rubros-content";
import { buildServiciosPayload } from "@/servicios/servicios-contact";

/**
 * P4 — plantilla de rubros (/servicios/<slug>/) prerenderizada.
 * Hoy solo /servicios/web-dental/.
 */
const root = process.cwd();
const SLUG = "web-dental";
const parse = (html: string) => new DOMParser().parseFromString(`<body>${html}</body>`, "text/html");
const parseHead = (head: string) => new DOMParser().parseFromString(`<html><head>${head}</head></html>`, "text/html");

/** Whitelist de enlaces de la landing: home, /servicios/, anclas propias, mailto. */
function isAllowedHref(href: string, base = "/"): boolean {
  return (
    href === base ||
    href === `${base}servicios/` ||
    /^#[A-Za-z][\w-]*$/.test(href) ||
    href === "mailto:contacto@vientonorte.io"
  );
}

afterEach(() => vi.unstubAllEnvs());

describe("rubros.json", () => {
  it("only ships web-dental in this PR, keyed by a clean slug", () => {
    expect(RUBRO_SLUGS).toEqual([SLUG]);
    for (const slug of RUBRO_SLUGS) expect(slug).toMatch(/^web-[a-z0-9-]+$/);
  });

  it("offer is Web pymes $30.000 · 72 h · 50/50 and form source is web-<rubro>", () => {
    expect(RUBRO_OFFER.priceValue).toBe(30000);
    expect(RUBRO_OFFER.price).toBe("$30.000 CLP");
    expect(RUBRO_OFFER.delivery).toContain("72 horas");
    expect(RUBRO_OFFER.payment).toContain("50/50");
    expect(RUBRO_OFFER.intent).toBe("Web nueva");
    for (const [slug, r] of Object.entries(RUBROS)) {
      expect(r.form.source).toBe(slug);
      expect(r.form.source.length).toBeLessThanOrEqual(40);
      expect(r.seo.description.length).toBeLessThanOrEqual(160);
      expect(r.seo.title).toMatch(/ · Viento Norte$/);
    }
  });

  it("mockup assets exist in public/ (webp + png); nothing from interno-antes-despues", () => {
    for (const r of Object.values(RUBROS)) {
      for (const img of [r.mockups.desktop, r.mockups.mobile, r.mockups.card]) {
        expect(existsSync(resolve(root, "public", img.png)), img.png).toBe(true);
        expect(existsSync(resolve(root, "public", img.webp!)), img.webp).toBe(true);
        expect(img.alt.length).toBeGreaterThan(20);
        expect(img.alt, img.png).toMatch(/Ejemplo|ficticio/);
      }
    }
    // Una carpeta por rubro, con los nombres que escribe scripts/rubro-mockups/capture.mjs
    const dirs = readdirSync(resolve(root, "public/images/rubros"));
    expect(dirs.sort()).toEqual([...RUBRO_SLUGS].sort());
    for (const slug of RUBRO_SLUGS) {
      const files = readdirSync(resolve(root, "public/images/rubros", slug));
      expect(files.sort()).toEqual(["card", "desktop", "mobile"].flatMap((n) => [`${n}.png`, `${n}.webp`]).sort());
      const m = RUBROS[slug].mockups;
      for (const [kind, img] of Object.entries({ desktop: m.desktop, mobile: m.mobile, card: m.card })) {
        expect(img.png).toBe(`images/rubros/${slug}/${kind}.png`);
        expect(img.webp).toBe(`images/rubros/${slug}/${kind}.webp`);
      }
      expect(files.join(" ")).not.toMatch(/antes|despues|interno/i);
    }
  });

  it("mockup PNG dimensions match rubros.json (desktop 1280×800, mobile 390×844, card 1200×630)", () => {
    const size = (p: string) => {
      const b = readFileSync(resolve(root, "public", p));
      return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
    };
    for (const r of Object.values(RUBROS)) {
      for (const img of [r.mockups.desktop, r.mockups.mobile, r.mockups.card]) {
        expect(size(img.png), img.png).toEqual({ width: img.width, height: img.height });
      }
      expect([r.mockups.desktop.width, r.mockups.desktop.height]).toEqual([1280, 800]);
      expect([r.mockups.mobile.width, r.mockups.mobile.height]).toEqual([390, 844]);
      expect([r.mockups.card.width, r.mockups.card.height]).toEqual([1200, 630]);
    }
  });

  it("mockup source sites are fictional client sites: no VN brand, offers or figures", () => {
    // Regla PO 2026-09-27: el mockup muestra solo el sitio del cliente ficticio.
    const dir = resolve(root, "scripts/rubro-mockups/dental-brisa");
    const sources = readdirSync(dir)
      .filter((f) => /\.(html|css)$/.test(f))
      .map((f) => [f, readFileSync(resolve(dir, f), "utf8")] as const);
    expect(sources.map(([f]) => f)).toContain("index.html");
    for (const [f, text] of sources) {
      expect(text, f).not.toMatch(/Viento Norte/i);
      expect(text, f).not.toMatch(/vientonorte/i);
      expect(text, f).not.toMatch(/WCAG/i);
      expect(text, f).not.toContain("$");
    }
    // Cifras tipo «95%» en el HTML (el CSS usa % para layout, por eso solo el HTML).
    const html = sources.find(([f]) => f === "index.html")![1];
    expect(html).not.toMatch(/\d\s?%/);
    expect(html).toContain("Dental Brisa");
    expect(html).toMatch(/Sitio ficticio de ejemplo/);
    expect(html).not.toMatch(/interno-antes-despues|antes-despues/);
    expect(html).not.toMatch(/(src|href)="https?:/); // sin assets remotos ni marcas reales
  });

  it("copy has no invented stats, testimonials or real client names", () => {
    const text = JSON.stringify(RUBROS);
    expect(text).not.toMatch(/\d+\s?%/); // sin cifras de resultados
    expect(text).not.toMatch(/testimonio|nuestros clientes|clientes felices/i);
    expect(text).not.toMatch(/dentalfamily|dentelite|dental family/i);
    expect(text).not.toMatch(/\/s\/|\/#\//);
  });
});

describe("/servicios/web-dental/ prerender (base '/')", () => {
  const html = render(SLUG);
  const doc = parse(html);
  const r = getRubro(SLUG);

  it("renders the rubro headline as the only h1 and a sane heading order", () => {
    const h1s = doc.querySelectorAll("h1");
    expect(h1s).toHaveLength(1);
    expect(h1s[0].textContent).toBe(r.headline);
    const levels = [...doc.querySelectorAll("h1,h2,h3,h4")].map((h) => Number(h.tagName[1]));
    expect(levels[0]).toBe(1);
    for (let i = 1; i < levels.length; i++) {
      expect(levels[i] - levels[i - 1], `salto de heading en posición ${i}`).toBeLessThanOrEqual(1);
    }
  });

  it("includes the relay form with source=web-dental and 'Web nueva' preselected", () => {
    const form = doc.querySelector("form[data-endpoint]")!;
    expect(form).not.toBeNull();
    expect(form.getAttribute("data-endpoint")).toBe("https://contact.vientonorte.io/api/contact");
    expect(form.getAttribute("data-source")).toBe("web-dental");
    expect(form.querySelector<HTMLInputElement>('input[name="source"]')!.value).toBe("web-dental");
    const selected = form.querySelector<HTMLInputElement>('input[name="intent"][checked]');
    expect(selected?.value).toBe("Web nueva");
    expect(doc.getElementById("contacto")?.contains(form)).toBe(true);
  });

  it("primary CTA goes to the form on the same page; secondary link goes to /servicios/", () => {
    const primaries = [...doc.querySelectorAll('a[data-cta="primary"]')];
    expect(primaries.length).toBeGreaterThanOrEqual(1);
    for (const a of primaries) {
      expect(a.getAttribute("href")).toBe("#contacto");
      expect(a.textContent).toBe(r.cta.primary);
      expect(a.className).toContain("bg-brand-gradient-aa");
      expect(a.className).not.toMatch(/(^|\s)bg-brand-gradient(\s|$)/);
    }
    const secondary = doc.querySelector('a[data-cta="secondary"]')!;
    expect(secondary.getAttribute("href")).toBe("/servicios/");
    // El botón enviar del formulario también usa el gradiente AA
    expect(doc.querySelector('button[type="submit"]')!.className).toContain("bg-brand-gradient-aa");
  });

  it("offer shows $30.000 CLP, 72 horas and pago 50/50", () => {
    const offer = doc.querySelector("[data-offer]")!;
    expect(offer.querySelector("[data-price]")!.textContent).toBe("$30.000 CLP");
    expect(offer.textContent).toContain("72 horas");
    expect(offer.textContent).toContain("50%");
    expect(offer.textContent).toContain("Para quién");
  });

  it("fictional brand is visibly labeled 'Ejemplo' (hero caption + example section)", () => {
    expect(doc.querySelector("[data-mockup-caption]")!.textContent).toMatch(/Ejemplo.*marca ficticia/);
    expect(doc.querySelector("[data-example-label]")!.textContent).toBe("Ejemplo");
    expect(doc.getElementById("ejemplo")!.textContent).toContain("marca ficticia");
  });

  it("hero mockups: webp + png, alt, width/height, eager, from /images/rubros/", () => {
    const imgs = [...doc.querySelectorAll('[data-testid="hero-mockup"] img')];
    expect(imgs.map((i) => i.getAttribute("src"))).toEqual([
      "/images/rubros/web-dental/desktop.png",
      "/images/rubros/web-dental/mobile.png",
    ]);
    for (const img of imgs) {
      expect(img.getAttribute("alt")).toMatch(/^Ejemplo: sitio ficticio de Dental Brisa/);
      expect(img.getAttribute("width")).toBeTruthy();
      expect(img.getAttribute("height")).toBeTruthy();
      expect(img.getAttribute("loading")).toBe("eager");
      expect(img.parentElement?.querySelector('source[type="image/webp"]')).not.toBeNull();
    }
    for (const img of doc.querySelectorAll("img")) expect(img.getAttribute("alt")).not.toBeNull();
  });

  it("links are whitelisted: no /s/, no /#/, no external", () => {
    const hrefs = [...doc.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")!);
    expect(hrefs.length).toBeGreaterThan(4);
    expect(hrefs.filter((h) => !isAllowedHref(h))).toEqual([]);
    expect(html).not.toContain("/s/");
    expect(html).not.toContain("/#/");
    // Toda ancla interna existe
    for (const h of hrefs.filter((x) => x.startsWith("#"))) {
      expect(doc.getElementById(h.slice(1)), h).not.toBeNull();
    }
  });

  it("no placeholders in production", () => {
    expect(import.meta.env.BASE_URL).toBe("/");
    expect(html).not.toContain("data-placeholder");
    expect(html).not.toMatch(/pendiente|lorem|todo:|xxx/i);
  });

  it("hydrates the prerendered markup without console errors", () => {
    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      rtlRender(<RubroPage slug={SLUG} />, { container, hydrate: true });
      expect(spy).not.toHaveBeenCalled();
    } finally {
      spy.mockRestore();
      container.remove();
    }
  });
});

describe("/servicios/web-dental/ <head>", () => {
  const head = parseHead(renderHead(SLUG));

  it("canonical, robots, title, description, OG/Twitter", () => {
    const canonical = "https://vientonorte.io/servicios/web-dental/";
    expect(rubroCanonical(SLUG)).toBe(canonical);
    expect(head.querySelector('link[rel="canonical"]')!.getAttribute("href")).toBe(canonical);
    expect(head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(head.querySelector('meta[name="robots"]')!.getAttribute("content")).toBe("index, follow");
    expect(head.querySelector("title")!.textContent).toBe(getRubro(SLUG).seo.title);
    expect(head.querySelector('meta[name="description"]')!.getAttribute("content")).toBe(
      getRubro(SLUG).seo.description
    );
    expect(head.querySelector('meta[property="og:url"]')!.getAttribute("content")).toBe(canonical);
    expect(head.querySelector('meta[property="og:image"]')!.getAttribute("content")).toBe(
      "https://vientonorte.io/images/rubros/web-dental/card.png"
    );
    const all = renderHead(SLUG);
    expect(all).not.toContain("#");
    expect(all).not.toContain("/s/");
  });

  it("JSON-LD Service with the Web pymes offer and canonical URL", () => {
    const ld = JSON.parse(head.querySelector('script[type="application/ld+json"]')!.textContent!);
    expect(ld["@type"]).toBe("Service");
    expect(ld.url).toBe("https://vientonorte.io/servicios/web-dental/");
    expect(ld.offers).toMatchObject({ price: "30000", priceCurrency: "CLP" });
  });
});

describe("/servicios/web-dental/ prerender (base '/qa/')", () => {
  it("assets and links respect base /qa/", () => {
    vi.stubEnv("BASE_URL", "/qa/");
    const doc = parse(render(SLUG));
    const srcs = [...doc.querySelectorAll("img")].map((i) => i.getAttribute("src")!);
    for (const s of srcs) expect(s.startsWith("/qa/images/")).toBe(true);
    const hrefs = [...doc.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")!);
    expect(hrefs.filter((h) => !isAllowedHref(h, "/qa/"))).toEqual([]);
    expect(hrefs).toContain("/qa/servicios/");
  });
});

describe("payload source", () => {
  it("buildServiciosPayload keeps 'servicios' by default and accepts web-<rubro>", () => {
    const v = {
      nombre: "Ana",
      correo: "ana@example.cl",
      empresa: "",
      intent: "Web nueva" as const,
      detalle: "Tengo una consulta dental",
      consent: true,
      gotcha: "",
    };
    expect(buildServiciosPayload(v).source).toBe("servicios");
    expect(buildServiciosPayload(v, "web-dental").source).toBe("web-dental");
  });
});

describe("dist (si existe un build prod local)", () => {
  const file = resolve(root, "dist/servicios/web-dental/index.html");
  it.runIf(existsSync(file))("emitted page has canonical, source and no template markers", () => {
    const built = readFileSync(file, "utf8");
    if (built.includes('src="/qa/')) return; // build QA
    expect(built).toContain('<link rel="canonical" href="https://vientonorte.io/servicios/web-dental/" />');
    expect(built).toContain('data-slug="web-dental"');
    expect(built).toContain('name="source" value="web-dental"');
    expect(built).not.toContain("<!--rubro-head-->");
    expect(built).not.toContain("<!--ssr-outlet-->");
    expect(existsSync(resolve(root, "dist/rubros"))).toBe(false);
  });
});
