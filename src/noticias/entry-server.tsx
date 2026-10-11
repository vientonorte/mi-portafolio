import { renderToString } from "react-dom/server";
import { NoticiasPage } from "./NoticiasPage";

/** Prerender /noticias/ (build) — el cliente hidrata con hydrateRoot. */
export function render(): string {
  return renderToString(<NoticiasPage />);
}
