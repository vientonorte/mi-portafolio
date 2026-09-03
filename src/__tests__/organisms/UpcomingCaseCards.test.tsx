import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { UpcomingCaseCards } from "@/components/organisms/UpcomingCaseCards";
import { LanguageProvider } from "@/lib/LanguageContext";
import { upcomingCases } from "@/data/upcoming-cases";

function renderCards() {
  return render(
    <LanguageProvider>
      <UpcomingCaseCards />
    </LanguageProvider>
  );
}

describe("UpcomingCaseCards", () => {
  it("muestra imágenes Claro en havas-claro, sin CTA Figma ni visual IBM inventado", async () => {
    const { container } = renderCards();

    expect(await screen.findByRole("heading", { name: /Casos en preparación/i })).toBeInTheDocument();
    expect(screen.getByText("Viento Norte")).toBeInTheDocument();
    expect(container.querySelector("iframe")).toBeNull();
    expect(screen.queryByText(/Abrir en Figma/i)).toBeNull();
    expect(container.querySelector("[data-upcoming-figma]")).toBeNull();

    const claro = upcomingCases.find((item) => item.id === "havas-claro");
    expect(claro?.images).toEqual([
      "/images/vn-assets/claro-tienda-comparar.png",
      "/images/vn-assets/claro-portal-carrito.png",
      "/images/vn-assets/claro-portal-mobile.jpg",
    ]);

    const claroImgs = container.querySelectorAll('[data-upcoming-image="havas-claro"]');
    expect(claroImgs).toHaveLength(3);
    const hrefLike = Array.from(claroImgs).map((el) => el.getAttribute("src"));
    expect(hrefLike).toEqual(claro?.images);
    expect(hrefLike.join(" ")).not.toContain("CBguM4Y5rIvc9TV5pGhOxL");

    expect(container.querySelector('[data-upcoming-image="ibm-portal"]')).toBeNull();
    expect(container.querySelector('[data-upcoming-image="walmart-chile"]')).toBeNull();
    expect(upcomingCases.find((item) => item.id === "ibm-portal")?.images).toBeUndefined();
  });
});
