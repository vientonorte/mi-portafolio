/**
 * SSOT Figma/CDN assets for FO linking.
 * Code wins if vault visor diverges. Not a public catalog. Do not mount CalorVnStrip.
 */
import type { Language } from "../lib/i18n";
import type { UpcomingFigmaLink } from "./upcoming-cases";
import { khuroItem } from "./khuro-portfoliobox";

export type FigmaAssetCategory =
  | "vn"
  | "sura"
  | "transvip"
  | "claro"
  | "valuesite"
  | "khuro"
  | "unlinked";

export type FigmaAssetKind = "design" | "board" | "slides" | "make" | "proto" | "cdn";

export interface FigmaAssetName {
  es: string;
  en: string;
}

export interface FigmaAsset {
  id: string;
  name: FigmaAssetName;
  category: FigmaAssetCategory;
  kind: FigmaAssetKind;
  url: string | null;
  foCaseId: string | null;
  notes: string;
  /** FO PNG/JPG when a real visual exists. Null/omit = metadata URL only. */
  localImage?: string | null;
}

function khuroCdn(id: string): string | null {
  return khuroItem(id)?.image ?? null;
}

/** Known file URLs only. No invented keys. No ?t=. */
export const FIGMA_ASSETS: readonly FigmaAsset[] = [
  {
    id: "calor-vn-skills-dashboard",
    name: { es: "Dashboard 10 Skills", en: "10 Skills dashboard" },
    category: "vn",
    kind: "design",
    url: "https://www.figma.com/design/h5663L39FoCWJ3vup0Qp3d/Dashboard-Viento-Norte---Skills",
    foCaseId: null,
    notes: "experience: Viento Norte; surfaces: docs-vn, vn-agent; Figma export empty/tiny black strips — NO DATO visual; SSOT url metadata only; not-on-public-FO",
    localImage: null,
  },
  {
    id: "calor-vn-skills-competencias",
    name: { es: "Skills · competencias", en: "Skills · competencies" },
    category: "vn",
    kind: "design",
    url: "https://www.figma.com/design/31Krz3o3QKftMZxJLOgakk/Viento-Norte---Skills-Dashboard",
    foCaseId: null,
    notes: "experience: Viento Norte; Figma export empty/tiny black strips — NO DATO visual; SSOT url metadata only; not-on-public-FO",
    localImage: null,
  },
  {
    id: "calor-vn-arquitectura-live",
    name: { es: "VN arquitectura live", en: "VN live architecture" },
    category: "vn",
    kind: "board",
    url: "https://www.figma.com/board/UeFKuIVdcUcHEUw2NG9grC/VN-arquitectura-live",
    foCaseId: null,
    notes: "experience: Viento Norte; surfaces: docs-vn",
  },
  {
    id: "calor-vn-cliente-entregables",
    name: { es: "VN Cliente · entregables", en: "VN Client deliverables" },
    category: "vn",
    kind: "board",
    url: "https://www.figma.com/board/Ihb2NtY0rBWoAJgdEi7TPn/VN-Cliente-entregables",
    foCaseId: null,
    notes: "experience: Viento Norte; surfaces: lead-a11y-vn",
  },
  {
    id: "calor-vn-news-covers",
    name: { es: "News · covers LinkedIn", en: "News · LinkedIn covers" },
    category: "vn",
    kind: "design",
    url: "https://www.figma.com/design/HQvdOouznRM1x4xhCxpR1m/VN-News-LinkedIn-covers",
    foCaseId: null,
    notes: "experience: Viento Norte; also news-editions.json figma.fileUrl; FO covers at /images/news/accesibilidad-transvip.png, /images/news/automatizacion-sura.png, /images/news/privacidad-flujo.png — do not duplicate into vn-assets",
    localImage: "/images/news/accesibilidad-transvip.png",
  },
  {
    id: "calor-vn-campaign-assets-a11y",
    name: { es: "Campaign piloto a11y", en: "Campaign assets · a11y pilot" },
    category: "vn",
    kind: "design",
    url: "https://www.figma.com/design/C2ZgaajABQa3NiFJTnFF45/VN-·-Campaign-assets-·-piloto-a11y",
    foCaseId: null,
    notes: "experience: Viento Norte; surfaces: google-ads-vn; internal ops INDEX (piloto a11y rules), not a public case mockup; not-on-public-FO",
    localImage: null,
  },
  {
    id: "calor-vn-log-visual",
    name: { es: "VN LOG visual", en: "VN visual log" },
    category: "vn",
    kind: "board",
    url: "https://www.figma.com/board/XHlBZYksezyvxKCYAUON92/VN-LOG-visual",
    foCaseId: null,
    notes: "experience: Viento Norte; surfaces: docs-vn",
  },
  {
    id: "calor-vn-design-system-make",
    name: { es: "Design System MAKE", en: "Design System MAKE" },
    category: "vn",
    kind: "make",
    url: "https://www.figma.com/make/OR8iCIpokgaPKjerCyZAKy/Rodrigo-Gaete---Desing-System",
    foCaseId: null,
    notes: "experience: Viento Norte; Figma filename keeps Desing",
  },
  {
    id: "calor-vn-map-module-make",
    name: { es: "Map Module MAKE", en: "Downloadable Map Module" },
    category: "vn",
    kind: "make",
    url: "https://www.figma.com/make/GkKsVobp04RD2rjGPJN7tv/Downloadable-Map-Module",
    foCaseId: null,
    notes: "experience: Viento Norte",
  },
  {
    id: "vn-xcms-make",
    name: { es: "X|CMS MAKE", en: "X|CMS MAKE" },
    category: "vn",
    kind: "make",
    url: "https://www.figma.com/make/nHrKYiEtbE0gYnTFB4Ast6/X-%7C-CMS",
    foCaseId: null,
    notes: "experience: Viento Norte; demo /demo/x-cms exists, not a ProjectDetail case",
  },
  {
    id: "vn-portafolio-board",
    name: { es: "PORTAFOLIO", en: "PORTAFOLIO" },
    category: "vn",
    kind: "board",
    url: "https://www.figma.com/board/lEGDG3EDlNI3OOUCucTyyx/PORTAFOLIO",
    foCaseId: null,
    notes: "experience: Viento Norte",
  },
  {
    id: "calor-vn-escenarios-demanda-sura",
    name: {
      es: "Dashboard Escenarios Demanda",
      en: "SURA demand scenarios dashboard",
    },
    category: "sura",
    kind: "design",
    url: "https://www.figma.com/design/s5lLcHkNalH6p3LKCop7wT/Dashboard-Escenarios-Demanda-SURA---Viento-Norte",
    foCaseId: "sura-inversiones-dashboard",
    notes: "FO /proyecto/sura-inversiones-dashboard; labor-claim financial scenario cards (montos demanda/honorarios), NOT SURA Investments dashboard — not-on-public-FO; do not publish local PNG",
    localImage: null,
  },
  {
    id: "sura-ria-proto",
    name: { es: "RIA", en: "RIA" },
    category: "sura",
    kind: "proto",
    url: "https://www.figma.com/proto/MOhbYMwUtCSZ8IuJxG41ho/RIA",
    foCaseId: "sura-ria-us",
    notes: "FO /proyecto/sura-ria-us; also RIA_US_PROTO_URL constant",
  },
  {
    id: "sura-slides-colombia",
    name: { es: "Tutoría SURA Colombia", en: "SURA Colombia tutorial slides" },
    category: "sura",
    kind: "slides",
    url: "https://www.figma.com/slides/xxKiHNAOPDpxmfuqyE7N72/PPT-TUTORIA-SURA-ASESOR-COLOMBIA",
    foCaseId: "sura-ux-enterprise",
    notes: "already figmaEmbed; do not duplicate as figmaLinks",
  },
  {
    id: "transvip-system-design-app",
    name: { es: "System Design APP", en: "System Design APP" },
    category: "transvip",
    kind: "design",
    url: "https://www.figma.com/design/AEMOE8Hv5iv1nfyR7jlMgO/System-Design-APP-Cliente---Transvip",
    foCaseId: "transvip-app-premium",
    notes: "FO /proyecto/transvip-app-premium; also TRANSVIP_APP_FIGMA_URL; FO image /images/vn-assets/transvip-system-design.png",
    localImage: "/images/vn-assets/transvip-system-design.png",
  },
  {
    id: "transvip-proto-app",
    name: { es: "Proto APP", en: "App prototype" },
    category: "transvip",
    kind: "proto",
    url: "https://www.figma.com/proto/sRPhPaZNBewEhLVwu07TFu",
    foCaseId: "transvip-app-premium",
    notes: "FO /proyecto/transvip-app-premium",
  },
  {
    id: "claro-tienda-2021",
    name: { es: "Tienda Claro 2021", en: "Claro Store 2021" },
    category: "claro",
    kind: "design",
    url: "https://www.figma.com/design/lrMqvUERZjDwTwZpQRBSC5/Tienda-Claro-2021",
    foCaseId: "havas-claro",
    notes: "upcoming havas-claro; FO image /images/vn-assets/claro-tienda-comparar.png",
    localImage: "/images/vn-assets/claro-tienda-comparar.png",
  },
  {
    id: "claro-portal-comercial",
    name: { es: "Portal Comercial Claro", en: "Claro Commercial Portal" },
    category: "claro",
    kind: "design",
    url: "https://www.figma.com/design/D39xjsA7ObbhntcDEyPWQG/Portal-Comercial-Claro",
    foCaseId: "havas-claro",
    notes: "upcoming havas-claro; FO image /images/vn-assets/claro-portal-carrito.png; extra mobile /images/vn-assets/claro-portal-mobile.jpg",
    localImage: "/images/vn-assets/claro-portal-carrito.png",
  },
  {
    id: "valuesite-avem-proto",
    name: { es: "AVEM Prototipo Landing Page", en: "AVEM landing prototype" },
    category: "valuesite",
    kind: "proto",
    url: "https://www.figma.com/proto/xqCj0eIocn9cG6pbPKu6Vy/AVEM-Prototipo-Landing-Page",
    foCaseId: null,
    notes: "experience: Valuesite Ltda; no FO case; Figma search empty = NO DATO visual; not-on-public-FO",
    localImage: null,
  },
  {
    id: "khuro-pareti",
    name: { es: "Pareti · cover Khuro", en: "Pareti · Khuro cover" },
    category: "khuro",
    kind: "cdn",
    url: khuroCdn("pareti"),
    foCaseId: "pareti",
    notes: "CDN khuro-portfoliobox; not Figma",
  },
  {
    id: "khuro-numeros-no-existen",
    name: { es: "Los Números No Existen · cover", en: "Los Números No Existen · cover" },
    category: "khuro",
    kind: "cdn",
    url: khuroCdn("numeros-no-existen"),
    foCaseId: "numeros-no-existen",
    notes: "CDN khuro-portfoliobox; not Figma",
  },
  {
    id: "khuro-sushi-del-mar",
    name: { es: "Sushi del Mar · cover", en: "Sushi del Mar · cover" },
    category: "khuro",
    kind: "cdn",
    url: khuroCdn("sushi-del-mar"),
    foCaseId: "sushi-del-mar",
    notes: "CDN khuro-portfoliobox; not Figma",
  },
  {
    id: "khuro-traduccion-saberes",
    name: { es: "Traducción de Saberes · cover", en: "Traducción de Saberes · cover" },
    category: "khuro",
    kind: "cdn",
    url: khuroCdn("traduccion-saberes"),
    foCaseId: "traduccion-saberes",
    notes: "CDN khuro-portfoliobox; not Figma",
  },
  {
    id: "khuro-darandar",
    name: { es: "Darandar · cover", en: "Darandar · cover" },
    category: "khuro",
    kind: "cdn",
    url: khuroCdn("darandar"),
    foCaseId: "darandar",
    notes: "CDN khuro-portfoliobox; not Figma",
  },
  {
    id: "khuro-artistas-resistencia",
    name: { es: "Artistas en Resistencia · cover", en: "Artistas en Resistencia · cover" },
    category: "khuro",
    kind: "cdn",
    url: khuroCdn("artistas-resistencia"),
    foCaseId: "artistas-resistencia",
    notes: "CDN khuro-portfoliobox; not Figma",
  },
  {
    id: "unlinked-vn-redeseno-landing",
    name: {
      es: "VIENTO NORTE REDISEÑO LANDING",
      en: "VIENTO NORTE landing redesign",
    },
    category: "unlinked",
    kind: "design",
    url: null,
    foCaseId: null,
    notes: "NO DATO url",
  },
  {
    id: "unlinked-vn-campanas-sem",
    name: { es: "CAMPAÑAS SEM · VIENTO NORTE", en: "SEM campaigns · Viento Norte" },
    category: "unlinked",
    kind: "design",
    url: null,
    foCaseId: null,
    notes: "NO DATO url; inventory spelling CAMPAÑAS SEM} - VIENTO NRTE",
  },
  {
    id: "unlinked-sura-libreria-estilos",
    name: { es: "Librería de estilos globales", en: "Global style library" },
    category: "unlinked",
    kind: "design",
    url: null,
    foCaseId: null,
    notes: "NO DATO url",
  },
  {
    id: "unlinked-havas-en-figma",
    name: { es: "Havas en Figma", en: "Havas in Figma" },
    category: "unlinked",
    kind: "design",
    url: null,
    foCaseId: null,
    notes: "NO DATO url",
  },
  {
    id: "unlinked-avex-kit-ui",
    name: { es: "Kit UI Sprint 13 AVEX", en: "AVEX UI kit Sprint 13" },
    category: "unlinked",
    kind: "design",
    url: null,
    foCaseId: null,
    notes: "NO DATO url",
  },
  {
    id: "unlinked-valuesite-team-library",
    name: { es: "Valuesite team library", en: "Valuesite team library" },
    category: "unlinked",
    kind: "design",
    url: null,
    foCaseId: null,
    notes: "NO DATO url",
  },
  {
    id: "skip-untitled",
    name: { es: "Untitled", en: "Untitled" },
    category: "unlinked",
    kind: "design",
    url: null,
    foCaseId: null,
    notes: "skip",
  },
  {
    id: "skip-community-kits",
    name: { es: "Community kits", en: "Community kits" },
    category: "unlinked",
    kind: "design",
    url: null,
    foCaseId: null,
    notes: "skip",
  },
  {
    id: "skip-polijuego",
    name: { es: "polijuego", en: "polijuego" },
    category: "unlinked",
    kind: "design",
    url: null,
    foCaseId: null,
    notes: "skip; filename only, not a product",
  },
  {
    id: "skip-gaviota",
    name: { es: "gaviota", en: "gaviota" },
    category: "unlinked",
    kind: "design",
    url: null,
    foCaseId: null,
    notes: "skip",
  },
  {
    id: "skip-claro-prueba-conceptos",
    name: { es: "Prueba de Conceptos", en: "Proof of concepts file" },
    category: "unlinked",
    kind: "design",
    url: null,
    foCaseId: null,
    notes: "skip; file key CBguM4Y5rIvc9TV5pGhOxL; MASCOTAPP pages, not Claro",
  },
];

const EMBED_ONLY = /already figmaEmbed/i;
const SKIP = /\bskip\b/i;

export function isFigmaLinkOut(asset: FigmaAsset): boolean {
  if (!asset.url) return false;
  if (asset.kind === "cdn") return false;
  if (asset.category === "unlinked") return false;
  if (SKIP.test(asset.notes)) return false;
  if (EMBED_ONLY.test(asset.notes)) return false;
  return true;
}

export function figmaLinksForCase(
  foCaseId: string,
  language: Language = "es"
): UpcomingFigmaLink[] {
  return FIGMA_ASSETS.filter(
    (asset) => asset.foCaseId === foCaseId && isFigmaLinkOut(asset)
  ).map((asset) => ({
    label: asset.name[language],
    url: asset.url as string,
  }));
}

export function figmaLinksForExperience(
  company: string,
  language: Language = "es"
): UpcomingFigmaLink[] {
  const needle = company.toLowerCase();
  let category: FigmaAssetCategory | null = null;
  if (needle.includes("viento norte")) category = "vn";
  else if (needle.includes("valuesite")) category = "valuesite";
  if (!category) return [];

  return FIGMA_ASSETS.filter(
    (asset) =>
      asset.category === category &&
      asset.foCaseId === null &&
      isFigmaLinkOut(asset)
  ).map((asset) => ({
    label: asset.name[language],
    url: asset.url as string,
  }));
}

export function foPathForAsset(asset: FigmaAsset): string {
  if (asset.foCaseId === "havas-claro") return "/#/proyectos · upcoming havas-claro";
  if (asset.foCaseId) return `/proyecto/${asset.foCaseId}`;
  if (asset.notes.includes("experience: Viento Norte")) return "experience: Viento Norte";
  if (asset.notes.includes("experience: Valuesite")) return "experience: Valuesite Ltda";
  if (SKIP.test(asset.notes)) return "skip";
  return "—";
}

export const FIGMA_CALOR_LEGACY_IDS = [
  "calor-vn-skills-dashboard",
  "calor-vn-skills-competencias",
  "calor-vn-arquitectura-live",
  "calor-vn-cliente-entregables",
  "calor-vn-news-covers",
  "calor-vn-campaign-assets-a11y",
  "calor-vn-log-visual",
  "calor-vn-escenarios-demanda-sura",
  "calor-vn-design-system-make",
  "calor-vn-map-module-make",
] as const;
