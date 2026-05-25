import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { LanguageProvider } from './lib/LanguageContext';
import { AnalyticsProvider } from './vn-core/analytics/react';
import { analyticsConfig } from './vn-core/analytics/config';
import { Navigation } from './components/organisms/Navigation';
import Footer from './components/Footer';
import { BottomNav } from './components/molecules/BottomNav';
import { PageSkeleton } from './components/molecules/SkeletonLoaders';
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
  return <ProcessDetail processId={processId || ''} onBack={() => navigate('/cases')} onNavigateToPortfolio={() => navigate('/')} />;
}

const App = () => (
  <LanguageProvider>
    <AnalyticsProvider config={analyticsConfig}>
    <Router basename="/mi-portafolio">
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
            <Route path="/auditoria" element={<AuditoriaPortfolio />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <BottomNav />
    </Router>
    </AnalyticsProvider>
  </LanguageProvider>
);

export default App;
