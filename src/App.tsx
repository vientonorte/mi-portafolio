import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
import { LanguageProvider } from './lib/LanguageContext';
import { AnalyticsProvider } from './vn-core/analytics/react';
import { analyticsConfig } from './vn-core/analytics/config';
import { Navigation } from './components/organisms/Navigation';
import Footer from './components/Footer';
import { BottomNav } from './components/molecules/BottomNav';
import { DeepPageNav } from './components/molecules/DeepPageNav';
import { PageSkeleton } from './components/molecules/SkeletonLoaders';
import { getCompanyById, getProjectById } from './data/project-registry';
import { ImageManifestProvider } from './lib/ImageManifestProvider';
import { PortfolioChrome } from './components/layout/PortfolioChrome';
import { NotFoundPage } from './components/layout/NotFoundPage';
import { isDeepPortfolioPage } from './lib/page-depth';
import { ROUTES } from './lib/routes';
import { useLanguage } from './lib/LanguageContext';
import { useTranslation } from './lib/i18n';
import Home from './pages/Home';

// Lazy load secondary pages for better performance
const Proyectos = lazy(() => import('./pages/Proyectos'));
const AutosuggestFondos = lazy(() => import('./pages/AutosuggestFondos'));
const SobreMi = lazy(() => import('./pages/SobreMi'));
const Contacto = lazy(() => import('./pages/Contacto'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Grafo = lazy(() => import('./pages/Grafo'));
const DesignSystem = lazy(() => import('./pages/DesignSystem'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const AuditoriaPortfolio = lazy(() => import('./pages/AuditoriaPortfolio'));
const ProcessDetail = lazy(() => import('./pages/ProcessDetail'));
const CompanyDetail = lazy(() => import('./pages/CompanyDetail'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const AdminPhotos = lazy(() => import('./pages/AdminPhotos'));
const FrameworkDetail = lazy(() => import('./pages/FrameworkDetail'));

function LegacyCasesProcessRedirect() {
  const { processId } = useParams<{ processId: string }>();
  return <Navigate to={ROUTES.processPhase(processId || '')} replace />;
}

function RouterNavigation() {
  const navigate = useNavigate();
  return (
    <Navigation
      onNavigateToDesignSystem={() => navigate(ROUTES.designSystem)}
      onNavigateToCaseStudies={() => navigate(ROUTES.process)}
      onNavigateToAuditoria={() => navigate('/auditoria')}
    />
  );
}

function DesignSystemPage() {
  return <DesignSystem />;
}

function CaseStudiesPage() {
  const navigate = useNavigate();
  return (
    <CaseStudies
      onBack={() => navigate(ROUTES.projects)}
      onNavigateToProcess={(id) => navigate(ROUTES.processPhase(id))}
      onNavigateToFramework={() => navigate('/framework')}
      onNavigateToProject={(id) => navigate(ROUTES.project(id))}
    />
  );
}

function ProcessDetailPage() {
  const { processId } = useParams<{ processId: string }>();
  const navigate = useNavigate();
  return (
    <ProcessDetail
      processId={processId || ''}
      onBack={() => navigate(ROUTES.process)}
      onNavigateToPortfolio={() => navigate(ROUTES.home)}
      onNavigateToProject={(id) => navigate(ROUTES.project(id))}
    />
  );
}

function CompanyDetailPage() {
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const company = getCompanyById(companyId || '');

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

function FrameworkDetailPage() {
  const navigate = useNavigate();
  return (
    <FrameworkDetail
      onBack={() => navigate(ROUTES.process)}
      onNavigateToProject={(id) => navigate(ROUTES.project(id))}
      onNavigateToProcess={(id) => navigate(ROUTES.processPhase(id))}
    />
  );
}

function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);

  if (projectId === 'framework') {
    return <Navigate to="/framework" replace />;
  }

  const result = getProjectById(projectId || '');

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

function GlobalNotFoundPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <NotFoundPage
      message={t.errors.pageNotFound}
      backLabel={t.errors.backToHome}
      onBack={() => navigate(ROUTES.home)}
      crumbLabel={t.breadcrumbs.notFound}
    />
  );
}

function AppRoutes() {
  const isDeepPage = isDeepPortfolioPage(useLocation().pathname);

  return (
    <PortfolioChrome>
      <a href="#main" className="skip-link">
        Ir al contenido principal
      </a>
      {!isDeepPage && <RouterNavigation />}
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/proyectos" element={<Proyectos />} />
            <Route path="/proyectos/autosuggest-fondos" element={<AutosuggestFondos />} />
            <Route path="/sobre-mi" element={<SobreMi />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/grafo" element={<Grafo />} />
            <Route path="/design-system" element={<DesignSystemPage />} />
            <Route path="/proceso" element={<CaseStudiesPage />} />
            <Route path="/proceso/fase/:processId" element={<ProcessDetailPage />} />
            <Route path="/cases" element={<Navigate to={ROUTES.process} replace />} />
            <Route path="/cases/process/:processId" element={<LegacyCasesProcessRedirect />} />
            <Route path="/framework" element={<FrameworkDetailPage />} />
            <Route path="/empresa/:companyId" element={<CompanyDetailPage />} />
            <Route path="/proyecto/:projectId" element={<ProjectDetailPage />} />
            <Route path="/auditoria" element={<AuditoriaPortfolio />} />
            <Route path="/admin/fotos" element={<AdminPhotos />} />
            <Route path="*" element={<GlobalNotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      {!isDeepPage && <BottomNav />}
      {isDeepPage && <DeepPageNav />}
    </PortfolioChrome>
  );
}

const App = () => (
  <LanguageProvider>
    <AnalyticsProvider config={analyticsConfig}>
    <ImageManifestProvider>
    <Router>
      <AppRoutes />
    </Router>
    </ImageManifestProvider>
    </AnalyticsProvider>
  </LanguageProvider>
);

export default App;