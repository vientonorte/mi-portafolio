import { renderToString } from "react-dom/server";
import { NosotrosPage } from "./NosotrosPage";

/** Prerender /nosotros/ (build) — el cliente hidrata con hydrateRoot. */
export function render(): string {
  return renderToString(<NosotrosPage />);
}
