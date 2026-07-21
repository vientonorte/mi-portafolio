import { describe, expect, it } from "vitest";
import { filterHeroSuggestions } from "@/lib/hero-search";

const suggestions = [
  {
    id: "recursos-home",
    category: "recursos" as const,
    title: "Ver recursos",
    hint: "Mockups",
    badge: "Recursos",
    keywords: ["recursos", "demo"],
    href: "path/#recursos",
  },
  {
    id: "consultoria-metodo",
    category: "consultoria" as const,
    title: "Método",
    hint: "N2N",
    badge: "Consultoría",
    keywords: ["consultoría", "n2n"],
    href: "route/consultoria",
  },
  {
    id: "contacto-hablar",
    category: "contacto" as const,
    title: "Conversemos",
    hint: "Form",
    badge: "Contacto",
    keywords: ["contacto", "lead"],
    href: "path/#contacto",
  },
];

describe("filterHeroSuggestions", () => {
  it("returns one suggestion per multi-entry line by default", () => {
    const result = filterHeroSuggestions(suggestions);
    expect(result).toHaveLength(3);
    expect(result.map((item) => item.id)).toEqual([
      "recursos-home",
      "consultoria-metodo",
      "contacto-hablar",
    ]);
  });

  it("filters lines by query while keeping one case per line", () => {
    const result = filterHeroSuggestions(suggestions, { query: "lead" });
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe("contacto-hablar");
  });
});
