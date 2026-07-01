// Configuración analytics para mi-portafolio
import type { AnalyticsConfig } from './types';

const ga4Id = import.meta.env.VITE_GA_MEASUREMENT_ID;
const gtmId = import.meta.env.VITE_GTM_ID;

export const analyticsConfig: AnalyticsConfig = {
  project: 'mi-portafolio',
  ga4Id,
  gtmId,
  enabled: Boolean(ga4Id || gtmId),
  debug: import.meta.env.DEV,
};
