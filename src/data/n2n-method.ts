/**
 * Método N2N (Needle-to-Needle) — Viento Norte
 * Brief → Design Thinking → Design Sprint → prototipo → handoff.
 */

import type { Language } from "../lib/i18n";

export interface N2NPhase {
  id: string;
  step: string;
  title: Record<Language, string>;
  outcome: Record<Language, string>;
}

export const N2N_PHASES: N2NPhase[] = [
  {
    id: "brief",
    step: "01",
    title: {
      es: "Brief / problema",
      en: "Brief / problem",
    },
    outcome: {
      es: "Problema, usuarios, restricciones y métrica de éxito en una página.",
      en: "Problem, users, constraints, and success metric on one page.",
    },
  },
  {
    id: "thinking",
    step: "02",
    title: {
      es: "Design Thinking",
      en: "Design Thinking",
    },
    outcome: {
      es: "Personas, journey e hipótesis priorizadas — sin solución prematura.",
      en: "Personas, journey, and prioritized hypotheses — no premature solution.",
    },
  },
  {
    id: "sprint",
    step: "03",
    title: {
      es: "Design Sprint",
      en: "Design Sprint",
    },
    outcome: {
      es: "Validación en días: prototipo de decisión go / iterate / kill.",
      en: "Validation in days: decision prototype go / iterate / kill.",
    },
  },
  {
    id: "proto",
    step: "04",
    title: {
      es: "Prototipo navegable",
      en: "Navigable prototype",
    },
    outcome: {
      es: "Figma (o tool) con flujos críticos y estados de error.",
      en: "Figma (or tool) with critical flows and error states.",
    },
  },
  {
    id: "handoff",
    step: "05",
    title: {
      es: "Handoff",
      en: "Handoff",
    },
    outcome: {
      es: "Specs, tokens, criterios UX y repo cuando aplica.",
      en: "Specs, tokens, UX criteria, and repo when applicable.",
    },
  },
];

/** Goal template for onboarding when user comes from C1 / N2N private */
export const C1_ONBOARDING_GOAL: Record<Language, string> = {
  es: `Objetivo: herramienta offline / ecosistema privado (N2N).
Contexto: fintech u organización con dato sensible.
Restricciones: datos no salen del perímetro; GitHub private; IA local o VPC (sin PII a modelos públicos).
Necesito: diagnóstico de perímetro o prototipo N2N en repo privado.
A11y: WCAG 2.2 AA. Datos: Ley 21.719 by design.`,
  en: `Goal: offline tool / private ecosystem (N2N).
Context: fintech or org with sensitive data.
Constraints: data stays in perimeter; private GitHub; local or VPC AI (no PII to public models).
Need: perimeter diagnostic or N2N prototype in private repo.
A11y: WCAG 2.2 AA. Data: Act 21.719 by design.`,
};
