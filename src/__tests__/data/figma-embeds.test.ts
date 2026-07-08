import { describe, expect, it } from "vitest";
import {
  FIGJAM_UX_TESTING_CRITICA,
  FIGMA_SLIDES_SURA_COLOMBIA,
  toFigmaEmbedUrl,
} from "@/data/figma-embeds";

describe("figma-embeds", () => {
  it("convierte share URL a embed.figma.com con embed-host", () => {
    const embed = toFigmaEmbedUrl(FIGJAM_UX_TESTING_CRITICA.shareUrl);
    expect(embed).toContain("embed.figma.com/board/");
    expect(embed).toContain("embed-host=mi-portafolio");
  });

  it("expone copy ES/EN en ambos embeds productivos", () => {
    for (const config of [FIGJAM_UX_TESTING_CRITICA, FIGMA_SLIDES_SURA_COLOMBIA]) {
      expect(config.copy.es.title.length).toBeGreaterThan(0);
      expect(config.copy.en.title.length).toBeGreaterThan(0);
      expect(toFigmaEmbedUrl(config.shareUrl)).toMatch(/^https:\/\/embed\.figma\.com\//);
    }
  });
});