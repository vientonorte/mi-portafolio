import { describe, expect, it } from "vitest";
import {
  buildCssVariables,
  buildFigmaHandoffPrompt,
  buildManifestJson,
  buildTokensStudioJson,
  buildW3cDesignTokensJson,
  getExportPayload,
} from "../../lib/design-tokens-export";
import { colorTokensLight, spacingTokens } from "../../data/design-tokens";

describe("design-tokens-export", () => {
  it("builds Tokens Studio JSON with global / light / dark sets", () => {
    const raw = buildTokensStudioJson();
    const data = JSON.parse(raw) as {
      $metadata: { tokenSetOrder: string[] };
      global: Record<string, unknown>;
      light: Record<string, unknown>;
      dark: Record<string, unknown>;
    };

    expect(data.$metadata.tokenSetOrder).toEqual(["global", "light", "dark"]);
    expect(data.light).toBeDefined();
    expect(data.dark).toBeDefined();
    expect(data.global).toBeDefined();

    const brand = (data.light as { color?: { brand?: { red?: { value: string; type: string } } } })
      .color?.brand?.red;
    expect(brand?.type).toBe("color");
    expect(brand?.value).toBe("#FF1D25");

    const space1 = (
      data.global as { spacing?: { "1"?: { value: string; type: string } } }
    ).spacing?.["1"];
    expect(space1?.type).toBe("spacing");
    expect(space1?.value).toBe("4");
  });

  it("builds W3C DTCG tokens with $value/$type", () => {
    const data = JSON.parse(buildW3cDesignTokensJson()) as {
      light?: { color?: { brand?: { red?: { $type: string; $value: string } } } };
      spacing?: { "1"?: { $type: string; $value: string } };
    };

    expect(data.light?.color?.brand?.red?.$type).toBe("color");
    expect(data.light?.color?.brand?.red?.$value).toBe("#FF1D25");
    expect(data.spacing?.["1"]?.$type).toBe("dimension");
    expect(data.spacing?.["1"]?.$value).toBe("4px");
  });

  it("builds CSS with :root and .dark", () => {
    const css = buildCssVariables();
    expect(css).toContain(":root {");
    expect(css).toContain(".dark {");
    expect(css).toContain("--brand-red: #FF1D25");
    expect(css).toContain("--primary: #FF931E"); // dark override
  });

  it("builds Figma handoff prompt with tokens and frames", () => {
    const es = buildFigmaHandoffPrompt("es");
    const en = buildFigmaHandoffPrompt("en");

    expect(es).toContain("# Brief");
    expect(es).toContain("#FF1D25");
    expect(es).toContain("375");
    expect(es).toContain("WCAG");
    expect(en).toContain("Lead UX");
    expect(en).toContain("Touch targets");
  });

  it("getExportPayload returns correct filenames", () => {
    expect(getExportPayload("tokens-studio").filename).toMatch(/tokens-studio\.json$/);
    expect(getExportPayload("w3c").filename).toMatch(/w3c\.tokens\.json$/);
    expect(getExportPayload("css").filename).toMatch(/\.css$/);
    expect(getExportPayload("figma-prompt").filename).toMatch(/\.md$/);
    expect(getExportPayload("manifest").mime).toBe("application/json");
  });

  it("manifest includes token counts", () => {
    const m = JSON.parse(buildManifestJson()) as {
      counts: { colorsLight: number; spacing: number };
    };
    expect(m.counts.colorsLight).toBe(colorTokensLight.length);
    expect(m.counts.spacing).toBe(spacingTokens.length);
  });
});
