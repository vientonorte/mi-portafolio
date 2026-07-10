/** Contacto canónico — Viento Norte / Rodrigo Gaete */

/** Alias público (Email Routing → inbox privado). No publicar Gmail en el sitio. */
export const PUBLIC_CONTACT_EMAIL = 'contacto@vientonorte.cl';

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
 * URL de agenda de videollamada (Calendly, Google Calendar, etc.).
 * Override: VITE_VIDEO_CALL_URL
 * Si no está definida, el CTA de partner / educación abre contacto con mensaje prearmado.
 */
export const VIDEO_CALL_URL =
  (import.meta.env.VITE_VIDEO_CALL_URL as string | undefined)?.trim() || null;

export function openVideoCallOrFallback(fallback: () => void): void {
  if (VIDEO_CALL_URL) {
    window.open(VIDEO_CALL_URL, '_blank', 'noopener,noreferrer');
    return;
  }
  fallback();
}

/** Relay Cloudflare Worker — POST formulario de contacto */
export const CONTACT_API_URL =
  import.meta.env.VITE_CONTACT_API_URL ??
  'https://mi-portafolio-contact.vientonorte.workers.dev/api/contact';

/** CV público — servido desde public/ (GitHub Pages: /mi-portafolio/cv-rodrigo-gaete-ux.pdf) */
export const CV_ASSET = 'cv-rodrigo-gaete-ux.pdf';

export function getCvDownloadUrl(): string {
  return `${import.meta.env.BASE_URL}${CV_ASSET}`;
}

export function getContactMailtoUrl(): string {
  return `mailto:${PUBLIC_CONTACT_EMAIL}`;
}

export const buildContactMailtoUrl = getContactMailtoUrl;