import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { loadTranslation } from "../lib/i18n/loader";
import { CanonicalSobreMi } from "./CanonicalSobreMi";

/** Prerender /sobre-mi/ con la ficha de /#/sobre-mi. El idioma de build es es. */
export async function render(): Promise<string> {
  await loadTranslation("es");
  return renderToString(
    <StrictMode>
      <CanonicalSobreMi />
    </StrictMode>
  );
}
