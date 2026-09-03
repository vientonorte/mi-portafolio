import { describe, expect, it } from "vitest";
import {
  FIGMA_CALOR_STRIP_COPY,
  FIGMA_CALOR_VN,
  CALOR_VN_NEWS_COVERS,
} from "@/data/figma-calor";
import { NEWS_CATALOG } from "@/data/news-editions";
import {
  FIGJAM_UX_TESTING_CRITICA,
  FIGMA_SLIDES_SURA_COLOMBIA,
} from "@/data/figma-embeds";

const KNOWN_KEYS = [
  "h5663L39FoCWJ3vup0Qp3d",
  "31Krz3o3QKftMZxJLOgakk",
  "UeFKuIVdcUcHEUw2NG9grC",
  "Ihb2NtY0rBWoAJgdEi7TPn",
  "HQvdOouznRM1x4xhCxpR1m",
  "C2ZgaajABQa3NiFJTnFF45",
  "XHlBZYksezyvxKCYAUON92",
  "s5lLcHkNalH6p3LKCop7wT",
  "OR8iCIpokgaPKjerCyZAKy",
  "GkKsVobp04RD2rjGPJN7tv",
] as const;

const CLARO_ARCHIVE_KEYS = [
  "lrMqvUERZjDwTwZpQRBSC5",
  "D39xjsA7ObbhntcDEyPWQG",
  "CBguM4Y5rIvc9TV5pGhOxL",
] as const;

const FORBIDDEN = [/radar/i, /auditor[ií]a/i];

describe("figma-calor", () => {
  it("expone 10 items de calor conocidos, no un dump de Recents", () => {
    expect(FIGMA_CALOR_VN).toHaveLength(10);
  });

  it("cablea solo las URLs conocidas (file keys) y abre figma.com, no embed", () => {
    const urls = FIGMA_CALOR_VN.map((item) => item.shareUrl);
    for (const key of KNOWN_KEYS) {
      expect(urls.some((url) => url.includes(key))).toBe(true);
    }
    for (const item of FIGMA_CALOR_VN) {
      expect(item.shareUrl).toMatch(/^https:\/\/www\.figma\.com\/(design|board|make)\//);
      expect(item.shareUrl).not.toContain("embed.figma.com");
      expect(item.shareUrl).not.toContain("?t=");
      expect(["board", "slides", "design", "make"]).toContain(item.kind);
    }
  });

  it("reusa el SSOT de news covers ya cableado", () => {
    expect(CALOR_VN_NEWS_COVERS.shareUrl).toBe(NEWS_CATALOG.figma.fileUrl);
    expect(CALOR_VN_NEWS_COVERS.shareUrl).toContain("HQvdOouznRM1x4xhCxpR1m");
  });

  it("mapea superficies internas sin inventar rutas", () => {
    const byId = Object.fromEntries(FIGMA_CALOR_VN.map((item) => [item.id, item]));
    expect(byId["calor-vn-skills-dashboard"]?.surfaces).toEqual(["docs-vn", "vn-agent"]);
    expect(byId["calor-vn-arquitectura-live"]?.surfaces).toEqual(["docs-vn"]);
    expect(byId["calor-vn-cliente-entregables"]?.surfaces).toEqual(["lead-a11y-vn"]);
    expect(byId["calor-vn-campaign-assets-a11y"]?.surfaces).toEqual(["google-ads-vn"]);
    expect(byId["calor-vn-log-visual"]?.surfaces).toEqual(["docs-vn"]);
  });

  it("no mete archivo Claro ni MASCOTAPP en el strip de calor VN", () => {
    const urls = FIGMA_CALOR_VN.map((item) => item.shareUrl).join("\n");
    for (const key of CLARO_ARCHIVE_KEYS) {
      expect(urls).not.toContain(key);
    }
  });

  it("copy ES/EN sin Radar ni Auditoría como producto, y sin métricas falsas", () => {
    const haystack = [
      FIGMA_CALOR_STRIP_COPY.es.badge,
      FIGMA_CALOR_STRIP_COPY.es.title,
      FIGMA_CALOR_STRIP_COPY.es.description,
      FIGMA_CALOR_STRIP_COPY.en.badge,
      FIGMA_CALOR_STRIP_COPY.en.title,
      FIGMA_CALOR_STRIP_COPY.en.description,
      ...FIGMA_CALOR_VN.flatMap((item) => [
        item.copy.es.title,
        item.copy.es.subtitle,
        item.copy.es.embedTitle,
        item.copy.es.embedDescription,
        item.copy.es.openLabel,
        item.copy.en.title,
        item.copy.en.subtitle,
        item.copy.en.embedTitle,
        item.copy.en.embedDescription,
        item.copy.en.openLabel,
      ]),
    ].join("\n");

    for (const pattern of FORBIDDEN) {
      expect(haystack).not.toMatch(pattern);
    }
    expect(haystack).not.toMatch(/%|\bKPI\b|\bNPS\b/);
  });

  it("no sustituye los embeds públicos ya existentes", () => {
    const calorUrls = new Set(FIGMA_CALOR_VN.map((item) => item.shareUrl));
    expect(calorUrls.has(FIGJAM_UX_TESTING_CRITICA.shareUrl)).toBe(false);
    expect(calorUrls.has(FIGMA_SLIDES_SURA_COLOMBIA.shareUrl)).toBe(false);
  });
});
