import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CasoPiece } from "@/casos/CasoView";
import { todoMarkers } from "@/data/casos";

describe("casos nivel 3 · página", () => {
  it("muestra la ficha, 5 láminas y los [TODO Rö] visibles", () => {
    render(<CasoPiece casoSlug="mobiliario-edu" pieceSlug="pitch-ventas" />);
    expect(screen.getByRole("heading", { level: 1, name: "Pitch de ventas y simulación" })).toBeInTheDocument();
    expect(screen.getByText("Service UX Designer")).toBeInTheDocument();
    expect(screen.getAllByText("2023").length).toBeGreaterThan(0);
    const headings = screen.getAllByRole("heading", { level: 2 }).map((node) => node.textContent);
    expect(headings).toEqual(expect.arrayContaining(["Ficha", "Contexto", "Proceso", "Selección", "Hallazgos"]));
    expect(document.querySelectorAll("[data-slide]")).toHaveLength(5);
    expect(screen.getAllByRole("link", { name: "Volver al caso" })[0]).toHaveAttribute("href", "/casos/mobiliario-edu/");
    const markers = todoMarkers(document.body.textContent ?? "");
    expect(markers.length).toBeGreaterThanOrEqual(4);
    expect(document.body.textContent).not.toMatch(/edu[ _-]?21/i);
  });
});