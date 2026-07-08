import { portfolioImages } from "../lib/portfolio-image-urls";

export interface ImageRegistryEntry {
  id: string;
  category: string;
  label: string;
  path: string;
  defaultUrl: string;
  alt: string;
}

function entry(
  id: string,
  category: string,
  label: string,
  path: string,
  defaultUrl: string,
  alt: string
): ImageRegistryEntry {
  return { id, category, label, path, defaultUrl, alt };
}

/** Catálogo editable — fotos en public/images/ y profile-photo.jpg */
export const IMAGE_REGISTRY: ImageRegistryEntry[] = [
  entry("branding.profilePhoto", "Branding", "Foto de perfil", "profile-photo.jpg", portfolioImages.branding.profilePhoto, "Rodrigo Gaete, UX Lead"),
  entry("branding.ogPortfolio", "Branding", "OG / PWA", "branding/og-portfolio.png", portfolioImages.branding.ogPortfolio, "Portfolio Rodrigo Gaete"),
  entry("sura.riaOnboarding", "SURA", "RIA onboarding", "sura/ria-onboarding.png", portfolioImages.sura.riaOnboarding, "Onboarding RIA SURA US"),
  entry("sura.webPrototype", "SURA", "Prototipo web RIA", "sura/web-prototype.png", portfolioImages.sura.webPrototype, "Prototipo web SURA — plataforma inversiones / RIA"),
  entry("sura.componentPipeline", "SURA", "Pipeline componentes", "sura/component-pipeline.png", portfolioImages.sura.componentPipeline, "Pipeline MVP — Explorar, Refinar, Documentar, Implementar"),
  entry("sura.benchmarkNavigation", "SURA", "Benchmark navegación", "sura/benchmark-navigation.png", portfolioImages.sura.benchmarkNavigation, "Benchmark de navegación"),
  entry("sura.analyticsGa4", "SURA", "Analytics GA4", "sura/analytics-ga4.png", portfolioImages.sura.analyticsGa4, "Dashboard GA4"),
  entry(
    "sura.iaAutomationDashboard",
    "SURA",
    "POC IA · DEI Dashboard",
    "sura/ia-automation-dashboard.png",
    portfolioImages.sura.iaAutomationDashboard,
    "DEI Dashboard — análisis de especificación de inversión con IA (POC Figma Sites)"
  ),
  entry("sura.hotjarDashboard", "Transvip", "Hotjar transvip.cl", "sura/hotjar-dashboard.png", portfolioImages.sura.hotjarDashboard, "Dashboard Hotjar — heatmaps transvip.cl"),
  entry("sura.bookingFlowchart", "Transvip", "Flujo reserva ACT-504", "sura/booking-flowchart.png", portfolioImages.sura.bookingFlowchart, "Flowchart ACT-504 — reserva programada vs inmediata Transvip"),
  entry("transvip.figmaPrototype", "Transvip", "Figma proto mobile", "transvip/figma-prototype.png", portfolioImages.transvip.figmaPrototype, "Captura Figma — prototipo mobile Transvip"),
  entry("sura.onboardingFlags", "SURA", "Onboarding flags", "sura/onboarding-flags.png", portfolioImages.sura.onboardingFlags, "Flags de onboarding"),
  entry("sura.uxProcess", "SURA", "Proceso UX", "sura/ux-process.png", portfolioImages.sura.uxProcess, "Diagrama proceso UX"),
  entry(
    "sura.celulaEvolutivaFlow",
    "SURA",
    "Flujo Célula Evolutiva",
    "sura/celula-evolutiva-flow.png",
    portfolioImages.sura.celulaEvolutivaFlow,
    "Flujo end-to-end Célula Evolutiva — Nueva Web SURA Investments"
  ),
  entry("transvip.appDesktop", "Transvip", "App desktop", "transvip/app-desktop.png", portfolioImages.transvip.appDesktop, "App Transvip desktop"),
  entry("transvip.appMobile", "Transvip", "App mobile", "transvip/app-mobile.png", portfolioImages.transvip.appMobile, "App Transvip mobile"),
  entry("transvip.productVision", "Transvip", "Product vision", "transvip/product-vision.png", portfolioImages.transvip.productVision, "Visión de producto Transvip"),
  entry("karri.logo", "Karri", "Logo", "karri/logo.png", portfolioImages.karri.logo, "Logo Karri"),
  entry("karri.boosmapBenchmark", "Karri", "Benchmark BOOSMAP", "karri/boosmap-benchmark.png", portfolioImages.karri.boosmapBenchmark, "Benchmark BOOSMAP"),
  entry("karri.deliveryBrand", "Karri", "Delivery brand", "karri/delivery-brand.png", portfolioImages.karri.deliveryBrand, "Marca delivery Karri"),
  entry("karri.okrsBoard", "Karri", "OKRs board", "karri/okrs-board.png", portfolioImages.karri.okrsBoard, "Tablero OKRs"),
  entry("karri.sprintBrief1", "Karri", "Sprint brief 1", "karri/sprint-brief-1.png", portfolioImages.karri.sprintBrief1, "Sprint brief Karri"),
  entry("framework.uxValueChain", "Framework", "UX value chain", "framework/ux-value-chain.png", portfolioImages.framework.uxValueChain, "Cadena de valor UX"),
  entry(
    "consultoria.xCmsDashboard",
    "Consultoría",
    "X | CMS dashboard",
    "consultoria/x-cms-dashboard.png",
    portfolioImages.consultoria.xCmsDashboard,
    "X CMS DATA-FIRST — dashboard principal (demo N2N publicada)"
  ),
];

export const IMAGE_REGISTRY_BY_ID = Object.fromEntries(
  IMAGE_REGISTRY.map((item) => [item.id, item])
) as Record<string, ImageRegistryEntry>;

export const IMAGE_CATEGORIES = [...new Set(IMAGE_REGISTRY.map((i) => i.category))];