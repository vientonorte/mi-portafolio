import type { Language } from "../lib/i18n";
import { FIGMA_ASSETS } from "./figma-assets-ssot";
import {
  RIA_US_PROTO_URL,
  VALUESITE_AVEM_PROTO_URL,
} from "./value-content-arsenal";

/** Prototipos navegables para /sobre-mi/. Solo URLs ya presentes en el repo (SSOT Figma / arsenal). */
export type NavigablePrototype = {
  id: string;
  client: string;
  title: Record<Language, string>;
  kind: "proto" | "file";
  url: string;
};

function ssotUrl(id: string): string {
  const url = FIGMA_ASSETS.find((a) => a.id === id)?.url;
  if (!url) throw new Error(`figma-assets-ssot sin url para ${id}`);
  return url;
}

const ALL_PROTOTYPES: NavigablePrototype[] = [
  { id: "sura-ria", client: "SURA Investments", kind: "proto", url: RIA_US_PROTO_URL,
    title: { es: "RIA US · onboarding multi-país", en: "RIA US · multi-country onboarding" } },
  { id: "claro-tienda", client: "Claro Chile · Havas", kind: "file", url: ssotUrl("claro-tienda-2021"),
    title: { es: "Tienda Claro 2021 · discovery de filtros de producto (móvil)", en: "Claro Store 2021 · product-filter discovery (mobile)" } },
  { id: "claro-portal", client: "Claro Chile · Havas", kind: "file", url: ssotUrl("claro-portal-comercial"),
    title: { es: "Portal Comercial · discovery de filtros de producto", en: "Commercial Portal · product-filter discovery" } },
  { id: "valuesite-avem", client: "Valuesite · AVEM", kind: "proto", url: VALUESITE_AVEM_PROTO_URL,
    title: { es: "Landing AVEM · prototipo", en: "AVEM landing · prototype" } },
];

export const NAVIGABLE_PROTOTYPES: readonly NavigablePrototype[] = ALL_PROTOTYPES.filter((p) =>
  p.url.startsWith("https://"),
);
