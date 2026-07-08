import { portfolioImages } from "../lib/portfolio-image-urls";
import type { EnhancedProject } from "./projects-data";

const { karri: karriImg } = portfolioImages;

/** Resúmenes ligeros para listados — el detalle completo vive en karri-projects.tsx */
export const karriCalculadoraStub: EnhancedProject = {
  id: "karri-calculadora",
  company: "Transvip / Karri",
  companyLogo: karriImg.logo,
  role: "Lead UX Designer",
  period: "2022-2023",
  projectName: "Karri - Calculadora de Ganancias",
  description:
    "Sistema de simulación de ingresos para shoppers que permite calcular ganancias proyectadas basadas en parámetros reales de trabajo.",
  descriptionEN:
    "Income simulation system for shoppers to calculate projected earnings based on real work parameters.",
  image: karriImg.boosmapBenchmark,
  tags: ["Figma", "React Native", "UX Research", "Mobile First"],
  details: {
    challenge: "Los shoppers no podían estimar ingresos potenciales antes de comenzar.",
    solution: "Calculadora interactiva con benchmark de competidores y simulación de escenarios.",
    mockups: [karriImg.boosmapBenchmark],
  },
};

export const karriNotificacionesStub: EnhancedProject = {
  id: "karri-notificaciones",
  company: "Transvip / Karri",
  companyLogo: karriImg.logo,
  role: "Lead UX Designer",
  period: "2022-2023",
  projectName: "Karri - Sistema de Notificaciones + Onboarding",
  description:
    "Hub centralizado de notificaciones y flujo de autenticación optimizado para shoppers.",
  descriptionEN:
    "Centralized notification hub and optimized authentication flow for shoppers.",
  image: karriImg.deliveryBrand,
  tags: ["Figma", "React Native", "Information Architecture", "Mobile UX"],
  details: {
    challenge: "Notificaciones dispersas y autenticación con alto abandono.",
    solution: "Hub categorizado y onboarding simplificado de 7 a 4 pasos.",
    mockups: [karriImg.deliveryBrand],
  },
};

export const karriDesignSprintStub: EnhancedProject = {
  id: "karri-design-sprint",
  company: "Transvip / Karri",
  companyLogo: karriImg.logo,
  role: "Lead UX Designer & Workshop Facilitator",
  period: "Agosto 2023",
  projectName: "Karri - Workshop de Estrategia de Producto",
  description:
    "Taller intensivo de 3 sesiones que alineó al equipo en estrategia de producto, journey y OKRs.",
  descriptionEN:
    "Three-session workshop aligning the team on product strategy, journey map, and OKRs.",
  image: karriImg.okrsBoard,
  tags: ["Design Sprint", "Facilitation", "Product Strategy", "OKR Planning"],
  details: {
    challenge: "Información dispersa y falta de consenso sobre la visión del producto Karri.",
    solution: "Brief colaborativo, journey map y OKRs con MVPs priorizados.",
    mockups: [karriImg.sprintBrief1, karriImg.sprintBrief1],
  },
};