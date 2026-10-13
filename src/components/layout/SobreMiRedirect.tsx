import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { siteSobreMiHref } from "../../lib/site-nav";

/**
 * Vista hash fuera de canon `#/sobre-mi` → /sobre-mi/ (HTTP, respeta /qa/). Mismo patrón que
 * NoticiasRedirect: conserva la query real y la de la ruta hash (UTM). Respaldo para la navegación
 * dentro de la SPA; en carga directa redirige el script inline de index.html.
 */
export function buildSobreMiRedirectUrl(outerSearch: string, hashSearch: string): string {
  const params = new URLSearchParams(outerSearch);
  new URLSearchParams(hashSearch).forEach((v, k) => {
    if (!params.has(k)) params.set(k, v);
  });
  const qs = params.toString();
  return `${siteSobreMiHref()}${qs ? `?${qs}` : ""}`;
}

export function SobreMiRedirect() {
  const { search } = useLocation();
  useEffect(() => {
    window.location.replace(buildSobreMiRedirectUrl(window.location.search, search));
  }, [search]);
  return null;
}
