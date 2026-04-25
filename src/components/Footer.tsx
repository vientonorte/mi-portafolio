import React from 'react';

const Footer = () => (
  <footer role="contentinfo" className="mt-12 py-6 bg-foreground text-background text-center">
    <div>
      <a href="mailto:rodrigo.gaete@gmail.com" className="text-background">Contacto</a> | <a href="/privacy" className="text-background">Privacidad</a>
    </div>
    <div className="text-sm mt-2">
      © {new Date().getFullYear()} Rodrigo Gaete Gaona
    </div>
  </footer>
);

export default Footer;
