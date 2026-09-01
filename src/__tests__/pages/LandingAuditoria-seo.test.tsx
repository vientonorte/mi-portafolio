import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import LandingAuditoria from "@/pages/LandingAuditoria";
import { LanguageProvider } from "@/lib/LanguageContext";

describe("LandingAuditoria · SEOHead directives (aislamiento SEM)", () => {
  it("renders noindex+nofollow, the exact kickoff title and the isolated canonical", async () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <LanguageProvider>
            <LandingAuditoria />
          </LanguageProvider>
        </MemoryRouter>
      </HelmetProvider>
    );

    await vi.waitFor(() => {
      expect(document.title).toContain(
        "Diagnóstico Técnico (WCAG 2.2 + Ley 21.719) · Viento Norte"
      );
    });

    const robots = document.querySelector('meta[name="robots"]');
    expect(robots).not.toBeNull();
    expect(robots?.getAttribute("content")).toBe("noindex, nofollow");

    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical).not.toBeNull();
    expect(canonical?.getAttribute("href")).toBe(
      "https://vientonorte.io/#/ads/auditoria-accesibilidad"
    );
  });
});
