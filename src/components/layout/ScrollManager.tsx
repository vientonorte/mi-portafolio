import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { runRouteScrollToTop } from "../../lib/navigate-to-section";
import type { SectionScrollState } from "../../lib/navigate-to-section";

function normalizePath(path: string): string {
  return path.replace(/\/+$/, "") || "/";
}

/**
 * Congruencia de scroll en HashRouter:
 * - Cambio de ruta **sin** `state.scrollTo` → **inicio de página** (top 0)
 * - Con `state.scrollTo` → la página destino usa `runPendingSectionScroll`
 *   al **inicio de la sección** (offset header); no forzamos top aquí.
 */
export function ScrollManager() {
  const location = useLocation();
  const prevPathRef = useRef(normalizePath(location.pathname));

  useLayoutEffect(() => {
    const path = normalizePath(location.pathname);
    const prev = prevPathRef.current;
    const state = location.state as SectionScrollState | null;
    const hasSectionTarget = Boolean(state?.scrollTo);

    if (path !== prev) {
      prevPathRef.current = path;
      if (!hasSectionTarget) {
        runRouteScrollToTop();
      }
    }
  }, [location.pathname, location.state]);

  return null;
}
