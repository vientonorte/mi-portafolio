import { portfolioImages } from "../lib/portfolio-image-urls";

export interface ImageRegistryEntry {
  id: string;
  category: string;
  label: string;
  path: string;
  defaultUrl: string;
  alt: string;
  role?: string;
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
  entry("branding.ogHome", "Branding", "Share redes · home", "branding/og-home-1200.png", portfolioImages.branding.ogHome, "Viento Norte — share home"),
  entry("branding.ogConsultoria", "Branding", "Share redes · consultoría", "branding/og-consultoria-1200.png", portfolioImages.branding.ogConsultoria, "Viento Norte — share consultoría"),
  entry("branding.ogProceso", "Branding", "Share redes · proceso", "branding/og-proceso-1200.png", portfolioImages.branding.ogProceso, "Viento Norte — share proceso"),
  entry("branding.ogPortfolio", "Branding", "OG / PWA (legacy)", "branding/og-portfolio.png", portfolioImages.branding.ogPortfolio, "Viento Norte · UXtech · módulos a medida"),
  entry("branding.isologo", "Branding", "Logo / isologo", "branding/isologo-512.png", portfolioImages.branding.isologo, "Isologo Viento Norte"),
  entry("branding.favicon", "Branding", "Favicon", "favicon.ico", portfolioImages.branding.favicon, "Favicon Viento Norte"),
  entry("branding.schemaLogo", "Branding", "Schema.org logo", "icon-512x512.png", portfolioImages.branding.schemaLogo, "Logo schema Viento Norte"),
  entry("branding.appleTouch", "Branding", "Apple / PWA", "icon-192x192.png", portfolioImages.branding.appleTouch, "Apple touch Viento Norte"),
  entry(
    "branding.heroConsultoria",
    "Consultoría",
    "Hero · operaciones CMS",
    "consultoria/x-cms-dashboard.png",
    portfolioImages.consultoria.xCmsDashboard,
    "Dashboard CMS — operaciones digitales en el stack del cliente"
  ),
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
    "Flujo end-to-end Célula Evolutiva — RIA SURA US"
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
  entry(
    "consultoria.geesDashboard",
    "Consultoría",
    "GEES · Propuesta dashboard",
    "consultoria/gees-dashboard.png",
    portfolioImages.consultoria.geesDashboard,
    "GEES — dashboard de cotización y KPIs (Figma Sites)"
  ),
  entry(
    "uxTools.journeyMap",
    "UX Tools",
    "Journey map",
    "ux-tools/journey-map.png",
    portfolioImages.uxTools.journeyMap,
    "Carta método · Understand · journey map"
  ),
  entry(
    "uxTools.userFlow",
    "UX Tools",
    "User flow",
    "ux-tools/user-flow.png",
    portfolioImages.uxTools.userFlow,
    "Carta método · Ideate · user flow"
  ),
  entry(
    "uxTools.usabilityTest",
    "UX Tools",
    "Usability test",
    "ux-tools/usability-test.png",
    portfolioImages.uxTools.usabilityTest,
    "Carta método · Test · usability test"
  ),
  entry(
    "uxTools.designSystem",
    "UX Tools",
    "Design system",
    "ux-tools/design-system.png",
    portfolioImages.uxTools.designSystem,
    "Carta método · Implement · design system"
  ),
  entry(
    "methodCoworking.funnelStructure",
    "Método",
    "Funnel structure",
    "method/coworking/funnel-structure.png",
    portfolioImages.methodCoworking.funnelStructure,
    "Benchmark anonimizado · estructura de embudo"
  ),
  entry(
    "methodCoworking.a11yContrast",
    "Método",
    "A11y contrast",
    "method/coworking/a11y-contrast.png",
    portfolioImages.methodCoworking.a11yContrast,
    "Benchmark anonimizado · contraste y color"
  ),
  entry(
    "methodCoworking.i18nGap",
    "Método",
    "i18n gap",
    "method/coworking/i18n-gap.png",
    portfolioImages.methodCoworking.i18nGap,
    "Benchmark anonimizado · multilenguaje"
  ),
  entry(
    "methodCoworking.serviceDiscovery",
    "Método",
    "Service discovery",
    "method/coworking/service-discovery.png",
    portfolioImages.methodCoworking.serviceDiscovery,
    "Benchmark anonimizado · descubrimiento de servicios"
  ),
  entry(
    "edu21.heuristicWeb",
    "Edu 21",
    "Heurística web",
    "cases/edu21/01-heuristic-web.png",
    portfolioImages.edu21.heuristicWeb,
    "Edu 21 · heurística sitio web (E1)"
  ),
  entry(
    "edu21.competitiveBenchmark",
    "Edu 21",
    "Benchmark competencias",
    "cases/edu21/02-competitive-benchmark.png",
    portfolioImages.edu21.competitiveBenchmark,
    "Edu 21 · benchmark de competencias (E1)"
  ),
  entry(
    "edu21.serviceStrategy",
    "Edu 21",
    "Estrategia de servicios",
    "cases/edu21/03-service-strategy.png",
    portfolioImages.edu21.serviceStrategy,
    "Edu 21 · diseño de estrategia de servicios (E2)"
  ),
  entry(
    "edu21.salesPitch",
    "Edu 21",
    "Pitch comercial",
    "cases/edu21/04-sales-pitch.png",
    portfolioImages.edu21.salesPitch,
    "Edu 21 · pitch / herramientas comerciales (E3)"
  ),
  entry(
    "edu21.storyboard",
    "Edu 21",
    "Storyboard video",
    "cases/edu21/05-storyboard.png",
    portfolioImages.edu21.storyboard,
    "Edu 21 · storyboard video corporativo (E3)"
  ),
  entry(
    "edu21.performanceSeo",
    "Edu 21",
    "Performance / SEO",
    "cases/edu21/06-performance-seo.png",
    portfolioImages.edu21.performanceSeo,
    "Edu 21 · speed / performance report"
  ),
];

export const IMAGE_REGISTRY_BY_ID = Object.fromEntries(
  IMAGE_REGISTRY.map((item) => [item.id, item])
) as Record<string, ImageRegistryEntry>;

export const IMAGE_CATEGORIES = [...new Set(IMAGE_REGISTRY.map((i) => i.category))];