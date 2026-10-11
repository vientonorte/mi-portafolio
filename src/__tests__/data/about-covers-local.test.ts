/** Sobre mí: toda imagen del timeline y del bento es un export local en public/ (sin CDN externo ni placeholder). */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { ABOUT_VISUAL_TILES, EXPERIENCE_COVER, EXPERIENCE_COVER_META, METHOD_STRIP } from "@/data/about-visuals";

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

  it("Maraña, La Negra Colorá, Pareti y Teatro Di Popolo: webp 840×360 (21:9) local, alt en español, sin «SENSIBLE»/«drive» en el nombre", () => {
    for (const company of ["Maraña Agencia Digital", "La Negra Colorá", "Empresas Pareti", "Teatro Di Popolo"]) {
      const src = EXPERIENCE_COVER[company];
      expect(src, company).toMatch(/^\/images\/experience\/[a-z0-9-]+\.webp$/);
      expect(src).not.toMatch(/sensible|drive/i);
      const meta = EXPERIENCE_COVER_META[src];
      expect(meta, company).toBeDefined();
      expect([meta.width, meta.height]).toEqual([840, 360]);
      expect(meta.alt.length).toBeGreaterThan(30);
      const buf = readFileSync(localFile(src));
      expect(buf.subarray(0, 4).toString("latin1")).toBe("RIFF");
      expect(buf.subarray(8, 12).toString("latin1")).toBe("WEBP");
      // Sin chunks de metadatos (EXIF / XMP) en el contenedor WebP.
      expect(buf.includes(Buffer.from("EXIF"))).toBe(false);
      expect(buf.includes(Buffer.from("XMP "))).toBe(false);
    }
  });
  it("La Voz de los Cerros sigue sin portada", () => {
    for (const company of ["La Voz de los Cerros"]) {
      expect(EXPERIENCE_COVER[company]).toBeUndefined();
    }
  });
});
