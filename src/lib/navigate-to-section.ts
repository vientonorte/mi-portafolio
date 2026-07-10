import type { NavigateFunction } from "react-router-dom";
import { scrollToSection, scrollToTop } from "./scroll-to-section";

export type SectionScrollState = { scrollTo?: string };

/** Navega a una ruta y hace scroll al inicio de `#sectionId` al montar la página destino. */
export function navigateToPageSection(
  navigate: NavigateFunction,
  pathname: string,
  sectionId: string,
  currentPathname: string
) {
  const normalized = (p: string) => p.replace(/\/+$/, "") || "/";
  const selector = `#${sectionId}`;

  if (normalized(currentPathname) === normalized(pathname)) {
    scrollToSection(selector);
    return;
  }

  navigate(pathname, {
    state: { scrollTo: sectionId } satisfies SectionScrollState,
  });
}

/**
 * Ejecutar en `useEffect` de la página destino para completar el scroll pendiente
 * al **inicio de la sección** (no a mitad de viewport).
 */
export function runPendingSectionScroll(sectionId: string | undefined) {
  if (!sectionId) return;

  const selector = `#${sectionId}`;
  let attempts = 0;
  const maxAttempts = 48;

  const tryScroll = () => {
    const element = document.querySelector(selector);
    if (element) {
      // auto: evita pelear con el scroll-to-top de cambio de ruta
      scrollToSection(selector, "auto");
      // segundo frame por si lazy content reflow
      requestAnimationFrame(() => scrollToSection(selector, "auto"));
      return;
    }
    attempts += 1;
    if (attempts < maxAttempts) {
      requestAnimationFrame(tryScroll);
    }
  };

  requestAnimationFrame(tryScroll);
}

/** Tras navegación de ruta sin ancla: ir al inicio de la página. */
export function runRouteScrollToTop() {
  scrollToTop("auto");
}
