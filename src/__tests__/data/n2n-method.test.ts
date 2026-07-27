import { describe, expect, it } from "vitest";
import { C1_ONBOARDING_GOAL, N2N_PHASES } from "../../data/n2n-method";

describe("n2n-method", () => {
  it("defines 5 N2N phases with ES/EN", () => {
    expect(N2N_PHASES).toHaveLength(5);
    expect(N2N_PHASES.map((p) => p.id)).toEqual([
      "brief",
      "thinking",
      "sprint",
      "proto",
      "handoff",
    ]);
    for (const p of N2N_PHASES) {
      expect(p.title.es.length).toBeGreaterThan(2);
      expect(p.title.en.length).toBeGreaterThan(2);
      expect(p.outcome.es.length).toBeGreaterThan(10);
    }
  });

  it("C1 goal template covers private data / no public tools", () => {
    expect(C1_ONBOARDING_GOAL.es).toMatch(/privado|datos sensibles|herramientas públicas/i);
    expect(C1_ONBOARDING_GOAL.es).toMatch(/Radar|Marco|diagnóstico|prototipo/i);
    expect(C1_ONBOARDING_GOAL.en).toMatch(/private|sensitive|public tools/i);
    expect(C1_ONBOARDING_GOAL.en.length).toBeGreaterThan(40);
  });
});
