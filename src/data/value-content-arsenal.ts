import type { Language } from "../lib/i18n";
import { getPortfolioImages } from "../lib/image-overrides";
import { ROUTES } from "../lib/routes";
import { CONSULTORIA_DEMO_X_CMS } from "./consultoria-demos";
import type { ConsultingPackageId } from "./vientonorte-consulting";

/** Figma · System Design App Cliente Transvip (handoff navegable). */
export const TRANSVIP_APP_FIGMA_URL =
  "https://www.figma.com/design/AEMOE8Hv5iv1nfyR7jlMgO/System-Design-APP-Cliente---Transvip";

/** Figma · prototipo interactivo App Cliente Transvip. */
export const TRANSVIP_APP_PROTO_URL =
  "https://www.figma.com/proto/sRPhPaZNBewEhLVwu07TFu?node-id=0-1";

/** Figma · AVEM landing (Valuesite / AquiVoy Express). */
export const VALUESITE_AVEM_PROTO_URL =
  "https://www.figma.com/proto/xqCj0eIocn9cG6pbPKu6Vy/AVEM-Prototipo-Landing-Page?node-id=5-104&starting-point-node-id=5%3A104&page-id=0%3A1";

/** Figma · prototipo interactivo RIA SURA US. */
export const RIA_US_PROTO_URL =
  "https://www.figma.com/proto/MOhbYMwUtCSZ8IuJxG41ho/RIA?node-id=311-11144&starting-point-node-id=311%3A11144&page-id=311%3A11143&scaling=min-zoom&content-scaling=fixed";

export type ValueProofKind = "prototype" | "poc" | "audit" | "case";

export interface ValueProofItem {
  id: string;
  kind: ValueProofKind;
  imagePath: (images: ReturnType<typeof getPortfolioImages>) => string;
  href: string;
  external?: boolean;
  bundleId: ConsultingPackageId;
  copy: Record<
    Language,
    {
      kindLabel: string;
      title: string;
      outcome: string;
      metric?: string;
    }
  >;
}

function img(
  resolver: (images: ReturnType<typeof getPortfolioImages>) => string
): ValueProofItem["imagePath"] {
  return resolver;
}

/** Arsenal completo: demos, POCs, casos flagship, método y auditoría. */
export const VALUE_PROOF_ITEMS: ValueProofItem[] = [
  {
    id: "x-cms-demo",
    kind: "prototype",
    imagePath: img((i) => i.consultoria.xCmsDashboard),
    href: `${ROUTES.consulting}#consultoria-demo`,
    bundleId: "marco",
    copy: {
      es: {
        kindLabel: "Demo publicada",
        title: "X | CMS · Design Thinking + Sprint",
        outcome: "Caso N2N en Figma Sites — del brief al prototipo para campañas SEM/SEO.",
        metric: "N2N",
      },
      en: {
        kindLabel: "Published demo",
        title: "X | CMS · Design Thinking + Sprint",
        outcome: "N2N case on Figma Sites — from brief to prototype for SEM/SEO campaigns.",
        metric: "N2N",
      },
    },
  },
  {
    id: "ria-us",
    kind: "prototype",
    imagePath: img((i) => i.sura.riaOnboarding),
    href: RIA_US_PROTO_URL,
    external: true,
    bundleId: "marco",
    copy: {
      es: {
        kindLabel: "Prototipo interactivo",
        title: "RIA SURA Investments US",
        outcome: "Proto Figma navegable — onboarding multi-perfil, auth regulatorio y dashboard US.",
        metric: "Proto live",
      },
      en: {
        kindLabel: "Interactive prototype",
        title: "RIA SURA Investments US",
        outcome: "Navigable Figma proto — multi-profile onboarding, regulatory auth, and US dashboard.",
        metric: "Live proto",
      },
    },
  },
  {
    id: "ria-celula-evolutiva",
    kind: "case",
    imagePath: img((i) => i.sura.celulaEvolutivaFlow),
    href: ROUTES.project("sura-ria-us"),
    bundleId: "ops",
    copy: {
      es: {
        kindLabel: "Proceso de equipo",
        title: "Célula Evolutiva · RIA",
        outcome: "Flujo end-to-end documentado — pre-planning, refinamiento, dev/QA y showcase.",
        metric: "6 etapas",
      },
      en: {
        kindLabel: "Team process",
        title: "Evolutionary Cell · RIA",
        outcome: "Documented end-to-end flow — pre-planning, refinement, dev/QA, and showcase.",
        metric: "6 stages",
      },
    },
  },
  {
    id: "poc-ia-dei",
    kind: "poc",
    imagePath: img((i) => i.sura.iaAutomationDashboard),
    href: "https://badge-sweet-21070688.figma.site",
    external: true,
    bundleId: "ops",
    copy: {
      es: {
        kindLabel: "POC con IA",
        title: "DEI Dashboard · análisis automatizado",
        outcome: "POC navegable en Figma Sites — PDF local, análisis DEI y estados de confianza.",
        metric: "POC live",
      },
      en: {
        kindLabel: "AI POC",
        title: "DEI Dashboard · automated analysis",
        outcome: "Navigable Figma Sites POC — local PDF, DEI analysis, and confidence states.",
        metric: "Live POC",
      },
    },
  },
  {
    id: "sura-inversiones-dashboard",
    kind: "prototype",
    imagePath: img((i) => i.sura.riaOnboarding),
    href: ROUTES.project("sura-inversiones-dashboard"),
    bundleId: "marco",
    copy: {
      es: {
        kindLabel: "Dashboard fintech",
        title: "Plataforma de inversiones SURA",
        outcome: "Progressive disclosure, IA reestructurada y testing retail/institucional.",
        metric: "NPS 72",
      },
      en: {
        kindLabel: "Fintech dashboard",
        title: "SURA investments platform",
        outcome: "Progressive disclosure, restructured IA, and retail/institutional testing.",
        metric: "NPS 72",
      },
    },
  },
  {
    id: "ecosistema-sura",
    kind: "case",
    imagePath: img((i) => i.sura.benchmarkNavigation),
    href: ROUTES.project("sura-ecosistema-digital"),
    bundleId: "marco",
    copy: {
      es: {
        kindLabel: "Caso en producción",
        title: "Ecosistema digital SURA",
        outcome: "+20 sitios unificados, CMS, Design System y funnel «Hazte cliente».",
        metric: "−40% abandono",
      },
      en: {
        kindLabel: "Production case",
        title: "SURA digital ecosystem",
        outcome: "20+ unified sites, CMS, Design System, and client onboarding funnel.",
        metric: "−40% drop-off",
      },
    },
  },
  {
    id: "sura-ux-enterprise",
    kind: "case",
    imagePath: img((i) => i.sura.uxProcess),
    href: ROUTES.project("sura-ux-enterprise"),
    bundleId: "ops",
    copy: {
      es: {
        kindLabel: "UX Enterprise",
        title: "Implementación regional SURA",
        outcome: "Design Thinking escalable en 5+ países — lineamientos UX/UI y governance.",
        metric: "5+ países",
      },
      en: {
        kindLabel: "UX Enterprise",
        title: "SURA regional rollout",
        outcome: "Scalable Design Thinking across 5+ countries — UX/UI guidelines and governance.",
        metric: "5+ countries",
      },
    },
  },
  {
    id: "autosuggest",
    kind: "case",
    imagePath: img((i) => i.sura.webPrototype),
    href: "/proyectos/autosuggest-fondos",
    bundleId: "ops",
    copy: {
      es: {
        kindLabel: "Flujo fintech",
        title: "Autosuggest de fondos",
        outcome: "Búsqueda semántica y progressive disclosure en plataforma de inversiones.",
        metric: "Compliance",
      },
      en: {
        kindLabel: "Fintech flow",
        title: "Fund autosuggest",
        outcome: "Semantic search and progressive disclosure on the investments platform.",
        metric: "Compliance",
      },
    },
  },
  {
    id: "transvip-app-premium",
    kind: "case",
    imagePath: img((i) => i.transvip.appDesktop),
    href: ROUTES.project("transvip-app-premium"),
    bundleId: "marco",
    copy: {
      es: {
        kindLabel: "Mobility premium",
        title: "App pasajeros Transvip",
        outcome: "Design system + discovery activo en reserva premium.",
        metric: "NPS 82",
      },
      en: {
        kindLabel: "Premium mobility",
        title: "Transvip passenger app",
        outcome: "Design system + active discovery on premium booking.",
        metric: "NPS 82",
      },
    },
  },
  {
    id: "transvip-mobile",
    kind: "prototype",
    imagePath: img((i) => i.transvip.appMobile),
    href: TRANSVIP_APP_PROTO_URL,
    external: true,
    bundleId: "marco",
    copy: {
      es: {
        kindLabel: "Prototipo interactivo",
        title: "Reserva premium · mobile-first",
        outcome: "Proto navegable en Figma — flujos de reserva −40% tiempo y +25% conversión.",
        metric: "Proto live",
      },
      en: {
        kindLabel: "Interactive prototype",
        title: "Premium booking · mobile-first",
        outcome: "Navigable Figma proto — booking flows −40% time and +25% conversion.",
        metric: "Live proto",
      },
    },
  },
  {
    id: "transvip-design-system",
    kind: "prototype",
    imagePath: img((i) => i.transvip.figmaPrototype),
    href: TRANSVIP_APP_FIGMA_URL,
    external: true,
    bundleId: "marco",
    copy: {
      es: {
        kindLabel: "Design System",
        title: "System Design · App Cliente Transvip",
        outcome: "Figma navegable — componentes, patrones y handoff listo para desarrollo.",
        metric: "Figma live",
      },
      en: {
        kindLabel: "Design System",
        title: "System Design · Transvip Client App",
        outcome: "Navigable Figma — components, patterns, and dev-ready handoff.",
        metric: "Live Figma",
      },
    },
  },
  {
    id: "valuesite-avem-landing",
    kind: "prototype",
    imagePath: img((i) => i.sura.onboardingFlags),
    href: VALUESITE_AVEM_PROTO_URL,
    external: true,
    bundleId: "marco",
    copy: {
      es: {
        kindLabel: "Prototipo interactivo",
        title: "AVEM · Landing Page",
        outcome: "Proto Figma navegable — Valuesite, AquiVoy Express y KIT UI bajo design system.",
        metric: "Proto live",
      },
      en: {
        kindLabel: "Interactive prototype",
        title: "AVEM · Landing Page",
        outcome: "Navigable Figma proto — Valuesite, AquiVoy Express, and KIT UI design system.",
        metric: "Live proto",
      },
    },
  },
  {
    id: "karri-calculadora",
    kind: "prototype",
    imagePath: img((i) => i.karri.boosmapBenchmark),
    href: ROUTES.project("karri-calculadora"),
    bundleId: "marco",
    copy: {
      es: {
        kindLabel: "Simulador interactivo",
        title: "Calculadora de ganancias Karri",
        outcome: "Benchmark BOOSMAP/ZUBALE — 92% comprensión en testing con shoppers.",
        metric: "+35% activación",
      },
      en: {
        kindLabel: "Interactive simulator",
        title: "Karri earnings calculator",
        outcome: "BOOSMAP/ZUBALE benchmark — 92% comprehension in shopper testing.",
        metric: "+35% activation",
      },
    },
  },
  {
    id: "karri-notificaciones",
    kind: "case",
    imagePath: img((i) => i.karri.deliveryBrand),
    href: ROUTES.project("karri-notificaciones"),
    bundleId: "ops",
    copy: {
      es: {
        kindLabel: "Hub shoppers",
        title: "Centro de notificaciones Karri",
        outcome: "Hub unificado y onboarding simplificado — avisos críticos visibles.",
        metric: "+58% engagement",
      },
      en: {
        kindLabel: "Shopper hub",
        title: "Karri notification center",
        outcome: "Unified hub and simplified onboarding — critical alerts surfaced.",
        metric: "+58% engagement",
      },
    },
  },
  {
    id: "karri-design-sprint",
    kind: "case",
    imagePath: img((i) => i.karri.okrsBoard),
    href: ROUTES.project("karri-design-sprint"),
    bundleId: "ops",
    copy: {
      es: {
        kindLabel: "Design Sprint",
        title: "Workshop estrategia de producto",
        outcome: "Journey map 24 touchpoints, OKRs y 3 MVPs priorizados en 3 sesiones.",
        metric: "3 MVPs",
      },
      en: {
        kindLabel: "Design Sprint",
        title: "Product strategy workshop",
        outcome: "24-touchpoint journey map, OKRs, and 3 prioritized MVPs in 3 sessions.",
        metric: "3 MVPs",
      },
    },
  },
  {
    id: "proceso-ux",
    kind: "case",
    imagePath: img((i) => i.framework.uxValueChain),
    href: ROUTES.process,
    bundleId: "ops",
    copy: {
      es: {
        kindLabel: "Método documentado",
        title: "5 macroprocesos UX",
        outcome: "Framework aplicado en fintech y mobility — de analytics a refinamiento.",
        metric: "5 fases",
      },
      en: {
        kindLabel: "Documented method",
        title: "5 UX macro-processes",
        outcome: "Framework applied in fintech and mobility — from analytics to refinement.",
        metric: "5 phases",
      },
    },
  },
  {
    id: "design-system",
    kind: "prototype",
    imagePath: img((i) => i.sura.componentPipeline),
    href: ROUTES.designSystem,
    bundleId: "marco",
    copy: {
      es: {
        kindLabel: "Design System",
        title: "Tokens, componentes y patrones",
        outcome: "Sistema vivo del portafolio — accesible, documentado y listo para handoff.",
        metric: "WCAG AA",
      },
      en: {
        kindLabel: "Design System",
        title: "Tokens, components, and patterns",
        outcome: "Living portfolio system — accessible, documented, and handoff-ready.",
        metric: "WCAG AA",
      },
    },
  },
  {
    id: "uxtools-suite",
    kind: "poc",
    imagePath: img((i) => i.framework.uxValueChain),
    href: "https://vientonorte.github.io/uxtools/",
    external: true,
    bundleId: "radar",
    copy: {
      es: {
        kindLabel: "Herramienta UX",
        title: "UX Tools Suite",
        outcome: "Utilidades open para auditoría rápida, contraste y checklist de entregables.",
        metric: "Open tools",
      },
      en: {
        kindLabel: "UX tool",
        title: "UX Tools Suite",
        outcome: "Open utilities for quick audits, contrast checks, and deliverable checklists.",
        metric: "Open tools",
      },
    },
  },
  {
    id: "sura-ia-case",
    kind: "poc",
    imagePath: img((i) => i.sura.iaAutomationDashboard),
    href: ROUTES.project("sura-ia-automation-dashboard"),
    bundleId: "ops",
    copy: {
      es: {
        kindLabel: "Caso + POC",
        title: "Automatización con IA · estudio",
        outcome: "Documentación del POC DEI: flujos, métricas y link al sitio navegable.",
        metric: "Case study",
      },
      en: {
        kindLabel: "Case + POC",
        title: "AI automation · case study",
        outcome: "DEI POC documentation: flows, metrics, and link to the live site.",
        metric: "Case study",
      },
    },
  },
  {
    id: "auditoria-ejemplo",
    kind: "audit",
    imagePath: img((i) => i.sura.analyticsGa4),
    href: ROUTES.audit,
    bundleId: "radar",
    copy: {
      es: {
        kindLabel: "Auditoría UX",
        title: "Portfolio audit · evidencia WCAG",
        outcome: "Heurísticas Nielsen, contraste AA, FigJam de ejemplo y plan P0–P2.",
        metric: "WCAG 2.2",
      },
      en: {
        kindLabel: "UX audit",
        title: "Portfolio audit · WCAG evidence",
        outcome: "Nielsen heuristics, AA contrast, sample FigJam, and P0–P2 plan.",
        metric: "WCAG 2.2",
      },
    },
  },
  {
    id: "figjam-audit-board",
    kind: "audit",
    imagePath: img((i) => i.sura.hotjarDashboard),
    href: "https://www.figma.com/board/lEGDG3EDlNI3OOUCucTyyx/PORTAFOLIO?node-id=2-41",
    external: true,
    bundleId: "radar",
    copy: {
      es: {
        kindLabel: "FigJam interactivo",
        title: "Tablero de auditoría portfolio",
        outcome: "Análisis heurístico navegable — hallazgos, priorización y quick wins.",
        metric: "FigJam live",
      },
      en: {
        kindLabel: "Interactive FigJam",
        title: "Portfolio audit board",
        outcome: "Navigable heuristic analysis — findings, prioritization, and quick wins.",
        metric: "Live FigJam",
      },
    },
  },
  {
    id: "consultoria-arbol",
    kind: "prototype",
    imagePath: img((i) => i.framework.uxValueChain),
    href: `${ROUTES.consulting}#arbol`,
    bundleId: "radar",
    copy: {
      es: {
        kindLabel: "Herramienta interactiva",
        title: "Árbol de decisión consultoría",
        outcome: "3 rutas según necesidad — portfolio, producto o equipo — con modalidad recomendada.",
        metric: "3 rutas",
      },
      en: {
        kindLabel: "Interactive tool",
        title: "Consulting decision tree",
        outcome: "3 paths by need — portfolio, product, or team — with a recommended format.",
        metric: "3 paths",
      },
    },
  },
  {
    id: "ux-analytics",
    kind: "case",
    imagePath: img((i) => i.sura.analyticsGa4),
    href: ROUTES.processPhase("ux-analytics"),
    bundleId: "radar",
    copy: {
      es: {
        kindLabel: "Método documentado",
        title: "UX Analytics · taxonomía",
        outcome: "Cuantitativo, cualitativo, etnográfico y asistido por IA — categorías y subcategorías.",
        metric: "4 familias",
      },
      en: {
        kindLabel: "Documented method",
        title: "UX Analytics · taxonomy",
        outcome: "Quantitative, qualitative, ethnographic, and AI-assisted — categories and subcategories.",
        metric: "4 families",
      },
    },
  },
  {
    id: "transvip-product-vision",
    kind: "case",
    imagePath: img((i) => i.transvip.productVision),
    href: ROUTES.project("transvip-app-premium"),
    bundleId: "marco",
    copy: {
      es: {
        kindLabel: "Estrategia de producto",
        title: "Visión premium Transvip",
        outcome: "Product vision y discovery activo — alineación stakeholders antes del design system.",
        metric: "Mobility",
      },
      en: {
        kindLabel: "Product strategy",
        title: "Transvip premium vision",
        outcome: "Product vision and active discovery — stakeholder alignment before the design system.",
        metric: "Mobility",
      },
    },
  },
  {
    id: "sura-booking-flow",
    kind: "prototype",
    imagePath: img((i) => i.sura.onboardingFlags),
    href: ROUTES.project("sura-ecosistema-digital"),
    bundleId: "ops",
    copy: {
      es: {
        kindLabel: "Flujo documentado",
        title: "Funnel «Hazte cliente» SURA",
        outcome: "Flowchart de reserva y onboarding — −40% abandono en ecosistema unificado.",
        metric: "−40% abandono",
      },
      en: {
        kindLabel: "Documented flow",
        title: "SURA «Become a client» funnel",
        outcome: "Booking and onboarding flowchart — −40% drop-off in the unified ecosystem.",
        metric: "−40% drop-off",
      },
    },
  },
];

export const VALUE_PROOF_EXTERNAL_URLS: Record<string, string> = {
  "x-cms-demo": CONSULTORIA_DEMO_X_CMS.figmaSitesUrl,
  "ria-us": RIA_US_PROTO_URL,
  "poc-ia-dei": "https://badge-sweet-21070688.figma.site",
  "transvip-mobile": TRANSVIP_APP_PROTO_URL,
  "transvip-design-system": TRANSVIP_APP_FIGMA_URL,
  "valuesite-avem-landing": VALUESITE_AVEM_PROTO_URL,
  "figjam-audit-board":
    "https://www.figma.com/board/lEGDG3EDlNI3OOUCucTyyx/PORTAFOLIO?node-id=2-41",
};

export function getValueProofItems(language: Language) {
  const images = getPortfolioImages();
  return VALUE_PROOF_ITEMS.map((item) => ({
    ...item,
    image: item.imagePath(images),
    ...item.copy[language],
  }));
}