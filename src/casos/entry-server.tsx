import { renderToString } from "react-dom/server";
import { CasoView } from "./CasoView";
import { renderCasoHead } from "./caso-head";
import { casoRoutes } from "../data/casos";
import { preloadAllTranslations } from "../lib/i18n";

/** Prerender /casos/<slug>/ y /casos/<slug>/<pieza>/. */
export async function render(casoSlug: string, pieceSlug = ""): Promise<string> {
  await preloadAllTranslations();
  return renderToString(<CasoView casoSlug={casoSlug} pieceSlug={pieceSlug} />);
}

export function renderHead(casoSlug: string, pieceSlug = ""): string {
  return renderCasoHead(casoSlug, pieceSlug);
}

export function listRoutes(): { path: string; caso: string; piece: string }[] {
  return casoRoutes();
}
