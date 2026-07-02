import { portfolioImages } from "../lib/portfolio-image-urls";

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

export const experiences: ExperienceEntry[] = [
  {
    company: "SURA Investments",
    position: "UX Lead · Associate, Estrategia Digital",
    period: "Sept 2023 — Actualidad",
    isCurrent: true,
    logo: portfolioImages.sura.logo,
    location: "Chile · Híbrido",
    summary: "Wealth Management regional · −40% onboarding · 5+ países",
    achievements: [
      "Liderazgo UX · UI en células de desarrollo regional y local desde el negocio de Wealth Management",
      "Design thinking con áreas de negocio, PMs, POs y líderes técnicos en iniciativas multi-país",
      "Experiencias accesibles y alineadas a cumplimiento en corredores de bolsa y plataformas de inversión",
      "Evolución de productos digitales regionales con design system y handoff a desarrollo",
    ],
    tools: ["Figma", "Design Thinking", "Accesibilidad", "Jira", "Confluence"],
    companyId: "sura-investments",
  },
  {
    company: "Desafío Latam",
    position: "Docente Carrera UX · UI",
    period: "Abr 2023 — May 2025",
    logo: undefined,
    location: "Chile · Remoto",
    summary: "Facilitación · Design Thinking · Atomic design · Proyectos finales",
    achievements: [
      "Diseño UX con buenas prácticas de Design Thinking y evaluación de proyectos finales",
      "Diseño UI con atomic y responsive design dentro de un design system coherente",
      "Articulación entre conocimiento práctico y plan formativo para competencias digitales",
    ],
    tools: ["Figma", "Design Thinking", "Design Systems"],
  },
  {
    company: "Transvip Chile",
    position: "Senior Product Designer",
    period: "Jul 2022 — Sept 2023",
    logo: portfolioImages.transvip.logo,
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
    companyId: "transvip",
  },
  {
    company: "Karri by Transvip",
    position: "Lead UX — Vertical Shoppers",
    period: "2022 — 2023",
    logo: portfolioImages.karri.logo,
    location: "Chile · Remoto",
    summary: "+35% activación · +58% engagement · −42% abandono onboarding",
    achievements: [
      "Calculadora de ganancias y transparencia financiera para shoppers",
      "Sistema de notificaciones y optimización de onboarding con métricas de adopción",
      "Priorización de mejoras vía research y pruebas con clientes internos y externos",
    ],
    tools: ["Figma", "Analytics", "User Research", "Prototyping"],
    companyId: "transvip",
  },
  {
    company: "Walmart Chile (Data Conversion Service)",
    position: "Diseñador web",
    period: "May — Jun 2022",
    logo: undefined,
    location: "Chile",
    summary: "Equipo de diseño y contenido · retail enterprise",
    achievements: [
      "Diseño y contenido para canales digitales del retailer",
      "Colaboración con equipo de diseño en entregables web de corto plazo",
    ],
    tools: ["Figma", "Adobe Creative Suite"],
  },
  {
    company: "Havas Group Chile",
    position: "Desarrollador web",
    period: "Nov 2021 — Abr 2022",
    logo: undefined,
    location: "Chile",
    summary: "Claro Chile · HTML/CSS · navegación y tienda de equipos",
    achievements: [
      "Rediseño de navegación principal de Claro Chile y tienda de equipos",
      "Maquetación HTML de landing pages, mailings y comunicaciones",
      "Casos y evidencias visuales — próximamente en el portafolio",
    ],
    tools: ["HTML", "CSS Flexbox", "Wireframing", "Responsive"],
  },
  {
    company: "Valuesite Ltda",
    position: "Líder de diseño",
    period: "Jun — Nov 2021",
    logo: undefined,
    location: "Chile",
    summary: "Design system AquiVoy Express · KIT UI · estrategia ágil",
    achievements: [
      "Liderazgo de equipos de diseño, marketing y comercial bajo colaboración ágil",
      "Lineamientos del sistema de diseño de la app AquiVoy Express y KIT UI",
    ],
    tools: ["Figma", "Design Systems", "Agile"],
  },
  {
    company: "Maraña Agencia Digital",
    position: "Diseñador UX · UI",
    period: "Feb 2020 — May 2021",
    logo: undefined,
    location: "Santiago, Chile",
    summary: "Workshops de diseño · digitalización de negocios",
    achievements: [
      "Facilitación de workshops desde propuesta de valor hasta productos digitales",
      "Diseño de servicios y experiencias para clientes B2B y instituciones",
    ],
    tools: ["Figma", "Design Thinking", "Workshops"],
  },
  {
    company: "Profesional independiente",
    position: "Diseñador freelance",
    period: "Ene 2017 — Actualidad",
    logo: undefined,
    location: "Chile · Remoto",
    summary: "9+ años · agencias, retail, educación y consultoría digital",
    achievements: [
      "Diseño web, fotografía digital, community management y consultorías para diversos rubros",
      "Tutorías para estudiantes de magíster en marketing y proyectos con agencias",
      "Portal IBM (remoto) y otros entregables HTML/CSS — casos próximamente en el portafolio",
    ],
    tools: ["Figma", "Adobe Creative Suite", "SEO", "Wireframing"],
  },
];