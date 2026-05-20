import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer role="contentinfo" className="mt-12 py-6 bg-[--color-pizarra] text-[--color-marfil] text-center">
    <div>
      <a href="mailto:gaete.gaona@gmail.com" className="text-[--color-marfil]">Contacto</a> | <Link to="/privacy" className="text-[--color-marfil]">Privacidad</Link>
    </div>
    <div className="text-sm mt-2">
      © {new Date().getFullYear()} Rodrigo Gaete Gaona
    </div>
  </footer>
);

export default Footer;
