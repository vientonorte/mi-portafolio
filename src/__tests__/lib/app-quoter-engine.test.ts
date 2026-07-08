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
      "Web funcional",
      "Viable",
      "Prototipo funcional"
    );
    assertNoRateLeak(message);
    expect(message).toContain("Presupuesto de referencia");
  });
});