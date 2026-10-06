import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Micro1ToolEvidence } from "@/components/organisms/Micro1ToolEvidence";
import { LanguageProvider } from "@/lib/LanguageContext";

function wrap(ui: React.ReactNode) {
  return render(
    <MemoryRouter>
      <LanguageProvider>{ui}</LanguageProvider>
    </MemoryRouter>
  );
}

describe("micro1 detalle", () => {
  it("deja pasos y handoff dentro de Ver el detalle, con el nombre una sola vez", () => {
    wrap(<Micro1ToolEvidence />);
    expect(
      screen.getByText("Captura remota, anotación y QA de grabación en proyectos AAA (EE.UU.).")
    ).toBeInTheDocument();
    expect(screen.getAllByText("Captura de datos remota")).toHaveLength(1);
    expect(screen.getAllByText("Anotación")).toHaveLength(1);
    expect(screen.getAllByText("QA de grabación")).toHaveLength(1);
    const details = screen.getAllByText("Ver el detalle");
    expect(details).toHaveLength(3);
    for (const summary of details) {
      expect(summary.closest("details")?.open).toBe(false);
    }
    expect(
      screen.getByText("Handoff con sello de QA o ticket de re-captura")
    ).toBeInTheDocument();
  });
});
