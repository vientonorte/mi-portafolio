/**
 * Contact assistant surfaces (SOLID · Liskov de producto).
 * default = portfolio (reclutador/freelance ok)
 * consulting = embudo SEM (intent fijo consulting)
 * freeA11y = revisión de un flujo (nunca /auditoria)
 */
import type { ContactIntent } from "./build-contact-message";
import type { ContactDraft } from "./contact-draft";
import { ROUTES } from "./routes";

export type ContactAssistantSurface = "default" | "consulting" | "freeA11y";

const INTENTS: Record<ContactAssistantSurface, readonly ContactIntent[]> = {
  default: ["recruiter", "consulting", "freelance", "other"],
  consulting: ["consulting"],
  freeA11y: ["consulting"],
};

export function isFreeA11yDraft(draft: ContactDraft | null | undefined): boolean {
  if (!draft) return false;
  if (draft.consultingQ1 === "radar-free") return true;
  if (draft.packageId === "radar" && draft.intent === "consulting") return true;
  return false;
}

export function resolveContactSurface(
  surface: ContactAssistantSurface | undefined,
  draft: ContactDraft | null | undefined
): ContactAssistantSurface {
  if (surface === "freeA11y" || isFreeA11yDraft(draft)) return "freeA11y";
  if (surface === "consulting") return "consulting";
  return surface ?? "default";
}

export function allowedIntentsForSurface(
  surface: ContactAssistantSurface
): readonly ContactIntent[] {
  return INTENTS[surface];
}

export function hidesRecruiterAndFreelance(
  surface: ContactAssistantSurface
): boolean {
  return surface !== "default";
}

export function defaultIntentForSurface(
  surface: ContactAssistantSurface
): ContactIntent | null {
  if (surface === "consulting" || surface === "freeA11y") return "consulting";
  return null;
}

/** Free a11y and consulting land on /contacto — never mentoría /auditoria. */
export function contactPathForSurface(
  surface: ContactAssistantSurface
): typeof ROUTES.contact {
  void surface;
  return ROUTES.contact;
}

export function pathIsAuditoriaMentoria(path: string): boolean {
  const p = path.split("?")[0].replace(/\/$/, "");
  return p === ROUTES.audit || p.endsWith("/auditoria");
}
