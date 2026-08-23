import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { About } from "@/components/organisms/About";
import { TrajectoryRail } from "@/components/organisms/TrajectoryRail";
import { LanguageProvider } from "@/lib/LanguageContext";

function wrap(ui: React.ReactNode) {
  return render(
    <MemoryRouter>
      <LanguageProvider>{ui}</LanguageProvider>
    </MemoryRouter>
  );
}

describe("VB-SOBRE-MI hero", () => {
  it("VB-1 title is UX Manager · Viento Norte, not current Lead UX SURA", () => {
    wrap(<About />);
    expect(screen.getAllByText("UX Manager · Viento Norte").length).toBeGreaterThan(0);
    expect(screen.queryByText("Lead UX · SURA")).not.toBeInTheDocument();
  });

  it("VB-2 SURA is past tense through Jun 2026", () => {
    wrap(<About />);
    expect(
      screen.getByText(/Antes: UX Lead SURA \(regional, hasta jun\. 2026\)/)
    ).toBeInTheDocument();
  });

  it("VB-3 and VB-4 expose 7+ years craft and 3+ lead chips", () => {
    wrap(<About />);
    expect(screen.getByText("7+ años")).toBeInTheDocument();
    expect(screen.getByText("3+ lead")).toBeInTheDocument();
  });

  it("VB-5 rail ends at Viento Norte now and marks SURA 23–26", () => {
    wrap(<TrajectoryRail />);
    expect(screen.getByText("Viento Norte")).toBeInTheDocument();
    expect(screen.getByText(/ahora · UX Manager n2n/)).toBeInTheDocument();
    expect(screen.getByText(/SURA 23–26/)).toBeInTheDocument();
  });
});
