import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NavigateFunction } from "react-router-dom";

const openSpy = vi.fn();
const navigateSpy = vi.fn();

const trackEventSpy = vi.fn();
const clickHeroFreeAuditSpy = vi.fn();

vi.mock("../../lib/analytics", () => ({
  trackEvent: (...args: unknown[]) => trackEventSpy(...args),
  analytics: { clickHeroFreeAudit: (...args: unknown[]) => clickHeroFreeAuditSpy(...args) },
}));

vi.mock("../../lib/navigate-to-contact", () => ({
  navigateToContactAssistant: (...args: unknown[]) => navigateSpy(...args),
}));

const recordBookingIntentSpy = vi.fn();
vi.mock("../../lib/vn-booking", () => ({
  recordBookingIntent: (...args: unknown[]) => recordBookingIntentSpy(...args),
}));

describe("openFreeRadarEntry", () => {
  beforeEach(() => {
    vi.resetModules();
    openSpy.mockReset();
    navigateSpy.mockReset();
    trackEventSpy.mockReset();
    clickHeroFreeAuditSpy.mockReset();
    recordBookingIntentSpy.mockReset();
    vi.stubGlobal("open", openSpy);
  });

  it("opens Google Calendar when schedule URL is configured (mode schedule)", async () => {
    vi.doMock("../../lib/site-contact", () => ({
      A11Y_FREE_SCHEDULE_URL: "https://calendar.app.google/vn-a11y-test",
      openA11yFreeScheduleOrFallback: (fallback: () => void) => {
        window.open("https://calendar.app.google/vn-a11y-test", "_blank", "noopener,noreferrer");
        return true;
      },
    }));

    const { openFreeRadarEntry } = await import("../../lib/free-radar-entry");
    const channel = openFreeRadarEntry(
      navigateSpy as unknown as NavigateFunction,
      "es",
      "consultoria-hero",
      { mode: "schedule" }
    );

    expect(channel).toBe("google_calendar");
    // H2 · generate_lead NO se dispara en el click: espera la confirmación del Worker.
    expect(trackEventSpy).not.toHaveBeenCalledWith("generate_lead", expect.anything());
    expect(recordBookingIntentSpy).toHaveBeenCalledTimes(1);
    const { onConfirmed } = recordBookingIntentSpy.mock.calls[0][0] as { onConfirmed: () => void };
    onConfirmed();
    expect(trackEventSpy).toHaveBeenCalledWith(
      "generate_lead",
      expect.objectContaining({ channel: "google_calendar" })
    );
    expect(openSpy).not.toHaveBeenCalled();
    await vi.waitFor(
      () =>
        expect(openSpy).toHaveBeenCalledWith(
          "https://calendar.app.google/vn-a11y-test",
          "_blank",
          "noopener,noreferrer"
        ),
      { timeout: 1000 }
    );
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it("falls back to contact form when no schedule URL", async () => {
    vi.doMock("../../lib/site-contact", () => ({
      A11Y_FREE_SCHEDULE_URL: null,
      openA11yFreeScheduleOrFallback: (fallback: () => void) => {
        fallback();
        return false;
      },
    }));

    const { openFreeRadarEntry } = await import("../../lib/free-radar-entry");
    const channel = openFreeRadarEntry(
      navigateSpy as unknown as NavigateFunction,
      "es",
      "free-radar",
      { mode: "auto" }
    );

    expect(channel).toBe("contact_form");
    expect(navigateSpy).toHaveBeenCalled();
    const opts = navigateSpy.mock.calls[0][1];
    expect(opts.packageId).toBe("radar");
    expect(opts.consultingQ1).toBe("radar-free");
    expect(opts.intent).toBe("consulting");
    expect(String(opts.message)).toMatch(/revisión gratis de accesibilidad/i);
    expect(JSON.stringify(navigateSpy.mock.calls)).not.toMatch(/auditoria/i);
  });

  it("mode message always opens contact form even if schedule exists", async () => {
    vi.doMock("../../lib/site-contact", () => ({
      A11Y_FREE_SCHEDULE_URL: "https://calendar.app.google/vn-a11y-test",
      openA11yFreeScheduleOrFallback: vi.fn(),
    }));

    const { openFreeRadarEntry } = await import("../../lib/free-radar-entry");
    const channel = openFreeRadarEntry(
      navigateSpy as unknown as NavigateFunction,
      "en",
      "consultoria-packages",
      { mode: "message" }
    );

    expect(channel).toBe("contact_form");
    expect(navigateSpy).toHaveBeenCalled();
    expect(openSpy).not.toHaveBeenCalled();
  });

  it("H2 · opening the form channel does NOT emit generate_lead (only entry-open tracking)", async () => {
    vi.doMock("../../lib/site-contact", () => ({
      A11Y_FREE_SCHEDULE_URL: null,
      openA11yFreeScheduleOrFallback: (fallback: () => void) => {
        fallback();
        return false;
      },
    }));

    const { openFreeRadarEntry } = await import("../../lib/free-radar-entry");
    openFreeRadarEntry(
      navigateSpy as unknown as NavigateFunction,
      "es",
      "consultoria-hero",
      { mode: "auto" }
    );

    expect(trackEventSpy).not.toHaveBeenCalledWith("generate_lead", expect.anything());
    expect(trackEventSpy).toHaveBeenCalledWith(
      "free_radar_entry_open",
      expect.objectContaining({
        channel: "contact_form",
        origin: "consultoria-hero",
        package_id: "radar",
        freemium: true,
      })
    );
    expect(clickHeroFreeAuditSpy).toHaveBeenCalled();
  });
});
