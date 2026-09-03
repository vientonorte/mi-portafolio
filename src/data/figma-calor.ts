/** DEPRECATED 2026-09-02: public Calor VN strip hallucinated; not heatmap. Do not mount. */
/**
 * Calor VN — archivos Figma calientes (editados ~12d, nombrados VN).
 * Link-out only: drafts privados no se embeben (el iframe quedaría en blanco).
 * Heatmaps, URLs Claro y Khuro-en-Figma = NO DATO (no inventar).
 */
import type { FigmaEmbedCopy } from "./figma-embeds";
import { NEWS_CATALOG } from "./news-editions";

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

/** VN Campaign assets piloto a11y → google-ads-vn */
export const CALOR_VN_CAMPAIGN_ASSETS_A11Y: FigmaCalorItem = {
  id: "calor-vn-campaign-assets-a11y",
  kind: "design",
  shareUrl:
    "https://www.figma.com/design/C2ZgaajABQa3NiFJTnFF45/VN-·-Campaign-assets-·-piloto-a11y",
  surfaces: ["google-ads-vn"],
  copy: {
    es: {
      title: "VN · Campaign assets · piloto a11y",
      subtitle: "Assets de campaña VN — piloto de accesibilidad en diseño",
      embedTitle: "Figma Design — VN Campaign assets piloto a11y",
      embedDescription:
        "Assets de campaña VN. Ábrelo en Figma; el draft no se embebe.",
      openLabel: OPEN_FIGMA.es,
    },
    en: {
      title: "VN · Campaign assets · a11y pilot",
      subtitle: "VN campaign assets — accessibility pilot in design",
      embedTitle: "Figma Design — VN Campaign assets a11y pilot",
      embedDescription:
        "VN campaign assets. Open it in Figma; the draft is not embedded.",
      openLabel: OPEN_FIGMA.en,
    },
  },
};

/** VN LOG visual → docs-vn */
export const CALOR_VN_LOG_VISUAL: FigmaCalorItem = {
  id: "calor-vn-log-visual",
  kind: "board",
  shareUrl: "https://www.figma.com/board/XHlBZYksezyvxKCYAUON92/VN-LOG-visual",
  surfaces: ["docs-vn"],
  copy: {
    es: {
      title: "VN LOG visual",
      subtitle: "Tablero FigJam del log visual Viento Norte",
      embedTitle: "FigJam — VN LOG visual",
      embedDescription:
        "Log visual VN. Ábrelo en Figma; el draft no se embebe.",
      openLabel: OPEN_FIGJAM.es,
    },
    en: {
      title: "VN visual log",
      subtitle: "FigJam board of the Viento Norte visual log",
      embedTitle: "FigJam — VN visual log",
      embedDescription:
        "VN visual log. Open it in Figma; the draft is not embedded.",
      openLabel: OPEN_FIGJAM.en,
    },
  },
};

/** Dashboard Escenarios Demanda SURA */
export const CALOR_VN_ESCENARIOS_DEMANDA_SURA: FigmaCalorItem = {
  id: "calor-vn-escenarios-demanda-sura",
  kind: "design",
  shareUrl:
    "https://www.figma.com/design/s5lLcHkNalH6p3LKCop7wT/Dashboard-Escenarios-Demanda-SURA---Viento-Norte",
  copy: {
    es: {
      title: "Dashboard Escenarios Demanda SURA",
      subtitle: "Escenarios de demanda SURA — archivo de diseño VN",
      embedTitle: "Figma Design — Dashboard Escenarios Demanda SURA",
      embedDescription:
        "Escenarios de demanda SURA. Ábrelo en Figma; el draft no se embebe.",
      openLabel: OPEN_FIGMA.es,
    },
    en: {
      title: "SURA demand scenarios dashboard",
      subtitle: "SURA demand scenarios — VN design file",
      embedTitle: "Figma Design — SURA demand scenarios dashboard",
      embedDescription:
        "SURA demand scenarios. Open it in Figma; the draft is not embedded.",
      openLabel: OPEN_FIGMA.en,
    },
  },
};

/** Design System — Figma Make */
export const CALOR_VN_DESIGN_SYSTEM_MAKE: FigmaCalorItem = {
  id: "calor-vn-design-system-make",
  kind: "make",
  shareUrl:
    "https://www.figma.com/make/OR8iCIpokgaPKjerCyZAKy/Rodrigo-Gaete---Desing-System",
  copy: {
    es: {
      title: "Design System",
      subtitle: "Sistema de diseño — prototipo Figma Make",
      embedTitle: "Figma Make — Design System",
      embedDescription:
        "Sistema de diseño VN. Ábrelo en Figma Make; el draft no se embebe.",
      openLabel: OPEN_MAKE.es,
    },
    en: {
      title: "Design System",
      subtitle: "Design system — Figma Make prototype",
      embedTitle: "Figma Make — Design System",
      embedDescription:
        "VN design system. Open it in Figma Make; the draft is not embedded.",
      openLabel: OPEN_MAKE.en,
    },
  },
};

/** Downloadable Map Module — Figma Make */
export const CALOR_VN_MAP_MODULE_MAKE: FigmaCalorItem = {
  id: "calor-vn-map-module-make",
  kind: "make",
  shareUrl:
    "https://www.figma.com/make/GkKsVobp04RD2rjGPJN7tv/Downloadable-Map-Module",
  copy: {
    es: {
      title: "Downloadable Map Module",
      subtitle: "Módulo de mapa descargable — prototipo Figma Make",
      embedTitle: "Figma Make — Downloadable Map Module",
      embedDescription:
        "Módulo de mapa VN. Ábrelo en Figma Make; el draft no se embebe.",
      openLabel: OPEN_MAKE.es,
    },
    en: {
      title: "Downloadable Map Module",
      subtitle: "Downloadable map module — Figma Make prototype",
      embedTitle: "Figma Make — Downloadable Map Module",
      embedDescription:
        "VN map module. Open it in Figma Make; the draft is not embedded.",
      openLabel: OPEN_MAKE.en,
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
  CALOR_VN_CAMPAIGN_ASSETS_A11Y,
  CALOR_VN_LOG_VISUAL,
  CALOR_VN_ESCENARIOS_DEMANDA_SURA,
  CALOR_VN_DESIGN_SYSTEM_MAKE,
  CALOR_VN_MAP_MODULE_MAKE,
];
