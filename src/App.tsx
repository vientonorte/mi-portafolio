import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Proyectos from './pages/Proyectos';
import AutosuggestFondos from './pages/AutosuggestFondos';
import SobreMi from './pages/SobreMi';
import Contacto from './pages/Contacto';
import Privacy from './pages/Privacy';
import Grafo from './pages/Grafo';

const App = () => (
  <Router>
    <Header />
    <main id="main" tabIndex={-1}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/proyectos/autosuggest-fondos" element={<AutosuggestFondos />} />
        <Route path="/sobre-mi" element={<SobreMi />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/grafo" element={<Grafo />} />
      </Routes>
    </main>
    <Footer />
  </Router>
);

export default App;
