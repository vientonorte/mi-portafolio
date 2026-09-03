import {
  karriCalculadoraStub,
  karriDesignSprintStub,
  karriNotificacionesStub,
} from "./karri-project-stubs";
import { FIGMA_SLIDES_SURA_COLOMBIA } from "./figma-embeds";
import type { FigmaEmbedConfig } from "./figma-embeds";
import type { UpcomingFigmaLink } from "./upcoming-cases";
import { RIA_US_PROTO_URL, TRANSVIP_APP_FIGMA_URL } from "./value-content-arsenal";
import { portfolioImages } from "../lib/portfolio-image-urls";
import {
  khuroItem,
  paretiKhuroGallery,
  paretiMockupUrls,
} from "./khuro-portfoliobox";

const {
  sura: suraImg,
  transvip: transvipImg,
  framework: frameworkImg,
} = portfolioImages;

const suraRiaOnboarding = suraImg.riaOnboarding;
const suraWebPrototype = suraImg.webPrototype;
const suraAnalyticsGa4 = suraImg.analyticsGa4;
const suraHotjarDashboard = suraImg.hotjarDashboard;
const suraBenchmarkNavigation = suraImg.benchmarkNavigation;
const suraBookingFlowchart = suraImg.bookingFlowchart;
const suraOnboardingFlags = suraImg.onboardingFlags;
const suraComponentPipeline = suraImg.componentPipeline;
const transvipDesktop = transvipImg.appDesktop;
const transvipMobile = transvipImg.appMobile;
const transvipProductVision = transvipImg.productVision;
const transvipFigmaPrototype = transvipImg.figmaPrototype;
const uxProcessDiagram = suraImg.uxProcess;
const uxValueChain = frameworkImg.uxValueChain;
const uxSprintDiagram = suraImg.uxProcess;

export interface Process {
  name: string;
  description: string;
  tools?: string[];
}

export interface ProjectDetails {
  challenge?: string;
  solution?: string;
  metrics?: string[];
  learnings?: string[];
  mockups?: string[]; // Array de URLs de mockups/evidencias visuales
}

export interface EnhancedProject {
  // Nivel 1: EMPRESA
  id?: string;
  company: string;
  companyLogo?: string;
  role: string;
  period: string;
  projectName: string;
  description: string;
  descriptionEN?: string;
  image?: string;
  tags: string[];
  externalLink?: string; // External project link
  /** Figma Slides / FigJam embebido en detalle de proyecto */
  figmaEmbed?: FigmaEmbedConfig;
  /** Derived at render from figma-assets-ssot (foCaseId). */
  figmaLinks?: UpcomingFigmaLink[];

  // Nivel 2: PROCESOS
  processes?: Process[]; // Made optional to prevent errors when undefined
  teamSize?: string;
  
  // Nivel 3: DETALLES
  details: ProjectDetails;
}

export interface LocalizedCopy {
  es: string;
  en: string;
}

// Nueva interfaz para Company Hub
export interface CompanyHub {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  period: string;
  totalProjects: number;
  description: LocalizedCopy;
  highlights: { es: string[]; en: string[] };
  image?: string;
  challenge: {
    title: LocalizedCopy;
    problem: LocalizedCopy;
    solution: LocalizedCopy;
  };
  projectsSection: {
    title: LocalizedCopy;
    description: LocalizedCopy;
  };
  gallery: {
    description: LocalizedCopy;
  };
  projects: EnhancedProject[];
  // Datos específicos de metodología por empresa
  methodologyStats?: {
    yearsExperience: string;
    experienceContext: {
      es: string;
      en: string;
    };
    experienceDetail: {
      es: string;
      en: string;
    };
    // Stats adicionales opcionales
    teachingEvaluation?: {
      value: string;
      context: {
        es: string;
        en: string;
      };
      detail: {
        es: string;
        en: string;
      };
    };
    studentsImpact?: {
      value: string;
      context: {
        es: string;
        en: string;
      };
      detail: {
        es: string;
        en: string;
      };
    };
    regionalReach?: {
      value: string;
      context: {
        es: string;
        en: string;
      };
      detail: {
        es: string;
        en: string;
      };
    };
  };
}

// ============================================
// SURA INVESTMENTS - Company Hub
// ============================================

export const suraHub: CompanyHub = {
  id: "sura-investments",
  name: "SURA Investments",
  logo: suraRiaOnboarding,
  industry: "Fintech",
  period: "2023 - Presente",
  totalProjects: 5,
  description: {
    es: "Lideré la implementación de UX Enterprise para productos financieros digitales a nivel regional, aplicando Design Thinking adaptado a contextos corporativos y regulaciones del sector.",
    en: "Led UX Enterprise implementation for digital financial products across the region, applying Design Thinking adapted to corporate contexts and sector regulations.",
  },
  highlights: {
    es: [
      "Framework UX Enterprise implementado en 5+ países",
      "Dashboard de inversiones con +45% mejora en consultas",
      "Ecosistema digital: +20 sitios unificados con CMS",
      "Onboarding: -40% tiempo (7-11 min vs 15+ min) + 6 casos de error",
      "POC IA: dashboard de análisis y automatización de procesos",
    ],
    en: [
      "UX Enterprise framework implemented in 5+ countries",
      "Investment dashboard with +45% query improvement",
      "Digital ecosystem: 20+ unified sites with CMS",
      "Onboarding: -40% time (7-11 min vs 15+ min) + 6 error cases",
      "AI POC: analysis dashboard and process automation",
    ],
  },
  image: suraRiaOnboarding,
  challenge: {
    title: {
      es: "Modernización de experiencia financiera enterprise",
      en: "Enterprise financial experience modernization",
    },
    problem: {
      es: "Múltiples productos financieros digitales sin experiencia unificada a nivel regional: sitios fragmentados, plataformas de inversión complejas y regulaciones distintas por país.",
      en: "Multiple digital financial products without a unified regional experience: fragmented websites, complex investment platforms, and varying regulations per country.",
    },
    solution: {
      es: "Framework UX Enterprise con Design Thinking adaptado: lineamientos escalables, ecosistema digital unificado (+20 sitios, CMS, Design System) y plataformas de inversiones y RIA diseñadas con validación continua.",
      en: "UX Enterprise framework with adapted Design Thinking: scalable guidelines, unified digital ecosystem (20+ sites, CMS, Design System), and investment and RIA platforms designed with continuous validation.",
    },
  },
  projectsSection: {
    title: {
      es: "Iniciativas UX en el sector financiero",
      en: "UX initiatives in financial services",
    },
    description: {
      es: "Cinco proyectos que aplican el framework de diseño en contextos enterprise: estrategia regional, inversiones, ecosistema digital, plataforma RIA en EE.UU. e IA para automatización de procesos.",
      en: "Five projects applying the design framework in enterprise contexts: regional strategy, investments, digital ecosystem, US RIA platform, and AI process automation.",
    },
  },
  gallery: {
    description: {
      es: "Mockups, prototipos y diagramas de onboarding, dashboards, ecosistema digital y plataforma RIA.",
      en: "Mockups, prototypes, and diagrams of onboarding, dashboards, digital ecosystem, and RIA platform.",
    },
  },
  projects: [
    {
      // ROL 1: Lead UX - Estrategia Digital Regional
      id: "sura-ux-enterprise",
      company: "SURA Investments",
      companyLogo: suraRiaOnboarding,
      role: "Lead UX | Estrategia Digital",
      period: "2023 - Presente",
      projectName: "Implementación UX Enterprise Regional",
      description: "Liderazgo en la implementación de experiencia usuaria para iniciativas regionales y locales a nivel tecnológico en el sector financiero.",
      descriptionEN: "Led user experience implementation for regional and local technology initiatives in the financial sector.",
      image: uxProcessDiagram,
      tags: ["Fintech", "Enterprise", "Design Thinking", "Regional"],
      figmaEmbed: FIGMA_SLIDES_SURA_COLOMBIA,

      processes: [
        {
          name: "Discovery & Research",
          description: "Research de usuarios en contextos financieros enterprise. Entrevistas con stakeholders regionales y análisis de necesidades locales.",
          tools: ["User Interviews", "Journey Mapping", "Analytics"],
        },
        {
          name: "Design Thinking Adaptado",
          description: "Facilitación de workshops de Design Thinking adaptados a procesos corporativos y regulaciones financieras.",
          tools: ["Miro", "FigJam", "Workshop Facilitation"],
        },
        {
          name: "Lineamientos UX/UI",
          description: "Diseño y documentación de lineamientos de experiencia e interfaz para desarrollo evolutivo de productos.",
          tools: ["Figma", "Design Systems", "Documentation"],
        },
        {
          name: "Implementación & Handoff",
          description: "Colaboración con equipos de desarrollo para implementación correcta de lineamientos UX en iniciativas tecnológicas.",
          tools: ["Figma Dev Mode", "Confluence", "Jira"],
        },
      ],
      teamSize: "Cross-functional (10+ personas)",
      
      details: {
        challenge: "Implementar experiencia usuaria coherente en múltiples iniciativas tecnológicas a nivel regional, considerando diferencias culturales y regulatorias de cada país.",
        solution: "Desarrollo de framework de Design Thinking adaptado a contextos enterprise, con lineamientos UX/UI escalables que permiten consistencia manteniendo flexibilidad local.",
        metrics: [
          "Framework implementado en 5+ países de la región",
          "Reducción de 40% en tiempo de discovery de nuevas iniciativas",
          "Alineación de equipos multidisciplinarios en procesos UX",
        ],
        learnings: [
          "La adaptación cultural es clave en proyectos regionales",
          "Design Thinking funciona en enterprise con la estructura correcta",
          "La documentación de lineamientos debe ser viva y evolutiva",
        ],
        mockups: [uxProcessDiagram, uxValueChain, uxSprintDiagram],
      },
    },
    {
      // PROYECTO 2 dentro de SURA: Plataforma de Inversiones
      id: "sura-inversiones-dashboard",
      company: "SURA Investments",
      companyLogo: suraRiaOnboarding,
      role: "Lead UX | Asociado Estrategia Digital",
      period: "2023 - 2024",
      projectName: "Rediseño Plataforma de Inversiones Digital",
      description: "Mejora de experiencia usuaria en plataforma de inversiones y RIA para clientes institucionales y retail — progressive disclosure, dashboards y onboarding multi-perfil.",
      descriptionEN: "Improved UX on the investment platform and RIA for institutional and retail clients — progressive disclosure, dashboards, and multi-profile onboarding.",
      image: suraRiaOnboarding,
      tags: ["Investment Platform", "Financial UX", "Dashboard Design"],
      
      processes: [
        {
          name: "User Research Financiero",
          description: "Investigación de usuarios con perfiles de inversores institucionales y retail. Análisis de necesidades y pain points en gestión de portafolios.",
          tools: ["User Interviews", "Contextual Inquiry", "Analytics"],
        },
        {
          name: "Information Architecture",
          description: "Reestructuración de arquitectura de información para datos financieros complejos. Priorización de métricas clave y creación de jerarquías visuales.",
          tools: ["Card Sorting", "Tree Testing", "Sitemap"],
        },
        {
          name: "Dashboard Design",
          description: "Diseño de dashboards interactivos con visualizaciones de datos financieros. Focus en scanability y accesibilidad de información crítica.",
          tools: ["Figma", "Data Visualization", "Recharts"],
        },
        {
          name: "Testing & Validation",
          description: "Testing de usabilidad con usuarios reales. Validación de comprensión de información financiera y flujos de decisión.",
          tools: ["Usability Testing", "A/B Testing", "User Feedback"],
        },
      ],
      teamSize: "8 personas (Product, UX, Dev, QA)",
      
      details: {
        challenge: "Simplificar la visualización de información financiera compleja sin perder profundidad de datos necesaria para toma de decisiones de inversión.",
        solution: "Sistema de progressive disclosure con niveles de información adaptados a expertise del usuario. Dashboards configurables con métricas personalizables.",
        metrics: [
          "Reducción de 45% en tiempo de consulta de información",
          "Aumento de 30% en engagement de usuarios retail",
          "NPS de 72 puntos (mejora de 25 puntos)",
        ],
        learnings: [
          "Los usuarios financieros valoran la profundidad sobre la simplicidad excesiva",
          "Progressive disclosure es clave para audiencias heterogéneas",
          "Las visualizaciones deben ser configurables para diferentes perfiles",
        ],
        mockups: [suraRiaOnboarding, suraComponentPipeline],
      },
    },
    {
      // PROYECTO 3 dentro de SURA: Ecosistema Digital Sitios Públicos
      id: "sura-ecosistema-digital",
      company: "SURA Investments",
      companyLogo: suraRiaOnboarding,
      role: "Lead UX | Digital Strategy & Onboarding",
      period: "2023 - 2025",
      projectName: "Ecosistema Digital Sitios Públicos & Onboarding",
      description: "Rediseño completo del ecosistema de +20 sitios web públicos para SURA Investments Regional, implementando arquitectura unificada, CMS, Design System y flujos de onboarding digital optimizados con manejo de casos de error.",
      descriptionEN: "Complete redesign of 20+ public websites for SURA Investments Regional: unified architecture, CMS, Design System, and optimized digital onboarding with error handling.",
      image: suraBenchmarkNavigation,
      tags: ["Web Ecosystem", "Digital Strategy", "CMS", "Onboarding", "Design System"],
      
      processes: [
        {
          name: "Discovery & Research Regional",
          description: "Auditoría de +20 sitios web públicos sin identidad unificada. Research con stakeholders y análisis de fragmentación de infraestructura digital.",
          tools: ["Heuristic Evaluation", "Stakeholder Interviews", "Content Audit"],
        },
        {
          name: "Arquitectura de Información & CMS",
          description: "Diseño de arquitectura unificada para ecosistema web. Implementación de CMS y gobierno de contenidos para autonomía de negocio.",
          tools: ["Information Architecture", "CMS Strategy", "Content Governance"],
        },
        {
          name: "Design System & Atomic Design",
          description: "Creación de Design System completo con Atomic Design. Sistema de colores SURA, tipografía Inter, componentes reutilizables (Cards, Badges, Progress, Icons).",
          tools: ["Figma", "Atomic Design", "Design Tokens", "Component Library"],
        },
        {
          name: "UX/UI Onboarding Digital",
          description: "Diseño de flujo 'Hazte cliente' optimizado: 4 pasos (Ingreso de datos, Validación de correo, Verificación de identidad, Confirmación) con validaciones en tiempo real y manejo completo de casos de error.",
          tools: ["User Flows", "Prototyping", "Micro-interactions", "Form Design", "Error Handling"],
        },
        {
          name: "Implementación Iterativa Regional",
          description: "Proceso iterativo incremental (sprints de 3 semanas) con validación continua. Fase 1 Chile implementada, Fase 2 regional en curso.",
          tools: ["Agile", "Sprint Planning", "User Validation", "Rollout Strategy"],
        },
      ],
      teamSize: "15+ personas (UX, UI, Dev, Content, PO, Stakeholders)",
      
      details: {
        challenge: "+20 sitios web públicos fragmentados sin identidad de marca unificada, sin CMS ni gobierno de contenidos, con dependencia total de TI para cualquier cambio. Sitio web identificado como touchpoint más importante según research de usuarios. Necesidad de onboarding digital robusto con manejo de casos de error y bloqueos por cumplimiento.",
        solution: "Ecosistema digital unificado con arquitectura coherente, CMS implementado, Design System completo con Atomic Design, y flujo de onboarding 'Hazte cliente' optimizado con 4 pasos claros, validaciones en tiempo real y manejo exhaustivo de casos de error (usuario ya cliente, bloqueado por cumplimiento, error de identidad, error de servicio, error código verificación, error generación preguntas). Proceso iterativo de 3 semanas con sprints de contenidos de 2 semanas y validación continua.",
        metrics: [
          "Unificación de +20 sitios bajo arquitectura coherente",
          "CMS implementado: autonomía de negocio para gestión de contenidos",
          "Flujo onboarding: 4 pasos claros (Ingreso, Validación email, Verificación identidad, Confirmación)",
          "Tiempo reducido: 7-11 min vs 15+ min previo (-40% tiempo)",
          "Design System: 50+ componentes reutilizables con Atomic Design",
          "6 casos de error documentados y diseñados con UX claro",
          "Fase 1 Chile completada (Sep 24 - Oct 25), Fase 2 regional en curso",
        ],
        learnings: [
          "La fragmentación digital genera inconsistencia de marca y dependencia operativa",
          "CMS y gobierno de contenidos son críticos para autonomía de negocio",
          "Atomic Design facilita escalabilidad en ecosistemas multi-sitio",
          "El manejo de errores es tan importante como el flujo feliz en onboarding financiero",
          "Validación continua con ED y clientes reduce riesgos en implementación regional",
          "Proceso iterativo de 3 semanas permite ajustes ágiles en contexto enterprise",
          "Regulaciones financieras requieren casos de error específicos (cumplimiento, bloqueos)",
        ],
        mockups: [suraOnboardingFlags, suraRiaOnboarding, suraComponentPipeline],
      },
    },
    {
      // PROYECTO 4 dentro de SURA: RIA SURA US
      id: "sura-ria-us",
      company: "SURA Investments",
      companyLogo: suraRiaOnboarding,
      role: "Lead UX/UI Designer",
      period: "2024 - 2025",
      externalLink: RIA_US_PROTO_URL,
      projectName: "Diseño UX UI RIA SURA US",
      description: "Diseño completo de experiencia e interfaz para la plataforma RIA (Registered Investment Advisor) de SURA en Estados Unidos. Proyecto end-to-end desde arquitectura de información hasta especificaciones UI, incluyendo flujos de autenticación, onboarding de asesores y middle office, dashboard de inversiones y sistema completo de comunicaciones.",
      descriptionEN: "End-to-end UX/UI design for SURA's RIA (Registered Investment Advisor) platform in the United States: information architecture, authentication, advisor onboarding, investment dashboard, and communications.",
      image: portfolioImages.sura.celulaEvolutivaFlow,
      tags: ["RIA Platform", "Financial UX", "Onboarding", "Multi-role System", "US Market"],
      
      processes: [
        {
          name: "Arquitectura de Información (AI)",
          description: "Construcción del árbol de contenidos completo de la plataforma RIA, definiendo la estructura de información para múltiples perfiles de usuario (asesores, middle office, clientes).",
          tools: ["Content Inventory", "Information Architecture", "Sitemap", "SharePoint"],
        },
        {
          name: "UX Research & Flows",
          description: "Investigación de usuarios y definición de perfiles (asesores, middle office). Creación de diagramas de flujo para cada journey, identificando touchpoints críticos y casos de uso.",
          tools: ["User Personas", "User Flows", "Journey Mapping", "Figma"],
        },
        {
          name: "Diseño de Autenticación & Seguridad",
          description: "Diseño de flujos de autenticación completos: inicio de sesión, recuperación de contraseña, y creación de cuenta con prototipos interactivos de alta fidelidad que incluyen validaciones y micro-interacciones.",
          tools: ["Figma Prototyping", "Security UX", "Form Design", "Micro-interactions"],
        },
        {
          name: "Onboarding Multi-perfil",
          description: "Diseño de experiencias de onboarding diferenciadas para asesores y middle office. Prototipos interactivos que guían a cada perfil según sus necesidades específicas y niveles de acceso.",
          tools: ["Onboarding UX", "Role-based Design", "Interactive Prototyping", "Figma"],
        },
        {
          name: "Dashboard de Inversiones",
          description: "Diseño de dashboard centralizado con visualizaciones de datos financieros, métricas clave de portafolios y herramientas de gestión. Enfoque en scanability y jerarquía de información crítica.",
          tools: ["Dashboard Design", "Data Visualization", "Financial UX", "Figma"],
        },
        {
          name: "Wireflows para Desarrollo",
          description: "Creación de wireflows detallados que combinan wireframes y flujos de usuario, documentando la lógica de navegación y decisiones de UX para facilitar el handoff a desarrollo.",
          tools: ["Wireflows", "Documentation", "Dev Handoff", "Figma"],
        },
        {
          name: "Especificaciones UI & Design System",
          description: "Documentación exhaustiva de especificaciones de interfaz: spacing, tipografía, colores, componentes, estados interactivos. Definición de tokens de diseño y guías de uso para desarrollo.",
          tools: ["Design Specs", "Component Library", "Design Tokens", "Style Guide"],
        },
        {
          name: "Sistema de Comunicaciones",
          description: "Diseño de plantillas de correos electrónicos transaccionales y sistema de FAQ. Tono de voz adaptado al mercado estadounidense y compliance financiero.",
          tools: ["Email Design", "Content Design", "FAQ Structure", "Compliance UX"],
        },
      ],
      teamSize: "12+ personas (UX, UI, Product, Dev, Compliance, Stakeholders)",
      
      details: {
        challenge: "Diseñar una plataforma RIA completa para el mercado estadounidense desde cero, cumpliendo con regulaciones financieras de US, manejando múltiples perfiles de usuario con necesidades diferenciadas (asesores, middle office), y creando un sistema robusto que soporte flujos de autenticación, onboarding, gestión de inversiones y comunicaciones.",
        solution: "Enfoque end-to-end con arquitectura de información sólida, diseño de flujos específicos por rol, sistema de autenticación robusto con casos de error, dashboards financieros con progressive disclosure, wireflows detallados para desarrollo, especificaciones UI exhaustivas y sistema de comunicaciones completo. Todo documentado con prototipos interactivos de alta fidelidad en Figma.",
        metrics: [
          "Árbol de contenidos completo con arquitectura de información (AI)",
          "8 prototipos interactivos de alta fidelidad diseñados",
          "3 flujos de autenticación completos (login, recuperación, creación)",
          "2 experiencias de onboarding diferenciadas (asesor, middle office)",
          "Dashboard de inversiones con visualizaciones financieras",
          "Wireflows detallados para handoff a desarrollo",
          "Especificaciones UI completas con design tokens",
          "Sistema de plantillas de correo + FAQ estructurada",
        ],
        learnings: [
          "El mercado financiero US requiere compliance específico en UX",
          "Sistemas multi-rol necesitan arquitectura de información clara desde el inicio",
          "Los wireflows reducen malentendidos en handoff a desarrollo",
          "Las especificaciones UI exhaustivas aceleran la implementación",
          "El diseño de casos de error es crítico en plataformas financieras",
          "La documentación visual (prototipos + specs) genera alineación de equipos",
        ],
        mockups: [portfolioImages.sura.celulaEvolutivaFlow, suraRiaOnboarding],
      },
    },
    {
      id: "sura-ia-automation-dashboard",
      company: "SURA Investments",
      companyLogo: suraRiaOnboarding,
      role: "Lead UX · Estrategia Digital",
      period: "2025 - Presente",
      projectName: "Dashboard de Análisis con IA",
      description:
        "POC inicial de dashboard para análisis y automatización de procesos con IA — exploración de flujos, métricas operativas y orquestación de tareas en contexto enterprise.",
      descriptionEN:
        "Initial POC dashboard for AI-driven analysis and process automation — workflow exploration, operational metrics, and task orchestration in an enterprise context.",
      image: portfolioImages.sura.iaAutomationDashboard,
      tags: ["AI", "Automation", "Dashboard", "POC", "Process Design", "Enterprise"],
      externalLink: "https://badge-sweet-21070688.figma.site",
      processes: [
        {
          name: "Discovery & Process Mapping",
          description:
            "Mapeo de procesos candidatos a automatización y definición de métricas de análisis para equipos de estrategia digital.",
          tools: ["Service Blueprint", "Journey Mapping", "Stakeholder Interviews"],
        },
        {
          name: "AI Workflow UX",
          description:
            "Diseño de flujos de orquestación IA: entradas, validaciones humanas, salidas accionables y estados de confianza.",
          tools: ["Figma", "Prototyping", "Flow Diagrams"],
        },
        {
          name: "Dashboard & Analytics UX",
          description:
            "POC de dashboard con jerarquía visual para análisis operativo, alertas y seguimiento de automatizaciones.",
          tools: ["Figma Sites", "Data Visualization", "Design Tokens"],
        },
      ],
      teamSize: "Exploración individual · validación con stakeholders",
      details: {
        challenge:
          "Explorar cómo integrar IA y automatización de procesos en operaciones enterprise sin sacrificar trazabilidad, cumplimiento ni claridad para equipos no técnicos.",
        solution:
          "POC navegable en Figma Sites con dashboard de análisis, estados de automatización y flujos de validación humana — base para iteración con estrategia digital.",
        metrics: [
          "POC funcional publicado en Figma Sites",
          "Flujos de automatización mapeados con estados de confianza",
          "Dashboard de análisis con jerarquía visual para métricas operativas",
        ],
        learnings: [
          "La IA en enterprise requiere estados de confianza visibles y puntos de validación humana",
          "Los dashboards de automatización deben priorizar acciones sobre volumen de datos",
          "Un POC en Figma Sites acelera alineación con stakeholders antes de desarrollo",
        ],
        mockups: [portfolioImages.sura.iaAutomationDashboard],
      },
    },
  ],
  // Datos específicos de metodología por empresa
  methodologyStats: {
    yearsExperience: "5 años",
    experienceContext: {
      es: "Experiencia en proyectos de UX Enterprise",
      en: "Experience in UX Enterprise projects",
    },
    experienceDetail: {
      es: "Lideré la implementación de UX Enterprise para productos financieros digitales a nivel regional, aplicando Design Thinking adaptado a contextos corporativos y regulaciones del sector.",
      en: "Led the implementation of UX Enterprise for digital financial products at the regional level, applying Design Thinking adapted to corporate contexts and sector regulations.",
    },
    teachingEvaluation: {
      value: "4.8/5",
      context: {
        es: "Evaluación de enseñanza",
        en: "Teaching evaluation",
      },
      detail: {
        es: "Evaluación de los talleres de Design Thinking adaptado a procesos corporativos y regulaciones financieras.",
        en: "Evaluation of the workshops of Design Thinking adapted to corporate processes and financial regulations.",
      },
    },
    studentsImpact: {
      value: "100+",
      context: {
        es: "Impacto en estudiantes",
        en: "Impact on students",
      },
      detail: {
        es: "Capacité a más de 100 estudiantes en metodologías de UX Enterprise y Design Thinking adaptado.",
        en: "Trained over 100 students in UX Enterprise methodologies and adapted Design Thinking.",
      },
    },
    regionalReach: {
      value: "5+ países",
      context: {
        es: "Alcance regional",
        en: "Regional reach",
      },
      detail: {
        es: "Framework UX Enterprise implementado en 5+ países de la región.",
        en: "UX Enterprise framework implemented in 5+ countries in the region.",
      },
    },
  },
};

// ============================================
// TRANSVIP - Company Hub
// ============================================

export const transvipHub: CompanyHub = {
  id: "transvip",
  name: "Transvip",
  logo: transvipDesktop,
  industry: "Mobility & Transport",
  period: "2022 - 2023",
  totalProjects: 4,
  description: {
    es: "Lideré design system, discovery activo y handoff Figma en Transvip (movilidad premium) y Karri (delivery vertical), con equipos de Producto y Tecnología.",
    en: "Led design system, active discovery, and Figma handoff across Transvip (premium mobility) and Karri (delivery vertical) with Product and Engineering teams.",
  },
  highlights: {
    es: [
      "Design system web + app con mejora continua y accesibilidad",
      "Discovery: benchmarks, usabilidad, encuestas y métricas de producto",
      "App Pasajeros: −40% tiempo de reserva, +25% conversión, NPS 82",
      "Karri: calculadora +35% activación, onboarding −42% abandono",
    ],
    en: [
      "Web + app design system with continuous improvement and accessibility",
      "Discovery: benchmarks, usability, surveys, and product metrics",
      "Passenger App: −40% booking time, +25% conversion, NPS 82",
      "Karri: calculator +35% activation, onboarding −42% drop-off",
    ],
  },
  image: transvipDesktop,
  challenge: {
    title: {
      es: "De procesos ambiguos a framework estructurado",
      en: "From ambiguous processes to structured framework",
    },
    problem: {
      es: "Anteriormente, el proceso de diseño no contaba con tareas definidas y se sustentaba en dos estados durante los sprints: \"Diseño en progreso\" y \"Diseño en aprobación\".",
      en: "Previously, the design process had no defined tasks and relied on two states during sprints: \"Design in progress\" and \"Design in approval\".",
    },
    solution: {
      es: "Definir claramente los macroprocesos del diseño de producto, facilitando la estimación de esfuerzos, el registro del trabajo y la documentación estructurada en Transvip y Karri.",
      en: "Clearly define product design macro-processes, facilitating effort estimation, work logging, and structured documentation across Transvip and Karri.",
    },
  },
  projectsSection: {
    title: {
      es: "Movilidad premium y delivery vertical",
      en: "Premium mobility and vertical delivery",
    },
    description: {
      es: "Cuatro proyectos que aplican el framework en la app de pasajeros Transvip y los productos Karri para shoppers.",
      en: "Four projects applying the framework across the Transvip passenger app and Karri shopper products.",
    },
  },
  gallery: {
    description: {
      es: "Mockups, flujos de reserva y prototipos de la app de pasajeros, calculadora de ganancias y notificaciones Karri.",
      en: "Mockups, booking flows, and prototypes from the passenger app, Karri earnings calculator, and notifications.",
    },
  },
  projects: [
    {
      id: "transvip-app-premium",
      company: "Transvip",
      companyLogo: transvipDesktop,
      role: "Senior Product Designer",
      period: "2022-2023",
      projectName: "Rediseño App Pasajeros Premium",
      description: "Rediseño completo de la aplicación de pasajeros de Transvip, enfocada en simplificar el proceso de reserva de traslados al aeropuerto y mejorar la experiencia de usuarios premium.",
      descriptionEN: "Complete redesign of the Transvip passenger app, focused on simplifying airport transfer booking and improving the premium user experience.",
      image: transvipDesktop,
      externalLink: TRANSVIP_APP_FIGMA_URL,
      tags: ["Mobility", "Premium Service", "Mobile App", "UX Research"],
      processes: [
        {
          name: "User Research Premium",
          description: "Investigación con usuarios premium para entender sus necesidades específicas en servicios de movilidad ejecutiva.",
          tools: ["User Interviews", "Journey Mapping", "Service Design"],
        },
        {
          name: "Booking Flow Optimization",
          description: "Rediseño del flujo de reserva para reducir fricción y mejorar conversión en reservas de traslados.",
          tools: ["Figma", "Prototyping", "A/B Testing"],
        },
      ],
      details: {
        challenge: "Los usuarios premium reportaban fricción en el proceso de reserva y falta de información clara sobre el servicio ejecutivo.",
        solution: "Simplificación del flujo de reserva con énfasis en información de valor premium: tipo de vehículo, conductor asignado, y servicios adicionales.",
        metrics: [
          "Reducción de 40% en tiempo de reserva",
          "Aumento de 25% en conversión de reservas",
          "NPS de usuarios premium: 82 puntos",
        ],
        learnings: [
          "Usuarios premium valoran la información detallada del servicio",
          "La transparencia en pricing genera confianza",
          "El tracking en tiempo real es crítico para viajes al aeropuerto",
        ],
        mockups: [
          transvipMobile,
          transvipDesktop,
          transvipFigmaPrototype,
          transvipProductVision,
          "/images/vn-assets/transvip-system-design.png",
        ],
      },
    },
    karriCalculadoraStub,
    karriNotificacionesStub,
    karriDesignSprintStub,
  ],
  // Datos específicos de metodología por empresa
  methodologyStats: {
    yearsExperience: "3 años",
    experienceContext: {
      es: "Experiencia en proyectos de UX para transporte",
      en: "Experience in UX projects for transportation",
    },
    experienceDetail: {
      es: "Lideré el diseño completo de los ecosistemas digitales de Transvip (movilidad premium) y Karri (delivery vertical), desde research hasta implementación con equipos multidisciplinarios.",
      en: "Led the complete design of the digital ecosystems of Transvip (premium mobility) and Karri (delivery vertical), from research to implementation with multidisciplinary teams.",
    },
    teachingEvaluation: {
      value: "4.5/5",
      context: {
        es: "Evaluación de enseñanza",
        en: "Teaching evaluation",
      },
      detail: {
        es: "Evaluación de los talleres que definieron la estrategia de producto Karri.",
        en: "Evaluation of the workshops that defined the Karri product strategy.",
      },
    },
    studentsImpact: {
      value: "50+",
      context: {
        es: "Impacto en estudiantes",
        en: "Impact on students",
      },
      detail: {
        es: "Capacité a más de 50 estudiantes en metodologías de UX para transporte y diseño de aplicaciones móviles.",
        en: "Trained over 50 students in UX methodologies for transportation and mobile app design.",
      },
    },
    regionalReach: {
      value: "3 países",
      context: {
        es: "Alcance regional",
        en: "Regional reach",
      },
      detail: {
        es: "Proyectos implementados en 3 países de la región.",
        en: "Projects implemented in 3 countries in the region.",
      },
    },
  },
};

// ============================================
// EXPORT COMBINADO
// ============================================

// Company Hubs
export const companyHubs: CompanyHub[] = [
  suraHub,
  transvipHub,
];


const khuroPareti = khuroItem("pareti");
const khuroNumeros = khuroItem("numeros-no-existen");
const khuroSushi = khuroItem("sushi-del-mar");
const khuroSaberes = khuroItem("traduccion-saberes");
const khuroDarandar = khuroItem("darandar");
const khuroArtistas = khuroItem("artistas-resistencia");


const paretiProject: EnhancedProject = {
  id: "pareti",
  company: "Empresas Pareti",
  companyLogo: portfolioImages.brands.pareti,
  role: "Community Manager",
  period: "Oct 2019 — Feb 2020",
  projectName: "Web, UX y community del holding",
  description:
    khuroPareti?.description ??
    "Community Manager del Grupo Pareti: SEO/SEM, monitoreo de KPI y branding de comunidad.",
  descriptionEN:
    "As Community Manager for Grupo Pareti I focused on three digital marketing areas: campaign design (SEO and SEM); audience, campaign, budget and trend monitoring with ongoing KPI reports via Analytics, Ads and Insights; and branding — relationships across community, distributors, sponsors, partners, ambassadors and even competitors.",
  image: khuroPareti?.image,
  tags: [...(khuroPareti?.tags ?? ["Community", "SEO", "SEM", "Branding"])],
  externalLink: "https://khuro.pb.online/pareti",
  processes: [
    {
      name: "Monitoreo KPI",
      description:
        "Monitoreo constante de KPI de redes sociales (Facebook, Instagram), Google Ads, Google Analytics y Mailchimp, y del rendimiento de los e-commerce.",
      tools: ["Analytics", "Ads", "Insights", "Mailchimp"],
    },
    {
      name: "Diseño WEB",
      description:
        "Diseño web del sitio principal y de los 4 e-commerce del holding: piezas gráficas y audiovisuales, y reducción de procesos de compra desde la experiencia usuaria.",
      tools: ["UX", "E-commerce"],
    },
    {
      name: "Diseño UX",
      description:
        "Propuestas aplicadas durante la estadía en Pareti S.A a partir de la lectura de comportamiento en canales digitales: financiamiento estatal, e-commerce Paretikitchenette y garantía de clientes web.",
      tools: ["UX"],
    },
  ],
  details: {
    challenge:
      "Dentro de mis funciones como Community Manager de Pareti, estuvo el monitoreo constante de KPI tanto de redes sociales, como Facebook, Instagram, Google Ads, Google Analytics y Mailchimp, y el rendimiento de los e-commerce. Por un lado existe una ventaja obvia en la medición de las campañas y las estrategias digitales en términos cuantitativos, pero por otro lado es fundamental darle una interpretación al comportamiento de los usuarios en nuestros canales digitales.",
    solution:
      "Lo transformé en acciones concretas que se reflejan en Diseño UX. Para Pareti S.A estuve a cargo del diseño web de su sitio principal y de los 4 e-commerce del holding, diseñando piezas gráficas y audiovisuales y reduciendo los procesos de compra desde la experiencia usuaria de los clientes web. Constantemente actualizando su contenido y desarrollando un análisis interpretativo entre campañas de pago, interacciones web, benchmarking de la competencia y otros datos en pos de una mejor experiencia usuaria.",
    learnings: paretiKhuroGallery.campaigns.map(
      (campaign) => `${campaign.label}: ${campaign.vimeo}`
    ),
    mockups: paretiMockupUrls(),
  },
};

const numerosNoExistenProject: EnhancedProject = {
  id: "numeros-no-existen",
  company: "Viento Norte",
  companyLogo: portfolioImages.brands.vientoNorte,
  role: khuroNumeros?.role ?? "Los Números No Existen",
  period: "2019",
  projectName: "Los Números No Existen",
  description:
    khuroNumeros?.description ??
    "Poemario autogestionado de poesía viajera, diseñado para móviles y creado bajo código abierto.",
  descriptionEN:
    "Los números no existen is a self-managed poetry collection that compiles years of travel poetry. Its design is made for mobile and was created under an open-source philosophy.",
  image: khuroNumeros?.image,
  tags: [...(khuroNumeros?.tags ?? ["Poesía", "Open source"])],
  externalLink: "https://khuro.pb.online/portafolio",
  details: {
    challenge:
      "Los números no existen es un poemario autogestionado, que compila años de poesía viajera.",
    solution:
      "Su diseño está pensado para móviles y fue creado bajo la filosofía del código abierto.",
  },
};

const sushiDelMarProject: EnhancedProject = {
  id: "sushi-del-mar",
  company: "Viento Norte",
  companyLogo: portfolioImages.brands.vientoNorte,
  role: khuroSushi?.role ?? "Fotógrafo de productos",
  period: "—",
  projectName: "Sushi del Mar",
  description:
    khuroSushi?.description ??
    "Sesiones de foodstyling para productos gourmet en canales digitales.",
  descriptionEN:
    "Food-styling sessions for Sushi del Mar gourmet products on digital channels.",
  image: khuroSushi?.image,
  tags: [...(khuroSushi?.tags ?? ["Foodstyling", "Producto"])],
  externalLink: khuroSushi?.href,
  details: {
    challenge:
      "Productos gourmet que necesitaban verse con fidelidad en canales digitales.",
    solution:
      "Sesiones de foodstyling de producto para Sushi del Mar.",
    mockups: khuroSushi?.image ? [khuroSushi.image] : undefined,
  },
};

const traduccionSaberesProject: EnhancedProject = {
  id: "traduccion-saberes",
  company: "Viento Norte",
  companyLogo: portfolioImages.brands.vientoNorte,
  role: "Director",
  period: "Ago 2017 — Actualidad",
  projectName: "Traducción de Saberes",
  description:
    khuroSaberes?.description ??
    "Etnografía audiovisual sobre leyes y modelos económicos en contradicción con culturas ancestrales.",
  descriptionEN:
    "Audiovisual ethnography that seeks to understand the material reality produced by laws and economic models in contradiction with ancestral cultures, as an online documentary series.",
  image: khuroSaberes?.image,
  tags: [...(khuroSaberes?.tags ?? ["Documental", "Etnografía"])],
  externalLink: khuroSaberes?.href,
  details: {
    challenge:
      "Comprender la realidad material que producen leyes y modelos económicos en contradicción con culturas ancestrales.",
    solution:
      "Serie documental online de etnografía audiovisual.",
    mockups: khuroSaberes?.image ? [khuroSaberes.image] : undefined,
  },
};

const darandarProject: EnhancedProject = {
  id: "darandar",
  company: "Viento Norte",
  companyLogo: portfolioImages.brands.vientoNorte,
  role: "Director de Fotografía",
  period: "Abr 2019 — May 2019",
  projectName: "Darandar",
  description:
    khuroDarandar?.description ??
    "Cortometraje audiovisual en torno a la escasez hídrica en la región de Valparaíso.",
  descriptionEN:
    "Short film about water scarcity in the Valparaíso region, made for the Sala Negra intervention in 2019.",
  image: khuroDarandar?.image,
  tags: [...(khuroDarandar?.tags ?? ["Cine", "Dirección de fotografía"])],
  externalLink: khuroDarandar?.href,
  details: {
    challenge:
      "Escasez hídrica en Valparaíso como materia de una intervención en Sala Negra (2019).",
    solution:
      "Cortometraje con dirección de fotografía, junto a la performance de Andreí Liberana dirigida por Karen Klaassen.",
    mockups: khuroDarandar?.image ? [khuroDarandar.image] : undefined,
  },
};

const artistasResistenciaProject: EnhancedProject = {
  id: "artistas-resistencia",
  company: "Viento Norte",
  companyLogo: portfolioImages.brands.vientoNorte,
  role: "Documentalista",
  period: "Oct 2019",
  projectName: "Artistas en Resistencia",
  description:
    khuroArtistas?.description ??
    "Cápsula audiovisual del colectivo Artistas en Resistencia durante el 18-O en Valparaíso.",
  descriptionEN:
    "Audiovisual capsule of the Artistas en Resistencia collective during 18-O in Valparaíso.",
  image: khuroArtistas?.image,
  tags: [...(khuroArtistas?.tags ?? ["Documental", "18-O", "Valparaíso"])],
  externalLink: khuroArtistas?.href,
  details: {
    challenge:
      "Documentar procesos constituyentes autoconvocados en Valparaíso durante el 18-O.",
    solution:
      "Cápsula audiovisual del colectivo Artistas en Resistencia.",
    mockups: khuroArtistas?.image ? [khuroArtistas.image] : undefined,
  },
};


// UX Tools Project
const uxToolsProject: EnhancedProject = {
  id: "ux-tools",
  company: "Proyecto Personal",
  role: "UX Designer & Developer",
  period: "2024 - Presente",
  projectName: "UX Tools Collection",
  description: "Colección de herramientas y recursos para diseñadores UX. Incluye frameworks, plantillas, y utilidades prácticas para optimizar el flujo de trabajo en proyectos de diseño de experiencia de usuario.",
  image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  tags: ["Tools", "UX Resources", "Web Development", "Design Systems"],
  externalLink: "https://vientonorte.io/uxtools/",
  
  processes: [
    {
      name: "Research & Curation",
      description: "Investigación y curación de herramientas UX útiles para el día a día de diseñadores.",
      tools: ["Research", "UX Tools Analysis", "Best Practices"],
    },
    {
      name: "Web Development",
      description: "Desarrollo de sitio web para compartir herramientas y recursos con la comunidad UX.",
      tools: ["HTML/CSS", "JavaScript", "Web Design"],
    },
  ],
  teamSize: "Proyecto individual",
  
  details: {
    challenge: "Crear un recurso centralizado de herramientas UX que sea útil para diseñadores de todos los niveles.",
    solution: "Sitio web con colección curada de herramientas, frameworks y recursos organizados por categorías para fácil acceso.",
    metrics: [
      "Colección de herramientas UX curadas",
      "Recurso público para la comunidad de diseño",
    ],
    learnings: [
      "La curación de recursos ahorra tiempo a otros diseñadores",
      "Compartir conocimiento fortalece la comunidad UX",
    ],
  },
};

// Proyectos individuales (no agrupados por empresa)
export const individualProjects: EnhancedProject[] = [paretiProject, numerosNoExistenProject, sushiDelMarProject, traduccionSaberesProject, darandarProject, artistasResistenciaProject, uxToolsProject];

// Todos los proyectos para backward compatibility
export const allProjects = [
  ...suraHub.projects,
  ...transvipHub.projects,
  ...individualProjects,
];
