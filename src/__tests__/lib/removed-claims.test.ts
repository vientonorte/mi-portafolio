import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname, relative } from "node:path";
// @ts-expect-error — módulo .mjs compartido con el gate de dist
import { findRemovedClaims } from "../../../scripts/removed-claims.mjs";
import { getExperiences } from "../../data/experience-data";

const ROOT = join(__dirname, "..", "..", "..");
const EXT = new Set([".ts", ".tsx", ".json", ".html", ".js", ".mjs"]);

function collect(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (name === "__tests__" || name === "node_modules") continue;
    if (statSync(p).isDirectory()) collect(p, out);
    else if (EXT.has(extname(name))) out.push(p);
  }
  return out;
}

describe("afirmaciones retiradas de la trayectoria (SSOT 2026-10-17)", () => {
  it("el detector marca cada afirmación retirada y respeta el −40 % de Transvip", () => {
    const ids = (t: string) => findRemovedClaims(t).map((h: { id: string }) => h.id);
    expect(ids("SURA Investments: −40% fricción en onboarding")).not.toHaveLength(0);
    expect(ids("alcance 5+ países")).toContain("5-paises");
    expect(ids("con 17 participantes")).toContain("17-participantes");
    expect(ids("NPS 72")).toContain("nps-72");
    expect(ids('{label:"NPS",value:"72"}')).toContain("nps-72-split");
    expect(ids("etnógrafo certificado")).toContain("etnografo-certificado");
    expect(ids("Transvip: −40% tiempo de reserva, +25% conversión, NPS 82")).toHaveLength(0);
    // Variantes reformuladas (pre-QA M5): 40 % sin signo, valor partido en el bundle, «alcance 5+ países».
    expect(ids("Reducción de 40% en tiempo de discovery de nuevas iniciativas")).not.toHaveLength(0);
    expect(ids('{label:`Onboarding`,value:`-40%`}')).not.toHaveLength(0);
    expect(ids("40% menos fricción")).not.toHaveLength(0);
    expect(ids("SURA 23–26 · 5+ países")).toContain("5-paises");
    // Karri «+58 % engagement» (PO 17-10 15:11), cualquier variante es/en.
    expect(ids("+58% engagement")).toContain("karri-58");
    expect(ids('{label:`Engagement`,value:`+58%`}')).toContain("karri-58");
    expect(ids("El engagement con notificaciones aumentó un 58% post-lanzamiento")).toContain("karri-58");
    expect(ids("58% more engagement")).toContain("karri-58");
    expect(ids("+35% activación · −42% abandono del onboarding")).toHaveLength(0);
    expect(ids("−40% fricción en onboarding · alcance 5+ países")).toEqual(expect.arrayContaining(["5-paises", "sura-40-onboarding"]));
  });

  it("src/, backend/data y las páginas HTML no contienen afirmaciones retiradas", () => {
    const files = [
      ...collect(join(ROOT, "src")),
      ...collect(join(ROOT, "backend", "data")),
      join(ROOT, "index.html"),
      join(ROOT, "sobre-mi", "index.html"),
      join(ROOT, "servicios", "index.html"),
    ];
    const hits: string[] = [];
    for (const f of files) {
      for (const h of findRemovedClaims(readFileSync(f, "utf8")))
        hits.push(`${relative(ROOT, f)} [${h.id}] ${h.snippet}`);
    }
    expect(hits).toEqual([]);
  });

  it("SURA, Transvip y Karri muestran primer nivel breve (≤ 3 logros) y detalle de segundo nivel", () => {
    for (const lang of ["es", "en"] as const) {
      const exps = getExperiences(lang);
      const sura = exps.find((e) => e.company === "SURA Investments")!;
      expect(sura.achievements.length).toBeLessThanOrEqual(3);
      expect(sura.detailGroups?.length).toBeGreaterThan(0);
      expect(sura.period).toMatch(/2023 — Jun 2026/);
      const karri = exps.find((e) => e.company === "Karri by Transvip")!;
      expect(karri.impact).not.toMatch(/58/);
    }
  });
});
