import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ProjectDetail from "./ProjectDetail";
import { NotFoundPage } from "../components/layout/NotFoundPage";
import { cleanUrlForHashProject, withSiteBase } from "../data/casos";
import { getProjectById } from "../data/project-registry";
import { useLanguage } from "../lib/LanguageContext";
import { useTranslation } from "../lib/i18n";
import { ROUTES } from "../lib/routes";

function CleanUrlRedirect({ path }: { path: string }) {
  useEffect(() => {
    const search = window.location.search || "";
    window.location.replace(`${withSiteBase(path)}${search}`);
  }, [path]);
  return null;
}

export default function ProjectDetailRoute() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);

  if (projectId === "framework") {
    return <Navigate to="/framework" replace />;
  }

  const clean = cleanUrlForHashProject(projectId || "");
  if (clean) return <CleanUrlRedirect path={clean} />;

  const result = getProjectById(projectId || "");

  if (!result) {
    return (
      <NotFoundPage
        message={t.errors.projectNotFound}
        backLabel={t.errors.backToProjects}
        onBack={() => navigate(ROUTES.projects)}
        crumbLabel={t.breadcrumbs.notFound}
      />
    );
  }

  return (
    <ProjectDetail
      project={result.project}
      companyName={result.companyName}
      onBack={() => navigate(ROUTES.projects)}
      onBackToCompany={() =>
        result.companyId ? navigate(ROUTES.company(result.companyId)) : navigate(ROUTES.projects)
      }
      onNavigateToProcess={(id) => navigate(ROUTES.processPhase(id))}
    />
  );
}