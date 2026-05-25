/**
 * @module types
 * Tipos y naming convention para analytics del colectivo vientonorte.
 *
 * Naming convention: {proyecto}_{feature}_{step}_{result}
 * Ejemplo: dashfin_import_csv_success
 *          mi-portafolio_contact_form_error
 *          uxtools_export_pdf_start
 */

/** Proyectos del colectivo vientonorte */
export type VNProject =
  | 'mi-portafolio'
  | 'dashfin'
  | 'table-ro'
  | 'uxtools'
  | 'contra-archivo';

/** Resultados posibles de un evento */
export type VNResult = 'start' | 'success' | 'error' | 'cancel' | 'view';

/**
 * Evento de analytics normalizado.
 * El nombre final en GTM/GA4 será: `{project}_{feature}_{step}_{result}`
 * con guiones reemplazados por underscores.
 */
export interface VNEvent {
  project: VNProject;
  /** Feature o módulo en snake_case (p.ej. "import", "auth", "report") */
  feature: string;
  /** Paso específico en snake_case (p.ej. "csv", "password", "monthly") */
  step: string;
  result: VNResult;
  /** Propiedades adicionales (dimensiones custom en GA4) */
  properties?: Record<string, string | number | boolean>;
}

/** Configuración del tracker */
export interface AnalyticsConfig {
  /** ID de Google Tag Manager (GTM-XXXXXXX) */
  gtmId?: string;
  /** ID de Google Analytics 4 (G-XXXXXXXXXX) */
  ga4Id?: string;
  project: VNProject;
  /** true = loguea eventos en consola sin enviar a GTM/GA4 */
  debug?: boolean;
  /**
   * false = no envía eventos (útil en desarrollo).
   * Default: false en dev (NODE_ENV !== 'production'), true en prod.
   */
  enabled?: boolean;
}
