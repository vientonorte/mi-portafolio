import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
    expect(transvipPremium?.details.mockups).toContain(
      "/images/vn-assets/transvip-system-design.png"
    );
    expect(transvipPremium?.details.mockups?.length).toBeGreaterThan(1);

    const user = userEvent.setup();
    const { container } = renderProject(transvipPremium!);
    expect(
      await screen.findByRole("heading", { level: 1, name: /Rediseño App Pasajeros Premium/i })
    ).toBeInTheDocument();

    const more = screen.queryByRole("button", { name: /capturas más/i });
    if (more) {
      await user.click(more);
    }

    const markup = container.innerHTML;
    expect(markup).toContain("transvip-system-design.png");
    expect(screen.queryByText(/Abrir en Figma/i)).toBeNull();
    expect(container.querySelector("[data-project-figma]")).toBeNull();
  });

  it("no muestra CTA Figma ni inventa visual en UX Enterprise", () => {
    const { container } = renderProject(suraEnterprise);
    expect(container.querySelector("[data-project-figma]")).toBeNull();
    expect(screen.queryByText(/Abrir en Figma/i)).toBeNull();
  });
});
