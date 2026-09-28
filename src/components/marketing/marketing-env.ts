/**
 * Entorno de los componentes marketing.
 * Placeholders (contenido pendiente de autorización de Rö) solo en el build QA (base "/qa/").
 */
export const PLACEHOLDER_MARKER = "pendiente-ro";

export function placeholdersEnabled(): boolean {
  return import.meta.env.BASE_URL === "/qa/";
}

/**
 * Escala única de títulos de sección en la home y en /servicios/
 * (h2 Chillax del tema: 2xl → 3xl). El hero vive solo en HeroWithMockup.
 */
export const SECTION_TITLE_CLASS = "text-2xl font-bold tracking-tight text-foreground sm:text-3xl";

/** URL de un asset de public/ respetando la base de Vite ("/" o "/qa/"). */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${path.replace(/^\//, "")}`;
}
