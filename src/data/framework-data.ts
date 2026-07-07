// ============================================
// FRAMEWORK UX - DATOS DETALLADOS
// ============================================
// 5 Macroprocesos de diseño de producto
// Priorizan decisiones basadas en data y validación con usuarios reales

export interface FrameworkPhase {
  id: string;
  number: number;
  name: string;
  nameEN: string;
  tagline: string;
  taglineEN: string;
  description: string;
  descriptionEN: string;
  image: string;
  icon: string;
  color: string;
  objectives: string[];
  objectivesEN: string[];
  methods: {
    name: string;
    nameEN: string;
    description: string;
    descriptionEN: string;
  }[];
  tools: string[];
  deliverables: string[];
  deliverablesEN: string[];
  duration: string;
  durationEN: string;
  keyQuestions: string[];
  keyQuestionsEN: string[];
}

export const frameworkPhases: FrameworkPhase[] = [
  {
    id: "analytics",
    number: 1,
    name: "Analytics & Métricas",
    nameEN: "Analytics & Metrics",
    tagline: "Decisiones basadas en datos reales",
    taglineEN: "Data-driven decision making",
    description: "Análisis cuantitativo y cualitativo de comportamiento de usuarios. Establecimiento de KPIs y métricas de éxito que guían todo el proceso de diseño.",
    descriptionEN: "Quantitative and qualitative analysis of user behavior. Establishing KPIs and success metrics that guide the entire design process.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    icon: "BarChart3",
    color: "#FF1D25",
    objectives: [
      "Identificar métricas clave del negocio y usuarios",
      "Establecer baseline de performance actual",
      "Detectar oportunidades de mejora basadas en data",
      "Crear dashboards de seguimiento continuo",
    ],
    objectivesEN: [
      "Identify key business and user metrics",
      "Establish current performance baseline",
      "Detect data-based improvement opportunities",
      "Create continuous monitoring dashboards",
    ],
    methods: [
      {
        name: "Análisis cuantitativo",
        nameEN: "Quantitative analysis",
        description: "Funnels, heatmaps, session recordings y eventos en producción.",
        descriptionEN: "Funnels, heatmaps, session recordings, and in-production events.",
      },
      {
        name: "Análisis cualitativo",
        nameEN: "Qualitative analysis",
        description: "Grounded Theory, focus groups y cartografías participativas.",
        descriptionEN: "Grounded Theory, focus groups, and participatory mapping.",
      },
      {
        name: "Análisis etnográfico",
        nameEN: "Ethnographic analysis",
        description: "Observación en campo y contextual inquiry.",
        descriptionEN: "Field observation and contextual inquiry.",
      },
      {
        name: "Plataformas & IA",
        nameEN: "Platforms & AI",
        description: "CRM, CMS y síntesis asistida con LLM bajo validación humana.",
        descriptionEN: "CRM, CMS, and LLM-assisted synthesis under human validation.",
      },
    ],
    tools: [
      "Google Analytics 4",
      "Hotjar",
      "Mixpanel",
      "Grounded Theory",
      "Focus groups",
      "CRM",
      "CMS",
      "LLM",
    ],
    deliverables: [
      "Dashboard de métricas clave",
      "Reporte de análisis de comportamiento",
      "Identificación de quick wins",
      "Hipótesis de mejora priorizadas",
    ],
    deliverablesEN: [
      "Key metrics dashboard",
      "Behavior analysis report",
      "Quick wins identification",
      "Prioritized improvement hypotheses",
    ],
    duration: "1-2 semanas",
    durationEN: "1-2 weeks",
    keyQuestions: [
      "¿Cuáles son las métricas que realmente importan?",
      "¿Dónde están perdiendo usuarios?",
      "¿Qué patrones de comportamiento emergen de los datos?",
      "¿Cómo mediremos el éxito de las mejoras?",
    ],
    keyQuestionsEN: [
      "What metrics really matter?",
      "Where are we losing users?",
      "What behavior patterns emerge from data?",
      "How will we measure improvement success?",
    ],
  },
  {
    id: "research",
    number: 2,
    name: "User Research",
    nameEN: "User Research",
    tagline: "Comprender a los usuarios reales",
    taglineEN: "Understanding real users",
    description: "Investigación profunda de necesidades, motivaciones y contextos de uso. Validación continua de hipótesis con usuarios reales a través de métodos cualitativos y cuantitativos.",
    descriptionEN: "Deep investigation of needs, motivations and usage contexts. Continuous hypothesis validation with real users through qualitative and quantitative methods.",
    image: "https://images.unsplash.com/photo-1582601231162-132ca60713d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    icon: "Users",
    color: "#FF4D25",
    objectives: [
      "Mapear arquetipos de usuarios y sus contextos",
      "Identificar pain points y necesidades no satisfechas",
      "Validar o refutar hipótesis de diseño",
      "Generar insights accionables para el producto",
    ],
    objectivesEN: [
      "Map user archetypes and their contexts",
      "Identify pain points and unmet needs",
      "Validate or refute design hypotheses",
      "Generate actionable product insights",
    ],
    methods: [
      {
        name: "Entrevistas en Profundidad",
        nameEN: "In-depth Interviews",
        description: "Conversaciones 1-on-1 para entender motivaciones, frustraciones y contextos de uso reales.",
        descriptionEN: "1-on-1 conversations to understand motivations, frustrations and real usage contexts.",
      },
      {
        name: "Encuestas Cuantitativas",
        nameEN: "Quantitative Surveys",
        description: "Validación de hipótesis a escala con muestras representativas de usuarios.",
        descriptionEN: "Scale hypothesis validation with representative user samples.",
      },
      {
        name: "Job Stories & Jobs-to-be-Done",
        nameEN: "Job Stories & Jobs-to-be-Done",
        description: "Framework para entender qué \"trabajo\" están tratando de resolver los usuarios.",
        descriptionEN: "Framework to understand what 'job' users are trying to solve.",
      },
      {
        name: "User Journey Mapping",
        nameEN: "User Journey Mapping",
        description: "Mapeo de experiencia completa del usuario, incluyendo touchpoints, emociones y oportunidades.",
        descriptionEN: "Complete user experience mapping, including touchpoints, emotions and opportunities.",
      },
      {
        name: "Análisis Competitivo",
        nameEN: "Competitive Analysis",
        description: "Benchmark de soluciones existentes y mejores prácticas del sector.",
        descriptionEN: "Benchmarking existing solutions and industry best practices.",
      },
    ],
    tools: ["Zoom", "Typeform", "Dovetail", "Miro", "Notion", "Maze"],
    deliverables: [
      "User Personas validadas con data",
      "Journey Maps con pain points identificados",
      "Reporte de insights de investigación",
      "Oportunidades de diseño priorizadas",
    ],
    deliverablesEN: [
      "User Personas validated with data",
      "Journey Maps with identified pain points",
      "Research insights report",
      "Prioritized design opportunities",
    ],
    duration: "2-3 semanas",
    durationEN: "2-3 weeks",
    keyQuestions: [
      "¿Quiénes son realmente nuestros usuarios?",
      "¿Qué problemas intentan resolver?",
      "¿Por qué eligen (o no) nuestro producto?",
      "¿Qué contextos rodean su uso del producto?",
    ],
    keyQuestionsEN: [
      "Who are our users really?",
      "What problems are they trying to solve?",
      "Why do they choose (or not) our product?",
      "What contexts surround their product use?",
    ],
  },
  {
    id: "design",
    number: 3,
    name: "UI Design",
    nameEN: "UI Design",
    tagline: "Diseño centrado en el usuario",
    taglineEN: "User-centered design",
    description: "Diseño de interfaces que balancean objetivos de negocio con necesidades de usuarios. Desde wireframes hasta prototipos de alta fidelidad, priorizando usabilidad y accesibilidad.",
    descriptionEN: "Interface design balancing business objectives with user needs. From wireframes to high-fidelity prototypes, prioritizing usability and accessibility.",
    image: "https://images.unsplash.com/photo-1622117523535-ecb446c0c1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    icon: "Palette",
    color: "#FF6D25",
    objectives: [
      "Crear soluciones visuales que resuelvan problemas identificados",
      "Establecer design system escalable y consistente",
      "Prototipar para validar antes de desarrollo",
      "Garantizar accesibilidad WCAG 2.1 AA mínimo",
    ],
    objectivesEN: [
      "Create visual solutions that solve identified problems",
      "Establish scalable and consistent design system",
      "Prototype to validate before development",
      "Ensure WCAG 2.1 AA minimum accessibility",
    ],
    methods: [
      {
        name: "Atomic Design",
        nameEN: "Atomic Design",
        description: "Construcción de sistemas de diseño desde átomos hasta organismos, asegurando consistencia y escalabilidad.",
        descriptionEN: "Building design systems from atoms to organisms, ensuring consistency and scalability.",
      },
      {
        name: "Design Sprints",
        nameEN: "Design Sprints",
        description: "Proceso intensivo de 5 días para resolver problemas críticos y validar soluciones rápidamente.",
        descriptionEN: "Intensive 5-day process to solve critical problems and validate solutions quickly.",
      },
      {
        name: "Wireframing & Prototyping",
        nameEN: "Wireframing & Prototyping",
        description: "Iteración rápida desde baja a alta fidelidad, validando antes de invertir en desarrollo.",
        descriptionEN: "Rapid iteration from low to high fidelity, validating before investing in development.",
      },
      {
        name: "Mobile First & Responsive",
        nameEN: "Mobile First & Responsive",
        description: "Diseño que prioriza la experiencia móvil y se adapta perfectamente a todos los dispositivos.",
        descriptionEN: "Design prioritizing mobile experience and perfectly adapting to all devices.",
      },
      {
        name: "Micro-interacciones",
        nameEN: "Micro-interactions",
        description: "Detalles animados que mejoran feedback, guían al usuario y humanizan la experiencia.",
        descriptionEN: "Animated details that improve feedback, guide users and humanize the experience.",
      },
    ],
    tools: ["Figma", "FigJam", "Principle", "ProtoPie", "Zeplin", "Abstract"],
    deliverables: [
      "Design System documentado",
      "Wireframes y User Flows",
      "Prototipos interactivos de alta fidelidad",
      "Especificaciones para desarrollo",
    ],
    deliverablesEN: [
      "Documented Design System",
      "Wireframes and User Flows",
      "High-fidelity interactive prototypes",
      "Development specifications",
    ],
    duration: "3-6 semanas",
    durationEN: "3-6 weeks",
    keyQuestions: [
      "¿Cómo traducimos insights en soluciones tangibles?",
      "¿Qué patrones de diseño resuelven mejor cada problema?",
      "¿Cómo garantizamos consistencia a escala?",
      "¿Es accesible para todos los usuarios?",
    ],
    keyQuestionsEN: [
      "How do we translate insights into tangible solutions?",
      "What design patterns best solve each problem?",
      "How do we ensure consistency at scale?",
      "Is it accessible to all users?",
    ],
  },
  {
    id: "testing",
    number: 4,
    name: "Testing & Validación",
    nameEN: "Testing & Validation",
    tagline: "Validar antes de construir",
    taglineEN: "Validate before building",
    description: "Testeo riguroso con usuarios reales antes de invertir en desarrollo. Identificación temprana de problemas de usabilidad y validación de que las soluciones realmente funcionan.",
    descriptionEN: "Rigorous testing with real users before investing in development. Early identification of usability issues and validation that solutions actually work.",
    image: "https://images.unsplash.com/photo-1531813119282-cd4d545af976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    icon: "TestTube",
    color: "#FF8D25",
    objectives: [
      "Validar que las soluciones resuelven problemas reales",
      "Identificar problemas de usabilidad antes de desarrollo",
      "Medir impacto potencial de las mejoras",
      "Reducir riesgo y costo de errores en producción",
    ],
    objectivesEN: [
      "Validate that solutions solve real problems",
      "Identify usability issues before development",
      "Measure potential impact of improvements",
      "Reduce risk and cost of production errors",
    ],
    methods: [
      {
        name: "Usability Testing Moderado",
        nameEN: "Moderated Usability Testing",
        description: "Sesiones 1-on-1 observando usuarios realizar tareas específicas, identificando fricciones en tiempo real.",
        descriptionEN: "1-on-1 sessions observing users perform specific tasks, identifying frictions in real-time.",
      },
      {
        name: "Usability Testing No Moderado",
        nameEN: "Unmoderated Usability Testing",
        description: "Tests remotos a escala para validar con muestras más grandes de usuarios.",
        descriptionEN: "Remote tests at scale to validate with larger user samples.",
      },
      {
        name: "A/B Testing de Prototipos",
        nameEN: "Prototype A/B Testing",
        description: "Comparación de alternativas de diseño para identificar la solución óptima.",
        descriptionEN: "Comparing design alternatives to identify the optimal solution.",
      },
      {
        name: "Accessibility Audit",
        nameEN: "Accessibility Audit",
        description: "Validación de cumplimiento WCAG con usuarios con discapacidades y herramientas automatizadas.",
        descriptionEN: "WCAG compliance validation with users with disabilities and automated tools.",
      },
      {
        name: "First Click Testing",
        nameEN: "First Click Testing",
        description: "Validación de arquitectura de información: ¿encuentran lo que buscan?",
        descriptionEN: "Information architecture validation: do they find what they're looking for?",
      },
    ],
    tools: ["Maze", "UserTesting", "Lookback", "Optimal Workshop", "axe DevTools", "WAVE"],
    deliverables: [
      "Reporte de Usability Testing con videos",
      "Matriz de problemas priorizados",
      "Recomendaciones de mejora",
      "Checklist de accesibilidad validado",
    ],
    deliverablesEN: [
      "Usability Testing Report with videos",
      "Prioritized problem matrix",
      "Improvement recommendations",
      "Validated accessibility checklist",
    ],
    duration: "1-2 semanas",
    durationEN: "1-2 weeks",
    keyQuestions: [
      "¿Los usuarios pueden completar las tareas críticas?",
      "¿Dónde se confunden o frustran?",
      "¿Qué tanto mejora la experiencia vs. la versión actual?",
      "¿Es accesible para usuarios con discapacidades?",
    ],
    keyQuestionsEN: [
      "Can users complete critical tasks?",
      "Where do they get confused or frustrated?",
      "How much does it improve vs. current version?",
      "Is it accessible to users with disabilities?",
    ],
  },
  {
    id: "iteration",
    number: 5,
    name: "Mejora Continua",
    nameEN: "Continuous Improvement",
    tagline: "Evolución basada en feedback real",
    taglineEN: "Evolution based on real feedback",
    description: "El diseño nunca termina. Monitoreo post-lanzamiento, análisis de métricas de éxito, identificación de nuevas oportunidades y ciclos de mejora iterativa.",
    descriptionEN: "Design never ends. Post-launch monitoring, success metrics analysis, new opportunity identification and iterative improvement cycles.",
    image: "https://images.unsplash.com/photo-1580070558439-b2696af4600d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    icon: "RefreshCw",
    color: "#FF931E",
    objectives: [
      "Monitorear impacto real de los cambios implementados",
      "Identificar nuevas oportunidades de mejora",
      "Escalar aprendizajes a otras áreas del producto",
      "Mantener el producto evolucionando con las necesidades",
    ],
    objectivesEN: [
      "Monitor real impact of implemented changes",
      "Identify new improvement opportunities",
      "Scale learnings to other product areas",
      "Keep product evolving with needs",
    ],
    methods: [
      {
        name: "Post-Launch Analytics",
        nameEN: "Post-Launch Analytics",
        description: "Seguimiento de KPIs antes/después para medir impacto real de las mejoras.",
        descriptionEN: "Before/after KPI tracking to measure real improvement impact.",
      },
      {
        name: "Continuous User Feedback",
        nameEN: "Continuous User Feedback",
        description: "Canales abiertos de feedback: encuestas, NPS, soporte, redes sociales.",
        descriptionEN: "Open feedback channels: surveys, NPS, support, social media.",
      },
      {
        name: "Feature Adoption Analysis",
        nameEN: "Feature Adoption Analysis",
        description: "¿Los usuarios adoptan las nuevas features? ¿Por qué sí o no?",
        descriptionEN: "Do users adopt new features? Why or why not?",
      },
      {
        name: "Backlog Priorization",
        nameEN: "Backlog Prioritization",
        description: "Actualización continua del roadmap basado en data y feedback real.",
        descriptionEN: "Continuous roadmap update based on data and real feedback.",
      },
      {
        name: "Design Retrospectives",
        nameEN: "Design Retrospectives",
        description: "Reflexión del equipo: qué funcionó, qué no, qué aprendimos.",
        descriptionEN: "Team reflection: what worked, what didn't, what we learned.",
      },
    ],
    tools: ["Productboard", "Jira", "Confluence", "Slack", "Intercom", "Pendo"],
    deliverables: [
      "Reporte de impacto con métricas antes/después",
      "Backlog priorizado de siguientes mejoras",
      "Documentación de aprendizajes",
      "Roadmap actualizado",
    ],
    deliverablesEN: [
      "Impact report with before/after metrics",
      "Prioritized backlog of next improvements",
      "Learnings documentation",
      "Updated roadmap",
    ],
    duration: "Continuo",
    durationEN: "Continuous",
    keyQuestions: [
      "¿Mejoraron las métricas clave después del lanzamiento?",
      "¿Qué feedback están dando los usuarios?",
      "¿Qué nuevas necesidades han emergido?",
      "¿Cómo priorizamos el siguiente ciclo de mejoras?",
    ],
    keyQuestionsEN: [
      "Did key metrics improve after launch?",
      "What feedback are users giving?",
      "What new needs have emerged?",
      "How do we prioritize the next improvement cycle?",
    ],
  },
];

export const frameworkPrinciples = {
  es: {
    title: "Principios Fundamentales",
    principles: [
      {
        title: "🎯 Decisiones basadas en data",
        description: "Cada decisión de diseño se valida con métricas cuantitativas y cualitativas, no con opiniones.",
      },
      {
        title: "👥 Usuarios reales, siempre",
        description: "Involucramos usuarios en cada fase: research, testing, feedback post-lanzamiento.",
      },
      {
        title: "🔄 Iteración sobre perfección",
        description: "Preferimos lanzar rápido, aprender, iterar. El diseño nunca está 'terminado'.",
      },
      {
        title: "📊 Métricas de éxito claras",
        description: "Definimos cómo mediremos el éxito antes de diseñar. Si no se puede medir, no se puede mejorar.",
      },
      {
        title: "♿ Accesibilidad como estándar",
        description: "WCAG 2.1 AA no es opcional. Diseñamos para todos desde el inicio.",
      },
      {
        title: "🤝 Colaboración multidisciplinaria",
        description: "UX, Producto, Desarrollo y Negocio trabajan juntos desde discovery hasta lanzamiento.",
      },
    ],
  },
  en: {
    title: "Core Principles",
    principles: [
      {
        title: "🎯 Data-driven decisions",
        description: "Every design decision is validated with quantitative and qualitative metrics, not opinions.",
      },
      {
        title: "👥 Real users, always",
        description: "We involve users in every phase: research, testing, post-launch feedback.",
      },
      {
        title: "🔄 Iteration over perfection",
        description: "We prefer to launch fast, learn, iterate. Design is never 'finished'.",
      },
      {
        title: "📊 Clear success metrics",
        description: "We define how we'll measure success before designing. If it can't be measured, it can't be improved.",
      },
      {
        title: "♿ Accessibility as standard",
        description: "WCAG 2.1 AA is not optional. We design for everyone from the start.",
      },
      {
        title: "🤝 Multidisciplinary collaboration",
        description: "UX, Product, Development and Business work together from discovery to launch.",
      },
    ],
  },
};

export const frameworkCaseStudies = {
  es: {
    title: "Aplicación en Proyectos Reales",
    description: "Este framework se ha aplicado exitosamente en múltiples contextos",
    cases: [
      {
        company: "SURA Investments",
        project: "Plataforma de Inversiones",
        impact: "+45% mejora en consultas de inversiones",
        phases: ["Analytics", "Research", "UI Design", "Testing"],
      },
      {
        company: "SURA Investments",
        project: "Ecosistema Digital & Onboarding",
        impact: "-40% tiempo de onboarding (de 15+ min a 7-11 min)",
        phases: ["Research", "UI Design", "Testing", "Iteration"],
      },
      {
        company: "Transvip",
        project: "Dashboard Conductor",
        impact: "+37% eficiencia operacional",
        phases: ["Analytics", "Research", "UI Design", "Testing", "Iteration"],
      },
      {
        company: "Karri (Transvip)",
        project: "Calculadora Tarifas",
        impact: "-60% consultas de soporte sobre precios",
        phases: ["Research", "UI Design", "Testing"],
      },
    ],
  },
  en: {
    title: "Real Project Applications",
    description: "This framework has been successfully applied in multiple contexts",
    cases: [
      {
        company: "SURA Investments",
        project: "Investment Platform",
        impact: "+45% improvement in investment queries",
        phases: ["Analytics", "Research", "UI Design", "Testing"],
      },
      {
        company: "SURA Investments",
        project: "Digital Ecosystem & Onboarding",
        impact: "-40% onboarding time (from 15+ min to 7-11 min)",
        phases: ["Research", "UI Design", "Testing", "Iteration"],
      },
      {
        company: "Transvip",
        project: "Driver Dashboard",
        impact: "+37% operational efficiency",
        phases: ["Analytics", "Research", "UI Design", "Testing", "Iteration"],
      },
      {
        company: "Karri (Transvip)",
        project: "Fare Calculator",
        impact: "-60% support queries about pricing",
        phases: ["Research", "UI Design", "Testing"],
      },
    ],
  },
};
