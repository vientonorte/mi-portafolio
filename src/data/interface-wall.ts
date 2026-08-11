import { portfolioImages } from "../lib/portfolio-image-urls";

/**
 * Interface Wall — tiles de UI de producto (evitar Excel, logos ajenos, uploaders).
 */
export type InterfaceWallTile = {
  id: string;
  src: string;
  label: { es: string; en: string };
  brand: { es: string; en: string };
  scope: "global" | "national";
  featured?: boolean;
};

export const INTERFACE_WALL: InterfaceWallTile[] = [
  {
    id: "sura-web",
    src: portfolioImages.sura.webPrototype,
    brand: { es: "SURA Investments", en: "SURA Investments" },
    label: { es: "Web wealth", en: "Wealth web" },
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
    id: "karri-delivery",
    src: portfolioImages.karri.deliveryBrand,
    brand: { es: "Karri", en: "Karri" },
    label: { es: "Producto shoppers", en: "Shoppers product" },
    scope: "national",
  },
  {
    id: "edu21-heuristic",
    src: portfolioImages.edu21.heuristicWeb,
    brand: { es: "Edu21", en: "Edu21" },
    label: { es: "Heurística web", en: "Web heuristic" },
    scope: "national",
  },
  {
    id: "edu21-story",
    src: portfolioImages.edu21.storyboard,
    brand: { es: "Edu21", en: "Edu21" },
    label: { es: "Storyboard servicio", en: "Service storyboard" },
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
    id: "sura-process",
    src: portfolioImages.sura.uxProcess,
    brand: { es: "SURA Investments", en: "SURA Investments" },
    label: { es: "Proceso UX", en: "UX process" },
    scope: "global",
  },
];
