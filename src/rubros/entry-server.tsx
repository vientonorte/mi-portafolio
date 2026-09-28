import { renderToString } from "react-dom/server";
import { RubroPage } from "./RubroPage";
import { renderRubroHead } from "./rubro-head";

/** Prerender /servicios/<slug>/ (build) — el cliente hidrata con hydrateRoot. */
export function render(slug: string): string {
  return renderToString(<RubroPage slug={slug} />);
}

export function renderHead(slug: string): string {
  return renderRubroHead(slug);
}
