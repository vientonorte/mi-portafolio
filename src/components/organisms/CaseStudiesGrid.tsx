import { motion, useReducedMotion } from "motion/react";
import { FolderOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SectionHeader } from "../molecules/SectionHeader";
import { CaseStudyCard } from "../molecules/CaseStudyCard";
import { getFeaturedCaseStudies } from "../../data/case-study-cards";
import { useImageManifestVersion } from "../../lib/ImageManifestProvider";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";

export function CaseStudiesGrid() {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const { language } = useLanguage();
  const t = useTranslation(language);
  useImageManifestVersion();
  const featuredCaseStudies = getFeaturedCaseStudies();

  return (
    <section
      className="py-16 md:py-20 px-4 bg-muted/20"
      aria-labelledby="case-studies-grid-heading"
    >
      <div className="container max-w-7xl mx-auto">
        <SectionHeader
          badge={t.caseStudiesGrid.badge}
          badgeIcon={FolderOpen}
          title={t.caseStudiesGrid.title}
          description={t.caseStudiesGrid.description}
        />

        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {featuredCaseStudies.map((study, index) => (
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
      </div>
    </section>
  );
}