import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import Digitalizacion from "@/pages/Digitalizacion";
import DigitalizacionDemo from "@/pages/DigitalizacionDemo";
import { LanguageProvider } from "@/lib/LanguageContext";

function renderPage(node: React.ReactNode) {
  return render(
    <HelmetProvider>
      <MemoryRouter>
        <LanguageProvider>{node}</LanguageProvider>
      </MemoryRouter>
    </HelmetProvider>
  );
}

describe("/#/digitalizacion landing (MVP)", () => {
  it("is noindex, WhatsApp-first with the real VN number, and never links /s/consultoria", async () => {
    const { container } = renderPage(<Digitalizacion />);
    await vi.waitFor(() => {
      expect(document.querySelector('meta[name="robots"][content="noindex, nofollow"]')).not.toBeNull();
    });
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const html = container.innerHTML;
    expect(html).toContain("https://wa.me/56942637408?text=");
    expect(html).not.toContain("/s/consultoria");
    expect(html).not.toContain("TODO_WHATSAPP");
    const consult = container.querySelector('a[href*="#/consultoria"]');
    expect(consult?.getAttribute("href")).toMatch(/^\/\?utm_source=[^#]+#\/consultoria$/);
    expect(screen.getByText("¿Es un POS de tarjetas?")).toBeInTheDocument();
    expect(screen.getByText("¿Quién ve mis datos bancarios?")).toBeInTheDocument();
  });

  it("does not invent prices for Cobros/Dashboard nor claim an official Fintoc partnership", () => {
    const { container } = renderPage(<Digitalizacion />);
    const text = container.textContent ?? "";
    expect(text.match(/Cotiza/g)?.length).toBeGreaterThanOrEqual(2);
    expect(text).not.toMatch(/alianza oficial con Fintoc|partner oficial/i);
  });
});

describe("/#/digitalizacion/demo", () => {
  it("shows the sample banner and renders data (KPIs, categories, movements)", async () => {
    renderPage(<DigitalizacionDemo />);
    expect(screen.getByTestId("sample-banner")).toHaveTextContent("Datos de ejemplo");
    expect(screen.getByTestId("demo-kpis").textContent).toContain("$");
    expect(screen.getByTestId("demo-top-categories").querySelectorAll("li").length).toBeGreaterThan(2);
    expect(screen.getByTestId("demo-movements").querySelectorAll("tbody tr").length).toBeGreaterThan(5);
    await vi.waitFor(() => {
      expect(document.querySelector('meta[name="robots"][content="noindex, nofollow"]')).not.toBeNull();
    });
  });

  it("pushes digitalizacion_demo_view to the dataLayer", () => {
    (window as unknown as { dataLayer: unknown[] }).dataLayer = [];
    renderPage(<DigitalizacionDemo />);
    const dl = (window as unknown as { dataLayer: Array<Record<string, unknown>> }).dataLayer;
    expect(dl.some((e) => e.event === "digitalizacion_demo_view")).toBe(true);
  });
});
