import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroResultCard } from "@/components/atoms/HeroResultCard";

describe("HeroResultCard", () => {
  it("renders metric, description and accessible company label", () => {
    render(
      <HeroResultCard
        metric="−40%"
        description="abandono en onboarding"
        company="SURA Investments"
      />
    );
    expect(screen.getByText("−40%")).toBeInTheDocument();
    expect(screen.getByText("abandono en onboarding")).toBeInTheDocument();
    expect(screen.getByText("SURA Investments")).toHaveClass("sr-only");
    expect(screen.getByRole("img", { name: "SURA Investments logo" })).toBeInTheDocument();
  });
});