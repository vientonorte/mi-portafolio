import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FIGMA_ASSETS } from "@/data/figma-assets-ssot";
import {
  RIA_US_PROTO_URL,
  TRANSVIP_APP_FIGMA_URL,
  TRANSVIP_APP_PROTO_URL,
  VALUESITE_AVEM_PROTO_URL,
} from "@/data/value-content-arsenal";
import { SOBRE_MI_FIGMA_LINKS } from "@/sobre-mi/figma-links";
import { SobreMiPublicPage } from "@/sobre-mi/SobreMiPublicPage";

describe("sobre-mi public ficha", () => {
  it("reuses the portfolio Figma URLs already on file", () => {
    const hrefs = SOBRE_MI_FIGMA_LINKS.map((link) => link.href);
    expect(hrefs).toEqual([
      TRANSVIP_APP_PROTO_URL,
      TRANSVIP_APP_FIGMA_URL,
      RIA_US_PROTO_URL,
      VALUESITE_AVEM_PROTO_URL,
      FIGMA_ASSETS.find((asset) => asset.id === "claro-tienda-2021")?.url,
      FIGMA_ASSETS.find((asset) => asset.id === "claro-portal-comercial")?.url,
    ]);
    expect(hrefs.every((href) => href?.startsWith("https://www.figma.com/"))).toBe(true);
  });

  it("renders the profile, the trajectory, and the prototype links", () => {
    render(<SobreMiPublicPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Sobre mí" })).toBeInTheDocument();
    expect(screen.getByText("Rodrigo Gaete")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Transvip Chile" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Havas Group Chile" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /App pasajeros Transvip/i })).toHaveAttribute(
      "href",
      TRANSVIP_APP_PROTO_URL
    );
    expect(document.body.innerHTML).not.toContain("/#/");
  });
});
