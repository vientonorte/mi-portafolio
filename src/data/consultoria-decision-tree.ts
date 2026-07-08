import type { Language } from "../lib/i18n";
import type { ConsultingPackageId } from "./vientonorte-consulting";

export type DecisionTreeNodeId =
  | "root"
  | "need-portfolio"
  | "need-product"
  | "need-team"
  | "outcome-radar"
  | "outcome-marco"
  | "outcome-ops";

export interface DecisionTreeOption {
  id: string;
  label: Record<Language, string>;
  nextId: DecisionTreeNodeId;
}

export interface DecisionTreeNode {
  id: DecisionTreeNodeId;
  question?: Record<Language, string>;
  options?: DecisionTreeOption[];
  outcome?: {
    packageId: ConsultingPackageId;
    title: Record<Language, string>;
    summary: Record<Language, string>;
  };
}

export const CONSULTORIA_DECISION_TREE: Record<DecisionTreeNodeId, DecisionTreeNode> = {
  root: {
    id: "root",
    question: {
      es: "¿Qué necesitas resolver primero?",
      en: "What do you need to solve first?",
    },
    options: [
      {
        id: "portfolio",
        label: { es: "Portfolio o presencia profesional", en: "Portfolio or professional presence" },
        nextId: "need-portfolio",
      },
      {
        id: "product",
        label: { es: "Producto digital (app / web)", en: "Digital product (app / web)" },
        nextId: "need-product",
      },
      {
        id: "team",
        label: { es: "Proceso UX del equipo", en: "Team UX process" },
        nextId: "need-team",
      },
    ],
  },
  "need-portfolio": {
    id: "need-portfolio",
    question: {
      es: "¿Qué profundidad buscas?",
      en: "How deep do you want to go?",
    },
    options: [
      {
        id: "audit-only",
        label: { es: "Diagnóstico y quick wins", en: "Diagnosis and quick wins" },
        nextId: "outcome-radar",
      },
      {
        id: "full",
        label: { es: "Diagnóstico + implementación guiada", en: "Diagnosis + guided implementation" },
        nextId: "outcome-marco",
      },
    ],
  },
  "need-product": {
    id: "need-product",
    question: {
      es: "¿En qué etapa está el producto?",
      en: "What stage is the product in?",
    },
    options: [
      {
        id: "launch",
        label: { es: "Pre-lanzamiento o rediseño mayor", en: "Pre-launch or major redesign" },
        nextId: "outcome-marco",
      },
      {
        id: "iterate",
        label: { es: "Mejora continua y fricción puntual", en: "Continuous improvement and targeted friction" },
        nextId: "outcome-radar",
      },
    ],
  },
  "need-team": {
    id: "need-team",
    outcome: {
      packageId: "ops",
      title: {
        es: "Recomendación: Proceso de equipo",
        en: "Recommendation: Team process",
      },
      summary: {
        es: "Framework de 5 macroprocesos, workshops y playbook medible para tu equipo.",
        en: "5 macro-process framework, workshops, and measurable playbook for your team.",
      },
    },
  },
  "outcome-radar": {
    id: "outcome-radar",
    outcome: {
      packageId: "radar",
      title: {
        es: "Recomendación: Diagnóstico express",
        en: "Recommendation: Express diagnostic",
      },
      summary: {
        es: "Auditoría express con hallazgos P0–P2, WCAG 2.2 y test reclutador.",
        en: "Express audit with P0–P2 findings, WCAG 2.2, and recruiter test.",
      },
    },
  },
  "outcome-marco": {
    id: "outcome-marco",
    outcome: {
      packageId: "marco",
      title: {
        es: "Recomendación: Estrategia guiada",
        en: "Recommendation: Guided strategy",
      },
      summary: {
        es: "Auditoría completa + 3 sesiones para posicionamiento, arquitectura y validación.",
        en: "Full audit + 3 sessions for positioning, architecture, and validation.",
      },
    },
  },
  "outcome-ops": {
    id: "outcome-ops",
    outcome: {
      packageId: "ops",
      title: {
        es: "Recomendación: Proceso de equipo",
        en: "Recommendation: Team process",
      },
      summary: {
        es: "Design Ops con estimación, handoff y adopción medible en el equipo.",
        en: "Design Ops with estimation, handoff, and measurable team adoption.",
      },
    },
  },
};

export const DECISION_TREE_START: DecisionTreeNodeId = "root";

export function getDecisionPathLabels(
  language: Language,
  path: DecisionTreeNodeId[]
): string[] {
  const labels: string[] = [];
  for (let i = 0; i < path.length - 1; i++) {
    const node = CONSULTORIA_DECISION_TREE[path[i]];
    const nextId = path[i + 1];
    const option = node.options?.find((o) => o.nextId === nextId);
    if (option) labels.push(option.label[language]);
  }
  return labels;
}