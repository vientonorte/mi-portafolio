import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import {
  HeroIntelligentSearch,
  heroSuggestionOptionId,
} from "@/components/molecules/HeroIntelligentSearch";
import type { HeroSearchSuggestion } from "@/lib/hero-search";
import { LanguageProvider } from "@/lib/LanguageContext";

const suggestions: HeroSearchSuggestion[] = [
  {
    id: "reclutadores-cx",
    category: "contacto",
    title: "Experiencia y CX",
    hint: "Perfil",
    badge: "Reclutadores",
    keywords: ["cx", "reclutadores"],
    href: "section/sobre-mi/experiencia",
  },
  {
    id: "consultoria-viento-norte",
    category: "negocios",
    title: "Consultoría Viento Norte",
    hint: "Design Ops",
    badge: "Empresas",
    keywords: ["consultoría"],
    href: "route/consultoria",
  },
  {
    id: "auditoria-accesibilidad",
    category: "auditorias",
    title: "Auditoría de accesibilidad",
    hint: "Radar gratis",
    badge: "Gratis · Radar",
    keywords: ["auditoría", "wcag"],
    href: "route/auditoria",
  },
];

const panels = {
  negocios: {
    badge: "Empresas",
    description: "Consultoría",
    highlights: ["Design Ops"],
    metrics: [],
    ctaPrimary: "Ver consultoría",
    ctaSecondary: "Proceso",
    composerHint: "",
  },
  contacto: {
    badge: "Reclutadores",
    description: "Perfil",
    highlights: ["CV"],
    metrics: [],
    ctaPrimary: "Ver experiencia",
    ctaSecondary: "Contacto",
    composerHint: "",
  },
  auditorias: {
    badge: "Gratis · Radar",
    description: "a11y",
    highlights: ["WCAG"],
    metrics: [],
    ctaPrimary: "Agendar",
    ctaSecondary: "Modalidades",
    composerHint: "",
  },
} as const;

function renderSearch() {
  return render(
    <MemoryRouter>
      <LanguageProvider>
        <HeroIntelligentSearch
          groupLabel="¿Qué buscas?"
          searchPlaceholder="Buscar"
          searchAriaLabel="Buscador inteligente del portafolio"
          suggestionsLabel="Sugerencias"
          noResults="Sin coincidencias"
          liveSuggestionsCount="{{count}} sugerencias disponibles"
          liveSuggestionsActive="{{count}} sugerencias. {{title}}, {{hint}}"
          tabs={{
            negocios: "Empresas",
            contacto: "Reclutadores",
            auditorias: "Auditoría",
          }}
          panels={panels}
          suggestions={suggestions}
          onPrimaryAction={() => undefined}
          onSecondaryAction={() => undefined}
        />
      </LanguageProvider>
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

    // CATEGORY_ORDER: contacto → negocios → auditorias
    const firstOptionId = heroSuggestionOptionId(listbox.id, "reclutadores-cx");
    expect(combobox).toHaveAttribute("aria-activedescendant", firstOptionId);

    await user.keyboard("{ArrowDown}");
    const secondOptionId = heroSuggestionOptionId(listbox.id, "consultoria-viento-norte");
    expect(combobox).toHaveAttribute("aria-activedescendant", secondOptionId);
  });

  it("announces live status for screen readers", async () => {
    const user = userEvent.setup();
    renderSearch();

    await user.click(screen.getByRole("combobox", { name: /qué buscas/i }));
    expect(screen.getByText(/sugerencias\. experiencia y cx/i)).toBeInTheDocument();
  });

  it("uses text input with search hints instead of type=search", () => {
    renderSearch();
    const combobox = screen.getByRole("combobox", { name: /qué buscas/i });
    expect(combobox).toHaveAttribute("type", "text");
    expect(combobox).toHaveAttribute("inputmode", "search");
    expect(combobox).toHaveAttribute("autocomplete", "off");
  });
});
