/**
 * Calor VN — archivos Figma calientes (editados ~12d, nombrados VN).
 * Link-out only: drafts privados no se embeben (el iframe quedaría en blanco).
 * Heatmaps, URLs Claro y Khuro-en-Figma = NO DATO (no inventar).
 */
import type { FigmaEmbedCopy } from "./figma-embeds";
import { NEWS_CATALOG } from "./news-editions";

export type FigmaCalorKind = "board" | "slides" | "design";

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

/** Dashboard 10 Skills → docs-vn / vn-agent */
export const CALOR_VN_SKILLS_DASHBOARD: FigmaCalorItem = {
  id: "calor-vn-skills-dashboard",
  kind: "design",
  shareUrl:
    "https://www.figma.com/design/h5663L39FoCWJ3vup0Qp3d/Dashboard-Viento-Norte---Skills",
  surfaces: ["docs-vn", "vn-agent"],
  copy: {
    es: {
      title: "Dashboard 10 Skills",
      subtitle: "Competencias Viento Norte — archivo de diseño en trabajo activo",
      embedTitle: "Figma Design — Dashboard Viento Norte Skills",
      embedDescription:
        "Dashboard de skills VN. Ábrelo en Figma; el draft no se embebe.",
      openLabel: OPEN_FIGMA.es,
    },
    en: {
      title: "10 Skills dashboard",
      subtitle: "Viento Norte competencies — live design file",
      embedTitle: "Figma Design — Viento Norte Skills dashboard",
      embedDescription:
        "VN skills dashboard. Open it in Figma; the draft is not embedded.",
      openLabel: OPEN_FIGMA.en,
    },
  },
};

/** Skills competencias */
export const CALOR_VN_SKILLS_COMPETENCIAS: FigmaCalorItem = {
  id: "calor-vn-skills-competencias",
  kind: "design",
  shareUrl:
    "https://www.figma.com/design/31Krz3o3QKftMZxJLOgakk/Viento-Norte---Skills-Dashboard",
  copy: {
    es: {
      title: "Skills · competencias",
      subtitle: "Dashboard de competencias VN — vista de skills del craft en vivo",
      embedTitle: "Figma Design — Viento Norte Skills Dashboard",
      embedDescription:
        "Vista de competencias VN. Ábrelo en Figma; el draft no se embebe.",
      openLabel: OPEN_FIGMA.es,
    },
    en: {
      title: "Skills · competencies",
      subtitle: "VN competencies dashboard — live skills view of the craft",
      embedTitle: "Figma Design — Viento Norte Skills Dashboard",
      embedDescription:
        "VN competencies view. Open it in Figma; the draft is not embedded.",
      openLabel: OPEN_FIGMA.en,
    },
  },
};

/** VN arquitectura live → docs-vn */
export const CALOR_VN_ARQUITECTURA_LIVE: FigmaCalorItem = {
  id: "calor-vn-arquitectura-live",
  kind: "board",
  shareUrl:
    "https://www.figma.com/board/UeFKuIVdcUcHEUw2NG9grC/VN-arquitectura-live",
  surfaces: ["docs-vn"],
  copy: {
    es: {
      title: "VN arquitectura live",
      subtitle: "Tablero FigJam de la arquitectura Viento Norte en vivo",
      embedTitle: "FigJam — VN arquitectura live",
      embedDescription:
        "Tablero de arquitectura VN. Ábrelo en Figma; el draft no se embebe.",
      openLabel: OPEN_FIGJAM.es,
    },
    en: {
      title: "VN live architecture",
      subtitle: "FigJam board of live Viento Norte architecture",
      embedTitle: "FigJam — VN live architecture",
      embedDescription:
        "VN architecture board. Open it in Figma; the draft is not embedded.",
      openLabel: OPEN_FIGJAM.en,
    },
  },
};

/** VN Cliente entregables → lead-a11y-vn */
export const CALOR_VN_CLIENTE_ENTREGABLES: FigmaCalorItem = {
  id: "calor-vn-cliente-entregables",
  kind: "board",
  shareUrl:
    "https://www.figma.com/board/Ihb2NtY0rBWoAJgdEi7TPn/VN-Cliente-entregables",
  surfaces: ["lead-a11y-vn"],
  copy: {
    es: {
      title: "VN Cliente · entregables",
      subtitle: "Tablero FigJam de entregables para cliente VN",
      embedTitle: "FigJam — VN Cliente entregables",
      embedDescription:
        "Entregables de cliente VN. Ábrelo en Figma; el draft no se embebe.",
      openLabel: OPEN_FIGJAM.es,
    },
    en: {
      title: "VN Client deliverables",
      subtitle: "FigJam board of VN client deliverables",
      embedTitle: "FigJam — VN Client deliverables",
      embedDescription:
        "VN client deliverables. Open it in Figma; the draft is not embedded.",
      openLabel: OPEN_FIGJAM.en,
    },
  },
};

/** News covers — URL ya SSOT en news-editions.json; card FO para abrir el archivo. */
export const CALOR_VN_NEWS_COVERS: FigmaCalorItem = {
  id: "calor-vn-news-covers",
  kind: "design",
  shareUrl: NEWS_CATALOG.figma.fileUrl,
  surfaces: ["news"],
  copy: {
    es: {
      title: "News · covers LinkedIn",
      subtitle: "Cubiertas de ediciones News VN — diseño de portadas",
      embedTitle: "Figma Design — VN News LinkedIn covers",
      embedDescription:
        "Portadas de News VN. Ábrelo en Figma; el draft no se embebe.",
      openLabel: OPEN_FIGMA.es,
    },
    en: {
      title: "News · LinkedIn covers",
      subtitle: "VN News edition covers — cover design",
      embedTitle: "Figma Design — VN News LinkedIn covers",
      embedDescription:
        "VN News covers. Open it in Figma; the draft is not embedded.",
      openLabel: OPEN_FIGMA.en,
    },
  },
};

/** Strip corto: solo calor conocido. No dumps de Recents (72 drafts). */
export const FIGMA_CALOR_VN: readonly FigmaCalorItem[] = [
  CALOR_VN_SKILLS_DASHBOARD,
  CALOR_VN_SKILLS_COMPETENCIAS,
  CALOR_VN_ARQUITECTURA_LIVE,
  CALOR_VN_CLIENTE_ENTREGABLES,
  CALOR_VN_NEWS_COVERS,
];
