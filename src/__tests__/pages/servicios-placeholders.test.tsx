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
    expect(doc.getElementById("casos")).toBeNull();
    expect([...doc.querySelectorAll("#conceptos [data-concept]")].map((el) => el.getAttribute("data-concept"))).toEqual([
      "claro",
      "walmart",
      "transvip",
    ]);
    expect(doc.getElementById("quien")).toBeNull();
    expect(doc.getElementById("como-trabajamos")).toBeNull();
    expect(html).not.toContain("Han confiado en Viento Norte");
    expect(html).not.toContain("clientes VN");
  });

  it("hero uses the Figma DeviceMockup with the X|CMS capture", () => {
    const mock = doc.querySelector('[data-testid="hero-mockup"]')!;
    expect(mock).not.toBeNull();
    const imgs = [...mock.querySelectorAll("img")];
    // Recorte limpio del POS: sin cifras de demo que parezcan métricas (Rö/TL, 1-oct 10:42).
    expect(imgs.map((i) => i.getAttribute("src"))).toEqual(["/images/products/x-cms/pos-productos.png"]);
    expect(imgs[0].getAttribute("alt")).toMatch(/X\|CMS/);
    // width/height los fija DeviceMockup (marco del navegador), no la imagen.
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
    expect(cards[1].querySelector("img")?.getAttribute("src")).toBe("/images/products/x-cms/pos-productos.png");
    expect(cards[1].textContent).toContain("x-cms · flujo");
    const img = cards[2].querySelector("img")!;
    expect(img.getAttribute("src")).toBe("/images/products/ratio/cfo-dashboard.png");
    expect(cards[2].textContent).toContain("x-cms · operaciones");
    expect(img.getAttribute("loading")).toBe("lazy");
    expect(img.getAttribute("alt")).toBeTruthy();
  });

  it("drops the second method block", () => {
    expect(doc.getElementById("como-trabajamos")).toBeNull();
  });

  it("conceptos usan el mockup estándar: una pantalla en DeviceMockup, sin el tablero de Figma", () => {
    const claro = doc.querySelector("[data-concept='claro']")!;
    const walmart = doc.querySelector("[data-concept='walmart']")!;
    const transvip = doc.querySelector("[data-concept='transvip']")!;
    expect(claro.querySelector("img")?.getAttribute("src")).toBe(
      "/images/cases/claro/tienda-equipos-screen.png"
    );
    expect(claro.textContent).toContain("claro · tienda equipos");
    expect(claro.textContent).toContain("vía Havas");
    expect(claro.textContent).toContain("Siguen en producción");
    expect(claro.textContent).not.toContain("no encargado por la marca");
    expect(walmart.textContent).toContain("Encargo de la marca");
    expect(walmart.textContent).not.toContain("exploración");
    expect(transvip.textContent).toContain("Encargo del equipo de producto");
    expect(doc.getElementById("experiencias")?.textContent).toContain("Experiencia y método en práctica");
    expect(claro.querySelector("img")?.className).toContain("aspect-[16/10]");
    expect(doc.querySelector("[data-vn-case='todoclick'] img")?.className).not.toContain("aspect-[16/10]");
    expect(doc.querySelector("[data-vn-case='x-cms'] img")?.className).not.toContain("aspect-[16/10]");
    expect(doc.querySelector("[data-vn-case='todoclick']")?.textContent).toContain("todoclick · heurística");
    expect(doc.querySelector("[data-concept-gallery]")).toBeNull();
    expect(walmart.textContent).toContain("walmart · catálogo");
    expect(walmart.querySelector("img")?.getAttribute("src")).toBe(
      "/images/cases/walmart/catalogo-screen.png"
    );
    expect(walmart.querySelector("img")?.getAttribute("width")).toBe("125");
    expect(walmart.querySelector("img")?.getAttribute("data-pixel-scale")).toBe("2");
    expect(walmart.querySelector("img")?.className).toContain("[image-rendering:pixelated]");
    expect(walmart.querySelector("img")?.className).not.toContain("aspect-[16/10]");
    expect(transvip.textContent).toContain("transvip · system design");
    expect(transvip.querySelector("img")?.getAttribute("src")).toBe(
      "/images/cases/transvip/system-design-proposito.png"
    );
  });

  it("Monitas y El recorrido no aparecen; Edu 21 sigue en la grilla; conceptos son Claro, Walmart y Transvip", () => {
    expect(doc.getElementById("casos")).toBeNull();
    expect(doc.body.textContent ?? "").not.toContain("Monitas");
    expect(doc.body.textContent ?? "").not.toContain("El recorrido");
    expect(doc.querySelector('[data-vn-case="edu21"]')).not.toBeNull();
    expect([...doc.querySelectorAll("#conceptos [data-concept]")].map((el) => el.getAttribute("data-concept"))).toEqual([
      "claro",
      "walmart",
      "transvip",
    ]);
  });

  it("section order: hero → opciones → casos-vn → conceptos → contacto", () => {
    const ids = [...doc.querySelectorAll("main > section")].map((s) => s.id).filter(Boolean);
    expect(ids).toEqual(["inicio", "opciones", "experiencias", "contacto"]);
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

  it("renders the MASCOTAPP placeholder inside PendingSlot and the three concepts with image", () => {
    const { doc } = renderQa();
    expect(doc.getElementById("casos")).toBeNull();
    expect([...doc.querySelectorAll("#conceptos [data-concept]")].map((el) => el.getAttribute("data-concept"))).toEqual([
      "claro",
      "walmart",
      "transvip",
      "mascotapp",
    ]);
    const slot = doc.querySelector("[data-concept='mascotapp'] [data-placeholder]");
    expect(slot).not.toBeNull();
    expect(slot?.getAttribute("data-placeholder")).toBe("pendiente-ro");
    expect(doc.querySelector("[data-concept='claro'] [data-placeholder]")).toBeNull();
  });

  it("experience strip right below the hero, casos before cómo trabajamos", () => {
    const { doc } = renderQa();
    const sections = [...doc.querySelectorAll("main > section")];
    expect(sections[0].id).toBe("inicio");
    expect(sections[1].id).toBe("opciones");
    const ids = sections.map((s) => s.id).filter(Boolean);
    expect(ids).toEqual(["inicio", "opciones", "experiencias", "contacto"]);
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
          h === "/qa/servicios/" ||
          h.startsWith("/qa/images/") ||
          /^#[A-Za-z][\w-]*$/.test(h) ||
          /^\/qa\/servicios\/#[A-Za-z][\w-]*$/.test(h) ||
          h === "mailto:contacto@vientonorte.io"
        )
    );
    expect(bad).toEqual([]);
  });
});
