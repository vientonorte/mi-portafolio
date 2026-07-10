import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LiquidNavCta } from "@/components/atoms/LiquidNavCta";

describe("LiquidNavCta", () => {
  it("renders consultoria liquid glass CTA with brand mark layers", () => {
    render(<LiquidNavCta label="Consultoría ✦" onClick={() => {}} />);
    const btn = screen.getByRole("button", { name: "Consultoría ✦" });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute("data-liquid-cta", "consultoria");
    expect(btn.querySelector(".liquid-nav-cta__orb")).toBeTruthy();
    expect(btn.querySelector(".liquid-nav-cta__glass")).toBeTruthy();
    expect(btn.querySelector(".liquid-nav-cta__tint")).toBeTruthy();
    expect(btn.querySelector(".liquid-nav-cta__specular")).toBeTruthy();
    expect(btn.querySelector(".liquid-nav-cta__rim")).toBeTruthy();
    expect(btn.querySelector(".liquid-nav-cta__mark")).toBeTruthy();
    expect(btn.querySelector("svg.logo-mark")).toBeTruthy();
  });

  it("marks active state with aria-current", () => {
    render(<LiquidNavCta label="Consultoría ✦" active onClick={() => {}} />);
    expect(screen.getByRole("button", { name: "Consultoría ✦" })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("calls onClick when tapped", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<LiquidNavCta label="Consultoría ✦" onClick={onClick} />);
    await user.click(screen.getByRole("button", { name: "Consultoría ✦" }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
