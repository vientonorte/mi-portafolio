import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Experience } from "@/components/organisms/Experience";
import { LanguageProvider } from "@/lib/LanguageContext";

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
  it("no muestra Abrir en Figma en la card Viento Norte", async () => {
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

    expect(screen.queryByText(/Abrir en Figma/i)).toBeNull();
    expect(container.querySelector("[data-experience-figma]")).toBeNull();
  });
});
