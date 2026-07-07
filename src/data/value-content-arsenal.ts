import type { Language } from "../lib/i18n";
import { getPortfolioImages } from "../lib/image-overrides";
import { ROUTES } from "../lib/routes";
import { CONSULTORIA_DEMO_X_CMS } from "./consultoria-demos";
import type { ConsultingPackageId } from "./vientonorte-consulting";

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

export const VALUE_PROOF_ITEMS: ValueProofItem[] = [
  {
    id: "ria-us",
    kind: "prototype",
    imagePath: img((i) => i.sura.riaOnboarding),
    href: ROUTES.project("sura-ria-us"),
    bundleId: "marco",
    copy: {
      es: {
        kindLabel: "Prototipo interactivo",
        title: "RIA SURA Investments US",
        outcome: "8 prototipos navegables · onboarding multi-perfil y auth regulatorio.",
        metric: "−40% tiempo",
      },
      en: {
        kindLabel: "Interactive prototype",
        title: "RIA SURA Investments US",
        outcome: "8 navigable prototypes · multi-profile onboarding and regulatory auth.",
        metric: "−40% time",
      },
    },
  },
  {
    id: "x-cms-demo",
    kind: "prototype",
    imagePath: img((i) => i.sura.webPrototype),
    href: `${ROUTES.consulting}#consultoria-demo`,
    external: false,
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
        outcome: "POC navegable en Figma Sites — métricas operativas y orquestación enterprise.",
        metric: "POC live",
      },
      en: {
        kindLabel: "AI POC",
        title: "DEI Dashboard · automated analysis",
        outcome: "Navigable POC on Figma Sites — operational metrics and enterprise orchestration.",
        metric: "Live POC",
      },
    },
  },
  {
    id: "ecosistema-sura",
    kind: "case",
    imagePath: img((i) => i.sura.analyticsGa4),
    href: ROUTES.project("sura-ecosistema-digital"),
    bundleId: "marco",
    copy: {
      es: {
        kindLabel: "Caso en producción",
        title: "Ecosistema digital SURA",
        outcome: "Analytics de funnel, 6 errores documentados y reducción de abandono en onboarding.",
        metric: "−40% abandono",
      },
      en: {
        kindLabel: "Production case",
        title: "SURA digital ecosystem",
        outcome: "Funnel analytics, 6 documented errors, and reduced onboarding drop-off.",
        metric: "−40% drop-off",
      },
    },
  },
  {
    id: "autosuggest",
    kind: "case",
    imagePath: img((i) => i.sura.benchmarkNavigation),
    href: "/proyectos/autosuggest-fondos",
    bundleId: "ops",
    copy: {
      es: {
        kindLabel: "Flujo fintech",
        title: "Autosuggest de fondos",
        outcome: "Progressive disclosure y búsqueda semántica en plataforma de inversiones.",
        metric: "Fintech",
      },
      en: {
        kindLabel: "Fintech flow",
        title: "Fund autosuggest",
        outcome: "Progressive disclosure and semantic search on the investments platform.",
        metric: "Fintech",
      },
    },
  },
  {
    id: "auditoria-ejemplo",
    kind: "audit",
    imagePath: img((i) => i.sura.hotjarDashboard),
    href: ROUTES.audit,
    bundleId: "radar",
    copy: {
      es: {
        kindLabel: "Auditoría UX",
        title: "Portfolio audit · evidencia WCAG",
        outcome: "Heurísticas Nielsen, contraste AA y plan P0–P2 listo para ejecutar.",
        metric: "WCAG 2.2",
      },
      en: {
        kindLabel: "UX audit",
        title: "Portfolio audit · WCAG evidence",
        outcome: "Nielsen heuristics, AA contrast, and P0–P2 plan ready to execute.",
        metric: "WCAG 2.2",
      },
    },
  },
];

export const VALUE_PROOF_EXTERNAL_URLS: Record<string, string> = {
  "x-cms-demo": CONSULTORIA_DEMO_X_CMS.figmaSitesUrl,
};

export function getValueProofItems(language: Language) {
  const images = getPortfolioImages();
  return VALUE_PROOF_ITEMS.map((item) => ({
    ...item,
    image: item.imagePath(images),
    ...item.copy[language],
  }));
}