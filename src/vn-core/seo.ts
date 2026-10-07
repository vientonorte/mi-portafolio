import type { Language } from "../lib/i18n";

export const SEO_SITE = {
  /** Canon público Viento Norte — sin prefijo /mi-portafolio/ */
  baseUrl: "https://vientonorte.io",
  ogImage: "https://vientonorte.io/images/branding/og-home-1200.png",
  brand: "Viento Norte",
  role: "UXtech · Front office",
  /** SEO orgánico (root) */
  seoHomeUrl: "https://vientonorte.io/",
  /** Página de servicios (HTTP, en sitemap). Canon 2026-09-27. */
  serviciosUrl: "https://vientonorte.io/servicios/",
  /**
   * Producto UI (HashRouter). Enlace / final URL de Ads, **nunca canonical**
   * (un canonical no lleva '#'). DoD visual = qa:hash-ui, nunca `/s/`.
   */
  semOfferUrl:
    "https://vientonorte.io/servicios/?utm_source=google&utm_medium=cpc&utm_campaign=a11y_gratis_pymes#revision-gratis",
  /** @deprecated 2026-09-09 — /s/news purged. Enlace SPA, nunca canonical. */
  shareNewsUrl: "https://vientonorte.io/#/news",
  ogProceso: "https://vientonorte.io/images/branding/og-proceso-1200.png",
  /** Legacy path (GitHub project pages / bookmarks) */
  legacyBasePath: "/mi-portafolio",
} as const;

export function trimMetaDescription(text: string, max = 160): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

/**
 * Canonical para rutas del HashRouter (GitHub Pages). Canon 2026-09-27:
 * el fragmento (#/ruta) no llega al servidor ni lo indexa Google, así que toda
 * ruta hash canonicaliza a la home. Nunca devuelve una URL con '#'.
 */
export function canonicalFromPath(pathname: string): string {
  void pathname;
  return SEO_SITE.seoHomeUrl;
}

/**
 * Sanea un canonical/og:url: cualquier URL con fragmento (p. ej. /#/news/) cae a la home.
 * Red de seguridad para SEOHead cuando una página pasa una URL propia.
 */
export function sanitizeCanonicalUrl(url: string | undefined): string {
  if (!url || url.includes("#")) return SEO_SITE.seoHomeUrl;
  return url;
}

export function buildDocumentTitle(title: string, isHome = false): string {
  return isHome ? title : `${title} · ${SEO_SITE.brand}`;
}

export function companyPageSeo(
  companyName: string,
  description: string,
  language: Language
): { title: string; description: string } {
  const es = language === "es";
  return {
    title: es ? `${companyName} — Casos UX` : `${companyName} — UX Cases`,
    description: trimMetaDescription(description),
  };
}

export function projectPageSeo(
  projectName: string,
  companyName: string,
  description: string,
  language: Language
): { title: string; description: string } {
  const es = language === "es";
  return {
    title: es
      ? `${projectName} · ${companyName}`
      : `${projectName} · ${companyName}`,
    description: trimMetaDescription(description),
  };
}

export function processPageSeo(
  processName: string,
  language: Language
): { title: string; description: string } {
  const es = language === "es";
  return {
    title: es ? `${processName} — Proceso UX` : `${processName} — UX Process`,
    description: trimMetaDescription(
      es
        ? `Metodología ${processName}: métodos, herramientas y casos reales en fintech y mobility.`
        : `${processName} methodology: methods, tools, and real fintech & mobility cases.`
    ),
  };
}