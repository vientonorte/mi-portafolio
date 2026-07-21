import { describe, expect, it } from "vitest";
import { filterHeroSuggestions } from "@/lib/hero-search";

const suggestions = [
  {
    id: "reclutadores-cx",
    category: "contacto" as const,
    title: "CX · Reclutadores",
    hint: "Perfil",
    badge: "CX",
    keywords: ["cx", "reclutadores"],
    href: "section/sobre-mi/experiencia",
  },
  {
    id: "consultoria-viento-norte",
    category: "negocios" as const,
    title: "Consultoría Viento Norte",
    hint: "Design Ops",
    badge: "Consultoría",
    keywords: ["consultoría", "viento norte"],
    href: "route/consultoria",
  },
  {
    id: "auditoria-accesibilidad",
    category: "auditorias" as const,
    title: "Auditoría gratuita de accesibilidad",
    hint: "Agendar WCAG",
    badge: "Agendar",
    keywords: ["auditoría", "wcag", "agendar", "leads"],
    href: "route/auditoria",
  },
];

describe("filterHeroSuggestions", () => {
  it("returns cards in CX · Consultoría · Auditoría order", () => {
    const result = filterHeroSuggestions(suggestions);
    expect(result).toHaveLength(3);
    expect(result.map((item) => item.id)).toEqual([
      "reclutadores-cx",
      "consultoria-viento-norte",
      "auditoria-accesibilidad",
    ]);
  });

  it("filters lines by query while keeping one case per line", () => {
    const result = filterHeroSuggestions(suggestions, { query: "agendar" });
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe("auditoria-accesibilidad");
  });
});
