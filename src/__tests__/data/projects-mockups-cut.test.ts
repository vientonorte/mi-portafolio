import { describe, expect, it } from "vitest";
import { suraHub, transvipHub } from "@/data/projects-data";
import { VALUE_PROOF_ITEMS } from "@/data/value-content-arsenal";
import { karriDesignSprintStub, karriNotificacionesStub } from "@/data/karri-project-stubs";

describe("FO first cut mockups", () => {
  it("Transvip muestra evidencias reales y no product-vision", () => {
    const project = transvipHub.projects.find((p) => p.id === "transvip-app-premium");
    const mockups = project?.details.mockups ?? [];
    expect(mockups[0]).toMatch(/app-mobile/);
    expect(mockups[1]).toMatch(/app-desktop/);
    expect(mockups[2]).toMatch(/figma-prototype/);
    expect(mockups[3]).toMatch(/booking-flowchart/);
    expect(mockups[4]).toMatch(/hotjar-dashboard/);
    expect(mockups[5]).toMatch(/analytics-ga4/);
    expect(mockups[6]).toMatch(/transvip-system-design/);
    expect(mockups.join(" ")).not.toMatch(/product-vision/);
  });

  it("SURA ecosistema no lidera con la bandera", () => {
    const project = suraHub.projects.find((p) => p.id === "sura-ecosistema-digital");
    const mockups = project?.details.mockups ?? [];
    expect(mockups[0]).toMatch(/ria-onboarding/);
    expect(mockups.join(" ")).not.toMatch(/onboarding-flags/);
  });

  it("SURA UX enterprise no duplica el diagrama de proceso", () => {
    const project = suraHub.projects.find((p) => p.id === "sura-ux-enterprise");
    const mockups = project?.details.mockups ?? [];
    expect(new Set(mockups).size).toBe(mockups.length);
    expect(mockups.some((src) => src.includes("ux-process"))).toBe(true);
  });

  it("arsenal ya no exige transvip-product-vision; booking-flow es SURA no flag", () => {
    expect(VALUE_PROOF_ITEMS.find((item) => item.id === "transvip-product-vision")).toBeUndefined();
    const booking = VALUE_PROOF_ITEMS.find((item) => item.id === "sura-booking-flow");
    expect(booking).toBeDefined();
    expect(booking?.copy.es.title).toMatch(/SURA/);
  });

  it("stubs Karri no repiten sprintBrief1 ni usan delivery-brand como mockup", () => {
    expect(karriDesignSprintStub.details.mockups).toEqual(
      Array.from(new Set(karriDesignSprintStub.details.mockups))
    );
    expect(karriNotificacionesStub.details.mockups?.join(" ") ?? "").not.toMatch(/delivery-brand/);
  });
});
