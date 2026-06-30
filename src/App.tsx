import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { LanguageProvider } from './lib/LanguageContext';
import { AnalyticsProvider } from './vn-core/analytics/react';
import { analyticsConfig } from './vn-core/analytics/config';
import { Navigation } from './components/organisms/Navigation';
import Footer from './components/Footer';
import { BottomNav } from './components/molecules/BottomNav';
import { PageSkeleton } from './components/molecules/SkeletonLoaders';
import { getCompanyById, getProjectById } from './data/project-registry';
import { ImageManifestProvider } from './lib/ImageManifestProvider';
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
  const navigate = useNavigate();
  return <DesignSystem onBack={() => navigate('/')} />;
}

function CaseStudiesPage() {
  const navigate = useNavigate();
  return <CaseStudies onBack={() => navigate('/')} onNavigateToProcess={(id) => navigate(`/cases/process/${id}`)} />;
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
  const company = getCompanyById(companyId || '');

  if (!company) {
    return (
      <div className="container max-w-3xl mx-auto py-24 px-4 text-center">
        <p className="text-muted-foreground mb-4">No encontramos esa empresa.</p>
        <button
          type="button"
          onClick={() => navigate('/proyectos')}
          className="text-primary underline-offset-4 hover:underline"
        >
          Volver a proyectos
        </button>
      </div>
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

function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const result = getProjectById(projectId || '');

  if (!result) {
    return (
      <div className="container max-w-3xl mx-auto py-24 px-4 text-center">
        <p className="text-muted-foreground mb-4">No encontramos ese proyecto.</p>
        <button
          type="button"
          onClick={() => navigate('/proyectos')}
          className="text-primary underline-offset-4 hover:underline"
        >
          Volver a proyectos
        </button>
      </div>
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

const App = () => (
  <LanguageProvider>
    <AnalyticsProvider config={analyticsConfig}>
    <ImageManifestProvider>
    <Router>
      {/* Skip to content — accesibilidad teclado */}
      <a href="#main" className="skip-link">
        Ir al contenido principal
      </a>
      <RouterNavigation />
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
            <Route path="/cases/process/:processId" element={<ProcessDetailPage />} />
            <Route path="/empresa/:companyId" element={<CompanyDetailPage />} />
            <Route path="/proyecto/:projectId" element={<ProjectDetailPage />} />
            <Route path="/auditoria" element={<AuditoriaPortfolio />} />
            <Route path="/admin/fotos" element={<AdminPhotos />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <BottomNav />
    </Router>
    </ImageManifestProvider>
    </AnalyticsProvider>
  </LanguageProvider>
);

export default App;
