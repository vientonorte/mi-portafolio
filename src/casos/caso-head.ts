/**
 * <head> por caso y por pieza. Lo inyecta scripts/prerender-servicios.mjs.
 * Una pieza con marcador TODO sale noindex y queda fuera del sitemap.
 * El build QA (/qa/) además fuerza noindex en deploy-qa.yml.
 */
import { casoPath, getCaso, getPiece, piecePublishesTodo, piezaPath, type Caso, type CasoPiece } from "../data/casos";

const ORIGIN = "https://vientonorte.io";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function pageMeta(casoSlug: string, pieceSlug: string): { title: string; description: string; path: string; image: string; alt: string; width: number; height: number } {
  const caso = getCaso(casoSlug);
  if (!pieceSlug) {
    const image = caso.pieces[0]?.slides[0];
    return {
      title: `${caso.title} · Viento Norte`,
      description: caso.summary,
      path: casoPath(caso.slug),
      image: image ? `${ORIGIN}/${image.src}` : `${ORIGIN}/images/branding/og-home-1200.png`,
      alt: image?.alt ?? caso.title,
      width: image?.width ?? 1200,
      height: image?.height ?? 630,
    };
  }
  const { piece } = getPiece(casoSlug, pieceSlug);
  const image = piece.slides[0];
  return {
    title: `${piece.title} · ${caso.clientLabel} · Viento Norte`,
    description: piece.context,
    path: piezaPath(caso.slug, piece.slug),
    image: `${ORIGIN}/${image.src}`,
    alt: image.alt,
    width: image.width,
    height: image.height,
  };
}

export function renderCasoHead(casoSlug: string, pieceSlug = ""): string {
  const meta = pageMeta(casoSlug, pieceSlug);
  const url = `${ORIGIN}${meta.path}`;
  const robots = pieceSlug && piecePublishesTodo(getPiece(casoSlug, pieceSlug).piece)
    ? "noindex"
    : "index, follow";
  const ld = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title.replace(/ · Viento Norte$/, ""),
    description: meta.description,
    image: meta.image,
    url,
    author: { "@type": "Person", name: "Rodrigo Gaete" },
    publisher: { "@type": "Organization", name: "Viento Norte", url: `${ORIGIN}/` },
  }).replace(/</g, "\\u003c");
  return [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:site_name" content="Viento Norte" />`,
    `<meta property="og:locale" content="es_CL" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:image" content="${esc(meta.image)}" />`,
    `<meta property="og:image:width" content="${meta.width}" />`,
    `<meta property="og:image:height" content="${meta.height}" />`,
    `<meta property="og:image:alt" content="${esc(meta.alt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${esc(meta.image)}" />`,
    `<script type="application/ld+json">${ld}</script>`,
  ]
    .map((line) => `    ${line}`)
    .join("\n");
}

export type { Caso, CasoPiece };
