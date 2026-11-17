import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CasoPiece } from "@/casos/CasoView";
import { renderCasoHead } from "@/casos/caso-head";

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
    const todos = [...document.querySelectorAll('[data-todo="ro"]')];
    expect(todos).toHaveLength(6);
    expect(new Set(todos.map((node) => node.textContent))).toHaveLength(6);
    expect(document.body.innerHTML).not.toMatch(/alt="[^"]*\[TODO/);
    expect(document.body.textContent).not.toMatch(/edu[ _-]?21/i);
    expect(renderCasoHead("mobiliario-edu", "pitch-ventas")).toContain('content="noindex"');
    expect(renderCasoHead("mobiliario-edu")).toContain("index, follow");
    expect(renderCasoHead("transvip")).toContain('content="noindex"');
    expect(renderCasoHead("transvip", "app-reserva")).toContain('content="noindex"');
    expect(renderCasoHead("transvip", "system-design")).toContain('content="noindex"');
  });
});