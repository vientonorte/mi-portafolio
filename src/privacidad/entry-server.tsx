import { renderToString } from "react-dom/server";
import { PrivacidadPage } from "./PrivacidadPage";

/** Prerender /privacidad/ (build) — el cliente hidrata con hydrateRoot. */
export function render(): string {
  return renderToString(<PrivacidadPage />);
}
