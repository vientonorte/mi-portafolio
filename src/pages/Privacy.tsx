import React from 'react';
import { SEOHead } from '../components/atoms/SEOHead';

const Privacy = () => (
  <>
    <SEOHead
      title="Política de Privacidad · Rodrigo Gaete"
      description="Política de privacidad del portfolio de Rodrigo Gaete. No se usan cookies de tracking ni datos personales sin consentimiento."
      noIndex={true}
    />
    <section className="container max-w-3xl mx-auto px-6 py-24 prose prose-neutral dark:prose-invert">
      <h1 className="text-3xl font-black tracking-tight mb-6">Política de Privacidad</h1>

      <p className="text-muted-foreground text-sm mb-8">Última actualización: mayo 2026</p>

      <h2>Qué datos se recopilan</h2>
      <p>
        Este sitio puede registrar eventos de navegación anónimos (páginas visitadas, clics en CTAs)
        mediante analytics privacy-first sin identificadores personales. No se usan cookies de terceros
        ni se comparte información con plataformas publicitarias.
      </p>

      <h2>Formulario de contacto</h2>
      <p>
        Si usas el formulario de contacto, tu nombre, email y mensaje se usan únicamente para
        responderte. No se almacenan en bases de datos externas ni se comparten con terceros.
      </p>

      <h2>Tus derechos</h2>
      <p>
        Puedes solicitar acceso, rectificación o eliminación de cualquier dato escribiendo a{' '}
        <a href="mailto:gaete.gaona@gmail.com" className="text-primary underline">
          gaete.gaona@gmail.com
        </a>.
      </p>

      <h2>Tecnologías usadas</h2>
      <p>
        React · Vite · GitHub Pages · Framer Motion. No se instalan cookies de sesión ni de
        marketing.
      </p>
    </section>
  </>
);

export default Privacy;
