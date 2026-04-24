/**
 * @module gtm
 * Helpers para inicializar Google Tag Manager y manipular el dataLayer.
 */

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
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
