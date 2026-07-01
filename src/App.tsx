import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
import { LanguageProvider } from './lib/LanguageContext';
import { AnalyticsProvider } from './vn-core/analytics/react';
import { analyticsConfig } from './vn-core/analytics/config';
import { Navigation } from './components/organisms/Navigation';
import Footer from './components/Footer';
import { BottomNav } from './components/molecules/BottomNav';
import { PageSkeleton } from './components/molecules/SkeletonLoaders';
import { getCompanyById, getProjectById } from './data/project-registry';
import { ImageManifestProvider } from './lib/ImageManifestProvider';
import { PortfolioChrome } from './components/layout/PortfolioChrome';
import { NotFoundPage } from './components/layout/NotFoundPage';
import { isDeepPortfolioPage } from './lib/page-depth';
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
function RouterNavigation() {
  const navigate = useNavigate();
  return (
    <Navigation
      onNavigateToDesignSystem={() => navigate('/design-system')}
      onNavigateToCaseStudies={() => navigate('/cases')}
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
      onBack={() => navigate('/proyectos')}
      onNavigateToProcess={(id) => navigate(`/cases/process/${id}`)}
      onNavigateToFramework={() => navigate('/framework')}
      onNavigateToProject={(id) => navigate(`/proyecto/${id}`)}
    />
  );
}

function ProcessDetailPage() {
  const { processId } = useParams<{ processId: string }>();
  const navigate = useNavigate();
  return (
    <ProcessDetail
      processId={processId || ''}
      onBack={() => navigate('/cases')}
      onNavigateToPortfolio={() => navigate('/')}
      onNavigateToProject={(id) => navigate(`/proyecto/${id}`)}
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
        onBack={() => navigate('/proyectos')}
        crumbLabel={t.breadcrumbs.notFound}
      />
    );
  }

  return (
    <CompanyDetail
      company={company}
      onBack={() => navigate('/proyectos')}
      onNavigateToProject={(id) => navigate(`/proyecto/${id}`)}
      onNavigateToProcess={(id) => navigate(`/cases/process/${id}`)}
    />
  );
}

function FrameworkDetailPage() {
  const navigate = useNavigate();
  return (
    <FrameworkDetail
      onBack={() => navigate('/cases')}
      onNavigateToProject={(id) => navigate(`/proyecto/${id}`)}
      onNavigateToProcess={(id) => navigate(`/cases/process/${id}`)}
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
        onBack={() => navigate('/proyectos')}
        crumbLabel={t.breadcrumbs.notFound}
      />
    );
  }

  return (
    <ProjectDetail
      project={result.project}
      companyName={result.companyName}
      onBack={() => navigate('/proyectos')}
      onBackToCompany={() =>
        result.companyId ? navigate(`/empresa/${result.companyId}`) : navigate('/proyectos')
      }
      onNavigateToProcess={(id) => navigate(`/cases/process/${id}`)}
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
            <Route path="/cases" element={<CaseStudiesPage />} />
            <Route path="/framework" element={<FrameworkDetailPage />} />
            <Route path="/cases/process/:processId" element={<ProcessDetailPage />} />
            <Route path="/empresa/:companyId" element={<CompanyDetailPage />} />
            <Route path="/proyecto/:projectId" element={<ProjectDetailPage />} />
            <Route path="/auditoria" element={<AuditoriaPortfolio />} />
            <Route path="/admin/fotos" element={<AdminPhotos />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      {!isDeepPage && <BottomNav />}
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
