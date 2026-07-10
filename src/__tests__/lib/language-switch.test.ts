import { describe, expect, it, beforeEach } from "vitest";
import {
  loadTranslation,
  isTranslationLoaded,
  getTranslationSync,
  preloadAllTranslations,
} from "@/lib/i18n/loader";

describe("language switch ES ↔ EN (both directions)", () => {
  beforeEach(async () => {
    await preloadAllTranslations();
  });

  it("has both locales loaded after preload", () => {
    expect(isTranslationLoaded("es")).toBe(true);
    expect(isTranslationLoaded("en")).toBe(true);
  });

  it("resolves es and en without throw (EN→ES and ES→EN)", () => {
    expect(() => getTranslationSync("es")).not.toThrow();
    expect(() => getTranslationSync("en")).not.toThrow();
    expect(getTranslationSync("es").nav.home).toBeTruthy();
    expect(getTranslationSync("en").nav.home).toBeTruthy();
  });

  it("returns distinct dictionaries for each language", () => {
    const es = getTranslationSync("es");
    const en = getTranslationSync("en");
    expect(es.nav.home).not.toEqual(en.nav.home);
  });

  it("loadTranslation is idempotent for both directions", async () => {
    const a = await loadTranslation("en");
    const b = await loadTranslation("es");
    const c = await loadTranslation("en");
    expect(a).toBe(c);
    expect(a).not.toBe(b);
  });
});
