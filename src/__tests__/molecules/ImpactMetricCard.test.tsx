import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ImpactMetricCard } from "@/components/molecules/ImpactMetricCard";
import { TrendingUp } from "lucide-react";

const baseProps = {
  value: "+30%",
  label: "Conversión",
  description: "Checkout optimizado",
  spoiler: "Detalle del impacto medido",
  phase: "Fase 2",
  company: "SURA",
  processId: "sura-checkout",
  icon: TrendingUp,
  valueColor: "text-stat-tint-blue",
  iconBg: "bg-stat-tint-blue",
  viewPhaseLabel: "Ver fase",
  tapHint: "Toca para ver detalle",
  tapNavigate: "Toca para ir a la fase",
  expanded: false,
  href: "#/proceso/sura-checkout",
  onActivate: vi.fn(),
};

describe("ImpactMetricCard", () => {
  it("renders metric content and spoiler", () => {
    render(<ImpactMetricCard {...baseProps} />);
    expect(screen.getByText("+30%")).toBeInTheDocument();
    expect(screen.getByText("Conversión")).toBeInTheDocument();
    expect(screen.getByText("Detalle del impacto medido")).toBeInTheDocument();
  });

  it("activates on click and keyboard", () => {
    const onActivate = vi.fn();
    render(<ImpactMetricCard {...baseProps} onActivate={onActivate} />);
    const link = screen.getByRole("link", { name: /Conversión/i });

    fireEvent.click(link);
    expect(onActivate).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(link, { key: " " });
    expect(onActivate).toHaveBeenCalledTimes(2);

    fireEvent.keyDown(link, { key: "Enter" });
    expect(onActivate).toHaveBeenCalledTimes(3);
  });

  it("reflects expanded state for assistive tech", () => {
    render(<ImpactMetricCard {...baseProps} expanded />);
    expect(screen.getByRole("link", { name: /Conversión/i })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
  });
});