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
  "sura-ia-automation-dashboard": {
    es: [
      { label: "POC", value: "Figma Sites" },
      { label: "Flujos IA", value: "Mapeados" },
    ],
    en: [
      { label: "POC", value: "Figma Sites" },
      { label: "AI flows", value: "Mapped" },
    ],
  },
};

const PROJECT_SEO_KEYWORDS: Record<string, Record<Language, string>> = {
  "sura-ux-enterprise": {
    es: "UX enterprise, design thinking, fintech regional, lineamientos UX, SURA",
    en: "enterprise UX, design thinking, regional fintech, UX guidelines, SURA",
  },
  "sura-inversiones-dashboard": {
    es: "dashboard inversiones, fintech UX, progressive disclosure, NPS, SURA",
    en: "investment dashboard, fintech UX, progressive disclosure, NPS, SURA",
  },
  "sura-ecosistema-digital": {
    es: "design system, onboarding digital, CMS, cumplimiento, SURA",
    en: "design system, digital onboarding, CMS, compliance, SURA",
  },
  "sura-ria-us": {
    es: "RIA platform, onboarding multi-rol, fintech US, autenticación, SURA",
    en: "RIA platform, multi-role onboarding, US fintech, authentication, SURA",
  },
  "transvip-app-premium": {
    es: "mobility premium, reserva ejecutiva, conversión, UX móvil, Transvip",
    en: "premium mobility, executive booking, conversion, mobile UX, Transvip",
  },
  "karri-calculadora": {
    es: "shopper UX, calculadora ingresos, activación, benchmark, Karri",
    en: "shopper UX, earnings calculator, activation, benchmark, Karri",
  },
  "karri-notificaciones": {
    es: "hub notificaciones, onboarding shoppers, engagement, Karri",
    en: "notification hub, shopper onboarding, engagement, Karri",
  },
  "karri-design-sprint": {
    es: "design sprint, OKRs, journey map, estrategia producto, Karri",
    en: "design sprint, OKRs, journey map, product strategy, Karri",
  },
  "ux-tools": {
    es: "herramientas UX, recursos diseño, curación, comunidad",
    en: "UX tools, design resources, curation, community",
  },
  "sura-ia-automation-dashboard": {
    es: "IA enterprise, automatización procesos, dashboard análisis, POC, SURA",
    en: "enterprise AI, process automation, analysis dashboard, POC, SURA",
  },
};

export function getProjectHeadlineMetrics(
  projectId: string | undefined,
  language: Language
): ProjectMetric[] {
  if (!projectId) return [];
  return PROJECT_HEADLINE_METRICS[projectId]?.[language] ?? [];
}

export function getProjectSeoKeywords(
  projectId: string | undefined,
  language: Language
): string | undefined {
  if (!projectId) return undefined;
  return PROJECT_SEO_KEYWORDS[projectId]?.[language];
}