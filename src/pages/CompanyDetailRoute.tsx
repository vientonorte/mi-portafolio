import { useNavigate, useParams } from "react-router-dom";
import CompanyDetail from "./CompanyDetail";
import { NotFoundPage } from "../components/layout/NotFoundPage";
import { getCompanyById } from "../data/project-registry";
import { useLanguage } from "../lib/LanguageContext";
import { useTranslation } from "../lib/i18n";
import { ROUTES } from "../lib/routes";

export default function CompanyDetailRoute() {
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const company = getCompanyById(companyId || "");

  if (!company) {
    return (
      <NotFoundPage
        message={t.errors.companyNotFound}
        backLabel={t.errors.backToProjects}
        onBack={() => navigate(ROUTES.projects)}
        crumbLabel={t.breadcrumbs.notFound}
      />
    );
  }

  return (
    <CompanyDetail
      company={company}
      onBack={() => navigate(ROUTES.projects)}
      onNavigateToProject={(id) => navigate(ROUTES.project(id))}
      onNavigateToProcess={(id) => navigate(ROUTES.processPhase(id))}
    />
  );
}