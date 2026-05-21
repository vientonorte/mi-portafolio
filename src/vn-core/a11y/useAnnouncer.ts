/**
 * @module useAnnouncer
 * Versión simplificada de useLiveRegion para mensajes de estado transitorios.
 * WCAG 2.2 AA — Status Messages (4.1.3)
 */

import { useCallback } from 'react';
import { useLiveRegion } from './useLiveRegion';

export interface AnnouncerControls {
  /** Anuncia un mensaje a tecnologías asistivas */
  announce(message: string): void;
  /** Limpia el contenido del live region (sin anuncio) */
  clear(): void;
}

/**
 * Hook simplificado para anuncios de estado.
 * Usa politeness 'polite' por defecto.
 *
 * @returns { announce, clear }
 *
 * @example
 * const { announce, clear } = useAnnouncer();
 *
 * // Al guardar:
 * announce('Cambios guardados');
 *
 * // Al desmontar o navegar:
 * clear();
 */
export function useAnnouncer(): AnnouncerControls {
  const announce = useLiveRegion('polite');

  const clear = useCallback((): void => {
    // Anunciar string vacío equivale a limpiar sin notificar al SR
    announce('');
  }, [announce]);

  return { announce, clear };
}
