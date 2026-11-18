import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../../..");
const read = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");

/** Cuerpo de `export function PortfolioFrame…` hasta el cierre de la función (primer "\n}\n"). */
function frameBody(src: string): string {
  const start = src.indexOf("export function PortfolioFrame");
  expect(start).toBeGreaterThanOrEqual(0);
  const end = src.indexOf("\n}\n", start);
  return src.slice(start, end + 2);
}

function routerNavigation(src: string): string {
  const start = src.indexOf("function RouterNavigation()");
  expect(start).toBeGreaterThanOrEqual(0);
  return src.slice(start, src.indexOf("\n}\n", start) + 2);
}

describe("build:ro · marco de la ficha sin App", () => {
  it("RoPortfolioFrame no importa App ni el HashRouter", () => {
    const src = read("src/ro/RoPortfolioFrame.tsx");
    expect(src).not.toMatch(/from\s+["'][./]*App["']/);
    expect(src).not.toMatch(/^import .*HashRouter/m);
    expect(read("src/ro/app-shim.ts")).toMatch(/export \{ PortfolioFrame \} from "\.\/RoPortfolioFrame"/);
  });

  it("el marco de ro es el mismo que PortfolioFrame de App (sin drift)", () => {
    const app = read("src/App.tsx");
    const ro = read("src/ro/RoPortfolioFrame.tsx");
    expect(frameBody(ro)).toBe(frameBody(app));
    expect(routerNavigation(ro)).toBe(routerNavigation(app));
  });

  it("vite.ro.config.ts: entrada única sobre-mi, dist-ro, sin prerender de servicios y con guardia de App", () => {
    const cfg = read("vite.ro.config.ts");
    expect(cfg).toContain("outDir: 'dist-ro'");
    expect(cfg).toContain("sobreMi: path.resolve(__dirname, 'sobre-mi/index.html')");
    expect(cfg).toContain("vn-prerender-servicios");
    expect(cfg).toContain("src/ro/app-shim.ts");
    expect(JSON.parse(read("package.json")).scripts["build:ro"]).toContain("scripts/build-ro.mjs");
  });
});
