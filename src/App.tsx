import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { LanguageProvider } from './lib/LanguageContext';
import { AnalyticsProvider } from './vn-core/analytics/react';
import { analyticsConfig } from './vn-core/analytics/config';
import { Navigation } from './components/organisms/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Proyectos from './pages/Proyectos';
import AutosuggestFondos from './pages/AutosuggestFondos';
import SobreMi from './pages/SobreMi';
import Contacto from './pages/Contacto';
import Privacy from './pages/Privacy';
import Grafo from './pages/Grafo';
import DesignSystem from './pages/DesignSystem';
import CaseStudies from './pages/CaseStudies';

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
    <AnalyticsProvider config={analyticsConfig}>
    <Router basename="/mi-portafolio">
      <RouterNavigation />
      <main id="main" tabIndex={-1}>
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
        </Routes>
      </main>
      <Footer />
    </Router>
    </AnalyticsProvider>
  </LanguageProvider>
);

export default App;
