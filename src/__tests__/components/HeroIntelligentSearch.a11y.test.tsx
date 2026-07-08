import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { HeroIntelligentSearch, heroSuggestionOptionId } from "@/components/molecules/HeroIntelligentSearch";
import type { HeroSearchSuggestion } from "@/lib/hero-search";

const suggestions: HeroSearchSuggestion[] = [
  {
    id: "negocios-demo",
    category: "negocios",
    title: "Demo X | CMS",
    hint: "Del brief al prototipo publicado",
    badge: "Demo",
    keywords: ["demo"],
    href: "section/consultoria/consultoria-demo",
  },
  {
    id: "contacto-perfil",
    category: "contacto",
    title: "Experiencia y trayectoria",
    hint: "Rol UX Lead",
    badge: "Experiencia",
    keywords: ["perfil"],
    href: "section/sobre-mi/experiencia",
  },
];

const panels = {
  negocios: {
    badge: "Negocios",
    description: "Casos con evidencia",
    highlights: ["SURA"],
    metrics: [],
    ctaPrimary: "Ver caso",
    ctaSecondary: "Ver todos",
    composerHint: "",
  },
  contacto: {
    badge: "Contacto",
    description: "Perfil profesional",
    highlights: ["CV"],
    metrics: [],
    ctaPrimary: "Ver perfil",
    ctaSecondary: "Contactar",
    composerHint: "",
  },
  auditorias: {
    badge: "Auditoría",
    description: "WCAG checklist",
    highlights: ["AA"],
    metrics: [],
    ctaPrimary: "Ver auditoría",
    ctaSecondary: "Consultoría",
    composerHint: "",
  },
} as const;

function renderSearch() {
  return render(
    <MemoryRouter>
      <HeroIntelligentSearch
        groupLabel="¿Qué buscas?"
        searchPlaceholder="Buscar casos"
        searchAriaLabel="Buscador inteligente del portafolio"
        suggestionsLabel="Sugerencias"
        noResults="Sin coincidencias"
        tabs={{ negocios: "Negocios", contacto: "Contacto", auditorias: "Auditorías" }}
        panels={panels}
        suggestions={suggestions}
        onPrimaryAction={() => undefined}
        onSecondaryAction={() => undefined}
      />
    </MemoryRouter>
  );
}

describe("HeroIntelligentSearch a11y", () => {
  it("exposes combobox + listbox pattern with activedescendant", async () => {
    const user = userEvent.setup();
    renderSearch();

    const combobox = screen.getByRole("combobox", { name: /qué buscas/i });
    expect(combobox).toHaveAttribute("aria-haspopup", "listbox");
    expect(combobox).toHaveAttribute("aria-autocomplete", "list");
    expect(combobox).not.toHaveAttribute("aria-label");

    await user.click(combobox);
    expect(combobox).toHaveAttribute("aria-expanded", "true");

    const listbox = screen.getByRole("listbox", { name: /sugerencias/i });
    expect(listbox).toBeInTheDocument();

    const firstOptionId = heroSuggestionOptionId(listbox.id, "negocios-demo");
    expect(combobox).toHaveAttribute("aria-activedescendant", firstOptionId);

    await user.keyboard("{ArrowDown}");
    const secondOptionId = heroSuggestionOptionId(listbox.id, "contacto-perfil");
    expect(combobox).toHaveAttribute("aria-activedescendant", secondOptionId);
  });

  it("announces live status for screen readers", async () => {
    const user = userEvent.setup();
    renderSearch();

    await user.click(screen.getByRole("combobox", { name: /qué buscas/i }));
    expect(screen.getByText(/sugerencias\. demo x \| cms/i)).toBeInTheDocument();
  });

  it("uses text input with search hints instead of type=search", () => {
    renderSearch();
    const combobox = screen.getByRole("combobox", { name: /qué buscas/i });
    expect(combobox).toHaveAttribute("type", "text");
    expect(combobox).toHaveAttribute("inputmode", "search");
    expect(combobox).toHaveAttribute("autocomplete", "off");
  });
});