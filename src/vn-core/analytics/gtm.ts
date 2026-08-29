/**
 * @module gtm
 * Helpers para inicializar Google Tag Manager y manipular el dataLayer.
 */

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Inyecta el script de GTM en el `<head>` del documento.
 * Llama una sola vez en el entry point de la app.
 *
 * @param gtmId - ID del contenedor GTM (GTM-XXXXXXX)
 *
 * @example
 * import { initGTM } from '@vientonorte/analytics';
 * initGTM('GTM-ABC1234');
 */
/**
 * Inyecta gtag.js para GA4. Los page_view se envían manualmente (HashRouter).
 */
export function initGA4(ga4Id: string): void {
  if (typeof window === 'undefined') return;
  if (document.querySelector(`script[data-ga4-id="${ga4Id}"]`)) return;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', ga4Id, { send_page_view: false });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
  script.setAttribute('data-ga4-id', ga4Id);
  document.head.appendChild(script);
}

/**
 * Configura la cuenta de Google Ads (AW-XXXXXXXXXX) en el gtag existente.
 * Debe llamarse después de `initGA4` cuando `ga4Id` está disponible,
 * o por sí solo cuando solo se usan conversiones de Ads sin GA4.
 *
 * @param conversionId - ID completo de conversión: `AW-XXXXXXXXXX/YYYYYY`
 *                       o solo el account ID `AW-XXXXXXXXXX`.
 */
export function initGoogleAdsTag(conversionId: string): void {
  if (typeof window === 'undefined') return;
  // Extraer solo la parte AW-XXXXXXXXXX (sin el sufijo /label)
  const accountId = conversionId.split('/')[0];
  if (!accountId.startsWith('AW-')) return;
  // Guard de doble init — debe comprobarse antes de cualquier efecto secundario
  if (document.querySelector(`meta[data-aw-id="${accountId}"]`)) return;

  // Marcar como inicializado antes de cualquier llamada a gtag (evita re-entradas)
  const marker = document.createElement('meta');
  marker.setAttribute('data-aw-id', accountId);
  marker.setAttribute('hidden', '');
  document.head.appendChild(marker);

  window.dataLayer = window.dataLayer ?? [];
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag('js', new Date());
  }
  window.gtag('config', accountId);

  // Solo carga el script si no hay ya un gtag.js en el documento
  const hasGtagScript = Boolean(
    document.querySelector('script[data-ga4-id]') ||
      document.querySelector('script[src*="googletagmanager.com/gtag/js"]')
  );
  if (!hasGtagScript) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${accountId}`;
    document.head.appendChild(script);
  }
}

/**
 * Dispara un evento de conversión de Google Ads.
 * Requiere que `initGoogleAdsTag` haya sido llamado previamente.
 *
 * @param sendTo - Valor `send_to`: `AW-XXXXXXXXXX/YYYYYY`
 * @param params - Parámetros adicionales (value, currency, transaction_id, etc.)
 *
 * @example
 * fireAdsConversion('AW-123456789/AbCdEfGhIjK');
 */
export function fireAdsConversion(
  sendTo: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', 'conversion', { send_to: sendTo, ...params });
}

export function initGTM(gtmId: string): void {
  if (typeof window === 'undefined') return;
  if (document.querySelector(`script[data-gtm-id="${gtmId}"]`)) return; // ya inicializado

  // Inicializar dataLayer
  window.dataLayer = window.dataLayer ?? [];

  // Script principal de GTM
  const script = document.createElement('script');
  script.setAttribute('data-gtm-id', gtmId);
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;

  // Inline script de inicialización (recomendado por GTM)
  const inlineScript = document.createElement('script');
  inlineScript.textContent = `
    (function(w,d,s,l,i){
      w[l]=w[l]||[];
      w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
    })(window,document,'script','dataLayer','${gtmId}');
  `;

  document.head.insertBefore(inlineScript, document.head.firstChild);
  document.head.appendChild(script);

  // noscript fallback en body (accesibilidad para crawlers)
  if (document.body) {
    const noscript = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
    iframe.title = 'Google Tag Manager';
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);
  }
}

/**
 * Empuja un objeto al dataLayer de GTM.
 * Seguro de llamar antes de que GTM esté inicializado — los eventos se encolan.
 *
 * @param data - Objeto a enviar al dataLayer
 *
 * @example
 * pushDataLayer({ event: 'dashfin_import_csv_success', value: 42 });
 */
export function pushDataLayer(data: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(data);
}
