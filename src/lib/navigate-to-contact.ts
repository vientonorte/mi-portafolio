import type { NavigateFunction } from "react-router-dom";
import type { ConsultingPackageId } from "../data/vientonorte-consulting";
import type { ContactIntent } from "./build-contact-message";
import type { ContactDraft, ContactDraftSource } from "./contact-draft";
import { ROUTES } from "./routes";
import { trackEvent } from "./analytics";

/** Origins for conversion CTAs that open the intelligent contact form. */
export type ContactCtaOrigin =
  | "audit-banner"
  | "audit-page"
  | "value-carousel"
  | "value-arsenal"
  | "hero-path"
  | "consultoria-hero"
  | "consultoria-packages"
  | "consultoria-contact"
  | "free-radar"
  | "quoter"
  | "onboarding"
  | "partner-edu"
  | "nav"
  | "contact"
  | "contact-assistant"
  | "service-path-demo"
  | "ads-a11y-landing"
  | "other";

export interface OpenContactAssistantOptions {
  intent?: ContactIntent;
  source?: ContactDraftSource;
  message?: string;
  packageId?: ConsultingPackageId;
  industry?: string;
  timeline?: string;
  recruiterMode?: string;
  consultingQ1?: string;
  conversationTitle?: string;
  /** Analytics: where the user came from */
  origin?: ContactCtaOrigin;
  /** Replace history entry (e.g. after redirect) */
  replace?: boolean;
}

const VALID_INTENTS: readonly ContactIntent[] = [
  "recruiter",
  "consulting",
  "freelance",
  "other",
];

export function isContactIntent(value: unknown): value is ContactIntent {
  return typeof value === "string" && (VALID_INTENTS as readonly string[]).includes(value);
}

/** Read `?intent=` from a search string (e.g. location.search). */
export function parseContactIntentFromSearch(search: string): ContactIntent | null {
  const raw = new URLSearchParams(search.startsWith("?") ? search : `?${search}`).get(
    "intent"
  );
  return isContactIntent(raw) ? raw : null;
}

/**
 * Build a ContactDraft for router state. Message may be empty when only
 * pre-selecting an intent (wizard starts at detail).
 */
export function buildContactDraft(options: OpenContactAssistantOptions): ContactDraft {
  const message = options.message?.trim() ?? "";
  return {
    message,
    source: options.source ?? "cta",
    intent: options.intent,
    packageId: options.packageId,
    industry: options.industry,
    timeline: options.timeline,
    recruiterMode: options.recruiterMode,
    consultingQ1: options.consultingQ1,
    conversationTitle: options.conversationTitle?.trim() || undefined,
  };
}

/**
 * Transversal entry to the intelligent contact form (ContactAssistant).
 * Use this from any conversion CTA across the portfolio.
 */
export function navigateToContactAssistant(
  navigate: NavigateFunction,
  options: OpenContactAssistantOptions = {}
): void {
  const draft = buildContactDraft(options);

  trackEvent("contact_assistant_open", {
    origin: options.origin ?? "other",
    intent: draft.intent ?? "unset",
    source: draft.source,
    has_message: Boolean(draft.message),
    package_id: draft.packageId ?? null,
  });

  const search =
    draft.intent && !draft.message
      ? `?intent=${encodeURIComponent(draft.intent)}`
      : "";

  navigate(
    { pathname: ROUTES.contact, search },
    {
      replace: options.replace,
      state: { contactDraft: draft },
    }
  );
}
