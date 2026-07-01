import type { MockupItem } from "../components/molecules/MockupGallery";
import type { Language } from "./LanguageContext";

export function buildMockupItems(
  sources: string[],
  context: { projectName: string; companyName: string },
  options?: { withLabel?: boolean }
): MockupItem[] {
  return sources.map((src, index) => ({
    src,
    alt: `${context.projectName} — ${context.companyName}`,
    ...(options?.withLabel ? { label: context.projectName } : {}),
    order: index,
  }));
}

export function flattenProjectMockups(
  projects: Array<{
    projectName: string;
    details?: { mockups?: string[] };
  }>,
  companyName: string
): MockupItem[] {
  const items = projects.flatMap((project) =>
    buildMockupItems(
      project.details?.mockups ?? [],
      {
        projectName: project.projectName,
        companyName,
      },
      { withLabel: true }
    )
  );
  return dedupeMockupItems(items);
}

export function dedupeMockupItems(items: MockupItem[]): MockupItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.src)) return false;
    seen.add(item.src);
    return true;
  });
}

export function projectGalleryCopy(
  projectName: string,
  language: Language
): { title: string; description: string } {
  if (language === "es") {
    return {
      title: `Evidencias — ${projectName}`,
      description:
        "Capturas y prototipos de alta fidelidad del trabajo de diseño UX/UI en este proyecto.",
    };
  }
  return {
    title: `Evidence — ${projectName}`,
    description:
      "High-fidelity captures and prototypes from the UX/UI design work on this project.",
  };
}