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
    expect(doc.getElementById("experiencia")).toBeNull();
    expect(doc.querySelectorAll("#casos article")).toHaveLength(3);
    expect(doc.getElementById("quien")).toBeNull();
    expect(doc.getElementById("como-trabajamos")).toBeNull();
    expect(html).not.toContain("Han confiado en Viento Norte");
    expect(html).not.toContain("clientes VN");
  });

  it("hero uses the Figma DeviceMockup with the X|CMS capture", () => {
    const mock = doc.querySelector('[data-testid="hero-mockup"]')!;
    expect(mock).not.toBeNull();
    const imgs = [...mock.querySelectorAll("img")];
    expect(imgs.map((i) => i.getAttribute("src"))).toEqual(["/images/consultoria/x-cms-dashboard.png"]);
    expect(imgs[0].getAttribute("alt")).toMatch(/X\|CMS/);
    expect(imgs[0].getAttribute("width")).toBe("1440");
    expect(imgs[0].getAttribute("height")).toBe("900");
    expect(imgs[0].getAttribute("loading")).toBe("eager");
    expect(mock.textContent).toContain("x-cms · operaciones");
    expect(mock.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0);
  });

  it("cards in PO v3 order; only consultoría keeps a (real) thumbnail; lazy-loaded", () => {
    const cards = [...doc.querySelectorAll("[data-card]")];
    expect(cards.map((c) => c.getAttribute("data-card"))).toEqual(["web-pymes", "revision-gratis", "consultoria-ux"]);
    expect(doc.querySelector("[data-placeholder]")).toBeNull();
    expect(cards.map((c) => c.querySelector("[data-audience]")?.textContent)).toEqual([
      "¿No tienes sitio?",
      "¿Tu sitio tiene problemas?",
      "¿Buscas talento joven o un equipo UX?",
    ]);
    expect(cards[0].querySelector("img")?.getAttribute("src")).toBe("/images/branding/hero-ejemplo.png");
    expect(cards[0].textContent).toContain("ejemplo · tu web");
    expect(cards[1].querySelector("img")?.getAttribute("src")).toBe("/images/method/coworking/a11y-contrast.png");
    expect(cards[1].textContent).toContain("flujo · revisión");
    const img = cards[2].querySelector("img")!;
    expect(img.getAttribute("src")).toBe("/images/consultoria/x-cms-dashboard.png");
    expect(cards[2].textContent).toContain("x-cms · operaciones");
    expect(img.getAttribute("loading")).toBe("lazy");
    expect(img.getAttribute("alt")).toBeTruthy();
  });

  it("drops the second method block", () => {
    expect(doc.getElementById("como-trabajamos")).toBeNull();
  });

  it("section order: hero → opciones → casos → contacto", () => {
    const ids = [...doc.querySelectorAll("main > section")].map((s) => s.id).filter(Boolean);
    expect(ids).toEqual(["inicio", "opciones", "casos", "contacto"]);
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
    expect(doc.querySelector("[data-placeholder]")).toBeNull();
    expect(html).not.toContain("pendiente");
    expect(doc.querySelectorAll("#casos article")).toHaveLength(3);
    expect(doc.body.textContent ?? "").not.toMatch(/pendiente/i);
  });

  it("experience strip right below the hero, casos before cómo trabajamos", () => {
    const { doc } = renderQa();
    const sections = [...doc.querySelectorAll("main > section")];
    expect(sections[0].id).toBe("inicio");
    expect(sections[1].id).toBe("opciones");
    const ids = sections.map((s) => s.id).filter(Boolean);
    expect(ids).toEqual(["inicio", "opciones", "casos", "contacto"]);
    const cards = [...doc.querySelectorAll("[data-card]")];
    // Los placeholders viajan con su tarjeta (id), no con la posición
    expect(cards.map((c) => c.getAttribute("data-card"))).toEqual(["web-pymes", "revision-gratis", "consultoria-ux"]);
    expect(doc.querySelector("#web-pymes [data-placeholder]")).toBeNull();
    expect(doc.querySelector("#revision-gratis [data-placeholder]")).toBeNull();
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
      (h) =>
        !(
          h === "/qa/" ||
          h.startsWith("/qa/images/") ||
          /^#[A-Za-z][\w-]*$/.test(h) ||
          h === "mailto:contacto@vientonorte.io"
        )
    );
    expect(bad).toEqual([]);
  });
});
