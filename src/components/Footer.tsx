import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONTACT } from '../lib/site-contact';

const Footer = () => (
  <footer role="contentinfo" className="mt-12 py-6 bg-[--color-pizarra] text-white text-center">
    <div>
      <a href={`mailto:${SITE_CONTACT.email}`} className="text-white underline underline-offset-2">Contacto</a> | <a href={SITE_CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-2">LinkedIn</a> | <Link to="/privacy" className="text-white underline underline-offset-2">Privacidad</Link> | <a href="https://vientonorte.github.io/antropologia-corrupcion/zuboff-archivo.html" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-2">Investigación</a>
    </div>
    <div className="text-sm mt-2">
      © {new Date().getFullYear()} Rodrigo Gaete Gaona
    </div>
  </footer>
);

export default Footer;
