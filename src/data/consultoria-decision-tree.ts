import type { Language } from "../lib/i18n";
import type { ConsultingPackageId } from "./vientonorte-consulting";

export type DecisionTreeNodeId =
  | "root"
  | "need-portfolio"
  | "need-product"
  | "need-team"
  | "outcome-radar"
  | "outcome-marco"
  | "outcome-ops"
  | "outcome-app";

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
    /** App funcional: prefill onboarding con red */
    appGoal?: boolean;
    title: Record<Language, string>;
    summary: Record<Language, string>;
  };
}

export const CONSULTORIA_DECISION_TREE: Record<DecisionTreeNodeId, DecisionTreeNode> = {
  root: {
    id: "root",
    question: {
      es: "¿Qué necesitas primero?",
      en: "What do you need first?",
    },
    options: [
      {
        id: "diagnostic",
        label: { es: "Diagnóstico / informe", en: "Diagnostic / report" },
        nextId: "outcome-radar",
      },
      {
        id: "product",
        label: { es: "Prototipo, web o app", en: "Prototype, web, or app" },
        nextId: "need-product",
      },
      {
        id: "team",
        label: { es: "Proceso del equipo", en: "Team process" },
        nextId: "outcome-ops",
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
        label: { es: "Solo diagnóstico", en: "Diagnostic only" },
        nextId: "outcome-radar",
      },
      {
        id: "full",
        label: { es: "Diagnóstico + prototipo", en: "Diagnostic + prototype" },
        nextId: "outcome-marco",
      },
    ],
  },
  "need-product": {
    id: "need-product",
    question: {
      es: "¿Qué entregable buscas?",
      en: "What deliverable do you want?",
    },
    options: [
      {
        id: "proto",
        label: { es: "Prototipo (pantallas)", en: "Prototype (screens)" },
        nextId: "outcome-marco",
      },
      {
        id: "app",
        label: {
          es: "App funcional (diseño + build con red)",
          en: "Working app (design + build via network)",
        },
        nextId: "outcome-app",
      },
      {
        id: "audit",
        label: { es: "Solo diagnóstico rápido", en: "Quick diagnostic only" },
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
        es: "Guía de cómo diseña y entrega el equipo, con talleres y forma de medir.",
        en: "Guide for how the team designs and delivers, with workshops and measures.",
      },
    },
  },
  "outcome-radar": {
    id: "outcome-radar",
    outcome: {
      packageId: "radar",
      title: {
        es: "Recomendación: Diagnóstico",
        en: "Recommendation: Diagnostic",
      },
      summary: {
        es: "Informe + plan en 5–7 días. Entrada gratis: accesibilidad de un flujo.",
        en: "Report + plan in 5–7 days. Free entry: accessibility on one flow.",
      },
    },
  },
  "outcome-marco": {
    id: "outcome-marco",
    outcome: {
      packageId: "marco",
      title: {
        es: "Recomendación: Prototipo",
        en: "Recommendation: Prototype",
      },
      summary: {
        es: "Pantallas listas para construir, con diagnóstico y sesiones de trabajo (Marco).",
        en: "Screens ready to build, with diagnostic and working sessions (Marco).",
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
        es: "Ordenar cómo diseña y entrega el equipo (Ops).",
        en: "Organize how the team designs and delivers (Ops).",
      },
    },
  },
  "outcome-app": {
    id: "outcome-app",
    outcome: {
      packageId: "marco",
      appGoal: true,
      title: {
        es: "Recomendación: App funcional",
        en: "Recommendation: Working app",
      },
      summary: {
        es: "Diseño y alcance con Viento Norte. Implementación con red bajo dirección VN.",
        en: "Design and scope with Viento Norte. Build with network under VN direction.",
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
