import { describe, expect, it } from "vitest";
import { filterHeroSuggestions } from "@/lib/hero-search";

const suggestions = [
  {
    id: "negocios-demo",
    category: "negocios" as const,
    title: "Demo X | CMS",
    hint: "Caso N2N",
    badge: "Demo",
    keywords: ["demo", "sem", "seo"],
    href: "path/consultoria#consultoria-demo",
  },
  {
    id: "contacto-perfil",
    category: "contacto" as const,
    title: "Perfil · UX Lead",
    hint: "CV y experiencia",
    badge: "Perfil",
    keywords: ["perfil", "linkedin", "reclutadores"],
    href: "section/sobre-mi/experiencia",
  },
  {
    id: "auditoria-freemium",
    category: "auditorias" as const,
    title: "Auditoría UX gratuita",
    hint: "Freemium",
    badge: "Auditoría UX",
    keywords: ["auditoría", "leads", "negocios"],
    href: "route/auditoria",
  },
];

describe("filterHeroSuggestions", () => {
  it("returns one suggestion per business line by default", () => {
    const result = filterHeroSuggestions(suggestions);
    expect(result).toHaveLength(3);
    expect(result.map((item) => item.id)).toEqual([
      "negocios-demo",
      "contacto-perfil",
      "auditoria-freemium",
    ]);
  });

  it("filters lines by query while keeping one case per line", () => {
    const result = filterHeroSuggestions(suggestions, { query: "linkedin" });
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe("contacto-perfil");
  });
});