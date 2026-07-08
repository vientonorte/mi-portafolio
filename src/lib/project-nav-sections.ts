import type { Language } from "./i18n";

export interface NavSection {
  id: string;
  label: string;
  number: string;
}

function pad(index: number): string {
  return String(index).padStart(2, "0");
}

export function buildProjectNavSections(
  language: Language,
  flags: {
    hasProcess: boolean;
    hasResults: boolean;
    hasEvidence: boolean;
    hasFigmaEmbed?: boolean;
  }
): NavSection[] {
  const es = language === "es";
  const sections: NavSection[] = [
    { id: "hero", label: es ? "Proyecto" : "Project", number: "00" },
    { id: "challenge", label: es ? "Desafío" : "Challenge", number: "01" },
  ];

  let index = 2;
  if (flags.hasProcess) {
    sections.push({
      id: "process",
      label: es ? "Proceso" : "Process",
      number: pad(index),
    });
    index += 1;
  }
  if (flags.hasResults) {
    sections.push({
      id: "results",
      label: es ? "Resultados" : "Results",
      number: pad(index),
    });
    index += 1;
  }
  if (flags.hasFigmaEmbed) {
    sections.push({
      id: "figma-embed",
      label: es ? "Enablement" : "Enablement",
      number: pad(index),
    });
    index += 1;
  }
  if (flags.hasEvidence) {
    sections.push({
      id: "evidence",
      label: es ? "Evidencias" : "Evidence",
      number: pad(index),
    });
  }

  return sections;
}

export function navNumberFor(
  sections: NavSection[],
  sectionId: string
): string {
  return sections.find((section) => section.id === sectionId)?.number ?? "00";
}