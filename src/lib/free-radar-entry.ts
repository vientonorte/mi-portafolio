/**
 * Lead magnet · Probar gratis (Diagnóstico de un flujo / a11y WCAG 2.2 AA).
 * 1 flujo accesible → conversación por Diagnóstico completo 5–7 días.
 * NO redirige a /auditoria (mentoría portfolio).
 *
 * Prioridad de canal:
 * 1. Google Calendar Appointment Schedule (agendar online)
 * 2. Formulario de contacto con mensaje prearmado (fallback)
 */

import type { NavigateFunction } from "react-router-dom";
import type { Language } from "./i18n";
import { analytics, trackEvent } from "./analytics";
import {
  navigateToContactAssistant,
  type ContactCtaOrigin,
} from "./navigate-to-contact";
import {
  A11Y_FREE_SCHEDULE_URL,
  openA11yFreeScheduleOrFallback,
} from "./site-contact";

export const FREE_RADAR_ENTRY_MESSAGE: Record<Language, string> = {
  es: `Hola Viento Norte — quiero la revisión gratis de accesibilidad de un flujo.

Qué revisar: [link o describe el flujo]
Empresa o producto: [breve]
Horario preferido (si no agendaste en Calendar): [día / franja CLT]

Si sirve, hablamos del Diagnóstico completo (5–7 días).

Gracias.`,
  en: `Hi Viento Norte — I want a free accessibility review of one flow.

What to review: [link or describe the flow]
Company or product: [brief]
Preferred time (if you did not book on Calendar): [day / slot, America/Santiago]

If it helps, we can talk about the full Diagnostic (5–7 days).

Thanks.`,
};

export type FreeRadarEntryMode = "auto" | "schedule" | "message";

export interface OpenFreeRadarEntryOptions {
  /** auto = Calendar si hay URL, si no formulario. schedule = fuerza Calendar o form. message = solo form. */
  mode?: FreeRadarEntryMode;
}

function trackGenerateLead(
  origin: ContactCtaOrigin,
  channel: "google_calendar" | "contact_form"
): void {
  trackEvent("generate_lead", {
    category: "conversion",
    lead_type: "free_a11y",
    package_id: "radar",
    freemium: true,
    channel,
    origin,
  });
  trackEvent("free_radar_entry_open", {
    origin,
    package_id: "radar",
    freemium: true,
    channel,
  });
  analytics.clickHeroFreeAudit();
}

/**
 * Entrada freemium a11y.
 * @returns canal usado
 */
export function openFreeRadarEntry(
  navigate: NavigateFunction,
  language: Language,
  origin: ContactCtaOrigin = "free-radar",
  options: OpenFreeRadarEntryOptions = {}
): "google_calendar" | "contact_form" {
  const mode = options.mode ?? "auto";

  const openMessage = () => {
    trackGenerateLead(origin, "contact_form");
    navigateToContactAssistant(navigate, {
      origin,
      source: "cta",
      intent: "consulting",
      packageId: "radar",
      message: FREE_RADAR_ENTRY_MESSAGE[language],
      consultingQ1: "radar-free",
    });
  };

  if (mode === "message") {
    openMessage();
    return "contact_form";
  }

  if (mode === "schedule" || mode === "auto") {
    if (A11Y_FREE_SCHEDULE_URL) {
      trackGenerateLead(origin, "google_calendar");
      openA11yFreeScheduleOrFallback(openMessage);
      return "google_calendar";
    }
    if (mode === "schedule") {
      // Sin URL de agenda: degradar a formulario (mismo mensaje freemium)
      openMessage();
      return "contact_form";
    }
  }

  openMessage();
  return "contact_form";
}

/** True si el build tiene agenda Google de a11y gratis (para CTAs duales). */
export function freeRadarHasSchedule(): boolean {
  return Boolean(A11Y_FREE_SCHEDULE_URL);
}
