import { SEOHead } from '../components/atoms/SEOHead';
import { SITE_CONTACT, getContactMailtoUrl } from '../lib/site-contact';
import { PageShell } from '../components/layout/PageShell';
import { useLanguage } from '../lib/LanguageContext';
import { useTranslation } from '../lib/i18n';
import { canonicalFromPath } from '../lib/seo';

const Privacy = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <PageShell crumbs={[{ label: t.breadcrumbs.privacy, current: true }]}>
      <SEOHead
        {...t.seo.pages.privacy}
        url={canonicalFromPath('/privacy')}
        noIndex
      />
      <section className="container max-w-3xl mx-auto px-6 py-16 prose prose-neutral dark:prose-invert">
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
          Si usas el formulario de contacto, tu nombre, email y mensaje se transmiten de forma
          cifrada (HTTPS) a un relay de correo (Cloudflare Workers) y se reenvían únicamente para
          responderte. No se almacenan en bases de datos del sitio ni se usan para marketing.
        </p>

        <h2>Tus derechos</h2>
        <p>
          Puedes solicitar acceso, rectificación o eliminación de datos enviados por contacto escribiendo a{' '}
          <a href={getContactMailtoUrl()}>{SITE_CONTACT.email}</a>.
        </p>
      </section>
    </PageShell>
  );
};

export default Privacy;