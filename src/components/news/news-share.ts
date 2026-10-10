import type { NewsEdition } from "../../data/news-editions";
import { newsShareUrl } from "../../data/news-editions";
import type { Language } from "../../lib/i18n/types";

export type ShareNetwork = "linkedin" | "instagram" | "whatsapp" | "x";

/** Ficha pública del post. UTM en la query, ancla después. Nunca la ruta de la nota. */
export function newsSocialLanding(topic: string, source: ShareNetwork): string {
  const content =
    topic === "accesibilidad" ? "a11y" : topic === "privacidad" ? "ley21719" : "automatizacion";
  const base = `https://vientonorte.io/servicios/?utm_source=${source}&utm_medium=organic&utm_campaign=news_seo&utm_content=${content}`;
  if (topic === "automatizacion") return base;
  return `${base}#revision-gratis`;
}

function canonPost(body: string, landing: string): string {
  const prose = body.replace(/\n*CTA:\s*\S+\s*$/i, "").trim();
  return `${prose}\n\n${landing}`;
}

export function newsSharePack(edition: NewsEdition, language: Language) {
  const es = language === "es";
  const title = edition.title[language];
  const dek = edition.dek[language];
  const tags = edition.hashtags.join(" ");
  const articleUrl = newsShareUrl(edition.slug);
  const linkedinLanding = newsSocialLanding(edition.topic, "linkedin");
  const linkedinText = `${canonPost(edition.linkedinBody, linkedinLanding)}\n\n${tags}`;
  const instagramText = [
    title,
    "",
    dek,
    "",
    es ? "Enlace en la bio: vientonorte.io/servicios" : "Link in bio: vientonorte.io/servicios",
    "",
    tags,
  ].join("\n");
  const whatsappText = `${title}\n${dek}\n\n${articleUrl}`;
  const xText = title.length > 180 ? `${title.slice(0, 177)}…` : title;

  return {
    articleUrl,
    linkedinText,
    instagramText,
    linkedinHref: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(linkedinLanding)}`,
    whatsappHref: `https://wa.me/?text=${encodeURIComponent(whatsappText)}`,
    xHref: `https://twitter.com/intent/tweet?text=${encodeURIComponent(xText)}&url=${encodeURIComponent(articleUrl)}`,
  };
}

export async function copyShareText(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}
