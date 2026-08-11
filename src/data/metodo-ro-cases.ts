import { portfolioImages } from "../lib/portfolio-image-urls";

/**
 * Casos de evidencia del Método Ro bajo Viento Norte (asesorías / práctica).
 * NO es la galería general del portafolio (SURA / Transvip / Karri viven en Proyectos).
 */
export type MetodoRoCase = {
  id: string;
  src: string;
  caseName: { es: string; en: string };
  artifact: { es: string; en: string };
  /** Fase del método: brief · explore · prototype · validate */
  phase: { es: string; en: string };
};

export const METODO_RO_CASES: MetodoRoCase[] = [
  {
    id: "monitas-wire",
    src: portfolioImages.monitas.wireframe,
    caseName: { es: "Monitas.cl", en: "Monitas.cl" },
    artifact: { es: "Wireframe e-comm", en: "E-comm wireframe" },
    phase: { es: "Prototipar", en: "Prototype" },
  },
  {
    id: "monitas-nav",
    src: portfolioImages.monitas.mapNav,
    caseName: { es: "Monitas.cl", en: "Monitas.cl" },
    artifact: { es: "Mapa de navegación", en: "Nav map" },
    phase: { es: "Explorar", en: "Explore" },
  },
  {
    id: "monitas-pago",
    src: portfolioImages.monitas.flujoPago,
    caseName: { es: "Monitas.cl", en: "Monitas.cl" },
    artifact: { es: "Flujo de pago", en: "Payment flow" },
    phase: { es: "Prototipar", en: "Prototype" },
  },
  {
    id: "monitas-embudo",
    src: portfolioImages.monitas.embudo,
    caseName: { es: "Monitas.cl", en: "Monitas.cl" },
    artifact: { es: "Embudo de conversión", en: "Conversion funnel" },
    phase: { es: "Validar", en: "Validate" },
  },
  {
    id: "edu21-heuristic",
    src: portfolioImages.edu21.heuristicWeb,
    caseName: { es: "Edu21", en: "Edu21" },
    artifact: { es: "Heurística web", en: "Web heuristic" },
    phase: { es: "Entender", en: "Understand" },
  },
  {
    id: "edu21-story",
    src: portfolioImages.edu21.storyboard,
    caseName: { es: "Edu21", en: "Edu21" },
    artifact: { es: "Storyboard de servicio", en: "Service storyboard" },
    phase: { es: "Explorar", en: "Explore" },
  },
  {
    id: "edu21-benchmark",
    src: portfolioImages.edu21.competitiveBenchmark,
    caseName: { es: "Edu21", en: "Edu21" },
    artifact: { es: "Benchmark competitivo", en: "Competitive benchmark" },
    phase: { es: "Entender", en: "Understand" },
  },
  {
    id: "cowork-funnel",
    src: portfolioImages.methodCoworking.funnelConversion,
    caseName: { es: "Coworking", en: "Coworking" },
    artifact: { es: "Funnel de conversión", en: "Conversion funnel" },
    phase: { es: "Validar", en: "Validate" },
  },
  {
    id: "cowork-a11y",
    src: portfolioImages.methodCoworking.a11yContrast,
    caseName: { es: "Coworking", en: "Coworking" },
    artifact: { es: "Auditoría contraste", en: "Contrast audit" },
    phase: { es: "Validar", en: "Validate" },
  },
  {
    id: "vn-xcms",
    src: portfolioImages.consultoria.xCmsDashboard,
    caseName: { es: "Viento Norte · FO", en: "Viento Norte · FO" },
    artifact: { es: "Dashboard X|CMS (dueño del dato)", en: "X|CMS dashboard (data ownership)" },
    phase: { es: "Entregar", en: "Deliver" },
  },
  {
    id: "vn-gees",
    src: portfolioImages.consultoria.geesDashboard,
    caseName: { es: "Viento Norte · FO", en: "Viento Norte · FO" },
    artifact: { es: "Dashboard ops / enterprise", en: "Ops / enterprise dashboard" },
    phase: { es: "Entregar", en: "Deliver" },
  },
];
