/**
 * @module react
 * Hook y Provider React para VNTracker.
 * Tree-shakeable — solo se importa si el proyecto usa React.
 */

import React, { createContext, useContext, useMemo } from 'react';
import { VNTracker } from './tracker';
import type { AnalyticsConfig } from './types';

const AnalyticsContext = createContext<VNTracker | null>(null);

/**
 * Provider que inicializa un VNTracker y lo hace disponible via contexto.
 * Colocar en el root del árbol de componentes (App.tsx o layout raíz).
 *
 * @example
 * // En App.tsx:
 * import { AnalyticsProvider } from '@vientonorte/analytics';
 *
 * <AnalyticsProvider config={{ project: 'dashfin', ga4Id: 'G-XXX', enabled: true }}>
 *   <Router />
 * </AnalyticsProvider>
 */
export function AnalyticsProvider({
  config,
  children,
}: {
  config: AnalyticsConfig;
  children: React.ReactNode;
}): React.JSX.Element {
  // Memorizar el tracker para evitar re-instanciar en cada render
  const tracker = useMemo(() => new VNTracker(config), [
    config.project,
    config.gtmId,
    config.ga4Id,
    config.debug,
    config.enabled,
  ]);

  return (
    <AnalyticsContext.Provider value={tracker}>
      {children}
    </AnalyticsContext.Provider>
  );
}

/**
 * Hook para acceder al VNTracker desde cualquier componente.
 * Debe usarse dentro de un AnalyticsProvider.
 *
 * @returns VNTracker instancia configurada
 * @throws Error si se usa fuera del AnalyticsProvider
 *
 * @example
 * function ContactForm() {
 *   const tracker = useAnalytics();
 *
 *   const handleSubmit = async () => {
 *     tracker.form('contact', 'submit', 'start');
 *     try {
 *       await submitForm();
 *       tracker.form('contact', 'submit', 'success');
 *     } catch {
 *       tracker.form('contact', 'submit', 'error');
 *     }
 *   };
 *
 *   return <form onSubmit={handleSubmit}>…</form>;
 * }
 */
export function useAnalytics(): VNTracker {
  const tracker = useContext(AnalyticsContext);
  if (!tracker) {
    throw new Error(
      'useAnalytics() debe usarse dentro de un <AnalyticsProvider>. ' +
      'Asegúrate de envolver tu app con <AnalyticsProvider config={…}>.'
    );
  }
  return tracker;
}
