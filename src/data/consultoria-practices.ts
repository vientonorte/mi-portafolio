/**
 * Buenas prácticas documentadas de la consultoría Viento Norte.
 * Fuente de verdad para la landing /consultoria (playbook + anchors).
 * Alineado a WCAG 2.2 AA, Design Ops y evidencia medible del portafolio.
 */

import type { Language } from "../lib/i18n";
import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  BarChart3,
  Focus,
  GitBranch,
  Layers,
  Lock,
  MessageSquareQuote,
  Ruler,
  ShieldCheck,
  Target,
  Timer,
  Workflow,
} from "lucide-react";

export type PracticeCategoryId =
  | "evidence"
  | "a11y"
  | "ops"
  | "product"
  | "delivery";

export interface PracticeItem {
  id: string;
  category: PracticeCategoryId;
  icon: LucideIcon;
  /** Criterio o estándar de referencia (documentado) */
  standard: string;
  title: Record<Language, string>;
  summary: Record<Language, string>;
  /** Checklist accionable */
  checklist: Record<Language, string[]>;
  /** Cómo se valida en la consultoría */
  validation: Record<Language, string>;
}

export const PRACTICE_CATEGORIES: {
  id: PracticeCategoryId;
  label: Record<Language, string>;
}[] = [
  {
    id: "evidence",
    label: { es: "Evidencia", en: "Evidence" },
  },
  {
    id: "a11y",
    label: { es: "Accesibilidad", en: "Accessibility" },
  },
  {
    id: "ops",
    label: { es: "Design Ops", en: "Design Ops" },
  },
  {
    id: "product",
    label: { es: "Producto", en: "Product" },
  },
  {
    id: "delivery",
    label: { es: "Entrega", en: "Delivery" },
  },
];

export const CONSULTORIA_PRACTICES: PracticeItem[] = [
  {
    id: "metrics-first",
    category: "evidence",
    icon: BarChart3,
    standard: "Evidence-based UX · KPI ↔ claim",
    title: {
      es: "Evidencia antes de opinión",
      en: "Evidence before opinion",
    },
    summary: {
      es: "Cada claim del diagnóstico tiene métrica, fuente y ruta a quick win. Sin vanity metrics sueltas.",
      en: "Every diagnostic claim has a metric, source, and path to a quick win. No loose vanity metrics.",
    },
    checklist: {
      es: [
        "Baseline medible al kickoff (embudo, NPS, tiempo, error rate)",
        "Hallazgo → impacto estimado → esfuerzo (P0–P2)",
        "Spoiler de caso o demo navegable cuando exista",
      ],
      en: [
        "Measurable baseline at kickoff (funnel, NPS, time, error rate)",
        "Finding → estimated impact → effort (P0–P2)",
        "Case spoiler or navigable demo when available",
      ],
    },
    validation: {
      es: "Informe ejecutivo con tabla hallazgo / severidad / owner / KPI de éxito.",
      en: "Executive report with finding / severity / owner / success KPI table.",
    },
  },
  {
    id: "wcag-22-aa",
    category: "a11y",
    icon: Accessibility,
    standard: "WCAG 2.2 AA · SC 1.4.3 · 2.4.7 · 2.5.5 / 2.5.8",
    title: {
      es: "Accesibilidad como baseline, no como fase extra",
      en: "Accessibility as baseline, not a later phase",
    },
    summary: {
      es: "Contraste ≥ 4.5:1, foco visible, touch ≥ 44px y teclado en flujos críticos desde el día 1.",
      en: "Contrast ≥ 4.5:1, visible focus, touch ≥ 44px, and keyboard on critical flows from day 1.",
    },
    checklist: {
      es: [
        "Contraste texto/fondo verificado en tokens de marca",
        "Focus ring 2px + offset; skip-link en páginas largas",
        "Targets táctiles ≥ 44×44 px en CTAs y nav",
        "Estados error con texto de recuperación (no solo color)",
      ],
      en: [
        "Text/background contrast checked against brand tokens",
        "2px focus ring + offset; skip-link on long pages",
        "Touch targets ≥ 44×44 px on CTAs and nav",
        "Error states with recovery copy (not color alone)",
      ],
    },
    validation: {
      es: "Checklist WCAG 2.2 AA en el entregable + issues priorizados en el backlog.",
      en: "WCAG 2.2 AA checklist in the deliverable + prioritized issues in the backlog.",
    },
  },
  {
    id: "recruiter-10s",
    category: "evidence",
    icon: Timer,
    standard: "Narrative test · <10 s scan",
    title: {
      es: "Narrativa legible en menos de 10 segundos",
      en: "Narrative readable in under 10 seconds",
    },
    summary: {
      es: "Hero, cards y pitch comunican nicho, métrica y CTA sin copy genérico. Test reclutador / stakeholder.",
      en: "Hero, cards, and pitch state niche, metric, and CTA without generic copy. Recruiter / stakeholder test.",
    },
    checklist: {
      es: [
        "Headline con especialización (fintech, mobility, enterprise…)",
        "KPI visible sin scroll en mobile",
        "CTA primario único y medible",
      ],
      en: [
        "Headline with specialization (fintech, mobility, enterprise…)",
        "KPI visible without scroll on mobile",
        "Single measurable primary CTA",
      ],
    },
    validation: {
      es: "Protocolo de test reclutador documentado en la auditoría express.",
      en: "Recruiter-test protocol documented in the express audit.",
    },
  },
  {
    id: "design-ops",
    category: "ops",
    icon: GitBranch,
    standard: "Design Ops · handoff medible",
    title: {
      es: "Handoff con criterios de aceptación UX",
      en: "Handoff with UX acceptance criteria",
    },
    summary: {
      es: "Componentes, tokens y DoD de diseño alineados a PM/Engineering. Sin «pixel perfect» sin definición.",
      en: "Components, tokens, and design DoD aligned to PM/Engineering. No undefined «pixel perfect».",
    },
    checklist: {
      es: [
        "Tokens nombrados (color, space, type, radius) exportables a Figma",
        "Estados: default · hover · focus · disabled · error · empty",
        "Criterios CMA / DoR–DoD cuando el equipo lo necesite",
      ],
      en: [
        "Named tokens (color, space, type, radius) exportable to Figma",
        "States: default · hover · focus · disabled · error · empty",
        "CMA / DoR–DoD criteria when the team needs them",
      ],
    },
    validation: {
      es: "Playbook de proceso + métricas de adopción (uso de DS, lead time de UI).",
      en: "Process playbook + adoption metrics (DS usage, UI lead time).",
    },
  },
  {
    id: "atomic-tokens",
    category: "ops",
    icon: Layers,
    standard: "Atomic Design · 70-20-10",
    title: {
      es: "Sistema atómico y regla 70-20-10",
      en: "Atomic system and 70-20-10 rule",
    },
    summary: {
      es: "Átomos reutilizables; neutros dominan; acento de marca solo en highlights (~10%).",
      en: "Reusable atoms; neutrals dominate; brand accent only on highlights (~10%).",
    },
    checklist: {
      es: [
        "Inventario de átomos / moléculas / organismos del producto",
        "Gradiente o primary solo en CTAs y acentos clave",
        "Superficies mate para evidencia (sin glass sobre métricas)",
      ],
      en: [
        "Inventory of product atoms / molecules / organisms",
        "Gradient or primary only on CTAs and key accents",
        "Matte surfaces for evidence (no glass over metrics)",
      ],
    },
    validation: {
      es: "Audit visual + tokens en Design System o Figma Variables.",
      en: "Visual audit + tokens in Design System or Figma Variables.",
    },
  },
  {
    id: "progressive-disclosure",
    category: "product",
    icon: Focus,
    standard: "Fintech / regulated UX",
    title: {
      es: "Progressive disclosure en contextos regulados",
      en: "Progressive disclosure in regulated contexts",
    },
    summary: {
      es: "Complejidad legal y de producto se revela por capa: confianza primero, detalle después.",
      en: "Legal and product complexity revealed in layers: trust first, detail later.",
    },
    checklist: {
      es: [
        "Flujo feliz < N pasos con estados de error documentados",
        "Microcopy de propósito cuando hay datos personales (Ley 21.719)",
        "Auth y roles claros antes de acciones irreversibles",
      ],
      en: [
        "Happy path < N steps with documented error states",
        "Purpose microcopy when personal data is involved",
        "Clear auth and roles before irreversible actions",
      ],
    },
    validation: {
      es: "Journey map + prototipo navegable de onboarding / auth crítico.",
      en: "Journey map + navigable prototype of critical onboarding / auth.",
    },
  },
  {
    id: "scope-transparency",
    category: "delivery",
    icon: ShieldCheck,
    standard: "No public pricing · scoped kickoff",
    title: {
      es: "Transparencia de proceso, no de precio genérico",
      en: "Process transparency, not generic public pricing",
    },
    summary: {
      es: "Modalidades y entregables públicos; alcance y propuesta en kickoff. Expectativa alineada con cotizador y árbol.",
      en: "Public formats and deliverables; scope and proposal at kickoff. Expectations aligned via quoter and decision tree.",
    },
    checklist: {
      es: [
        "3 modalidades con duración y entregables visibles",
        "Árbol de decisión + cotizador orientativo",
        "Mensaje de contacto prearmado con industria y objetivo",
      ],
      en: [
        "3 formats with visible duration and deliverables",
        "Decision tree + orientative quoter",
        "Pre-filled contact message with industry and goal",
      ],
    },
    validation: {
      es: "Kickoff < 24 h hábiles con agenda y criterios de éxito.",
      en: "Kickoff within 24 business hours with agenda and success criteria.",
    },
  },
  {
    id: "five-processes",
    category: "product",
    icon: Target,
    standard: "5 macroprocesos UX",
    title: {
      es: "Método en 5 macroprocesos",
      en: "Method in 5 macro-processes",
    },
    summary: {
      es: "Analytics → Research → Design → Testing → Refinamiento. Cada fase con output y métrica de salida.",
      en: "Analytics → Research → Design → Testing → Refinement. Each phase has an output and exit metric.",
    },
    checklist: {
      es: [
        "Mapear el problema a la fase dominante",
        "Definir exit criteria por fase",
        "Enlazar entregables a casos reales del portafolio",
      ],
      en: [
        "Map the problem to the dominant phase",
        "Define exit criteria per phase",
        "Link deliverables to real portfolio cases",
      ],
    },
    validation: {
      es: "Framework documentado en /proceso y aplicado en talleres de equipo.",
      en: "Framework documented on /process and applied in team workshops.",
    },
  },
  {
    id: "spacing-grid",
    category: "ops",
    icon: Ruler,
    standard: "4px base · 8pt grid",
    title: {
      es: "Espaciado y grid predecibles",
      en: "Predictable spacing and grid",
    },
    summary: {
      es: "Base 4px, ritmo vertical consistente, frames mobile/tablet/desktop para handoff Figma.",
      en: "4px base, consistent vertical rhythm, mobile/tablet/desktop frames for Figma handoff.",
    },
    checklist: {
      es: [
        "Escala de spacing documentada en tokens",
        "Frames 375 · 768 · 1440 como referencia",
        "Densidad UI revisada en enterprise vs consumer",
      ],
      en: [
        "Spacing scale documented as tokens",
        "Frames 375 · 768 · 1440 as reference",
        "UI density reviewed for enterprise vs consumer",
      ],
    },
    validation: {
      es: "Especificaciones en Design System exportable y en prototipos.",
      en: "Specs in the exportable Design System and prototypes.",
    },
  },
  {
    id: "stakeholder-copy",
    category: "delivery",
    icon: MessageSquareQuote,
    standard: "Plain language · ES/EN",
    title: {
      es: "Copy institucional, no marketing vacío",
      en: "Institutional copy, not empty marketing",
    },
    summary: {
      es: "Lenguaje claro para stakeholders y usuarios. Sin lorem; datos realistas y edge cases.",
      en: "Clear language for stakeholders and users. No lorem; realistic data and edge cases.",
    },
    checklist: {
      es: [
        "Microcopy de error con siguiente paso",
        "i18n ES/EN cuando el mercado lo exige",
        "Nombres largos / montos grandes validados en UI",
      ],
      en: [
        "Error microcopy with next step",
        "ES/EN i18n when the market requires it",
        "Long names / large amounts validated in UI",
      ],
    },
    validation: {
      es: "Revisión de copy en prototipo + glosario de dominio si aplica.",
      en: "Copy review in prototype + domain glossary when applicable.",
    },
  },
  {
    id: "n2n-method",
    category: "product",
    icon: Workflow,
    standard: "N2N · Needle-to-Needle · DT + Sprint",
    title: {
      es: "N2N · del brief al prototipo navegable",
      en: "N2N · from brief to navigable prototype",
    },
    summary: {
      es: "Needle-to-needle: Design Thinking + Design Sprint hasta handoff. Sin saltarse discovery ni validación.",
      en: "Needle-to-needle: Design Thinking + Design Sprint through handoff. No skipping discovery or validation.",
    },
    checklist: {
      es: [
        "Brief con problema, usuarios y restricción de éxito",
        "Ideación DT documentada (personas / journey / hipótesis)",
        "Sprint de validación con decisión go / iterate",
        "Prototipo Figma navegable + criterios de handoff",
      ],
      en: [
        "Brief with problem, users, and success constraint",
        "Documented DT ideation (personas / journey / hypotheses)",
        "Validation sprint with go / iterate decision",
        "Navigable Figma prototype + handoff criteria",
      ],
    },
    validation: {
      es: "Demo X | CMS en /consultoria#consultoria-demo y sección #metodo-n2n.",
      en: "X | CMS demo on /consultoria#consultoria-demo and #metodo-n2n section.",
    },
  },
  {
    id: "offline-private",
    category: "ops",
    icon: Lock,
    standard: "Offline-first · GitHub private · AI governance",
    title: {
      es: "Herramientas offline en ecosistema privado",
      en: "Offline tools in a private ecosystem",
    },
    summary: {
      es: "Entrega en perímetro del cliente: offline-first, repo private, IA sin PII a modelos públicos por defecto.",
      en: "Delivery inside the client perimeter: offline-first, private repo, AI with no PII to public models by default.",
    },
    checklist: {
      es: [
        "Happy path crítico usable sin red (o degradación explícita)",
        "Código y docs en GitHub private del cliente",
        "Política IA: clasificación de datos antes de cada prompt",
        "Sin telemetría de terceros por defecto",
      ],
      en: [
        "Critical happy path usable offline (or explicit degradation)",
        "Code and docs in the client's private GitHub",
        "AI policy: data classification before every prompt",
        "No third-party telemetry by default",
      ],
    },
    validation: {
      es: "DoD en #offline-private + template de goal en onboarding C1.",
      en: "DoD on #offline-private + C1 onboarding goal template.",
    },
  },
  {
    id: "ley-21719",
    category: "delivery",
    icon: ShieldCheck,
    standard: "Ley 21.719 · privacidad by design",
    title: {
      es: "Ley de Datos 21.719 en el producto",
      en: "Data Act 21.719 in the product",
    },
    summary: {
      es: "Minimización, base legal, aviso en captura y ARSOPL. Demos con datos sintéticos. No es asesoría legal.",
      en: "Minimization, legal basis, notice at capture, and ARSOPL. Demos use synthetic data. Not legal advice.",
    },
    checklist: {
      es: [
        "Inventario de datos del tool o flujo",
        "Base legal documentada por campo capturado",
        "Aviso de finalidad en el punto de captura",
        "Canal para derechos del titular (ARSOPL)",
      ],
      en: [
        "Data inventory for the tool or flow",
        "Legal basis documented per captured field",
        "Purpose notice at the capture point",
        "Channel for data-subject rights (ARSOPL)",
      ],
    },
    validation: {
      es: "Checklist D1–D10 en kickoff C1; el responsable del tratamiento es el cliente.",
      en: "D1–D10 checklist at C1 kickoff; the client remains the controller.",
    },
  },
];

export function getPracticesByCategory(category: PracticeCategoryId | "all") {
  if (category === "all") return CONSULTORIA_PRACTICES;
  return CONSULTORIA_PRACTICES.filter((p) => p.category === category);
}
