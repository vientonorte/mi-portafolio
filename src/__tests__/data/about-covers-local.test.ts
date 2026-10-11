/** Sobre mí: toda imagen del timeline y del bento es un export local en public/ (sin CDN externo ni placeholder). */
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { ABOUT_VISUAL_TILES, EXPERIENCE_COVER, METHOD_STRIP } from "@/data/about-visuals";

const localFile = (src: string) => resolve(process.cwd(), "public", src.replace(/^\//, "").replace(/[?#].*$/, ""));

describe("Sobre mí: imágenes exportadas en el repo", () => {
  const srcs = [
    ...Object.entries(EXPERIENCE_COVER).map(([k, v]) => [`cover ${k}`, v] as const),
    ...ABOUT_VISUAL_TILES.map((t) => [`tile ${t.id}`, t.src] as const),
    ...METHOD_STRIP.map((m) => [`strip ${m.id}`, m.src] as const),
  ];
  it.each(srcs)("%s → archivo local existente", (_label, src) => {
    expect(src).toBeTruthy();
    expect(src).not.toMatch(/^https?:\/\//);
    expect(src).not.toMatch(/placeholder/i);
    expect(existsSync(localFile(src)), src).toBe(true);
  });
});
