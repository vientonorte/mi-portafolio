/** Figma embeds públicos — FigJam, Slides, etc. (requiere share link abierto) */

export type FigmaEmbedKind = "board" | "slides";

export interface FigmaEmbedCopy {
  title: string;
  subtitle: string;
  embedTitle: string;
  embedDescription: string;
  openLabel: string;
}

export interface FigmaEmbedConfig {
  id: string;
  kind: FigmaEmbedKind;
  shareUrl: string;
  embedHeight?: number;
  copy: Record<"es" | "en", FigmaEmbedCopy>;
}

/** Convierte URL pública figma.com → embed.figma.com (patrón oficial embed-host). */
export function toFigmaEmbedUrl(shareUrl: string, embedHost = "mi-portafolio"): string {
  const url = new URL(shareUrl);
  url.hostname = "embed.figma.com";
  url.searchParams.set("embed-host", embedHost);
  return url.toString();
}

export const FIGJAM_UX_TESTING_CRITICA: FigmaEmbedConfig = {
  id: "figjam-ux-testing-critica",
  kind: "board",
  shareUrl:
    "https://www.figma.com/board/WQ3yWzgIrOSZXTuExwRzS9/Template-cr%C3%ADtica-de-dise%C3%B1o",
  embedHeight: 480,
  copy: {
    es: {
      title: "Template crítica de diseño",
      subtitle: "Playbook FigJam para talleres de UX Testing y refinamiento",
      embedTitle: "FigJam — template crítica de diseño para testing UX",
      embedDescription:
        "Tablero interactivo para facilitar crítica de diseño antes de desarrollo. Si el embed no carga, abre el enlace en Figma.",
      openLabel: "Abrir FigJam en nueva pestaña",
    },
    en: {
      title: "Design critique template",
      subtitle: "FigJam playbook for UX testing and refinement workshops",
      embedTitle: "FigJam — design critique template for UX testing",
      embedDescription:
        "Interactive board to facilitate design critique before development. If the embed fails, open the link in Figma.",
      openLabel: "Open FigJam in a new tab",
    },
  },
};

export const FIGMA_SLIDES_SURA_COLOMBIA: FigmaEmbedConfig = {
  id: "figma-slides-sura-colombia",
  kind: "slides",
  shareUrl:
    "https://www.figma.com/slides/xxKiHNAOPDpxmfuqyE7N72/PPT-TUTORIA-SURA-ASESOR-COLOMBIA",
  embedHeight: 420,
  copy: {
    es: {
      title: "Tutoría · Asesor SURA Colombia",
      subtitle: "Enablement regional — presentación en Figma Slides",
      embedTitle: "Figma Slides — tutoría asesor SURA Colombia",
      embedDescription:
        "Material de capacitación regional para asesores. Si el embed requiere login, usa el enlace para abrir en Figma.",
      openLabel: "Abrir presentación en Figma",
    },
    en: {
      title: "Tutorial · SURA Colombia Advisor",
      subtitle: "Regional enablement — Figma Slides deck",
      embedTitle: "Figma Slides — SURA Colombia advisor tutorial",
      embedDescription:
        "Regional training material for advisors. If the embed requires login, open the link in Figma.",
      openLabel: "Open deck in Figma",
    },
  },
};