import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProjectDetail from "@/pages/ProjectDetail";
import { LanguageProvider } from "@/lib/LanguageContext";
import { figmaLinksForCase } from "@/data/figma-assets-ssot";

const suraDashboard = {
  id: "sura-inversiones-dashboard",
  company: "SURA Investments",
  role: "Lead UX",
  period: "2023 - 2024",
  projectName: "Rediseño Plataforma de Inversiones Digital",
  description: "Dashboards de inversiones.",
  tags: ["Dashboard Design"],
  details: { challenge: "C", solution: "S" },
};

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

function renderProject(project: typeof suraDashboard) {
  return render(
    <MemoryRouter>
      <LanguageProvider>
        <ProjectDetail
          project={project}
          companyName={project.company}
          onBack={() => undefined}
          onBackToCompany={() => undefined}
        />
      </LanguageProvider>
    </MemoryRouter>
  );
}

describe("ProjectDetail figmaLinks", () => {
  it("muestra Abrir en Figma en un caso SURA derivado del SSOT", async () => {
    const { container } = renderProject(suraDashboard);
    const expected = figmaLinksForCase("sura-inversiones-dashboard");
    expect(expected.length).toBeGreaterThan(0);

    expect(
      await screen.findByRole("heading", { name: /Rediseño Plataforma de Inversiones Digital/i })
    ).toBeInTheDocument();

    const links = container.querySelectorAll('[data-project-figma="sura-inversiones-dashboard"]');
    expect(links).toHaveLength(expected.length);
    expect(Array.from(links).map((el) => el.getAttribute("href"))).toEqual(
      expected.map((l) => l.url)
    );
    expect(screen.getAllByText(/Abrir en Figma/i).length).toBe(expected.length);
  });

  it("no duplica slides tutoría como link-out en UX Enterprise", () => {
    const { container } = renderProject(suraEnterprise);
    expect(container.querySelector('[data-project-figma="sura-ux-enterprise"]')).toBeNull();
  });
});
