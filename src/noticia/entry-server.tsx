import { renderToString } from "react-dom/server";
import { NoticiaPage } from "./NoticiaPage";
import { renderNoticiaHead } from "./noticia-head";
import { NEWS_CATALOG } from "../data/news-editions";

/** Slugs de las ediciones existentes (src/data/news-editions.json). */
export const NOTICIA_SLUGS: string[] = NEWS_CATALOG.editions.map((e) => e.slug);

/** Prerender /noticias/<slug>/ (build) — el cliente hidrata con hydrateRoot. */
export function render(slug: string): string {
  return renderToString(<NoticiaPage slug={slug} />);
}

export function renderHead(slug: string): string {
  return renderNoticiaHead(slug);
}
