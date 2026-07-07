import { portfolioImages } from "../lib/portfolio-image-urls";
import type { Language } from "../lib/i18n";

export interface ExperienceEntry {
  company: string;
  position: string;
  period: string;
  isCurrent?: boolean;
  logo?: string;
  location: string;
  summary: string;
  achievements: string[];
  tools?: string[];
  companyId?: string;
}

type LocalizedExperience = {
  es: Omit<ExperienceEntry, "logo" | "companyId" | "isCurrent">;
  en: Omit<ExperienceEntry, "logo" | "companyId" | "isCurrent">;
  logo?: string;
  companyId?: string;
  isCurrent?: boolean;
};

const experienceCatalog: LocalizedExperience[] = [
  {
    isCurrent: true,
    logo: portfolioImages.sura.logo,
    companyId: "sura-investments",
    es: {
      company: "SURA Investments",
      position: "UX Lead · Associate, Estrategia Digital",
      period: "Sept 2023 — Actualidad",
      location: "Chile · Híbrido",
      summary: "Wealth Management regional · −40% onboarding · 5+ países",
      achievements: [
        "Liderazgo UX · UI en células de desarrollo regional y local desde el negocio de Wealth Management",
        "Design thinking con áreas de negocio, PMs, POs y líderes técnicos en iniciativas multi-país",
        "Experiencias accesibles y alineadas a cumplimiento en corredores de bolsa y plataformas de inversión",
        "Evolución de productos digitales regionales con design system y handoff a desarrollo",
      ],
      tools: ["Figma", "Design Thinking", "Accesibilidad", "Jira", "Confluence"],
    },
    en: {
      company: "SURA Investments",
      position: "UX Lead · Associate, Digital Strategy",
      period: "Sep 2023 — Present",
      location: "Chile · Hybrid",
      summary: "Regional Wealth Management · −40% onboarding · 5+ countries",
      achievements: [
        "UX · UI leadership in regional and local dev cells for Wealth Management",
        "Design thinking with business areas, PMs, POs, and tech leads on multi-country initiatives",
        "Accessible experiences aligned with compliance for brokerage and investment platforms",
        "Evolution of regional digital products with design system and dev handoff",
      ],
      tools: ["Figma", "Design Thinking", "Accessibility", "Jira", "Confluence"],
    },
  },
  {
    es: {
      company: "Desafío Latam",
      position: "Docente Carrera UX · UI",
      period: "Abr 2023 — May 2025",
      location: "Chile · Remoto",
      summary: "Facilitación · Design Thinking · Atomic design · Proyectos finales",
      achievements: [
        "Diseño UX con buenas prácticas de Design Thinking y evaluación de proyectos finales",
        "Diseño UI con atomic y responsive design dentro de un design system coherente",
        "Articulación entre conocimiento práctico y plan formativo para competencias digitales",
      ],
      tools: ["Figma", "Design Thinking", "Design Systems"],
    },
    en: {
      company: "Desafío Latam",
      position: "UX · UI Career Instructor",
      period: "Apr 2023 — May 2025",
      location: "Chile · Remote",
      summary: "Facilitation · Design Thinking · Atomic design · Capstone reviews",
      achievements: [
        "UX design with Design Thinking best practices and capstone evaluation",
        "UI design teaching atomic and responsive patterns within a coherent design system",
        "Bridging practical knowledge and curriculum for digital competencies",
      ],
      tools: ["Figma", "Design Thinking", "Design Systems"],
    },
  },
  {
    logo: portfolioImages.transvip.logo,
    companyId: "transvip",
    es: {
      company: "Transvip Chile",
      position: "Senior Product Designer",
      period: "Jul 2022 — Sept 2023",
      location: "Chile · Remoto",
      summary: "Design system web + app · discovery activo · handoff Figma",
      achievements: [
        "Liderazgo UX · UI en sprints con POs, stakeholders y gerencia de Tecnología y Producto",
        "Construcción de design system funcional para productos web y aplicación, con mejora continua",
        "Discovery activo: pruebas de concepto, usabilidad, benchmarks, encuestas y análisis de métricas",
        "Procesos de accesibilidad y prototipos alta fidelidad como handoff en Figma al equipo de desarrollo",
        "Refinamiento de flujos de reserva y experiencia premium — casos Karri y app pasajeros",
      ],
      tools: ["Figma", "Google Analytics", "User Testing", "Design Systems", "Accesibilidad"],
    },
    en: {
      company: "Transvip Chile",
      position: "Senior Product Designer",
      period: "Jul 2022 — Sep 2023",
      location: "Chile · Remote",
      summary: "Web + app design system · active discovery · Figma handoff",
      achievements: [
        "UX · UI leadership in sprints with POs, stakeholders, and Technology & Product leadership",
        "Functional design system for web and app products with continuous improvement",
        "Active discovery: concept tests, usability, benchmarks, surveys, and metric analysis",
        "Accessibility processes and high-fidelity Figma prototypes as dev handoff",
        "Booking flow refinement and premium experience — Karri and passenger app cases",
      ],
      tools: ["Figma", "Google Analytics", "User Testing", "Design Systems", "Accessibility"],
    },
  },
  {
    logo: portfolioImages.karri.logo,
    companyId: "transvip",
    es: {
      company: "Karri by Transvip",
      position: "Lead UX — Vertical Shoppers",
      period: "2022 — 2023",
      location: "Chile · Remoto",
      summary: "+35% activación · +58% engagement · −42% abandono onboarding",
      achievements: [
        "Calculadora de ganancias y transparencia financiera para shoppers",
        "Sistema de notificaciones y optimización de onboarding con métricas de adopción",
        "Priorización de mejoras vía research y pruebas con clientes internos y externos",
      ],
      tools: ["Figma", "Analytics", "User Research", "Prototyping"],
    },
    en: {
      company: "Karri by Transvip",
      position: "Lead UX — Shoppers Vertical",
      period: "2022 — 2023",
      location: "Chile · Remote",
      summary: "+35% activation · +58% engagement · −42% onboarding drop-off",
      achievements: [
        "Earnings calculator and financial transparency for shoppers",
        "Notification hub and onboarding optimization with adoption metrics",
        "Improvement prioritization via research and tests with internal and external clients",
      ],
      tools: ["Figma", "Analytics", "User Research", "Prototyping"],
    },
  },
  {
    es: {
      company: "Walmart Chile (Data Conversion Service)",
      position: "Diseñador web",
      period: "May — Jun 2022",
      location: "Chile",
      summary: "Equipo de diseño y contenido · retail enterprise",
      achievements: [
        "Diseño y contenido para canales digitales del retailer",
        "Colaboración con equipo de diseño en entregables web de corto plazo",
      ],
      tools: ["Figma", "Adobe Creative Suite"],
    },
    en: {
      company: "Walmart Chile (Data Conversion Service)",
      position: "Web Designer",
      period: "May — Jun 2022",
      location: "Chile",
      summary: "Design & content team · enterprise retail",
      achievements: [
        "Design and content for the retailer's digital channels",
        "Collaboration with the design team on short-turnaround web deliverables",
      ],
      tools: ["Figma", "Adobe Creative Suite"],
    },
  },
  {
    es: {
      company: "Havas Group Chile",
      position: "Desarrollador web",
      period: "Nov 2021 — Abr 2022",
      location: "Chile",
      summary: "Claro Chile · HTML/CSS · navegación y tienda de equipos",
      achievements: [
        "Rediseño de navegación principal de Claro Chile y tienda de equipos",
        "Maquetación HTML de landing pages, mailings y comunicaciones",
        "Casos y evidencias visuales — próximamente en el portafolio",
      ],
      tools: ["HTML", "CSS Flexbox", "Wireframing", "Responsive"],
    },
    en: {
      company: "Havas Group Chile",
      position: "Web Developer",
      period: "Nov 2021 — Apr 2022",
      location: "Chile",
      summary: "Claro Chile · HTML/CSS · navigation & device store",
      achievements: [
        "Redesign of Claro Chile main navigation and device store",
        "HTML layout for landing pages, mailings, and communications",
        "Visual case studies — coming soon to the portfolio",
      ],
      tools: ["HTML", "CSS Flexbox", "Wireframing", "Responsive"],
    },
  },
  {
    es: {
      company: "Valuesite Ltda",
      position: "Líder de diseño",
      period: "Jun — Nov 2021",
      location: "Chile",
      summary: "Design system AquiVoy Express · KIT UI · estrategia ágil",
      achievements: [
        "Liderazgo de equipos de diseño, marketing y comercial bajo colaboración ágil",
        "Lineamientos del sistema de diseño de la app AquiVoy Express y KIT UI",
      ],
      tools: ["Figma", "Design Systems", "Agile"],
    },
    en: {
      company: "Valuesite Ltda",
      position: "Design Lead",
      period: "Jun — Nov 2021",
      location: "Chile",
      summary: "AquiVoy Express design system · KIT UI · agile strategy",
      achievements: [
        "Led design, marketing, and commercial teams under agile collaboration",
        "Design system guidelines for AquiVoy Express app and KIT UI",
      ],
      tools: ["Figma", "Design Systems", "Agile"],
    },
  },
  {
    es: {
      company: "Maraña Agencia Digital",
      position: "Diseñador UX · UI",
      period: "Feb 2020 — May 2021",
      location: "Santiago, Chile",
      summary: "Workshops de diseño · digitalización de negocios",
      achievements: [
        "Facilitación de workshops desde propuesta de valor hasta productos digitales",
        "Diseño de servicios y experiencias para clientes B2B y instituciones",
      ],
      tools: ["Figma", "Design Thinking", "Workshops"],
    },
    en: {
      company: "Maraña Agencia Digital",
      position: "UX · UI Designer",
      period: "Feb 2020 — May 2021",
      location: "Santiago, Chile",
      summary: "Design workshops · business digitalization",
      achievements: [
        "Workshop facilitation from value proposition to digital products",
        "Service and experience design for B2B clients and institutions",
      ],
      tools: ["Figma", "Design Thinking", "Workshops"],
    },
  },
  {
    es: {
      company: "Profesional independiente",
      position: "Diseñador freelance",
      period: "Ene 2017 — Actualidad",
      location: "Chile · Remoto",
      summary: "9+ años · agencias, retail, educación y consultoría digital",
      achievements: [
        "Diseño web, fotografía digital, community management y consultorías para diversos rubros",
        "Tutorías para estudiantes de magíster en marketing y proyectos con agencias",
        "Portal IBM (remoto) y otros entregables HTML/CSS — casos próximamente en el portafolio",
      ],
      tools: ["Figma", "Adobe Creative Suite", "SEO", "Wireframing"],
    },
    en: {
      company: "Freelance",
      position: "Freelance Designer",
      period: "Jan 2017 — Present",
      location: "Chile · Remote",
      summary: "9+ years · agencies, retail, education, and digital consulting",
      achievements: [
        "Web design, digital photography, community management, and consulting across industries",
        "Tutoring for marketing master's students and agency projects",
        "IBM portal (remote) and other HTML/CSS deliverables — cases coming soon",
      ],
      tools: ["Figma", "Adobe Creative Suite", "SEO", "Wireframing"],
    },
  },
];

export function getExperiences(language: Language): ExperienceEntry[] {
  return experienceCatalog.map((item) => ({
    ...item[language],
    logo: item.logo,
    companyId: item.companyId,
    isCurrent: item.isCurrent,
  }));
}

/** @deprecated Use getExperiences(language) */
export const experiences = getExperiences("es");