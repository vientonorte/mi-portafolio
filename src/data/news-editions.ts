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
    path: "/servicios/seguridad-privacidad-digital/",
    label: {
      es: "Privacidad de datos · Ley 21.719",
      en: "Data privacy · Law 21.719",
    },
  },
};

export function newsTopicLanding(topic: string) {
  return NEWS_TOPIC_LANDING[topic as NewsTopic];
}
