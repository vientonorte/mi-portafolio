import type { Language } from "../lib/i18n";

export type ConsultingPackageId = "radar" | "marco" | "ops";

export interface ConsultingPackage {
  id: ConsultingPackageId;
  name: Record<Language, string>;
  tagline: Record<Language, string>;
  duration: Record<Language, string>;
  priceHint: Record<Language, string>;
  deliverables: Record<Language, string[]>;
  featured?: boolean;
}

export const CONSULTING_PACKAGES: ConsultingPackage[] = [
  {
    id: "radar",
    name: { es: "Bolsa Radar", en: "Radar Bundle" },
    tagline: {
      es: "Auditoría UX express con hallazgos priorizados P0–P2.",
      en: "Express UX audit with prioritized P0–P2 findings.",
    },
    duration: { es: "5–7 días hábiles", en: "5–7 business days" },
    priceHint: { es: "Desde USD 890", en: "From USD 890" },
    deliverables: {
      es: [
        "Heurísticas Nielsen + contraste WCAG 2.2 AA",
        "Test narrativa reclutador (10 s)",
        "Informe ejecutivo + quick wins",
      ],
      en: [
        "Nielsen heuristics + WCAG 2.2 AA contrast",
        "Recruiter narrative test (10 s)",
        "Executive report + quick wins",
      ],
    },
  },
  {
    id: "marco",
    featured: true,
    name: { es: "Bolsa Marco", en: "Marco Bundle" },
    tagline: {
      es: "Auditoría completa + mentoría en 3 sesiones de implementación.",
      en: "Full audit + 3 implementation mentorship sessions.",
    },
    duration: { es: "3–4 semanas", en: "3–4 weeks" },
    priceHint: { es: "Desde USD 2.400", en: "From USD 2,400" },
    deliverables: {
      es: [
        "Todo Radar + case study template",
        "3 sesiones: posicionamiento, arquitectura, validación",
        "Schema SEO/AEO y checklist de lanzamiento",
      ],
      en: [
        "Everything in Radar + case study template",
        "3 sessions: positioning, architecture, validation",
        "SEO/AEO schema and launch checklist",
      ],
    },
  },
  {
    id: "ops",
    name: { es: "Bolsa Ops", en: "Ops Bundle" },
    tagline: {
      es: "Design Ops para equipos: framework, estimación y handoff medible.",
      en: "Design Ops for teams: framework, estimation, measurable handoff.",
    },
    duration: { es: "4–6 semanas", en: "4–6 weeks" },
    priceHint: { es: "Cotización por equipo", en: "Team-based quote" },
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
  es: ["Fintech", "Mobility", "Enterprise", "SaaS", "Retail", "Otro"],
  en: ["Fintech", "Mobility", "Enterprise", "SaaS", "Retail", "Other"],
} as const;

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
      `Bolsa: ${pkg.name.es}`,
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
    `Bundle: ${pkg.name.en}`,
    `Industry: ${industry}`,
    `Timeline: ${timeline}`,
    "",
    "Goal:",
    goal.trim(),
    "",
    "Looking forward to scheduling a kickoff.",
  ].join("\n");
}