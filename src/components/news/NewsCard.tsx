import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import type { NewsEdition } from "../../data/news-editions";
import type { Language } from "../../lib/i18n/types";
import { ROUTES } from "../../lib/routes";
import { assetUrl } from "../marketing";
import { NewsCategoryPill } from "./NewsCategoryPill";
import { formatEditionMonth, readingMinutes } from "./news-format";

const TOPIC_LABEL = {
  accesibilidad: { es: "Accesibilidad", en: "Accessibility" },
  automatizacion: { es: "Automatización", en: "Automation" },
  privacidad: { es: "Privacidad", en: "Privacy" },
} as const;

type TopicKey = keyof typeof TOPIC_LABEL;

/**
 * Visual de la card. Sale del SSOT público (figma-assets-ssot + casos FO).
 * Las portadas LinkedIn (HQvdOouznRM1x4xhCxpR1m) siguen solo en el vault:
 * public/images/news no existe.
 */
const CARD_VISUAL: Record<
  TopicKey,
  { src: string; width: number; height: number; fit: "cover" | "contain"; alt: { es: string; en: string } }
> = {
  accesibilidad: {
    src: "/images/vn-assets/transvip-system-design.png",
    width: 2432,
    height: 1494,
    fit: "cover",
    alt: {
      es: "Principios y propósito del sistema de diseño de la app Transvip",
      en: "Principles and purpose of the Transvip app design system",
    },
  },
  automatizacion: {
    src: "/images/sura/ia-automation-dashboard.png",
    width: 1440,
    height: 900,
    fit: "cover",
    alt: {
      es: "Dashboard para cargar y analizar un documento de inversión",
      en: "Dashboard to upload and analyze an investment document",
    },
  },
  privacidad: {
    src: "/images/seo/ley-21719-flujo.svg",
    width: 1200,
    height: 630,
    fit: "contain",
    alt: {
      es: "Ley 21.719 en el flujo: qué dato, para qué, cuánto tiempo y decir que no",
      en: "Law 21.719 in the flow: which data, why, how long, and how to refuse",
    },
  },
};

export function newsTopicLabel(topic: string, language: Language): string {
  const row = TOPIC_LABEL[topic as TopicKey];
  return row ? row[language] : topic;
}

/**
 * Card de noticia de SURA Investments (sala de prensa):
 * foto o banner, categoría, fecha, minutos, título, bajada, «Leer la noticia».
 */
export function NewsCard({
  edition,
  language,
  heading = "h2",
}: {
  edition: NewsEdition;
  language: Language;
  heading?: "h2" | "h3";
}) {
  const es = language === "es";
  const Title = heading;
  const minutes = readingMinutes(edition.paragraphs[language]);
  const month = formatEditionMonth(edition.month, language);
  const visual = CARD_VISUAL[edition.topic as TopicKey];

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-foreground/30">
      <Link
        to={ROUTES.newsEdition(edition.slug)}
        className="flex flex-col text-inherit no-underline outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="relative aspect-video overflow-hidden bg-muted">
          {visual ? (
            <img
              src={assetUrl(visual.src)}
              alt={visual.alt[language]}
              width={visual.width}
              height={visual.height}
              className={
                visual.fit === "contain"
                  ? "absolute inset-0 size-full object-contain"
                  : "absolute inset-0 size-full object-cover object-top"
              }
            />
          ) : null}
          <div className="absolute bottom-4 left-4">
            <NewsCategoryPill>{newsTopicLabel(edition.topic, language)}</NewsCategoryPill>
          </div>
        </div>
        <div className="h-0.5 bg-foreground" aria-hidden="true" />
        <div className="flex flex-col gap-3 p-5">
          <p className="m-0 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <time dateTime={edition.month}>{month}</time>
            <span aria-hidden="true">|</span>
            <Clock className="size-3.5" aria-hidden="true" />
            <span>
              {es ? `${minutes} min de lectura` : `${minutes} min read`}
            </span>
          </p>
          <Title className="m-0 text-xl font-semibold tracking-tight text-foreground">
            {edition.title[language]}
          </Title>
          <p className="m-0 text-sm leading-relaxed text-muted-foreground">
            {edition.dek[language]}
          </p>
          <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
            {es ? "Leer la noticia" : "Read the article"}
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
