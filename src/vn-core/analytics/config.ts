// Configuración analytics para mi-portafolio
// GTM unificado hub + portafolio: el mismo VITE_GTM_ID / contenedor GTM-XXXX
// Hub: meta vn-gtm o window.__VN_GTM_ID en vientonorte.github.io/index.html
import type { AnalyticsConfig } from './types';

const ga4Id = import.meta.env.VITE_GA_MEASUREMENT_ID;
const gtmId = import.meta.env.VITE_GTM_ID;
const adsConversionId = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID;

/** Contenedor GTM canónico (mismo en hub y portafolio cuando se configura). */
export const VN_GTM_CONTAINER_HINT =
  'Usar un solo GTM para https://vientonorte.io/ (canon sin /mi-portafolio/)';

export const analyticsConfig: AnalyticsConfig = {
  project: 'mi-portafolio',
  ga4Id,
  gtmId,
  adsConversionId,
  enabled: Boolean(ga4Id || gtmId || adsConversionId),
  debug: import.meta.env.DEV,
  surface: 'portafolio',
};
