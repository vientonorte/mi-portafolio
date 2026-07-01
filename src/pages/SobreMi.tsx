import { About } from '../components/organisms/About';
import { Skills } from '../components/organisms/Skills';
import { Experience } from '../components/organisms/Experience';
import { SEOHead } from '../components/atoms/SEOHead';
import { PageShell } from '../components/layout/PageShell';
import { useLanguage } from '../lib/LanguageContext';
import { useTranslation } from '../lib/i18n';

const SobreMi = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <PageShell crumbs={[{ label: t.breadcrumbs.about, current: true }]}>
      <SEOHead
        title="Sobre Mí"
        description="Conoce a Rodrigo Gaete, Lead UX / Senior Product Designer con experiencia en SURA, Transvip y Karri. Especialista en research, design systems y UX estratégico."
      />
      <About />
      <Skills />
      <Experience />
    </PageShell>
  );
};

export default SobreMi;