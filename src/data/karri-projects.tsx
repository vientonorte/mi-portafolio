import { TrendingUp, Users, Clock, Target, Lightbulb, Map, Target as TargetIcon } from "lucide-react";
import Component1Intro from "../imports/1Intro";
import Component2CabifyResumen from "../imports/2CabifyResumen";
import Component3UberResumen from "../imports/3UberResumen";
import Component4Brief from "../imports/4Brief-3-7056";
import Component5ViajeDelUsuario from "../imports/5ViajeDelUsuario-3-7060";
import Component5OkRs from "../imports/5OkRs-3-7064";
import ComponentSidebarCliente from "../imports/SidebarCliente-3-6340";
import ComponentMisPagos from "../imports/MisPagos";
import {
  karriLogo,
  karriBoosmapBenchmark,
  karriIdUpload,
  karriDeliveryPhoto,
  karriZubaleDocuments,
  karriOkrsBoard,
  karriSprintBrief1,
  karriSprintBrief2,
  transvipProductVision,
} from "./project-images";

export const karriCalculadoraProject = {
  id: "karri-calculadora",
  name: "Karri - Calculadora de Ganancias",
  projectName: "Karri - Calculadora de Ganancias",
  company: "Transvip / Karri",
  companyLogo: karriLogo,
  role: "Lead UX Designer",
  period: "2022-2023",
  image: karriBoosmapBenchmark,
  description: "Sistema de simulación de ingresos para shoppers que permite calcular ganancias proyectadas basadas en parámetros reales de trabajo, mejorando la transparencia y confianza en la plataforma.",
  descriptionEN: "Income simulation system for shoppers to calculate projected earnings based on real work parameters, improving transparency and trust on the platform.",
  details: {
    challenge: "Los shoppers de Karri no podían estimar sus ingresos potenciales antes de comenzar, generando incertidumbre sobre la rentabilidad del trabajo.",
    solution: "Calculadora interactiva con benchmark de competidores (BOOSMAP, ZUBALE) y simulación de escenarios de trabajo.",
    mockups: [karriBoosmapBenchmark, karriIdUpload],
  },
  tags: ["Figma", "React Native", "UX Research", "Mobile First", "Design System"],
  challenge: {
    problem: "Los shoppers de Karri no podían estimar sus ingresos potenciales antes de comenzar, generando incertidumbre sobre la rentabilidad del trabajo. No existía transparencia en cómo se calculaban las ganancias ni cómo optimizar sus tiempos para maximizar ingresos.",
    solution: "Diseñé una calculadora interactiva que permite a los shoppers simular diferentes escenarios de trabajo (horas por día, días por semana, tipo de pedidos) y visualizar sus ganancias proyectadas. La herramienta incluye información educativa sobre comisiones, bonos y factores que impactan los ingresos.",
  },
  processesApplied: [
    {
      id: "ux-analytics",
      number: "01",
      name: "UX Analytics",
      description: "Análisis cuantitativo de comportamiento con herramientas de analytics",
      activities: [
        "Análisis de tasas de conversión en el funnel de registro",
        "Identificación de puntos de abandono en el proceso de onboarding",
        "Estudio de sesiones de usuarios mediante heatmaps y recordings",
        "Benchmark cuantitativo de competidores (Cornershop, Rappi)"
      ],
      impact: "Descubrimos que el 65% de shoppers abandonaban el proceso al no entender el modelo de ingresos",
      metrics: [
        { label: "Tasa de abandono inicial", value: "65%" },
        { label: "Apps analizadas", value: "4" },
        { label: "Heatmaps revisadas", value: "150+" }
      ]
    },
    {
      id: "ux-research",
      number: "02",
      name: "UX Research",
      description: "Investigación cualitativa con usuarios finales y stakeholders",
      activities: [
        "Entrevistas en profundidad con 12 shoppers activos e inactivos",
        "Benchmark cualitativo: Análisis heurístico de BOOSMAP y ZUBALE",
        "Análisis de feedback de usuarios en canales de soporte",
        "Job to be Done: ¿Qué 'contrata' un shopper al usar Karri?"
      ],
      impact: "Validamos que la transparencia en ingresos es el factor #1 de decisión para nuevos shoppers",
      metrics: [
        { label: "Entrevistas realizadas", value: "12" },
        { label: "Competidores analizados", value: "2" },
        { label: "Insights clave", value: "8" }
      ]
    },
    {
      id: "ux-ui-design",
      number: "03",
      name: "UX/UI Design",
      description: "Ideación colaborativa, wireframes y prototipos interactivos",
      activities: [
        "Crazy 8's para explorar diferentes formatos de calculadora",
        "Wireframes de flujo completo en baja fidelidad",
        "Diseño UI en Figma aplicando Design System de Karri",
        "Prototipo interactivo con animaciones y feedback visual",
        "Documentación de componentes para desarrollo"
      ],
      impact: "Creamos una interfaz intuitiva que permite simular escenarios en menos de 30 segundos",
      metrics: [
        { label: "Iteraciones de diseño", value: "5" },
        { label: "Componentes creados", value: "12" },
        { label: "Pantallas diseñadas", value: "8" }
      ]
    },
    {
      id: "ux-testing",
      number: "04",
      name: "UX Testing",
      description: "Validación de prototipos con usuarios reales mediante testing",
      activities: [
        "Guerrilla testing con 8 shoppers potenciales",
        "Testing de usabilidad moderado con 5 usuarios",
        "A/B testing de dos variantes de la calculadora",
        "Análisis de métricas de comprensión del modelo de ingresos"
      ],
      impact: "La calculadora alcanzó 92% de tasa de comprensión en testing, vs 45% del modelo anterior",
      metrics: [
        { label: "Usuarios testeados", value: "13" },
        { label: "Tasa de éxito", value: "92%" },
        { label: "Errores críticos", value: "0" }
      ]
    },
    {
      id: "refinamiento",
      number: "05",
      name: "Refinamiento",
      description: "Iteración continua post-lanzamiento basada en métricas",
      activities: [
        "Análisis de adopción de la feature (% de shoppers que la usan)",
        "Seguimiento de correlación entre uso de calculadora y activación",
        "Ajustes en copy basados en feedback de usuarios",
        "Optimización de parámetros default de la calculadora"
      ],
      impact: "Post-lanzamiento, el uso de la calculadora correlacionó con +35% de activación de shoppers",
      metrics: [
        { label: "Adopción de feature", value: "78%" },
        { label: "Mejora en activación", value: "+35%" },
        { label: "Iteraciones post-launch", value: "3" }
      ]
    }
  ],
  designComponents: [Component1Intro, Component2CabifyResumen, Component3UberResumen],
  designComponentNames: ["Introducción Benchmark", "Análisis BOOSMAP", "Análisis ZUBALE"],
  results: [
    {
      label: "Aumento en activación",
      value: "+35%",
      description: "Incremento en shoppers que completan su primer pedido tras usar la calculadora",
      icon: TrendingUp
    },
    {
      label: "Tasa de comprensión",
      value: "92%",
      description: "Shoppers que entienden correctamente el modelo de ingresos tras usar la herramienta",
      icon: Target
    },
    {
      label: "Adopción de feature",
      value: "78%",
      description: "Nuevos shoppers que utilizan la calculadora durante el onboarding",
      icon: Users
    },
    {
      label: "Tiempo de comprensión",
      value: "-60%",
      description: "Reducción en tiempo necesario para que shoppers entiendan el modelo de ingresos",
      icon: Clock
    }
  ]
};

export const karriNotificacionesProject = {
  id: "karri-notificaciones",
  name: "Karri - Sistema de Notificaciones + Onboarding",
  projectName: "Karri - Sistema de Notificaciones + Onboarding",
  company: "Transvip / Karri",
  companyLogo: karriLogo,
  role: "Lead UX Designer",
  period: "2022-2023",
  image: karriDeliveryPhoto,
  description: "Hub centralizado de notificaciones y flujo de autenticación optimizado para shoppers. Reduce la carga cognitiva, mejora la retención y facilita la gestión de tareas críticas.",
  descriptionEN: "Centralized notification hub and optimized authentication flow for shoppers. Reduces cognitive load, improves retention, and streamlines critical task management.",
  details: {
    challenge: "Notificaciones dispersas en push, SMS y email sin centro unificado. Autenticación confusa con alto abandono.",
    solution: "Hub de notificaciones categorizado y onboarding simplificado de 7 a 4 pasos con feedback visual claro.",
    mockups: [karriDeliveryPhoto, karriZubaleDocuments],
  },
  tags: ["Figma", "React Native", "Information Architecture", "Mobile UX", "Accessibility"],
  challenge: {
    problem: "Las notificaciones de Karri llegaban dispersas por múltiples canales (push, SMS, email) sin un centro unificado. Los shoppers perdían información crítica sobre pedidos, bonos y actualizaciones. El proceso de autenticación era confuso y generaba abandono en el registro.",
    solution: "Diseñé un hub de notificaciones centralizado con categorización inteligente, estados visuales claros y gestión de acciones rápidas. Además, simplifiqué el flujo de onboarding/autenticación, reduciendo pasos innecesarios y mejorando el feedback en cada etapa.",
  },
  processesApplied: [
    {
      id: "ux-analytics",
      number: "01",
      name: "UX Analytics",
      description: "Análisis cuantitativo de comportamiento con herramientas de analytics",
      activities: [
        "Análisis de tasa de apertura y engagement con notificaciones push",
        "Estudio de abandono en el flujo de autenticación/registro",
        "Análisis de sesiones: ¿Dónde buscan los shoppers información importante?",
        "Identificación de notificaciones con menor tasa de acción"
      ],
      impact: "Detectamos que el 40% de shoppers no encontraban notificaciones importantes enviadas hace más de 24h",
    },
    {
      id: "ux-research",
      number: "02",
      name: "UX Research",
      description: "Investigación cualitativa con usuarios finales y stakeholders",
      activities: [
        "Entrevistas con 10 shoppers sobre gestión de notificaciones",
        "Card sorting para categorización de tipos de notificaciones",
        "Análisis de apps de referencia (WhatsApp, Gmail, LinkedIn)",
        "Testing de flujos de autenticación de competidores"
      ],
      impact: "Descubrimos que shoppers priorizan notificaciones por urgencia, no por tipo",
    },
    {
      id: "ux-ui-design",
      number: "03",
      name: "UX/UI Design",
      description: "Ideación colaborativa, wireframes y prototipos interactivos",
      activities: [
        "Arquitectura de información del hub de notificaciones",
        "Diseño de sistema de categorización y filtros",
        "Prototipo de flujo de onboarding simplificado",
        "Diseño de estados: no leído, leído, accionado, archivado",
        "Documentación de patrones de interacción"
      ],
      impact: "Redujimos de 7 a 4 pasos el flujo de autenticación sin perder información crítica",
    },
    {
      id: "ux-testing",
      number: "04",
      name: "UX Testing",
      description: "Validación de prototipos con usuarios reales mediante testing",
      activities: [
        "Testing de usabilidad del hub con 8 shoppers",
        "Testing de navegación y búsqueda de notificaciones antiguas",
        "Validación de comprensión de categorías y prioridades",
        "Testing del flujo de onboarding optimizado"
      ],
      impact: "100% de usuarios logró encontrar notificaciones específicas en menos de 10 segundos",
    },
    {
      id: "refinamiento",
      number: "05",
      name: "Refinamiento",
      description: "Iteración continua post-lanzamiento basada en métricas",
      activities: [
        "Monitoreo de tasa de engagement con notificaciones",
        "Análisis de categorías más consultadas",
        "Ajustes en priorización basados en comportamiento real",
        "Optimización de copy de notificaciones push"
      ],
      impact: "El engagement con notificaciones aumentó un 58% post-lanzamiento del hub",
    }
  ],
  designComponents: [ComponentSidebarCliente, ComponentMisPagos],
  designComponentNames: ["Centro de notificaciones", "Mis pagos — shopper"],
  results: [
    {
      label: "Engagement con notificaciones",
      value: "+58%",
      description: "Aumento en interacción con notificaciones tras implementar el hub centralizado",
      icon: TrendingUp
    },
    {
      label: "Reducción de abandono",
      value: "-42%",
      description: "Menor abandono en el flujo de autenticación optimizado",
      icon: Target
    },
    {
      label: "Tiempo de búsqueda",
      value: "-75%",
      description: "Reducción en tiempo para encontrar notificaciones importantes",
      icon: Clock
    },
    {
      label: "Satisfacción de usuarios",
      value: "4.6/5",
      description: "Rating promedio de shoppers sobre el nuevo sistema de notificaciones",
      icon: Users
    }
  ]
};

export const karriDesignSprintProject = {
  id: "karri-design-sprint",
  name: "Karri - Workshop de Estrategia de Producto",
  projectName: "Karri - Workshop de Estrategia de Producto",
  company: "Transvip / Karri",
  companyLogo: karriLogo,
  role: "Lead UX Designer & Workshop Facilitator",
  period: "Agosto 2023",
  image: karriOkrsBoard,
  description: "Taller intensivo de 3 sesiones que alineó al equipo completo en la estrategia de producto. Creamos el brief colaborativo, mapeamos el journey completo del shopper y priorizamos MVPs con OKRs medibles.",
  descriptionEN: "Intensive 3-session workshop aligning the full team on product strategy: collaborative brief, shopper journey map, and MVP prioritization with measurable OKRs.",
  details: {
    challenge: "Información dispersa y falta de consenso sobre la visión del producto Karri.",
    solution: "3 talleres: brief colaborativo, journey map (24 touchpoints) y OKRs con 3 MVPs priorizados.",
    mockups: [karriSprintBrief1, karriSprintBrief2, karriOkrsBoard],
  },
  tags: ["Design Sprint", "Facilitation", "Product Strategy", "Journey Mapping", "OKR Planning"],
  challenge: {
    problem: "El equipo tenía información dispersa y falta de consenso sobre la visión del producto. No existía un mapa claro del journey del shopper ni priorización de funcionalidades para los MVPs.",
    solution: "Facilité 3 talleres colaborativos donde alineamos la visión del equipo, mapeamos el journey completo identificando 15+ oportunidades y definimos un roadmap de 3 MVPs con OKRs medibles.",
  },
  processesApplied: [
    {
      id: "session-1-brief",
      number: "01",
      name: "Brief & Alineación Estratégica",
      description: "Co-creación del brief del proyecto con stakeholders clave",
      activities: [
        "Creamos lenguaje común: Alineamos al equipo en conceptos de UX y producto",
        "Definimos el brief: Objetivos, alcances y restricciones del proyecto",
        "Establecimos prioridades: Qué resolver primero y qué dejar fuera del MVP",
        "Documentamos limitaciones: Restricciones técnicas y de negocio"
      ],
      impact: "Logramos consenso del 100% en objetivos estratégicos, eliminando ambigüedad en decisiones futuras",
      metrics: [
        { label: "Stakeholders participantes", value: "8" },
        { label: "Objetivos definidos", value: "12" },
        { label: "Consenso logrado", value: "100%" }
      ]
    },
    {
      id: "session-2-journey",
      number: "02",
      name: "Journey Mapping Colaborativo",
      description: "Mapeo visual del viaje completo del shopper desde descubrimiento hasta retención",
      activities: [
        "Mapeamos 24 touchpoints: Desde el primer contacto hasta fidelización",
        "Identificamos 8 pain points críticos: Fricciones que impactan conversión",
        "Descubrimos 15+ oportunidades: Momentos para agregar valor al shopper",
        "Priorizamos quick wins: Mejoras de alto impacto y baja complejidad"
      ],
      impact: "El mapa visual del journey se convirtió en la herramienta central para todas las decisiones de producto",
      metrics: [
        { label: "Puntos de contacto mapeados", value: "24" },
        { label: "Oportunidades identificadas", value: "15+" },
        { label: "Pain points críticos", value: "8" }
      ]
    },
    {
      id: "session-3-okrs",
      number: "03",
      name: "OKRs & Roadmap de MVPs",
      description: "Traducción del journey en objetivos medibles y roadmap ejecutable",
      activities: [
        "Definimos 5 OKRs clave: Objetivos medibles para el éxito del producto",
        "Priorizamos MVP 1: 12 features esenciales para lanzamiento inicial",
        "Planeamos escalamiento: MVP 2 y MVP 3 con features secundarias",
        "Validamos viabilidad técnica: Alineación con desarrollo sobre timings"
      ],
      impact: "Pasamos de 'tenemos muchas ideas' a un roadmap claro con 3 MVPs priorizados y OKRs medibles",
      metrics: [
        { label: "OKRs establecidos", value: "5" },
        { label: "Features MVP1", value: "12" },
        { label: "MVPs planificados", value: "3" }
      ]
    }
  ],
  designComponents: [Component4Brief, Component5ViajeDelUsuario, Component5OkRs],
  designComponentNames: ["Brief del Proyecto", "Customer Journey Map", "OKRs y Roadmap"],
  results: [
    {
      label: "Consenso del equipo",
      value: "100%",
      description: "Equipo completo alineado en visión estratégica y prioridades del producto",
      icon: Users
    },
    {
      label: "Oportunidades mapeadas",
      value: "15+",
      description: "Momentos de valor identificados en el journey para optimizar experiencia",
      icon: Lightbulb
    },
    {
      label: "Roadmap definido",
      value: "3 MVPs",
      description: "Plan de producto claro con features priorizadas y OKRs medibles",
      icon: Map
    },
    {
      label: "Velocidad de decisión",
      value: "-70%",
      description: "Reducción en tiempo de toma de decisiones gracias a framework compartido",
      icon: Clock
    }
  ]
};