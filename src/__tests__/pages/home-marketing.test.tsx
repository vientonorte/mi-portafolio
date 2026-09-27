import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "@/pages/Home";
import ConsultoriaVientoNorte from "@/pages/ConsultoriaVientoNorte";
import { LanguageProvider } from "@/lib/LanguageContext";
import { serviciosHref } from "@/lib/servicios-links";

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
  // 2 del hero + 3 tarjetas + "ver todos"
  expect(ctas.length).toBe(6);
  for (const a of ctas) {
    const href = a.getAttribute("href") ?? "";
    expect(href.startsWith(`${base}servicios/`), href).toBe(true);
    expect(href).not.toContain("/#/");
    expect(href).not.toContain("/s/");
  }
  expect(ctas.map((a) => a.getAttribute("href"))).toEqual([
    `${base}servicios/#web-pymes`,
    `${base}servicios/#revision-gratis`,
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
  expect(secondary).toHaveAttribute("href", `${base}servicios/#revision-gratis`);
  // Sin Calendar ni "Ver prototipo" en el hero
  expect(hero.textContent).not.toMatch(/prototipo|prototype|calendar|agenda/i);
  for (const a of links) expect(a.getAttribute("href")).not.toMatch(/calendar\.google|\/#\//);
}

const ES_LABELS: [string, string] = ["Quiero mi web en 72 h", "Revisión gratis de mi sitio"];
const EN_LABELS: [string, string] = ["I want my website in 72 h", "Free review of my site"];

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
    const steps = [...container.querySelectorAll("#home-como-trabajamos li h3")].map((h) => h.textContent);
    expect(steps[0]).toContain("Kickoff de 30 minutos");
    // SEM hero no se monta en la home
    expect(screen.queryByTestId("hero-agendar")).toBeNull();
  });

  it("all marketing CTAs are real <a href> to /servicios/ (no /#/, no /s/)", () => {
    const { container } = renderAt(<Home />);
    assertCtas(container, "/");
  });

  it("hero has exactly two buttons: web 72 h (primary) and revisión gratis (secondary)", () => {
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
    expect(events.map((e) => e.link_url)).toEqual(["/servicios/#web-pymes", "/servicios/#revision-gratis"]);
  });

  it("no in-page #anchor links inside the marketing sections", () => {
    const { container } = renderAt(<Home />);
    for (const a of marketingCtas(container)) {
      expect(a.getAttribute("href")?.startsWith("#")).toBe(false);
    }
  });

  it("renders zero data-placeholder and omits logo strip / casos", () => {
    const { container } = renderAt(<Home />);
    expect(container.querySelector("[data-placeholder]")).toBeNull();
    expect(container.innerHTML).not.toContain("data-placeholder");
    expect(container.querySelector("#logo-strip-heading")).toBeNull();
    expect(container.querySelector("#home-casos")).toBeNull();
  });
});

describe("Home P3a — base '/qa/' (QA)", () => {
  it("CTAs respect /qa/ base and placeholders appear only via PendingSlot", () => {
    vi.stubEnv("BASE_URL", "/qa/");
    const { container } = renderAt(<Home />);
    assertCtas(container, "/qa/");
    assertHeroButtons(container, "/qa/", ES_LABELS);
    const slots = [...container.querySelectorAll("[data-placeholder]")];
    expect(slots.length).toBe(5 + 2 + 3);
    for (const s of slots) expect(s.getAttribute("data-placeholder")).toBe("pendiente-ro");
    expect(container.querySelector("#logo-strip-heading")).not.toBeNull();
    expect(container.querySelector("#home-casos")).not.toBeNull();
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
