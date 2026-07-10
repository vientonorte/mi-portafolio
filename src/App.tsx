import React, { Suspense } from 'react';
import { lazyWithRetry } from './lib/lazy-with-retry';
import { HashRouter as Router, Routes, Route, useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
import { LanguageProvider } from './lib/LanguageContext';
import { AnalyticsProvider } from './vn-core/analytics/react';
import { analyticsConfig } from './vn-core/analytics/config';
import { Navigation } from './components/organisms/Navigation';
import { BottomNav } from './components/molecules/BottomNav';
import { DeepPageNav } from './components/molecules/DeepPageNav';
import { PageSkeleton } from './components/molecules/SkeletonLoaders';
import { ImageManifestProvider } from './lib/ImageManifestProvider';
import { PortfolioChrome } from './components/layout/PortfolioChrome';
import { ScrollManager } from './components/layout/ScrollManager';
import { NotFoundPage } from './components/layout/NotFoundPage';
import { isDeepPortfolioPage } from './lib/page-depth';
import { ROUTES } from './lib/routes';
import { useLanguage } from './lib/LanguageContext';
import { useTranslation } from './lib/i18n';

// Lazy load pages — evita project-registry y assets pesados en el chunk inicial
const Home = lazyWithRetry(() => import('./pages/Home'));
const Proyectos = lazyWithRetry(() => import('./pages/Proyectos'));
const AutosuggestFondos = lazyWithRetry(() => import('./pages/AutosuggestFondos'));
const SobreMi = lazyWithRetry(() => import('./pages/SobreMi'));
const Contacto = lazyWithRetry(() => import('./pages/Contacto'));
const Privacy = lazyWithRetry(() => import('./pages/Privacy'));
const Grafo = lazyWithRetry(() => import('./pages/Grafo'));
const DesignSystem = lazyWithRetry(() => import('./pages/DesignSystem'));
const CaseStudies = lazyWithRetry(() => import('./pages/CaseStudies'));
const AuditoriaPortfolio = lazyWithRetry(() => import('./pages/AuditoriaPortfolio'));
const ConsultoriaVientoNorte = lazyWithRetry(() => import('./pages/ConsultoriaVientoNorte'));
const ProcessDetail = lazyWithRetry(() => import('./pages/ProcessDetail'));
const CompanyDetailRoute = lazyWithRetry(() => import('./pages/CompanyDetailRoute'));
const ProjectDetailRoute = lazyWithRetry(() => import('./pages/ProjectDetailRoute'));
const AdminPhotos = lazyWithRetry(() => import('./pages/AdminPhotos'));
const FrameworkDetail = lazyWithRetry(() => import('./pages/FrameworkDetail'));

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
      <ScrollManager />
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
            <Route path={ROUTES.grafo} element={<Grafo />} />
            <Route path="/design-system" element={<DesignSystemPage />} />
            <Route path="/proceso" element={<CaseStudiesPage />} />
            <Route path="/proceso/fase/:processId" element={<ProcessDetailPage />} />
            <Route path="/cases" element={<Navigate to={ROUTES.process} replace />} />
            <Route path="/cases/process/:processId" element={<LegacyCasesProcessRedirect />} />
            <Route path="/framework" element={<FrameworkDetailPage />} />
            <Route path="/empresa/:companyId" element={<CompanyDetailRoute />} />
            <Route path="/proyecto/:projectId" element={<ProjectDetailRoute />} />
            <Route path="/auditoria" element={<AuditoriaPortfolio />} />
            <Route path="/consultoria" element={<ConsultoriaVientoNorte />} />
            <Route path="/admin/fotos" element={<AdminPhotos />} />
            <Route path="*" element={<GlobalNotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      {/* Footer de links/copyright retirado: contacto y UX Tools en nav; privacidad en header */}
      {!isDeepPage && <BottomNav />}
      {isDeepPage && <DeepPageNav />}
    </PortfolioChrome>
  );
}

const App = () => (
  <LanguageProvider>
    <AnalyticsProvider config={analyticsConfig}>
      <Router>
        <ImageManifestProvider>
          <AppRoutes />
        </ImageManifestProvider>
      </Router>
    </AnalyticsProvider>
  </LanguageProvider>
);

export default App;