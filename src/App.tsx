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
import { QaEnvBanner } from './components/molecules/QaEnvBanner';
import { isDeepPortfolioPage } from './lib/page-depth';
import { isAdminPath, isConsultingModuleTourPath, isTimedDemoPath, LEGACY_ROUTES, ROUTES } from './lib/routes';
import { useLanguage } from './lib/LanguageContext';
import { useTranslation } from './lib/i18n';
import type { PocModuleId } from './data/poc-product-modules';

// Lazy load pages — evita project-registry y assets pesados en el chunk inicial
const Home = lazyWithRetry(() => import('./pages/Home'));
const ConsultoriaVientoNorte = lazyWithRetry(
  () => import('./pages/ConsultoriaVientoNorte')
);
const Proyectos = lazyWithRetry(() => import('./pages/Proyectos'));
const AutosuggestFondos = lazyWithRetry(() => import('./pages/AutosuggestFondos'));
const SobreMi = lazyWithRetry(() => import('./pages/SobreMi'));
const Contacto = lazyWithRetry(() => import('./pages/Contacto'));
const Privacy = lazyWithRetry(() => import('./pages/Privacy'));
const Grafo = lazyWithRetry(() => import('./pages/Grafo'));
const DesignSystem = lazyWithRetry(() => import('./pages/DesignSystem'));
const CaseStudies = lazyWithRetry(() => import('./pages/CaseStudies'));
const AuditoriaPortfolio = lazyWithRetry(() => import('./pages/AuditoriaPortfolio'));
const PocProductOnboarding = lazyWithRetry(() => import('./pages/PocProductOnboarding'));
const DemoXcmsCampaign = lazyWithRetry(() => import('./pages/DemoXcmsCampaign'));
const TimedServiceDemo = lazyWithRetry(() => import('./pages/TimedServiceDemo'));
const ProcessDetail = lazyWithRetry(() => import('./pages/ProcessDetail'));
const CompanyDetailRoute = lazyWithRetry(() => import('./pages/CompanyDetailRoute'));
const ProjectDetailRoute = lazyWithRetry(() => import('./pages/ProjectDetailRoute'));
const AdminPhotos = lazyWithRetry(() => import('./pages/AdminPhotos'));
const AdminHub = lazyWithRetry(() => import('./pages/AdminHub'));
const FrameworkDetail = lazyWithRetry(() => import('./pages/FrameworkDetail'));

const OFFER_MODULE_IDS = new Set([
  'dashboard',
  'riesgo',
  'inventario',
  'pedidos',
  'clientes',
  'reportes',
]);

/** SEM paid = funnel 3 packs + OB. Tour de módulos solo en deep link. */
function ConsultoriaOfferPage() {
  const { moduleId } = useParams<{ moduleId?: string }>();
  if (moduleId && OFFER_MODULE_IDS.has(moduleId)) {
    return <PocProductOnboarding initialModuleId={moduleId as PocModuleId} />;
  }
  return <ConsultoriaVientoNorte variant="sem" />;
}

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
  const pathname = useLocation().pathname;
  const isDeepPage = isDeepPortfolioPage(pathname);
  /** Tour módulos fullscreen: sin dock. Landing `/consultoria` SÍ lleva DeepPageNav. */
  const isModuleTour = isConsultingModuleTourPath(pathname);
  /** Demo con reloj: sin dock (el iframe no puede quedar bajo el nav). */
  const isTimedDemo = isTimedDemoPath(pathname);
  /** Panel interno: sin nav pública (seguridad por diseño). */
  const isAdmin = isAdminPath(pathname);
  const hideSiteChrome = isModuleTour || isTimedDemo || isAdmin;

  return (
    <PortfolioChrome>
      <QaEnvBanner />
      <ScrollManager />
      <a href="#main" className="skip-link">
        Ir al contenido principal
      </a>
      {!isDeepPage && !hideSiteChrome && <RouterNavigation />}
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            {/* Home FO = embudo. SEM paid = /consultoria (dock sí). Tour módulos = fullscreen. */}
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
            {/* /poc y /poc#/auditoria deprecados → SEM. Freemium ≠ mentoría. */}
            <Route
              path="/poc"
              element={<Navigate to={ROUTES.consulting} replace />}
            />
            <Route
              path="/poc/*"
              element={<Navigate to={ROUTES.consulting} replace />}
            />
            {/* Embudo legacy → home */}
            <Route
              path={LEGACY_ROUTES.consultingFunnelLegacy}
              element={<Navigate to={ROUTES.home} replace />}
            />
            {/* SEM offer — rutas específicas ANTES de /consultoria genérico */}
            <Route path="/consultoria/modulos/:moduleId" element={<ConsultoriaOfferPage />} />
            <Route path={ROUTES.consulting} element={<ConsultoriaOfferPage />} />
            <Route
              path={LEGACY_ROUTES.pocProductOnboarding}
              element={<Navigate to={ROUTES.consulting} replace />}
            />
            <Route path={ROUTES.demoXcms} element={<DemoXcmsCampaign />} />
            <Route
              path="/demo/:pathId"
              element={<TimedServiceDemo />}
            />
            <Route path={ROUTES.admin} element={<AdminHub />} />
            <Route path={ROUTES.adminRoadmap} element={<AdminHub />} />
            <Route path="/admin/fotos" element={<AdminPhotos />} />
            <Route path="*" element={<GlobalNotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      {/* Footer de links/copyright retirado: contacto y UX Tools en nav; privacidad en header */}
      {!isDeepPage && !hideSiteChrome && <BottomNav />}
      {isDeepPage && !hideSiteChrome && <DeepPageNav />}
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