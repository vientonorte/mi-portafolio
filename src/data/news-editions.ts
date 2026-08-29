import catalog from "./news-editions.json";

export type NewsTopic = "accesibilidad" | "automatizacion" | "privacidad";

export type NewsEdition = (typeof catalog.editions)[number];

export const NEWS_CATALOG = catalog;

export function newsEditionBySlug(slug: string): NewsEdition | undefined {
  return catalog.editions.find((e) => e.slug === slug);
}

export function newsCanonical(slug?: string): string {
  const base = catalog.canonicalIndex.replace(/\/+$/, "");
  return slug ? `${base}/${slug}/` : `${catalog.canonicalIndex}`;
}

export function newsUtm(slug: string): string {
  return `${newsCanonical(slug)}?utm_source=linkedin&utm_medium=organic&utm_campaign=news_seo&utm_content=${encodeURIComponent(slug)}`;
}
