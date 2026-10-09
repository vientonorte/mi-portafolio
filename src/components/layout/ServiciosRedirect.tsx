import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { serviciosHref } from "../../lib/servicios-links";

/**
 * Rutas hash fuera de canon (p. ej. `#/news`, `#/news/<slug>`): reemplazo HTTP a
 * /servicios/ respetando la base de Vite (`/` en prod, `/qa/` en QA). `replace`
 * no deja la ruta hash en el historial. Conserva la query de la URL real y la de
 * la ruta hash (UTM); el ancla opcional sale de `fragment`.
 */
export function buildServiciosRedirectUrl(
  outerSearch: string,
  hashSearch: string,
  fragment?: string
): string {
  const params = new URLSearchParams(outerSearch);
  new URLSearchParams(hashSearch).forEach((v, k) => {
    if (!params.has(k)) params.set(k, v);
  });
  const qs = params.toString();
  const root = serviciosHref();
  return `${root}${qs ? `?${qs}` : ""}${fragment ? `#${fragment.replace(/^#/, "")}` : ""}`;
}

export function ServiciosRedirect({ fragment }: { fragment?: string }) {
  const { search } = useLocation();
  useEffect(() => {
    window.location.replace(buildServiciosRedirectUrl(window.location.search, search, fragment));
  }, [search, fragment]);
  return null;
}
