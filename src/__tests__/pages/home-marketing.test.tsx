import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
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
    `${base}servicios/`,
    `${base}servicios/#contacto`,
    `${base}servicios/#revision-gratis`,
    `${base}servicios/#web-pymes`,
    `${base}servicios/#consultoria-ux`,
    `${base}servicios/`,
  ]);
}

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
    expect(cards).toEqual(["revision-gratis", "web-pymes", "consultoria-ux"]);
    const steps = [...container.querySelectorAll("#home-como-trabajamos li h3")].map((h) => h.textContent);
    expect(steps[0]).toContain("Kickoff de 30 minutos");
    // SEM hero no se monta en la home
    expect(screen.queryByTestId("hero-agendar")).toBeNull();
  });

  it("all marketing CTAs are real <a href> to /servicios/ (no /#/, no /s/)", () => {
    const { container } = renderAt(<Home />);
    assertCtas(container, "/");
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
