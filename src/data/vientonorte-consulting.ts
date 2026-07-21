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
      es: "Auditoría UX completa. Entrada gratis: a11y de un flujo crítico.",
      en: "Full UX audit. Free entry: a11y on one critical flow.",
    },
    duration: { es: "5–7 días hábiles", en: "5–7 business days" },
    deliverables: {
      es: [
        "Entrada gratis: revisión WCAG 2.2 AA de un flujo crítico",
        "Heurísticas Nielsen + contraste + plan P0–P2",
        "Informe ejecutivo + quick wins (Radar completo)",
      ],
      en: [
        "Free entry: WCAG 2.2 AA review of one critical flow",
        "Nielsen heuristics + contrast + P0–P2 plan",
        "Executive report + quick wins (full Radar)",
      ],
    },
  },
  {
    id: "marco",
    featured: true,
    name: { es: "Estrategia guiada", en: "Guided strategy" },
    tagline: {
      es: "Diagnóstico completo + mentoría en 3 sesiones de implementación.",
      en: "Full diagnostic + 3 implementation mentorship sessions.",
    },
    duration: { es: "3–4 semanas", en: "3–4 weeks" },
    deliverables: {
      es: [
        "Incluye diagnóstico express + plantilla de case study",
        "3 sesiones: posicionamiento, arquitectura, validación",
        "Schema SEO/AEO y checklist de lanzamiento",
      ],
      en: [
        "Includes express diagnostic + case study template",
        "3 sessions: positioning, architecture, validation",
        "SEO/AEO schema and launch checklist",
      ],
    },
  },
  {
    id: "ops",
    name: { es: "Proceso de equipo", en: "Team process" },
    tagline: {
      es: "Design Ops para equipos: framework, estimación y handoff medible.",
      en: "Design Ops for teams: framework, estimation, measurable handoff.",
    },
    duration: { es: "4–6 semanas", en: "4–6 weeks" },
    deliverables: {
      es: [
        "5 macroprocesos UX aplicados al producto",
        "Workshops con PM/PO/Engineering",
        "Playbook + métricas de adopción del proceso",
      ],
      en: [
        "5 UX macro-processes applied to the product",
        "Workshops with PM/PO/Engineering",
        "Playbook + process adoption metrics",
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
  es: `Hola Rodrigo — busco partner de desarrollo para proyectos educativos.

Quiero agendar una videollamada para explorar colaboración en UX, producto digital y desarrollo de experiencias de aprendizaje.

Contexto: [institución / programa / plataforma].
Necesidad: [diagnóstico · prototipo N2N · Design Ops · handoff a código · otro].
Disponibilidad: [días / franja horaria].

Gracias — agendemos la videollamada.`,
  en: `Hi Rodrigo — looking for a development partner for educational projects.

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
      "Hola Rodrigo — solicitud vía onboarding Viento Norte.",
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
    "Hi Rodrigo — request via Viento Norte onboarding.",
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