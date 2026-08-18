import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SurfaceCards } from "@/components/admin/SurfaceCards";
import { FINANZAS_URL, P0_WRANGLER } from "@/lib/admin-surfaces";

describe("SurfaceCards", () => {
  it("shows stale badge, updated, P0 wrangler, and opens a new tab (no iframe)", () => {
    const { container } = render(
      <SurfaceCards
        finanzas={{
          updated: "2026-08-13T20:40:00-04:00",
          stale: true,
          evidence: "2026-08-13T20:40:00-04:00",
        }}
        contact={{ ok: true, evidence: "ok" }}
      />
    );

    expect(screen.getByText("stale")).toBeInTheDocument();
    expect(screen.getByText("2026-08-13T20:40:00-04:00")).toBeInTheDocument();
    expect(screen.getByText(P0_WRANGLER)).toBeInTheDocument();

    const finanzas = screen.getByRole("link", { name: /finanzas\.vientonorte\.io/i });
    expect(finanzas).toHaveAttribute("href", FINANZAS_URL);
    expect(finanzas).toHaveAttribute("target", "_blank");
    expect(finanzas).toHaveAttribute("rel", expect.stringContaining("noopener"));
    expect(container.querySelector("iframe")).toBeNull();
  });

  it("hides P0 when updated matches Calendar", () => {
    render(
      <SurfaceCards
        finanzas={{
          updated: "2026-08-18T09:00:00-04:00",
          stale: false,
          evidence: "2026-08-18T09:00:00-04:00",
        }}
        contact={{ ok: true, evidence: "ok" }}
      />
    );
    expect(screen.getAllByText("ok").length).toBeGreaterThan(0);
    expect(screen.queryByText(P0_WRANGLER)).not.toBeInTheDocument();
  });
});
