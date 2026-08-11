/**
 * URLs públicas con nombres semánticos (public/images/).
 * Generadas por scripts/sync-semantic-images.sh
 */
const base = import.meta.env.BASE_URL;
/** Invalida caché del SW/navegador tras actualizar logos (p. ej. Karri KARRI vs KLAP). */
const LOGO_ASSET_VERSION = "20260709";

function img(path: string, bustCache = false) {
  const url = `${base}images/${path}`;
  return bustCache ? `${url}?v=${LOGO_ASSET_VERSION}` : url;
}

export const portfolioImages = {
  sura: {
    logo: img("sura/logo.svg", true),
    riaOnboarding: img("sura/ria-onboarding.png", true),
    webPrototype: img("sura/web-prototype.png"),
    componentPipeline: img("sura/component-pipeline.png"),
    benchmarkNavigation: img("sura/benchmark-navigation.png"),
    analyticsGa4: img("sura/analytics-ga4.png"),
    iaAutomationDashboard: img("sura/ia-automation-dashboard.png"),
    hotjarDashboard: img("sura/hotjar-dashboard.png"),
    bookingFlowchart: img("sura/booking-flowchart.png"),
    onboardingFlags: img("sura/onboarding-flags.png"),
    uxProcess: img("sura/ux-process.png"),
    celulaEvolutivaFlow: img("sura/celula-evolutiva-flow.png"),
  },
  transvip: {
    logo: img("transvip/logo.svg", true),
    appDesktop: img("transvip/app-desktop.png"),
    appMobile: img("transvip/app-mobile.png"),
    figmaPrototype: img("transvip/figma-prototype.png"),
    productVision: img("transvip/product-vision.png"),
  },
  karri: {
    logo: img("karri/logo.png", true),
    boosmapBenchmark: img("karri/boosmap-benchmark.png"),
    deliveryBrand: img("karri/delivery-brand.png"),
    okrsBoard: img("karri/okrs-board.png"),
    sprintBrief1: img("karri/sprint-brief-1.png"),
  },
  framework: {
    uxValueChain: img("framework/ux-value-chain.png"),
  },
  consultoria: {
    xCmsDashboard: img("consultoria/x-cms-dashboard.png"),
    geesDashboard: img("consultoria/gees-dashboard.png", true),
  },
  /**
   * Mockups reales del tour oferta (POC product-onboarding).
   * Fuente: X|CMS Figma Sites — regenerar con `bash scripts/capture-poc-modules.sh`
   */
  pocModules: {
    dashboard: img("poc-modules/dashboard.png", true),
    riesgo: img("poc-modules/riesgo.png", true),
    inventario: img("poc-modules/inventario.png", true),
    pedidos: img("poc-modules/pedidos.png", true),
    clientes: img("poc-modules/clientes.png", true),
    reportes: img("poc-modules/reportes.png", true),
  },
  /** Cartas método UX Tools (curadas desde PDFS/Diseño/UX TOOLS) */
  uxTools: {
    journeyMap: img("ux-tools/journey-map.png"),
    userFlow: img("ux-tools/user-flow.png"),
    usabilityTest: img("ux-tools/usability-test.png"),
    designSystem: img("ux-tools/design-system.png"),
  },
  /** Benchmark método anonimizado (Asesorías/Coworking — sin marca cliente en path) */
  methodCoworking: {
    funnelStructure: img("method/coworking/funnel-structure.png"),
    funnelConversion: img("method/coworking/funnel-conversion.png"),
    a11yContrast: img("method/coworking/a11y-contrast.png"),
    a11yReadability: img("method/coworking/a11y-readability.png"),
    i18nGap: img("method/coworking/i18n-gap.png"),
    serviceDiscovery: img("method/coworking/service-discovery.png"),
  },
  /** Case Edu 21 — permiso GO 2026-07-21 · marca visible */
  edu21: {
    heuristicWeb: img("cases/edu21/01-heuristic-web.png"),
    competitiveBenchmark: img("cases/edu21/02-competitive-benchmark.png"),
    serviceStrategy: img("cases/edu21/03-service-strategy.png"),
    salesPitch: img("cases/edu21/04-sales-pitch.png"),
    storyboard: img("cases/edu21/05-storyboard.png"),
    performanceSeo: img("cases/edu21/06-performance-seo.png"),
  },
  branding: {
    ogPortfolio: img("branding/og-portfolio.png"),
    profilePhoto: `${base}profile-photo.jpg?v=20260703b`,
  },
  /** Monogramas para marcas sin wordmark oficial en el repo */
  brands: {
    desafioLatam: img("brands/desafio-latam.svg", true),
    walmart: img("brands/walmart.svg", true),
    havas: img("brands/havas.svg", true),
    valuesite: img("brands/valuesite.svg", true),
    marana: img("brands/marana.svg", true),
    pareti: img("brands/pareti.svg", true),
    freelance: img("brands/freelance.svg", true),
    micro1: img("brands/micro1.svg", true),
    vientoNorte: img("brands/vientonorte.svg", true),
  },
} as const;