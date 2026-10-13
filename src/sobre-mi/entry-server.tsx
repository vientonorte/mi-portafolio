import { renderToString } from "react-dom/server";
import { SobreMiPage } from "./SobreMiPage";

/** Prerender /sobre-mi/ (build) — el cliente hidrata con hydrateRoot. */
export function render(): string {
  return renderToString(<SobreMiPage />);
}
