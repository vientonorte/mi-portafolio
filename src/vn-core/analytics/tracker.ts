/**
 * @module tracker
 * VNTracker — clase principal de analytics para proyectos vientonorte.
 *
 * Naming convention aplicada automáticamente:
 * {project}_{feature}_{step}_{result}
 * Ejemplo: dashfin_import_csv_success
 */

import type { AnalyticsConfig, VNEvent, VNResult } from './types';
import { pushDataLayer } from './gtm';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Tracker principal del colectivo vientonorte.
 * Unifica GTM dataLayer y GA4 gtag bajo una API tipada con naming convention.
 *
 * @example
 * const tracker = new VNTracker({
 *   gtmId: 'GTM-ABC1234',
 *   ga4Id: 'G-XXXXXXXXXX',
 *   project: 'dashfin',
 *   debug: process.env.NODE_ENV !== 'production',
 *   enabled: process.env.NODE_ENV === 'production',
 * });
 *
 * tracker.track({ feature: 'import', step: 'csv', result: 'success' });
 * // Envía evento: "dashfin_import_csv_success"
 */
export class VNTracker {
  private readonly config: Required<AnalyticsConfig>;

  constructor(config: AnalyticsConfig) {
    this.config = {
      gtmId: config.gtmId ?? '',
      ga4Id: config.ga4Id ?? '',
      project: config.project,
      debug: config.debug ?? false,
      enabled: config.enabled ?? (typeof process !== 'undefined' && process.env?.['NODE_ENV'] === 'production'),
    };
  }

  /**
   * Convierte un VNEvent en nombre de evento siguiendo la naming convention.
   * Reemplaza guiones por underscores para compatibilidad con GA4.
   */
  private toEventName(event: Omit<VNEvent, 'project'>): string {
    const project = this.config.project.replace(/-/g, '_');
    const feature = event.feature.replace(/-/g, '_');
    const step = event.step.replace(/-/g, '_');
    return `${project}_${feature}_${step}_${event.result}`;
  }

  /**
   * Envía un evento a GTM dataLayer y GA4 gtag.
   *
   * @param event - Datos del evento (sin `project`, que se toma de la config)
   *
   * @example
   * tracker.track({ feature: 'auth', step: 'password', result: 'error' });
   * // → "dashfin_auth_password_error"
   */
  track(event: Omit<VNEvent, 'project'>): void {
    const eventName = this.toEventName(event);
    const data: Record<string, unknown> = {
      event: eventName,
      vn_project: this.config.project,
      vn_feature: event.feature,
      vn_step: event.step,
      vn_result: event.result,
      ...event.properties,
    };

    this.log(eventName, data);

    if (!this.config.enabled) return;

    // GTM dataLayer
    pushDataLayer(data);

    // GA4 gtag (si está disponible)
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, {
        vn_project: this.config.project,
        ...event.properties,
      });
    }
  }

  /**
   * Envía un evento de page_view a GA4.
   *
   * @param path - Path de la página (p.ej. "/dashboard/inversiones")
   * @param title - Título de la página
   *
   * @example
   * tracker.page('/dashboard', 'Dashboard — DashFin');
   */
  page(path: string, title: string): void {
    const data = {
      event: 'page_view',
      page_path: path,
      page_title: title,
      vn_project: this.config.project,
    };

    this.log('page_view', data);
    if (!this.config.enabled) return;

    pushDataLayer(data);

    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: path,
        page_title: title,
      });
    }
  }

  /**
   * Shortcut para eventos de interacción de UI.
   *
   * @example
   * tracker.ui('sidebar', 'toggle', 'success');
   * // → "dashfin_sidebar_toggle_success"
   */
  ui(
    feature: string,
    step: string,
    result: VNResult,
    props?: Record<string, string | number | boolean>
  ): void {
    this.track({ feature, step, result, properties: props });
  }

  /**
   * Shortcut para eventos de navegación entre vistas.
   *
   * @example
   * tracker.navigation('/login', '/dashboard');
   * // → "dashfin_navigation_route_view" con from/to como properties
   */
  navigation(from: string, to: string): void {
    this.track({
      feature: 'navigation',
      step: 'route',
      result: 'view',
      properties: { from, to },
    });
  }

  /**
   * Shortcut para eventos de formulario.
   *
   * @example
   * tracker.form('contacto', 'submit', 'success');
   * // → "mi-portafolio_contacto_submit_success"
   */
  form(formName: string, step: string, result: VNResult): void {
    this.track({ feature: formName, step, result });
  }

  /**
   * Log de debug — muestra eventos en consola sin enviar a GTM/GA4.
   * Solo activo si `debug: true` en la config.
   */
  private log(eventName: string, data: Record<string, unknown>): void {
    if (!this.config.debug) return;
    console.group(`[VNTracker] ${eventName}`);
    console.table(data);
    console.groupEnd();
  }
}
