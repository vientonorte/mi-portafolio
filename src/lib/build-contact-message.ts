import type { Language } from "./i18n";
import {
  CONSULTING_PACKAGES,
  type ConsultingPackageId,
} from "../data/vientonorte-consulting";

export type ContactIntent = "recruiter" | "consulting" | "freelance" | "other";

export interface ContactAssistantDraft {
  intent: ContactIntent;
  recruiterMode?: string;
  packageId?: ConsultingPackageId;
  industry?: string;
  timeline?: string;
  goal?: string;
}

const INTENT_LABELS: Record<Language, Record<ContactIntent, string>> = {
  es: {
    recruiter: "Oportunidad laboral",
    consulting: "Consultoría UX (Viento Norte)",
    freelance: "Proyecto freelance",
    other: "Otro",
  },
  en: {
    recruiter: "Job opportunity",
    consulting: "UX consulting (Viento Norte)",
    freelance: "Freelance project",
    other: "Other",
  },
};

export function buildAssistantContactMessage(
  language: Language,
  draft: ContactAssistantDraft
): string {
  const lines: string[] = [
    `[Asistente Viento Norte]`,
    `Motivo: ${INTENT_LABELS[language][draft.intent]}`,
  ];

  if (draft.intent === "recruiter" && draft.recruiterMode) {
    lines.push(`Modalidad: ${draft.recruiterMode}`);
  }

  if (draft.intent === "consulting" && draft.packageId) {
    const pkg = CONSULTING_PACKAGES.find((p) => p.id === draft.packageId);
    if (pkg) {
      lines.push(`Bolsa sugerida: ${pkg.name[language]}`);
      lines.push(`Alcance: ${pkg.tagline[language]}`);
    }
  }

  if (draft.industry) lines.push(`Industria: ${draft.industry}`);
  if (draft.timeline) lines.push(`Plazo: ${draft.timeline}`);
  if (draft.goal?.trim()) {
    lines.push("");
    lines.push(draft.goal.trim());
  }

  return lines.join("\n");
}