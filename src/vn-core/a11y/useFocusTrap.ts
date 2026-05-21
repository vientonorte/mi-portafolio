/**
 * @module useFocusTrap
 * Focus trap para modales, drawers y dialogs.
 * WCAG 2.2 AA — Focus Order (2.4.3), No Keyboard Trap (2.1.2 — la trampa es intencional
 * y el usuario puede salir con Escape via el componente padre).
 */

import { type RefObject, useEffect } from 'react';
import { getFocusableElements } from './focusable';

// ─── Vanilla JS ──────────────────────────────────────────────────────────────

export interface FocusTrap {
  /** Activa la trampa: redirige Tab/Shift+Tab al interior del contenedor */
  activate(): void;
  /** Desactiva la trampa y restaura el foco al elemento que lo tenía antes */
  deactivate(): void;
}

/**
 * Crea un focus trap vanilla (sin React) para un contenedor dado.
 * Útil en proyectos sin framework o en web components.
 *
 * @param element - Contenedor que encierra el foco
 * @returns { activate, deactivate }
 *
 * @example
 * const trap = createFocusTrap(document.querySelector('#modal'));
 * trap.activate();
 * // … al cerrar:
 * trap.deactivate();
 */
export function createFocusTrap(element: HTMLElement): FocusTrap {
  let previouslyFocused: HTMLElement | null = null;

  function handleKeyDown(e: KeyboardEvent): void {
    if (e.key !== 'Tab') return;

    const focusables = getFocusableElements(element);
    if (focusables.length === 0) {
      e.preventDefault();
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement as HTMLElement;

    if (e.shiftKey) {
      // Shift+Tab: si estamos en el primer elemento → ir al último
      if (active === first || !element.contains(active)) {
        e.preventDefault();
        last.focus();
      }
    } else {
      // Tab: si estamos en el último elemento → ir al primero
      if (active === last || !element.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  return {
    activate() {
      previouslyFocused = document.activeElement as HTMLElement | null;
      // Mover foco al primer elemento focusable del contenedor
      const focusables = getFocusableElements(element);
      if (focusables.length > 0) focusables[0].focus();
      document.addEventListener('keydown', handleKeyDown);
    },

    deactivate() {
      document.removeEventListener('keydown', handleKeyDown);
      // Restaurar foco al elemento que lo tenía antes de abrir
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
      previouslyFocused = null;
    },
  };
}

// ─── React Hook ──────────────────────────────────────────────────────────────

/**
 * Hook React que aplica un focus trap a un ref de contenedor.
 * Se activa/desactiva automáticamente con el flag `active`.
 *
 * @param ref - RefObject del contenedor (p.ej. ref de un dialog)
 * @param active - true = trampa activa, false = trampa desactivada
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * useFocusTrap(ref, isOpen);
 * return <div ref={ref}>{children}</div>;
 */
export function useFocusTrap(
  ref: RefObject<HTMLElement>,
  active: boolean
): void {
  useEffect(() => {
    if (!active || !ref.current) return;

    const trap = createFocusTrap(ref.current);
    trap.activate();

    return () => {
      trap.deactivate();
    };
  }, [active, ref]);
}
