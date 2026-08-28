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
  it("opens X|CMS demo and still offers Agendar", async () => {
    const user = userEvent.setup();
    renderHero();
    expect(screen.getByTestId("hero-demo-xcms")).toHaveTextContent(/X\|CMS/i);
    expect(screen.getByTestId("hero-agendar")).toHaveTextContent(/Agendar/i);
    expect(screen.getByTestId("hero-gratis-a11y")).toBeInTheDocument();
    await user.click(screen.getByTestId("hero-demo-xcms"));
    expect(navigate).toHaveBeenCalledWith("/demo/x-cms");
    await user.click(screen.getByTestId("hero-agendar"));
    expect(openCalendarBooking).toHaveBeenCalledWith({ origin: "consultoria-hero" });
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
