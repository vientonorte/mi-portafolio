import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "@/pages/Home";
import ConsultoriaVientoNorte from "@/pages/ConsultoriaVientoNorte";
import { LanguageProvider } from "@/lib/LanguageContext";
import { serviciosHref } from "@/lib/servicios-links";
import { SERVICIOS_CARDS } from "@/servicios/servicios-content";

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
});

function renderAt(ui: React.ReactElement, path = "/") {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <LanguageProvider>{ui}</LanguageProvider>
      </MemoryRouter>
    </HelmetProvider>
  );
}

/** CTA de marketing = enlaces del hero marketing + tarjetas + "ver todos". */
function marketingCtas(container: HTMLElement): HTMLAnchorElement[] {
  const hero = container.querySelector("#inicio");
  const marketing = container.querySelector('[data-testid="home-marketing"]');
  return [
    ...(hero?.querySelectorAll<HTMLAnchorElement>("a") ?? []),
    ...(marketing?.querySelectorAll<HTMLAnchorElement>("a") ?? []),
  ];
}

function assertCtas(container: HTMLElement, base: string) {
  const ctas = marketingCtas(container);
  // 2 del hero + 3 tarjetas + "ver todos". Los conceptos no tienen CTA.
  expect(ctas.length).toBe(6);
  for (const a of ctas) {
    const href = a.getAttribute("href") ?? "";
    expect(href.startsWith(`${base}servicios/`), href).toBe(true);
    expect(href).not.toContain("/#/");
    expect(href).not.toContain("/s/");
  }
  expect(ctas.map((a) => a.getAttribute("href"))).toEqual([
    `${base}servicios/#web-pymes`,
    `${base}servicios/#consultoria-ux`,
    `${base}servicios/#web-pymes`,
    `${base}servicios/#revision-gratis`,
    `${base}servicios/#consultoria-ux`,
    `${base}servicios/`,
  ]);
}

/** Decisión PO: el hero tiene exactamente 2 botones, ambos <a href> reales. */
function assertHeroButtons(container: HTMLElement, base: string, labels: [string, string]) {
  const hero = container.querySelector("#inicio")!;
  expect(hero).not.toBeNull();
  const links = [...hero.querySelectorAll<HTMLAnchorElement>("a")];
  expect(links).toHaveLength(2);
  expect(hero.querySelectorAll("button")).toHaveLength(0);
  const [primary, secondary] = links;
  expect(primary.tagName).toBe("A");
  expect(primary).toHaveAttribute("data-marketing-cta", "hero-primary");
  expect(primary).toHaveTextContent(labels[0]);
  expect(primary).toHaveAttribute("href", `${base}servicios/#web-pymes`);
  expect(secondary.tagName).toBe("A");
  expect(secondary).toHaveAttribute("data-marketing-cta", "hero-secondary");
  expect(secondary).toHaveTextContent(labels[1]);
  expect(secondary).toHaveAttribute("href", `${base}servicios/#consultoria-ux`);
  // Sin Calendar ni "Ver prototipo" en el hero
  expect(hero.textContent).not.toMatch(/prototipo|prototype|calendar|agenda/i);
  for (const a of links) expect(a.getAttribute("href")).not.toMatch(/calendar\.google|\/#\//);
}

// S42 (PO 5-oct 21:25): secundario = consultoría UX (antes revisión gratis).
const ES_LABELS: [string, string] = ["Quiero mi web en 72 h", "Consultoría UX"];
const EN_LABELS: [string, string] = ["I want my website in 72 h", "UX consulting"];

describe("serviciosHref", () => {
  it("builds HTTP URLs from BASE_URL, never hash routes", () => {
    expect(serviciosHref()).toBe("/servicios/");
    expect(serviciosHref("web-pymes")).toBe("/servicios/#web-pymes");
    expect(serviciosHref("#contacto")).toBe("/servicios/#contacto");
    vi.stubEnv("BASE_URL", "/qa/");
    expect(serviciosHref("web-pymes")).toBe("/qa/servicios/#web-pymes");
  });
});

describe("Home P3a — base '/' (producción)", () => {
  it("mounts marketing hero, service cards and cómo trabajamos", () => {
    const { container } = renderAt(<Home />);
    expect(container.querySelector('[data-testid="hero-mockup"]')).not.toBeNull();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Tecnología para empresas.");
    const cards = [...container.querySelectorAll("[data-card]")].map((c) => c.getAttribute("data-card"));
    // Mismo orden PO v3 que /servicios/ (datos compartidos SERVICIOS_CARDS)
    expect(cards).toEqual(["web-pymes", "revision-gratis", "consultoria-ux"]);
    const audience = [...container.querySelectorAll("#home-servicios [data-card]")].map(
      (c) => c.querySelector("[data-audience]")?.textContent
    );
    expect(audience).toEqual([
      "¿No tienes sitio?",
      "¿Tu sitio tiene problemas?",
      "¿Buscas talento joven o un equipo UX?",
    ]);
    expect(container.querySelector("#home-como-trabajamos")).toBeNull();
    expect(container.querySelector("#experiencia")).toBeNull();
    expect(container.querySelector("#quien")).toBeNull();
    // SEM hero no se monta en la home
    expect(screen.queryByTestId("hero-agendar")).toBeNull();
  });

  it("home cards reuse the shared SERVICIOS_CARDS data (order, eyebrow, audience, title, CTA)", () => {
    const { container } = renderAt(<Home />);
    const cards = [...container.querySelectorAll<HTMLElement>("#home-servicios [data-card]")];
    expect(cards.map((c) => c.getAttribute("data-card"))).toEqual(SERVICIOS_CARDS.map((c) => c.id));
    cards.forEach((el, i) => {
      const data = SERVICIOS_CARDS[i];
      expect(el.textContent).toContain(data.eyebrow);
      expect(el.querySelector("[data-audience]")?.textContent).toBe(data.audience);
      expect(el.textContent).toContain(data.title);
      expect(el.textContent).toContain(data.cta);
    });
    // Kicker PO de la revisión: "Gratis"
    expect(SERVICIOS_CARDS[1].eyebrow).toBe("Gratis");
  });

  it("all marketing CTAs are real <a href> to /servicios/ (no /#/, no /s/)", () => {
    const { container } = renderAt(<Home />);
    assertCtas(container, "/");
  });

  it("hero has exactly two buttons: web 72 h (primary) and consultoría UX (secondary)", () => {
    const { container } = renderAt(<Home />);
    assertHeroButtons(container, "/", ES_LABELS);
  });

  it("hero buttons have EN labels when language is English", () => {
    localStorage.setItem("language", "en");
    try {
      const { container } = renderAt(<Home />);
      assertHeroButtons(container, "/", EN_LABELS);
    } finally {
      localStorage.removeItem("language");
    }
  });

  it("hero button clicks keep the home_servicios_cta event without preventing navigation", () => {
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = [];
    const { container } = renderAt(<Home />);
    const links = [...container.querySelectorAll<HTMLAnchorElement>("#inicio a")];
    const prevented: boolean[] = [];
    const onDocClick = (e: Event) => {
      prevented.push(e.defaultPrevented); // ¿el handler de la app bloqueó la navegación?
      e.preventDefault(); // jsdom: no navegar
    };
    document.addEventListener("click", onDocClick);
    try {
      for (const a of links) fireEvent.click(a);
    } finally {
      document.removeEventListener("click", onDocClick);
    }
    expect(prevented).toEqual([false, false]);
    const events = (w.dataLayer ?? []).filter((e) => e.event === "home_servicios_cta");
    expect(events.map((e) => e.cta_id)).toEqual(["hero-primary", "hero-secondary"]);
    expect(events.map((e) => e.link_url)).toEqual(["/servicios/#web-pymes", "/servicios/#consultoria-ux"]);
  });

  it("hero shows the S42 offer «Web en 72h · $30.000 · 50/50» first", () => {
    const { container } = renderAt(<Home />);
    const offer = container.querySelector("#inicio [data-hero-offer]");
    expect(offer).not.toBeNull();
    expect(offer).toHaveTextContent("Web en 72h · $30.000 · 50/50");
    // Primer bloque de texto del hero (antes del H1) para quedar sin scroll en mobile
    const hero = container.querySelector("#inicio")!;
    const first = hero.querySelector("p, h1");
    expect(first).toBe(offer);
  });

  it("hero LCP image: fetchpriority=high, eager (no lazy), intrinsic width/height", () => {
    const { container } = renderAt(<Home />);
    const img = container.querySelector<HTMLImageElement>('[data-testid="hero-mockup"] img')!;
    expect(img.getAttribute("fetchpriority")).toBe("high");
    expect(img.getAttribute("loading")).toBe("eager");
    expect(img.getAttribute("width")).toBe("1440");
    expect(img.getAttribute("height")).toBe("900");
  });

  it("no in-page #anchor links inside the marketing sections", () => {
    const { container } = renderAt(<Home />);
    for (const a of marketingCtas(container)) {
      expect(a.getAttribute("href")?.startsWith("#")).toBe(false);
    }
  });

  it("renders branding in prod and zero data-placeholder", () => {
    const { container } = renderAt(<Home />);
    expect(container.querySelector("[data-placeholder]")).toBeNull();
    expect(container.innerHTML).not.toContain("data-placeholder");
    expect(container.querySelector("#experiencia")).toBeNull();
    expect(container.querySelector("#quien")).toBeNull();
    expect(container.querySelector("#home-casos")).toBeNull();
    expect(container.querySelector("#especialidades")).toBeNull();
    expect(container.querySelector(".funnel-sticky-shell")).toBeNull();
    expect(container.textContent).not.toContain("El recorrido");
    expect(container.textContent).not.toContain("Monitas");
    expect(container.querySelector("#conceptos")).not.toBeNull();
    expect([...container.querySelectorAll("#conceptos [data-concept]")].map((el) => el.getAttribute("data-concept"))).toEqual([
      "claro",
      "walmart",
      "transvip",
    ]);
    const details = [...container.querySelectorAll<HTMLDetailsElement>("#home-servicios details")];
    expect(details).toHaveLength(3);
    for (const el of details) {
      expect(el.open).toBe(false);
      expect(el.querySelector("summary")?.textContent).toContain("Ver el detalle");
    }
    expect(container.innerHTML).not.toContain("Han confiado");
    expect(container.innerHTML).not.toContain("clientes VN");
    const hero = container.querySelector('[data-testid="hero-mockup"]')!;
    expect(hero.querySelector("img")?.getAttribute("src")).toBe("/images/consultoria/x-cms-dashboard.png");
    expect(hero.querySelector("img")?.getAttribute("alt")).toMatch(/X\|CMS/);
    expect(hero.textContent).toContain("x-cms · operaciones");
    expect(hero.querySelectorAll("img")).toHaveLength(1);
  });
});

describe("Home P3a — base '/qa/' (QA)", () => {
  it("CTAs respect /qa/ base and QA renders no placeholders (TL 9-oct)", () => {
    vi.stubEnv("BASE_URL", "/qa/");
    const { container } = renderAt(<Home />);
    assertCtas(container, "/qa/");
    assertHeroButtons(container, "/qa/", ES_LABELS);
    expect(container.querySelector("[data-placeholder]")).toBeNull();
    expect(container.querySelector("[data-concept='mascotapp']")).toBeNull();
    expect(container.textContent).not.toContain("Imagen pendiente de exportar");
    expect(container.querySelector("#home-casos")).toBeNull();
    expect(container.querySelectorAll("#conceptos [data-concept]")).toHaveLength(3);
    const heroSrc = container.querySelector('[data-testid="hero-mockup"] img')?.getAttribute("src");
    expect(heroSrc).toBe("/qa/images/consultoria/x-cms-dashboard.png");
  });
});

describe("SEM /consultoria unchanged", () => {
  it("keeps the funnel hero and does not mount home marketing sections", () => {
    const { container } = renderAt(<ConsultoriaVientoNorte variant="sem" />, "/consultoria");
    expect(screen.getByTestId("hero-agendar")).toBeInTheDocument();
    expect(container.querySelector('[data-testid="home-marketing"]')).toBeNull();
    expect(container.querySelector('[data-testid="hero-mockup"]')).toBeNull();
  });
});

describe("Hero primary CTA uses the shared AA brand gradient", () => {
  it("hero primary <a> uses bg-brand-gradient (700 tokens; ratios in a11y/gradient-contrast.test.ts)", () => {
    const { container } = renderAt(<Home />);
    const primary = container.querySelector<HTMLAnchorElement>('#inicio a[data-marketing-cta="hero-primary"]')!;
    expect(primary.className).toContain("bg-brand-gradient");
    expect(primary.className).not.toMatch(/bg-\[linear-gradient/);
  });
});
