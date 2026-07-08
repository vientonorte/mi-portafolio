import { BarChart3, Search, Palette, TestTube, RefreshCw, type LucideIcon } from "lucide-react";
import type { FigmaEmbedConfig } from "./figma-embeds";
import { FIGJAM_UX_TESTING_CRITICA } from "./figma-embeds";

export interface ProcessMethod {
  title: string;
  titleEN: string;
  description: string;
  descriptionEN: string;
  tools?: string[];
}

export interface ProcessToolSubcategory {
  id: string;
  name: string;
  nameEN: string;
  description: string;
  descriptionEN: string;
  tools?: string[];
}

export interface ProcessToolCategory {
  id: string;
  name: string;
  nameEN: string;
  description?: string;
  descriptionEN?: string;
  subcategories: ProcessToolSubcategory[];
}

export interface ProcessDetailData {
  id: string;
  icon: LucideIcon;
  title: string;
  titleEN: string;
  question: string;
  questionEN: string;
  description: string;
  descriptionEN: string;
  methodology: {
    title: string;
    titleEN: string;
    steps: string[];
    stepsEN: string[];
  };
  methods: ProcessMethod[];
  /** Taxonomía categoría → subcategoría (p. ej. análisis cualitativo → Grounded Theory). */
  toolCategories?: ProcessToolCategory[];
  tools: string[];
  relatedProjects: {
    projectId: string;
    company: string;
    projectName: string;
    projectNameEN: string;
  }[];
  evidence: {
    company: string;
    metric: string;
    metricLabel: string;
    metricLabelEN: string;
  };
  benefits: string[];
  benefitsEN: string[];
  /** FigJam / Slides embebidos como playbook de la fase */
  figmaPlaybook?: FigmaEmbedConfig;
}

export const processesData: Record<string, ProcessDetailData> = {
  "ux-analytics": {
    id: "ux-analytics",
    icon: BarChart3,
    title: "UX Analytics",
    titleEN: "UX Analytics",
    question: "¿Hay errores?",
    questionEN: "Are there errors?",
    description:
      "Análisis cuantitativo y cualitativo del comportamiento y contexto de uso: desde funnels y heatmaps hasta Grounded Theory, etnografía, CRM/CMS y asistencia con LLM.",
    descriptionEN:
      "Quantitative and qualitative analysis of behavior and usage context: from funnels and heatmaps to Grounded Theory, ethnography, CRM/CMS, and LLM-assisted synthesis.",
    methodology: {
      title: "Análisis de datos + Benchmark → Hipótesis",
      titleEN: "Data Analysis + Benchmark → Hypothesis",
      steps: [
        "Configurar tracking de eventos críticos y fuentes CRM/CMS",
        "Analizar funnels, heatmaps y sesiones (cuantitativo)",
        "Codificar evidencia cualitativa (Grounded Theory, focus groups, cartografías)",
        "Complementar con análisis etnográfico en contexto real",
        "Sintetizar con LLM asistido y validar hipótesis con humanos",
      ],
      stepsEN: [
        "Set up critical event tracking and CRM/CMS sources",
        "Analyze funnels, heatmaps, and sessions (quantitative)",
        "Code qualitative evidence (Grounded Theory, focus groups, mapping)",
        "Complement with ethnographic analysis in real context",
        "Synthesize with assisted LLM and validate hypotheses with humans",
      ],
    },
    methods: [
      {
        title: "Análisis de Heatmaps",
        titleEN: "Heatmap Analysis",
        description: "Visualizar dónde hacen click los usuarios, hasta dónde scrollean y qué elementos ignoran. Identifica zonas muertas y elementos confusos.",
        descriptionEN: "Visualize where users click, how far they scroll, and which elements they ignore. Identifies dead zones and confusing elements.",
        tools: ["Hotjar", "Microsoft Clarity"],
      },
      {
        title: "Session Recordings",
        titleEN: "Session Recordings",
        description: "Grabar sesiones reales de usuarios para detectar fricción, errores y comportamientos inesperados. Permite ver la experiencia desde sus ojos.",
        descriptionEN: "Record real user sessions to detect friction, errors, and unexpected behaviors. See the experience through their eyes.",
        tools: ["Hotjar", "FullStory"],
      },
      {
        title: "Análisis de Funnels",
        titleEN: "Funnel Analysis",
        description: "Medir conversión en cada paso crítico del journey. Detectar dónde abandonan los usuarios y por qué.",
        descriptionEN: "Measure conversion at each critical journey step. Detect where and why users drop off.",
        tools: ["Mixpanel", "Google Analytics 4"],
      },
    ],
    toolCategories: [
      {
        id: "quantitative",
        name: "Análisis cuantitativo",
        nameEN: "Quantitative analysis",
        description:
          "Métricas de producto, funnels y comportamiento en producción para priorizar fricción con evidencia.",
        descriptionEN:
          "Product metrics, funnels, and in-production behavior to prioritize friction with evidence.",
        subcategories: [
          {
            id: "heatmaps",
            name: "Heatmaps y mapas de scroll",
            nameEN: "Heatmaps and scroll maps",
            description: "Visualización de clics, atención y zonas muertas en interfaces reales.",
            descriptionEN: "Visualization of clicks, attention, and dead zones on live interfaces.",
            tools: ["Hotjar", "Microsoft Clarity"],
          },
          {
            id: "session-recordings",
            name: "Session recordings",
            nameEN: "Session recordings",
            description: "Revisión de sesiones para detectar errores, loops y abandono no evidente en métricas agregadas.",
            descriptionEN: "Session review to detect errors, loops, and drop-off not visible in aggregate metrics.",
            tools: ["Hotjar", "FullStory"],
          },
          {
            id: "funnels",
            name: "Funnels y eventos",
            nameEN: "Funnels and events",
            description: "Medición paso a paso de conversión y eventos críticos del journey.",
            descriptionEN: "Step-by-step conversion and critical journey event measurement.",
            tools: ["Google Analytics 4", "Mixpanel"],
          },
        ],
      },
      {
        id: "qualitative",
        name: "Análisis cualitativo",
        nameEN: "Qualitative analysis",
        description:
          "Interpretación de patrones, motivaciones y significados a partir de datos no numéricos.",
        descriptionEN:
          "Interpretation of patterns, motivations, and meaning from non-numeric data.",
        subcategories: [
          {
            id: "grounded-theory",
            name: "Grounded Theory",
            nameEN: "Grounded Theory",
            description:
              "Codificación abierta → axial → selectiva para construir categorías ancladas en evidencia empírica.",
            descriptionEN:
              "Open → axial → selective coding to build categories grounded in empirical evidence.",
            tools: ["Atlas.ti", "NVivo", "Miro"],
          },
          {
            id: "focus-groups",
            name: "Focus groups",
            nameEN: "Focus groups",
            description:
              "Dinámicas grupales facilitadas para explorar percepciones, lenguaje y tensiones de uso.",
            descriptionEN:
              "Facilitated group sessions to explore perceptions, language, and usage tensions.",
            tools: ["Zoom", "FigJam", "Notion"],
          },
          {
            id: "participatory-mapping",
            name: "Cartografías participativas",
            nameEN: "Participatory mapping",
            description:
              "Mapas co-creados con usuarios y stakeholders para hacer visible territorio, flujos y fricción institucional.",
            descriptionEN:
              "Co-created maps with users and stakeholders to surface territory, flows, and institutional friction.",
            tools: ["Miro", "FigJam", "Kumu"],
          },
        ],
      },
      {
        id: "ethnographic",
        name: "Análisis etnográfico",
        nameEN: "Ethnographic analysis",
        description:
          "Comprensión del uso en contexto real: prácticas, ritualidades y restricciones del entorno.",
        descriptionEN:
          "Understanding use in real context: practices, rituals, and environmental constraints.",
        subcategories: [
          {
            id: "field-observation",
            name: "Observación en campo",
            nameEN: "Field observation",
            description: "Shadowing y observación participante para capturar comportamiento situado.",
            descriptionEN: "Shadowing and participant observation to capture situated behavior.",
            tools: ["Notion", "Dovetail"],
          },
          {
            id: "contextual-inquiry",
            name: "Contextual inquiry",
            nameEN: "Contextual inquiry",
            description: "Entrevistas en el lugar de uso para alinear diseño con práctica real.",
            descriptionEN: "In-context interviews to align design with actual practice.",
            tools: ["Zoom", "Lookback"],
          },
        ],
      },
      {
        id: "platforms",
        name: "Plataformas de datos y contenido",
        nameEN: "Data and content platforms",
        description:
          "Fuentes enterprise que conectan comportamiento digital con relación, contenido y operación.",
        descriptionEN:
          "Enterprise sources connecting digital behavior with relationship, content, and operations.",
        subcategories: [
          {
            id: "crm",
            name: "CRM",
            nameEN: "CRM",
            description:
              "Lectura de ciclo de vida del cliente, tickets y segmentación para cruzar UX con negocio.",
            descriptionEN:
              "Customer lifecycle, tickets, and segmentation to cross UX signals with business context.",
            tools: ["Salesforce", "HubSpot"],
          },
          {
            id: "cms",
            name: "CMS",
            nameEN: "CMS",
            description:
              "Gobierno de contenido, arquitectura editorial y métricas de consumo en ecosistemas multi-sitio.",
            descriptionEN:
              "Content governance, editorial architecture, and consumption metrics across multi-site ecosystems.",
            tools: ["Headless CMS", "Contentful", "SharePoint"],
          },
        ],
      },
      {
        id: "ai-assisted",
        name: "IA aplicada al análisis",
        nameEN: "AI-assisted analysis",
        description:
          "Asistencia con LLM bajo protocolo humano: síntesis, tagging y triage — sin reemplazar validación.",
        descriptionEN:
          "LLM assistance under human protocol: synthesis, tagging, and triage — not a substitute for validation.",
        subcategories: [
          {
            id: "llm-synthesis",
            name: "LLM",
            nameEN: "LLM",
            description:
              "Síntesis de entrevistas, clustering preliminar y redacción de insights con trazabilidad a fuente.",
            descriptionEN:
              "Interview synthesis, preliminary clustering, and insight drafting with source traceability.",
            tools: ["Claude", "ChatGPT", "NotebookLM"],
          },
        ],
      },
    ],
    tools: [
      "Google Analytics 4",
      "Hotjar",
      "Mixpanel",
      "Microsoft Clarity",
      "FullStory",
      "Grounded Theory",
      "Focus groups",
      "Cartografías participativas",
      "CRM",
      "CMS",
      "LLM",
      "Miro",
      "Notion",
    ],
    relatedProjects: [
      {
        projectId: "sura-inversiones-dashboard",
        company: "SURA Investments",
        projectName: "Rediseño Plataforma de Inversiones Digital",
        projectNameEN: "Digital Investment Platform Redesign",
      },
      {
        projectId: "transvip-app-premium",
        company: "Transvip / Karri",
        projectName: "Rediseño App Pasajeros Premium",
        projectNameEN: "Premium Passenger App Redesign",
      },
    ],
    evidence: {
      company: "SURA",
      metric: "−40%",
      metricLabel: "abandono en onboarding",
      metricLabelEN: "onboarding drop-off",
    },
    benefits: [
      "Decisiones basadas en data real, no suposiciones",
      "Identificación proactiva de problemas antes de que escalen",
      "Priorización objetiva de mejoras según impacto",
      "Reducción de 40-60% en fricción detectada",
    ],
    benefitsEN: [
      "Data-driven decisions, not assumptions",
      "Proactive problem identification before escalation",
      "Objective prioritization of improvements by impact",
      "40-60% reduction in detected friction",
    ],
  },

  "ux-research": {
    id: "ux-research",
    icon: Search,
    title: "UX Research",
    titleEN: "UX Research",
    question: "¿Por qué sucede?",
    questionEN: "Why does it happen?",
    description: "Investigación cualitativa con usuarios finales. Entrevistas, encuestas y análisis competitivo para comprender necesidades, motivaciones y contextos de uso.",
    descriptionEN: "Qualitative research with end users. Interviews, surveys, and competitive analysis to understand needs, motivations, and usage contexts.",
    methodology: {
      title: "Ahora probamos nuestras hipótesis",
      titleEN: "Now we test our hypotheses",
      steps: [
        "Diseñar guía de entrevistas basada en hipótesis",
        "Reclutar usuarios representativos",
        "Conducir entrevistas y observación",
        "Analizar patrones y pain points",
        "Validar o descartar hipótesis",
      ],
      stepsEN: [
        "Design interview guide based on hypotheses",
        "Recruit representative users",
        "Conduct interviews and observation",
        "Analyze patterns and pain points",
        "Validate or discard hypotheses",
      ],
    },
    methods: [
      {
        title: "Observación Participante",
        titleEN: "Participant Observation",
        description: "Detallar la relación con el producto mediante observación directa del uso real. Detecta dolores no verbalizados.",
        descriptionEN: "Detail product relationship through direct observation of real use. Detects non-verbalized pain points.",
        tools: ["Session Recordings", "Heatmaps"],
      },
      {
        title: "Entrevistas con Testers",
        titleEN: "User Interviews",
        description: "Conocer dolores de primera fuente mediante conversaciones estructuradas. Profundiza en el 'por qué' detrás del comportamiento.",
        descriptionEN: "Learn pain points firsthand through structured conversations. Dig into the 'why' behind behavior.",
        tools: ["Google Meet", "Zoom", "Notion"],
      },
      {
        title: "Encuestas a Testers",
        titleEN: "User Surveys",
        description: "Confirmar ideas concretas a escala. Valida hipótesis con muestra representativa.",
        descriptionEN: "Confirm specific ideas at scale. Validate hypotheses with representative sample.",
        tools: ["Typeform", "Google Forms"],
      },
    ],
    tools: ["Typeform", "Google Forms", "Zoom", "Notion", "Miro"],
    relatedProjects: [
      {
        projectId: "sura-ux-enterprise",
        company: "SURA Investments",
        projectName: "Implementación UX Enterprise Regional",
        projectNameEN: "Regional UX Enterprise Implementation",
      },
      {
        projectId: "karri-calculadora",
        company: "Transvip / Karri",
        projectName: "Karri - Calculadora de Ganancias",
        projectNameEN: "Karri - Earnings Calculator",
      },
    ],
    evidence: {
      company: "SURA",
      metric: "NPS 72",
      metricLabel: "plataforma inversiones",
      metricLabelEN: "investments platform",
    },
    benefits: [
      "Comprensión profunda de necesidades reales",
      "Validación de hipótesis con usuarios finales",
      "Detección de pain points no evidentes en data",
      "Insights que guían decisiones de diseño",
    ],
    benefitsEN: [
      "Deep understanding of real needs",
      "Hypothesis validation with end users",
      "Detection of pain points not evident in data",
      "Insights that guide design decisions",
    ],
  },

  "ux-ui-design": {
    id: "ux-ui-design",
    icon: Palette,
    title: "UX/UI Design",
    titleEN: "UX/UI Design",
    question: "¿Cómo lo resolvemos?",
    questionEN: "How do we solve it?",
    description: "Ideación colaborativa y diseño de soluciones. Wireframes, prototipos interactivos y diseño visual alineado con el sistema de diseño y objetivos del negocio.",
    descriptionEN: "Collaborative ideation and solution design. Wireframes, interactive prototypes, and visual design aligned with design system and business objectives.",
    methodology: {
      title: "De la idea al prototipo",
      titleEN: "From idea to prototype",
      steps: [
        "Ideación colaborativa con stakeholders",
        "Wireframes low-fidelity",
        "Diseño high-fidelity en Figma",
        "Prototipos interactivos",
        "Handoff a desarrollo",
      ],
      stepsEN: [
        "Collaborative ideation with stakeholders",
        "Low-fidelity wireframes",
        "High-fidelity design in Figma",
        "Interactive prototypes",
        "Handoff to development",
      ],
    },
    methods: [
      {
        title: "Wireframing & Information Architecture",
        titleEN: "Wireframing & Information Architecture",
        description: "Estructurar la información y flujos de navegación antes del diseño visual. Permite iterar rápido sin invertir en detalles visuales.",
        descriptionEN: "Structure information and navigation flows before visual design. Allows fast iteration without investing in visual details.",
        tools: ["Figma", "FigJam", "Whimsical"],
      },
      {
        title: "Design System Implementation",
        titleEN: "Design System Implementation",
        description: "Aplicar componentes reutilizables del sistema de diseño. Garantiza consistencia visual y acelera el proceso de diseño.",
        descriptionEN: "Apply reusable components from design system. Ensures visual consistency and accelerates design process.",
        tools: ["Figma", "Storybook", "Zeroheight"],
      },
      {
        title: "Interactive Prototyping",
        titleEN: "Interactive Prototyping",
        description: "Crear prototipos interactivos con micro-interacciones y transiciones. Permite validar la experiencia antes de desarrollar.",
        descriptionEN: "Create interactive prototypes with micro-interactions and transitions. Validates experience before development.",
        tools: ["Figma", "ProtoPie", "Principle"],
      },
      {
        title: "Collaborative Workshops",
        titleEN: "Collaborative Workshops",
        description: "Facilitar sesiones de ideación con Design Thinking y Crazy 8s. Co-crear soluciones con stakeholders y equipo técnico.",
        descriptionEN: "Facilitate ideation sessions with Design Thinking and Crazy 8s. Co-create solutions with stakeholders and technical team.",
        tools: ["FigJam", "Miro", "Google Meet"],
      },
    ],
    tools: ["Figma", "FigJam", "Adobe XD", "Principle", "ProtoPie"],
    relatedProjects: [
      {
        projectId: "sura-ria-us",
        company: "SURA Investments",
        projectName: "Diseño UX UI RIA SURA US",
        projectNameEN: "RIA SURA US UX/UI Design",
      },
      {
        projectId: "karri-notificaciones",
        company: "Transvip / Karri",
        projectName: "Karri - Sistema de Notificaciones + Onboarding",
        projectNameEN: "Karri - Notifications + Onboarding",
      },
    ],
    evidence: {
      company: "Karri",
      metric: "+35%",
      metricLabel: "activación shoppers",
      metricLabelEN: "shopper activation",
    },
    benefits: [
      "Soluciones visuales alineadas con research",
      "Prototipos testeables antes de desarrollo",
      "Reducción de retrabajo en desarrollo",
      "Diseño consistente y escalable",
    ],
    benefitsEN: [
      "Visual solutions aligned with research",
      "Testable prototypes before development",
      "Reduced rework in development",
      "Consistent and scalable design",
    ],
  },

  "ux-testing": {
    id: "ux-testing",
    icon: TestTube,
    title: "UX Testing",
    titleEN: "UX Testing",
    question: "¿Funciona la solución?",
    questionEN: "Does the solution work?",
    description: "Validación de prototipos con usuarios reales. Testing de usabilidad, A/B testing y feedback de stakeholders antes del desarrollo.",
    descriptionEN: "Prototype validation with real users. Usability testing, A/B testing, and stakeholder feedback before development.",
    methodology: {
      title: "Validar antes de desarrollar",
      titleEN: "Validate before developing",
      steps: [
        "Definir métricas de éxito",
        "Reclutar usuarios para testing",
        "Conducir sesiones de usabilidad",
        "Analizar resultados y pain points",
        "Iterar diseño basado en feedback",
      ],
      stepsEN: [
        "Define success metrics",
        "Recruit users for testing",
        "Conduct usability sessions",
        "Analyze results and pain points",
        "Iterate design based on feedback",
      ],
    },
    methods: [
      {
        title: "Usability Testing Moderado",
        titleEN: "Moderated Usability Testing",
        description: "Sesiones 1:1 con usuarios reales probando prototipos. Observar en vivo cómo interactúan, detectar fricción y hacer preguntas de seguimiento.",
        descriptionEN: "1:1 sessions with real users testing prototypes. Observe live how they interact, detect friction, and ask follow-up questions.",
        tools: ["Zoom", "Google Meet", "Lookback"],
      },
      {
        title: "Usability Testing No Moderado",
        titleEN: "Unmoderated Usability Testing",
        description: "Usuarios completan tareas sin supervisión. Escala rápido y permite recolectar data de múltiples usuarios simultáneamente.",
        descriptionEN: "Users complete tasks without supervision. Scales quickly and allows collecting data from multiple users simultaneously.",
        tools: ["Maze", "UsabilityHub", "Lyssna"],
      },
      {
        title: "A/B Testing",
        titleEN: "A/B Testing",
        description: "Comparar dos versiones de una solución con usuarios reales. Medir cuál performa mejor según métricas definidas (conversión, tiempo, errores).",
        descriptionEN: "Compare two versions of a solution with real users. Measure which performs better according to defined metrics (conversion, time, errors).",
        tools: ["Google Optimize", "VWO", "Optimizely"],
      },
      {
        title: "First Click Testing",
        titleEN: "First Click Testing",
        description: "Validar si los usuarios encuentran la acción correcta al primer intento. Detecta problemas de arquitectura de información y jerarquía visual.",
        descriptionEN: "Validate if users find the correct action on first try. Detects information architecture and visual hierarchy problems.",
        tools: ["Maze", "UsabilityHub", "Optimal Workshop"],
      },
    ],
    tools: ["Maze", "UsabilityHub", "Lyssna", "Hotjar", "Google Optimize"],
    relatedProjects: [
      {
        projectId: "sura-ecosistema-digital",
        company: "SURA Investments",
        projectName: "Ecosistema Digital Sitios Públicos & Onboarding",
        projectNameEN: "Public Websites Digital Ecosystem & Onboarding",
      },
      {
        projectId: "karri-design-sprint",
        company: "Transvip / Karri",
        projectName: "Karri - Workshop de Estrategia de Producto",
        projectNameEN: "Karri - Product Strategy Workshop",
      },
    ],
    evidence: {
      company: "SURA",
      metric: "8",
      metricLabel: "prototipos testeados pre-dev",
      metricLabelEN: "prototypes tested pre-dev",
    },
    benefits: [
      "Validación de soluciones antes de invertir en desarrollo",
      "Detección temprana de errores de UX",
      "Iteración rápida y económica",
      "Mayor probabilidad de éxito en producción",
    ],
    benefitsEN: [
      "Solution validation before investing in development",
      "Early detection of UX errors",
      "Fast and cost-effective iteration",
      "Higher success rate in production",
    ],
    figmaPlaybook: FIGJAM_UX_TESTING_CRITICA,
  },

  "refinamiento": {
    id: "refinamiento",
    icon: RefreshCw,
    title: "Refinamiento",
    titleEN: "Refinement",
    question: "¿Cómo mejoramos?",
    questionEN: "How do we improve?",
    description: "Iteración continua post-lanzamiento. Análisis de métricas, ajustes basados en feedback y optimización de la experiencia.",
    descriptionEN: "Continuous post-launch iteration. Metrics analysis, feedback-based adjustments, and experience optimization.",
    methodology: {
      title: "Mejora continua",
      titleEN: "Continuous improvement",
      steps: [
        "Monitorear métricas post-lanzamiento",
        "Recolectar feedback de usuarios",
        "Identificar oportunidades de mejora",
        "Priorizar quick wins vs long-term",
        "Iterar y volver a medir",
      ],
      stepsEN: [
        "Monitor post-launch metrics",
        "Collect user feedback",
        "Identify improvement opportunities",
        "Prioritize quick wins vs long-term",
        "Iterate and measure again",
      ],
    },
    methods: [
      {
        title: "Análisis de Métricas Post-Launch",
        titleEN: "Post-Launch Metrics Analysis",
        description: "Monitorear KPIs definidos y comparar con baseline. Detectar desviaciones, caídas de performance o comportamientos inesperados.",
        descriptionEN: "Monitor defined KPIs and compare with baseline. Detect deviations, performance drops, or unexpected behaviors.",
        tools: ["Mixpanel", "Google Analytics", "Datadog"],
      },
      {
        title: "Feedback Loops con Usuarios",
        titleEN: "User Feedback Loops",
        description: "Implementar canales de feedback directo (NPS, encuestas in-app, soporte). Escuchar la voz del usuario en producción.",
        descriptionEN: "Implement direct feedback channels (NPS, in-app surveys, support). Listen to user voice in production.",
        tools: ["Hotjar", "Typeform", "Intercom"],
      },
      {
        title: "Priorización con RICE/MoSCoW",
        titleEN: "RICE/MoSCoW Prioritization",
        description: "Evaluar mejoras según Reach, Impact, Confidence y Effort. Separar quick wins de iniciativas de largo plazo.",
        descriptionEN: "Evaluate improvements by Reach, Impact, Confidence, and Effort. Separate quick wins from long-term initiatives.",
        tools: ["Notion", "Linear", "Jira"],
      },
      {
        title: "Retrospectivas y Learnings",
        titleEN: "Retrospectives & Learnings",
        description: "Documentar qué funcionó y qué no. Crear knowledge base para futuras iteraciones y compartir aprendizajes con el equipo.",
        descriptionEN: "Document what worked and what didn't. Create knowledge base for future iterations and share learnings with team.",
        tools: ["Notion", "Confluence", "Miro"],
      },
    ],
    tools: ["Mixpanel", "Hotjar", "Google Analytics", "Jira", "Linear"],
    relatedProjects: [
      {
        projectId: "sura-inversiones-dashboard",
        company: "SURA Investments",
        projectName: "Rediseño Plataforma de Inversiones Digital",
        projectNameEN: "Digital Investment Platform Redesign",
      },
      {
        projectId: "karri-notificaciones",
        company: "Transvip / Karri",
        projectName: "Karri - Sistema de Notificaciones + Onboarding",
        projectNameEN: "Karri - Notifications + Onboarding",
      },
    ],
    evidence: {
      company: "Karri",
      metric: "+58%",
      metricLabel: "engagement notificaciones",
      metricLabelEN: "notification engagement",
    },
    benefits: [
      "Producto en constante evolución",
      "Detección temprana de nuevos problemas",
      "Optimización basada en uso real",
      "Mayor satisfacción de usuarios",
    ],
    benefitsEN: [
      "Constantly evolving product",
      "Early detection of new problems",
      "Optimization based on real usage",
      "Higher user satisfaction",
    ],
  },
};