/** Demos públicas de consultoría Viento Norte (Figma Sites / Make). */

export type ConsultoriaDemoConfig = {
  id: string;
  /** Sitio publicado navegable (CTA principal + preview iframe) */
  figmaSitesUrl: string;
  /** Archivo editable en Figma Make (CTA secundario, opcional) */
  figmaMakeUrl?: string;
  /** Embed Make (legado; el preview usa figmaSitesUrl) */
  embedUrl?: string;
};

/** X | CMS · N2N Design Thinking + Design Sprint */
export const CONSULTORIA_DEMO_X_CMS = {
  id: "x-cms-n2n",
  figmaSitesUrl: "https://pouch-growl-74881457.figma.site",
  figmaMakeUrl:
    "https://www.figma.com/make/nHrKYiEtbE0gYnTFB4Ast6/X-%7C-CMS",
  embedUrl:
    "https://www.figma.com/embed?embed_host=mi-portafolio&url=https%3A%2F%2Fwww.figma.com%2Fmake%2FnHrKYiEtbE0gYnTFB4Ast6%2FX-%257C-CMS",
} as const satisfies ConsultoriaDemoConfig;

/**
 * GEES · Propuesta ejecutiva (dashboard de cotización y KPIs).
 * Publicado: https://duct-juice-51509104.figma.site
 */
export const CONSULTORIA_DEMO_GEES = {
  id: "gees-propuesta",
  figmaSitesUrl: "https://duct-juice-51509104.figma.site",
} as const satisfies ConsultoriaDemoConfig;

/** Orden de aparición en #consultoria-demo */
export const CONSULTORIA_DEMOS: readonly ConsultoriaDemoConfig[] = [
  CONSULTORIA_DEMO_X_CMS,
  CONSULTORIA_DEMO_GEES,
];

export type ConsultoriaDemoId = (typeof CONSULTORIA_DEMOS)[number]["id"];
