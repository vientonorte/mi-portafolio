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

const COVER_BASE = import.meta.env.BASE_URL || "/";
const MARANA_COVER = `${COVER_BASE}images/experience/marana-sitio-home.webp`;
const NEGRA_COLORA_COVER = `${COVER_BASE}images/experience/negra-colora-infografia.webp`;
const PARETI_COVER = `${COVER_BASE}images/experience/pareti-sitio-web.webp`;
const KARRI_COVER = `${COVER_BASE}images/experience/karri-logo.webp`;
const TEATRO_DI_POPOLO_COVER = `${COVER_BASE}images/experience/teatro-di-popolo-sacco-vanzetti.webp`;

/** Cover image per experience companyId (timeline). */
/** Keys: companyId y/o company name exacto del catalog. */
export const EXPERIENCE_COVER: Record<string, string> = {
  "sura-investments": portfolioImages.sura.webPrototype,
  transvip: portfolioImages.transvip.figmaPrototype,
  karri: KARRI_COVER,
  "Viento Norte": portfolioImages.consultoria.xCmsDashboard,
  // Karri (Rö, 16:55): logo propio de Karri (public/images/karri/logo.png) en el formato de
  // portada 840×360; nunca la portada de Transvip (comparte companyId "transvip").
  "Karri by Transvip": KARRI_COVER,
  // Portadas aprobadas por Rö (TL 16:02 y 16:05, 11-oct; Pareti y Teatro desde su Behance): exports locales en public/images/experience/,
  // webp 840×360 (21:9, el mismo marco aspect-[21/9] del timeline), sin metadatos EXIF/XMP.
  "Maraña Agencia Digital": MARANA_COVER,
  "La Negra Colorá": NEGRA_COLORA_COVER,
  "Empresas Pareti": PARETI_COVER,
  "Teatro Di Popolo": TEATRO_DI_POPOLO_COVER,
  // Sin portada para La Voz de los Cerros: venía del CDN de Portfoliobox (cloudfront, 403 desde
  // S42) y no hay export aprobado. Sin export no hay portada (no se inventa ni placeholder).
};

/** alt descriptivo y tamaño intrínseco (evita layout shift) por URL de portada. */
export const EXPERIENCE_COVER_META: Record<string, { alt: string; width: number; height: number }> = {
  [MARANA_COVER]: {
    alt: "Portada del sitio de Maraña Agencia Digital: menú principal y mensaje de bienvenida sobre estrategia digital y metodología ágil",
    width: 840,
    height: 360,
  },
  [PARETI_COVER]: {
    alt: "Sitio web de Grupo Empresas Pareti: logo P&C sobre la foto de una caja registradora antigua",
    width: 840,
    height: 360,
  },
  [KARRI_COVER]: {
    alt: "Logo de Karri",
    width: 840,
    height: 360,
  },
  [TEATRO_DI_POPOLO_COVER]: {
    alt: "Escena de «Sacco & Vanzetti» de Teatro Di Popolo: pilas de periódicos sobre el escenario en penumbra",
    width: 840,
    height: 360,
  },
  [NEGRA_COLORA_COVER]: {
    alt: "Infografía de La Negra Colorá sobre la comunidad Barrientos Paillalef del Lof Ñanco, con un mapa de la zona",
    width: 840,
    height: 360,
  },
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
