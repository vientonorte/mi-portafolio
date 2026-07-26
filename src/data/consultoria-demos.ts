/** Demos y casos de referencia · consultoría Viento Norte. */

export type ConsultoriaDemoConfig = {
  id: string;
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
  figmaSitesUrl: "https://pouch-growl-74881457.figma.site",
  figmaMakeUrl:
    "https://www.figma.com/make/nHrKYiEtbE0gYnTFB4Ast6/X-%7C-CMS",
  poster: "xCmsDashboard",
} as const satisfies ConsultoriaDemoConfig;

/** GEES · consultoría / propuesta ejecutiva */
export const CONSULTORIA_DEMO_GEES = {
  id: "gees-propuesta",
  figmaSitesUrl: "https://duct-juice-51509104.figma.site",
  poster: "geesDashboard",
} as const satisfies ConsultoriaDemoConfig;

/** Casos de éxito (assets repo) */
export const CONSULTORIA_DEMO_SURA = {
  id: "sura-onboarding",
  poster: "suraRia",
} as const satisfies ConsultoriaDemoConfig;

export const CONSULTORIA_DEMO_SURA_ANALYTICS = {
  id: "sura-analytics",
  poster: "suraAnalytics",
} as const satisfies ConsultoriaDemoConfig;

export const CONSULTORIA_DEMO_TRANSVIP = {
  id: "transvip-app",
  poster: "transvipMobile",
} as const satisfies ConsultoriaDemoConfig;

export const CONSULTORIA_DEMO_KARRI = {
  id: "karri-shoppers",
  poster: "karriDelivery",
} as const satisfies ConsultoriaDemoConfig;

export const CONSULTORIA_DEMO_EDU21 = {
  id: "edu21-edu",
  poster: "edu21Pitch",
} as const satisfies ConsultoriaDemoConfig;

/** Social / ads / campañas (capacidad VN) */
export const CONSULTORIA_DEMO_ADS = {
  id: "ads-campaigns",
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
