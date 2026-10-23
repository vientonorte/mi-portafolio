import { serviciosHref } from "./servicios-links";

/**
 * SSOT del nav minimal canónico (Rö, 2-oct: «el nav de la home debería ser el componente
 * por defecto»). Un solo lugar para los links del header en la home (SPA), /servicios/ y
 * las páginas de rubro (/servicios/web-<rubro>/).
 *
 * Canon (vn-agent, Decider 2026-09-27): solo URLs HTTP reales. Nunca rutas hash `/#/…`,
 * nunca `/s/…`, nunca los slugs viejos de redirección (/servicios/diagnostico-accesibilidad-wcag/,
 * /servicios/consultoria-ux-pymes/). Inicio vive solo en el logo, igual que en la home.
 */

/** Enlace plano del nav (sin router): lo consumen las variantes estáticas de Navigation. */
export interface SiteNavLink {
  id: string;
  label: string;
  href: string;
}

/** Ids del nav primario (la home los resuelve vía nav-config; las estáticas vía minimalNavLinks). */
export const SITE_NAV_PRIMARY_IDS = ["servicios", "noticias", "contacto"] as const;
export type SiteNavPrimaryId = (typeof SITE_NAV_PRIMARY_IDS)[number];

export const SITE_NAV_LABELS: Record<SiteNavPrimaryId, string> = {
  servicios: "Servicios",
  noticias: "Noticias",
  contacto: "Contacto",
};

/** Destino HTTP de «Servicios» en la home (nav-config `http`): siempre la página real. */
export const SITE_NAV_SERVICIOS_PATH = "/servicios/";

/** Home root respetando base de Vite: "/" en prod, "/qa/" en QA. */
export function homeHref(): string {
  return import.meta.env.BASE_URL || "/";
}

/** /servicios/ (o /servicios/#ancla) respetando base de Vite. */
export function siteServiciosHref(fragment?: string): string {
  return serviciosHref(fragment);
}

/** /noticias/ (página estática prerenderizada) respetando base de Vite. */
export function siteNoticiasHref(): string {
  const base = import.meta.env.BASE_URL || "/";
  return `${base.endsWith("/") ? base : `${base}/`}noticias/`;
}

/** /sobre-mi/. `#/sobre-mi` redirige aquí; no es una URL pública. */
export function siteSobreMiHref(): string {
  const base = import.meta.env.BASE_URL || "/";
  return `${base.endsWith("/") ? base : `${base}/`}sobre-mi/`;
}

/** /nosotros/ (página de empresa, prerenderizada) respetando base de Vite. */
export function siteNosotrosHref(): string {
  const base = import.meta.env.BASE_URL || "/";
  return `${base.endsWith("/") ? base : `${base}/`}nosotros/`;
}

/**
 * Lista ÚNICA de links del header (S42 v3): home, /servicios/, /noticias/ y rubros.
 * Servicios · Noticias · Contacto. La home la consume vía nav-config (NAV_SURFACE.headerPrimary
 * se deriva de SITE_NAV_PRIMARY_IDS); las estáticas vía esta función.
 * `contactHref` es local a cada página (#contacto en rubros, /servicios/#contacto en /servicios/ y /noticias/).
 * `contactHref` es local a cada página (#contacto en rubros, /servicios/#contacto en /servicios/).
 */
export function minimalNavLinks({ contactHref }: { contactHref: string }): SiteNavLink[] {
  return [
    { id: "servicios", label: SITE_NAV_LABELS.servicios, href: siteServiciosHref() },
    { id: "noticias", label: SITE_NAV_LABELS.noticias, href: siteNoticiasHref() },
    { id: "contacto", label: SITE_NAV_LABELS.contacto, href: contactHref },
  ];
}

/**
 * Drawer móvil de /servicios/, /noticias/ y rubros. La misma lista que el drawer
 * de la home: Inicio · Servicios · Noticias · Contacto · Nosotros.
 * El header de escritorio sigue en minimalNavLinks.
 */
export function staticMobileDrawerLinks({
  contactHref,
}: {
  contactHref: string;
}): SiteNavLink[] {
  return [
    { id: "inicio", label: "Inicio", href: homeHref() },
    ...minimalNavLinks({ contactHref }),
    { id: "nosotros", label: "Nosotros", href: siteNosotrosHref() },
  ];
}
