/**
 * Entorno de los componentes marketing.
 * Placeholders (contenido pendiente de autorización de Rö) solo en el build QA (base "/qa/").
 */
export const PLACEHOLDER_MARKER = "pendiente-ro";

export function placeholdersEnabled(): boolean {
  return import.meta.env.BASE_URL === "/qa/";
}

/** URL de un asset de public/ respetando la base de Vite ("/" o "/qa/"). */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${path.replace(/^\//, "")}`;
}
