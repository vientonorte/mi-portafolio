/**
 * Experiencias (S42 v3): un solo componente (ServiciosCasos) para la home y /servicios/#experiencias.
 * Nivel 1 = rubro, disciplina, título, resumen e imagen exportada. Nivel 2 = detalle en
 * <details>/<summary> nativo (teclado, estado expandido, foco visible con token del DS).
 */
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "@/pages/Home";
import { LanguageProvider } from "@/lib/LanguageContext";
import { render as renderServicios } from "@/servicios/entry-server";

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
});

function renderHome() {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={["/"]}>
        <LanguageProvider>
          <Home />
        </LanguageProvider>
      </MemoryRouter>
    </HelmetProvider>
  );
}

const cardIds = (root: ParentNode) =>
  [...root.querySelectorAll("#experiencias article")].map(
    (a) => a.getAttribute("data-vn-case") ?? a.getAttribute("data-concept")
  );

function assertCards(root: ParentNode) {
  const cards = [...root.querySelectorAll<HTMLElement>("#experiencias article")];
  expect(cards.length).toBeGreaterThan(0);
  for (const card of cards) {
    const id = card.getAttribute("data-vn-case") ?? card.getAttribute("data-concept");
    // Nivel 1
    expect(card.querySelector('[data-tag="rubro"]')?.textContent?.trim(), `${id} rubro`).toBeTruthy();
    expect(card.querySelector('[data-tag="servicio"]')?.textContent?.trim(), `${id} disciplina`).toBeTruthy();
    expect(card.querySelector("h3")?.textContent?.trim(), `${id} título`).toBeTruthy();
    expect(card.querySelector("img")?.getAttribute("src"), `${id} imagen`).toBeTruthy();
    expect(card.querySelector("[data-placeholder]"), `${id} sin placeholder`).toBeNull();
    // Nivel 2: los bullets viven solo dentro de <details>, cerrado por defecto
    const details = card.querySelector("details[data-case-detail]");
    const lists = [...card.querySelectorAll("ul.list-disc")];
    for (const ul of lists) expect(ul.closest("details"), `${id} bullets en details`).not.toBeNull();
    if (details) {
      expect(details.hasAttribute("open")).toBe(false);
      const summary = details.querySelector(":scope > summary");
      expect(summary, `${id} summary`).not.toBeNull();
      expect(summary!.className).toContain("focus-visible:outline-[var(--vn-color-focus)]");
      expect(summary!.className).toContain("min-h-11");
    }
  }
}

describe("Experiencias: componente único home + /servicios/", () => {
  it("/servicios/: CTA #web-pymes y #consultoria-ux sobre la grilla; tarjetas en 2 niveles", () => {
    const doc = new DOMParser().parseFromString(`<body>${renderServicios()}</body>`, "text/html");
    const ctas = [...doc.querySelectorAll('#experiencias nav[aria-label="Servicios"] a')].map((a) => a.getAttribute("href"));
    expect(ctas).toEqual(["#web-pymes", "#consultoria-ux"]);
    assertCards(doc);
    expect(doc.querySelector('[data-concept="mascotapp"]')).toBeNull();
  });

  it("home: la misma sección, mismas tarjetas, CTA HTTP a /qa/servicios/#… (sin /#/ ni /s/)", () => {
    vi.stubEnv("BASE_URL", "/qa/");
    const servicios = new DOMParser().parseFromString(`<body>${renderServicios()}</body>`, "text/html");
    const { container } = renderHome();
    expect(cardIds(container)).toEqual(cardIds(servicios));
    const ctas = [...container.querySelectorAll('#experiencias nav[aria-label="Servicios"] a')].map((a) => a.getAttribute("href"));
    expect(ctas).toEqual(["/qa/servicios/#web-pymes", "/qa/servicios/#consultoria-ux"]);
    assertCards(container);
    expect(container.textContent).not.toContain("Imagen pendiente de exportar");
  });

  it("el detalle se abre y se cierra desde el summary (activación nativa: clic, Enter o Espacio)", () => {
    const { container } = renderHome();
    const details = container.querySelector<HTMLDetailsElement>("#experiencias details[data-case-detail]")!;
    expect(details).not.toBeNull();
    const summary = details.querySelector("summary")!;
    expect(summary.tabIndex).toBeGreaterThanOrEqual(0);
    fireEvent.click(summary);
    expect(details.open).toBe(true);
    fireEvent.click(summary);
    expect(details.open).toBe(false);
  });
});
