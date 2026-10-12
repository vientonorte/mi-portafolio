/**
 * Entorno de los componentes marketing.
 * Placeholders (contenido pendiente de autorización de Rö): APAGADOS en todo build,
 * prod y /qa/ (TL 9-oct, QA de Rö 12:52). Una card con asset pendiente no se muestra
 * y una sección que queda vacía se omite entera. El guard
 * scripts/check-dist-no-placeholders.sh falla si el dist trae texto o marcadores.
 */
export const PLACEHOLDER_MARKER = "pendiente-ro";

/** Constante (no función) para que el minificador elimine el markup de PendingSlot del bundle. */
export const PLACEHOLDERS_ENABLED = false as boolean;

export function placeholdersEnabled(): boolean {
  return PLACEHOLDERS_ENABLED;
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
