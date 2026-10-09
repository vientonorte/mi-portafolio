import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SERVICIOS_CONCEPTOS_CASES, conceptCases } from "@/servicios/servicios-content";

const root = resolve(__dirname, "../../..");

describe("MASCOTAPP solo en el build QA", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("prod (base /): conceptCases() no trae MASCOTAPP", () => {
    expect(import.meta.env.BASE_URL).toBe("/");
    expect(conceptCases().map((c) => c.id)).toEqual(["claro", "walmart", "transvip"]);
    expect(SERVICIOS_CONCEPTOS_CASES.some((c) => c.id === "mascotapp")).toBe(false);
  });

  it("QA (base /qa/): conceptCases() no agrega MASCOTAPP sin imagen", () => {
    vi.stubEnv("BASE_URL", "/qa/");
    const cases = conceptCases();
    expect(cases.map((c) => c.id)).toEqual(["claro", "walmart", "transvip"]);
    expect(cases.every((c) => c.image)).toBe(true);
  });

  it("la guarda del build de prod corre en CI y en deploy", () => {
    const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
    expect(pkg.scripts["qa:no-mascotapp"]).toBe("bash scripts/check-prod-no-mascotapp.sh");
    expect(readFileSync(resolve(root, ".github/workflows/ci.yml"), "utf8")).toContain("npm run qa:no-mascotapp");
    const deploy = readFileSync(resolve(root, ".github/workflows/deploy.yml"), "utf8");
    expect(deploy).toContain("scripts/check-prod-no-mascotapp.sh");
    expect(deploy).toContain("fetch-depth: 0");
  });
});
