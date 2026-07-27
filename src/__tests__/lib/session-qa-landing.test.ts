/**
 * QA session: design-system Figma export + consultoria landing.
 * Valida paridad i18n, exports y anclas de landing.
 */
import { describe, expect, it } from "vitest";
import es from "../../lib/i18n/locales/es";
import en from "../../lib/i18n/locales/en";
import {
  buildCssVariables,
  buildFigmaHandoffPrompt,
  buildTokensStudioJson,
  buildW3cDesignTokensJson,
  getExportPayload,
} from "../../lib/design-tokens-export";
import {
  CONSULTORIA_PRACTICES,
  PRACTICE_CATEGORIES,
} from "../../data/consultoria-practices";
import { CONSULTING_PACKAGES } from "../../data/vientonorte-consulting";
import { colorTokensLight, spacingTokens } from "../../data/design-tokens";

function leafKeys(obj: unknown, prefix = ""): string[] {
  if (obj === null || typeof obj !== "object" || Array.isArray(obj)) {
    return prefix ? [prefix] : [];
  }
  return Object.keys(obj as object).flatMap((k) =>
    leafKeys((obj as Record<string, unknown>)[k], prefix ? `${prefix}.${k}` : k)
  );
}

function getPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

describe("session QA · i18n parity", () => {
  it.each([
    ["consultoria", es.consultoria, en.consultoria],
    ["valueArsenal", es.valueArsenal, en.valueArsenal],
    ["seo.designSystem", es.seo.pages.designSystem, en.seo.pages.designSystem],
    ["seo.consultoria", es.seo.pages.consultoria, en.seo.pages.consultoria],
  ] as const)("%s keys match ES/EN", (_name, a, b) => {
    const ka = leafKeys(a).sort();
    const kb = leafKeys(b).sort();
    expect(ka).toEqual(kb);
  });

  it("consultoria landing keys exist in both locales", () => {
    const required = [
      "landing.title",
      "landing.titleAccent",
      "landing.description",
      "landing.ctaPrimary",
      "landing.ctaSecondary",
      "landing.metrics",
      "landing.nav.practices",
      "landing.nav.packages",
      "landing.nav.evidence",
      "landing.nav.fit",
      "practices.title",
      "practices.checklistLabel",
      "practices.validationLabel",
      "packagesSection.cta",
      "packagesSection.deliverablesLabel",
      "stickyCta",
    ];
    for (const path of required) {
      expect(getPath(es.consultoria, path), `es.${path}`).toBeDefined();
      expect(getPath(en.consultoria, path), `en.${path}`).toBeDefined();
    }
    expect(es.consultoria.landing.metrics).toHaveLength(4);
    expect(en.consultoria.landing.metrics).toHaveLength(4);
  });
});

describe("session QA · design tokens export", () => {
  it("Tokens Studio JSON has global/light/dark and brand red", () => {
    const data = JSON.parse(buildTokensStudioJson()) as {
      $metadata: { tokenSetOrder: string[] };
      light: { color: { brand: { red: { value: string; type: string } } } };
      global: { spacing: { "1": { value: string } } };
    };
    expect(data.$metadata.tokenSetOrder).toEqual(["global", "light", "dark"]);
    expect(data.light.color.brand.red.value).toBe("#FF1D25");
    expect(data.light.color.brand.red.type).toBe("color");
    expect(data.global.spacing["1"].value).toBe("4");
  });

  it("W3C + CSS + prompt + all export filenames", () => {
    const w3c = JSON.parse(buildW3cDesignTokensJson()) as {
      light: { color: { brand: { red: { $value: string } } } };
    };
    expect(w3c.light.color.brand.red.$value).toBe("#FF1D25");

    const css = buildCssVariables();
    expect(css).toMatch(/:root\s*\{/);
    expect(css).toMatch(/\.dark\s*\{/);
    expect(css).toContain("--brand-red: #FF1D25");

    expect(buildFigmaHandoffPrompt("es")).toContain("WCAG");
    expect(buildFigmaHandoffPrompt("en")).toContain("375");

    const formats = [
      "tokens-studio",
      "w3c",
      "css",
      "figma-prompt",
      "manifest",
    ] as const;
    for (const f of formats) {
      const payload = getExportPayload(f, "es");
      expect(payload.filename.length).toBeGreaterThan(5);
      expect(payload.content.length).toBeGreaterThan(50);
    }

    expect(colorTokensLight.length).toBeGreaterThan(10);
    expect(spacingTokens.some((s) => s.px === 44)).toBe(true);
  });
});

describe("session QA · consultoria landing content", () => {
  it("has documented practices across all categories and 3 packages", () => {
    expect(CONSULTORIA_PRACTICES.length).toBeGreaterThanOrEqual(13);
    const cats = new Set(CONSULTORIA_PRACTICES.map((p) => p.category));
    for (const c of PRACTICE_CATEGORIES) {
      expect(cats.has(c.id)).toBe(true);
    }
    expect(CONSULTING_PACKAGES.map((p) => p.id).sort()).toEqual([
      "marco",
      "ops",
      "radar",
    ]);
    for (const pkg of CONSULTING_PACKAGES) {
      expect(pkg.deliverables.es.length).toBeGreaterThanOrEqual(2);
      expect(pkg.deliverables.en.length).toBe(pkg.deliverables.es.length);
    }
  });

  it("SEO mentions Figma tokens and free a11y diagnóstico", () => {
    expect(es.seo.pages.designSystem.description.toLowerCase()).toMatch(
      /figma|tokens/
    );
    expect(en.seo.pages.designSystem.description.toLowerCase()).toMatch(
      /figma|tokens/
    );
    // Copy comercial actual (free a11y / diagnóstico / pymes) — no playbook legacy
    expect(es.seo.pages.consultoria.description.toLowerCase()).toMatch(
      /accesibilidad|wcag|diagnóstico|gratis|pyme/
    );
    expect(en.seo.pages.consultoria.description.toLowerCase()).toMatch(
      /accessib|wcag|diagnos|free|sme|pyme/
    );
  });
});
