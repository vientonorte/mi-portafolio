import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("AuditoriaPortfolio · Liskov vs free a11y", () => {
  it("does not import openFreeRadarEntry", () => {
    const src = readFileSync(
      resolve(process.cwd(), "src/pages/AuditoriaPortfolio.tsx"),
      "utf8"
    );
    expect(src).not.toContain("openFreeRadarEntry");
    expect(src).toContain("navigateToContactAssistant");
    expect(src).toContain('consultingQ1: "portfolio"');
  });
});
