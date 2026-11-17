import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CleanUrlRedirect } from "@/pages/CleanUrlRedirect";

describe("CleanUrlRedirect", () => {
  it("anuncia la redirección y enlaza la URL limpia", () => {
    render(<CleanUrlRedirect path="/casos/mobiliario-edu/" />);
    expect(screen.getByRole("status")).toHaveTextContent("Redirigiendo…");
    expect(screen.getByRole("link", { name: "Continuar" })).toHaveAttribute("href", "/casos/mobiliario-edu/");
  });
});
