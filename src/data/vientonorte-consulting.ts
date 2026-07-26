import type { Language } from "../lib/i18n";

export type ConsultingPackageId = "radar" | "marco" | "ops";

export interface ConsultingPackage {
  id: ConsultingPackageId;
  name: Record<Language, string>;
  tagline: Record<Language, string>;
  duration: Record<Language, string>;
  deliverables: Record<Language, string[]>;
  featured?: boolean;
}

export const CONSULTING_PACKAGES: ConsultingPackage[] = [
  {
    id: "radar",
    name: { es: "Diagnóstico express", en: "Express diagnostic" },
    tagline: {
      es: "Diagnóstico en 5–7 días. Entrada gratis: accesibilidad de un flujo.",
      en: "Diagnostic in 5–7 days. Free entry: accessibility on one flow.",
    },
    duration: { es: "5–7 días hábiles", en: "5–7 business days" },
    deliverables: {
      es: [
        "Entrada gratis: accesibilidad de un flujo",
        "Revisión de usabilidad + plan de mejoras",
        "Informe corto con acciones prioritarias",
      ],
      en: [
        "Free entry: accessibility on one flow",
        "Usability review + improvement plan",
        "Short report with priority actions",
      ],
    },
  },
  {
    id: "marco",
    featured: true,
    name: { es: "Estrategia guiada", en: "Guided strategy" },
    tagline: {
      es: "La opción más pedida: diagnóstico + 3 sesiones de trabajo.",
      en: "Most requested: diagnostic + 3 working sessions.",
    },
    duration: { es: "3–4 semanas", en: "3–4 weeks" },
    deliverables: {
      es: [
        "Incluye el diagnóstico express",
        "3 sesiones: foco, estructura y validación",
        "Lista de salida para lanzar o iterar",
      ],
      en: [
        "Includes the express diagnostic",
        "3 sessions: focus, structure, validation",
        "Launch or iterate checklist",
      ],
    },
  },
  {
    id: "ops",
    name: { es: "Proceso de equipo", en: "Team process" },
    tagline: {
      es: "Ordenar cómo diseña y entrega tu equipo.",
      en: "Organize how your team designs and delivers.",
    },
    duration: { es: "4–6 semanas", en: "4–6 weeks" },
    deliverables: {
      es: [
        "Proceso de trabajo aplicado a tu producto",
        "Talleres con producto e ingeniería",
        "Guía del equipo + cómo medir adopción",
      ],
      en: [
        "Working process applied to your product",
        "Workshops with product and engineering",
        "Team guide + adoption measures",
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
Necesidad: [diagnóstico · prototipo N2N · Design Ops · handoff a código · otro].
Disponibilidad: [días / franja horaria].

Gracias — agendemos la videollamada.`,
  en: `Hi Viento Norte — looking for a development partner for educational projects.

I'd like to schedule a video call to explore collaboration on UX, digital product, and learning-experience development.

Context: [institution / program / platform].
Need: [diagnostic · N2N prototype · Design Ops · code handoff · other].
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
      `Modalidad: ${pkg.name.es}`,
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
    `Format: ${pkg.name.en}`,
    `Industry: ${industry}`,
    `Timeline: ${timeline}`,
    "",
    "Goal:",
    goal.trim(),
    "",
    "Looking forward to scheduling a kickoff.",
  ].join("\n");
}