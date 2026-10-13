import type { Language } from "../lib/i18n";
import { CONSULTORIA_DEMO_X_CMS } from "./consultoria-demos";
import { FIGMA_ASSETS } from "./figma-assets-ssot";
import {
  RIA_US_PROTO_URL,
  TRANSVIP_APP_PROTO_URL,
  VALUESITE_AVEM_PROTO_URL,
} from "./value-content-arsenal";

/** Prototipos navegables para /sobre-mi/. Solo URLs ya presentes en el repo (SSOT Figma / arsenal). */
export type NavigablePrototype = {
  id: string;
  client: string;
  title: Record<Language, string>;
  kind: "proto" | "site" | "file";
  url: string;
};

function ssotUrl(id: string): string {
  const url = FIGMA_ASSETS.find((a) => a.id === id)?.url;
  if (!url) throw new Error(`figma-assets-ssot sin url para ${id}`);
  return url;
}

export const NAVIGABLE_PROTOTYPES: readonly NavigablePrototype[] = [
  { id: "sura-ria", client: "SURA Investments", kind: "proto", url: RIA_US_PROTO_URL,
    title: { es: "RIA US · onboarding multi-país", en: "RIA US · multi-country onboarding" } },
  { id: "transvip-app", client: "Transvip", kind: "proto", url: TRANSVIP_APP_PROTO_URL,
    title: { es: "App Cliente · prototipo", en: "Customer app · prototype" } },
  { id: "claro-tienda", client: "Claro Chile · Havas", kind: "file", url: ssotUrl("claro-tienda-2021"),
    title: { es: "Tienda Claro 2021", en: "Claro Store 2021" } },
  { id: "claro-portal", client: "Claro Chile · Havas", kind: "file", url: ssotUrl("claro-portal-comercial"),
    title: { es: "Portal Comercial Claro", en: "Claro Commercial Portal" } },
  { id: "valuesite-avem", client: "Valuesite · AVEM", kind: "proto", url: VALUESITE_AVEM_PROTO_URL,
    title: { es: "Landing AVEM · prototipo", en: "AVEM landing · prototype" } },
  { id: "sura-dei-poc", client: "SURA Investments", kind: "site", url: "https://badge-sweet-21070688.figma.site",
    title: { es: "POC dashboard IA / DEI", en: "AI / DEI dashboard POC" } },
  { id: "vn-xcms", client: "Viento Norte", kind: "site", url: CONSULTORIA_DEMO_X_CMS.figmaSitesUrl ?? "",
    title: { es: "X | CMS · demo navegable", en: "X | CMS · live demo" } },
].filter((p) => p.url.startsWith("https://"));
