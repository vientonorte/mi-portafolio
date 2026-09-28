/**
 * <head> por rubro (título, description, canonical, OG/Twitter, JSON-LD Service).
 * Lo inyecta scripts/prerender-servicios.mjs en dist/servicios/<slug>/index.html.
 * robots "index, follow": el build QA (/qa/) lo pasa a noindex en deploy-qa.yml.
 */
import { RUBRO_OFFER, RUBROS_ORIGIN, getRubro, rubroCanonical } from "./rubros-content";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function rubroJsonLd(slug: string): Record<string, unknown> {
  const r = getRubro(slug);
  const url = rubroCanonical(slug);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": url,
    name: r.seo.title.replace(/ · Viento Norte$/, ""),
    description: r.seo.description,
    url,
    serviceType: RUBRO_OFFER.name,
    audience: { "@type": "BusinessAudience", name: r.rubro },
    areaServed: { "@type": "Country", name: "Chile" },
    provider: { "@type": "Organization", name: "Viento Norte", url: `${RUBROS_ORIGIN}/` },
    offers: {
      "@type": "Offer",
      price: String(RUBRO_OFFER.priceValue),
      priceCurrency: RUBRO_OFFER.currency,
      url,
    },
  };
}

export function renderRubroHead(slug: string): string {
  const r = getRubro(slug);
  const url = rubroCanonical(slug);
  const img = `${RUBROS_ORIGIN}/${r.mockups.card.png}`;
  // JSON dentro de <script>: escapar "<" para que nunca cierre la etiqueta.
  const ld = JSON.stringify(rubroJsonLd(slug)).replace(/</g, "\\u003c");
  return [
    `<title>${esc(r.seo.title)}</title>`,
    `<meta name="description" content="${esc(r.seo.description)}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Viento Norte" />`,
    `<meta property="og:locale" content="es_CL" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:title" content="${esc(r.seo.title)}" />`,
    `<meta property="og:description" content="${esc(r.seo.description)}" />`,
    `<meta property="og:image" content="${esc(img)}" />`,
    `<meta property="og:image:width" content="${r.mockups.card.width}" />`,
    `<meta property="og:image:height" content="${r.mockups.card.height}" />`,
    `<meta property="og:image:alt" content="${esc(r.mockups.card.alt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(r.seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(r.seo.description)}" />`,
    `<meta name="twitter:image" content="${esc(img)}" />`,
    `<script type="application/ld+json">${ld}</script>`,
  ]
    .map((l) => `    ${l}`)
    .join("\n");
}
