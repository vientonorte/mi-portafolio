import type { SiteNavLink } from "../lib/site-nav";
import { homeHref, minimalNavLinks, siteServiciosHref } from "../lib/site-nav";

/** Home root respetando base de Vite ("/" en prod, "/qa/" en QA). Fuente: src/lib/site-nav.ts. */
export { homeHref };

/** Nav minimal canónico (src/lib/site-nav.ts): Servicios · Contacto. Nunca /#/. */
export function serviciosNavLinks(): SiteNavLink[] {
  return minimalNavLinks({ contactHref: siteServiciosHref("contacto") });
}
