import type { Language } from "./i18n";

export const SEO_SITE = {
  /** Canon público Viento Norte — sin prefijo /mi-portafolio/ */
  baseUrl: "https://vientonorte.io",
  ogImage: "https://vientonorte.io/images/branding/og-home-1200.png",
  brand: "Viento Norte",
  role: "UXtech · Front office",
  /** SEO orgánico (root) */
  seoHomeUrl: "https://vientonorte.io/",
  /**
   * SEM paid final URL (HashRouter · Google Ads final URL).
   * Message-match: landing oferta `/#/consultoria` — no gastar SEM sin Test path.
   */
  semOfferUrl: "https://vientonorte.io/#/consultoria",
  /** URL de share para crawlers (sin hash). */
  shareHomeUrl: "https://vientonorte.io/s/",
  shareConsultoriaUrl: "https://vientonorte.io/s/consultoria",
  shareProcesoUrl: "https://vientonorte.io/s/proceso",
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

/** Canonical para HashRouter (GitHub Pages). */
export function canonicalFromPath(pathname: string): string {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return `${SEO_SITE.baseUrl}/`;
  return `${SEO_SITE.baseUrl}/#${path}`;
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