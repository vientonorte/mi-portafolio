import type { Language } from "../lib/i18n";

export type ConsultingPackageId = "radar" | "marco" | "ops";

export interface ConsultingPackage {
  id: ConsultingPackageId;
  /** Título humano (alineado al hero) */
  name: Record<Language, string>;
  /** Nombre técnico del pack (Radar · Marco · Ops) */
  packLabel: Record<Language, string>;
  tagline: Record<Language, string>;
  duration: Record<Language, string>;
  /** Qué te llevas (producto) */
  youGet: Record<Language, string>;
  deliverables: Record<Language, string[]>;
  featured?: boolean;
}

export const CONSULTING_PACKAGES: ConsultingPackage[] = [
  {
    id: "radar",
    name: { es: "Diagnóstico", en: "Diagnostic" },
    packLabel: { es: "Radar", en: "Radar" },
    tagline: {
      es: "Diagnóstico express 5–7 días. Entrada gratis: WCAG 2.2 AA de un flujo crítico.",
      en: "Express diagnostic 5–7 days. Free entry: WCAG 2.2 AA on one critical flow.",
    },
    duration: { es: "5–7 días hábiles", en: "5–7 business days" },
    youGet: {
      es: "Informe y plan de mejoras",
      en: "Report and improvement plan",
    },
    deliverables: {
      es: [
        "Entrada gratis: revisión WCAG 2.2 AA de un flujo crítico",
        "Si aplica: Radar completo (5–7 días) con plan de mejoras",
        "Informe corto con acciones prioritarias",
      ],
      en: [
        "Free entry: WCAG 2.2 AA review of one critical flow",
        "If needed: full Radar (5–7 days) with improvement plan",
        "Short report with priority actions",
      ],
    },
  },
  {
    id: "marco",
    featured: true,
    name: { es: "Prototipo", en: "Prototype" },
    packLabel: { es: "Marco", en: "Marco" },
    tagline: {
      es: "Pantallas listas para construir. Incluye diagnóstico y 3 sesiones.",
      en: "Screens ready to build. Includes diagnostic and 3 sessions.",
    },
    duration: { es: "3–4 semanas", en: "3–4 weeks" },
    youGet: {
      es: "Prototipo + entrega a desarrollo",
      en: "Prototype + handoff to development",
    },
    deliverables: {
      es: [
        "Incluye el diagnóstico express",
        "Prototipo navegable de flujos clave",
        "Entrega lista para que lo construyan",
      ],
      en: [
        "Includes the express diagnostic",
        "Navigable prototype of key flows",
        "Handoff ready for builders",
      ],
    },
  },
  {
    id: "ops",
    name: { es: "Proceso de equipo", en: "Team process" },
    packLabel: { es: "Ops", en: "Ops" },
    tagline: {
      es: "Ordenar cómo diseña y entrega tu equipo.",
      en: "Organize how your team designs and delivers.",
    },
    duration: { es: "4–6 semanas", en: "4–6 weeks" },
    youGet: {
      es: "Guía del equipo + cómo medir",
      en: "Team guide + how to measure",
    },
    deliverables: {
      es: [
        "Proceso de trabajo aplicado a tu producto",
        "Talleres con producto e ingeniería",
        "Guía del equipo + adopción",
      ],
      en: [
        "Working process applied to your product",
        "Workshops with product and engineering",
        "Team guide + adoption",
      ],
    },
  },
];

export const CONSULTING_INDUSTRIES = {
  es: ["Fintech", "Mobility", "Enterprise", "SaaS", "Retail", "Educación", "Otro"],
  en: ["Fintech", "Mobility", "Enterprise", "SaaS", "Retail", "Education", "Other"],
} as const;

/** Prefill onboarding / contacto — Partner de desarrollo · Proyectos educativos */
export const PARTNER_EDU_CONTACT_GOAL: Record<Language, string> = {
  es: `Hola Viento Norte — busco partner de desarrollo para proyectos educativos.

Quiero agendar una videollamada para explorar colaboración en UX, producto digital y desarrollo de experiencias de aprendizaje.

Contexto: [institución / programa / plataforma].
Necesidad: [diagnóstico · prototipo · proceso de equipo · app funcional · otro].
Disponibilidad: [días / franja horaria].

Gracias — agendemos la videollamada.`,
  en: `Hi Viento Norte — looking for a development partner for educational projects.

I'd like to schedule a video call to explore collaboration on UX, digital product, and learning-experience development.

Context: [institution / program / platform].
Need: [diagnostic · prototype · team process · working app · other].
Availability: [days / time window].

Thanks — let's schedule the video call.`,
};

/** @deprecated use PARTNER_EDU_CONTACT_GOAL */
export const PARTEN_EDU_CONTACT_GOAL = PARTNER_EDU_CONTACT_GOAL;

export const CONSULTING_TIMELINES = {
  es: ["Inmediato", "1–2 semanas", "1 mes", "Flexible"],
  en: ["Immediate", "1–2 weeks", "1 month", "Flexible"],
} as const;

export function getConsultingPackage(id: ConsultingPackageId) {
  return CONSULTING_PACKAGES.find((p) => p.id === id);
}

export function buildConsultingContactMessage(
  language: Language,
  pkg: ConsultingPackage,
  industry: string,
  goal: string,
  timeline: string
): string {
  if (language === "es") {
    return [
      "Hola Viento Norte — solicitud vía onboarding.",
      "",
      `Modalidad: ${pkg.name.es} (${pkg.packLabel.es})`,
      `Industria: ${industry}`,
      `Plazo: ${timeline}`,
      "",
      "Objetivo:",
      goal.trim(),
      "",
      "Quedo atento/a a coordinar kickoff.",
    ].join("\n");
  }
  return [
    "Hi Viento Norte — request via onboarding.",
    "",
    `Format: ${pkg.name.en} (${pkg.packLabel.en})`,
    `Industry: ${industry}`,
    `Timeline: ${timeline}`,
    "",
    "Goal:",
    goal.trim(),
    "",
    "Looking forward to scheduling a kickoff.",
  ].join("\n");
}
