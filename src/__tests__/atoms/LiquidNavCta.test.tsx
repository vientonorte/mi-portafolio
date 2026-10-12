import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LiquidNavCta } from "@/components/atoms/LiquidNavCta";

describe("LiquidNavCta", () => {
  it("renders readable brand mark with plate + text label (no lucide)", () => {
    render(<LiquidNavCta label="Consultoría" onClick={() => {}} />);
    const btn = screen.getByRole("button", { name: "Consultoría" });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute("data-liquid-cta", "consultoria");
    expect(btn.querySelector(".liquid-nav-cta__mark")).toBeTruthy();
    expect(btn.querySelector("svg.logo-mark")).toBeTruthy();
    expect(btn.querySelector(".logo-mark-plate")).toBeTruthy();
    expect(btn.querySelector(".liquid-nav-cta__halo")).toBeTruthy();
    /* No iconos Lucide en el CTA central */
    expect(btn.querySelector("svg:not(.logo-mark)")).toBeNull();
  });

  it("marks active state with aria-current", () => {
    render(<LiquidNavCta label="Consultoría" active onClick={() => {}} />);
    expect(screen.getByRole("button", { name: "Consultoría" })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("calls onClick when tapped", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<LiquidNavCta label="Consultoría" onClick={onClick} />);
    await user.click(screen.getByRole("button", { name: "Consultoría" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("S42: renders a real link when href is given (same data hooks, onClick still fires)", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn((e?: unknown) => {
      (e as Event | undefined)?.preventDefault?.();
    });
    render(
      <LiquidNavCta
        label="Empezar"
        ariaLabel="Empezar: web para tu pyme en 72 h"
        href="/servicios/#web-pymes"
        onClick={onClick}
      />
    );
    expect(screen.queryByRole("button")).toBeNull();
    const link = screen.getByRole("link", { name: "Empezar: web para tu pyme en 72 h" });
    expect(link).toHaveAttribute("href", "/servicios/#web-pymes");
    expect(link).toHaveAttribute("data-liquid-cta", "consultoria");
    expect(link.querySelector(".liquid-nav-cta__mark")).toBeTruthy();
    await user.click(link);
    expect(onClick).toHaveBeenCalledOnce();
  });
});
