import { portfolioImages } from "../lib/portfolio-image-urls";

/** Visual evidence for /sobre-mi — images first, captions short. */
export type AboutVisualTile = {
  id: string;
  src: string;
  alt: { es: string; en: string };
  label: { es: string; en: string };
  /** bento span classes */
  span: string;
  kind: "dashboard" | "mockup" | "diagram" | "method";
};

export const ABOUT_VISUAL_TILES: AboutVisualTile[] = [
  {
    id: "sura-dash",
    src: portfolioImages.sura.iaAutomationDashboard,
    alt: {
      es: "Dashboard IA y automatización SURA Investments",
      en: "SURA Investments IA automation dashboard",
    },
    label: { es: "SURA · Dashboard", en: "SURA · Dashboard" },
    span: "sm:col-span-2 sm:row-span-2",
    kind: "dashboard",
  },
  {
    id: "sura-onboard",
    src: portfolioImages.sura.riaOnboarding,
    alt: {
      es: "Onboarding RIA multi-país",
      en: "Multi-country RIA onboarding",
    },
    label: { es: "Onboarding −40%", en: "Onboarding −40%" },
    span: "sm:col-span-1",
    kind: "mockup",
  },
  {
    id: "transvip-app",
    src: portfolioImages.transvip.appDesktop,
    alt: {
      es: "App Transvip desktop",
      en: "Transvip desktop app",
    },
    label: { es: "Transvip · App", en: "Transvip · App" },
    span: "sm:col-span-1",
    kind: "mockup",
  },
  {
    id: "transvip-mobile",
    src: portfolioImages.transvip.appMobile,
    alt: {
      es: "App Transvip mobile",
      en: "Transvip mobile app",
    },
    label: { es: "Mobile", en: "Mobile" },
    span: "sm:col-span-1",
    kind: "mockup",
  },
  {
    id: "karri-okr",
    src: portfolioImages.karri.okrsBoard,
    alt: {
      es: "OKRs y sprint Karri",
      en: "Karri OKRs and sprint",
    },
    label: { es: "Karri · OKRs", en: "Karri · OKRs" },
    span: "sm:col-span-1",
    kind: "diagram",
  },
  {
    id: "sura-flow",
    src: portfolioImages.sura.celulaEvolutivaFlow,
    alt: {
      es: "Flujo célula evolutiva",
      en: "Evolutionary cell flow",
    },
    label: { es: "Diagrama", en: "Diagram" },
    span: "sm:col-span-1",
    kind: "diagram",
  },
  {
    id: "xcms",
    src: portfolioImages.consultoria.xCmsDashboard,
    alt: {
      es: "Dashboard X|CMS consultoría",
      en: "X|CMS consulting dashboard",
    },
    label: { es: "X|CMS", en: "X|CMS" },
    span: "sm:col-span-1",
    kind: "dashboard",
  },
  {
    id: "ds",
    src: portfolioImages.uxTools.designSystem,
    alt: {
      es: "Design system tokens y componentes",
      en: "Design system tokens and components",
    },
    label: { es: "Design system", en: "Design system" },
    span: "sm:col-span-1",
    kind: "method",
  },
];

/** Cover image per experience companyId (timeline). */
/** Keys: companyId y/o company name exacto del catalog. */
export const EXPERIENCE_COVER: Record<string, string> = {
  "sura-investments": portfolioImages.sura.webPrototype,
  transvip: portfolioImages.transvip.figmaPrototype,
  karri: portfolioImages.karri.deliveryBrand,
  "Viento Norte": portfolioImages.consultoria.xCmsDashboard,
  "Karri by Transvip": portfolioImages.karri.deliveryBrand,
};

export const METHOD_STRIP = [
  {
    id: "journey",
    src: portfolioImages.uxTools.journeyMap,
    label: { es: "Journey", en: "Journey" },
  },
  {
    id: "flow",
    src: portfolioImages.uxTools.userFlow,
    label: { es: "Flows", en: "Flows" },
  },
  {
    id: "test",
    src: portfolioImages.uxTools.usabilityTest,
    label: { es: "Test", en: "Test" },
  },
  {
    id: "system",
    src: portfolioImages.uxTools.designSystem,
    label: { es: "System", en: "System" },
  },
  {
    id: "value",
    src: portfolioImages.framework.uxValueChain,
    label: { es: "Cadena", en: "Value chain" },
  },
] as const;
