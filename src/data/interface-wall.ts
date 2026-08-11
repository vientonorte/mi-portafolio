import { portfolioImages } from "../lib/portfolio-image-urls";

/**
 * S1 Interface Wall — 12 pantallas curadas.
 * Transnacional (SURA/Transvip/Karri) + práctica VN (Edu21, Monitas, Coworking, MC).
 */
export type InterfaceWallTile = {
  id: string;
  src: string;
  label: { es: string; en: string };
  brand: { es: string; en: string };
  scope: "global" | "national";
  /** larger tiles in bento */
  featured?: boolean;
};

export const INTERFACE_WALL: InterfaceWallTile[] = [
  {
    id: "sura-dash",
    src: portfolioImages.sura.iaAutomationDashboard,
    brand: { es: "SURA Investments", en: "SURA Investments" },
    label: { es: "Dashboard IA", en: "AI dashboard" },
    scope: "global",
    featured: true,
  },
  {
    id: "sura-onboard",
    src: portfolioImages.sura.riaOnboarding,
    brand: { es: "SURA Investments", en: "SURA Investments" },
    label: { es: "Onboarding RIA", en: "RIA onboarding" },
    scope: "global",
  },
  {
    id: "transvip-desk",
    src: portfolioImages.transvip.appDesktop,
    brand: { es: "Transvip", en: "Transvip" },
    label: { es: "App desktop", en: "Desktop app" },
    scope: "national",
    featured: true,
  },
  {
    id: "transvip-mobile",
    src: portfolioImages.transvip.appMobile,
    brand: { es: "Transvip", en: "Transvip" },
    label: { es: "App mobile", en: "Mobile app" },
    scope: "national",
  },
  {
    id: "karri-okr",
    src: portfolioImages.karri.okrsBoard,
    brand: { es: "Karri", en: "Karri" },
    label: { es: "OKRs · producto", en: "OKRs · product" },
    scope: "national",
  },
  {
    id: "edu21-ficha",
    src: portfolioImages.edu21.fichaProducto,
    brand: { es: "Edu21", en: "Edu21" },
    label: { es: "Ficha producto", en: "Product sheet" },
    scope: "national",
  },
  {
    id: "edu21-cta",
    src: portfolioImages.edu21.ctaBrochure,
    brand: { es: "Edu21", en: "Edu21" },
    label: { es: "CTA brochure", en: "Brochure CTA" },
    scope: "national",
  },
  {
    id: "monitas-wire",
    src: portfolioImages.monitas.wireframe,
    brand: { es: "Monitas.cl", en: "Monitas.cl" },
    label: { es: "Wireframe e-comm", en: "E-comm wireframe" },
    scope: "national",
    featured: true,
  },
  {
    id: "monitas-nav",
    src: portfolioImages.monitas.mapNav,
    brand: { es: "Monitas.cl", en: "Monitas.cl" },
    label: { es: "Mapa de navegación", en: "Nav map" },
    scope: "national",
  },
  {
    id: "monitas-pago",
    src: portfolioImages.monitas.flujoPago,
    brand: { es: "Monitas.cl", en: "Monitas.cl" },
    label: { es: "Flujo de pago", en: "Payment flow" },
    scope: "national",
  },
  {
    id: "cowork-funnel",
    src: portfolioImages.methodCoworking.funnelConversion,
    brand: { es: "Coworking", en: "Coworking" },
    label: { es: "Funnel conversión", en: "Conversion funnel" },
    scope: "national",
  },
  {
    id: "mc-patrones",
    src: portfolioImages.marcaConsciente.patrones,
    brand: { es: "Marca Consciente", en: "Marca Consciente" },
    label: { es: "Patrones UI", en: "UI patterns" },
    scope: "national",
  },
];
