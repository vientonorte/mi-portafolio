import { getPortfolioImages } from "../lib/image-overrides";
import { translations, type Language } from "../lib/i18n";
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

const FEATURED_CASE_STUDY_IDS = [
  "sura-ux-enterprise",
  "sura-ria-us",
  "sura-inversiones-dashboard",
  "sura-ia-automation-dashboard",
  "sura-ecosistema-digital",
  "transvip-app-premium",
  "karri-calculadora",
  "karri-notificaciones",
  "karri-design-sprint",
] as const;

function imageForProject(
  id: (typeof FEATURED_CASE_STUDY_IDS)[number],
  images: ReturnType<typeof getPortfolioImages>
): string {
  switch (id) {
    case "sura-ux-enterprise":
      return images.sura.uxProcess;
    case "sura-ria-us":
      return images.sura.celulaEvolutivaFlow;
    case "sura-inversiones-dashboard":
      return images.sura.riaOnboarding;
    case "sura-ia-automation-dashboard":
      return images.sura.iaAutomationDashboard;
    case "sura-ecosistema-digital":
      return images.sura.benchmarkNavigation;
    case "transvip-app-premium":
      return images.transvip.appDesktop;
    case "karri-calculadora":
      return images.karri.boosmapBenchmark;
    case "karri-notificaciones":
      return images.karri.deliveryBrand;
    case "karri-design-sprint":
      return images.karri.okrsBoard;
  }
}

/** Casos destacados para grid visual en /proyectos */
export function getFeaturedCaseStudies(language: Language = "es"): CaseStudyCardData[] {
  const portfolioImages = getPortfolioImages();
  const copy = translations[language].featuredCaseStudies;

  return FEATURED_CASE_STUDY_IDS.map((id) => {
    const localized = copy[id];
    return {
      id,
      title: localized.title,
      company: localized.company,
      description: localized.description,
      image: imageForProject(id, portfolioImages),
      tags: [...localized.tags],
      metrics: getProjectHeadlineMetrics(id, language),
    };
  });
}

/** Snapshot al cargar el módulo; en runtime preferir getFeaturedCaseStudies(language) */
export const featuredCaseStudies = getFeaturedCaseStudies();