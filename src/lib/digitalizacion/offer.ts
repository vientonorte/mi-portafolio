/**
 * Oferta «Digitalización de tu negocio» (MVP, noindex).
 * Rutas SPA: /#/digitalizacion (landing) · /#/digitalizacion/demo (demo con datos de ejemplo).
 * Sin precios de Cobros/Dashboard: TODO_PRECIO (pendiente Decider). Sin testimonios ni métricas.
 */
import { trackEvent } from "../analytics";
import { serviciosHref } from "../servicios-links";

export const VN_WHATSAPP = "56942637408";

export const DIGITALIZACION_WA_TEXT =
  "Hola, quiero digitalizar mi negocio (web + cobros por transferencia + dashboard de caja). ¿Me cuentan cómo funciona?";

export const DIGITALIZACION_DEMO_WA_TEXT =
  "Hola, vi el demo del dashboard de caja y quiero verlo con los datos de mi negocio.";

export function whatsappUrl(text: string = DIGITALIZACION_WA_TEXT): string {
  return `https://wa.me/${VN_WHATSAPP}?text=${encodeURIComponent(text)}`;
}

/**
 * Consultoría del HashRouter. UTM antes del hash.
 * La base de Vite va delante: en QA queda /qa/?utm…#/consultoria, no la home de producción.
 */
function spaQueryHash(queryAndHash: string): string {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  return `${base}${queryAndHash}`;
}

export const CONSULTORIA_UTM_URL = spaQueryHash(
  "/?utm_source=vientonorte&utm_medium=landing&utm_campaign=digitalizacion_mvp#/consultoria"
);

/** Entrada de la escalera: ancla viva. /s/web-express/ solo redirige. */
export const WEB_EXPRESS_URL = serviciosHref("web-pymes");

export const DIGITALIZACION_EVENTS = {
  cta: "digitalizacion_cta_click",
  demoView: "digitalizacion_demo_view",
  whatsapp: "digitalizacion_whatsapp_click",
} as const;

const PRODUCT = "digitalizacion_negocio";

export function trackDigitalizacionCta(location: string, destination: string): void {
  trackEvent(DIGITALIZACION_EVENTS.cta, { product: PRODUCT, location, destination });
}

export function trackDigitalizacionWhatsapp(location: string): void {
  trackEvent(DIGITALIZACION_EVENTS.whatsapp, { product: PRODUCT, location, destination: "whatsapp" });
}

export function trackDigitalizacionDemoView(sample: boolean): void {
  trackEvent(DIGITALIZACION_EVENTS.demoView, { product: PRODUCT, sample });
}
