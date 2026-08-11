/**
 * Evidencia de tools micro1 (sin capturas de juego — NDA / proprietary tooling).
 * Cards de proceso honestas: qué se hace en Anotación y QA de grabación.
 */
export type Micro1ToolEvidence = {
  id: string;
  tool: { es: string; en: string };
  summary: { es: string; en: string };
  steps: { es: string[]; en: string[] };
  output: { es: string; en: string };
};

export const MICRO1_TOOL_EVIDENCE: Micro1ToolEvidence[] = [
  {
    id: "capture",
    tool: {
      es: "Captura de datos remota",
      en: "Remote data capture",
    },
    summary: {
      es: "Sesiones AAA con herramientas in-house: grabación sistemática y metadatos de sesión.",
      en: "AAA sessions with in-house tools: systematic recording and session metadata.",
    },
    steps: {
      es: [
        "Setup de pipeline de captura según guideline del proyecto",
        "Grabación de gameplay con checklist de cobertura",
        "Sync y empaquetado de archivos para handoff",
      ],
      en: [
        "Capture pipeline setup per project guideline",
        "Gameplay recording with coverage checklist",
        "File sync and packaging for handoff",
      ],
    },
    output: {
      es: "Paquete de sesión listo para anotación",
      en: "Session package ready for annotation",
    },
  },
  {
    id: "annotation",
    tool: {
      es: "Anotación",
      en: "Annotation",
    },
    summary: {
      es: "Etiquetado de eventos, estados y acciones con criterio de exactitud para entrenamiento.",
      en: "Labeling events, states, and actions with accuracy criteria for training.",
    },
    steps: {
      es: [
        "Revisión frame/segmento con taxonomía del proyecto",
        "Anotación de acciones, UI in-game y edge cases",
        "Doble check de consistencia entre sesiones",
      ],
      en: [
        "Frame/segment review against project taxonomy",
        "Annotation of actions, in-game UI, and edge cases",
        "Consistency double-check across sessions",
      ],
    },
    output: {
      es: "Dataset anotado catalogado y versionado",
      en: "Cataloged, versioned annotated dataset",
    },
  },
  {
    id: "recording-qa",
    tool: {
      es: "QA de grabación",
      en: "Recording QA",
    },
    summary: {
      es: "Validación de integridad, sync A/V y criterios de aceptación antes de transferir.",
      en: "Integrity, A/V sync, and acceptance checks before transfer.",
    },
    steps: {
      es: [
        "Smoke de archivo: duración, codec, corrupción",
        "QA de sync y cobertura vs checklist de misión",
        "Rechazo / re-captura si no cumple guideline",
      ],
      en: [
        "File smoke: duration, codec, corruption",
        "Sync and coverage QA vs mission checklist",
        "Reject / re-capture if guideline fails",
      ],
    },
    output: {
      es: "Handoff con sello de QA o ticket de re-captura",
      en: "Handoff with QA stamp or re-capture ticket",
    },
  },
];
