import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProjectDetail from "@/pages/ProjectDetail";
import { LanguageProvider } from "@/lib/LanguageContext";
import { transvipHub } from "@/data/projects-data";

const transvipPremium = transvipHub.projects.find((p) => p.id === "transvip-app-premium");

const suraEnterprise = {
  id: "sura-ux-enterprise",
  company: "SURA Investments",
  role: "Lead UX",
  period: "2023",
  projectName: "Implementación UX Enterprise Regional",
  description: "Framework regional.",
  tags: ["Enterprise"],
  details: { challenge: "C", solution: "S" },
};

function renderProject(project: { id?: string; company: string; projectName: string }) {
  return render(
    <MemoryRouter>
      <LanguageProvider>
        <ProjectDetail
          project={project as never}
          companyName={project.company}
          onBack={() => undefined}
          onBackToCompany={() => undefined}
        />
      </LanguageProvider>
    </MemoryRouter>
  );
}

describe("ProjectDetail figma assets as FO images", () => {
  it("muestra el board System Design entre mockups Transvip y no Abrir en Figma", async () => {
    expect(transvipPremium).toBeTruthy();
    const mockups = transvipPremium?.details.mockups ?? [];
    expect(mockups).toContain("/images/vn-assets/transvip-system-design.png");
    expect(mockups.join(" ")).not.toMatch(/product-vision/);
    expect(mockups.some((src) => src.includes("booking-flowchart"))).toBe(true);
    expect(mockups.some((src) => src.includes("hotjar-dashboard"))).toBe(true);
    expect(mockups.some((src) => src.includes("analytics-ga4"))).toBe(true);
    expect(mockups.length).toBeGreaterThan(1);

    const { container } = renderProject(transvipPremium!);
    expect(
      await screen.findByRole("heading", { level: 1, name: /Rediseño App Pasajeros Premium/i })
    ).toBeInTheDocument();

    expect(screen.queryByRole("button", { name: /capturas más/i })).toBeNull();

    const markup = container.innerHTML;
    expect(markup).toContain("transvip-system-design.png");
    expect(markup).toContain("booking-flowchart");
    expect(markup).toContain("hotjar-dashboard");
    expect(markup).toContain("analytics-ga4");
    expect(markup).not.toContain("product-vision");
    expect(screen.queryByText(/Abrir en Figma/i)).toBeNull();
    expect(container.querySelector("[data-project-figma]")).toBeNull();
  });

  it("no muestra CTA Figma ni inventa visual en UX Enterprise", () => {
    const { container } = renderProject(suraEnterprise);
    expect(container.querySelector("[data-project-figma]")).toBeNull();
    expect(screen.queryByText(/Abrir en Figma/i)).toBeNull();
  });
});
