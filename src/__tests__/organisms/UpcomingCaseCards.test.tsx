import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { UpcomingCaseCards } from "@/components/organisms/UpcomingCaseCards";
import { LanguageProvider } from "@/lib/LanguageContext";
import { figmaLinksForCase } from "@/data/figma-assets-ssot";

function renderCards() {
  return render(
    <LanguageProvider>
      <UpcomingCaseCards />
    </LanguageProvider>
  );
}

describe("UpcomingCaseCards", () => {
  it("muestra Abrir en Figma solo en havas-claro, sin iframe ni MASCOTAPP", async () => {
    const { container } = renderCards();

    expect(await screen.findByRole("heading", { name: /Casos en preparación/i })).toBeInTheDocument();
    expect(screen.getByText("Viento Norte")).toBeInTheDocument();
    expect(container.querySelector("iframe")).toBeNull();

    const claroLinks = container.querySelectorAll('[data-upcoming-figma="havas-claro"]');
    expect(claroLinks).toHaveLength(2);
    const hrefs = Array.from(claroLinks).map((el) => el.getAttribute("href"));
    expect(hrefs).toEqual(figmaLinksForCase("havas-claro").map((l) => l.url));
    expect(hrefs.join(" ")).not.toContain("CBguM4Y5rIvc9TV5pGhOxL");

    expect(container.querySelector('[data-upcoming-figma="ibm-portal"]')).toBeNull();
    expect(screen.getAllByText(/Abrir en Figma/i).length).toBe(2);
  });
});
