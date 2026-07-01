import { FolderOpen } from "lucide-react";
import { FileText } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { SectionHeader } from "../molecules/SectionHeader";
import { CaseStudyCard } from "../molecules/CaseStudyCard";
import { StatCard } from "../molecules/StatCard";
import { Button } from '../ui/button';
import { getFeaturedCaseStudies } from "../../data/case-study-cards";
import { useImageManifestVersion } from "../../lib/ImageManifestProvider";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";

export function Projects({
  onNavigateToCaseStudies,
  onNavigateToProject,
}: {
  onNavigateToCaseStudies?: () => void;
  onNavigateToProject?: (projectId: string) => void;
}) {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const { language } = useLanguage();
  const t = useTranslation(language);
  useImageManifestVersion();
  const featuredCaseStudies = getFeaturedCaseStudies(language);

  const stats = [
    { value: "3+", label: t.projects.stats.experience },
    { value: "8+", label: t.projects.stats.projects },
    { value: "G48", label: t.projects.stats.generation },
    { value: "100%", label: t.projects.stats.designThinking },
  ];

  const openProject = (projectId: string) => {
    if (onNavigateToProject) {
      onNavigateToProject(projectId);
      return;
    }
    navigate(`/proyecto/${projectId}`);
  };

  return (
    <section
      id="proyectos"
      className="py-20 md:py-28 px-4 bg-muted/20"
      aria-labelledby="projects-heading"
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
              onRead={() => openProject(study.id)}
              language={language}
            />
          ))}
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-12 md:pt-16"
        >
          <Button
            size="lg"
            className="bg-brand-gradient hover:opacity-90 transition-opacity group"
            onClick={onNavigateToCaseStudies}
          >
            <FileText className="mr-2 h-5 w-5 inline group-hover:scale-110 transition-transform" />
            {t.projectsList.viewFullCases}
          </Button>
        </motion.div>

        <div className="metric-card-grid pt-12 md:pt-16">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}