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
    expect(openCalendarBooking).toHaveBeenCalledWith({ origin: "hero" });
  });
});
