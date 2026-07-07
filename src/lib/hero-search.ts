export type HeroSearchCategory = "negocios" | "contacto" | "auditorias";

export interface HeroSearchSuggestion {
  id: string;
  category: HeroSearchCategory;
  title: string;
  hint: string;
  keywords: string[];
  href: string;
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

export function filterHeroSuggestions(
  suggestions: HeroSearchSuggestion[],
  options: { query?: string; category: HeroSearchCategory; limit?: number }
): HeroSearchSuggestion[] {
  const { query = "", category, limit = 6 } = options;
  const normalizedQuery = normalize(query.trim());

  return suggestions
    .filter((item) => item.category === category)
    .map((item) => {
      const haystack = normalize(
        [item.title, item.hint, ...item.keywords].join(" ")
      );
      const score = !normalizedQuery
        ? 1
        : haystack.includes(normalizedQuery)
          ? 2
          : item.keywords.some((keyword) => normalize(keyword).startsWith(normalizedQuery))
            ? 1
            : 0;
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, limit)
    .map(({ item }) => item);
}