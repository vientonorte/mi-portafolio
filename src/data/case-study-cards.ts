import { getPortfolioImages } from "../lib/image-overrides";

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
export function getFeaturedCaseStudies(): CaseStudyCardData[] {
  const portfolioImages = getPortfolioImages();
  return [
  {
    id: "sura-ria-us",
    title: "Diseño UX UI RIA SURA US",
    company: "SURA Investments",
    description:
      "Plataforma RIA end-to-end para el mercado estadounidense: onboarding multi-perfil, autenticación y dashboard de inversiones.",
    image: portfolioImages.sura.riaOnboarding,
    tags: ["Fintech", "RIA", "Onboarding", "US Market"],
    metrics: [
      { label: "Prototipos Hi-Fi", value: "8" },
      { label: "Flujos auth", value: "3" },
    ],
  },
  {
    id: "sura-ecosistema-digital",
    title: "Ecosistema Digital & Onboarding",
    company: "SURA Investments",
    description:
      "Unificación de +20 sitios públicos con CMS, Design System y flujo 'Hazte cliente' con manejo de errores.",
    image: portfolioImages.sura.benchmarkNavigation,
    tags: ["CMS", "Design System", "Onboarding"],
    metrics: [
      { label: "Tiempo onboarding", value: "-40%" },
      { label: "Componentes DS", value: "50+" },
    ],
  },
  {
    id: "transvip-app-premium",
    title: "App Pasajeros Premium",
    company: "Transvip",
    description:
      "Rediseño del flujo de reserva ejecutiva con selección de vehículo, fechas y reducción de fricción.",
    image: portfolioImages.transvip.appDesktop,
    tags: ["Mobility", "Premium", "Mobile"],
    metrics: [
      { label: "Tiempo reserva", value: "-40%" },
      { label: "Conversión", value: "+25%" },
    ],
  },
  {
    id: "karri-calculadora",
    title: "Calculadora de Ganancias",
    company: "Karri",
    description:
      "Simulador de ingresos con benchmark BOOSMAP/ZUBALE para transparencia del modelo de ganancias.",
    image: portfolioImages.karri.boosmapBenchmark,
    tags: ["Shoppers", "Benchmark", "Mobile"],
    metrics: [
      { label: "Activación", value: "+35%" },
      { label: "Comprensión", value: "92%" },
    ],
  },
  {
    id: "karri-notificaciones",
    title: "Hub de Notificaciones",
    company: "Karri",
    description:
      "Centro unificado de notificaciones y onboarding simplificado para shoppers.",
    image: portfolioImages.karri.deliveryBrand,
    tags: ["Notifications", "Onboarding", "IA"],
    metrics: [
      { label: "Engagement", value: "+58%" },
      { label: "Abandono", value: "-42%" },
    ],
  },
  {
    id: "karri-design-sprint",
    title: "Workshop Estrategia de Producto",
    company: "Karri",
    description:
      "3 sesiones: brief colaborativo, journey map (24 touchpoints) y OKRs con 3 MVPs priorizados.",
    image: portfolioImages.karri.okrsBoard,
    tags: ["Design Sprint", "OKRs", "Facilitation"],
    metrics: [
      { label: "Touchpoints", value: "24" },
      { label: "MVPs", value: "3" },
    ],
  },
  ];
}

/** Snapshot al cargar el módulo; en runtime preferir getFeaturedCaseStudies() */
export const featuredCaseStudies = getFeaturedCaseStudies();