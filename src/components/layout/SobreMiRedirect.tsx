import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { siteSobreMiHref } from "../../lib/site-nav";

/**
 * `#/sobre-mi` no es URL pública. La ficha es https://ro.vientonorte.io/.
 * Respaldo del script de index.html (carga directa, antes de montar la SPA).
 * En navegación dentro del HashRouter, replace: no queda la ruta hash en el historial.
 * Conserva la query real y la de la ruta hash. Un scrollTo de sección baja como ancla
 * de la ficha (`/sobre-mi/#experiencia`), no como otra ruta `#/`.
 */
export function buildSobreMiRedirectUrl(
  outerSearch: string,
  hashSearch: string,
  sectionId?: string
): string {
  const params = new URLSearchParams(outerSearch);
  new URLSearchParams(hashSearch).forEach((v, k) => {
    if (!params.has(k)) params.set(k, v);
  });
  const qs = params.toString();
  const anchor = sectionId && /^[A-Za-z][\w-]*$/.test(sectionId) ? `#${sectionId}` : "";
  return `${siteSobreMiHref()}${qs ? `?${qs}` : ""}${anchor}`; // https://ro.vientonorte.io/
}

export function SobreMiRedirect() {
  const { search, state } = useLocation();
  useEffect(() => {
    const section = (state as { scrollTo?: string } | null)?.scrollTo;
    window.location.replace(buildSobreMiRedirectUrl(window.location.search, search, section));
  }, [search, state]);
  return null;
}
