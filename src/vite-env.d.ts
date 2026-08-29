/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_API_URL?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_GTM_ID?: string;
  readonly VITE_FORM_SUBMIT_INBOX?: string;
  readonly VITE_GOOGLE_FORM_ACTION_URL?: string;
  readonly VITE_GOOGLE_FORM_ENTRY_NAME?: string;
  readonly VITE_GOOGLE_FORM_ENTRY_EMAIL?: string;
  readonly VITE_GOOGLE_FORM_ENTRY_MESSAGE?: string;
  readonly VITE_GOOGLE_FORM_ENTRY_INTENT?: string;
  readonly VITE_GOOGLE_FORM_ENTRY_SOURCE?: string;
  readonly VITE_GOOGLE_FORM_ENTRY_LANGUAGE?: string;
  /** Google Calendar Appointment Schedule — a11y gratis / Radar freemium */
  readonly VITE_A11Y_FREE_SCHEDULE_URL?: string;
  /** Agenda genérica (partner edu); fallback de a11y si no hay schedule dedicado */
  readonly VITE_VIDEO_CALL_URL?: string;
  /**
   * ID de conversión de Google Ads — formato `AW-XXXXXXXXXX/YYYYYY`.
   * Se obtiene en Google Ads → Conversiones → Reservar cita → Fragmento de evento.
   * Campaña: a11y_gratis_pymes · Acción: BOOK_APPOINTMENT
   */
  readonly VITE_GOOGLE_ADS_CONVERSION_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
