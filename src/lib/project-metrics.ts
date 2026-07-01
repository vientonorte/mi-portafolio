import type { Language } from "./i18n";

export interface ProjectMetric {
  label: string;
  value: string;
}

type LocalizedMetrics = Record<Language, ProjectMetric[]>;

/** Métricas headline (2 KPIs) por proyecto — fuente única para grid, hub y framework. */
const PROJECT_HEADLINE_METRICS: Record<string, LocalizedMetrics> = {
  "sura-ux-enterprise": {
    es: [
      { label: "Alcance regional", value: "5+ países" },
      { label: "Tiempo discovery", value: "-40%" },
    ],
    en: [
      { label: "Regional reach", value: "5+ countries" },
      { label: "Discovery time", value: "-40%" },
    ],
  },
  "sura-inversiones-dashboard": {
    es: [
      { label: "Consulta de info", value: "-45%" },
      { label: "NPS", value: "72" },
    ],
    en: [
      { label: "Info lookup time", value: "-45%" },
      { label: "NPS", value: "72" },
    ],
  },
  "sura-ecosistema-digital": {
    es: [
      { label: "Onboarding", value: "-40%" },
      { label: "Design System", value: "50+" },
    ],
    en: [
      { label: "Onboarding", value: "-40%" },
      { label: "Design System", value: "50+" },
    ],
  },
  "sura-ria-us": {
    es: [
      { label: "Prototipos Hi-Fi", value: "8" },
      { label: "Flujos auth", value: "3" },
    ],
    en: [
      { label: "Hi-Fi prototypes", value: "8" },
      { label: "Auth flows", value: "3" },
    ],
  },
  "transvip-app-premium": {
    es: [
      { label: "Tiempo reserva", value: "-40%" },
      { label: "Conversión", value: "+25%" },
    ],
    en: [
      { label: "Booking time", value: "-40%" },
      { label: "Conversion", value: "+25%" },
    ],
  },
  "karri-calculadora": {
    es: [
      { label: "Activación", value: "+35%" },
      { label: "Comprensión", value: "92%" },
    ],
    en: [
      { label: "Activation", value: "+35%" },
      { label: "Comprehension", value: "92%" },
    ],
  },
  "karri-notificaciones": {
    es: [
      { label: "Engagement", value: "+58%" },
      { label: "Abandono auth", value: "-42%" },
    ],
    en: [
      { label: "Engagement", value: "+58%" },
      { label: "Auth drop-off", value: "-42%" },
    ],
  },
  "karri-design-sprint": {
    es: [
      { label: "Touchpoints", value: "24" },
      { label: "MVPs", value: "3" },
    ],
    en: [
      { label: "Touchpoints", value: "24" },
      { label: "MVPs", value: "3" },
    ],
  },
  "ux-tools": {
    es: [
      { label: "Herramientas", value: "40+" },
      { label: "Comunidad", value: "Pública" },
    ],
    en: [
      { label: "Tools", value: "40+" },
      { label: "Community", value: "Public" },
    ],
  },
};

export function getProjectHeadlineMetrics(
  projectId: string | undefined,
  language: Language
): ProjectMetric[] {
  if (!projectId) return [];
  return PROJECT_HEADLINE_METRICS[projectId]?.[language] ?? [];
}