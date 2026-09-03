import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Experience } from "@/components/organisms/Experience";
import { LanguageProvider } from "@/lib/LanguageContext";
import { figmaLinksForExperience } from "@/data/figma-assets-ssot";

function renderExperience() {
  return render(
    <MemoryRouter>
      <LanguageProvider>
        <Experience />
      </LanguageProvider>
    </MemoryRouter>
  );
}

describe("Experience figmaLinks", () => {
  it("muestra Abrir en Figma en la card Viento Norte (craft sin caso FO)", async () => {
    const user = userEvent.setup();
    const { container } = renderExperience();
    expect(await screen.findByText(/UX Manager/i)).toBeInTheDocument();

    const vnToggle = screen.getAllByRole("button").find((btn) =>
      (btn.getAttribute("aria-label") ?? btn.textContent ?? "").includes("Viento Norte")
    );
    expect(vnToggle).toBeTruthy();
    if (vnToggle?.getAttribute("aria-expanded") !== "true") {
      await user.click(vnToggle!);
    }

    const expected = figmaLinksForExperience("Viento Norte");
    const links = container.querySelectorAll('[data-experience-figma="Viento Norte"]');
    expect(links.length).toBe(expected.length);
    expect(Array.from(links).map((el) => el.getAttribute("href"))).toEqual(
      expected.map((l) => l.url)
    );
  });
});
