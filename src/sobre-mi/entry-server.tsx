import { renderToString } from "react-dom/server";
import { SobreMiPublicPage } from "./SobreMiPublicPage";

/** Prerender /sobre-mi/ (build). El cliente hidrata con hydrateRoot. */
export function render(): string {
  return renderToString(<SobreMiPublicPage />);
}
