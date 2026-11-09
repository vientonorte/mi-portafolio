/**
 * <head> por edición (title, description, canonical propio, OG/Twitter, JSON-LD NewsArticle).
 * Lo inyecta scripts/prerender-servicios.mjs en dist/noticias/<slug>/index.html.
 * robots "index, follow": el build QA (/qa/) lo pasa a noindex en deploy-qa.yml.
 * Todo el texto sale de src/data/news-editions.json.
 */
import { NEWS_ORIGIN, newsEditionCanonical } from "../data/news-editions";
import { getEdition } from "./NoticiaPage";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const OG_IMAGE = `${NEWS_ORIGIN}/images/branding/og-servicios-1200.png`;

export function noticiaJsonLd(slug: string): Record<string, unknown> {
  const e = getEdition(slug);
  const url = newsEditionCanonical(slug);
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": url,
    headline: e.title.es,
    description: e.dek.es,
    url,
    mainEntityOfPage: url,
    inLanguage: "es-CL",
    image: OG_IMAGE,
    author: { "@type": "Organization", name: "Viento Norte", url: `${NEWS_ORIGIN}/` },
    publisher: { "@type": "Organization", name: "Viento Norte", url: `${NEWS_ORIGIN}/` },
  };
}

export function renderNoticiaHead(slug: string): string {
  const e = getEdition(slug);
  const url = newsEditionCanonical(slug);
  const title = `${e.title.es} · Viento Norte`;
  const ld = JSON.stringify(noticiaJsonLd(slug)).replace(/</g, "\\u003c");
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(e.dek.es)}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:site_name" content="Viento Norte" />`,
    `<meta property="og:locale" content="es_CL" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(e.dek.es)}" />`,
    `<meta property="og:image" content="${esc(OG_IMAGE)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(e.dek.es)}" />`,
    `<meta name="twitter:image" content="${esc(OG_IMAGE)}" />`,
    `<script type="application/ld+json">${ld}</script>`,
  ]
    .map((l) => `    ${l}`)
    .join("\n");
}
