import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Skills } from "@/components/organisms/Skills";
import { LanguageProvider } from "@/lib/LanguageContext";

describe("flujo de mejora continua", () => {
  it("usa la superficie del tema, no un panel negro fijo", () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <Skills />
        </LanguageProvider>
      </MemoryRouter>
    );
    const flow = document.getElementById("flujo-mejora-continua");
    expect(flow).not.toBeNull();
    expect(flow?.className).toContain("bg-card");
    expect(flow?.className).toContain("text-card-foreground");
    expect(flow?.className).not.toContain("bg-zinc-950");
    expect(flow?.className).not.toContain("text-white");
    expect(screen.getByRole("heading", { name: "Flujo de Mejora Continua" })).toBeInTheDocument();
  });
});
