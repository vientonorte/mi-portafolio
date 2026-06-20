/** Contacto canónico — Viento Norte / Rodrigo Gaete */
export const SITE_CONTACT = {
  email: 'gaete.gaona@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rodrigo-gaete-ux/',
  github: 'https://github.com/vientonorte',
} as const;

/** CV público — servido desde public/ (GitHub Pages: /mi-portafolio/cv-rodrigo-gaete-ux.pdf) */
export const CV_ASSET = 'cv-rodrigo-gaete-ux.pdf';

export function getCvDownloadUrl(): string {
  return `${import.meta.env.BASE_URL}${CV_ASSET}`;
}