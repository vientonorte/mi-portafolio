import { describe, expect, it } from "vitest";
import { NEWS_CATALOG } from "@/data/news-editions";
import {
  FIGMA_ASSETS,
  FIGMA_CALOR_LEGACY_IDS,
  figmaLinksForCase,
  figmaLinksForExperience,
  foPathForAsset,
} from "@/data/figma-assets-ssot";
import { FIGMA_SLIDES_SURA_COLOMBIA } from "@/data/figma-embeds";

const FORBIDDEN = [/radar/i, /auditor[ií]a/i];

describe("figma-assets-ssot", () => {
  it("deriva figmaLinks por foCaseId sin listas duplicadas", () => {
    expect(figmaLinksForCase("sura-inversiones-dashboard").map((l) => l.url)).toEqual([
      "https://www.figma.com/design/s5lLcHkNalH6p3LKCop7wT/Dashboard-Escenarios-Demanda-SURA---Viento-Norte",
    ]);
    expect(figmaLinksForCase("sura-ria-us").map((l) => l.url)).toEqual([
      "https://www.figma.com/proto/MOhbYMwUtCSZ8IuJxG41ho/RIA",
    ]);
    expect(figmaLinksForCase("transvip-app-premium").map((l) => l.url)).toEqual([
      "https://www.figma.com/design/AEMOE8Hv5iv1nfyR7jlMgO/System-Design-APP-Cliente---Transvip",
      "https://www.figma.com/proto/sRPhPaZNBewEhLVwu07TFu",
    ]);
    expect(figmaLinksForCase("havas-claro").map((l) => l.url)).toEqual([
      "https://www.figma.com/design/lrMqvUERZjDwTwZpQRBSC5/Tienda-Claro-2021",
      "https://www.figma.com/design/D39xjsA7ObbhntcDEyPWQG/Portal-Comercial-Claro",
    ]);
  });

  it("no duplica slides tutoría ya embebidas ni Claro prueba de conceptos", () => {
    expect(figmaLinksForCase("sura-ux-enterprise")).toEqual([]);
    const urls = FIGMA_ASSETS.map((a) => a.url ?? "").join("\n");
    expect(urls).not.toContain("CBguM4Y5rIvc9TV5pGhOxL");
    const slides = FIGMA_ASSETS.find((a) => a.id === "sura-slides-colombia");
    expect(slides?.url).toBe(FIGMA_SLIDES_SURA_COLOMBIA.shareUrl);
    expect(slides?.notes).toMatch(/figmaEmbed/i);
  });

  it("no cuelga craft VN en Pareti/Khuro poemario", () => {
    for (const id of [
      "pareti",
      "numeros-no-existen",
      "sushi-del-mar",
      "traduccion-saberes",
      "darandar",
      "artistas-resistencia",
    ]) {
      expect(figmaLinksForCase(id)).toEqual([]);
    }
  });

  it("cuelga craft VN y AVEM en experience-only", () => {
    const vn = figmaLinksForExperience("Viento Norte");
    expect(vn.length).toBeGreaterThanOrEqual(10);
    expect(vn.some((l) => l.url.includes("nHrKYiEtbE0gYnTFB4Ast6"))).toBe(true);
    expect(vn.some((l) => l.url.includes("lEGDG3EDlNI3OOUCucTyyx"))).toBe(true);
    expect(vn.some((l) => l.url.includes("s5lLcHkNalH6p3LKCop7wT"))).toBe(false);

    const valuesite = figmaLinksForExperience("Valuesite Ltda");
    expect(valuesite.map((l) => l.url)).toEqual([
      "https://www.figma.com/proto/xqCj0eIocn9cG6pbPKu6Vy/AVEM-Prototipo-Landing-Page",
    ]);
  });

  it("reusa news covers y no inventa ?t= ni keys", () => {
    const news = FIGMA_ASSETS.find((a) => a.id === "calor-vn-news-covers");
    expect(news?.url).toBe(NEWS_CATALOG.figma.fileUrl);
    for (const asset of FIGMA_ASSETS) {
      if (asset.url) {
        expect(asset.url).not.toContain("?t=");
        expect(asset.url).not.toContain("embed.figma.com");
      }
    }
  });

  it("copy ES/EN sin Radar ni Auditoría como producto", () => {
    const haystack = FIGMA_ASSETS.flatMap((a) => [a.name.es, a.name.en, a.notes]).join(
      "\n"
    );
    for (const pattern of FORBIDDEN) {
      expect(haystack).not.toMatch(pattern);
    }
  });

  it("mapea FO path y deja NO DATO / skip sin URL", () => {
    const demanda = FIGMA_ASSETS.find((a) => a.id === "calor-vn-escenarios-demanda-sura");
    expect(foPathForAsset(demanda!)).toBe("/proyecto/sura-inversiones-dashboard");

    const nodato = FIGMA_ASSETS.filter((a) => a.url === null);
    expect(nodato.length).toBeGreaterThan(0);
    expect(nodato.every((a) => a.category === "unlinked")).toBe(true);
  });

  it("mantiene ids legacy del strip unmounted", () => {
    expect(FIGMA_CALOR_LEGACY_IDS).toHaveLength(10);
  });
});
