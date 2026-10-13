import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { siteSobreMiHref } from "../../lib/site-nav";

/**
 * Vista hash fuera de canon `#/sobre-mi` → /sobre-mi/ (HTTP, respeta /qa/). Mismo patrón que
 * NoticiasRedirect: conserva la query real y la de la ruta hash (UTM). Respaldo para la navegación
 * dentro de la SPA; en carga directa redirige el script inline de index.html.
 */
export function buildSobreMiRedirectUrl(outerSearch: string, hashSearch: string, section?: string | null): string {
  const params = new URLSearchParams(outerSearch);
  new URLSearchParams(hashSearch).forEach((v, k) => {
    if (!params.has(k)) params.set(k, v);
  });
  const qs = params.toString();
  const sec = section && /^[a-z0-9-]+$/.test(section) ? `#${section}` : "";
  return `${siteSobreMiHref()}${qs ? `?${qs}` : ""}${sec}`;
}

export function SobreMiRedirect() {
  const { search, state } = useLocation();
  const { section } = useParams();
  // Deep link: #/sobre-mi/<sección> o navegación interna con state.scrollTo (section/sobre-mi/<sección>).
  const target = section ?? (state as { scrollTo?: string } | null)?.scrollTo ?? null;
  useEffect(() => {
    window.location.replace(buildSobreMiRedirectUrl(window.location.search, search, target));
  }, [search, target]);
  return null;
}
