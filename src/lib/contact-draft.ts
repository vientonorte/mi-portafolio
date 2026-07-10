import type { ContactIntent } from "./build-contact-message";
import type { ConsultingPackageId } from "../data/vientonorte-consulting";

export type ContactDraftSource =
  | "direct"
  | "onboarding"
  | "quoter"
  | "assistant"
  | "parten-edu";

export interface ContactDraft {
  message: string;
  source: ContactDraftSource;
  intent?: ContactIntent;
  packageId?: ConsultingPackageId;
  industry?: string;
  timeline?: string;
  recruiterMode?: string;
  consultingQ1?: string;
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
  if (!message) return null;

  if ("source" in raw && typeof raw.source === "string") {
    return {
      message,
      source: raw.source as ContactDraftSource,
      intent: raw.intent,
      packageId: raw.packageId,
      industry: raw.industry,
      timeline: raw.timeline,
      recruiterMode: raw.recruiterMode,
      consultingQ1: raw.consultingQ1,
    };
  }

  return { message, source: "direct" };
}

export function shouldSkipAssistantWizard(draft: ContactDraft | null): boolean {
  if (!draft) return false;
  return (
    draft.source === "onboarding" ||
    draft.source === "quoter" ||
    draft.source === "parten-edu"
  );
}

export function resolveAssistantInitialStep(draft: ContactDraft | null): ContactAssistantStep {
  if (shouldSkipAssistantWizard(draft)) return "compose";
  return "intent";
}

export function draftBannerKey(
  draft: ContactDraft | null
): "onboarding" | "quoter" | "parten-edu" | null {
  if (!draft) return null;
  if (draft.source === "parten-edu") return "parten-edu";
  if (draft.source === "onboarding") return "onboarding";
  if (draft.source === "quoter") return "quoter";
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