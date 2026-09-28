/**
 * Inventario de TODOS los degradados de src/** (y del prerender de /servicios/)
 * con su texto encima, para el test de contraste WCAG AA
 * (src/__tests__/a11y/gradient-contrast.test.ts).
 *
 * - `matches`: nº de líneas del archivo que coinciden con GRADIENT_PATTERN y
 *   corresponden a esta entrada. El test exige que la suma por archivo sea igual
 *   al escaneo real, así que un degradado nuevo sin inventariar rompe el test.
 * - `status`:
 *    checked      → se calcula el contraste en cada 5 % del degradado (ver cases)
 *    decorative   → sin texto encima (barras, halos, blur, bordes, marcos)
 *    separate-pr  → requiere más que un cambio de token (se lista, no se arregla aquí)
 *    unused       → archivo sin importar en la app
 * - `before` / `after`: valores antes y después de este PR cuando cambian.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseColor, withAlpha, type RGBA } from "./contrast-utils";

export const ROOT = resolve(__dirname, "../../..");
const read = (p: string) => readFileSync(resolve(ROOT, p), "utf8");

export const GRADIENT_PATTERN =
  /bg-brand-gradient|text-brand-gradient|heading-gradient|--brand-gradient|bg-gradient-to-|bg-\[linear|bg-\[radial|linear-gradient|radial-gradient|bg-linear-|bg-radial|<linearGradient|<radialGradient|GradientHeading/;

/* ── Tokens reales leídos de los CSS (no copiados a mano) ───────────────── */

function cssVars(block: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const m of block.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  return out;
}
function block(css: string, selector: string): string {
  const start = css.indexOf(`\n${selector} {`);
  if (start < 0) throw new Error(`bloque ${selector} no encontrado`);
  const end = css.indexOf("\n}", start);
  return css.slice(start, end);
}
export const CSS = {
  vnTokens: read("src/styles/vn-tokens.css"),
  globals: read("src/styles/globals.css"),
  global: read("src/styles/global.css"),
  twTheme: read("node_modules/tailwindcss/theme.css"),
};
const primitives = cssVars(CSS.vnTokens);
function resolveVar(v: string, scope: Record<string, string>): string {
  const m = v.match(/^var\((--[\w-]+)\)$/);
  return m ? resolveVar(scope[m[1]] ?? primitives[m[1]], scope) : v;
}
const lightVars = { ...primitives, ...cssVars(block(CSS.globals, ":root")) };
const darkVars = { ...lightVars, ...cssVars(block(CSS.globals, ".dark")) };
const pick = (vars: Record<string, string>) => {
  const g = (n: string) => resolveVar(vars[n], vars);
  return {
    bg: g("--background"),
    fg: g("--foreground"),
    card: g("--card"),
    popover: g("--popover"),
    muted: g("--muted"),
    mutedFg: g("--muted-foreground"),
    matte: g("--surface-matte"),
    matteElev: g("--surface-matte-elevated"),
    primary: g("--primary"),
    primaryFg: g("--primary-foreground"),
    brandRed: g("--brand-red"),
    brandOrange: g("--brand-orange"),
    navInactive: g("--bottom-nav-inactive"),
    ctaBg: g("--vn-color-cta-bg"),
    ctaBgHover: g("--vn-color-cta-bg-hover"),
    ctaFg: g("--vn-color-cta-fg"),
  };
};
export const THEME = { light: pick(lightVars), dark: pick(darkVars) };
export type ThemeName = keyof typeof THEME;

export const ROJO_700 = primitives["--vn-primitive-rojo-700"];
export const AZUL_700 = primitives["--vn-primitive-azul-evo-700"];
export const AZUL_800 = primitives["--vn-primitive-azul-evo-800"];

/** Color de Tailwind v4 (oklch) leído de node_modules/tailwindcss/theme.css. */
export function tw(name: string, alpha = 1): RGBA {
  const m = CSS.twTheme.match(new RegExp(`--color-${name}:\\s*([^;]+);`));
  if (!m) throw new Error(`tailwind color ${name}`);
  return withAlpha(parseColor(m[1]), alpha);
}
const c = (x: string | RGBA, a = 1): RGBA => withAlpha(typeof x === "string" ? parseColor(x) : x, a);
const T = c("transparent");

/* ── Degradados compartidos, antes y después ────────────────────────────── */

export type V<X> = X | { before: X; after: X };
export type Era = "before" | "after";
export const val = <X,>(v: V<X>, era: Era): X =>
  v && typeof v === "object" && "before" in (v as object) && "after" in (v as object)
    ? (v as { before: X; after: X })[era]
    : (v as X);

/** --brand-gradient: antes #E8401C→#1A8FDC; después rojo-700 → azul-evo-700. */
export const BRAND: V<RGBA[]> = {
  before: [c("#E8401C"), c("#1A8FDC")],
  after: [c(ROJO_700), c(AZUL_700)],
};
/** .text-brand-gradient: claro = BRAND; oscuro = tonos base (sin cambio). */
export const BRAND_TEXT = {
  light: BRAND,
  dark: [c(THEME.dark.brandRed), c(THEME.dark.brandOrange)] as RGBA[],
};
/** .heading-gradient: antes #ff1d25→#ff931e en ambos temas; después claro = BRAND 700. */
export const HEADING_TEXT = {
  light: { before: [c("#ff1d25"), c("#ff931e")], after: [c(ROJO_700), c(AZUL_700)] } as V<RGBA[]>,
  dark: [c("#ff1d25"), c("#ff931e")] as RGBA[],
};

/* ── Modelo ─────────────────────────────────────────────────────────────── */

export type Layer = { stops: RGBA[]; opacity?: number };
export type Size = "normal" | "large" | "non-text";
export interface Case {
  label: string;
  theme: ThemeName;
  /** Relleno del texto: 1 parada = color sólido; ≥2 = texto con degradado. */
  text: V<RGBA[]>;
  /** Superficie opaca bajo los degradados. */
  base: string | RGBA;
  /** Capas de degradado encima de base (abajo→arriba); cada una se muestrea cada 5 %. */
  layers: V<Layer[]>;
  size: Size;
  /** Justificación de "large" (≥24px, o ≥18.66px bold). */
  why?: string;
}
export interface Entry {
  id: string;
  file: string;
  component: string;
  element: string;
  matches: number;
  status: "checked" | "decorative" | "separate-pr" | "unused";
  note?: string;
  cases?: Case[];
}

/* ── Fábricas de casos ──────────────────────────────────────────────────── */

const themes: ThemeName[] = ["light", "dark"];
const white = [c("#ffffff")];

/** Texto blanco sobre bg-brand-gradient (+ hover:opacity-90 sobre la superficie, + brillo animado). */
function whiteOnBrand(
  label: string,
  size: Size,
  opts: { hoverOpacity?: number; surface?: "bg" | "card" | "matte" | "matteElev"; shimmer?: V<number>; why?: string } = {}
): Case[] {
  const out: Case[] = [];
  for (const theme of themes) {
    const surf = THEME[theme][opts.surface ?? "bg"];
    const brand = { before: [{ stops: val(BRAND, "before") }], after: [{ stops: val(BRAND, "after") }] };
    out.push({ label: `${label} · reposo`, theme, text: white, base: surf, layers: brand, size, why: opts.why });
    if (opts.hoverOpacity) {
      const o = opts.hoverOpacity;
      out.push({
        label: `${label} · hover opacity-${o * 100}`,
        theme,
        text: white,
        base: surf,
        layers: { before: [{ stops: val(BRAND, "before"), opacity: o }], after: [{ stops: val(BRAND, "after"), opacity: o }] },
        size,
        why: opts.why,
      });
    }
    if (opts.shimmer !== undefined) {
      const sh = (era: Era) => [T, c("#ffffff", val(opts.shimmer!, era)), T];
      out.push({
        label: `${label} · brillo animado (pico)`,
        theme,
        text: white,
        base: surf,
        layers: {
          before: [{ stops: val(BRAND, "before") }, { stops: sh("before") }],
          after: [{ stops: val(BRAND, "after") }, { stops: sh("after") }],
        },
        size,
        why: opts.why,
      });
    }
  }
  return out;
}

/** Icono blanco sobre bg-brand-gradient: contraste no textual (1.4.11) ≥ 3:1. */
function iconOnBrand(label: string): Case[] {
  return [{ label, theme: "light", text: white, base: "#ffffff", layers: { before: [{ stops: val(BRAND, "before") }], after: [{ stops: val(BRAND, "after") }] }, size: "non-text" }];
}

/**
 * Texto/ícono blanco sobre azul sólido: antes --primary (dark #1A8FDC = 3.50:1),
 * después --vn-color-cta-bg (#0f6aa8 = 5.76:1). En light primary ya era #0f6aa8.
 */
function solidCtaWhite(label: string, size: Size = "normal", opts: { hover?: boolean; why?: string } = {}): Case[] {
  const out: Case[] = [];
  for (const theme of themes) {
    out.push({
      label,
      theme,
      text: white,
      base: THEME[theme].bg,
      layers: {
        before: [{ stops: [c(THEME[theme].primary)] }],
        after: [{ stops: [c(THEME[theme].ctaBg)] }],
      },
      size,
      why: opts.why,
    });
    if (opts.hover) {
      out.push({
        label: `${label} · hover`,
        theme,
        text: white,
        base: THEME[theme].bg,
        layers: {
          before: [{ stops: [c(THEME[theme].primary)] }], // hover:bg-primary (mismo hex)
          after: [{ stops: [c(THEME[theme].ctaBgHover)] }],
        },
        size,
        why: opts.why,
      });
    }
  }
  return out;
}

/** Superficies azules sólidas (no botones) migradas a --vn-color-cta-* en este commit. */
export const SOLID_CTA_SURFACES: { id: string; file: string; label: string }[] = [
  { id: "process-nav-number", file: "src/components/molecules/ProcessNavigation.tsx", label: "indicador de número activo (desktop)" },
  { id: "trajectory-highlight", file: "src/components/organisms/TrajectoryRail.tsx", label: "nodo highlight" },
  { id: "tooltip", file: "src/components/ui/tooltip.tsx", label: "TooltipContent + Arrow" },
  { id: "calendar", file: "src/components/ui/calendar.tsx", label: "día seleccionado / rango" },
  { id: "badge-default", file: "src/components/ui/badge.tsx", label: "Badge variant default" },
  { id: "about-equation", file: "src/components/organisms/About.tsx", label: "badge resultado ecuación" },
  { id: "process-flow-number", file: "src/components/ui/enterprise/process-flow.tsx", label: "número de paso" },
  { id: "timeline-completed", file: "src/components/ui/enterprise/timeline.tsx", label: "ícono completed" },
];

/**
 * Tercer commit: skip-links, checkbox marcado, hover de CaseStudyCard, tab activa de
 * ProjectDetail, botón de recarga de LanguageContext y selección de texto de Input.
 * Mismo patrón: bg-primary + text-primary-foreground → --vn-color-cta-*.
 */
export interface CtaSurface {
  id: string;
  file: string;
  label: string;
  cases: Case[];
}
/** Borde/relleno del checkbox marcado contra la página (1.4.11, ≥ 3:1). */
function checkedBoxVsPage(label: string): Case[] {
  return themes.map((theme): Case => ({
    label,
    theme,
    text: { before: [c(THEME[theme].primary)], after: [c(THEME[theme].ctaBg)] },
    base: THEME[theme].bg,
    layers: [],
    size: "non-text",
  }));
}
export const CTA_SURFACES_C3: CtaSurface[] = [
  { id: "skip-framework", file: "src/pages/FrameworkDetail.tsx", label: "skip-link (focus)", cases: solidCtaWhite("Skip-link FrameworkDetail · blanco sobre azul") },
  { id: "skip-project", file: "src/pages/ProjectDetail.tsx", label: "skip-link (focus)", cases: solidCtaWhite("Skip-link ProjectDetail · blanco sobre azul") },
  { id: "skip-company", file: "src/pages/CompanyDetail.tsx", label: "skip-link (focus)", cases: solidCtaWhite("Skip-link CompanyDetail · blanco sobre azul") },
  { id: "skip-globals-css", file: "src/styles/globals.css", label: ".skip-link (globals.css)", cases: solidCtaWhite(".skip-link globals.css · blanco sobre azul") },
  {
    id: "checkbox-checked",
    file: "src/components/ui/checkbox.tsx",
    label: "checkbox marcado",
    cases: [...solidCtaWhite("Checkbox marcado · check blanco sobre azul", "non-text"), ...checkedBoxVsPage("Checkbox marcado · caja azul vs página")],
  },
  { id: "case-study-hover", file: "src/components/molecules/CaseStudyCard.tsx", label: "CTA en hover de la tarjeta", cases: solidCtaWhite("CaseStudyCard hover · blanco sobre azul") },
  { id: "projectdetail-tab", file: "src/pages/ProjectDetail.tsx", label: "tab activa (pantallas de diseño)", cases: solidCtaWhite("Tab activa ProjectDetail · blanco sobre azul") },
  {
    id: "language-reload",
    file: "src/lib/LanguageContext.tsx",
    label: "botón Recargar (error de carga de idioma)",
    cases: solidCtaWhite("Botón Recargar · blanco sobre azul", "normal", { hover: true, why: "antes sin hover (bg-primary); después hover → cta-bg-hover" }),
  },
  { id: "input-selection", file: "src/components/ui/input.tsx", label: "selección de texto (::selection)", cases: solidCtaWhite("Input ::selection · blanco sobre azul") },
];

type Tok = keyof (typeof THEME)["light"];
/** Texto (foreground y muted-foreground) sobre un tinte degradado translúcido. */
function tint(
  label: string,
  layers: (theme: ThemeName) => V<Layer[]>,
  opts: { base?: Tok; texts?: Tok[]; only?: ThemeName[]; size?: Size; why?: string } = {}
): Case[] {
  const out: Case[] = [];
  for (const theme of opts.only ?? themes) {
    for (const t of opts.texts ?? (["fg", "mutedFg"] as Tok[])) {
      out.push({
        label: `${label} · ${t}`,
        theme,
        // text-primary: antes #1A8FDC en ambos temas; después --primary claro = azul-evo-700
        text: t === "primary" ? { before: [c("#1A8FDC")], after: [c(THEME[theme].primary)] } : [c(THEME[theme][t])],
        base: THEME[theme][opts.base ?? "bg"],
        layers: layers(theme),
        size: opts.size ?? "normal",
        why: opts.why,
      });
    }
  }
  return out;
}

/** Texto con degradado sobre una superficie (opcionalmente con tinte). */
function gradientText(
  label: string,
  kind: "brand" | "heading",
  base: Tok,
  why: string,
  extraLayers: (theme: ThemeName) => Layer[] = () => []
): Case[] {
  return themes.map((theme) => ({
    label,
    theme,
    text: kind === "brand" ? (theme === "light" ? BRAND_TEXT.light : BRAND_TEXT.dark) : theme === "light" ? HEADING_TEXT.light : HEADING_TEXT.dark,
    base: THEME[theme][base],
    layers: extraLayers(theme),
    size: "large" as Size,
    why,
  }));
}

/** Tinte de --primary (valor después de este PR; a 5–10 % la diferencia antes/después es < 0.02:1). */
const primary = (theme: ThemeName, a: number) => c(THEME[theme].primary, a);
const FG_MUTED_PRIMARY: Tok[] = ["fg", "mutedFg", "primary"];
/** Fondo animado de los heros de detalle: radial 15 % (#ff1d25 / #ff931e) dentro de un wrapper opacity-30. */
const heroRadial = (): Layer[] => [{ stops: [c("#ff1d25", 0.15), T], opacity: 0.3 }, { stops: [c("#ff931e", 0.15), T], opacity: 0.3 }];
const heroRadialBrand = (theme: ThemeName): Layer[] => [
  { stops: [c(THEME[theme].brandRed, 0.15), T], opacity: 0.3 },
  { stops: [c(THEME[theme].brandOrange, 0.15), T], opacity: 0.3 },
];
/** Mancha de marca desenfocada (blur) con opacidad o, detrás de texto. */
const blob = (o: number): V<Layer[]> => ({ before: [{ stops: val(BRAND, "before"), opacity: o }], after: [{ stops: val(BRAND, "after"), opacity: o }] });
const blobTint = (label: string, o: number, base: Tok): Case[] =>
  themes.flatMap((theme) =>
    (["fg", "mutedFg"] as Tok[]).map((t) => ({ label: `${label} · ${t}`, theme, text: [c(THEME[theme][t])], base: THEME[theme][base], layers: blob(o), size: "normal" as Size }))
  );


/* ── Inventario ─────────────────────────────────────────────────────────── */

export const INVENTORY: Entry[] = [
  // Tokens / definiciones
  { id: "token-brand-gradient", file: "src/styles/globals.css", component: "--brand-gradient / --brand-gradient-on-dark, .bg-/.text-/.border-brand-gradient, .dark .text-brand-gradient, .profile-avatar-frame::before", element: "token", matches: 11, status: "decorative", note: "Definiciones; los usos se verifican abajo." },
  { id: "globals-atmosphere", file: "src/styles/globals.css", component: ".section-atmosphere-* (radiales primary 3–6 %; PageSection)", element: "fondo de sección", matches: 5, status: "checked",
    cases: [
      ...tint("section-atmosphere-base", (t) => [{ stops: [primary(t, 0.05), T] }], { texts: FG_MUTED_PRIMARY }),
      // Dos radiales en esquinas opuestas (50% -8% y 100% 100%) que llegan a transparente al 70 % / 65 %: sus picos no se solapan.
      ...tint("section-atmosphere-matte (radial superior, antes 8 % → 6 %)", (t) => ({ before: [{ stops: [primary(t, 0.08), T] }], after: [{ stops: [primary(t, 0.06), T] }] }), { base: "matte", texts: FG_MUTED_PRIMARY }),
      ...tint("section-atmosphere-matte (radial inferior 3 %)", (t) => [{ stops: [primary(t, 0.03), T] }], { base: "matte", texts: FG_MUTED_PRIMARY }),
      ...tint("section-atmosphere-section/muted", (t) => [{ stops: [primary(t, 0.06), T] }], { texts: FG_MUTED_PRIMARY }),
    ] },
  { id: "globals-avatar", file: "src/styles/globals.css", component: ".profile-avatar__warmth / __vignette", element: "overlay sobre foto de perfil (sin texto)", matches: 3, status: "decorative" },
  { id: "global-glass-nav", file: "src/styles/global.css", component: ".bottom-nav-mobile--glass (claro/oscuro)", element: "barra inferior móvil (texto/íconos idle)", matches: 2, status: "checked",
    note: "Antes: highlight blanco 28%/12% + bg 78%/82% → idle falla sobre contenido extremo. Después: vidrio ≥96% --background.",
    cases: [
      // Antes: tope del glass (white @28% light / white @12% dark) sobre negro → idle << 4.5:1
      { label: "Idle label · tope glass sobre negro", theme: "light",
        text: [c(THEME.light.navInactive)], base: "#000000",
        layers: { before: [{ stops: [c("#ffffff", 0.28)] }], after: [{ stops: [c(THEME.light.bg, 0.96)] }] },
        size: "normal" },
      { label: "Idle icon · tope glass sobre negro", theme: "light",
        text: [c(THEME.light.navInactive)], base: "#000000",
        layers: { before: [{ stops: [c("#ffffff", 0.28)] }], after: [{ stops: [c(THEME.light.bg, 0.96)] }] },
        size: "non-text" },
      { label: "Idle label · tope glass sobre blanco", theme: "dark",
        text: [c(THEME.dark.navInactive)], base: "#ffffff",
        layers: { before: [{ stops: [c("#ffffff", 0.12)] }], after: [{ stops: [c(THEME.dark.bg, 0.96)] }] },
        size: "normal" },
      { label: "Idle icon · tope glass sobre blanco", theme: "dark",
        text: [c(THEME.dark.navInactive)], base: "#ffffff",
        layers: { before: [{ stops: [c("#ffffff", 0.12)] }], after: [{ stops: [c(THEME.dark.bg, 0.96)] }] },
        size: "non-text" },
      // Tab activo (--primary) en el peor fondo detrás del vidrio
      { label: "Activo --primary · tope glass sobre negro", theme: "light",
        text: [c(THEME.light.primary)], base: "#000000",
        layers: { before: [{ stops: [c("#ffffff", 0.28)] }], after: [{ stops: [c(THEME.light.bg, 0.96)] }] },
        size: "normal" },
      { label: "Activo --primary · tope glass sobre blanco", theme: "dark",
        text: [c(THEME.dark.primary)], base: "#ffffff",
        layers: { before: [{ stops: [c("#ffffff", 0.12)] }], after: [{ stops: [c(THEME.dark.bg, 0.96)] }] },
        size: "normal" },
      // Reposo mid (contenido detrás = bg del tema): debe seguir ≥ 4.5 / 3
      { label: "Idle label · mid glass sobre bg", theme: "light",
        text: [c(THEME.light.navInactive)], base: THEME.light.bg,
        layers: { before: [{ stops: [c(THEME.light.bg, 0.78)] }], after: [{ stops: [c(THEME.light.bg, 0.97)] }] },
        size: "normal" },
      { label: "Idle label · mid glass sobre bg", theme: "dark",
        text: [c(THEME.dark.navInactive)], base: THEME.dark.bg,
        layers: { before: [{ stops: [c(THEME.dark.bg, 0.82)] }], after: [{ stops: [c(THEME.dark.bg, 0.97)] }] },
        size: "normal" },
    ] },
  { id: "global-liquid-halo", file: "src/styles/global.css", component: ".liquid-nav-cta__halo (LiquidNavCta)", element: "halo detrás del isologo; la etiqueta va fuera del orbe", matches: 4, status: "decorative" },
  { id: "global-heading-gradient", file: "src/styles/global.css", component: ".heading-gradient (GradientHeading, FrameworkDetail, StatsTooltip)", element: "texto con degradado (claro + .dark)", matches: 4, status: "decorative", note: "Definición; usos verificados en sus componentes." },
  { id: "offer-progress", file: "src/styles/offer-tour.css", component: ".offer-progress-fill", element: "barra de progreso", matches: 1, status: "decorative" },
  { id: "design-tokens-data", file: "src/data/design-tokens.ts", component: "effectTokens brand-gradient", element: "dato del design system", matches: 2, status: "decorative", note: "Valor actualizado a #c2330f → #0f6aa8." },
  { id: "design-tokens-export", file: "src/lib/design-tokens-export.ts", component: "export CSS", element: "código", matches: 1, status: "decorative" },

  // Home + /servicios/
  { id: "primary-cta", file: "src/servicios/servicios-content.ts", component: "PRIMARY_CTA_CLASS (hero home 'Quiero mi web en 72 h', CTAs y tarjetas de /servicios/)", element: "botón", matches: 2, status: "checked",
    cases: whiteOnBrand("PRIMARY_CTA_CLASS", "large", { why: "text-[1.1875rem] font-bold = 19px bold" }) },
  { id: "how-we-work", file: "src/components/marketing/HowWeWork.tsx", component: "HowWeWork (home + /servicios/)", element: "número de paso", matches: 1, status: "checked",
    cases: whiteOnBrand("HowWeWork paso", "normal") },
  { id: "hero-mockup-bar", file: "src/components/marketing/HeroWithMockup.tsx", component: "HeroWithMockup", element: "barra superior 6px", matches: 1, status: "decorative" },
  { id: "footer-rule", file: "src/components/Footer.tsx", component: "Footer", element: "filete", matches: 1, status: "decorative" },
  { id: "logo", file: "src/components/atoms/Logo.tsx", component: "Logo", element: "punto + isologo SVG", matches: 3, status: "decorative" },
  { id: "hero-blob", file: "src/components/organisms/Hero.tsx", component: "Hero (legacy)", element: "mancha blur opacity .15 detrás del texto", matches: 1, status: "checked", cases: blobTint("Hero blob", 0.15, "bg") },

  // Botones / badges con texto blanco
  { id: "casestudies", file: "src/pages/CaseStudies.tsx", component: "CaseStudies", element: "badge, CTA con brillo, heading, tintes, radiales", matches: 15, status: "checked",
    cases: [
      ...whiteOnBrand("Badge hero (text-base uppercase)", "normal"),
      ...whiteOnBrand("CTA final text-lg", "normal", { hoverOpacity: 0.9, shimmer: { before: 0.2, after: 0.1 } }),
      ...gradientText("GradientHeading hero (sobre radiales)", "heading", "bg", ".subpage-hero__title ≥ 32px black", heroRadialBrand),
      ...tint("Hero radiales", heroRadialBrand),
      ...tint("Card from-primary/5 (brillo via-white/10)", (t) => [{ stops: [primary(t, 0.05)] }, { stops: [T, c("#ffffff", 0.1), T] }], { base: "card" }),
      ...tint("Card from-muted/50 to-muted/20", (t) => [{ stops: [c(THEME[t].muted, 0.5), c(THEME[t].muted, 0.2)] }], { base: "card" }),
      ...tint("Card from-primary/5 to-transparent", (t) => [{ stops: [primary(t, 0.05), T] }], { base: "card", texts: FG_MUTED_PRIMARY }),
      ...tint("Cadena valor Development: from-primary/10 to-primary/5 (h4 text-primary bold)", (t) => [{ stops: [primary(t, 0.1), primary(t, 0.05)] }], { texts: FG_MUTED_PRIMARY }),
      ...themes.flatMap((theme): Case[] => [
        { label: "Cadena valor Discovery: h4 text-blue-600 bold", theme, text: { before: [tw("blue-600")], after: [tw(theme === "light" ? "blue-600" : "blue-400")] }, base: THEME[theme].bg, layers: [{ stops: [tw("blue-500", 0.1), tw("blue-600", 0.1)] }], size: "normal" },
        { label: "Cadena valor Product Design: h4 text-green-600 bold", theme, text: { before: [tw("green-600")], after: [tw(theme === "light" ? "green-800" : "green-400")] }, base: THEME[theme].bg, layers: [{ stops: [tw("green-500", 0.1), tw("green-600", 0.1)] }], size: "normal" },
        { label: "Cadena valor: text-sm sobre bg-background/50", theme, text: [c(THEME[theme].fg)], base: THEME[theme].bg, layers: [{ stops: [tw("green-500", 0.1), tw("green-600", 0.1)] }, { stops: [c(THEME[theme].bg, 0.5)] }], size: "normal" },
      ]),
    ] },
  { id: "processdetail", file: "src/pages/ProcessDetail.tsx", component: "ProcessDetail", element: "CTA con brillo, heading, tinte", matches: 5, status: "checked",
    cases: [
      ...whiteOnBrand("CTA", "normal", { hoverOpacity: 0.9, shimmer: { before: 0.2, after: 0.1 } }),
      ...gradientText("GradientHeading hero", "heading", "bg", ".subpage-hero__title ≥ 32px black", (t) => [{ stops: [primary(t, 0.05), T, T] }]),
      ...tint("Hero from-primary/5", (t) => [{ stops: [primary(t, 0.05), T, T] }]),
    ] },
  { id: "auditoria", file: "src/pages/AuditoriaPortfolio.tsx", component: "AuditoriaPortfolio", element: "CTAs, tintes, barras", matches: 8, status: "checked",
    cases: [
      ...whiteOnBrand("CTA cabecera text-sm (text-primary-foreground)", "normal", { hoverOpacity: 0.9 }),
      ...whiteOnBrand("CTA formulario", "normal", { hoverOpacity: 0.9 }),
      ...tint("Panel from-card to-muted/30", (t) => [{ stops: [c(THEME[t].card), c(THEME[t].muted, 0.3)] }], { base: "card" }),
      ...tint("Fondos -z-10 primary/5 ↔ orange-500/5 (via-background)", (t) => [{ stops: [primary(t, 0.05), c(THEME[t].bg), tw("orange-500", 0.05)] }], { texts: FG_MUTED_PRIMARY }),
    ] },
  { id: "framework", file: "src/pages/FrameworkDetail.tsx", component: "FrameworkDetail", element: "heading, métricas heading-gradient, tintes, radiales, barras, icono", matches: 21, status: "checked",
    cases: [
      ...gradientText("GradientHeading hero (sobre radiales)", "heading", "bg", ".subpage-hero__title ≥ 32px black", heroRadial),
      ...tint("Hero radiales rgba 15 % ×0.3", heroRadial),
      ...tint("Hero blobs primary/20→5 blur", (t) => [{ stops: [primary(t, 0.2), primary(t, 0.05)] }]),
      ...gradientText("Métrica heading-gradient en Card from-primary/5", "heading", "card", "text-4xl font-bold = 36px", (t) => [{ stops: [primary(t, 0.05), T] }]),
      ...tint("Card from-primary/5 to-transparent", (t) => [{ stops: [primary(t, 0.05), T] }], { base: "card" }),
      ...iconOnBrand("Icono en tile bg-brand-gradient"),
    ] },
  { id: "companydetail", file: "src/pages/CompanyDetail.tsx", component: "CompanyDetail", element: "heading + radiales", matches: 6, status: "checked",
    cases: [...gradientText("GradientHeading hero (sobre radiales)", "heading", "bg", ".subpage-hero__title ≥ 32px black", heroRadial), ...tint("Hero radiales", heroRadial)] },
  { id: "projectdetail", file: "src/pages/ProjectDetail.tsx", component: "ProjectDetail", element: "radiales + barra", matches: 5, status: "checked", cases: tint("Hero radiales", heroRadial) },
  { id: "autosuggest", file: "src/pages/AutosuggestFondos.tsx", component: "AutosuggestFondos", element: "botón", matches: 1, status: "checked", cases: whiteOnBrand("Botón", "normal", { hoverOpacity: 0.9 }) },
  { id: "timed-demo", file: "src/pages/TimedServiceDemo.tsx", component: "TimedServiceDemo", element: "2 botones", matches: 2, status: "checked", cases: whiteOnBrand("Botón", "normal", { hoverOpacity: 0.9 }) },
  { id: "value-proof", file: "src/components/molecules/ValueProofCard.tsx", component: "ValueProofCard", element: "botón", matches: 1, status: "checked", cases: whiteOnBrand("Botón", "normal", { hoverOpacity: 0.9 }) },
  { id: "hero-search", file: "src/components/molecules/HeroIntelligentSearch.tsx", component: "HeroIntelligentSearch", element: "botón", matches: 1, status: "checked", cases: whiteOnBrand("Botón", "normal", { hoverOpacity: 0.9 }) },
  { id: "free-a11y", file: "src/components/molecules/FreeA11yScheduleCta.tsx", component: "FreeA11yScheduleCta", element: "3 botones + icono", matches: 4, status: "checked", cases: [...whiteOnBrand("Botón funnel", "normal", { hoverOpacity: 0.9 }), ...iconOnBrand("Icono calendario")] },
  { id: "hero-unified", file: "src/components/molecules/HeroUnifiedBanner.tsx", component: "HeroUnifiedBanner", element: "botón + icono", matches: 2, status: "checked", cases: [...whiteOnBrand("Botón", "normal", { hoverOpacity: 0.9 }), ...iconOnBrand("Icono sparkles")] },
  { id: "hero-audience", file: "src/components/molecules/HeroAudienceCta.tsx", component: "HeroAudienceCta", element: "riel + icono destacado", matches: 2, status: "checked", cases: iconOnBrand("Icono destacado") },
  { id: "back-to-top", file: "src/components/molecules/BackToTop.tsx", component: "BackToTop", element: "botón solo icono", matches: 1, status: "checked", cases: iconOnBrand("Flecha") },
  { id: "profile-avatar", file: "src/components/atoms/ProfileAvatar.tsx", component: "ProfileAvatar (sin foto)", element: "iniciales", matches: 1, status: "checked", cases: whiteOnBrand("Iniciales", "large", { why: "text-3xl font-semibold = 30px" }) },
  { id: "testimonial", file: "src/components/ui/enterprise/testimonial-card.tsx", component: "TestimonialCard", element: "inicial + barra", matches: 2, status: "checked", cases: whiteOnBrand("Inicial font-bold 16px", "normal") },
  { id: "edu-partner", file: "src/components/organisms/ConsultoriaEducationPartner.tsx", component: "ConsultoriaEducationPartner", element: "botón", matches: 1, status: "checked", cases: whiteOnBrand("Botón", "normal", { hoverOpacity: 0.9 }) },
  { id: "contact", file: "src/components/organisms/Contact.tsx", component: "Contact", element: "botón enviar", matches: 1, status: "checked", cases: whiteOnBrand("Botón", "normal", { hoverOpacity: 0.9 }) },
  { id: "value-carousel", file: "src/components/organisms/ValueCarouselBanner.tsx", component: "ValueCarouselBanner", element: "blob, barra, titleAccent, botón", matches: 4, status: "checked",
    cases: [...blobTint("Blob opacity-15", 0.15, "matte"), ...gradientText("titleAccent .text-brand-gradient", "brand", "matteElev", "text-2xl font-semibold = 24px"), ...whiteOnBrand("Botón", "normal", { hoverOpacity: 0.9, surface: "matteElev" })] },
  { id: "flagship", file: "src/components/organisms/FlagshipCaseStudy.tsx", component: "FlagshipCaseStudy", element: "tinte sección + botón", matches: 2, status: "checked",
    cases: [...tint("Sección from-primary/5 (h3 text-sm text-primary)", (t) => [{ stops: [primary(t, 0.05), T] }], { texts: FG_MUTED_PRIMARY }), ...whiteOnBrand("Botón", "normal", { hoverOpacity: 0.9 })] },
  { id: "landing-hero", file: "src/components/organisms/ConsultoriaLandingHero.tsx", component: "ConsultoriaLandingHero (SEM /consultoria)", element: "barra + CTA", matches: 2, status: "checked", cases: whiteOnBrand("CTA funnel", "normal", { hoverOpacity: 0.9 }) },
  { id: "about-teaser", file: "src/components/organisms/AboutTeaser.tsx", component: "AboutTeaser", element: "botón", matches: 1, status: "checked", cases: whiteOnBrand("Botón", "normal") },
  { id: "projects-teaser", file: "src/components/organisms/ProjectsTeaser.tsx", component: "ProjectsTeaser", element: "botón", matches: 1, status: "checked", cases: whiteOnBrand("Botón", "normal", { hoverOpacity: 0.9 }) },
  { id: "app-quoter", file: "src/components/organisms/AppQuoter.tsx", component: "AppQuoter", element: "progreso + botón", matches: 2, status: "checked", cases: whiteOnBrand("Botón", "normal", { hoverOpacity: 0.9 }) },
  { id: "projects", file: "src/components/organisms/Projects.tsx", component: "Projects", element: "botón", matches: 1, status: "checked", cases: whiteOnBrand("Botón", "normal", { hoverOpacity: 0.9 }) },
  { id: "notfound", file: "src/components/organisms/NotFound.tsx", component: "NotFound", element: "tile con icono decorativo (from-muted to-muted/50), h1 degradado, botón", matches: 3, status: "checked",
    cases: [
      ...whiteOnBrand("Botón", "normal", { hoverOpacity: 0.9 }),
      ...themes.map((theme): Case => ({ label: "h1 404 from-foreground to-muted-foreground", theme, text: [c(THEME[theme].fg), c(THEME[theme].mutedFg)], base: THEME[theme].bg, layers: [], size: "large", why: "text-8xl bold" })),
    ] },
  { id: "notfound-page", file: "src/components/layout/NotFoundPage.tsx", component: "NotFoundPage", element: "número 404 con degradado", matches: 1, status: "checked",
    cases: themes.map((theme): Case => ({ label: "404 from-foreground to-muted-foreground", theme, text: [c(THEME[theme].fg), c(THEME[theme].mutedFg)], base: THEME[theme].bg, layers: [], size: "large", why: "text-7xl bold" })) },
  { id: "contact-assistant", file: "src/components/organisms/ContactAssistant.tsx", component: "ContactAssistant", element: "chip seleccionado + botón", matches: 2, status: "checked", cases: whiteOnBrand("Chip/botón text-sm", "normal", { hoverOpacity: 0.9 }) },
  { id: "tree-preview", file: "src/components/organisms/ConsultoriaTreePreview.tsx", component: "ConsultoriaTreePreview", element: "botón", matches: 1, status: "checked", cases: whiteOnBrand("Botón", "normal", { hoverOpacity: 0.9 }) },
  { id: "onboarding", file: "src/components/organisms/ConsultoriaOnboarding.tsx", component: "ConsultoriaOnboarding (home)", element: "botón", matches: 1, status: "checked", cases: whiteOnBrand("Botón", "normal") },
  { id: "packages", file: "src/components/organisms/ConsultoriaPackages.tsx", component: "ConsultoriaPackages", element: "CTA", matches: 1, status: "checked", cases: whiteOnBrand("CTA", "normal", { hoverOpacity: 0.9 }) },
  { id: "value-arsenal", file: "src/components/organisms/ValueContentArsenal.tsx", component: "ValueContentArsenal", element: "botón", matches: 1, status: "checked", cases: whiteOnBrand("Botón", "normal", { hoverOpacity: 0.9 }) },
  { id: "private-tooling", file: "src/components/organisms/ConsultoriaPrivateTooling.tsx", component: "ConsultoriaPrivateTooling", element: "botón", matches: 1, status: "checked", cases: whiteOnBrand("Botón", "normal", { hoverOpacity: 0.9 }) },
  { id: "demo-showcase", file: "src/components/organisms/ConsultoriaDemoShowcase.tsx", component: "ConsultoriaDemoShowcase", element: "2 botones + panel", matches: 3, status: "checked",
    cases: [...whiteOnBrand("Botón", "normal", { hoverOpacity: 0.9 }), ...tint("Panel from-muted/40 to-background", (t) => [{ stops: [c(THEME[t].muted, 0.4), c(THEME[t].bg)] }])] },
  { id: "packages-strip", file: "src/components/organisms/HomePackagesStrip.tsx", component: "HomePackagesStrip (home)", element: "botón destacado", matches: 1, status: "checked", cases: whiteOnBrand("Botón destacado", "normal", { hoverOpacity: 0.9 }) },
  { id: "premium-audit", file: "src/components/organisms/PremiumUxAuditBanner.tsx", component: "PremiumUxAuditBanner", element: "titleAccent ×2, botón, barra, blob", matches: 5, status: "checked",
    cases: [
      ...gradientText("titleAccent .text-brand-gradient (hero, bg-surface-matte + blob)", "brand", "matte", "text-3xl+ bold/black ≥ 30px", () => []),
      ...gradientText("titleAccent .text-brand-gradient (compact, fondo de página)", "brand", "bg", "text-3xl bold = 30px"),
      ...whiteOnBrand("Botón", "normal", { hoverOpacity: 0.9, surface: "matte" }),
      ...blobTint("Blob opacity-20", 0.2, "matte"),
    ] },
  { id: "kpi-card", file: "src/components/molecules/KPICard.tsx", component: "KPICard", element: "fondo card, barras, glows, icono, valor degradado", matches: 9, status: "checked",
    cases: [
      ...tint("Card from-card to-card/50 (+ glow hover 5 %)", (t) => [{ stops: [c(THEME[t].card), c(THEME[t].card, 0.5)] }]),
      ...iconOnBrand("Icono tile"),
      ...gradientText("Valor .text-brand-gradient", "brand", "card", "text-5xl font-bold = 48px"),
    ] },
  { id: "stat-card", file: "src/components/molecules/StatCard.tsx", component: "StatCard", element: "valor degradado", matches: 1, status: "checked", cases: gradientText("metric-card-value .text-brand-gradient", "brand", "card", "30px bold (36px md)") },
  { id: "stats-tooltip", file: "src/components/molecules/StatsTooltip.tsx", component: "StatsTooltip", element: "valor heading-gradient", matches: 1, status: "checked", cases: gradientText("Valor .heading-gradient", "heading", "popover", "text-4xl font-black = 36px") },
  { id: "gradient-heading", file: "src/components/atoms/GradientHeading.tsx", component: "GradientHeading", element: "definición (usos en páginas de detalle)", matches: 4, status: "decorative" },
  { id: "process-phase", file: "src/components/molecules/ProcessPhaseCard.tsx", component: "ProcessPhaseCard", element: "overlay hover 5 % + barra", matches: 2, status: "checked",
    cases: themes.flatMap((theme) => (["fg", "mutedFg"] as Tok[]).map((t): Case => ({ label: `Overlay hover opacity-5 · ${t}`, theme, text: [c(THEME[theme][t])], base: THEME[theme].card, layers: blob(0.05), size: "normal" }))) },
  { id: "process-flow", file: "src/components/ui/enterprise/process-flow.tsx", component: "ProcessFlow", element: "número de paso (sólido) + borde/barra degradados decorativos", matches: 2, status: "checked",
    note: "Degradados del borde hover y barra inferior: decorativos. Número: bg-primary→--vn-color-cta-* (dark 3.50→5.76:1).",
    cases: solidCtaWhite("Número paso · blanco sobre azul sólido") },
  { id: "sura", file: "src/components/organisms/SuraOnboardingEvidence.tsx", component: "SuraOnboardingEvidence", element: "tiles icono, fondos slate-50→100 detrás de mockups Figma (sin texto vivo), tarjetas de color", matches: 8, status: "checked",
    cases: [
      ...iconOnBrand("Iconos tile"),
      ...(["blue", "green", "purple"] as const).flatMap((hue) =>
        themes.flatMap((theme) =>
          (["fg", "mutedFg"] as Tok[]).map((t): Case => ({
            label: `Tarjeta ${hue} · ${t}`,
            theme,
            text: [c(THEME[theme][t])],
            base: THEME[theme].card,
            layers: theme === "light" ? [{ stops: [tw(`${hue}-50`), tw(`${hue}-100`, 0.5)] }] : [{ stops: [tw(`${hue}-950`, 0.2), tw(`${hue}-900`, 0.1)] }],
            size: "normal",
          }))
        )
      ),
    ] },

  // Tintes / fondos de sección con texto
  { id: "casestudies-hero", file: "src/components/organisms/CaseStudiesHero.tsx", component: "CaseStudiesHero", element: "sección from-muted/30 to-background", matches: 1, status: "checked", cases: tint("Sección", (t) => [{ stops: [c(THEME[t].muted, 0.3), c(THEME[t].bg)] }]) },
  { id: "portfolio-maint", file: "src/components/organisms/PortfolioMaintenance.tsx", component: "PortfolioMaintenance", element: "sección, h2 degradado, card", matches: 3, status: "checked",
    cases: [
      ...tint("Sección from-muted/50 via-background to-muted/30 (text-primary bold)", (t) => [{ stops: [c(THEME[t].muted, 0.5), c(THEME[t].bg), c(THEME[t].muted, 0.3)] }], { texts: FG_MUTED_PRIMARY }),
      ...themes.map((theme): Case => ({ label: "h2 from-foreground to-foreground/70", theme, text: [c(THEME[theme].fg), c(THEME[theme].fg, 0.7)], base: THEME[theme].muted, layers: [], size: "large", why: "text-4xl = 36px" })),
      ...tint("Card from-muted/50 to-background", (t) => [{ stops: [c(THEME[t].muted, 0.5), c(THEME[t].bg)] }]),
    ] },
  { id: "error-boundary", file: "src/components/organisms/ErrorBoundary.tsx", component: "ErrorBoundary", element: "pantalla from-background to-muted", matches: 1, status: "checked", cases: tint("Pantalla", (t) => [{ stops: [c(THEME[t].bg), c(THEME[t].muted)] }]) },
  { id: "experience", file: "src/components/organisms/Experience.tsx", component: "Experience", element: "línea de tiempo + scrim sobre imagen (texto fuera de la imagen)", matches: 2, status: "decorative" },
  { id: "trajectory", file: "src/components/organisms/TrajectoryRail.tsx", component: "TrajectoryRail", element: "nodo highlight (sólido) + conector degradado decorativo", matches: 1, status: "checked",
    note: "Conector from-primary/50: decorativo. Nodos highlight: bg-primary→--vn-color-cta-* (dark 3.50→5.76:1).",
    cases: solidCtaWhite("Nodo highlight · blanco sobre azul sólido", "normal", { why: "text-[10px] font-bold en círculo h-6" }) },
  { id: "section-divider-atom", file: "src/components/atoms/SectionDivider.tsx", component: "SectionDivider", element: "filete", matches: 1, status: "decorative" },
  { id: "section-divider", file: "src/components/molecules/SectionDivider.tsx", component: "SectionDivider", element: "barra", matches: 1, status: "decorative" },
  { id: "section-header", file: "src/components/molecules/SectionHeader.tsx", component: "SectionHeader", element: "filete", matches: 1, status: "decorative" },
  { id: "scroll-progress", file: "src/components/atoms/ScrollProgress.tsx", component: "ScrollProgress", element: "barra de progreso", matches: 2, status: "decorative" },
  { id: "device-mockup", file: "src/components/molecules/DeviceMockup.tsx", component: "DeviceMockup", element: "marcos de dispositivo", matches: 4, status: "decorative" },
  { id: "profile-radar", file: "src/components/molecules/ProfileRadar.tsx", component: "ProfileRadar", element: "relleno del gráfico", matches: 1, status: "decorative" },
  { id: "about-bento", file: "src/components/organisms/AboutEvidenceBento.tsx", component: "AboutEvidenceBento", element: "etiqueta text-xs sobre chip bg-background/95 (antes text-[11px] + scrim via/20)", matches: 1, status: "checked",
    note: "Antes: zona via-background/20 sobre foto oscura << 4.5:1 y 11px. Después: chip bg-background/95 + text-xs (12px).",
    cases: [
      { label: "Label sobre foto oscura (zona via/20 → chip/95)", theme: "light",
        text: [c(THEME.light.fg)], base: "#000000",
        layers: { before: [{ stops: [c(THEME.light.bg, 0.2)] }], after: [{ stops: [c(THEME.light.bg, 0.95)] }] },
        size: "normal" },
      { label: "Label sobre foto clara (zona via/20 → chip/95)", theme: "light",
        text: [c(THEME.light.fg)], base: "#ffffff",
        layers: { before: [{ stops: [c(THEME.light.bg, 0.2)] }], after: [{ stops: [c(THEME.light.bg, 0.95)] }] },
        size: "normal" },
      { label: "Label sobre foto oscura (zona via/20 → chip/95)", theme: "dark",
        text: [c(THEME.dark.fg)], base: "#000000",
        layers: { before: [{ stops: [c(THEME.dark.bg, 0.2)] }], after: [{ stops: [c(THEME.dark.bg, 0.95)] }] },
        size: "normal" },
      { label: "Label sobre foto clara (zona via/20 → chip/95)", theme: "dark",
        text: [c(THEME.dark.fg)], base: "#ffffff",
        layers: { before: [{ stops: [c(THEME.dark.bg, 0.2)] }], after: [{ stops: [c(THEME.dark.bg, 0.95)] }] },
        size: "normal" },
    ] },

  // Importaciones de Figma (artefactos de caso, no UI del sitio)
  { id: "figma-flujo", file: "src/imports/FlujoDeDiagramaUsuario.tsx", component: "FlujoDeDiagramaUsuario (caso Sura)", element: "filas verdes (App1/App3) con texto #008236/#0d542b/#016630/#0f172b; badges opacos aparte", matches: 2, status: "checked",
    cases: ["#008236", "#0d542b", "#016630", "#0f172b"].map((txt): Case => ({ label: `Fila #f0fdf4→#ecfdf5/#eff6ff · texto ${txt}`, theme: "light", text: [c(txt)], base: "#ffffff", layers: [{ stops: [c("#f0fdf4"), c("#ecfdf5"), c("#eff6ff")] }], size: "normal" })) },
  { id: "figma-sidebar", file: "src/imports/SidebarCliente-3-6340.tsx", component: "SidebarCliente (caso Karri)", element: "cabecera con GIF, sin texto", matches: 2, status: "decorative" },
  { id: "figma-paso1", file: "src/imports/Paso1.tsx", component: "Paso1 (caso Sura)", element: "vectores SVG del mockup", matches: 3, status: "decorative" },
  { id: "figma-8", file: "src/imports/8.tsx", component: "8.tsx", element: "vectores SVG", matches: 3, status: "unused" },
  { id: "figma-paso1-dup", file: "src/imports/Paso1-5-11593.tsx", component: "Paso1 (copia)", element: "vectores SVG", matches: 3, status: "unused" },
  { id: "figma-flujo-dup", file: "src/imports/FlujoDeDiagramaUsuario-5-1026.tsx", component: "FlujoDeDiagramaUsuario (copia)", element: "filas verdes", matches: 2, status: "unused" },
];

/** Casos que se revisan también en el prerender de /servicios/ y en la home. */
export const SERVICIOS_GRADIENT_ENTRIES = ["primary-cta", "how-we-work", "hero-mockup-bar", "footer-rule", "logo"];
