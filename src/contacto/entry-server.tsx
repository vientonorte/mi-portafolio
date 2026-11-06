import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { loadTranslation } from "../lib/i18n/loader";
import { CanonicalContacto } from "./CanonicalContacto";

/** Prerender /contacto/ con el formulario de /#/contacto. El idioma de build es es. */
export async function render(): Promise<string> {
  await loadTranslation("es");
  return renderToString(
    <StrictMode>
      <CanonicalContacto />
    </StrictMode>
  );
}
