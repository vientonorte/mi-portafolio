import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NavDock } from "@/components/organisms/NavDock";
import { LanguageProvider } from "@/lib/LanguageContext";

function renderDock(path: string) {
  return render(
    <LanguageProvider>
      <MemoryRouter initialEntries={[path]}>
        <NavDock variant="home" />
      </MemoryRouter>
    </LanguageProvider>
  );
}

describe("NavDock · S42 CTA central (PO 5-oct)", () => {
  it("home: «Empezar» is a real link to /servicios/#web-pymes (3 slots, no layout change)", () => {
    const { container } = renderDock("/");
    const cta = container.querySelector("[data-liquid-cta]") as HTMLElement;
    expect(cta.tagName).toBe("A");
    expect(cta).toHaveAttribute("href", "/servicios/#web-pymes");
    expect(within(cta).getByText("Empezar")).toBeInTheDocument();
    expect(cta.getAttribute("href")).not.toMatch(/\/#\/|\/s\//);
    expect(container.querySelectorAll("[data-liquid-cta]")).toHaveLength(1);
    expect(screen.getAllByRole("link").length + screen.queryAllByRole("button").length).toBe(3);
  });

  it("deep routes: center «Consultoría» stays secondary → /servicios/#consultoria-ux", () => {
    const { container } = renderDock("/proceso");
    const cta = container.querySelector("[data-liquid-cta]") as HTMLElement;
    expect(cta.tagName).toBe("A");
    expect(cta).toHaveAttribute("href", "/servicios/#consultoria-ux");
    expect(within(cta).getByText("Consultoría")).toBeInTheDocument();
  });
});
