import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Experience } from "@/components/organisms/Experience";
import { LanguageProvider } from "@/lib/LanguageContext";

describe("línea de tiempo · portada", () => {
  it("trata la foto con marco de marca y pie, sin recorte crudo", () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <Experience />
        </LanguageProvider>
      </MemoryRouter>
    );
    const row = screen
      .getAllByRole("button", { name: /Viento Norte/ })
      .find((button) => button.getAttribute("aria-expanded") != null);
    expect(row).toBeTruthy();
    fireEvent.click(row!);
    const still = screen.getByRole("img", { name: "Pieza de Viento Norte" });
    expect(still.className).toContain("experience-cover__image");
    expect(still.closest("figure")?.className).toContain("experience-cover");
    expect(screen.getByText("Viento Norte", { selector: "figcaption" })).toBeInTheDocument();
  });
});
