import React from 'react';

const Footer = () => (
  <footer role="contentinfo" style={{ marginTop: '48px', padding: '24px 0', background: 'var(--color-pizarra)', color: 'var(--color-marfil)', textAlign: 'center' }}>
    <div>
      <a href="mailto:rodrigo.gaete@gmail.com" style={{ color: 'var(--color-marfil)' }}>Contacto</a> | <a href="/privacy" style={{ color: 'var(--color-marfil)' }}>Privacidad</a>
    </div>
    <div style={{ fontSize: '0.9em', marginTop: '8px' }}>
      © {new Date().getFullYear()} Rodrigo Gaete Gaona
    </div>
  </footer>
);

export default Footer;
