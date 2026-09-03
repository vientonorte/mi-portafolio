import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CalorVnStrip } from "@/components/organisms/CalorVnStrip";
import { LanguageProvider } from "@/lib/LanguageContext";
import { FIGMA_CALOR_VN } from "@/data/figma-calor";

function renderStrip() {
  return render(
    <LanguageProvider>
      <CalorVnStrip />
    </LanguageProvider>
  );
}

describe("CalorVnStrip", () => {
  it("renderiza cards link-out que abren Figma, sin iframe", async () => {
    const { container } = renderStrip();

    expect(await screen.findByRole("heading", { name: /Craft VN en Figma/i })).toBeInTheDocument();
    expect(screen.getByText("Calor VN")).toBeInTheDocument();
    expect(container.querySelector("iframe")).toBeNull();

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(FIGMA_CALOR_VN.length);

    for (const item of FIGMA_CALOR_VN) {
      const link = container.querySelector(`[data-figma-calor="${item.id}"]`);
      expect(link).not.toBeNull();
      expect(link).toHaveAttribute("href", item.shareUrl);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
    }
  });
});
