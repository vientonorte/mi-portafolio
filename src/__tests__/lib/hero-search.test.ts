import { describe, expect, it } from "vitest";
import { filterHeroSuggestions, type HeroSearchSuggestion } from "@/lib/hero-search";

const suggestions: HeroSearchSuggestion[] = [
  {
    id: "negocios-ria",
    category: "negocios",
    title: "RIA SURA",
    hint: "Onboarding US",
    keywords: ["ria", "sura"],
    href: "project/sura-ria-us",
  },
  {
    id: "contacto-form",
    category: "contacto",
    title: "Contacto",
    hint: "Formulario",
    keywords: ["contacto", "email"],
    href: "route/contacto",
  },
];

describe("filterHeroSuggestions", () => {
  it("filters by active business line", () => {
    const result = filterHeroSuggestions(suggestions, { category: "contacto" });
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe("contacto-form");
  });

  it("matches query against keywords", () => {
    const result = filterHeroSuggestions(suggestions, {
      category: "negocios",
      query: "ria",
    });
    expect(result[0]?.id).toBe("negocios-ria");
  });
});