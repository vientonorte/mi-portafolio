import type { Language } from "../lib/i18n";

/**
 * Prototipos navegables para /sobre-mi/.
 * Los archivos y prototipos Figma de clientes no se publican: la lista queda vacía.
 */
export type NavigablePrototype = {
  id: string;
  client: string;
  title: Record<Language, string>;
  kind: "proto" | "file";
  url: string;
};

export const NAVIGABLE_PROTOTYPES: readonly NavigablePrototype[] = [];
