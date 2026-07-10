import { describe, expect, it } from "vitest";
import {
  CONSULTORIA_PRACTICES,
  PRACTICE_CATEGORIES,
  getPracticesByCategory,
} from "../../data/consultoria-practices";

describe("consultoria-practices", () => {
  it("documents at least 8 practices with ES/EN copy", () => {
    expect(CONSULTORIA_PRACTICES.length).toBeGreaterThanOrEqual(8);
    for (const p of CONSULTORIA_PRACTICES) {
      expect(p.title.es.length).toBeGreaterThan(4);
      expect(p.title.en.length).toBeGreaterThan(4);
      expect(p.checklist.es.length).toBeGreaterThanOrEqual(2);
      expect(p.checklist.en.length).toBe(p.checklist.es.length);
      expect(p.standard.length).toBeGreaterThan(3);
      expect(p.validation.es.length).toBeGreaterThan(10);
    }
  });

  it("covers all practice categories", () => {
    const used = new Set(CONSULTORIA_PRACTICES.map((p) => p.category));
    for (const cat of PRACTICE_CATEGORIES) {
      expect(used.has(cat.id)).toBe(true);
    }
  });

  it("filters by category", () => {
    const a11y = getPracticesByCategory("a11y");
    expect(a11y.every((p) => p.category === "a11y")).toBe(true);
    expect(getPracticesByCategory("all").length).toBe(CONSULTORIA_PRACTICES.length);
  });

  it("includes WCAG, metrics-first, N2N and offline/private practices", () => {
    const ids = CONSULTORIA_PRACTICES.map((p) => p.id);
    expect(ids).toContain("wcag-22-aa");
    expect(ids).toContain("metrics-first");
    expect(ids).toContain("design-ops");
    expect(ids).toContain("n2n-method");
    expect(ids).toContain("offline-private");
    expect(ids).toContain("ley-21719");
  });
});

