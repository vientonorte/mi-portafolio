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

  it("cada edición trae ejemplo y preguntas, sin respuesta escrita", () => {
    expect(NEWS_CATALOG.cuñas.estado).toBe("esperando-audio");
    expect(NEWS_CATALOG.cuñas.archivo).toBe("{slug}--{id}.m4a");
    expect(NEWS_CATALOG.cuñas.reel).toBe("9:16");
    for (const edition of NEWS_CATALOG.editions) {
      expect(edition.ejemplo.es.length).toBeGreaterThan(40);
      expect(edition.ejemplo.en.length).toBeGreaterThan(40);
      expect(edition.entrevista).toHaveLength(3);
      for (const toma of edition.entrevista) {
        expect(toma.id).toMatch(/^(a11y|auto|priv)-\d{2}$/);
        expect(toma.pregunta.endsWith("?")).toBe(true);
        expect(toma.apoyo.length).toBeGreaterThan(10);
        expect(toma).not.toHaveProperty("respuesta");
      }
    }
  });
});
