import React from 'react';

const Footer = () => (
  <footer role="contentinfo" className="mt-12 py-6 bg-[--color-pizarra] text-[--color-marfil] text-center">
    <div>
      <a href="mailto:rodrigo.gaete@gmail.com" className="text-[--color-marfil]">Contacto</a> | <a href="/privacy" className="text-[--color-marfil]">Privacidad</a>
    </div>
    <div className="text-sm mt-2">
      © {new Date().getFullYear()} Rodrigo Gaete Gaona
    </div>
  </footer>
);

export default Footer;
