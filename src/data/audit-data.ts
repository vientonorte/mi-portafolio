// Datos de la auditoría del portfolio UX/UI
export const auditData = {
  meta: {
    title: "Auditoría Portfolio UX/UI + Plan de Mentoría",
    subtitle: "Análisis estratégico preliminar del portfolio Webflow de Laura",
    author: "Rodrigo Gaete",
    role: "UX Lead",
    date: "2026-05-19"
  },

  executiveSummary: `El portfolio de Laura presenta una base visual limpia y funcional. Sin embargo, adolece de riesgos críticos de negocio: (1) Propuesta de valor genérica que no diferencia del mercado, (2) Ausencia total de métricas cuantificables en proyectos, (3) Falta de storytelling sobre proceso y decisiones estratégicas, (4) Arquitectura SEO/AEO insuficiente para búsquedas de IA. Estos gaps dificultan el posicionamiento profesional, negociación salarial y visibilidad ante recruiters tech. El plan de mentoría propuesto busca transformar el portfolio de "galería visual" a "herramienta de venta profesional" mediante especialización clara, narrativa de impacto medible y optimización para búsqueda semántica.`,

  portfolioSections: [
    {
      id: "hero",
      title: "Hero Section",
      observations: [
        '❌ Título genérico compite con 10,000+ perfiles similares',
        '⚠️ Claim sin respaldo métrico ni evidencia',
        '💡 Necesita especialización clara y nicho específico'
      ]
    },
    {
      id: "projects",
      title: "Sección de Proyectos",
      observations: [
        '❌ Solo thumbnails sin contexto ni proceso',
        '⚠️ Falta rol específico y tipo de participación',
        '💡 Requiere: Desafío → Proceso → Impacto medible'
      ]
    },
    {
      id: "case-study",
      title: "Estudios de Caso",
      observations: [
        '🚨 Ausencia total de métricas cuantificables',
        '❌ Sin storytelling ni validación externa',
        '💡 Framework completo: Problema → Solución → KPIs'
      ]
    }
  ],

  mainFindings: [
    {
      category: "SEO/Indexabilidad IA",
      severity: "high" as const,
      description: "Sin schema markup, meta tags genéricas, arquitectura semántica insuficiente. Invisible para búsquedas de ChatGPT, Perplexity y Google AI."
    },
    {
      category: "Impacto Cuantificable",
      severity: "high" as const,
      description: "Ausencia de métricas en todos los proyectos (conversión, engagement, NPS). Imposibilita validación de resultados y debilita negociación salarial."
    },
    {
      category: "Diferenciación Competitiva",
      severity: "high" as const,
      description: "Posicionamiento genérico sin nicho vertical. Compite directamente con miles de perfiles sin especialización clara."
    },
    {
      category: "Validación Social",
      severity: "medium" as const,
      description: "Sin testimonios de clientes, logos de empresas reconocidas ni casos documentados con stakeholders identificables."
    }
  ],

  risks: [
    {
      risk: "Recruiters tech no comprenden expertise específico en menos de 10 segundos",
      impact: "Muy Alto",
      priority: "P1"
    },
    {
      risk: "Invisible para herramientas de búsqueda IA (ChatGPT, Perplexity, Claude)",
      impact: "Muy Alto",
      priority: "P1"
    },
    {
      risk: "Ausencia de métricas debilita justificación de rango salarial esperado",
      impact: "Alto",
      priority: "P1"
    },
    {
      risk: "Hiring managers no identifican capacidad de pensamiento estratégico UX",
      impact: "Alto",
      priority: "P2"
    },
    {
      risk: "Sin validación social externa que respalde claims de experiencia",
      impact: "Medio",
      priority: "P2"
    }
  ],

  caseStudyStructure: [
    "Contexto",
    "Problema",
    "Rol específico",
    "Restricciones",
    "Proceso UX",
    "Decisiones clave",
    "Trade-offs",
    "Impacto",
    "Métricas",
    "Aprendizajes"
  ],

  quickWins: [
    'Reescribir hero con especialización: "UX/UI Designer especializada en [SaaS/E-commerce/Fintech] · [X años] de experiencia"',
    'Agregar 2-3 métricas cuantificables por proyecto: Conversión, NPS, tiempo de tarea, engagement',
    'Desarrollar 1 case study completo: Contexto → Desafío → Proceso → Solución → Impacto (KPIs) → Aprendizajes',
    'Implementar schema markup: schema.org/Person + schema.org/CreativeWork',
    'Incluir 3 testimonios con nombre completo, cargo y empresa del stakeholder',
    'Optimizar meta title SEO: "Laura López | [Especialización] UX Designer | Portfolio & Case Studies"'
  ],

  mentorshipPlan: [
    {
      session: 1,
      title: "Posicionamiento Estratégico",
      objective: "Definir especialización, nicho vertical y narrativa profesional única",
      deliverables: ["Mapa de fortalezas diferenciadas", "Framework de storytelling UX", "Matriz de priorización"]
    },
    {
      session: 2,
      title: "Arquitectura & Contenido",
      objective: "Rediseñar estructura informativa y optimizar para SEO semántico",
      deliverables: ["Wireframe portfolio optimizado", "Checklist técnico SEO/A11Y", "Template case study"]
    },
    {
      session: 3,
      title: "Implementación & Validación",
      objective: "Ejecutar mejoras críticas y preparar para búsqueda IA",
      deliverables: ["Portfolio actualizado", "Schema markup implementado", "Plan de mejora continua"]
    }
  ],

  kpis: [
    {
      metric: "Tiempo promedio en portfolio",
      target: "+35%"
    },
    {
      metric: "Comprensión de especialización",
      target: "<10s"
    },
    {
      metric: "Lighthouse Performance",
      target: "90+"
    },
    {
      metric: "Accesibilidad WCAG",
      target: "2.2 AA"
    }
  ]
};
