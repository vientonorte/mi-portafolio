import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { NEWS_CATALOG, newsTopicLanding } from "@/data/news-editions";
import { serviciosHref } from "@/lib/servicios-links";

describe("news → specialty landing", () => {
  it("maps each topic to a live /servicios/ anchor, not a redirect slug", () => {
    expect(newsTopicLanding("privacidad")?.path).toBe(serviciosHref("revision-gratis"));
    expect(newsTopicLanding("accesibilidad")?.path).toBe(serviciosHref("revision-gratis"));
    expect(newsTopicLanding("automatizacion")?.path).toBe(serviciosHref("consultoria-ux"));
    for (const edition of NEWS_CATALOG.editions) {
      const path = newsTopicLanding(edition.topic)?.path ?? "";
      expect(path.startsWith(serviciosHref())).toBe(true);
      expect(path).not.toContain("/servicios/seguridad-privacidad-digital/");
      expect(path).not.toContain("/servicios/inteligencia-artificial-negocios/");
    }
  });

  it("catalog CTAs no longer point at the Ads /s/ piloto", () => {
    const raw = readFileSync(
      resolve(process.cwd(), "src/data/news-editions.json"),
      "utf8"
    );
    expect(raw).not.toContain("/s/consultoria");
    expect(NEWS_CATALOG.ctaUrl).not.toContain("/#/consultoria");
    expect(NEWS_CATALOG.ctaUrl).toContain("/servicios/");
  });
});
