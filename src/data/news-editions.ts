import catalog from "./news-editions.json";

export type NewsTopic = "accesibilidad" | "automatizacion" | "privacidad";

export type NewsEdition = (typeof catalog.editions)[number];

export const NEWS_CATALOG = catalog;

export function newsEditionBySlug(slug: string): NewsEdition | undefined {
  return catalog.editions.find((e) => e.slug === slug);
}

/**
 * Canonical de News. Canon 2026-09-27: /#/news/ es ruta hash (no indexable) →
 * índice y ediciones canonicalizan a la home. Nunca devuelve una URL con '#'.
 */
export function newsCanonical(slug?: string): string {
  void slug;
  return catalog.canonicalIndex;
}

/** Enlace SPA a una edición (/#/news/<slug>/). Es un enlace para compartir, no un canonical. */
export function newsShareUrl(slug: string): string {
  return `${catalog.spaIndex.replace(/\/+$/, "")}/${slug}/`;
}

export function newsUtm(slug: string): string {
  return `${newsShareUrl(slug)}?utm_source=linkedin&utm_medium=organic&utm_campaign=news_seo&utm_content=${encodeURIComponent(slug)}`;
}

/** Cada news lleva a la ficha HTTP de especialidad (no /s/, no el embudo genérico). */
export const NEWS_TOPIC_LANDING: Record<
  NewsTopic,
  { path: string; label: { es: string; en: string } }
> = {
  accesibilidad: {
    path: "/servicios/diagnostico-accesibilidad-wcag/",
    label: {
      es: "Diagnóstico de accesibilidad WCAG",
      en: "WCAG accessibility diagnostic",
    },
  },
  automatizacion: {
    path: "/servicios/inteligencia-artificial-negocios/",
    label: {
      es: "Inteligencia artificial aplicada a negocios",
      en: "AI applied to business",
    },
  },
  privacidad: {
    path: "/servicios/#revision-gratis",
    label: {
      es: "Privacidad de datos · Ley 21.719",
      en: "Data privacy · Law 21.719",
    },
  },
};

export function newsTopicLanding(topic: string) {
  return NEWS_TOPIC_LANDING[topic as NewsTopic];
}
