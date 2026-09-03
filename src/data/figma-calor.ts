/** DEPRECATED 2026-09-02: public Calor VN strip hallucinated; not heatmap. Do not mount.
 *  URLs live in figma-assets-ssot.ts. This file re-exports a legacy view for unmounted UI.
 */
import type { FigmaEmbedCopy } from "./figma-embeds";
import {
  FIGMA_ASSETS,
  FIGMA_CALOR_LEGACY_IDS,
  type FigmaAsset,
} from "./figma-assets-ssot";

export type FigmaCalorKind = "board" | "slides" | "design" | "make";

export interface FigmaCalorItem {
  id: string;
  kind: FigmaCalorKind;
  shareUrl: string;
  /** Superficies FO internas (no son rutas públicas). */
  surfaces?: readonly string[];
  copy: Record<"es" | "en", FigmaEmbedCopy>;
}

export const FIGMA_CALOR_STRIP_COPY = {
  es: {
    badge: "Calor VN",
    title: "Craft VN en Figma",
    description:
      "Archivos Viento Norte en trabajo reciente. Se abren en Figma — los drafts privados no se embeben.",
  },
  en: {
    badge: "Calor VN",
    title: "VN craft in Figma",
    description:
      "Recent Viento Norte files. They open in Figma — private drafts are not embedded.",
  },
} as const;

export function figmaCalorKindLabel(
  kind: FigmaCalorKind,
  language: "es" | "en"
): string {
  if (kind === "board") return "FigJam";
  if (kind === "slides") return "Figma Slides";
  if (kind === "make") return "Figma Make";
  void language;
  return "Figma Design";
}

const OPEN_FIGMA = {
  es: "Abrir en Figma",
  en: "Open in Figma",
} as const;

const OPEN_FIGJAM = {
  es: "Abrir FigJam en nueva pestaña",
  en: "Open FigJam in a new tab",
} as const;

const OPEN_MAKE = {
  es: "Abrir Figma Make",
  en: "Open Figma Make",
} as const;

function surfacesFromNotes(notes: string): readonly string[] | undefined {
  const match = notes.match(/surfaces:\s*([^;]+)/);
  if (!match) return undefined;
  const list = match[1]
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  return list.length ? list : undefined;
}

function openLabel(kind: FigmaCalorKind, language: "es" | "en"): string {
  if (kind === "board") return OPEN_FIGJAM[language];
  if (kind === "make") return OPEN_MAKE[language];
  return OPEN_FIGMA[language];
}

function toCalorItem(asset: FigmaAsset): FigmaCalorItem {
  const kind = asset.kind as FigmaCalorKind;
  const url = asset.url ?? "";
  return {
    id: asset.id,
    kind,
    shareUrl: url,
    surfaces: surfacesFromNotes(asset.notes),
    copy: {
      es: {
        title: asset.name.es,
        subtitle: asset.notes.split(";")[0]?.trim() ?? asset.name.es,
        embedTitle: `${figmaCalorKindLabel(kind, "es")} — ${asset.name.es}`,
        embedDescription: `${asset.name.es}. Ábrelo en Figma; el draft no se embebe.`,
        openLabel: openLabel(kind, "es"),
      },
      en: {
        title: asset.name.en,
        subtitle: asset.notes.split(";")[0]?.trim() ?? asset.name.en,
        embedTitle: `${figmaCalorKindLabel(kind, "en")} — ${asset.name.en}`,
        embedDescription: `${asset.name.en}. Open it in Figma; the draft is not embedded.`,
        openLabel: openLabel(kind, "en"),
      },
    },
  };
}

function assetById(id: string): FigmaAsset {
  const found = FIGMA_ASSETS.find((item) => item.id === id);
  if (!found) {
    throw new Error(`figma-calor re-export missing SSOT id: ${id}`);
  }
  return found;
}

/** @deprecated Use FIGMA_ASSETS from figma-assets-ssot */
export const CALOR_VN_SKILLS_DASHBOARD = toCalorItem(
  assetById("calor-vn-skills-dashboard")
);
/** @deprecated Use FIGMA_ASSETS from figma-assets-ssot */
export const CALOR_VN_SKILLS_COMPETENCIAS = toCalorItem(
  assetById("calor-vn-skills-competencias")
);
/** @deprecated Use FIGMA_ASSETS from figma-assets-ssot */
export const CALOR_VN_ARQUITECTURA_LIVE = toCalorItem(
  assetById("calor-vn-arquitectura-live")
);
/** @deprecated Use FIGMA_ASSETS from figma-assets-ssot */
export const CALOR_VN_CLIENTE_ENTREGABLES = toCalorItem(
  assetById("calor-vn-cliente-entregables")
);
/** @deprecated Use FIGMA_ASSETS from figma-assets-ssot */
export const CALOR_VN_NEWS_COVERS = toCalorItem(assetById("calor-vn-news-covers"));
/** @deprecated Use FIGMA_ASSETS from figma-assets-ssot */
export const CALOR_VN_CAMPAIGN_ASSETS_A11Y = toCalorItem(
  assetById("calor-vn-campaign-assets-a11y")
);
/** @deprecated Use FIGMA_ASSETS from figma-assets-ssot */
export const CALOR_VN_LOG_VISUAL = toCalorItem(assetById("calor-vn-log-visual"));
/** @deprecated Use FIGMA_ASSETS from figma-assets-ssot */
export const CALOR_VN_ESCENARIOS_DEMANDA_SURA = toCalorItem(
  assetById("calor-vn-escenarios-demanda-sura")
);
/** @deprecated Use FIGMA_ASSETS from figma-assets-ssot */
export const CALOR_VN_DESIGN_SYSTEM_MAKE = toCalorItem(
  assetById("calor-vn-design-system-make")
);
/** @deprecated Use FIGMA_ASSETS from figma-assets-ssot */
export const CALOR_VN_MAP_MODULE_MAKE = toCalorItem(
  assetById("calor-vn-map-module-make")
);

/** @deprecated Unmounted strip catalog. URLs: figma-assets-ssot.ts */
export const FIGMA_CALOR_VN: readonly FigmaCalorItem[] = FIGMA_CALOR_LEGACY_IDS.map(
  (id) => toCalorItem(assetById(id))
);
