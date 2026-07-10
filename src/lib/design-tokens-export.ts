/**
 * Builders de export Figma-ready desde design-tokens canónicos.
 *
 * Formatos:
 * 1. Tokens Studio for Figma (JSON nested con value/type)
 * 2. W3C Design Tokens (DTCG) $value/$type
 * 3. CSS custom properties (light + dark)
 * 4. Prompt handoff para plugins AI de Figma
 */

import {
  colorTokensDarkOverrides,
  colorTokensLight,
  designSystemMeta,
  effectTokens,
  motionTokens,
  radiusTokens,
  spacingTokens,
  typographyTokens,
  type ColorToken,
} from "../data/design-tokens";

export type ExportFormat =
  | "tokens-studio"
  | "w3c"
  | "css"
  | "figma-prompt"
  | "manifest";

function setNested(
  root: Record<string, unknown>,
  path: string,
  leaf: Record<string, unknown>
): void {
  const parts = path.split(".");
  let cur: Record<string, unknown> = root;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    if (!(key in cur) || typeof cur[key] !== "object" || cur[key] === null) {
      cur[key] = {};
    }
    cur = cur[key] as Record<string, unknown>;
  }
  cur[parts[parts.length - 1]] = leaf;
}

function colorToStudio(token: ColorToken) {
  return {
    value: token.value,
    type: "color" as const,
    description: token.description ?? token.name,
    $extensions: {
      "com.vientonorte.cssVar": token.cssVar,
    },
  };
}

/** Tokens Studio multi-set: light + dark + global */
export function buildTokensStudioJson(): string {
  const light: Record<string, unknown> = {};
  const dark: Record<string, unknown> = {};
  const global: Record<string, unknown> = {};

  for (const c of colorTokensLight) {
    setNested(light, c.path, colorToStudio(c));
  }
  for (const c of colorTokensDarkOverrides) {
    setNested(dark, c.path, colorToStudio(c));
  }

  for (const t of typographyTokens) {
    setNested(global, t.path, {
      value: {
        fontFamily: t.fontFamily,
        fontWeight: String(t.fontWeight),
        fontSize: t.fontSize,
        lineHeight: t.lineHeight,
        letterSpacing: t.letterSpacing,
      },
      type: "typography",
      description: t.description ?? t.name,
    });
  }

  for (const s of spacingTokens) {
    setNested(global, s.path, {
      value: `${s.px}`,
      type: "spacing",
      description: s.description ?? s.name,
    });
  }

  for (const r of radiusTokens) {
    setNested(global, r.path, {
      value: `${r.px}`,
      type: "borderRadius",
      description: r.description ?? r.name,
    });
  }

  for (const e of effectTokens) {
    setNested(global, e.path, {
      value: e.value,
      type: e.type === "gradient" ? "other" : "boxShadow",
      description: e.description ?? e.name,
    });
  }

  for (const m of motionTokens) {
    setNested(global, m.path, {
      value: m.value,
      type: "other",
      description: m.description ?? m.name,
    });
  }

  setNested(global, "meta.name", {
    value: designSystemMeta.name,
    type: "other",
  });
  setNested(global, "meta.version", {
    value: designSystemMeta.version,
    type: "other",
  });

  const payload = {
    $themes: [] as unknown[],
    $metadata: {
      tokenSetOrder: ["global", "light", "dark"],
      activeTheme: "light",
      updatedAt: new Date().toISOString().slice(0, 10),
      source: designSystemMeta.figma.sourceCss,
    },
    global,
    light,
    dark,
  };

  return JSON.stringify(payload, null, 2);
}

/** W3C Design Tokens Community Group format */
export function buildW3cDesignTokensJson(): string {
  const root: Record<string, unknown> = {
    $description: `${designSystemMeta.name} v${designSystemMeta.version}`,
  };

  for (const c of colorTokensLight) {
    setNested(root, `light.${c.path}`, {
      $type: "color",
      $value: c.value,
      $description: c.description ?? c.name,
      $extensions: { cssVar: c.cssVar },
    });
  }
  for (const c of colorTokensDarkOverrides) {
    setNested(root, `dark.${c.path}`, {
      $type: "color",
      $value: c.value,
      $description: c.description ?? c.name,
      $extensions: { cssVar: c.cssVar },
    });
  }
  for (const t of typographyTokens) {
    setNested(root, t.path, {
      $type: "typography",
      $value: {
        fontFamily: t.fontFamily,
        fontWeight: t.fontWeight,
        fontSize: t.fontSize,
        lineHeight: t.lineHeight,
        letterSpacing: t.letterSpacing,
      },
      $description: t.description ?? t.name,
    });
  }
  for (const s of spacingTokens) {
    setNested(root, s.path, {
      $type: "dimension",
      $value: `${s.px}px`,
      $description: s.description ?? s.name,
    });
  }
  for (const r of radiusTokens) {
    setNested(root, r.path, {
      $type: "dimension",
      $value: r.px === 9999 ? "9999px" : `${r.px}px`,
      $description: r.description ?? r.name,
    });
  }

  return JSON.stringify(root, null, 2);
}

/** CSS con :root y .dark listo para pegar o importar */
export function buildCssVariables(): string {
  const lines: string[] = [
    `/* ${designSystemMeta.name} v${designSystemMeta.version}`,
    ` * Generado para handoff Figma / dev parity`,
    ` * Fuente: ${designSystemMeta.figma.sourceCss}`,
    ` */`,
    "",
    ":root {",
  ];

  for (const c of colorTokensLight) {
    lines.push(`  ${c.cssVar}: ${c.value};`);
  }
  lines.push(`  --brand-gradient: ${effectTokens.find((e) => e.path === "effect.brand-gradient")?.value};`);
  lines.push(`  --radius: 0.75rem;`);
  for (const s of spacingTokens) {
    lines.push(`  ${s.cssVar}: ${s.value};`);
  }
  for (const r of radiusTokens) {
    if (r.cssVar === "--radius") continue;
    lines.push(`  ${r.cssVar}: ${r.value};`);
  }
  lines.push("}");
  lines.push("");
  lines.push(".dark {");
  for (const c of colorTokensDarkOverrides) {
    lines.push(`  ${c.cssVar}: ${c.value};`);
  }
  lines.push("}");
  lines.push("");

  return lines.join("\n");
}

/** Prompt listo para plugins AI de Figma (figma-handoff skill shape) */
export function buildFigmaHandoffPrompt(locale: "es" | "en" = "es"): string {
  const brandRed = colorTokensLight.find((c) => c.cssVar === "--brand-red")!.value;
  const brandOrange = colorTokensLight.find((c) => c.cssVar === "--brand-orange")!.value;
  const matte = colorTokensLight.find((c) => c.cssVar === "--surface-matte-elevated")!.value;
  const fg = colorTokensLight.find((c) => c.cssVar === "--foreground")!.value;
  const muted = colorTokensLight.find((c) => c.cssVar === "--muted-foreground")!.value;
  const border = colorTokensLight.find((c) => c.cssVar === "--border")!.value;
  const bg = colorTokensLight.find((c) => c.cssVar === "--background")!.value;

  if (locale === "en") {
    return `# Brief — ${designSystemMeta.name}

## Context
Lead UX portfolio (Fintech & Mobility). Minimal brand, matte evidence surfaces, 70-20-10 color rule.

## Design tokens (import as Figma Variables)

### Colors
- brand/red: ${brandRed}
- brand/orange: ${brandOrange}
- brand/gradient: 135deg ${brandRed} → ${brandOrange} (CTAs & highlights only ~10%)
- neutral/background: ${bg}
- neutral/foreground: ${fg}
- neutral/muted-foreground: ${muted}
- neutral/border: ${border}
- surface/matte-elevated: ${matte}
- semantic/primary (light): ${brandRed}
- semantic/primary (dark): ${brandOrange}

### Typography
- Display/UI: Chillax (300, 400, 500, 700)
- Mono/labels: system mono, 12px, tracking 0.1em
- Body: 16px / 1.6
- H2: 28–40px Bold / 1.3 / -0.01em

### Spacing (4px base)
${spacingTokens.map((s) => `- ${s.path}: ${s.px}px`).join("\n")}

### Radius
${radiusTokens.map((r) => `- ${r.path}: ${r.px === 9999 ? "full" : `${r.px}px`}`).join("\n")}

### Accessibility
- Contrast ≥ ${designSystemMeta.a11y.contrastMin}
- Touch targets ≥ ${designSystemMeta.a11y.touchMinPx}px
- Focus: ${designSystemMeta.a11y.focus}

## Frames
- Mobile: ${designSystemMeta.grid.frames.mobile.w}×${designSystemMeta.grid.frames.mobile.h}
- Tablet: ${designSystemMeta.grid.frames.tablet.w}×${designSystemMeta.grid.frames.tablet.h}
- Desktop: ${designSystemMeta.grid.frames.desktop.w}×${designSystemMeta.grid.frames.desktop.h}

## Component library to rebuild in Figma
1. LogoMark (RG) + Logo lockup — matte plate
2. Button — Primary / Secondary / Outline / Ghost / Destructive · sizes sm/md/lg · states default/hover/focus/disabled
3. Badge — Default / Secondary / Outline / Destructive
4. Card — Header + Description + Content · matte elevated
5. HeroResultCard — metric + description + client logo
6. ImpactMetricCard — KPI + spoiler + phase link
7. Input — default / disabled / focus
8. Alert — info with icon

## Rules
- No glass/blur on metrics
- Gradient only on CTAs, mark accent, key highlights
- Client logos: wordmark-sm + flat on matte cards
- WCAG 2.2 AA baseline

## Deliverables
- [ ] Variables collection Light + Dark
- [ ] Typography styles
- [ ] Spacing + radius variables
- [ ] Component set with variants
- [ ] Desktop + mobile sample frames
`;
  }

  return `# Brief — ${designSystemMeta.name}

## Contexto
Portafolio Lead UX (Fintech & Mobility). Marca minimalista, superficies mate de evidencia, regla de color 70-20-10.

## Tokens de diseño (importar como Figma Variables)

### Colores
- brand/red: ${brandRed}
- brand/orange: ${brandOrange}
- brand/gradient: 135deg ${brandRed} → ${brandOrange} (solo CTAs y highlights ~10%)
- neutral/background: ${bg}
- neutral/foreground: ${fg}
- neutral/muted-foreground: ${muted}
- neutral/border: ${border}
- surface/matte-elevated: ${matte}
- semantic/primary (light): ${brandRed}
- semantic/primary (dark): ${brandOrange}

### Tipografía
- Display/UI: Chillax (300, 400, 500, 700)
- Mono/labels: mono del sistema, 12px, tracking 0.1em
- Body: 16px / 1.6
- H2: 28–40px Bold / 1.3 / -0.01em

### Espaciado (base 4px)
${spacingTokens.map((s) => `- ${s.path}: ${s.px}px`).join("\n")}

### Radius
${radiusTokens.map((r) => `- ${r.path}: ${r.px === 9999 ? "full" : `${r.px}px`}`).join("\n")}

### Accesibilidad
- Contraste ≥ ${designSystemMeta.a11y.contrastMin}
- Touch targets ≥ ${designSystemMeta.a11y.touchMinPx}px
- Foco: ${designSystemMeta.a11y.focus}

## Frames
- Mobile: ${designSystemMeta.grid.frames.mobile.w}×${designSystemMeta.grid.frames.mobile.h}
- Tablet: ${designSystemMeta.grid.frames.tablet.w}×${designSystemMeta.grid.frames.tablet.h}
- Desktop: ${designSystemMeta.grid.frames.desktop.w}×${designSystemMeta.grid.frames.desktop.h}

## Biblioteca de componentes a reconstruir en Figma
1. LogoMark (RG) + Logo lockup — plato mate
2. Button — Primary / Secondary / Outline / Ghost / Destructive · sm/md/lg · default/hover/focus/disabled
3. Badge — Default / Secondary / Outline / Destructive
4. Card — Header + Description + Content · matte elevated
5. HeroResultCard — métrica + descripción + logo cliente
6. ImpactMetricCard — KPI + spoiler + enlace a fase
7. Input — default / disabled / focus
8. Alert — info con icono

## Reglas
- Sin glass/blur en métricas
- Gradiente solo en CTAs, acento del isologo y highlights
- Logos cliente: wordmark-sm + flat sobre cards matte
- Baseline WCAG 2.2 AA

## Entregables
- [ ] Collection Variables Light + Dark
- [ ] Estilos tipográficos
- [ ] Variables spacing + radius
- [ ] Component set con variantes
- [ ] Frames sample desktop + mobile
`;
}

export function buildManifestJson(): string {
  return JSON.stringify(
    {
      ...designSystemMeta,
      exports: {
        tokensStudio: "design-tokens.tokens-studio.json",
        w3c: "design-tokens.w3c.json",
        css: "design-tokens.css",
        figmaPrompt: "design-tokens.figma-prompt.md",
      },
      counts: {
        colorsLight: colorTokensLight.length,
        colorsDarkOverrides: colorTokensDarkOverrides.length,
        typography: typographyTokens.length,
        spacing: spacingTokens.length,
        radius: radiusTokens.length,
        effects: effectTokens.length,
        motion: motionTokens.length,
      },
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function getExportPayload(
  format: ExportFormat,
  locale: "es" | "en" = "es"
): { filename: string; mime: string; content: string } {
  switch (format) {
    case "tokens-studio":
      return {
        filename: "rg-portfolio.tokens-studio.json",
        mime: "application/json",
        content: buildTokensStudioJson(),
      };
    case "w3c":
      return {
        filename: "rg-portfolio.w3c.tokens.json",
        mime: "application/json",
        content: buildW3cDesignTokensJson(),
      };
    case "css":
      return {
        filename: "rg-portfolio.tokens.css",
        mime: "text/css",
        content: buildCssVariables(),
      };
    case "figma-prompt":
      return {
        filename: "rg-portfolio.figma-prompt.md",
        mime: "text/markdown",
        content: buildFigmaHandoffPrompt(locale),
      };
    case "manifest":
      return {
        filename: "rg-portfolio.tokens.manifest.json",
        mime: "application/json",
        content: buildManifestJson(),
      };
  }
}

export function downloadExport(
  format: ExportFormat,
  locale: "es" | "en" = "es"
): void {
  const { filename, mime, content } = getExportPayload(format, locale);
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export async function copyExport(
  format: ExportFormat,
  locale: "es" | "en" = "es"
): Promise<void> {
  const { content } = getExportPayload(format, locale);
  await navigator.clipboard.writeText(content);
}
