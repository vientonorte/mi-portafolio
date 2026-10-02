import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { QaEnvBanner } from "@/components/molecules/QaEnvBanner";

afterEach(() => {
  cleanup();
  window.history.replaceState(null, "", "/");
});

describe("QaEnvBanner", () => {
  it("en /qa/ muestra el banner y «prod» va a la home (/), sin ruta hash", () => {
    window.history.replaceState(null, "", "/qa/servicios/");
    render(<QaEnvBanner />);
    const prod = screen.getByRole("link", { name: "prod" });
    expect(prod.getAttribute("href")).toBe("/");
    for (const a of document.querySelectorAll("a")) expect(a.getAttribute("href") ?? "").not.toContain("#");
  });

  it("fuera de QA no se renderiza", () => {
    window.history.replaceState(null, "", "/servicios/");
    const { container } = render(<QaEnvBanner />);
    expect(container.innerHTML).toBe("");
  });
});
