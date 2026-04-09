import { Hero } from "./components/organisms/Hero";
import { About } from "./components/organisms/About";
import { ImpactStats } from "./components/organisms/ImpactStats";
import { ProjectsHub } from "./components/organisms/ProjectsHub";
import { Experience } from "./components/organisms/Experience";
import { Contact } from "./components/organisms/Contact";
import { Navigation } from "./components/organisms/Navigation";
import { ScrollProgress } from "./components/atoms/ScrollProgress";
import DesignSystem from "./pages/DesignSystem";
import CaseStudies from "./pages/CaseStudies";
import ProcessDetail from "./pages/ProcessDetail";
import CompanyDetail from "./pages/CompanyDetail";
import ProjectDetail from "./pages/ProjectDetail";
import { FrameworkDetailPage } from "./components/organisms/FrameworkDetailPage";
import { NotFound } from "./components/organisms/NotFound";
import { suraHub, transvipHub } from "./data/projects-data";
import { karriCalculadoraProject, karriNotificacionesProject, karriDesignSprintProject } from "./data/karri-projects";
import { LanguageProvider, useLanguage } from "./lib/LanguageContext";
import { Toaster } from "./components/ui/sonner";
import { useState } from "react";

// Wrapper component to access language context
function FrameworkWrapper({ onClose }: { onClose: () => void }) {
  const { language } = useLanguage();
  return <FrameworkDetailPage lang={language} onClose={onClose} />;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<"portfolio" | "design-system" | "case-studies" | string>("portfolio");

  // Skip to main content component for accessibility
  const SkipToMain = () => (
    <a 
      href="#main-content" 
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      Skip to main content
    </a>
  );

  if (currentPage === "design-system") {
    return (
      <LanguageProvider>
        <SkipToMain />
        <DesignSystem onBack={() => setCurrentPage("portfolio")} />
        <Toaster position="top-center" />
      </LanguageProvider>
    );
  }

  if (currentPage === "case-studies") {
    return (
      <LanguageProvider>
        <SkipToMain />
        <CaseStudies 
          onBack={() => setCurrentPage("portfolio")}
          onNavigateToProcess={(processId) => setCurrentPage(`process-${processId}`)}
        />
        <Toaster position="top-center" />
      </LanguageProvider>
    );
  }

  // Process detail pages
  if (currentPage.startsWith("process-")) {
    const processId = currentPage.replace("process-", "");
    return (
      <LanguageProvider>
        <SkipToMain />
        <ProcessDetail 
          processId={processId}
          onBack={() => setCurrentPage("case-studies")}
          onNavigateToPortfolio={() => setCurrentPage("portfolio")}
        />
        <Toaster position="top-center" />
      </LanguageProvider>
    );
  }

  // Company detail pages
  if (currentPage.startsWith("company-")) {
    const companyId = currentPage.replace("company-", "");
    
    // Map company IDs to their data
    const companyMap: Record<string, any> = {
      "transvip": transvipHub,
      "sura": suraHub,
    };
    
    const companyData = companyMap[companyId];
    
    if (companyData) {
      return (
        <LanguageProvider>
          <SkipToMain />
          <CompanyDetail 
            company={companyData}
            onBack={() => setCurrentPage("portfolio")}
            onNavigateToProcess={(processId) => setCurrentPage(`process-${processId}`)}
            onNavigateToProject={(projectId) => setCurrentPage(`project-${projectId}`)}
          />
          <Toaster position="top-center" />
        </LanguageProvider>
      );
    }
    
    // Company not found - show 404
    return (
      <LanguageProvider>
        <SkipToMain />
        <NotFound 
          onBack={() => setCurrentPage("portfolio")}
          onHome={() => setCurrentPage("portfolio")}
        />
        <Toaster position="top-center" />
      </LanguageProvider>
    );
  }

  // Project detail pages
  if (currentPage.startsWith("project-")) {
    const projectId = currentPage.replace("project-", "");
    
    // Framework Detail Page
    if (projectId === "framework") {
      return (
        <LanguageProvider>
          <SkipToMain />
          <FrameworkWrapper onClose={() => setCurrentPage("portfolio")} />
          <Toaster position="top-center" />
        </LanguageProvider>
      );
    }
    
    // Map project IDs to their data and parent company
    const projectMap: Record<string, { data: any; parentCompany: string }> = {
      // Transvip Projects
      "karri-calculadora": { 
        data: karriCalculadoraProject, 
        parentCompany: "transvip" 
      },
      "karri-notificaciones": { 
        data: karriNotificacionesProject, 
        parentCompany: "transvip" 
      },
      "karri-design-sprint": { 
        data: karriDesignSprintProject, 
        parentCompany: "transvip" 
      },
      "transvip-app-premium": {
        data: transvipHub.projects[0],
        parentCompany: "transvip"
      },
      // SURA Projects
      "sura-ux-enterprise": {
        data: suraHub.projects[0],
        parentCompany: "sura-investments"
      },
      "sura-inversiones-dashboard": {
        data: suraHub.projects[1],
        parentCompany: "sura-investments"
      },
      "sura-ecosistema-digital": {
        data: suraHub.projects[2],
        parentCompany: "sura-investments"
      },
      "sura-ria-us": {
        data: suraHub.projects[3],
        parentCompany: "sura-investments"
      },
    };
    
    const projectInfo = projectMap[projectId];
    
    if (projectInfo) {
      return (
        <LanguageProvider>
          <SkipToMain />
          <ProjectDetail 
            project={projectInfo.data}
            onBack={() => setCurrentPage("portfolio")}
            onBackToCompany={() => setCurrentPage(`company-${projectInfo.parentCompany}`)}
            onNavigateToProcess={(processId) => setCurrentPage(`process-${processId}`)}
          />
          <Toaster position="top-center" />
        </LanguageProvider>
      );
    }
    
    // Project not found - show 404
    return (
      <LanguageProvider>
        <SkipToMain />
        <NotFound 
          onBack={() => setCurrentPage("portfolio")}
          onHome={() => setCurrentPage("portfolio")}
        />
        <Toaster position="top-center" />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <SkipToMain />
      <div className="min-h-screen bg-background">
        <ScrollProgress />
        <Navigation 
          onNavigateToDesignSystem={() => setCurrentPage("design-system")}
          onNavigateToCaseStudies={() => setCurrentPage("case-studies")}
        />
        
        <main id="main-content">
          <Hero 
            onNavigateToDesignSystem={() => setCurrentPage("design-system")}
            onNavigateToCaseStudies={() => setCurrentPage("case-studies")}
          />
          <About />
          <ImpactStats />
          <ProjectsHub 
            onNavigateToCaseStudies={() => setCurrentPage("case-studies")}
            onNavigateToCompany={(companyId) => setCurrentPage(`company-${companyId}`)}
            onNavigateToProject={(projectId) => setCurrentPage(`project-${projectId}`)}
          />
          <Experience />
          <Contact />
        </main>
      </div>
      
      <Toaster position="top-center" />
    </LanguageProvider>
  );
}