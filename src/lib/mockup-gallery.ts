import type { MockupItem } from "../components/molecules/MockupGallery";
import type { Language } from "./i18n";
import { useTranslation } from "./i18n";

type MockupStrings = ReturnType<typeof useTranslation>["mockups"];

function fill(template: string, values: Record<string, string>): string {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, value),
    template
  );
}

export function mockupItemLabel(
  strings: MockupStrings,
  projectName: string,
  index: number,
  total: number
): string {
  return fill(strings.itemLabel, {
    project: projectName,
    current: String(index + 1),
    total: String(total),
  });
}

export function buildMockupItems(
  sources: string[],
  context: { projectName: string; companyName: string },
  strings: MockupStrings,
  options?: { labels?: string[] }
): MockupItem[] {
  const total = sources.length;
  return sources.map((src, index) => ({
    src,
    alt: `${context.projectName} — ${context.companyName} (${index + 1}/${total})`,
    label:
      options?.labels?.[index] ??
      mockupItemLabel(strings, context.projectName, index, total),
  }));
}

export function flattenProjectMockups(
  projects: Array<{
    projectName: string;
    details?: { mockups?: string[] };
  }>,
  companyName: string,
  strings: MockupStrings
): MockupItem[] {
  const items = projects.flatMap((project) =>
    buildMockupItems(
      project.details?.mockups ?? [],
      { projectName: project.projectName, companyName },
      strings
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

export function companyGalleryTitle(name: string, language: Language): string {
  const strings = useTranslation(language).mockups;
  return fill(strings.companyTitle, { name });
}

export function projectGalleryCopy(
  projectName: string,
  language: Language
): { title: string; description: string } {
  const strings = useTranslation(language).mockups;
  return {
    title: fill(strings.projectTitle, { name: projectName }),
    description: strings.projectDescription,
  };
}