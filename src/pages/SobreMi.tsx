import { About } from '../components/organisms/About';
import { Skills } from '../components/organisms/Skills';
import { Experience } from '../components/organisms/Experience';
import { SEOHead } from '../components/atoms/SEOHead';

const SobreMi = () => (
  <>
    <SEOHead 
      title="Sobre Mí"
      description="Conoce a Rodrigo Gaete, Lead UX / Senior Product Designer con experiencia en SURA, Transvip y Karri. Especialista en research, design systems y UX estratégico."
    />
    <About />
    <Skills />
    <Experience />
  </>
);

export default SobreMi;
