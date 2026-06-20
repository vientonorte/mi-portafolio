/** Contacto canónico — Viento Norte / Rodrigo Gaete */

/** Alias público (Email Routing → inbox privado). No publicar Gmail en el sitio. */
export const PUBLIC_CONTACT_EMAIL = 'contacto@vientonorte.cl';

export const SITE_CONTACT = {
  email: PUBLIC_CONTACT_EMAIL,
  linkedin: 'https://www.linkedin.com/in/rodrigo-gaete-ux/',
  github: 'https://github.com/vientonorte',
} as const;

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