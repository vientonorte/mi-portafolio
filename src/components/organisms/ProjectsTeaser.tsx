import { ArrowRight, Briefcase } from "lucide-react";
import { FileText } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { SectionHeader } from "../molecules/SectionHeader";
import { CaseStudyCard } from "../molecules/CaseStudyCard";
import { Button } from "../ui/button";
import { getFeaturedCaseStudies } from "../../data/case-study-cards";
import { useImageManifestVersion } from "../../lib/ImageManifestProvider";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { ROUTES } from "../../lib/routes";

const TEASER_IDS = ["sura-ecosistema-digital", "transvip-app-premium", "karri-calculadora"] as const;

export function ProjectsTeaser({
  onNavigateToCaseStudies,
}: {
  onNavigateToCaseStudies?: () => void;
}) {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const { language } = useLanguage();
  const t = useTranslation(language);
  useImageManifestVersion();

  const teaserStudies = getFeaturedCaseStudies(language).filter((study) =>
    (TEASER_IDS as readonly string[]).includes(study.id)
  );

  const openNegocios = () => navigate("/proyectos");
  const openProcess = () => {
    if (onNavigateToCaseStudies) {
      onNavigateToCaseStudies();
      return;
    }
    navigate(ROUTES.process);
  };

  return (
    <section
      id="negocios"
      className="py-16 md:py-24 px-4 bg-surface-matte"
      aria-labelledby="negocios-teaser-heading"
    >
      <div className="container max-w-7xl mx-auto">
        <SectionHeader
          badge={t.homeTeaser.badge}
          badgeIcon={Briefcase}
          title={t.homeTeaser.title}
          description={t.homeTeaser.description}
          titleId="negocios-teaser-heading"
        />

        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {teaserStudies.map((study, index) => (
            <CaseStudyCard
              key={study.id}
              title={study.title}
              company={study.company}
              description={study.description}
              image={study.image}
              tags={study.tags}
              metrics={study.metrics}
              index={index}
              onRead={() => navigate(`/proyecto/${study.id}`)}
              language={language}
            />
          ))}
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-10 md:pt-12"
        >
          <Button
            size="lg"
            className="bg-brand-gradient hover:opacity-90 transition-opacity group w-full sm:w-auto"
            onClick={openNegocios}
          >
            {t.homeTeaser.ctaNegocios}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={openProcess}
          >
            <FileText className="mr-2 h-4 w-4" />
            {t.homeTeaser.ctaProceso}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}