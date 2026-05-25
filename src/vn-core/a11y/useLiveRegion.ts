/**
 * @module useLiveRegion
 * Hook React para anunciar mensajes dinámicos a tecnologías asistivas.
 * WCAG 2.2 AA — Status Messages (4.1.3)
 */

import { useEffect, useRef, useCallback } from 'react';

/** Politeness level del aria-live region */
type Politeness = 'polite' | 'assertive';

/** Estilos visualmente ocultos pero accesibles para screen readers */
const SR_ONLY_STYLES: Partial<CSSStyleDeclaration> = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap',
  borderWidth: '0',
};

/**
 * Crea un aria-live region dinámico y retorna una función `announce`
 * para inyectar mensajes que serán leídos por screen readers.
 *
 * El delay de 100 ms fuerza que el DOM cambie aunque el mensaje sea igual
 * al anterior, garantizando que el SR lo re-anuncie.
 *
 * @param politeness - 'polite' (default) espera silencio; 'assertive' interrumpe
 * @returns `announce(message: string)` — función para disparar anuncios
 *
 * @example
 * const announce = useLiveRegion('polite');
 * announce('Archivo cargado correctamente');
 */
export function useLiveRegion(
  politeness: Politeness = 'polite'
): (message: string) => void {
  const regionRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Crear el div en el DOM
    const div = document.createElement('div');
    div.setAttribute('role', 'status');
    div.setAttribute('aria-live', politeness);
    div.setAttribute('aria-atomic', 'true');
    div.setAttribute('aria-relevant', 'additions text');

    // Aplicar estilos sr-only
    Object.assign(div.style, SR_ONLY_STYLES);

    document.body.appendChild(div);
    regionRef.current = div;

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      div.remove();
      regionRef.current = null;
    };
  }, [politeness]);

  const announce = useCallback((message: string): void => {
    const region = regionRef.current;
    if (!region) return;

    // Vaciar primero para que el SR detecte el cambio aunque el texto sea igual
    region.textContent = '';

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (regionRef.current) {
        regionRef.current.textContent = message;
      }
    }, 100);
  }, []);

  return announce;
}
