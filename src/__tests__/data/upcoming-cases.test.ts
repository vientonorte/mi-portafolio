import { describe, expect, it } from "vitest";
import { upcomingCases } from "@/data/upcoming-cases";
import { figmaLinksForCase } from "@/data/figma-assets-ssot";

describe("upcoming-cases", () => {
  it("expone imágenes FO solo en havas-claro; IBM/Walmart sin visual inventado", () => {
    const byId = Object.fromEntries(upcomingCases.map((item) => [item.id, item]));
    expect(byId["havas-claro"]).toBeTruthy();
    expect(byId["havas-claro"]?.figmaLinks).toBeUndefined();
    expect(byId["havas-claro"]?.images).toEqual([
      "/images/vn-assets/claro-tienda-comparar.png",
      "/images/vn-assets/claro-portal-carrito.png",
      "/images/vn-assets/claro-portal-mobile.jpg",
    ]);

    expect(figmaLinksForCase("havas-claro")).toEqual([]);
    expect(figmaLinksForCase("ibm-portal")).toEqual([]);
    expect(figmaLinksForCase("walmart-chile")).toEqual([]);
    expect(byId["ibm-portal"]?.images).toBeUndefined();
    expect(byId["walmart-chile"]?.images).toBeUndefined();
  });

  it("marca IBM independiente como Viento Norte, no Freelance", () => {
    const ibm = upcomingCases.find((item) => item.id === "ibm-portal");
    expect(ibm?.period).toBe("Viento Norte");
    expect(ibm?.period).not.toMatch(/Freelance/i);
  });
});
