import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/lib/LanguageContext";
import PocProductOnboarding from "@/pages/PocProductOnboarding";

const navigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

vi.mock("@/lib/free-radar-entry", () => ({
  freeRadarHasSchedule: () => true,
  openFreeRadarEntry: vi.fn(),
}));

function renderTour() {
  return render(
    <MemoryRouter>
      <LanguageProvider>
        <PocProductOnboarding initialModuleId="dashboard" />
      </LanguageProvider>
    </MemoryRouter>
  );
}

describe("PocProductOnboarding CTA hierarchy", () => {
  it("skip Empezar goes to SEM funnel /consultoria, not home", async () => {
    const user = userEvent.setup();
    renderTour();
    await user.click(screen.getByTestId("offer-skip"));
    expect(navigate).toHaveBeenCalledWith("/consultoria");
    expect(navigate).not.toHaveBeenCalledWith("/");
  });

  it("start fold: one primary Agendar, Empezar is ghost to funnel", () => {
    renderTour();
    expect(screen.getByTestId("offer-cta-schedule")).toBeInTheDocument();
    expect(screen.getByTestId("offer-cta-funnel")).toBeInTheDocument();
    expect(screen.getByTestId("offer-cta-demo")).toBeInTheDocument();
    expect(screen.getByTestId("offer-cta-module")).toBeInTheDocument();
  });
});
