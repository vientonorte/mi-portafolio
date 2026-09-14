import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { ConsultoriaLandingHero } from "@/components/organisms/ConsultoriaLandingHero";
import { LanguageProvider } from "@/lib/LanguageContext";

const openCalendarBooking = vi.fn(() => true);
const navigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

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
  it("lead is primary: Agendar before demo; prototipo goes to Apple POC", async () => {
    const user = userEvent.setup();
    renderHero();
    const agendar = screen.getByTestId("hero-agendar");
    const demo = screen.getByTestId("hero-demo-xcms");
    const proto = screen.getByTestId("hero-prototipo");
    expect(agendar).toHaveTextContent(/Agendar/i);
    expect(screen.getByTestId("hero-gratis-a11y")).toBeInTheDocument();
    expect(agendar.compareDocumentPosition(demo) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    await user.click(agendar);
    expect(openCalendarBooking).toHaveBeenCalledWith({ origin: "consultoria-hero" });
    await user.click(proto);
    expect(navigate).toHaveBeenCalledWith("/consultoria/modulos/dashboard");
    await user.click(demo);
    expect(navigate).toHaveBeenCalledWith("/demo/x-cms");
  });

  it("shows X|CMS product mockup, not a lifestyle cafe photo", () => {
    const { container } = renderHero();
    expect(container.querySelector("[data-hero-version='3']")).toBeTruthy();
    expect(container.querySelector("[data-product='x-cms']")).toBeTruthy();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /Tecnología para empresas/i
    );
    const img = screen.getByRole("img", { name: /CMS/i });
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(
      Boolean(h1.compareDocumentPosition(img) & Node.DOCUMENT_POSITION_FOLLOWING),
    ).toBe(true);
    expect(img.getAttribute("src") ?? "").toMatch(/x-cms-dashboard/);
    expect(img).toHaveAttribute("loading", "eager");
    expect(container.textContent).toMatch(/X\|CMS/);
    expect(container.textContent).not.toMatch(/Radar/i);
    expect(container.textContent).not.toMatch(/Viento Norte/);
  });
});
