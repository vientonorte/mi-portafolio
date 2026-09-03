import { describe, expect, it } from "vitest";
import { upcomingCases } from "@/data/upcoming-cases";

describe("upcoming-cases", () => {
  it("expone figmaLinks solo en havas-claro (archivo Claro, no calor VN)", () => {
    const byId = Object.fromEntries(upcomingCases.map((item) => [item.id, item]));
    const claro = byId["havas-claro"];
    expect(claro?.figmaLinks).toHaveLength(2);
    expect(claro?.figmaLinks?.map((link) => link.url)).toEqual([
      "https://www.figma.com/design/lrMqvUERZjDwTwZpQRBSC5/Tienda-Claro-2021",
      "https://www.figma.com/design/D39xjsA7ObbhntcDEyPWQG/Portal-Comercial-Claro",
    ]);
    expect(claro?.figmaLinks?.some((link) => link.url.includes("CBguM4Y5rIvc9TV5pGhOxL"))).toBe(
      false
    );
    expect(byId["ibm-portal"]?.figmaLinks).toBeUndefined();
    expect(byId["walmart-chile"]?.figmaLinks).toBeUndefined();
  });

  it("marca IBM independiente como Viento Norte, no Freelance", () => {
    const ibm = upcomingCases.find((item) => item.id === "ibm-portal");
    expect(ibm?.period).toBe("Viento Norte");
    expect(ibm?.period).not.toMatch(/Freelance/i);
  });
});
