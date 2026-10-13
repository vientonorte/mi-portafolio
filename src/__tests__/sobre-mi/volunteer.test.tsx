import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Volunteer } from "@/components/organisms/Volunteer";
import { LanguageProvider } from "@/lib/LanguageContext";

const LINKEDIN_CHROME = ["Otros perfiles", "Solo para ti", "PRODUBANCO", "JUNJI", "Fondo Esperanza"];

describe("Sobre mí · voluntariado", () => {
  it("lista las cuatro causas y deja fuera la barra de LinkedIn", async () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <Volunteer />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(await screen.findByRole("heading", { name: "Cuatro causas" })).toBeInTheDocument();
    for (const org of [
      "Fundación Belén Educa",
      "Observatorio de Derechos Humanos",
      "Centro de Estudios Antropológicos Comunitarios Valdivia",
      "TECHO-Chile",
    ]) {
      expect(screen.getByText(org)).toBeInTheDocument();
    }
    expect(screen.getByText(/Fundación SURA/)).toBeInTheDocument();
    expect(screen.getByText(/Constitución/)).toBeInTheDocument();
    const text = document.body.textContent ?? "";
    for (const noise of LINKEDIN_CHROME) {
      expect(text).not.toContain(noise);
    }
    expect(text).not.toMatch(/Actualmente voluntario/);
  });
});
