import type { NavigateFunction } from "react-router-dom";
import { scrollToSection } from "./scroll-to-section";

export type SectionScrollState = { scrollTo?: string };

/** Navega a una ruta y hace scroll a `#sectionId` al montar la página destino. */
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

  navigate(pathname, { state: { scrollTo: sectionId } satisfies SectionScrollState });
}

/** Ejecutar en `useEffect` de la página destino para completar el scroll pendiente. */
export function runPendingSectionScroll(sectionId: string | undefined) {
  if (!sectionId) return;

  const selector = `#${sectionId}`;
  let attempts = 0;
  const maxAttempts = 40;

  const tryScroll = () => {
    const element = document.querySelector(selector);
    if (element) {
      scrollToSection(selector);
      return;
    }
    attempts += 1;
    if (attempts < maxAttempts) {
      requestAnimationFrame(tryScroll);
    }
  };

  requestAnimationFrame(tryScroll);
}