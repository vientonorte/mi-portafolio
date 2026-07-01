import { Contact } from '../components/organisms/Contact';
import { SEOHead } from '../components/atoms/SEOHead';
import { PageShell } from '../components/layout/PageShell';
import { useLanguage } from '../lib/LanguageContext';
import { useTranslation } from '../lib/i18n';

const Contacto = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <PageShell crumbs={[{ label: t.breadcrumbs.contact, current: true }]}>
      <SEOHead
        title="Contacto"
        description="Ponte en contacto con Rodrigo Gaete para proyectos de UX/UI, consultoría de diseño o colaboraciones. Lead UX / Senior Product Designer."
      />
      <Contact />
    </PageShell>
  );
};

export default Contacto;