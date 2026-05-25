import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { LanguageProvider } from './lib/LanguageContext';
import { Navigation } from './components/organisms/Navigation';
import Footer from './components/Footer';
import { PageSkeleton } from './components/molecules/SkeletonLoaders';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Proyectos = lazy(() => import('./pages/Proyectos'));
const AutosuggestFondos = lazy(() => import('./pages/AutosuggestFondos'));
const SobreMi = lazy(() => import('./pages/SobreMi'));
const Contacto = lazy(() => import('./pages/Contacto'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Grafo = lazy(() => import('./pages/Grafo'));
const DesignSystem = lazy(() => import('./pages/DesignSystem'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const AuditoriaPortfolio = lazy(() => import('./pages/AuditoriaPortfolio'));

function RouterNavigation() {
  const navigate = useNavigate();
  return (
    <Navigation
      onNavigateToDesignSystem={() => navigate('/design-system')}
      onNavigateToCaseStudies={() => navigate('/cases')}
    />
  );
}

function DesignSystemPage() {
  const navigate = useNavigate();
  return <DesignSystem onBack={() => navigate('/')} />;
}

function CaseStudiesPage() {
  const navigate = useNavigate();
  return <CaseStudies onBack={() => navigate('/')} onNavigateToProcess={() => {}} />;
}

const App = () => (
  <LanguageProvider>
    <Router>
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
            <Route path="/auditoria" element={<AuditoriaPortfolio />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </Router>
  </LanguageProvider>
);

export default App;
