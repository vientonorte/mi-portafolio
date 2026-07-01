/**
 * URLs públicas con nombres semánticos (public/images/).
 * Generadas por scripts/sync-semantic-images.sh
 */
const base = import.meta.env.BASE_URL;

function img(path: string) {
  return `${base}images/${path}`;
}

export const portfolioImages = {
  sura: {
    logo: img("sura/logo.svg"),
    riaOnboarding: img("sura/ria-onboarding.png"),
    webPrototype: img("sura/web-prototype.png"),
    benchmarkNavigation: img("sura/benchmark-navigation.png"),
    analyticsGa4: img("sura/analytics-ga4.png"),
    hotjarDashboard: img("sura/hotjar-dashboard.png"),
    bookingFlowchart: img("sura/booking-flowchart.png"),
    onboardingFlags: img("sura/onboarding-flags.png"),
    uxProcess: img("sura/ux-process.png"),
  },
  transvip: {
    logo: img("transvip/logo.svg"),
    appDesktop: img("transvip/app-desktop.png"),
    appMobile: img("transvip/app-mobile.png"),
    productVision: img("transvip/product-vision.png"),
  },
  karri: {
    logo: img("karri/logo.png"),
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
    profilePhoto: `${base}profile-photo.jpg`,
  },
} as const;