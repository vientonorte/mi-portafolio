import type { Language } from "../lib/i18n";
import type { ConsultingPackageId } from "./vientonorte-consulting";

/**
 * 4 roles del hero de consultoría — fuente única para landing + Design System.
 * Los planes de campaña (copy SEM/SEO) no se exponen en UI; solo checklist
 * de código optimizado para activar campañas sin reescribir el sistema.
 */
export type HeroRoleId = "product" | "ops" | "compliance" | "founder";

export interface HeroRoleDefinition {
  id: HeroRoleId;
  /** Modalidad de onboarding por defecto */
  packageId: ConsultingPackageId;
  /** Goal C1 (offline / perímetro) */
  c1Goal?: boolean;
  title: Record<Language, string>;
  /** Hint corto del path en hero */
  hint: Record<Language, string>;
  /** Problema que resuelve (interno / DS técnico) */
  pain: Record<Language, string>;
  /** Mensaje de valor en 1 línea (producto, no ad copy) */
  valueProp: Record<Language, string>;
  /** Tokens / UI atoms del path */
  uiTokens: string[];
  /** Query / deep-link listo para UTM (código, no plan de medios) */
  deepLinkQuery: string;
}

export const HERO_ROLES: readonly HeroRoleDefinition[] = [
  {
    id: "product",
    packageId: "marco",
    title: {
      es: "Producto / PM",
      en: "Product / PM",
    },
    hint: {
      es: "Roadmap y onboarding regulado",
      en: "Roadmap and regulated onboarding",
    },
    pain: {
      es: "Roadmap, conversión y onboarding con fricción legal o de cumplimiento.",
      en: "Roadmap, conversion, and onboarding blocked by legal or compliance friction.",
    },
    valueProp: {
      es: "Estrategia guiada N2N: brief → prototipo con criterios de aceptación UX.",
      en: "Guided N2N strategy: brief → prototype with UX acceptance criteria.",
    },
    uiTokens: [
      "primary CTA brand-gradient",
      "surface-matte-elevated",
      "Badge outline",
      "SectionHeader",
    ],
    deepLinkQuery: "role=product&package=marco",
  },
  {
    id: "ops",
    packageId: "ops",
    title: {
      es: "Design Ops",
      en: "Design Ops",
    },
    hint: {
      es: "Handoff y proceso de equipo",
      en: "Handoff and team process",
    },
    pain: {
      es: "Handoff irregular, design system sin adopción y proceso UX no medible.",
      en: "Uneven handoff, low DS adoption, and UX process without metrics.",
    },
    valueProp: {
      es: "Proceso de equipo: 5 macroprocesos, workshops y métricas de adopción.",
      en: "Team process: 5 macro-processes, workshops, and adoption metrics.",
    },
    uiTokens: [
      "logo-surface",
      "4px / 8pt spacing",
      "atomic 70-20-10",
      "LiquidNavCta / dock glass",
    ],
    deepLinkQuery: "role=ops&package=ops",
  },
  {
    id: "compliance",
    packageId: "marco",
    c1Goal: true,
    title: {
      es: "Datos y perímetro",
      en: "Data / perimeter",
    },
    hint: {
      es: "Offline · GitHub · 21.719",
      en: "Offline · GitHub · 21.719",
    },
    pain: {
      es: "IA en la nube con PII, sin perímetro ni checklist Ley 21.719 / WCAG.",
      en: "Cloud AI with PII, no perimeter or Act 21.719 / WCAG checklist.",
    },
    valueProp: {
      es: "C1 private tooling: offline-first, GitHub private, IA gobernada, 21.719 by design.",
      en: "C1 private tooling: offline-first, private GitHub, governed AI, 21.719 by design.",
    },
    uiTokens: [
      "trust chips",
      "Badge mono uppercase",
      "border logo-surface",
      "WCAG focus rings",
    ],
    deepLinkQuery: "role=compliance&package=marco&c1=1",
  },
  {
    id: "founder",
    packageId: "radar",
    title: {
      es: "Fundador / startup",
      en: "Founder / startup",
    },
    hint: {
      es: "Diagnóstico y quick wins",
      en: "Diagnostic and quick wins",
    },
    pain: {
      es: "Landing o producto sin narrativa en 10s ni quick wins priorizados.",
      en: "Landing or product without a 10s narrative or prioritized quick wins.",
    },
    valueProp: {
      es: "Diagnóstico express 5–7 días: heurísticas, contraste AA y quick wins.",
      en: "Express diagnostic 5–7 days: heuristics, AA contrast, and quick wins.",
    },
    uiTokens: [
      "hero title + accent gradient",
      "path card 2×2",
      "Primary CTA only",
      "text-brand-gradient",
    ],
    deepLinkQuery: "role=founder&package=radar",
  },
] as const;

/**
 * Checklist de **código** optimizado para campañas (no plan de medios, no copy ads).
 * Visible en DS como criterios de implementación.
 */
export const CAMPAIGN_CODE_CHECKLIST: readonly {
  id: string;
  label: Record<Language, string>;
  codeHint: string;
}[] = [
  {
    id: "role-ids",
    label: {
      es: "IDs de rol estables (product | ops | compliance | founder)",
      en: "Stable role IDs (product | ops | compliance | founder)",
    },
    codeHint: "HERO_ROLES[].id",
  },
  {
    id: "package-map",
    label: {
      es: "Mapa rol → packageId / c1Goal (onboarding sin re-elegir)",
      en: "Role → packageId / c1Goal map (onboarding without re-pick)",
    },
    codeHint: "packageId + c1Goal",
  },
  {
    id: "deep-link",
    label: {
      es: "Deep link query por rol (UTM listo en landing)",
      en: "Per-role deep link query (UTM-ready on landing)",
    },
    codeHint: "?role=&package=&c1=",
  },
  {
    id: "scroll-section",
    label: {
      es: "Scroll a inicio de sección con offset de header",
      en: "Scroll to section start with header offset",
    },
    codeHint: "scrollToSection / ScrollManager",
  },
  {
    id: "seo-meta",
    label: {
      es: "SEOHead + canonical por ruta (sin copy de campaña en DS)",
      en: "SEOHead + per-route canonical (no ad copy in DS)",
    },
    codeHint: "SEOHead / canonicalFromPath",
  },
  {
    id: "structured-data",
    label: {
      es: "JSON-LD Person/WebSite tras i18n cargado",
      en: "Person/WebSite JSON-LD after i18n load",
    },
    codeHint: "buildPortfolioStructuredData",
  },
  {
    id: "a11y-cta",
    label: {
      es: "CTA ≥ 44px, aria-current en nav, contraste AA",
      en: "CTA ≥ 44px, nav aria-current, AA contrast",
    },
    codeHint: "NavTabItem / LiquidNavCta",
  },
  {
    id: "i18n-atomic",
    label: {
      es: "Swap ES↔EN atómico (sin carrera al toglear)",
      en: "Atomic ES↔EN swap (no race on toggle)",
    },
    codeHint: "LanguageProvider locale state",
  },
  {
    id: "tokens-export",
    label: {
      es: "Export Tokens Studio / W3C / CSS para piezas creativas",
      en: "Tokens Studio / W3C / CSS export for creatives",
    },
    codeHint: "design-tokens-export",
  },
  {
    id: "single-source",
    label: {
      es: "Una sola fuente de roles (no inventar 5º path sin data)",
      en: "Single role source (no 5th path without data)",
    },
    codeHint: "consultoria-hero-roles.ts",
  },
] as const;

export function getHeroRole(id: HeroRoleId): HeroRoleDefinition | undefined {
  return HERO_ROLES.find((r) => r.id === id);
}
