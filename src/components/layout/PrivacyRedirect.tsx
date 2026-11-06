import { useEffect } from "react";
import { sitePrivacyHref } from "../../lib/site-nav";

/**
 * Vista hash `#/privacy` → /privacidad/ (página estática prerenderizada, respeta /qa/).
 * Respaldo dentro de la SPA; en carga directa redirige el script inline de index.html.
 */
export function PrivacyRedirect() {
  useEffect(() => {
    window.location.replace(`${sitePrivacyHref()}${window.location.search}`);
  }, []);
  return null;
}
