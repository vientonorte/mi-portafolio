import { describe, expect, it } from "vitest";
import { calculateAppQuote, buildAppQuoterContactMessage } from "@/lib/app-quoter-engine";

const FORBIDDEN = [/120/, /hora/i, /hour/i, /\/h/i];

function assertNoRateLeak(text: string) {
  for (const pattern of FORBIDDEN) {
    expect(text).not.toMatch(pattern);
  }
}

describe("calculateAppQuote", () => {
  it("returns null for invalid budget", () => {
    expect(calculateAppQuote(0, "prototype")).toBeNull();
    expect(calculateAppQuote(100, "web")).toBeNull();
  });

  it("maps prototype budget to viable or comfortable fit", () => {
    const result = calculateAppQuote(8000, "prototype");
    expect(result).not.toBeNull();
    expect(["viable", "comfortable"]).toContain(result!.fit);
    expect(result!.alignmentScore).toBeGreaterThan(0);
  });

  it("flags gap when enterprise expectation is underfunded", () => {
    const result = calculateAppQuote(5000, "enterprise");
    expect(result?.fit).toBe("gap");
    expect(result?.affordableTierId).toBe("prototype");
    expect(result?.suggestedBudgetIncreasePercent?.low).toBeGreaterThan(0);
  });

  it("never exposes hourly rate in contact message", () => {
    const result = calculateAppQuote(15000, "web")!;
    const message = buildAppQuoterContactMessage(
      "es",
      result,
      "Sitio / presencia digital",
      "Viable",
      "Prototipo y validación"
    );
    assertNoRateLeak(message);
    expect(message).toContain("Presupuesto de referencia");
    expect(message).toContain("Hola Viento Norte");
    expect(result.requiresNetwork).toBe(false);
  });

  it("includes display currency in quote result and contact message", () => {
    const result = calculateAppQuote(12_000, "web", {
      currency: "CLP",
      budgetDisplay: 11_400_000,
    })!;
    expect(result.currency).toBe("CLP");
    expect(result.budgetDisplay).toBe(11_400_000);
    const message = buildAppQuoterContactMessage(
      "es",
      result,
      "Sitio / presencia digital",
      "Viable",
      "Prototipo y validación"
    );
    expect(message).toContain("CLP");
  });

  it("flags requiresNetwork for app journeys tier and notes it in contact message", () => {
    const result = calculateAppQuote(40_000, "app")!;
    expect(result.requiresNetwork).toBe(true);
    const message = buildAppQuoterContactMessage(
      "es",
      result,
      "Journeys de producto (diseño)",
      "Viable",
      "Sitio / presencia digital"
    );
    expect(message).toMatch(/red bajo dirección/i);
    assertNoRateLeak(message);
  });
});
