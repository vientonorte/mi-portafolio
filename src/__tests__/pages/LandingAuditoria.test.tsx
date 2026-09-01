import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LandingAuditoria from "@/pages/LandingAuditoria";
import { LanguageProvider } from "@/lib/LanguageContext";

function renderLanding() {
  return render(
    <MemoryRouter>
      <LanguageProvider>
        <LandingAuditoria />
      </LanguageProvider>
    </MemoryRouter>
  );
}

describe("LandingAuditoria (ads-a11y-landing)", () => {
  it("renders the Enterprise (a11y + privacy) H1 and H2", () => {
    renderLanding();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /flujo mal diseñado te cueste una multa o un cliente/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /accesibilidad.*wcag 2\.2 aa.*privacidad por diseño.*ley 21\.719/i,
      })
    ).toBeInTheDocument();
  });

  it("renders 3 benefit bullets covering fines, legal risk and losing clients", () => {
    renderLanding();
    expect(screen.getByText(/evita multas/i)).toBeInTheDocument();
    expect(screen.getByText(/mitiga el riesgo legal/i)).toBeInTheDocument();
    expect(screen.getByText(/no pierdas clientes corporativos/i)).toBeInTheDocument();
  });

  it("renders text-based social proof without outbound links", () => {
    renderLanding();
    expect(screen.getByText(/mandato afp/i)).toBeInTheDocument();
    expect(screen.getByText(/sura investments/i)).toBeInTheDocument();
    expect(screen.getByText(/\bria\b/i)).toBeInTheDocument();
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });
});
