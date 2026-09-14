import { describe, expect, it, vi } from "vitest";
import type { NavigateFunction } from "react-router-dom";
import { openFreeRadarEntry } from "@/lib/free-radar-entry";
import { ROUTES } from "@/lib/routes";
import { pathIsAuditoriaMentoria } from "@/lib/contact-surface";

vi.mock("@/lib/analytics", () => ({
  trackEvent: vi.fn(),
  analytics: { clickHeroFreeAudit: vi.fn() },
}));

vi.mock("@/lib/site-contact", () => ({
  A11Y_FREE_SCHEDULE_URL: null,
  openA11yFreeScheduleOrFallback: (fallback: () => void) => {
    fallback();
    return false;
  },
}));

describe("free a11y path · never mentoría", () => {
  it("openFreeRadarEntry navigates to /contacto not /auditoria", () => {
    const navigate = vi.fn();
    openFreeRadarEntry(
      navigate as unknown as NavigateFunction,
      "es",
      "free-radar",
      { mode: "message" }
    );
    expect(navigate).toHaveBeenCalled();
    const [to] = navigate.mock.calls[0];
    expect(to.pathname).toBe(ROUTES.contact);
    expect(pathIsAuditoriaMentoria(to.pathname)).toBe(false);
    expect(JSON.stringify(navigate.mock.calls)).not.toMatch(/auditoria/i);
  });
});
