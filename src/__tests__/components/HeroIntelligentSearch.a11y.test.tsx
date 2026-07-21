import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import {
  HeroIntelligentSearch,
  heroSuggestionOptionId,
} from "@/components/molecules/HeroIntelligentSearch";
import type { HeroSearchSuggestion } from "@/lib/hero-search";

const suggestions: HeroSearchSuggestion[] = [
  {
    id: "recursos-home",
    category: "recursos",
    title: "Ver recursos y demos",
    hint: "Mockups",
    badge: "Recursos",
    keywords: ["recursos"],
    href: "path/#recursos",
  },
  {
    id: "contacto-hablar",
    category: "contacto",
    title: "Conversemos",
    hint: "Form",
    badge: "Contacto",
    keywords: ["contacto"],
    href: "path/#contacto",
  },
];

const panels = {
  recursos: {
    badge: "Recursos",
    description: "Mockups",
    highlights: ["Demos"],
    metrics: [],
    ctaPrimary: "Ir a recursos",
    ctaSecondary: "Demos",
    composerHint: "",
  },
  consultoria: {
    badge: "Consultoría",
    description: "N2N",
    highlights: ["Método"],
    metrics: [],
    ctaPrimary: "Abrir",
    ctaSecondary: "Proceso",
    composerHint: "",
  },
  contacto: {
    badge: "Contacto",
    description: "Form",
    highlights: ["Lead"],
    metrics: [],
    ctaPrimary: "Ir a contacto",
    ctaSecondary: "Perfil",
    composerHint: "",
  },
} as const;

function renderSearch() {
  return render(
    <MemoryRouter>
      <HeroIntelligentSearch
        groupLabel="¿Qué buscas?"
        searchPlaceholder="Buscar"
        searchAriaLabel="Buscador inteligente del portafolio"
        suggestionsLabel="Sugerencias"
        noResults="Sin coincidencias"
        liveSuggestionsCount="{{count}} sugerencias disponibles"
        liveSuggestionsActive="{{count}} sugerencias. {{title}}, {{hint}}"
        tabs={{
          recursos: "Recursos",
          consultoria: "Consultoría",
          contacto: "Contacto",
        }}
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

    const firstOptionId = heroSuggestionOptionId(listbox.id, "recursos-home");
    expect(combobox).toHaveAttribute("aria-activedescendant", firstOptionId);

    await user.keyboard("{ArrowDown}");
    const secondOptionId = heroSuggestionOptionId(listbox.id, "contacto-hablar");
    expect(combobox).toHaveAttribute("aria-activedescendant", secondOptionId);
  });

  it("announces live status for screen readers", async () => {
    const user = userEvent.setup();
    renderSearch();

    await user.click(screen.getByRole("combobox", { name: /qué buscas/i }));
    expect(screen.getByText(/sugerencias\. ver recursos/i)).toBeInTheDocument();
  });

  it("uses text input with search hints instead of type=search", () => {
    renderSearch();
    const combobox = screen.getByRole("combobox", { name: /qué buscas/i });
    expect(combobox).toHaveAttribute("type", "text");
    expect(combobox).toHaveAttribute("inputmode", "search");
    expect(combobox).toHaveAttribute("autocomplete", "off");
  });
});
