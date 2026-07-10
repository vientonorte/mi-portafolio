import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Sparkles } from "lucide-react";
import { LiquidNavCta } from "@/components/atoms/LiquidNavCta";

describe("LiquidNavCta", () => {
  it("renders consultoria liquid CTA", () => {
    render(
      <LiquidNavCta icon={Sparkles} label="Consultoría ✦" onClick={() => {}} />
    );
    const btn = screen.getByRole("button", { name: "Consultoría ✦" });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute("data-liquid-cta", "consultoria");
  });

  it("marks active state with aria-current", () => {
    render(
      <LiquidNavCta
        icon={Sparkles}
        label="Consultoría ✦"
        active
        onClick={() => {}}
      />
    );
    expect(screen.getByRole("button", { name: "Consultoría ✦" })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("calls onClick when tapped", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <LiquidNavCta icon={Sparkles} label="Consultoría ✦" onClick={onClick} />
    );
    await user.click(screen.getByRole("button", { name: "Consultoría ✦" }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
