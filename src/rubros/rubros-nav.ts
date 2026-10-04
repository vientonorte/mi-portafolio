import type { SiteNavLink } from "../lib/site-nav";
import { minimalNavLinks, siteServiciosHref } from "../lib/site-nav";

/** /servicios/ respetando base de Vite ("/servicios/" en prod, "/qa/servicios/" en QA). */
export function serviciosHref(): string {
  return siteServiciosHref();
}

/** Nav minimal canónico (src/lib/site-nav.ts): Servicios · Contacto (#contacto de la landing). */
export function rubroNavLinks(): SiteNavLink[] {
  return minimalNavLinks({ contactHref: "#contacto" });
}
