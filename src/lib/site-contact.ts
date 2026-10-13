/** Contacto canónico — Viento Norte / Rodrigo Gaete */

import type { ConsultingPackageId } from "../data/vientonorte-consulting";
import { withPackQuery } from "./consulting-pack-url";

/** Alias público (Email Routing → inbox privado). No publicar Gmail en el sitio. */
export const PUBLIC_CONTACT_EMAIL = "contacto@vientonorte.io";

/**
 * Inbox real para FormSubmit (action del form, no se muestra en UI).
 * Override: VITE_FORM_SUBMIT_INBOX
 */
export const FORM_SUBMIT_INBOX =
  import.meta.env.VITE_FORM_SUBMIT_INBOX ?? 'gaete.gaona@gmail.com';

export const SITE_CONTACT = {
  email: PUBLIC_CONTACT_EMAIL,
  linkedin: 'https://www.linkedin.com/in/rodrigo-gaete-ux/',
  github: 'https://github.com/vientonorte',
} as const;

/**
 * URL de agenda de videollamada (partner edu, etc.).
 * Override: VITE_VIDEO_CALL_URL
 * Si no está definida, el CTA de partner / educación abre contacto con mensaje prearmado.
 */
export const VIDEO_CALL_URL =
  (import.meta.env.VITE_VIDEO_CALL_URL as string | undefined)?.trim() || null;

/**
 * Google Calendar Appointment Schedule — auditoría a11y gratis (Radar freemium).
 * Override: VITE_A11Y_FREE_SCHEDULE_URL
 * Preferido: booking page de Calendar (calendar.app.google/… o appointments/schedules/…).
 * Fallback: VITE_VIDEO_CALL_URL si se reutiliza la misma agenda.
 */
export const A11Y_FREE_SCHEDULE_URL =
  (import.meta.env.VITE_A11Y_FREE_SCHEDULE_URL as string | undefined)?.trim() ||
  VIDEO_CALL_URL ||
  null;

export function hasA11yFreeSchedule(): boolean {
  return Boolean(A11Y_FREE_SCHEDULE_URL);
}

export function openVideoCallOrFallback(fallback: () => void): void {
  if (VIDEO_CALL_URL) {
    window.open(VIDEO_CALL_URL, '_blank', 'noopener,noreferrer');
    return;
  }
  fallback();
}

/** Abre la agenda Google de a11y gratis; si no hay URL, ejecuta fallback (formulario). */
export function openA11yFreeScheduleOrFallback(fallback: () => void): boolean {
  if (A11Y_FREE_SCHEDULE_URL) {
    window.open(A11Y_FREE_SCHEDULE_URL, '_blank', 'noopener,noreferrer');
    return true;
  }
  fallback();
  return false;
}

/** CTA único de agendamiento (Google Appointment) + registro Worker. */
export function openCalendarBooking(opts?: {
  packageId?: ConsultingPackageId;
  origin?: string;
  /** H2 · se llama solo si el Worker confirmó el registro (conversiones). */
  onConfirmed?: () => void;
}): boolean {
  if (!A11Y_FREE_SCHEDULE_URL) return false;
  const packageId = opts?.packageId;
  const origin = opts?.origin ?? "calendar-cta";
  void import("./vn-booking").then(({ recordBookingIntent }) =>
    recordBookingIntent({
      origin,
      intent: packageId ? "consulting" : "radar-free",
      notes: packageId
        ? `Click Agendar · pack ${packageId}`
        : "Click Agendar · Google Appointment",
      packageId,
      onConfirmed: opts?.onConfirmed,
    })
  );
  window.open(
    withPackQuery(A11Y_FREE_SCHEDULE_URL, packageId),
    "_blank",
    "noopener,noreferrer"
  );
  return true;
}

/**
 * Relay Cloudflare Worker — POST formulario de contacto.
 * Canónico: contact.vientonorte.io · fallback workers.dev si DNS aún no propagó.
 */
export const CONTACT_API_URL =
  import.meta.env.VITE_CONTACT_API_URL ??
  'https://contact.vientonorte.io/api/contact';

/**
 * CV público (TL 13-oct): CV UX/UI Product Designer limpio en public/cv/ (sin Gmail, teléfono, RUT
 * ni metadatos). Las rutas viejas public/cv-rodrigo-gaete-ux(-en).pdf quedan con el mismo PDF limpio
 * para no romper links externos.
 */
export const CV_ASSET = 'cv/Rodrigo-Gaete-CV-UX-UI-Product-Designer-ES.pdf';
export const CV_ASSET_EN = 'cv/Rodrigo-Gaete-CV-UX-UI-Product-Designer-EN.pdf';

export function getCvDownloadUrl(language: 'es' | 'en' = 'es'): string {
  const file = language === 'en' ? CV_ASSET_EN : CV_ASSET;
  return `${import.meta.env.BASE_URL}${file}`;
}

/**
 * @deprecated PO 13-oct: solo se publican los 2 CV PDF. Los .docx ATS se movieron a docs/entregables/
 * (no publicados); este helper devuelve el PDF limpio equivalente para no romper llamadas.
 */
export function getCvDocxUrl(language: 'es' | 'en' = 'es'): string {
  return getCvDownloadUrl(language);
}

export function getContactMailtoUrl(): string {
  return `mailto:${PUBLIC_CONTACT_EMAIL}`;
}

export const buildContactMailtoUrl = getContactMailtoUrl;