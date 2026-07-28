import { beforeEach, describe, expect, it, vi } from "vitest";

describe("trackEvent generate_lead", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllGlobals();
  });

  it("pushes generate_lead to dataLayer for GTM", async () => {
    const dataLayer: unknown[] = [];
    vi.stubGlobal("window", {
      dataLayer,
      gtag: undefined,
    });
    // re-bind for modules that use global window
    Object.defineProperty(globalThis, "window", {
      value: { dataLayer, gtag: undefined },
      configurable: true,
      writable: true,
    });

    const { trackEvent, analytics } = await import("../../lib/analytics");
    trackEvent("generate_lead", {
      category: "conversion",
      lead_type: "free_a11y",
      channel: "contact_form",
    });
    analytics.generateLead({
      lead_type: "free_a11y",
      channel: "google_calendar",
      origin: "hero-path",
    });

    const events = dataLayer.filter(
      (e) => e && typeof e === "object" && (e as { event?: string }).event === "generate_lead"
    ) as Array<Record<string, unknown>>;

    expect(events.length).toBeGreaterThanOrEqual(2);
    expect(events[0]).toMatchObject({
      event: "generate_lead",
      lead_type: "free_a11y",
      channel: "contact_form",
    });
    expect(events[1]).toMatchObject({
      event: "generate_lead",
      lead_type: "free_a11y",
      freemium: true,
    });
  });
});
