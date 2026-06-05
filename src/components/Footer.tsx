import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer role="contentinfo" className="mt-12 py-6 bg-[--color-pizarra] text-white text-center">
    <div>
      <a href="mailto:gaete.gaona@gmail.com" className="text-white underline underline-offset-2">Contacto</a> | <Link to="/privacy" className="text-white underline underline-offset-2">Privacidad</Link> | <a href="https://vientonorte.github.io/antropologia-corrupcion/citas-attac.html" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-2">Investigación</a>
    </div>
    <div className="text-sm mt-2">
      © {new Date().getFullYear()} Rodrigo Gaete Gaona
    </div>
  </footer>
);

export default Footer;
