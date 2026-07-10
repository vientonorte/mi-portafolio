/**
 * Design tokens canónicos del portafolio Rodrigo Gaete / Viento Norte.
 * Fuente de verdad para la página /design-system y exports Figma-ready.
 *
 * Valores alineados con src/styles/globals.css (light) y .dark.
 * Plugin objetivo: Tokens Studio for Figma · Variables · handoff AI.
 */

export type TokenMode = "light" | "dark";

export interface ColorToken {
  /** Nombre legible (UI) */
  name: string;
  /** Path Tokens Studio / Figma Variables (sin espacios) */
  path: string;
  /** CSS custom property */
  cssVar: string;
  /** Hex o rgba resuelto */
  value: string;
  /** Grupo visual en la UI */
  group: "brand" | "neutral" | "semantic" | "surface" | "stat" | "logo";
  description?: string;
}

export interface TypeToken {
  name: string;
  path: string;
  cssVar?: string;
  fontFamily: string;
  fontWeight: number;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
  description?: string;
  /** Ejemplo corto para showcase */
  sample: string;
}

export interface ScaleToken {
  name: string;
  path: string;
  cssVar: string;
  /** Valor en px (Figma Variables) */
  px: number;
  /** Valor CSS */
  value: string;
  description?: string;
}

export interface EffectToken {
  name: string;
  path: string;
  cssVar: string;
  value: string;
  type: "shadow" | "gradient" | "blur";
  description?: string;
}

export interface MotionToken {
  name: string;
  path: string;
  cssVar: string;
  value: string;
  type: "duration" | "easing";
  description?: string;
}

/** Colores light (default / :root) */
export const colorTokensLight: ColorToken[] = [
  // Brand 10%
  {
    name: "Brand Red",
    path: "color.brand.red",
    cssVar: "--brand-red",
    value: "#FF1D25",
    group: "brand",
    description: "Acento primario light · CTAs y isologo",
  },
  {
    name: "Brand Orange",
    path: "color.brand.orange",
    cssVar: "--brand-orange",
    value: "#FF931E",
    group: "brand",
    description: "Acento secundario · extremo del gradiente",
  },
  {
    name: "Primary",
    path: "color.semantic.primary",
    cssVar: "--primary",
    value: "#FF1D25",
    group: "semantic",
  },
  {
    name: "Primary Foreground",
    path: "color.semantic.primary-foreground",
    cssVar: "--primary-foreground",
    value: "#FFFFFF",
    group: "semantic",
  },
  {
    name: "Destructive",
    path: "color.semantic.destructive",
    cssVar: "--destructive",
    value: "#D4183D",
    group: "semantic",
  },
  // Neutrals 70%
  {
    name: "Background",
    path: "color.neutral.background",
    cssVar: "--background",
    value: "#FFFFFF",
    group: "neutral",
  },
  {
    name: "Foreground",
    path: "color.neutral.foreground",
    cssVar: "--foreground",
    value: "#171717",
    group: "neutral",
  },
  {
    name: "Card",
    path: "color.neutral.card",
    cssVar: "--card",
    value: "#FFFFFF",
    group: "neutral",
  },
  {
    name: "Muted",
    path: "color.neutral.muted",
    cssVar: "--muted",
    value: "#F5F5F5",
    group: "neutral",
  },
  {
    name: "Muted Foreground",
    path: "color.neutral.muted-foreground",
    cssVar: "--muted-foreground",
    value: "#525252",
    group: "neutral",
  },
  {
    name: "Border",
    path: "color.neutral.border",
    cssVar: "--border",
    value: "#E5E5E5",
    group: "neutral",
  },
  {
    name: "Neutral 50",
    path: "color.neutral.50",
    cssVar: "--neutral-50",
    value: "#FAFAFA",
    group: "neutral",
  },
  {
    name: "Neutral 100",
    path: "color.neutral.100",
    cssVar: "--neutral-100",
    value: "#F5F5F5",
    group: "neutral",
  },
  {
    name: "Neutral 200",
    path: "color.neutral.200",
    cssVar: "--neutral-200",
    value: "#E5E5E5",
    group: "neutral",
  },
  {
    name: "Neutral 500",
    path: "color.neutral.500",
    cssVar: "--neutral-500",
    value: "#737373",
    group: "neutral",
  },
  {
    name: "Neutral 900",
    path: "color.neutral.900",
    cssVar: "--neutral-900",
    value: "#171717",
    group: "neutral",
  },
  // Surfaces matte
  {
    name: "Surface Matte",
    path: "color.surface.matte",
    cssVar: "--surface-matte",
    value: "#F0EEEA",
    group: "surface",
    description: "Warm neutral base · secciones de evidencia",
  },
  {
    name: "Surface Matte Elevated",
    path: "color.surface.matte-elevated",
    cssVar: "--surface-matte-elevated",
    value: "#F7F5F1",
    group: "surface",
    description: "Cards de métricas y testimonios",
  },
  {
    name: "Surface Section",
    path: "color.surface.section",
    cssVar: "--surface-section",
    value: "#EBE8E3",
    group: "surface",
  },
  {
    name: "Logo Surface",
    path: "color.logo.surface",
    cssVar: "--logo-surface",
    value: "#E8E5DF",
    group: "logo",
  },
  {
    name: "Logo Surface Border",
    path: "color.logo.surface-border",
    cssVar: "--logo-surface-border",
    value: "rgba(23, 23, 23, 0.07)",
    group: "logo",
  },
  {
    name: "Logo Plate",
    path: "color.logo.plate",
    cssVar: "--logo-plate",
    value: "#E8E5DF",
    group: "logo",
    description: "Placa legibilidad wordmarks (siempre tono claro)",
  },
  // Stat tints
  {
    name: "Stat Tint Blue",
    path: "color.stat.blue",
    cssVar: "--stat-tint-blue",
    value: "#E4EAF0",
    group: "stat",
  },
  {
    name: "Stat Tint Blue FG",
    path: "color.stat.blue-fg",
    cssVar: "--stat-tint-blue-fg",
    value: "#4A6578",
    group: "stat",
  },
  {
    name: "Stat Tint Amber",
    path: "color.stat.amber",
    cssVar: "--stat-tint-amber",
    value: "#EDE8DF",
    group: "stat",
  },
  {
    name: "Stat Tint Amber FG",
    path: "color.stat.amber-fg",
    cssVar: "--stat-tint-amber-fg",
    value: "#7A6340",
    group: "stat",
  },
  {
    name: "Stat Tint Rose",
    path: "color.stat.rose",
    cssVar: "--stat-tint-rose",
    value: "#EBE3E4",
    group: "stat",
  },
  {
    name: "Stat Tint Rose FG",
    path: "color.stat.rose-fg",
    cssVar: "--stat-tint-rose-fg",
    value: "#7A5560",
    group: "stat",
  },
  {
    name: "Stat Tint Violet",
    path: "color.stat.violet",
    cssVar: "--stat-tint-violet",
    value: "#E6E3EB",
    group: "stat",
  },
  {
    name: "Stat Tint Violet FG",
    path: "color.stat.violet-fg",
    cssVar: "--stat-tint-violet-fg",
    value: "#625A75",
    group: "stat",
  },
];

/** Overrides dark (.dark) — solo tokens que cambian */
export const colorTokensDarkOverrides: ColorToken[] = [
  {
    name: "Primary",
    path: "color.semantic.primary",
    cssVar: "--primary",
    value: "#FF931E",
    group: "semantic",
  },
  {
    name: "Primary Foreground",
    path: "color.semantic.primary-foreground",
    cssVar: "--primary-foreground",
    value: "#0A0A0A",
    group: "semantic",
  },
  {
    name: "Destructive",
    path: "color.semantic.destructive",
    cssVar: "--destructive",
    value: "#DC2626",
    group: "semantic",
  },
  {
    name: "Background",
    path: "color.neutral.background",
    cssVar: "--background",
    value: "#0A0A0A",
    group: "neutral",
  },
  {
    name: "Foreground",
    path: "color.neutral.foreground",
    cssVar: "--foreground",
    value: "#FAFAFA",
    group: "neutral",
  },
  {
    name: "Card",
    path: "color.neutral.card",
    cssVar: "--card",
    value: "#171717",
    group: "neutral",
  },
  {
    name: "Muted",
    path: "color.neutral.muted",
    cssVar: "--muted",
    value: "#262626",
    group: "neutral",
  },
  {
    name: "Muted Foreground",
    path: "color.neutral.muted-foreground",
    cssVar: "--muted-foreground",
    value: "#D4D4D4",
    group: "neutral",
  },
  {
    name: "Border",
    path: "color.neutral.border",
    cssVar: "--border",
    value: "#262626",
    group: "neutral",
  },
  {
    name: "Surface Matte",
    path: "color.surface.matte",
    cssVar: "--surface-matte",
    value: "#1A1917",
    group: "surface",
  },
  {
    name: "Surface Matte Elevated",
    path: "color.surface.matte-elevated",
    cssVar: "--surface-matte-elevated",
    value: "#222120",
    group: "surface",
  },
  {
    name: "Surface Section",
    path: "color.surface.section",
    cssVar: "--surface-section",
    value: "#161514",
    group: "surface",
  },
  {
    name: "Logo Surface",
    path: "color.logo.surface",
    cssVar: "--logo-surface",
    value: "#2C2A27",
    group: "logo",
  },
  {
    name: "Logo Surface Border",
    path: "color.logo.surface-border",
    cssVar: "--logo-surface-border",
    value: "rgba(250, 250, 250, 0.07)",
    group: "logo",
  },
  {
    name: "Logo Plate",
    path: "color.logo.plate",
    cssVar: "--logo-plate",
    value: "#EBE6DE",
    group: "logo",
  },
  {
    name: "Stat Tint Blue",
    path: "color.stat.blue",
    cssVar: "--stat-tint-blue",
    value: "#1C2228",
    group: "stat",
  },
  {
    name: "Stat Tint Blue FG",
    path: "color.stat.blue-fg",
    cssVar: "--stat-tint-blue-fg",
    value: "#8DA8BE",
    group: "stat",
  },
  {
    name: "Stat Tint Amber",
    path: "color.stat.amber",
    cssVar: "--stat-tint-amber",
    value: "#24211C",
    group: "stat",
  },
  {
    name: "Stat Tint Amber FG",
    path: "color.stat.amber-fg",
    cssVar: "--stat-tint-amber-fg",
    value: "#C4A574",
    group: "stat",
  },
  {
    name: "Stat Tint Rose",
    path: "color.stat.rose",
    cssVar: "--stat-tint-rose",
    value: "#241C1E",
    group: "stat",
  },
  {
    name: "Stat Tint Rose FG",
    path: "color.stat.rose-fg",
    cssVar: "--stat-tint-rose-fg",
    value: "#C4909A",
    group: "stat",
  },
  {
    name: "Stat Tint Violet",
    path: "color.stat.violet",
    cssVar: "--stat-tint-violet",
    value: "#201E24",
    group: "stat",
  },
  {
    name: "Stat Tint Violet FG",
    path: "color.stat.violet-fg",
    cssVar: "--stat-tint-violet-fg",
    value: "#A89AB8",
    group: "stat",
  },
];

export const typographyTokens: TypeToken[] = [
  {
    name: "Display / Hero",
    path: "typography.display",
    fontFamily: "Chillax",
    fontWeight: 700,
    fontSize: "clamp(2.5rem, 6vw, 5rem)",
    lineHeight: "1.2",
    letterSpacing: "-0.02em",
    description: "Hero h1 · Figma: 40–80px Bold",
    sample: "Aa",
  },
  {
    name: "Heading 1",
    path: "typography.h1",
    fontFamily: "Chillax",
    fontWeight: 700,
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    lineHeight: "1.2",
    letterSpacing: "-0.02em",
    description: "Page titles · Figma: 32–56px Bold",
    sample: "Aa",
  },
  {
    name: "Heading 2",
    path: "typography.h2",
    fontFamily: "Chillax",
    fontWeight: 700,
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
    lineHeight: "1.3",
    letterSpacing: "-0.01em",
    description: "Section titles · Figma: 28–40px Bold",
    sample: "Aa",
  },
  {
    name: "Heading 3",
    path: "typography.h3",
    fontFamily: "Chillax",
    fontWeight: 500,
    fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
    lineHeight: "1.4",
    letterSpacing: "0",
    description: "Card titles · Figma: 20–28px Medium",
    sample: "Aa",
  },
  {
    name: "Body",
    path: "typography.body",
    fontFamily: "Chillax",
    fontWeight: 400,
    fontSize: "1rem",
    lineHeight: "1.6",
    letterSpacing: "0",
    description: "Body copy · 16px Regular",
    sample: "Aa",
  },
  {
    name: "Body Medium",
    path: "typography.body-medium",
    fontFamily: "Chillax",
    fontWeight: 500,
    fontSize: "1rem",
    lineHeight: "1.5",
    letterSpacing: "0",
    description: "Labels, buttons · 16px Medium",
    sample: "Aa",
  },
  {
    name: "Caption / Mono",
    path: "typography.caption",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: "1.4",
    letterSpacing: "0.1em",
    description: "Métricas, roles, labels · 12px mono tracking widest",
    sample: "Aa",
  },
];

/** Escala 4px base → Figma Variables number */
export const spacingTokens: ScaleToken[] = [
  { name: "Space 1", path: "spacing.1", cssVar: "--space-1", px: 4, value: "4px", description: "XS" },
  { name: "Space 2", path: "spacing.2", cssVar: "--space-2", px: 8, value: "8px", description: "SM" },
  { name: "Space 3", path: "spacing.3", cssVar: "--space-3", px: 12, value: "12px" },
  { name: "Space 4", path: "spacing.4", cssVar: "--space-4", px: 16, value: "16px", description: "MD" },
  { name: "Space 5", path: "spacing.5", cssVar: "--space-5", px: 20, value: "20px" },
  { name: "Space 6", path: "spacing.6", cssVar: "--space-6", px: 24, value: "24px", description: "LG" },
  { name: "Space 7", path: "spacing.7", cssVar: "--space-7", px: 32, value: "32px", description: "XL" },
  { name: "Space 8", path: "spacing.8", cssVar: "--space-8", px: 40, value: "40px" },
  { name: "Space 9", path: "spacing.9", cssVar: "--space-9", px: 48, value: "48px", description: "2XL" },
  { name: "Space 10", path: "spacing.10", cssVar: "--space-10", px: 64, value: "64px", description: "3XL" },
  {
    name: "Touch Min",
    path: "spacing.touch-min",
    cssVar: "--touch-min",
    px: 44,
    value: "44px",
    description: "WCAG 2.2 SC 2.5.5 · target táctil mínimo",
  },
];

export const radiusTokens: ScaleToken[] = [
  { name: "Radius SM", path: "radius.sm", cssVar: "--radius-sm", px: 8, value: "8px", description: "calc(var(--radius) - 4px)" },
  { name: "Radius MD", path: "radius.md", cssVar: "--radius-md", px: 10, value: "10px", description: "calc(var(--radius) - 2px)" },
  { name: "Radius LG", path: "radius.lg", cssVar: "--radius", px: 12, value: "12px", description: "Base --radius 0.75rem" },
  { name: "Radius XL", path: "radius.xl", cssVar: "--radius-xl", px: 16, value: "16px", description: "Cards elevated" },
  { name: "Radius Full", path: "radius.full", cssVar: "--radius-full", px: 9999, value: "9999px", description: "Badges, pills" },
];

export const effectTokens: EffectToken[] = [
  {
    name: "Brand Gradient",
    path: "effect.brand-gradient",
    cssVar: "--brand-gradient",
    value: "linear-gradient(135deg, #FF1D25 0%, #FF931E 100%)",
    type: "gradient",
    description: "Solo ~10% de la UI · CTAs, acento isologo, highlights",
  },
  {
    name: "Logo Plate Shadow",
    path: "effect.logo-plate-shadow",
    cssVar: "--logo-plate-shadow",
    value: "0 1px 2px rgba(23, 23, 23, 0.07)",
    type: "shadow",
  },
  {
    name: "Shadow SM",
    path: "effect.shadow-sm",
    cssVar: "--shadow-sm",
    value: "0 1px 2px rgba(23, 23, 23, 0.06), 0 1px 3px rgba(23, 23, 23, 0.10)",
    type: "shadow",
  },
  {
    name: "Shadow MD",
    path: "effect.shadow-md",
    cssVar: "--shadow-md",
    value: "0 4px 12px rgba(23, 23, 23, 0.10), 0 2px 4px rgba(23, 23, 23, 0.06)",
    type: "shadow",
  },
];

export const motionTokens: MotionToken[] = [
  {
    name: "Duration Fast",
    path: "motion.duration.fast",
    cssVar: "--duration-fast",
    value: "150ms",
    type: "duration",
  },
  {
    name: "Duration Base",
    path: "motion.duration.base",
    cssVar: "--duration-base",
    value: "250ms",
    type: "duration",
  },
  {
    name: "Duration Slow",
    path: "motion.duration.slow",
    cssVar: "--duration-slow",
    value: "400ms",
    type: "duration",
  },
  {
    name: "Ease Out",
    path: "motion.easing.out",
    cssVar: "--ease-out",
    value: "cubic-bezier(0.4, 0, 0.2, 1)",
    type: "easing",
  },
];

/** Metadatos del sistema para handoff */
export const designSystemMeta = {
  name: "Rodrigo Gaete Portfolio DS",
  version: "1.0.0",
  author: "Rodrigo Gaete · Viento Norte",
  rule: "70-20-10",
  fonts: {
    display: "Chillax",
    ui: "Chillax",
    mono: "ui-monospace, SFMono-Regular, Menlo, monospace",
  },
  grid: {
    base: 4,
    columnsDesktop: 12,
    gutter: 24,
    marginDesktop: 64,
    frames: {
      mobile: { w: 375, h: 812 },
      tablet: { w: 768, h: 1024 },
      desktop: { w: 1440, h: 900 },
    },
  },
  a11y: {
    contrastMin: "4.5:1",
    touchMinPx: 44,
    focus: "outline 2px primary · offset 2px",
  },
  figma: {
    tokensStudioPlugin: "Tokens Studio for Figma",
    sourceCss: "src/styles/globals.css",
    sourceVn: "src/styles/vn-tokens.css",
  },
} as const;

/** Colores para showcase UI (subset ordenado) */
export function getColorsForGroup(
  group: ColorToken["group"],
  mode: TokenMode = "light"
): ColorToken[] {
  if (mode === "light") {
    return colorTokensLight.filter((c) => c.group === group);
  }
  const darkMap = new Map(colorTokensDarkOverrides.map((c) => [c.path, c]));
  return colorTokensLight
    .filter((c) => c.group === group)
    .map((c) => darkMap.get(c.path) ?? c);
}

export function resolveColorMode(mode: TokenMode): ColorToken[] {
  if (mode === "light") return colorTokensLight;
  const darkMap = new Map(colorTokensDarkOverrides.map((c) => [c.path, c]));
  const paths = new Set([
    ...colorTokensLight.map((c) => c.path),
    ...colorTokensDarkOverrides.map((c) => c.path),
  ]);
  return Array.from(paths).map((path) => {
    const light = colorTokensLight.find((c) => c.path === path);
    const dark = darkMap.get(path);
    return dark ?? light!;
  });
}
