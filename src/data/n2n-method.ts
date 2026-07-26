/**
 * Método N2N — del problema al prototipo (lenguaje simple · pyme).
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
      es: "Entender",
      en: "Understand",
    },
    outcome: {
      es: "Problema, usuarios y meta en una página.",
      en: "Problem, users, and goal on one page.",
    },
  },
  {
    id: "thinking",
    step: "02",
    title: {
      es: "Explorar",
      en: "Explore",
    },
    outcome: {
      es: "Ideas priorizadas antes de dibujar la solución.",
      en: "Prioritized ideas before drawing the solution.",
    },
  },
  {
    id: "sprint",
    step: "03",
    title: {
      es: "Probar",
      en: "Test",
    },
    outcome: {
      es: "Validar en días: seguir, ajustar o parar.",
      en: "Validate in days: go, adjust, or stop.",
    },
  },
  {
    id: "proto",
    step: "04",
    title: {
      es: "Prototipar",
      en: "Prototype",
    },
    outcome: {
      es: "Pantallas navegables de los flujos clave.",
      en: "Clickable screens for key flows.",
    },
  },
  {
    id: "handoff",
    step: "05",
    title: {
      es: "Entregar",
      en: "Hand off",
    },
    outcome: {
      es: "Especificaciones listas para construir.",
      en: "Specs ready to build.",
    },
  },
];

/** Goal template for onboarding when user comes from C1 / private data option */
export const C1_ONBOARDING_GOAL: Record<Language, string> = {
  es: `Objetivo: herramienta o prototipo en entorno privado (datos sensibles).
Contexto: [industria / tipo de dato].
Necesito: diagnóstico (Radar) o prototipo (Marco) sin sacar datos a herramientas públicas.
Plazo: [indica plazo].`,
  en: `Goal: tool or prototype in a private setup (sensitive data).
Context: [industry / data type].
Need: diagnostic (Radar) or prototype (Marco) without sending data to public tools.
Timeline: [add timeline].`,
};

/** App funcional: diseño VN + build con red (externalizado bajo dirección) */
export const APP_ONBOARDING_GOAL: Record<Language, string> = {
  es: `Objetivo: app funcional (no solo pantallas).
Diseño y alcance: Viento Norte.
Implementación: con red bajo dirección VN (externalizado).
Contexto: [qué hace la app / usuarios].
Plataforma: [web app / iOS / Android / otra].
Plazo e inversión de referencia: [indica].`,
  en: `Goal: working app (not screens only).
Design and scope: Viento Norte.
Build: network under VN direction (externalized).
Context: [what the app does / users].
Platform: [web app / iOS / Android / other].
Timeline and budget reference: [add].`,
};
