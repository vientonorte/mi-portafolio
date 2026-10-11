import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { siteNoticiasHref } from "../../lib/site-nav";

/**
 * Vista hash fuera de canon `#/news` y `#/news/<slug>` → /noticias/ (HTTP, respeta /qa/).
 * `replace` no deja la ruta hash en el historial. Conserva la query de la URL real y la de
 * la ruta hash (UTM). Respaldo para navegación dentro de la SPA: en carga directa, el script
 * inline de index.html redirige antes de montar la app (sin doble carga).
 */
export function buildNoticiasRedirectUrl(outerSearch: string, hashSearch: string): string {
  const params = new URLSearchParams(outerSearch);
  new URLSearchParams(hashSearch).forEach((v, k) => {
    if (!params.has(k)) params.set(k, v);
  });
  const qs = params.toString();
  return `${siteNoticiasHref()}${qs ? `?${qs}` : ""}`;
}

export function NoticiasRedirect() {
  const { search } = useLocation();
  useEffect(() => {
    window.location.replace(buildNoticiasRedirectUrl(window.location.search, search));
  }, [search]);
  return null;
}
