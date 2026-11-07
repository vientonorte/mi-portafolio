import { readFileSync, statSync } from "node:fs";
import { describe, expect, it } from "vitest";

const html = readFileSync("public/ar/index.html", "utf8");
const css = readFileSync("public/ar/ar.css", "utf8");
const script = readFileSync("public/ar/ar.js", "utf8");
const curves = JSON.parse(readFileSync("public/ar/curves.json", "utf8")) as {
  order: string[];
  lissajous: { paths: number[][][] };
  trebol: { paths: number[][][]; ink: number[][][] };
  penrose: { paths: number[][][]; width: number; height: number };
};

describe("prototipo estático /ar", () => {
  it("pide la cámara con un botón y explica qué hacer si no hay", () => {
    expect(html).toContain('id="start"');
    expect(html).toContain("Activar cámara");
    expect(html).toContain('id="fallback"');
    expect(script).toContain("No hay cámara disponible");
    expect(script).toContain("autoStart: false");
  });

  it("nombra las tres figuras, sus ecuaciones y el naranja VN", () => {
    expect(html).toContain("Lissajous 3:4");
    expect(html).toContain("Nudo trébol");
    expect(html).toContain("Diagrama de Penrose");
    expect(script).toContain("x = sin 3t");
    expect(script).toContain("x = sin t + 2 sin 2t");
    expect(script).toContain("caminos de Feynman");
    expect(script).toContain("Veritasium");
    expect(css.toLowerCase()).toContain("#ff931e");
    expect(script).toContain('const ORANGE = "#FF931E"');
  });

  it("guarda los blancos, la geometría y el archivo .mind", () => {
    expect(curves.order).toEqual(["lissajous", "trebol", "penrose"]);
    expect(curves.lissajous.paths[0].length).toBeGreaterThan(50);
    expect(curves.trebol.paths[0].length).toBeGreaterThan(50);
    expect(curves.trebol.ink.length).toBeGreaterThan(0);
    expect(curves.penrose.width).toBe(1181);
    expect(curves.penrose.height).toBe(829);
    expect(curves.penrose.paths[0].length).toBeGreaterThan(2);
    expect(statSync("public/ar/targets.mind").size).toBeGreaterThan(1000);
    for (const name of ["lissajous-3-4.png", "nudo-trebol.png", "penrose-veritasium.png"]) {
      const buf = readFileSync(`public/ar/targets/${name}`);
      expect(buf.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    }
  });
});
