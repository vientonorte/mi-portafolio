import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { NEWS_CATALOG, newsTopicLanding } from "@/data/news-editions";

describe("news → specialty landing", () => {
  it("maps each topic to an HTTP /servicios/* ficha, not /s/consultoria", () => {
    expect(newsTopicLanding("privacidad")?.path).toBe(
      "/servicios/seguridad-privacidad-digital/"
    );
    expect(newsTopicLanding("accesibilidad")?.path).toBe(
      "/servicios/diagnostico-accesibilidad-wcag/"
    );
    expect(newsTopicLanding("automatizacion")?.path).toBe(
      "/servicios/inteligencia-artificial-negocios/"
    );
    for (const edition of NEWS_CATALOG.editions) {
      expect(newsTopicLanding(edition.topic)?.path.startsWith("/servicios/")).toBe(
        true
      );
    }
  });

  it("catalog CTAs no longer point at the Ads /s/ piloto", () => {
    const raw = readFileSync(
      resolve(process.cwd(), "src/data/news-editions.json"),
      "utf8"
    );
    expect(raw).not.toContain("/s/consultoria");
    expect(NEWS_CATALOG.ctaUrl).toContain("/#/consultoria");
  });
});
