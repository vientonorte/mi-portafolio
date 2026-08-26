import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { ConsultoriaLandingHero } from "@/components/organisms/ConsultoriaLandingHero";
import { LanguageProvider } from "@/lib/LanguageContext";

const openCalendarBooking = vi.fn(() => true);

vi.mock("@/lib/site-contact", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/site-contact")>();
  return {
    ...actual,
    openCalendarBooking: (...args: unknown[]) => openCalendarBooking(...args),
  };
});

function renderHero() {
  return render(
    <MemoryRouter>
      <LanguageProvider>
        <ConsultoriaLandingHero />
      </LanguageProvider>
    </MemoryRouter>
  );
}

describe("ConsultoriaLandingHero", () => {
  it("restores Agendar in the home hero", async () => {
    const user = userEvent.setup();
    renderHero();
    const agendar = screen.getByTestId("hero-agendar");
    expect(agendar).toHaveTextContent(/Agendar/i);
    expect(screen.getByTestId("hero-gratis-a11y")).toBeInTheDocument();
    await user.click(agendar);
    expect(openCalendarBooking).toHaveBeenCalledWith({ origin: "consultoria-hero" });
  });

  it("tells brand story without Radar, auditoria, or personal name", () => {
    const { container } = renderHero();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /Tecnología para empresas/i
    );
    expect(screen.getByText(/Diseño que reduce el ruido/i)).toBeInTheDocument();
    const tiles = screen.getByTestId("hero-story-tiles");
    expect(tiles).toHaveTextContent(/Revisión de un flujo/i);
    expect(tiles).toHaveTextContent(/En su CMS o CRM/i);
    expect(tiles).toHaveTextContent(/Diagnóstico 5–7 días/i);
    const imgs = screen.getAllByRole("img");
    expect(imgs).toHaveLength(4);
    expect(imgs.map((img) => img.getAttribute("src"))).toEqual([
      "/images/ads/01-1200x627-revision-flujo.png",
      "/images/ads/02-1200x627-tecnologia-empresas.png",
      "/images/ads/03-1080x1080-cms-crm.png",
      "/images/ads/04-1080x1080-diagnostico.png",
    ]);
    expect(container.textContent).not.toMatch(/Radar/i);
    expect(container.textContent).not.toMatch(/auditor[íi]a/i);
    expect(container.textContent).not.toMatch(/Rodrigo/i);
  });
});
