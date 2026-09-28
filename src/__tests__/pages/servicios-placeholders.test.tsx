import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render } from "@/servicios/entry-server";

const parse = (html: string) => new DOMParser().parseFromString(`<body>${html}</body>`, "text/html");

afterEach(() => vi.unstubAllEnvs());

describe("/servicios/ v2 — prerender base '/' (producción)", () => {
  const html = render();
  const doc = parse(html);

  it("contains zero data-placeholder and no 'pendiente' text", () => {
    expect(import.meta.env.BASE_URL).toBe("/");
    expect(html).not.toContain("data-placeholder");
    expect(doc.body.textContent ?? "").not.toMatch(/pendiente/i);
    expect(html).not.toMatch(/pendiente/i);
  });

  it("renders experience, cases and founder; no client-logo strip", () => {
    expect(doc.getElementById("logo-strip-heading")).toBeNull();
    expect(doc.getElementById("experiencia-heading")?.textContent).toBe("Experiencia de Rö");
    expect(doc.querySelectorAll("#casos article")).toHaveLength(3);
    expect(doc.getElementById("quien-heading")?.textContent).toBe("Quién está detrás");
    expect(doc.querySelector("[data-photo-slot='empty'] img")).toBeNull();
    expect(html).not.toContain("Han confiado en Viento Norte");
    expect(html).not.toContain("clientes VN");
  });

  it("hero is the Ejemplo frame (webp + png, alt, eager) without figures in the device", () => {
    const mock = doc.querySelector('[data-testid="hero-mockup"]')!;
    expect(mock).not.toBeNull();
    const imgs = [...mock.querySelectorAll("img")];
    expect(imgs.map((i) => i.getAttribute("src"))).toEqual(["/images/branding/hero-ejemplo.png"]);
    for (const img of imgs) {
      expect(img.getAttribute("alt")).toMatch(/Ejemplo/);
      expect(img.getAttribute("alt")).not.toMatch(/\d|\$|%/);
      expect(img.getAttribute("width")).toBe("1440");
      expect(img.getAttribute("height")).toBe("900");
      expect(img.getAttribute("loading")).toBe("eager");
      expect(img.parentElement?.querySelector('source[type="image/webp"]')).not.toBeNull();
    }
    expect(mock.textContent ?? "").not.toMatch(/transvip|sura|\$|%/i);
    expect(mock.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0);
  });

  it("cards in PO v3 order; only consultoría keeps a (real) thumbnail; lazy-loaded", () => {
    const cards = [...doc.querySelectorAll("[data-card]")];
    expect(cards.map((c) => c.getAttribute("data-card"))).toEqual(["web-pymes", "revision-gratis", "consultoria-ux"]);
    expect(doc.querySelectorAll("[data-card] [data-placeholder]")).toHaveLength(0);
    expect(cards.map((c) => c.querySelector("[data-audience]")?.textContent)).toEqual([
      "¿No tienes sitio?",
      "¿Tu sitio tiene problemas?",
      "¿Buscas talento joven o un equipo UX?",
    ]);
    expect(cards[0].querySelector("img")).toBeNull();
    expect(cards[1].querySelector("img")).toBeNull();
    const img = cards[2].querySelector("img")!;
    expect(img.getAttribute("src")).toBe("/images/poc-modules/dashboard.png");
    expect(img.getAttribute("loading")).toBe("lazy");
    expect(img.getAttribute("alt")).toBeTruthy();
  });

  it("Cómo trabajamos: 3 steps, first is the 30-min kickoff", () => {
    const steps = [...doc.querySelectorAll("#como-trabajamos li h3")].map((h) => h.textContent);
    expect(steps).toHaveLength(3);
    expect(steps[0]).toContain("Kickoff de 30 minutos");
    expect(steps[1]).toContain("Propuesta con alcance y precio");
    expect(steps[2]).toContain("Entrega e iteración");
  });

  it("section order: hero → experiencia → opciones → casos → quién → cómo trabajamos → contacto", () => {
    const ids = [...doc.querySelectorAll("main > section")].map((s) => s.id).filter(Boolean);
    expect(ids).toEqual(["inicio", "experiencia", "opciones", "casos", "quien", "como-trabajamos", "contacto"]);
  });

  it("built dist (if present, base '/') has no placeholders", () => {
    const dist = resolve(process.cwd(), "dist/servicios/index.html");
    if (!existsSync(dist)) return;
    const built = readFileSync(dist, "utf8");
    if (built.includes('src="/qa/')) return; // dist de QA: cubierto abajo
    expect(built).not.toContain("data-placeholder");
    expect(built).not.toMatch(/pendiente/i);
  });
});

describe("/servicios/ v2 — prerender base '/qa/' (QA)", () => {
  const renderQa = () => {
    vi.stubEnv("BASE_URL", "/qa/");
    const html = render();
    return { html, doc: parse(html) };
  };

  it("renders placeholders, all inside PendingSlot (data-placeholder='pendiente-ro')", () => {
    const { html, doc } = renderQa();
    const slots = [...doc.querySelectorAll("[data-placeholder]")];
    expect(slots.length).toBe(2);
    for (const s of slots) expect(s.getAttribute("data-placeholder")).toBe("pendiente-ro");
    expect(doc.querySelectorAll('[data-placeholder-variant="logo"]')).toHaveLength(0);
    expect(doc.querySelectorAll('[data-placeholder-variant="thumb"]')).toHaveLength(2);
    expect(doc.querySelectorAll('[data-placeholder-variant="case"]')).toHaveLength(0);
    expect(html).not.toContain("Logo pendiente de autorización");
    expect(html).toContain("Antes / después de un flujo (pendiente)");
    expect(html).toContain("Mockup web pyme (pendiente)");
    expect(html).not.toContain("Caso pendiente de confirmar");
    expect(doc.getElementById("experiencia-heading")?.textContent).toBe("Experiencia de Rö");
    expect(doc.querySelectorAll("#casos article")).toHaveLength(3);
    // Todo texto "pendiente" vive dentro de un PendingSlot
    for (const s of slots) s.remove();
    expect(doc.body.textContent ?? "").not.toMatch(/pendiente/i);
  });

  it("experience strip right below the hero, casos before cómo trabajamos", () => {
    const { doc } = renderQa();
    const sections = [...doc.querySelectorAll("main > section")];
    expect(sections[0].id).toBe("inicio");
    expect(sections[1].querySelector("#experiencia-heading")?.textContent).toBe("Experiencia de Rö");
    const ids = sections.map((s) => s.id).filter(Boolean);
    expect(ids).toEqual(["inicio", "experiencia", "opciones", "casos", "quien", "como-trabajamos", "contacto"]);
    const cards = [...doc.querySelectorAll("[data-card]")];
    // Los placeholders viajan con su tarjeta (id), no con la posición
    expect(cards.map((c) => c.getAttribute("data-card"))).toEqual(["web-pymes", "revision-gratis", "consultoria-ux"]);
    expect(doc.querySelector("#web-pymes [data-placeholder]")?.textContent).toContain("Mockup web pyme");
    expect(doc.querySelector("#revision-gratis [data-placeholder]")?.textContent).toContain("Antes / después");
    expect(doc.querySelector("#consultoria-ux [data-placeholder]")).toBeNull();
    expect(doc.querySelector("#consultoria-ux img")).not.toBeNull();
  });

  it("asset URLs and home link respect base /qa/", () => {
    const { html, doc } = renderQa();
    const srcs = [...doc.querySelectorAll("img")].map((i) => i.getAttribute("src"));
    expect(srcs.length).toBeGreaterThan(0);
    for (const s of srcs) expect(s!.startsWith("/qa/images/")).toBe(true);
    expect(html).not.toContain("/#/");
    expect(html).not.toContain("/s/");
    expect(html).not.toContain("TODO");
    const hrefs = [...html.matchAll(/href="([^"]*)"/g)].map((m) => m[1]);
    const bad = hrefs.filter(
      (h) => !(h === "/qa/" || /^#[A-Za-z][\w-]*$/.test(h) || h === "mailto:contacto@vientonorte.io")
    );
    expect(bad).toEqual([]);
  });
});
