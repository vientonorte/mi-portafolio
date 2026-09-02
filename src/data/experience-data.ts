import { portfolioImages } from "../lib/portfolio-image-urls";
import type { Language } from "../lib/i18n";

/**
 * Relato por etapa: contexto → rol → impacto (+ evidencia en bullets).
 * Los logos sin wordmark oficial usan monogramas en public/images/brands/.
 */
export interface ExperienceEntry {
  company: string;
  position: string;
  period: string;
  isCurrent?: boolean;
  logo?: string;
  location: string;
  /** Una línea de etapa (vertical / arco narrativo) */
  stage: string;
  /** Contexto de negocio o problema del entorno */
  context: string;
  /** Qué hiciste / responsabilidad */
  role: string;
  /** Resultado medible o aporte concreto */
  impact: string;
  /** Evidencia táctica (antes: achievements) */
  achievements: string[];
  tools?: string[];
  companyId?: string;
  /** Ancla a sección de evidencia visual en /sobre-mi (no /empresa). */
  evidenceSectionId?: string;
  evidenceCta?: { es: string; en: string };
}

type LocalizedExperience = {
  es: Omit<
    ExperienceEntry,
    "logo" | "companyId" | "isCurrent" | "evidenceSectionId" | "evidenceCta"
  >;
  en: Omit<
    ExperienceEntry,
    "logo" | "companyId" | "isCurrent" | "evidenceSectionId" | "evidenceCta"
  >;
  logo?: string;
  companyId?: string;
  isCurrent?: boolean;
  evidenceSectionId?: string;
  evidenceCta?: { es: string; en: string };
};

const experienceCatalog: LocalizedExperience[] = [
  {
    isCurrent: true,
    logo: portfolioImages.brands.micro1,
    evidenceSectionId: "evidencia-micro1",
    evidenceCta: {
      es: "Ver evidencia · Anotación y QA de grabación",
      en: "View evidence · Annotation and recording QA",
    },
    es: {
      company: "micro1",
      position: "AI Trainer / Gameplay Data Capture Specialist · Jornada parcial",
      period: "Jul 2026 — Actualidad",
      location: "Estados Unidos · Remoto",
      stage: "AI · Data capture",
      context:
        "Entrenamiento de modelos y captura sistemática de gameplay en títulos AAA con herramientas in-house.",
      role:
        "Jugar, grabar, anotar y catalogar sesiones; feedback con experts y leads; troubleshooting de workflows de captura.",
      impact: "Datos de gameplay seguros, catalogados y transferidos según guideline de proyecto",
      achievements: [
        "Captura remota de datos de gameplay con atención a exactitud y detalle",
        "Organización y anotación de sesiones; storage y handoff seguros",
        "QA de grabación: validación de integridad, sync y handoff antes de transferencia",
      ],
      tools: ["Captura de datos remota", "Anotación", "QA de grabación"],
    },
    en: {
      company: "micro1",
      position: "AI Trainer / Gameplay Data Capture Specialist · Part-time",
      period: "Jul 2026 — Present",
      location: "United States · Remote",
      stage: "AI · Data capture",
      context:
        "Model training and systematic gameplay capture on top-tier AAA titles with in-house tools.",
      role:
        "Play, record, annotate, and catalog sessions; expert/lead feedback; troubleshoot capture workflows.",
      impact: "Gameplay data secured, cataloged, and transferred per project guidelines",
      achievements: [
        "Remote gameplay data capture with accuracy and detail",
        "Session organization and annotation; secure storage and handoff",
        "Recording QA: integrity, sync, and handoff checks before transfer",
      ],
      tools: ["Remote data capture", "Annotation", "Recording QA"],
    },
  },
  {
    isCurrent: true,
    logo: portfolioImages.brands.vientoNorte,
    evidenceSectionId: "evidencia-vn",
    evidenceCta: {
      es: "Ver evidencia · Monitas, Edu21, funnels, FO",
      en: "View evidence · Monitas, Edu21, funnels, FO",
    },
    es: {
      company: "Viento Norte",
      position: "UX Manager · Jornada completa",
      period: "Mar 2019 — Actualidad · 7 años 6 meses",
      location: "Gran Santiago, RM, Chile · Remoto",
      stage: "Consultoría · N2N",
      context:
        "Consultora tecnológica: experiencia digital para negocios regulados y operaciones con cumplimiento por diseño.",
      role:
        "Implementación n2n de operaciones digitales y UX; diseño aplicado a negocio, web y experiencia de cliente.",
      impact: "Interfaces + n2n: e-comm, educación, enterprise y FO con dueño del dato",
      achievements: [
        "UI/UX de producto: e-comm (Monitas), educación (Edu21), patrones y funnels nacionales",
        "Operaciones digitales con cumplimiento por diseño (n2n) y design ops",
        "Marca VN: consultoría, demos, FO y práctica independiente (poemario, foto, documental)",
      ],
      tools: ["Desarrollo web", "Diseño de experiencia del cliente", "Figma", "Design Ops"],
    },
    en: {
      company: "Viento Norte",
      position: "UX Manager · Full-time",
      period: "Mar 2019 — Present · 7 yrs 6 mos",
      location: "Greater Santiago, Chile · Remote",
      stage: "Consulting · N2N",
      context:
        "Tech consultancy: digital experience for regulated businesses and operations with compliance by design.",
      role:
        "End-to-end digital ops and UX; design applied to business, web, and customer experience.",
      impact: "Interfaces + n2n: e-comm, education, enterprise, and FO with data ownership",
      achievements: [
        "Product UI/UX: e-comm (Monitas), education (Edu21), national patterns and funnels",
        "Digital operations with compliance by design (n2n) and design ops",
        "VN brand: consulting, demos, FO, and independent practice (poetry, photo, documentary)",
      ],
      tools: ["Web development", "Customer experience design", "Figma", "Design Ops"],
    },
  },
  {
    logo: portfolioImages.sura.logo,
    companyId: "sura-investments",
    es: {
      company: "SURA Investments",
      position: "UX Lead · Associate, Estrategia Digital",
      period: "Sept 2023 — Jun 2026 · 2 años 10 meses",
      location: "Chile · Híbrido",
      stage: "Wealth · Regional",
      context:
        "Plataformas de inversión y corredores en un entorno regulado, multi-país y multi-perfil.",
      role:
        "Liderazgo UX/UI en células de Wealth Management: design thinking con negocio, PMs, POs y tech leads.",
      impact: "−40% fricción en onboarding · alcance 5+ países · handoff con design system",
      achievements: [
        "Experiencias accesibles y alineadas a cumplimiento (WCAG / privacidad por diseño)",
        "Evolución de productos regionales con design system y criterios de aceptación claros",
        "Facilitación de sprints y discovery con áreas de negocio en iniciativas multi-país",
      ],
      tools: ["Figma", "Design Thinking", "Accesibilidad", "Jira", "Confluence"],
    },
    en: {
      company: "SURA Investments",
      position: "UX Lead · Associate, Digital Strategy",
      period: "Sep 2023 — Jun 2026 · 2 yrs 10 mos",
      location: "Chile · Hybrid",
      stage: "Wealth · Regional",
      context:
        "Investment platforms and brokerage in a regulated, multi-country, multi-profile environment.",
      role:
        "UX/UI leadership in Wealth Management cells: design thinking with business, PMs, POs, and tech leads.",
      impact: "−40% onboarding friction · 5+ countries · design-system handoff",
      achievements: [
        "Accessible experiences aligned with compliance (WCAG / privacy by design)",
        "Regional product evolution with design system and clear acceptance criteria",
        "Sprint and discovery facilitation with business areas on multi-country initiatives",
      ],
      tools: ["Figma", "Design Thinking", "Accessibility", "Jira", "Confluence"],
    },
  },
  {
    logo: portfolioImages.brands.desafioLatam,
    es: {
      company: "Desafío Latam",
      position: "Docente Carrera UX UI · Jornada parcial",
      period: "Abr 2023 — May 2025 · 2 años 2 meses",
      location: "Chile · Remoto",
      stage: "Docencia · Transferencia",
      context:
        "Formación profesional UX/UI en modalidad remota: cerrar la brecha entre práctica de industria y malla.",
      role:
        "Facilitación de ramos UX y UI: Design Thinking, atomic design y evaluación de proyectos finales.",
      impact: "Transferencia de método a una nueva generación de diseñadores",
      achievements: [
        "Articulación de dinámicas entre conocimiento práctico y plan formativo",
        "Evaluación de proyectos finales integradores con criterios de industria",
        "Diseño UI con design system coherente (atomic + responsive)",
      ],
      tools: ["Figma", "Design Thinking", "Design Systems", "Wireframing"],
    },
    en: {
      company: "Desafío Latam",
      position: "UX UI Career Instructor · Part-time",
      period: "Apr 2023 — May 2025 · 2 yrs 2 mos",
      location: "Chile · Remote",
      stage: "Teaching · Transfer",
      context:
        "Professional UX/UI training remotely: bridging industry practice and curriculum.",
      role:
        "Facilitated UX and UI courses: Design Thinking, atomic design, and capstone evaluation.",
      impact: "Method transfer to the next generation of designers",
      achievements: [
        "Bridged hands-on practice and the formal curriculum",
        "Evaluated integrative capstones against industry criteria",
        "UI design with a coherent design system (atomic + responsive)",
      ],
      tools: ["Figma", "Design Thinking", "Design Systems", "Wireframing"],
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
      stage: "Mobility · Premium",
      context:
        "Producto mobility premium: reserva, app pasajeros y sistemas internos bajo presión de entrega.",
      role:
        "Liderazgo UX/UI en sprints con POs, stakeholders y gerencia de Tecnología y Producto.",
      impact: "Design system web + app · discovery activo · handoff Figma navegable",
      achievements: [
        "Design system funcional con mejora continua para web y aplicación",
        "Discovery: usabilidad, benchmarks, encuestas y análisis de métricas",
        "Accesibilidad y prototipos alta fidelidad como handoff a desarrollo",
        "Refinamiento de flujos de reserva y experiencia premium",
      ],
      tools: ["Figma", "Google Analytics", "User Testing", "Design Systems", "Accesibilidad"],
    },
    en: {
      company: "Transvip Chile",
      position: "Senior Product Designer",
      period: "Jul 2022 — Sep 2023",
      location: "Chile · Remote",
      stage: "Mobility · Premium",
      context:
        "Premium mobility product: booking, passenger app, and internal systems under delivery pressure.",
      role:
        "UX/UI leadership in sprints with POs, stakeholders, and Technology & Product leadership.",
      impact: "Web + app design system · active discovery · navigable Figma handoff",
      achievements: [
        "Functional design system with continuous improvement for web and app",
        "Discovery: usability, benchmarks, surveys, and metric analysis",
        "Accessibility and high-fidelity prototypes as dev handoff",
        "Booking flow refinement and premium experience",
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
      stage: "Mobility · Shoppers",
      context:
        "Shoppers sin transparencia de ganancias: alta fricción en onboarding y abandono del funnel.",
      role:
        "Lead UX de la vertical: calculadora, notificaciones y priorización con research.",
      impact: "+35% activación · +58% engagement · −42% abandono onboarding",
      achievements: [
        "Calculadora de ganancias y transparencia financiera",
        "Hub de notificaciones y optimización de onboarding",
        "Priorización de mejoras con pruebas internas y externas",
      ],
      tools: ["Figma", "Analytics", "User Research", "Prototyping"],
    },
    en: {
      company: "Karri by Transvip",
      position: "Lead UX — Shoppers Vertical",
      period: "2022 — 2023",
      location: "Chile · Remote",
      stage: "Mobility · Shoppers",
      context:
        "Shoppers lacked earnings transparency: high onboarding friction and funnel drop-off.",
      role:
        "Vertical UX lead: calculator, notifications, and research-led prioritization.",
      impact: "+35% activation · +58% engagement · −42% onboarding drop-off",
      achievements: [
        "Earnings calculator and financial transparency",
        "Notification hub and onboarding optimization",
        "Improvement prioritization with internal and external tests",
      ],
      tools: ["Figma", "Analytics", "User Research", "Prototyping"],
    },
  },
  {
    logo: portfolioImages.brands.walmart,
    es: {
      company: "Walmart Chile (Data Conversion Service)",
      position: "Diseñador web",
      period: "May — Jun 2022",
      location: "Chile",
      stage: "Retail · Enterprise",
      context: "Canales digitales de un retailer enterprise con plazos cortos y alto volumen.",
      role: "Diseño y contenido web en equipo de conversión y diseño.",
      impact: "Entregables web de corto plazo alineados a canales del retailer",
      achievements: [
        "Diseño y contenido para canales digitales",
        "Colaboración con equipo de diseño en entregables de alta rotación",
      ],
      tools: ["Figma", "Adobe Creative Suite"],
    },
    en: {
      company: "Walmart Chile (Data Conversion Service)",
      position: "Web Designer",
      period: "May — Jun 2022",
      location: "Chile",
      stage: "Retail · Enterprise",
      context: "Enterprise retailer digital channels with short timelines and high volume.",
      role: "Web design and content on the conversion and design team.",
      impact: "Short-turnaround web deliverables aligned to retailer channels",
      achievements: [
        "Design and content for digital channels",
        "Collaboration with design on high-rotation deliverables",
      ],
      tools: ["Figma", "Adobe Creative Suite"],
    },
  },
  {
    logo: portfolioImages.brands.havas,
    es: {
      company: "Havas Group Chile",
      position: "Desarrollador web · Jornada completa",
      period: "Nov 2021 — Abr 2022 · 6 meses",
      location: "Chile",
      stage: "Agencia · Telco",
      context: "Equipo de mejoras Claro Chile: navegación, tienda y comunicaciones diarias.",
      role: "Maquetación y rediseño front en el squad de mejoras del operador.",
      impact: "Navegación principal y tienda de equipos rediseñadas · landings y mailings diarios",
      achievements: [
        "Rediseño de navegación principal de Claro Chile",
        "Rediseño de la tienda de equipos",
        "HTML de landings, mailings y comunicaciones diarias",
      ],
      tools: ["HTML", "CSS Flexbox", "Wireframing", "Responsive"],
    },
    en: {
      company: "Havas Group Chile",
      position: "Web Developer · Full-time",
      period: "Nov 2021 — Apr 2022 · 6 mos",
      location: "Chile",
      stage: "Agency · Telco",
      context: "Claro Chile improvements team: navigation, store, and daily communications.",
      role: "Front-end layout and redesign on the carrier improvements squad.",
      impact: "Main navigation and device store redesigned · daily landings and mailings",
      achievements: [
        "Claro Chile main navigation redesign",
        "Device store redesign",
        "HTML for landings, mailings, and daily communications",
      ],
      tools: ["HTML", "CSS Flexbox", "Wireframing", "Responsive"],
    },
  },
  {
    logo: portfolioImages.brands.valuesite,
    es: {
      company: "Valuesite Ltda",
      position: "Líder de diseño · Jornada completa",
      period: "Jun — Nov 2021 · 6 meses",
      location: "Chile",
      stage: "Producto · Design Ops",
      context:
        "App y landing para vertical de movilidad/servicios con necesidad de sistema y KIT UI.",
      role:
        "Liderazgo de diseño, marketing y comercial bajo estrategia ágil centrada en personas.",
      impact: "Design system AquiVoy Express · KIT UI · prototipo AVEM en Figma",
      achievements: [
        "Lineamientos del sistema de diseño de AquiVoy Express y KIT UI",
        "Prototipo interactivo AVEM Landing Page publicado en Figma",
        "Mejora continua de UX en productos digitales del portafolio",
      ],
      tools: ["Figma", "Design Systems", "Agile"],
    },
    en: {
      company: "Valuesite Ltda",
      position: "Design Lead · Full-time",
      period: "Jun — Nov 2021 · 6 mos",
      location: "Chile",
      stage: "Product · Design Ops",
      context:
        "App and landing for a mobility/services vertical needing a system and UI kit.",
      role:
        "Led design, marketing, and commercial under a people-centered agile strategy.",
      impact: "AquiVoy Express design system · KIT UI · AVEM Figma prototype",
      achievements: [
        "Design system guidelines for AquiVoy Express and KIT UI",
        "Navigable AVEM Landing Page prototype on Figma",
        "Continuous UX improvement across the product portfolio",
      ],
      tools: ["Figma", "Design Systems", "Agile"],
    },
  },
  {
    logo: portfolioImages.brands.marana,
    es: {
      company: "Maraña Agencia Digital",
      position: "Diseñador UX UI · Jornada completa",
      period: "Feb 2020 — May 2021 · 1 año 4 meses",
      location: "Región Metropolitana, Chile",
      stage: "Agencia · Digitalización",
      context:
        "Clientes que necesitaban digitalizar negocios e instituciones desde la propuesta de valor.",
      role: "UX/UI y facilitación de workshops de diseño con foco comercial.",
      impact: "De propuesta de valor a productos digitales entregables para clientes de agencia",
      achievements: [
        "Asesor de marketing digital: e-commerce, CMS y planes de marketing",
        "Workshops con clientes en digitalización de negocios e instituciones",
        "Diseño de valor a producto/servicio digital",
        "Wireframing y entregables UX/UI para el pipeline de agencia",
      ],
      tools: ["Figma", "Design Thinking", "Workshops", "Wireframing"],
    },
    en: {
      company: "Maraña Agencia Digital",
      position: "UX UI Designer · Full-time",
      period: "Feb 2020 — May 2021 · 1 yr 4 mos",
      location: "Santiago Metropolitan Region, Chile",
      stage: "Agency · Digitization",
      context:
        "Clients digitizing businesses and institutions from the value proposition up.",
      role: "UX/UI and design workshop facilitation with a commercial focus.",
      impact: "From value proposition to shippable digital products for agency clients",
      achievements: [
        "Digital marketing advisor: e-commerce, CMS, and marketing plans",
        "Workshops for business and institution digitization",
        "Design from value proposition to digital product/service",
        "Wireframing and UX/UI deliverables for the agency pipeline",
      ],
      tools: ["Figma", "Design Thinking", "Workshops", "Wireframing"],
    },
  },
  {
    logo: portfolioImages.brands.pareti,
    es: {
      company: "Empresas Pareti",
      position: "Community Manager · Jornada completa",
      period: "Oct 2019 — Feb 2020 · 5 meses",
      location: "Región de Valparaíso, Chile",
      stage: "Retail · Growth",
      context: "Retail y e-commerce con necesidad de SEO/SEM y presencia digital coherente.",
      role: "Contenidos y desarrollo web accesible junto a Diseño y E-commerce.",
      impact: "SEO/SEM alineados · e-commerce accesible y responsivo",
      achievements: [
        "Branding y comunidad: informe constante de KPI vía Analytics, Ads e Insights",
        "Contenidos SEO y SEM con estrategia conjunta Diseño + E-commerce",
        "Desarrollo web de e-commerce accesible y responsivo",
        "Coordinación de comunicaciones digitales",
      ],
      tools: ["Adobe Creative Suite", "Google Analytics", "SEO", "SEM"],
    },
    en: {
      company: "Empresas Pareti",
      position: "Community Manager · Full-time",
      period: "Oct 2019 — Feb 2020 · 5 mos",
      location: "Valparaíso Region, Chile",
      stage: "Retail · Growth",
      context: "Retail and e-commerce needing SEO/SEM and coherent digital presence.",
      role: "Content and accessible web development with Design and E-commerce.",
      impact: "Aligned SEO/SEM · accessible, responsive e-commerce",
      achievements: [
        "Branding and community: ongoing KPI reporting via Analytics, Ads, and Insights",
        "SEO and SEM content with Design + E-commerce strategy",
        "Accessible, responsive e-commerce web development",
        "Coordinated digital communications",
      ],
      tools: ["Adobe Creative Suite", "Google Analytics", "SEO", "SEM"],
    },
  },

  {
    es: {
      company: "Nano Tech",
      position: "Diseñador",
      period: "Abr 2019 — Jul 2019",
      location: "Chile",
      stage: "Producto · E-commerce",
      context: "Marca B2B y B2C que necesitaba branding y UX de e-commerce.",
      role: "Dirigí el desarrollo del branding y la UX del e-commerce.",
      impact: "Branding y UX de e-commerce para marca B2B y B2C",
      achievements: [
        "Branding de marca B2B y B2C",
        "UX del e-commerce",
      ],
      tools: ["Branding", "UX", "E-commerce"],
    },
    en: {
      company: "Nano Tech",
      position: "Designer",
      period: "Apr 2019 — Jul 2019",
      location: "Chile",
      stage: "Product · E-commerce",
      context: "B2B and B2C brand that needed branding and e-commerce UX.",
      role: "Led branding development and e-commerce UX.",
      impact: "Branding and e-commerce UX for a B2B and B2C brand",
      achievements: [
        "B2B and B2C brand branding",
        "E-commerce UX",
      ],
      tools: ["Branding", "UX", "E-commerce"],
    },
  },
  {
    es: {
      company: "Monday.com",
      position: "Partner",
      period: "Ene 2019 — May 2019",
      location: "Chile",
      stage: "Consultoría · Digitalización",
      context: "Socio de Monday.com, empresa dedicada a la digitalización de negocios.",
      role: "Dirigí proyectos de transformación digital con clientes de Monday y diseñé estrategias de marketing digital.",
      impact: "Proyectos de transformación digital y estrategias de marketing digital",
      achievements: [
        "Dirección de proyectos de transformación digital con clientes de Monday",
        "Diseño de estrategias de marketing digital",
      ],
      tools: ["Marketing digital", "Transformación digital"],
    },
    en: {
      company: "Monday.com",
      position: "Partner",
      period: "Jan 2019 — May 2019",
      location: "Chile",
      stage: "Consulting · Digitization",
      context: "Partner at Monday.com, a company focused on business digitization.",
      role: "Led digital transformation projects with Monday clients and designed digital marketing strategies.",
      impact: "Digital transformation projects and digital marketing strategies",
      achievements: [
        "Led digital transformation projects with Monday clients",
        "Designed digital marketing strategies",
      ],
      tools: ["Digital marketing", "Digital transformation"],
    },
  },
  {
    es: {
      company: "La Negra Colorá",
      position: "Editor digital",
      period: "Jun 2017 — Abr 2019",
      location: "Chile",
      stage: "Editorial",
      context: "Medio digital con necesidad de marca, foto y contenidos.",
      role: "Colaborador como fotoreportero, diseñador multimedia y editor de contenidos.",
      impact: "Manual de marca, RR.SS. e investigaciones periodísticas",
      achievements: [
        "Manual de marca y piezas gráficas",
        "Administración de RR.SS. y foto-reportaje",
        "Investigaciones periodísticas",
      ],
      tools: ["Marca", "RR.SS", "Fotografía"],
    },
    en: {
      company: "La Negra Colorá",
      position: "Digital editor",
      period: "Jun 2017 — Apr 2019",
      location: "Chile",
      stage: "Editorial",
      context: "Digital outlet needing brand, photo, and content.",
      role: "Contributor as photo reporter, multimedia designer, and content editor.",
      impact: "Brand manual, social, and journalistic investigations",
      achievements: [
        "Brand manual and graphic pieces",
        "Social media management and photo reporting",
        "Journalistic investigations",
      ],
      tools: ["Brand", "Social", "Photography"],
    },
  },
  {
    es: {
      company: "Niño Héroe",
      position: "Director de fotografía",
      period: "Oct 2017",
      location: "Chile",
      stage: "Cine",
      context: "Obra de formato corto.",
      role: "Técnico de iluminación y fotografía; dirección de fotografía.",
      impact: "Premio del Público Humberto Douvachelle, jul 2017",
      achievements: [
        "Premio del Público, jul 2017, Humberto Douvachelle",
      ],
      tools: ["Dirección de fotografía"],
    },
    en: {
      company: "Niño Héroe",
      position: "Director of Photography",
      period: "Oct 2017",
      location: "Chile",
      stage: "Film",
      context: "Short-format work.",
      role: "Lighting and photography technician; director of photography.",
      impact: "Audience Award Humberto Douvachelle, Jul 2017",
      achievements: [
        "Audience Award, Jul 2017, Humberto Douvachelle",
      ],
      tools: ["Cinematography"],
    },
  },
  {
    es: {
      company: "La Voz de los Cerros",
      position: "Colaborador",
      period: "2015–2017",
      location: "Valparaíso, Chile",
      stage: "Medio · Comunitario",
      context:
        "Medio de comunicación popular y comunitario de Valparaíso.",
      role:
        "Trabajo colaborativo: contenido escrito, audiovisual y debate público.",
      impact: "Debate público socializado a través de RR.SS.",
      achievements: [
        "Contenido escrito y audiovisual",
        "Debate público socializado en RR.SS. (Instagram @la.voz.de.los.cerros)",
      ],
      tools: ["Instagram", "RR.SS"],
    },
    en: {
      company: "La Voz de los Cerros",
      position: "Contributor",
      period: "2015–2017",
      location: "Valparaíso, Chile",
      stage: "Media · Community",
      context: "Popular community media outlet in Valparaíso.",
      role: "Collaborative work: written and audiovisual content, and public debate.",
      impact: "Public debate shared on social media",
      achievements: [
        "Written and audiovisual content",
        "Public debate shared on social (Instagram @la.voz.de.los.cerros)",
      ],
      tools: ["Instagram", "Social"],
    },
  },
  {
    es: {
      company: "Teatro Di Popolo",
      position: "Fotógrafo audiovisual",
      period: "Jul 2016 — Oct 2016",
      location: "Chile",
      stage: "Fotografía",
      context: "Registro fotográfico y audiovisual para la compañía.",
      role: "Registro fotográfico y audiovisual, y teaser para teatros de Chile.",
      impact: "Registro y teaser Sacco-Vanzetti",
      achievements: [
        "Registro fotográfico y audiovisual de la Cía. Teatro Di Popolo",
        "Teaser audiovisual para teatros de Chile",
        "Galería Behance Sacco-Vanzetti",
      ],
      tools: ["Fotografía", "Audiovisual", "Behance"],
    },
    en: {
      company: "Teatro Di Popolo",
      position: "Audiovisual photographer",
      period: "Jul 2016 — Oct 2016",
      location: "Chile",
      stage: "Photography",
      context: "Photographic and audiovisual record for the company.",
      role: "Photo and audiovisual coverage, plus a teaser for theaters in Chile.",
      impact: "Sacco-Vanzetti coverage and teaser",
      achievements: [
        "Photographic and audiovisual record for Cía. Teatro Di Popolo",
        "Audiovisual teaser for theaters in Chile",
        "Behance gallery Sacco-Vanzetti",
      ],
      tools: ["Photography", "Audiovisual", "Behance"],
    },
  },
];

export function getExperiences(language: Language): ExperienceEntry[] {
  return experienceCatalog.map((item) => ({
    ...item[language],
    logo: item.logo,
    companyId: item.companyId,
    isCurrent: item.isCurrent,
    evidenceSectionId: item.evidenceSectionId,
    evidenceCta: item.evidenceCta,
  }));
}

/** @deprecated Use getExperiences(language) */
export const experiences = getExperiences("es");
