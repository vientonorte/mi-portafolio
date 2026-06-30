import type { LocalizedCopy } from "../data/projects-data";
import type { Language } from "./LanguageContext";

export function localized(copy: LocalizedCopy, lang: Language): string {
  return copy[lang];
}

export function localizedList(
  lists: { es: string[]; en: string[] },
  lang: Language
): string[] {
  return lists[lang];
}

export function projectDescription(
  project: { description: string; descriptionEN?: string },
  lang: Language
): string {
  if (lang === "en" && project.descriptionEN) {
    return project.descriptionEN;
  }
  return project.description;
}