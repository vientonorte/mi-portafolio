// Configuración analytics para mi-portafolio
import type { AnalyticsConfig } from './types';

export const analyticsConfig: AnalyticsConfig = {
  project: 'mi-portafolio',
  ga4Id: undefined,   // TODO: agregar G-XXXXXXXXXX cuando se active GA4
  gtmId: undefined,   // TODO: agregar GTM-XXXXXXX cuando se active GTM
  enabled: false,     // cambiar a true cuando se agreguen los IDs reales
  debug: true,        // logs en consola durante desarrollo
};
