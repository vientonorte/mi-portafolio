/**
 * URLs públicas con nombres semánticos (public/images/).
 * Generadas por scripts/sync-semantic-images.sh
 */
const base = import.meta.env.BASE_URL;
/** Invalida caché del SW/navegador tras actualizar logos (p. ej. Karri KARRI vs KLAP). */
const LOGO_ASSET_VERSION = "20260707";

function img(path: string, bustCache = false) {
  const url = `${base}images/${path}`;
  return bustCache ? `${url}?v=${LOGO_ASSET_VERSION}` : url;
}

export const portfolioImages = {
  sura: {
    logo: img("sura/logo.svg", true),
    riaOnboarding: img("sura/ria-onboarding.png", true),
    webPrototype: img("sura/web-prototype.png"),
    benchmarkNavigation: img("sura/benchmark-navigation.png"),
    analyticsGa4: img("sura/analytics-ga4.png"),
    iaAutomationDashboard: img("sura/ia-automation-dashboard.png"),
    hotjarDashboard: img("sura/hotjar-dashboard.png"),
    bookingFlowchart: img("sura/booking-flowchart.png"),
    onboardingFlags: img("sura/onboarding-flags.png"),
    uxProcess: img("sura/ux-process.png"),
  },
  transvip: {
    logo: img("transvip/logo.svg", true),
    appDesktop: img("transvip/app-desktop.png"),
    appMobile: img("transvip/app-mobile.png"),
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
  branding: {
    ogPortfolio: img("branding/og-portfolio.png"),
    profilePhoto: `${base}profile-photo.jpg?v=20260703b`,
  },
} as const;