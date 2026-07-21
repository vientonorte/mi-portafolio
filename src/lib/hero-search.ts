/** Multi-entry lines for landing “reduce el ruido” (FigJam). */
export type HeroSearchCategory = "recursos" | "consultoria" | "contacto";

export interface HeroSearchSuggestion {
  id: string;
  category: HeroSearchCategory;
  title: string;
  hint: string;
  badge?: string;
  keywords: string[];
  href: string;
}

const CATEGORY_ORDER: HeroSearchCategory[] = ["recursos", "consultoria", "contacto"];

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

/** Una sugerencia por línea de entrada; filtra por query sin ocultar las otras líneas. */
export function filterHeroSuggestions(
  suggestions: HeroSearchSuggestion[],
  options: { query?: string } = {}
): HeroSearchSuggestion[] {
  const normalizedQuery = normalize(options.query?.trim() ?? "");
  const bestByCategory = new Map<
    HeroSearchCategory,
    { item: HeroSearchSuggestion; score: number }
  >();

  for (const item of suggestions) {
    const haystack = normalize(
      [item.title, item.hint, item.badge ?? "", ...item.keywords].join(" ")
    );
    const score = !normalizedQuery
      ? 1
      : haystack.includes(normalizedQuery)
        ? 2
        : item.keywords.some((keyword) => normalize(keyword).startsWith(normalizedQuery))
          ? 1
          : 0;

    if (score === 0) continue;

    const current = bestByCategory.get(item.category);
    if (!current || score > current.score) {
      bestByCategory.set(item.category, { item, score });
    }
  }

  return CATEGORY_ORDER.map((category) => bestByCategory.get(category)?.item).filter(
    (item): item is HeroSearchSuggestion => Boolean(item)
  );
}
