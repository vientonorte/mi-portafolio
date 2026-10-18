import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroResultCard } from "@/components/atoms/HeroResultCard";

describe("HeroResultCard", () => {
  it("renders metric, description and accessible company label", () => {
    render(
      <HeroResultCard
        metric="7–11 min"
        description="onboarding de clientes"
        company="SURA Investments"
      />
    );
    expect(screen.getByText("7–11 min")).toBeInTheDocument();
    expect(screen.getByText("onboarding de clientes")).toBeInTheDocument();
    expect(screen.getByText("SURA Investments")).toHaveClass("sr-only");
    expect(screen.getByRole("img", { name: "SURA Investments logo" })).toBeInTheDocument();
  });
});