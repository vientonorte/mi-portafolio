/**
 * Scroll unificado del portafolio.
 * - Inicio de página: scrollToTop (cambio de ruta)
 * - Ancla de sección: scrollToSection (offset header fijo)
 */

export type ScrollBehaviorMode = "smooth" | "auto";

function getScrollTopOffset(): number {
  const isSubpageOnly = document.documentElement.dataset.nav === "subpage";
  const root = getComputedStyle(document.documentElement);
  const tokenHeight = parseFloat(root.getPropertyValue("--header-height"));

  const header = isSubpageOnly
    ? document.querySelector(".subpage-toolbar")
    : document.querySelector('header[role="banner"]');
  const headerPx =
    header instanceof HTMLElement
      ? header.offsetHeight
      : !Number.isNaN(tokenHeight) && tokenHeight > 0
        ? tokenHeight
        : 64;

  const processNav = document.querySelector(".process-nav-mobile");
  const processNavPx =
    processNav instanceof HTMLElement &&
    getComputedStyle(processNav).display !== "none"
      ? processNav.offsetHeight
      : 0;

  return headerPx + processNavPx;
}

/** Scroll al inicio del documento (inicio de página). */
export function scrollToTop(behavior: ScrollBehaviorMode = "auto"): void {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior,
  });
}

/**
 * Scroll al inicio de una sección (#id o selector), con offset del header.
 * Preferir esto sobre element.scrollIntoView (no respeta --header-height).
 */
export function scrollToSection(
  selectorOrId: string,
  behavior: ScrollBehaviorMode = "smooth"
): void {
  const selector = selectorOrId.startsWith("#")
    ? selectorOrId
    : `#${selectorOrId}`;

  requestAnimationFrame(() => {
    const element = document.querySelector(selector);
    if (!element) return;

    const topOffset = getScrollTopOffset();
    const rect = element.getBoundingClientRect();
    const top = rect.top + window.scrollY - topOffset;

    window.scrollTo({
      top: Math.max(0, top),
      left: 0,
      behavior,
    });
  });
}

/** Alias explícito: inicio de sección con el mismo contrato. */
export function scrollToSectionStart(
  sectionId: string,
  behavior: ScrollBehaviorMode = "smooth"
): void {
  scrollToSection(sectionId, behavior);
}
