import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header role="banner">
    <nav aria-label="Navegación principal">
      <ul style={{ display: 'flex', gap: '24px', listStyle: 'none', margin: 0, padding: 0 }}>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/proyectos">Proyectos</Link></li>
        <li><Link to="/sobre-mi">Sobre mí</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        <li><Link to="/privacy">Privacidad</Link></li>
        <li><a href="https://vientonorte.github.io/uxtools/" target="_blank" rel="noopener noreferrer">UX Tools</a></li>
      </ul>
    </nav>
  </header>
);

export default Header;
