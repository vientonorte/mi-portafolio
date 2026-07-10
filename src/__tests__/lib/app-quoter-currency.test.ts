import { describe, expect, it } from "vitest";
import {
  convertDisplayAmount,
  formatQuoterAmount,
  fromUsd,
  toUsd,
  UF_TO_USD,
  USD_TO_CLP,
} from "../../lib/app-quoter-currency";

describe("app-quoter-currency", () => {
  it("converts USD ↔ CLP with fixed rate", () => {
    expect(toUsd(USD_TO_CLP, "CLP")).toBeCloseTo(1, 5);
    expect(fromUsd(1, "CLP")).toBe(USD_TO_CLP);
  });

  it("converts UF ↔ USD", () => {
    expect(toUsd(1, "UF")).toBeCloseTo(UF_TO_USD, 5);
    expect(fromUsd(UF_TO_USD, "UF")).toBeCloseTo(1, 5);
  });

  it("preserves economic value when switching currency", () => {
    const usd = 12_000;
    const asUf = convertDisplayAmount(usd, "USD", "UF");
    const back = convertDisplayAmount(asUf, "UF", "USD");
    // snapped to step — allow tolerance
    expect(Math.abs(back - usd)).toBeLessThan(1_000);
  });

  it("formats UF and CLP for es locale", () => {
    expect(formatQuoterAmount(300, "UF", "es")).toMatch(/UF/);
    expect(formatQuoterAmount(1_000_000, "CLP", "es")).toMatch(/\$|CLP|1/);
  });
});
