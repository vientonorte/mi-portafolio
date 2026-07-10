import type { Language } from "../lib/i18n";
import type { ConsultingPackageId } from "./vientonorte-consulting";

/**
 * 4 roles del hero de consultoría — fuente única para landing + Design System.
 * Campañas próximas: SEM Instagram (reels), SEO Google, SEM LinkedIn.
 */
export type HeroRoleId = "product" | "ops" | "compliance" | "founder";

export type CampaignChannelId = "ig_reels" | "seo_google" | "sem_linkedin";

export interface HeroRoleCampaignHooks {
  /** Ángulo de reel / short (IG) */
  igReels: Record<Language, string>;
  /** Intención / query cluster (SEO) */
  seoGoogle: Record<Language, string>;
  /** Hook profesional (LinkedIn SEM / organic boost) */
  semLinkedin: Record<Language, string>;
}

export interface HeroRoleDefinition {
  id: HeroRoleId;
  /** Modalidad de onboarding por defecto */
  packageId: ConsultingPackageId;
  /** Goal C1 (offline / perímetro) */
  c1Goal?: boolean;
  title: Record<Language, string>;
  /** Hint corto del path en hero */
  hint: Record<Language, string>;
  /** Problema que resuelve (DS / brief de campaña) */
  pain: Record<Language, string>;
  /** Mensaje de valor en 1 línea */
  valueProp: Record<Language, string>;
  /** Tokens / UI atoms a reutilizar en piezas de campaña */
  uiTokens: string[];
  /** Canales de campaña */
  campaigns: HeroRoleCampaignHooks;
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
    campaigns: {
      igReels: {
        es: "Hook 3s: «Onboarding que no se traba en compliance» + cut a path Producto/PM.",
        en: "3s hook: «Onboarding that doesn’t stall on compliance» + cut to Product/PM path.",
      },
      seoGoogle: {
        es: "Cluster: UX onboarding fintech Chile · progressive disclosure · Lead UX SURA",
        en: "Cluster: fintech onboarding UX · progressive disclosure · Lead UX SURA",
      },
      semLinkedin: {
        es: "Pain de PM/PO en wealth: «de brief a prototipo en 3–4 sem, sin precio genérico».",
        en: "PM/PO wealth pain: «brief to prototype in 3–4 wks, no generic public pricing».",
      },
    },
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
    campaigns: {
      igReels: {
        es: "Reel «antes/después handoff»: PDF vs tokens + DoD en repo.",
        en: "Before/after handoff reel: PDF vs tokens + DoD in repo.",
      },
      seoGoogle: {
        es: "Cluster: Design Ops handoff · design system adopción · UX process framework",
        en: "Cluster: Design Ops handoff · design system adoption · UX process framework",
      },
      semLinkedin: {
        es: "Para Head of Product / Design: «handoff medible en 4–6 sem, no slide deck».",
        en: "For Head of Product / Design: «measurable handoff in 4–6 wks, not a slide deck».",
      },
    },
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
    campaigns: {
      igReels: {
        es: "Anti-promesa en 15s: «no ChatGPT genérico con tus datos» → C1 offline.",
        en: "15s anti-promise: «no generic ChatGPT with your data» → C1 offline.",
      },
      seoGoogle: {
        es: "Cluster: Ley 21.719 UX · privacy by design Chile · offline-first tools",
        en: "Cluster: Chile data law UX · privacy by design · offline-first tools",
      },
      semLinkedin: {
        es: "Compliance + DPO: «controles UX/técnicos by design; el responsable es el cliente».",
        en: "Compliance + DPO: «UX/tech controls by design; the client remains controller».",
      },
    },
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
    campaigns: {
      igReels: {
        es: "Reel «test reclutador 10s» sobre un landing real + CTA a Radar.",
        en: "«10s recruiter test» reel on a real landing + CTA to Radar.",
      },
      seoGoogle: {
        es: "Cluster: auditoría UX express · portfolio UX Lead · consultoría UX Chile",
        en: "Cluster: express UX audit · UX Lead portfolio · UX consulting Chile",
      },
      semLinkedin: {
        es: "Founders: «diagnóstico en 5–7 días hábiles, alcance cerrado en kickoff».",
        en: "Founders: «diagnostic in 5–7 business days, scope closed at kickoff».",
      },
    },
  },
] as const;

export const CAMPAIGN_CHANNELS: {
  id: CampaignChannelId;
  label: Record<Language, string>;
  description: Record<Language, string>;
}[] = [
  {
    id: "ig_reels",
    label: { es: "SEM · Instagram Reels", en: "SEM · Instagram Reels" },
    description: {
      es: "Hooks de 3–15s, subtítulos ES, CTA a /consultoria con path prearmado.",
      en: "3–15s hooks, ES captions, CTA to /consultoria with prefilled path.",
    },
  },
  {
    id: "seo_google",
    label: { es: "SEO · Google", en: "SEO · Google" },
    description: {
      es: "Clusters por rol + schema consultoría; landing como hub de evidencia.",
      en: "Role-based clusters + consulting schema; landing as evidence hub.",
    },
  },
  {
    id: "sem_linkedin",
    label: { es: "SEM · LinkedIn", en: "SEM · LinkedIn" },
    description: {
      es: "Pain de rol (PM, Ops, Compliance, Founder) → kickoff <24 h hábiles.",
      en: "Role pain (PM, Ops, Compliance, Founder) → kickoff <24 business hours.",
    },
  },
];

export function getHeroRole(id: HeroRoleId): HeroRoleDefinition | undefined {
  return HERO_ROLES.find((r) => r.id === id);
}
