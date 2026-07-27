import type { ContactIntent } from "./build-contact-message";
import type { ConsultingPackageId } from "../data/vientonorte-consulting";

export type ContactDraftSource =
  | "direct"
  | "onboarding"
  | "quoter"
  | "assistant"
  | "partner-edu"
  /** Conversion CTAs site-wide (audit, hero, carousel, arsenal…) */
  | "cta"
  /** @deprecated typo legacy — prefer partner-edu */
  | "parten-edu";

export interface ContactDraft {
  /** May be empty when only pre-selecting intent (wizard continues from detail). */
  message: string;
  source: ContactDraftSource;
  intent?: ContactIntent;
  packageId?: ConsultingPackageId;
  industry?: string;
  timeline?: string;
  recruiterMode?: string;
  consultingQ1?: string;
  /**
   * Título VN de conversación (desde selecciones onboarding / free a11y).
   * Ej: «VN · Kickoff · Diagnóstico · Fintech»
   */
  conversationTitle?: string;
}

export interface ContactSharedIdentity {
  name: string;
  email: string;
  consent: boolean;
}

export type ContactLocationState = {
  contactDraft?: ContactDraft | { message?: string };
};

export type ContactTab = "assistant" | "form";

export type ContactAssistantStep = "intent" | "detail" | "compose";

const EMPTY_IDENTITY: ContactSharedIdentity = {
  name: "",
  email: "",
  consent: false,
};

export function emptyContactIdentity(): ContactSharedIdentity {
  return { ...EMPTY_IDENTITY };
}

/** Backward-compatible parser for router location.state */
export function parseContactDraftFromState(state: unknown): ContactDraft | null {
  if (!state || typeof state !== "object") return null;

  const raw = (state as ContactLocationState).contactDraft;
  if (!raw || typeof raw !== "object") return null;

  const message = typeof raw.message === "string" ? raw.message.trim() : "";
  const intent =
    "intent" in raw && typeof raw.intent === "string"
      ? (raw.intent as ContactIntent)
      : undefined;

  // Require message or intent (P1: intent-only drafts from conversion CTAs)
  if (!message && !intent) return null;

  if ("source" in raw && typeof raw.source === "string") {
    return {
      message,
      source: raw.source as ContactDraftSource,
      intent,
      packageId: raw.packageId as ContactDraft["packageId"],
      industry: typeof raw.industry === "string" ? raw.industry : undefined,
      timeline: typeof raw.timeline === "string" ? raw.timeline : undefined,
      recruiterMode: typeof raw.recruiterMode === "string" ? raw.recruiterMode : undefined,
      consultingQ1: typeof raw.consultingQ1 === "string" ? raw.consultingQ1 : undefined,
      conversationTitle:
        typeof (raw as ContactDraft).conversationTitle === "string"
          ? (raw as ContactDraft).conversationTitle
          : undefined,
    };
  }

  return { message, source: "direct", intent };
}

export function shouldSkipAssistantWizard(draft: ContactDraft | null): boolean {
  if (!draft) return false;
  if (
    draft.source === "onboarding" ||
    draft.source === "quoter" ||
    draft.source === "partner-edu" ||
    draft.source === "parten-edu"
  ) {
    return true;
  }
  // Prefill from conversion CTA with a ready message → compose
  if (draft.source === "cta" && draft.message.trim().length > 0) {
    return true;
  }
  return false;
}

export function resolveAssistantInitialStep(draft: ContactDraft | null): ContactAssistantStep {
  if (shouldSkipAssistantWizard(draft)) return "compose";
  // Intent pre-selected (e.g. ?intent=consulting) → skip first question
  if (draft?.intent) return "detail";
  return "intent";
}

export function draftBannerKey(
  draft: ContactDraft | null
): "onboarding" | "quoter" | "partner-edu" | "cta" | null {
  if (!draft) return null;
  if (draft.source === "partner-edu" || draft.source === "parten-edu") {
    return "partner-edu";
  }
  if (draft.source === "onboarding") return "onboarding";
  if (draft.source === "quoter") return "quoter";
  if (draft.source === "cta" && draft.message.trim().length > 0) return "cta";
  return null;
}

export function mergeContactMessage(
  current: string,
  generated: string,
  options?: { preferCurrent?: boolean }
): string {
  const trimmed = current.trim();
  if (options?.preferCurrent && trimmed.length > 0) return current;
  if (!trimmed) return generated;
  return current;
}