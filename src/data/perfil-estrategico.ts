/**
 * Contenido del Perfil Estratégico (réplica en código del mapa de identidad).
 * Texto real en DOM — no depende de una imagen pegada.
 */
export type PerfilStep = {
  n: number;
  titleEs: string;
  titleEn: string;
  bodyEs: string;
  bodyEn: string;
  /** Tailwind accent for the step disc */
  accent: string;
};

export const PERFIL_CYCLE: PerfilStep[] = [
  {
    n: 1,
    titleEs: "Observa",
    titleEn: "Observe",
    bodyEs: "Analiza el contexto, identifica patrones, actores y tensiones.",
    bodyEn: "Analyze context; spot patterns, actors, and tensions.",
    accent: "bg-sky-500/15 text-sky-700 dark:text-sky-300 ring-sky-500/30",
  },
  {
    n: 2,
    titleEs: "Entiende",
    titleEn: "Understand",
    bodyEs: "Comprende estructuras, incentivos y restricciones invisibles.",
    bodyEn: "Grasp structures, incentives, and hidden constraints.",
    accent: "bg-lime-500/15 text-lime-700 dark:text-lime-300 ring-lime-500/30",
  },
  {
    n: 3,
    titleEs: "Diseña",
    titleEn: "Design",
    bodyEs: "Define estrategias, modela soluciones, prioriza impacto.",
    bodyEn: "Define strategy, model solutions, prioritize impact.",
    accent: "bg-amber-500/15 text-amber-800 dark:text-amber-300 ring-amber-500/30",
  },
  {
    n: 4,
    titleEs: "Interviene",
    titleEn: "Intervene",
    bodyEs: "Implementa en pequeño, valida con usuarios y datos.",
    bodyEn: "Ship small; validate with users and data.",
    accent: "bg-violet-500/15 text-violet-700 dark:text-violet-300 ring-violet-500/30",
  },
  {
    n: 5,
    titleEs: "Mide",
    titleEn: "Measure",
    bodyEs: "Mide impacto real, aprende, ajusta y vuelve a iterar.",
    bodyEn: "Measure real impact, learn, adjust, iterate.",
    accent: "bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 ring-cyan-500/30",
  },
  {
    n: 6,
    titleEs: "Escala",
    titleEn: "Scale",
    bodyEs: "Escala lo que funciona, documenta y convierte en capacidad.",
    bodyEn: "Scale what works; document and turn into capability.",
    accent: "bg-rose-500/15 text-rose-700 dark:text-rose-300 ring-rose-500/30",
  },
];

/**
 * Campos del perfil + score 1–5 para radar “Dónde sumo”.
 * Scores: evidencia de trayectoria (SURA wealth, DS, a11y, micro1, VN).
 */
export type PerfilFieldAxis = {
  id: string;
  labelEs: string;
  labelEn: string;
  detailEs: string;
  detailEn: string;
  /** Intensidad 1–5 (eje del radar) */
  score: number;
};

export const PERFIL_FIELD_AXES: readonly PerfilFieldAxis[] = [
  {
    id: "diseno",
    labelEs: "Diseño",
    labelEn: "Design",
    detailEs: "Experiencia y comportamiento — interfaces de producto",
    detailEn: "Experience and behavior — product interfaces",
    score: 5,
  },
  {
    id: "datos",
    labelEs: "Datos",
    labelEn: "Data",
    detailEs: "Evidencia y medición — analytics, embudos, KPIs",
    detailEn: "Evidence and measurement — analytics, funnels, KPIs",
    score: 4,
  },
  {
    id: "tecnologia",
    labelEs: "Tecnología",
    labelEn: "Technology",
    detailEs: "Automatización y capacidad — systems, handoff, tools",
    detailEn: "Automation and capacity — systems, handoff, tools",
    score: 4,
  },
  {
    id: "negocio",
    labelEs: "Negocio",
    labelEn: "Business",
    detailEs: "Valor y priorización — product/wealth, P0–P2",
    detailEn: "Value and prioritization — product/wealth, P0–P2",
    score: 5,
  },
  {
    id: "regulacion",
    labelEs: "Regulación",
    labelEn: "Regulation",
    detailEs: "Límites institucionales — CMF, compliance UX",
    detailEn: "Institutional limits — CMF, compliance UX",
    score: 5,
  },
  {
    id: "privacidad",
    labelEs: "Privacidad",
    labelEn: "Privacy",
    detailEs: "Poder sobre los datos — privacy dashboard, minimización",
    detailEn: "Power over data — privacy dashboard, minimization",
    score: 4,
  },
  {
    id: "ia",
    labelEs: "IA",
    labelEn: "AI",
    detailEs: "Multiplicación de capacidad — micro1 AI data, anotación/QA",
    detailEn: "Capability multiplier — micro1 AI data, annotation/QA",
    score: 4,
  },
  {
    id: "finanzas",
    labelEs: "Finanzas",
    labelEn: "Finance",
    detailEs: "Restricciones y sostenibilidad — wealth / fondos",
    detailEn: "Constraints and sustainability — wealth / funds",
    score: 4,
  },
  {
    id: "comunicacion",
    labelEs: "Comunicación",
    labelEn: "Communication",
    detailEs: "Legitimación y alineación — puentes negocio·diseño·tech",
    detailEn: "Legitimacy and alignment — business·design·tech bridges",
    score: 4,
  },
] as const;

/** @deprecated use PERFIL_FIELD_AXES — kept for callers expecting es/en arrays */
export const PERFIL_FIELDS = {
  es: PERFIL_FIELD_AXES.map((a) => ({
    label: a.labelEs,
    detail: a.detailEs,
  })),
  en: PERFIL_FIELD_AXES.map((a) => ({
    label: a.labelEn,
    detail: a.detailEn,
  })),
} as const;

export const PERFIL_DOES = {
  es: [
    "Convierte problemas complejos en sistemas de decisión simples y accionables.",
    "Diseña experiencias centradas en las personas con enfoque en negocio y datos.",
    "Usa IA, automatización y datos para multiplicar impacto y eficiencia.",
    "Construye puentes entre tecnología, negocio, diseño y regulación.",
  ],
  en: [
    "Turns complex problems into simple, actionable decision systems.",
    "Designs people-centered experiences with business and data focus.",
    "Uses AI, automation, and data to multiply impact and efficiency.",
    "Builds bridges between technology, business, design, and regulation.",
  ],
} as const;

export const PERFIL_PROJECTS = {
  es: [
    "Separación de bases de datos · AFP – SURA Investments",
    "Privacy Dashboard",
    "Onboarding & flujos (Hazte Cliente SURA)",
    "Design System & accesibilidad",
    "Analytics & experimentación",
  ],
  en: [
    "Database separation · AFP – SURA Investments",
    "Privacy Dashboard",
    "Onboarding & flows (SURA Hazte Cliente)",
    "Design system & accessibility",
    "Analytics & experimentation",
  ],
} as const;

export const PERFIL_EQUATION = {
  es: {
    parts: ["Curiosidad", "Sistemas", "Estrategia"],
    result: "Impacto",
    tagline: "Menos dependencia, más capacidad de maniobra.",
  },
  en: {
    parts: ["Curiosity", "Systems", "Strategy"],
    result: "Impact",
    tagline: "Less dependency, more room to maneuver.",
  },
} as const;

export const PERFIL_NORTAMIENTO = {
  es: "Vivir con propósito: crear sistemas que generen valor y libertad para mí y quienes me rodean.",
  en: "Live with purpose: build systems that create value and freedom for me and those around me.",
} as const;

export const PERFIL_QUOTE = {
  es: "No se trata de hacer más. Se trata de diseñar mejores sistemas para tomar mejores decisiones.",
  en: "It’s not about doing more. It’s about designing better systems for better decisions.",
} as const;

export const PERFIL_TAGLINE = {
  es: "Transforma complejidad en capacidad de decisión",
  en: "Turns complexity into decision-making capacity",
} as const;

export const PERFIL_IDENTITY = {
  es: [
    "Nació para entender sistemas complejos y convertirlos en soluciones simples y útiles.",
    "Empático, ético y colaborativo. Diseño centrado en personas y en datos.",
    "Curioso, autodidacta y resiliente — siempre explorando nuevas fronteras.",
  ],
  en: [
    "Wired to understand complex systems and turn them into simple, useful solutions.",
    "Empathetic, ethical, collaborative. People- and data-centered design.",
    "Curious, self-taught, resilient — always exploring new frontiers.",
  ],
} as const;

export const PERFIL_TOOLS = [
  "Figma / FigJam",
  "Analytics / Data",
  "IA & automatización",
  "Design Systems",
  "GitHub / Obsidian",
  "MacBook / iPad / iPhone",
] as const;
