import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ResponsiveImage } from "@/components/atoms/ResponsiveImage";

describe("ResponsiveImage", () => {
  it("renders image with alt text", () => {
    render(
      <ResponsiveImage
        src="/test-image.png"
        alt="Proyecto SURA RIA"
        aspectRatio="16 / 9"
      />
    );
    expect(screen.getByRole("img", { name: "Proyecto SURA RIA" })).toBeInTheDocument();
  });

  it("shows error fallback when image fails to load", () => {
    render(<ResponsiveImage src="/broken.png" alt="Imagen rota" />);
    const img = screen.getByRole("img", { name: "Imagen rota" });
    fireEvent.error(img);
    expect(screen.getByRole("img", { name: "Imagen rota" })).toBeInTheDocument();
  });

  it("supports click handler for lightbox triggers", () => {
    let clicked = false;
    render(
      <ResponsiveImage
        src="/mockup.png"
        alt="Mockup"
        onClick={() => {
          clicked = true;
        }}
      />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(clicked).toBe(true);
  });
});