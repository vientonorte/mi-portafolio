/**
 * Lead magnet · revisión WCAG 2.2 AA de un flujo (no heurístico pago).
 * Orden comercial: form (sitio + nombre + tel + mail) → informe → Calendar ≥48 h
 * → cita = walkthrough del informe + venta de Herramientas Digitales.
 * NO redirige a /auditoria. Calendar (mode schedule) solo post-envío.
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
import { recordBookingIntent } from "./vn-booking";

export const FREE_RADAR_ENTRY_MESSAGE: Record<Language, string> = {
  es: `Hola Viento Norte — quiero la revisión gratis WCAG 2.2 AA de un flujo.

Sitio web: [https://…]
Flujo a revisar (onboarding, pago o acceso): [cuál]
Empresa: [breve]

Tras el envío agendamos ≥48 h: en la cita recorro el informe (no discovery en blanco).

Gracias.`,
  en: `Hi Viento Norte — I want the free WCAG 2.2 AA review of one flow.

Website: [https://…]
Flow to review (onboarding, payment, or access): [which]
Company: [brief]

After sending we book ≥48 h out: the call is a walkthrough of the report (not a blank discovery).

Thanks.`,
};

export type FreeRadarEntryMode = "auto" | "schedule" | "message";

export interface OpenFreeRadarEntryOptions {
  /** auto | message = form primero. schedule = Calendar (solo después de enviar el form). */
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

  if (mode === "auto") {
    openMessage();
    return "contact_form";
  }

  if (mode === "schedule") {
    if (A11Y_FREE_SCHEDULE_URL) {
      trackGenerateLead(origin, "google_calendar");
      void recordBookingIntent({
        origin,
        intent: "radar-free",
        notes: "Agenda ≥48 h · walkthrough informe WCAG (vientonorte.io)",
      });
      openA11yFreeScheduleOrFallback(openMessage);
      return "google_calendar";
    }
    openMessage();
    return "contact_form";
  }

  openMessage();
  return "contact_form";
}

/** True si el build tiene agenda Google de a11y gratis (para CTAs duales). */
export function freeRadarHasSchedule(): boolean {
  return Boolean(A11Y_FREE_SCHEDULE_URL);
}
