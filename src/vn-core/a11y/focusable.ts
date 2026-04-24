/**
 * @module focusable
 * Utilidades para detectar y obtener elementos focusables.
 * WCAG 2.2 AA — Focus Order (2.4.3), Focus Visible (2.4.11)
 */

/** Selectores de elementos nativamente focusables o con tabindex >= 0 */
const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'details > summary',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Retorna todos los elementos focusables dentro de un contenedor,
 * ordenados por tabindex natural del DOM.
 *
 * @param container - El elemento raíz donde buscar
 * @returns Array de HTMLElement focusables visibles y no ocultos
 *
 * @example
 * const focusables = getFocusableElements(dialogRef.current);
 * focusables[0].focus();
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const candidates = Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
  );

  return candidates.filter((el) => isFocusable(el));
}

/**
 * Determina si un elemento es focusable (visible, no oculto, no inert).
 *
 * @param el - Elemento a evaluar
 * @returns true si el elemento puede recibir foco
 *
 * @example
 * if (isFocusable(buttonEl)) buttonEl.focus();
 */
export function isFocusable(el: HTMLElement): boolean {
  // Oculto via display:none o visibility:hidden
  if (!el.offsetParent && el.tagName !== 'BODY') {
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
  }

  // hidden attribute
  if (el.hasAttribute('hidden')) return false;

  // aria-hidden
  if (el.getAttribute('aria-hidden') === 'true') return false;

  // inert
  if (el.hasAttribute('inert') || el.closest('[inert]')) return false;

  // tabindex explícitamente -1 (ya filtrado en selector pero doble check)
  const tabindex = el.getAttribute('tabindex');
  if (tabindex === '-1') return false;

  // disabled (para form elements no cubiertos por :not([disabled]))
  if ((el as HTMLInputElement).disabled) return false;

  return true;
}
