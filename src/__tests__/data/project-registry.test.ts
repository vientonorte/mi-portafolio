import { describe, expect, it, vi } from "vitest";

vi.mock("@/data/karri-projects", () => ({
  karriCalculadoraProject: {
    id: "karri-calculadora",
    details: { mockups: ["/images/karri/boosmap-benchmark.png", "/images/karri/a.png"] },
    challenge: { problem: "p", solution: "s" },
    processesApplied: [{ id: "ux-research" }],
  },
  karriNotificacionesProject: {
    id: "karri-notificaciones",
    details: { mockups: ["/images/karri/okrs-board.png"] },
    challenge: { problem: "p", solution: "s" },
    processesApplied: [{ id: "ux-research" }],
  },
  karriDesignSprintProject: {
    id: "karri-design-sprint",
    details: { mockups: ["/images/karri/sprint-brief-1.png"] },
    challenge: { problem: "p", solution: "s" },
    processesApplied: [{ id: "session-1-brief" }],
  },
}));

import { getProjectById, isKarriProject } from "@/data/project-registry";

describe("getProjectById Karri", () => {
  it("resuelve karri-calculadora con la galería completa, no el stub", () => {
    const result = getProjectById("karri-calculadora");
    expect(result).toBeDefined();
    expect(result?.companyId).toBe("transvip");
    expect(isKarriProject(result!.project)).toBe(true);
    const mockups = result!.project.details?.mockups ?? [];
    expect(mockups.length).toBeGreaterThan(1);
  });

  it("no usa delivery-brand como mockup de notificaciones", () => {
    const result = getProjectById("karri-notificaciones");
    expect(result).toBeDefined();
    const mockups = result!.project.details?.mockups ?? [];
    expect(mockups.join(" ")).not.toMatch(/delivery-brand/);
    expect(mockups.length).toBeGreaterThan(0);
  });
});
