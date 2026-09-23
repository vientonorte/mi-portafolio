import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const data = JSON.parse(
  readFileSync(
    resolve(process.cwd(), "src/data/posicionapp-ia-empresas-chile.json"),
    "utf8"
  )
);

describe("SSOT PosicionApp IA empresas Chile", () => {
  it("maps commercial terms to live /servicios or /s/consultoria, excludes noise", () => {
    expect(data.geo).toBe("CL");
    expect(data.include.length).toBeGreaterThan(5);
    for (const row of data.include) {
      expect(
        row.url.startsWith("/servicios/") || row.url === "/s/consultoria/"
      ).toBe(true);
      expect(row.url).not.toContain("/recursos/");
    }
    const blob = JSON.stringify(data.exclude.patterns);
    expect(blob).toMatch(/emocional/);
    expect(blob).toMatch(/logos/);
    expect(blob).toMatch(/cursos/);
  });
});
