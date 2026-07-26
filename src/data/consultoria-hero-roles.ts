import type { Language } from "../lib/i18n";
import type { ConsultingPackageId } from "./vientonorte-consulting";

/**
 * 4 CTAs del hero = oferta (servicio/producto), no “quién eres”.
 * Deep links UTM-ready. Copy de ads no vive aquí.
 */
export type HeroRoleId = "diagnostic" | "prototype" | "process" | "app";

export interface HeroRoleDefinition {
  id: HeroRoleId;
  /** Modalidad de onboarding por defecto */
  packageId: ConsultingPackageId;
  /** Datos sensibles / entorno privado (legacy C1) */
  c1Goal?: boolean;
  /**
   * App funcional: diseño VN + implementación con red (externalizado).
   * Prefill de goal en onboarding.
   */
  appGoal?: boolean;
  title: Record<Language, string>;
  /** Hint = qué te llevas (producto) · corto */
  hint: Record<Language, string>;
  pain: Record<Language, string>;
  valueProp: Record<Language, string>;
  uiTokens: string[];
  deepLinkQuery: string;
}

export const HERO_ROLES: readonly HeroRoleDefinition[] = [
  {
    id: "diagnostic",
    packageId: "radar",
    title: {
      es: "Diagnóstico",
      en: "Diagnostic",
    },
    hint: {
      es: "Informe + plan · 5–7 días",
      en: "Report + plan · 5–7 days",
    },
    pain: {
      es: "No sabes qué arreglar primero en el producto o sitio.",
      en: "You don’t know what to fix first on the product or site.",
    },
    valueProp: {
      es: "Diagnóstico y mejoras prioritarias (pack Radar). Entrada gratis: un flujo accesible.",
      en: "Diagnostic and priority fixes (Radar pack). Free entry: one accessible flow.",
    },
    uiTokens: ["Badge outline", "path card", "Primary CTA"],
    deepLinkQuery: "role=diagnostic&package=radar",
  },
  {
    id: "prototype",
    packageId: "marco",
    title: {
      es: "Prototipo",
      en: "Prototype",
    },
    hint: {
      es: "Pantallas listas para construir",
      en: "Screens ready to build",
    },
    pain: {
      es: "Hay ideas, pero no un prototipo claro para validar o construir.",
      en: "Ideas exist, but no clear prototype to validate or build.",
    },
    valueProp: {
      es: "Marco: del brief al prototipo y entrega a desarrollo.",
      en: "Marco: brief to prototype and handoff to development.",
    },
    uiTokens: ["surface-matte-elevated", "SectionHeader", "brand-gradient"],
    deepLinkQuery: "role=prototype&package=marco",
  },
  {
    id: "process",
    packageId: "ops",
    title: {
      es: "Proceso de equipo",
      en: "Team process",
    },
    hint: {
      es: "Guía de cómo diseñan y entregan",
      en: "How the team designs and delivers",
    },
    pain: {
      es: "El equipo diseña sin proceso claro ni forma de medir.",
      en: "The team designs without a clear process or measures.",
    },
    valueProp: {
      es: "Ops: proceso de trabajo, talleres y adopción.",
      en: "Ops: working process, workshops, and adoption.",
    },
    uiTokens: ["logo-surface", "4px spacing", "LiquidNavCta"],
    deepLinkQuery: "role=process&package=ops",
  },
  {
    id: "app",
    packageId: "marco",
    appGoal: true,
    title: {
      es: "App de punta a punta",
      en: "App end to end",
    },
    hint: {
      es: "Idea → app en uso",
      en: "Idea → live app",
    },
    pain: {
      es: "Necesitas una app en uso, no solo pantallas.",
      en: "You need a live app, not just screens.",
    },
    valueProp: {
      es: "De la idea a la app en uso: experiencia, diseño y desarrollo con Viento Norte.",
      en: "From idea to a live app: experience, design, and development with Viento Norte.",
    },
    uiTokens: ["primary CTA", "trust chips", "focus rings"],
    deepLinkQuery: "role=app&package=marco&app=1",
  },
] as const;

/**
 * Checklist de código para campañas (sin plan de medios).
 */
export const CAMPAIGN_CODE_CHECKLIST: readonly {
  id: string;
  label: Record<Language, string>;
  codeHint: string;
}[] = [
  {
    id: "role-ids",
    label: {
      es: "IDs de oferta estables (diagnostic | prototype | process | app)",
      en: "Stable offer IDs (diagnostic | prototype | process | app)",
    },
    codeHint: "HERO_ROLES[].id",
  },
  {
    id: "package-map",
    label: {
      es: "Mapa oferta → packageId / appGoal / c1Goal",
      en: "Offer → packageId / appGoal / c1Goal map",
    },
    codeHint: "packageId + appGoal + c1Goal",
  },
  {
    id: "deep-link",
    label: {
      es: "Deep link query por oferta (UTM listo)",
      en: "Per-offer deep link query (UTM-ready)",
    },
    codeHint: "?role=&package=&app=",
  },
  {
    id: "scroll-section",
    label: {
      es: "Scroll a sección con offset de header",
      en: "Scroll to section with header offset",
    },
    codeHint: "scrollToSection / ScrollManager",
  },
  {
    id: "seo-meta",
    label: {
      es: "SEOHead + canonical por ruta",
      en: "SEOHead + per-route canonical",
    },
    codeHint: "SEOHead / canonicalFromPath",
  },
  {
    id: "structured-data",
    label: {
      es: "JSON-LD tras i18n cargado",
      en: "JSON-LD after i18n load",
    },
    codeHint: "buildPortfolioStructuredData",
  },
  {
    id: "a11y-cta",
    label: {
      es: "CTA ≥ 44px, contraste AA",
      en: "CTA ≥ 44px, AA contrast",
    },
    codeHint: "NavTabItem / LiquidNavCta",
  },
  {
    id: "i18n-atomic",
    label: {
      es: "Swap ES↔EN atómico",
      en: "Atomic ES↔EN swap",
    },
    codeHint: "LanguageProvider locale state",
  },
  {
    id: "tokens-export",
    label: {
      es: "Export tokens para piezas creativas",
      en: "Token export for creatives",
    },
    codeHint: "design-tokens-export",
  },
  {
    id: "single-source",
    label: {
      es: "Una sola fuente de CTAs de oferta (no 5º path sin data)",
      en: "Single offer CTA source (no 5th path without data)",
    },
    codeHint: "consultoria-hero-roles.ts",
  },
] as const;

export function getHeroRole(id: HeroRoleId): HeroRoleDefinition | undefined {
  return HERO_ROLES.find((r) => r.id === id);
}
