import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { FreeA11yScheduleCta } from "@/components/molecules/FreeA11yScheduleCta";
import { LanguageProvider } from "@/lib/LanguageContext";

const openFreeRadarEntrySpy = vi.fn();

vi.mock("@/lib/free-radar-entry", () => ({
  freeRadarHasSchedule: () => true,
  openFreeRadarEntry: (...args: unknown[]) => openFreeRadarEntrySpy(...args),
}));

vi.mock("@/lib/site-contact", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/site-contact")>();
  return {
    ...actual,
    A11Y_FREE_SCHEDULE_URL: "https://calendar.app.google/vn-a11y-test",
  };
});

function renderCta(origin: string) {
  return render(
    <MemoryRouter>
      <LanguageProvider>
        <FreeA11yScheduleCta origin={origin as never} layout="card" />
      </LanguageProvider>
    </MemoryRouter>
  );
}

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

describe("FreeA11yScheduleCta · instrumentación GTM (funnel /ads/auditoria-accesibilidad)", () => {
  beforeEach(() => {
    openFreeRadarEntrySpy.mockReset();
    window.dataLayer = [];
  });

  it("empuja agenda_kickoff_click al dataLayer para el origin ads-a11y-landing", async () => {
    renderCta("ads-a11y-landing");
    await userEvent.click(
      screen.getByRole("button", { name: /abrir agenda online/i })
    );

    expect(window.dataLayer).toContainEqual(
      expect.objectContaining({
        event: "agenda_kickoff_click",
        cta_origin: "ads-a11y-landing",
        service_target: "wcag_ley21719_audit",
      })
    );
    expect(openFreeRadarEntrySpy).toHaveBeenCalled();
  });

  it("no empuja agenda_kickoff_click para otros orígenes de CTA", async () => {
    renderCta("contact");
    await userEvent.click(
      screen.getByRole("button", { name: /abrir agenda online/i })
    );

    expect(
      window.dataLayer.some((event) => event.event === "agenda_kickoff_click")
    ).toBe(false);
    expect(openFreeRadarEntrySpy).toHaveBeenCalled();
  });
});
