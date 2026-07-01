import { getPortfolioImages } from "../lib/image-overrides";
import type { Language } from "../lib/i18n";
import { getProjectHeadlineMetrics } from "../lib/project-metrics";

export interface CaseStudyCardData {
  id: string;
  title: string;
  company: string;
  description: string;
  image: string;
  tags: string[];
  metrics: Array<{ label: string; value: string }>;
}

/** Casos destacados para grid visual en /proyectos */
export function getFeaturedCaseStudies(language: Language = "es"): CaseStudyCardData[] {
  const portfolioImages = getPortfolioImages();
  const cards: Omit<CaseStudyCardData, "metrics">[] = [
  {
    id: "sura-ux-enterprise",
    title: "Implementación UX Enterprise Regional",
    company: "SURA Investments",
    description:
      "Framework de Design Thinking adaptado para iniciativas tecnológicas regionales: lineamientos UX/UI escalables en 5+ países.",
    image: portfolioImages.sura.uxProcess,
    tags: ["Fintech", "Enterprise", "Design Thinking", "Regional"],
  },
  {
    id: "sura-ria-us",
    title: "Diseño UX UI RIA SURA US",
    company: "SURA Investments",
    description:
      "Plataforma RIA end-to-end para el mercado estadounidense: onboarding multi-perfil, autenticación y dashboard de inversiones.",
    image: portfolioImages.sura.riaOnboarding,
    tags: ["Fintech", "RIA", "Onboarding", "US Market"],
  },
  {
    id: "sura-inversiones-dashboard",
    title: "Plataforma de Inversiones",
    company: "SURA Investments",
    description:
      "Dashboard de inversiones con progressive disclosure, IA reestructurada y testing con usuarios retail e institucionales.",
    image: portfolioImages.sura.webPrototype,
    tags: ["Fintech", "Dashboard", "Research"],
  },
  {
    id: "sura-ecosistema-digital",
    title: "Ecosistema Digital & Onboarding",
    company: "SURA Investments",
    description:
      "Unificación de +20 sitios públicos con CMS, Design System y flujo 'Hazte cliente' con manejo de errores.",
    image: portfolioImages.sura.benchmarkNavigation,
    tags: ["CMS", "Design System", "Onboarding"],
  },
  {
    id: "transvip-app-premium",
    title: "App Pasajeros Premium",
    company: "Transvip",
    description:
      "Rediseño del flujo de reserva ejecutiva con selección de vehículo, fechas y reducción de fricción.",
    image: portfolioImages.transvip.appDesktop,
    tags: ["Mobility", "Premium", "Mobile"],
  },
  {
    id: "karri-calculadora",
    title: "Calculadora de Ganancias",
    company: "Karri",
    description:
      "Simulador de ingresos con benchmark BOOSMAP/ZUBALE para transparencia del modelo de ganancias.",
    image: portfolioImages.karri.boosmapBenchmark,
    tags: ["Shoppers", "Benchmark", "Mobile"],
  },
  {
    id: "karri-notificaciones",
    title: "Hub de Notificaciones",
    company: "Karri",
    description:
      "Centro unificado de notificaciones y onboarding simplificado para shoppers.",
    image: portfolioImages.karri.deliveryBrand,
    tags: ["Notifications", "Onboarding", "IA"],
  },
  {
    id: "karri-design-sprint",
    title: "Workshop Estrategia de Producto",
    company: "Karri",
    description:
      "3 sesiones: brief colaborativo, journey map (24 touchpoints) y OKRs con 3 MVPs priorizados.",
    image: portfolioImages.karri.okrsBoard,
    tags: ["Design Sprint", "OKRs", "Facilitation"],
  },
  ];

  return cards.map((card) => ({
    ...card,
    metrics: getProjectHeadlineMetrics(card.id, language),
  }));
}

/** Snapshot al cargar el módulo; en runtime preferir getFeaturedCaseStudies(language) */
export const featuredCaseStudies = getFeaturedCaseStudies();