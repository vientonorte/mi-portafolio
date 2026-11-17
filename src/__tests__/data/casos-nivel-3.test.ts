import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  CASOS,
  SLIDE_COUNT_MAX,
  SLIDE_COUNT_MIN,
  assertSlideCount,
  casoRoutes,
  cleanUrlForHashProject,
  hashProjectRedirects,
} from "@/data/casos";
import { VALUE_PROOF_ITEMS } from "@/data/value-content-arsenal";
import { SERVICIOS_VN_CASE_GROUPS } from "@/servicios/servicios-content";

const BANNED = ["/servicios/diagnostico-accesibilidad-wcag/", "/servicios/consultoria-ux-pymes/"];

describe("casos nivel 3 · datos", () => {
  it("exige entre 3 y 5 láminas", () => {
    expect(() => assertSlideCount(SLIDE_COUNT_MIN - 1)).toThrow(/3 y 5/);
    expect(() => assertSlideCount(SLIDE_COUNT_MAX + 1)).toThrow(/3 y 5/);
    expect(() => assertSlideCount(3)).not.toThrow();
    expect(() => assertSlideCount(5)).not.toThrow();
    for (const caso of CASOS) {
      for (const piece of caso.pieces) {
        expect(piece.slides.length).toBeGreaterThanOrEqual(3);
        expect(piece.slides.length).toBeLessThanOrEqual(5);
      }
    }
  });

  it("el piloto es anónimo y no guarda nodos de Figma", () => {
    const piece = CASOS[0].pieces[0];
    expect(piece.clientLabel).toBe("Pyme de mobiliario educacional");
    expect(piece.role).toBe("Service UX Designer");
    expect(piece.year).toBe("2023");
    expect(piece.title).toBe("Pitch de ventas y simulación");
    expect(piece.whatIDid).toContain("once preguntas para explorar dolores");
    const blob = JSON.stringify(CASOS);
    expect(blob).not.toMatch(/edu[ _-]?21/i);
    const source = readFileSync("src/data/casos.ts", "utf8");
    expect(source).not.toMatch(/1:22757|f6LRq93s1CzxvslAHOj5bN/);
    expect(readFileSync("docs/staging/mobiliario-edu-pack/SOURCE_MAP.md", "utf8")).toContain("1:22757");
    expect(piece.slides.map((slide) => slide.src)).toEqual([
      "images/cases/mobiliario-edu/pitch-ventas/01-portada-guion-acting.png",
      "images/cases/mobiliario-edu/pitch-ventas/02-flujo-simulacion.png",
      "images/cases/mobiliario-edu/pitch-ventas/03-bio-persona-con-tiempo.png",
      "images/cases/mobiliario-edu/pitch-ventas/04-flujo-pitch-de-entrada.png",
      "images/cases/mobiliario-edu/pitch-ventas/05-exploracion-de-dolores.png",
    ]);
  });

  it("genera nivel 2, nivel 3 y la redirección del hash, sin slugs prohibidos", () => {
    expect(casoRoutes().map((route) => route.path)).toEqual([
      "/casos/mobiliario-edu/",
      "/casos/mobiliario-edu/pitch-ventas/",
    ]);
    for (const banned of BANNED) expect(casoRoutes().map((route) => route.path)).not.toContain(banned);
    expect(cleanUrlForHashProject("mobiliario-edu")).toBe("/casos/mobiliario-edu/");
    expect(cleanUrlForHashProject("mobiliario-edu-pitch-ventas")).toBe("/casos/mobiliario-edu/pitch-ventas/");
    expect(cleanUrlForHashProject("sura-ria-us")).toBeNull();
    const html = readFileSync("index.html", "utf8");
    for (const [id, path] of Object.entries(hashProjectRedirects())) {
      expect(html).toContain(`"${id}"`);
      expect(html).toContain(path);
    }
  });

  it("enlaza la tarjeta existente del arsenal sin copiar el cuerpo de la pieza", () => {
    const card = VALUE_PROOF_ITEMS.find((item) => item.id === "mobiliario-edu-sales-pitch");
    expect(card?.href).toBe("/casos/mobiliario-edu/pitch-ventas/");
    expect(card?.copy.es.outcome).not.toContain("once preguntas");
    const home = SERVICIOS_VN_CASE_GROUPS.flatMap((group) => group.cases).find((item) => item.id === "mobiliario-edu");
    expect(home?.casoHref).toBe("/casos/mobiliario-edu/");
  });
});
