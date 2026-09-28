import { renderToString } from "react-dom/server";
import { ServiciosPage } from "./ServiciosPage";

/** Prerender /servicios/ (build) — el cliente hidrata con hydrateRoot. */
export function render(): string {
  return renderToString(<ServiciosPage />);
}
