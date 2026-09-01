/** Demos y casos de referencia · consultoría Viento Norte. */

export type ConsultoriaDemoConfig = {
  id: string;
  /** Etiqueta corta en español, para paneles sin i18n (ej. admin). */
  label: string;
  /** Sitio publicado (opcional; si no hay, solo poster estático) */
  figmaSitesUrl?: string;
  figmaMakeUrl?: string;
  embedUrl?: string;
  /** Clave de poster en portfolio images */
  poster:
    | "xCmsDashboard"
    | "geesDashboard"
    | "suraRia"
    | "suraAnalytics"
    | "transvipMobile"
    | "karriDelivery"
    | "edu21Pitch"
    | "coworkingFunnel";
};

/** CMS · solo dashboard (producto / herramienta) */
export const CONSULTORIA_DEMO_X_CMS = {
  id: "x-cms-n2n",
  label: "CMS · Dashboard",
  figmaSitesUrl: "https://pouch-growl-74881457.figma.site",
  figmaMakeUrl:
    "https://www.figma.com/make/nHrKYiEtbE0gYnTFB4Ast6/X-%7C-CMS",
  poster: "xCmsDashboard",
} as const satisfies ConsultoriaDemoConfig;

/** GEES · consultoría / propuesta ejecutiva. Sites URL oculta (no iframe, no href público). */
export const CONSULTORIA_DEMO_GEES = {
  id: "gees-propuesta",
  label: "GEES · Consultoría",
  poster: "geesDashboard",
} as const satisfies ConsultoriaDemoConfig;

/** Casos de éxito (assets repo) */
export const CONSULTORIA_DEMO_SURA = {
  id: "sura-onboarding",
  label: "SURA · Onboarding",
  poster: "suraRia",
} as const satisfies ConsultoriaDemoConfig;

export const CONSULTORIA_DEMO_SURA_ANALYTICS = {
  id: "sura-analytics",
  label: "SURA · Analytics",
  poster: "suraAnalytics",
} as const satisfies ConsultoriaDemoConfig;

export const CONSULTORIA_DEMO_TRANSVIP = {
  id: "transvip-app",
  label: "Transvip · App",
  poster: "transvipMobile",
} as const satisfies ConsultoriaDemoConfig;

export const CONSULTORIA_DEMO_KARRI = {
  id: "karri-shoppers",
  label: "Karri · Shoppers",
  poster: "karriDelivery",
} as const satisfies ConsultoriaDemoConfig;

export const CONSULTORIA_DEMO_EDU21 = {
  id: "edu21-edu",
  label: "Edu 21 · Educación",
  poster: "edu21Pitch",
} as const satisfies ConsultoriaDemoConfig;

/** Social / ads / campañas (capacidad VN) */
export const CONSULTORIA_DEMO_ADS = {
  id: "ads-campaigns",
  label: "Social & ads",
  poster: "coworkingFunnel",
} as const satisfies ConsultoriaDemoConfig;

/**
 * Orden en #consultoria-demo:
 * 1 CMS dashboard · 2 GEES consultoría · 3–n casos + ads
 */
export const CONSULTORIA_DEMOS: readonly ConsultoriaDemoConfig[] = [
  CONSULTORIA_DEMO_X_CMS,
  CONSULTORIA_DEMO_GEES,
  CONSULTORIA_DEMO_SURA,
  CONSULTORIA_DEMO_TRANSVIP,
  CONSULTORIA_DEMO_KARRI,
  CONSULTORIA_DEMO_ADS,
  CONSULTORIA_DEMO_EDU21,
];

export type ConsultoriaDemoId = (typeof CONSULTORIA_DEMOS)[number]["id"];
