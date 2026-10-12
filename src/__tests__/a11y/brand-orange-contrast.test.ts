/**
 * Naranja canon VN #FF931E desde tokens (S42). Gate AA + "sin azul de marca":
 * - el texto sobre la marca es azul-noche (7.61:1); blanco sobre #FF931E da 2.22:1 y falla;
 * - --primary claro = naranja-700 (texto/enlace, ≥ 4.5:1 sobre blanco y superficies mate);
 * - ni #1A8FDC / #0F6AA8 ni sus rgb() en fuentes de la app, CSS públicos ni index.html;
 * - favicon.svg, icon-192/512 e isologo-512 en naranja plano (sin rojo #FF1D25 ni azul).
 * La comparación con Figma puede ajustar los tonos después; este test fija el contrato AA.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { contrast, parseColor } from "./contrast-utils";
import { AZUL_NOCHE, CSS, NARANJA, NARANJA_600, NARANJA_700, ROOT, THEME } from "./gradient-inventory";

const BLUE = /#1a8fdc|#0f6aa8|rgba?\(\s*26\s*,\s*143\s*,\s*220|rgba?\(\s*15\s*,\s*106\s*,\s*168|azul-evo/i;

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name === "__tests__" || name === "node_modules") continue;
      walk(p, out);
    } else if (/\.(tsx?|css|html)$/.test(name)) out.push(p);
  }
  return out;
}

describe("naranja canon desde tokens: contraste AA", () => {
  it("primitivas en vn-tokens.css", () => {
    expect(NARANJA.toLowerCase()).toBe("#ff931e");
    expect(CSS.vnTokens).toMatch(/--vn-color-brand:\s*var\(--vn-primitive-naranja\)/);
    expect(CSS.vnTokens).toMatch(/--vn-color-on-brand:\s*var\(--vn-primitive-azul-noche\)/);
    expect(CSS.vnTokens).toMatch(/--vn-color-cta-fg:\s*var\(--vn-primitive-azul-noche\)/);
  });

  it("azul-noche sobre naranja ≥ 7.6:1 (CTA, badges, dock); hover naranja-600 ≥ 4.5:1", () => {
    const navy = parseColor(AZUL_NOCHE);
    expect(contrast(navy, parseColor(NARANJA))).toBeGreaterThanOrEqual(7.6);
    expect(contrast(navy, parseColor(NARANJA_600))).toBeGreaterThanOrEqual(4.5);
  });

  it("blanco sobre naranja no cumple: el texto sobre .bg-brand-gradient se fuerza a azul-noche", () => {
    expect(contrast(parseColor("#ffffff"), parseColor(NARANJA))).toBeLessThan(3);
    expect(CSS.globals).toMatch(/\.bg-brand-gradient\.bg-brand-gradient,[\s\S]*?color:\s*var\(--brand-on-gradient\)/);
  });

  it("--primary: claro naranja-700 ≥ 4.5:1 sobre blanco y superficies mate; oscuro naranja con azul-noche", () => {
    const p = parseColor(NARANJA_700);
    for (const bg of [THEME.light.bg, THEME.light.matte, THEME.light.matteElev, "#ebe5dc"]) {
      expect(contrast(p, parseColor(bg)), bg).toBeGreaterThanOrEqual(4.5);
    }
    expect(contrast(parseColor(THEME.light.primaryFg), p)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(parseColor(THEME.dark.primaryFg), parseColor(THEME.dark.primary))).toBeGreaterThanOrEqual(7.6);
    expect(contrast(parseColor(THEME.dark.primary), parseColor(THEME.dark.bg))).toBeGreaterThanOrEqual(4.5);
  });
});

describe("sin azul de marca ni degradado azul", () => {
  it("src/**, public/**/*.css e index.html sin #1A8FDC / #0F6AA8 / rgb equivalentes", () => {
    const files = [
      ...walk(join(ROOT, "src")),
      ...walk(join(ROOT, "public")).filter((f) => f.endsWith(".css")),
      join(ROOT, "index.html"),
    ];
    const hits = files
      .filter((f) => !f.endsWith("src/index.css")) // legacy sin importar (ver gradient-contrast)
      .flatMap((f) =>
        readFileSync(f, "utf8")
          .split("\n")
          .map((l, i) => (BLUE.test(l) ? `${relative(ROOT, f)}:${i + 1}` : null))
          .filter(Boolean)
      );
    expect(hits).toEqual([]);
  });

  it("favicon.svg en naranja plano (sin #FF1D25)", () => {
    const svg = readFileSync(join(ROOT, "public/favicon.svg"), "utf8");
    expect(svg).not.toMatch(/#ff1d25/i);
    expect(svg.match(/stop-color="#FF931E"/gi)?.length).toBe(2);
  });
});
