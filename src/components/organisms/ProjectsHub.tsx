import { useState } from "react";
import { ArrowLeft, Briefcase } from "lucide-react";
import { CompanyLogo } from "../atoms/CompanyLogo";
import { SectionHeader } from "../molecules/SectionHeader";
import { CompanyHubCard } from "../molecules/CompanyHubCard";
import { EnhancedProjectCard } from "../molecules/EnhancedProjectCard";
import { StatCard } from "../molecules/StatCard";
import { Button } from '../ui/button';
import { FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { suraHub, transvipHub, frameworkProject } from "../../data/projects-data";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { localized } from "../../lib/localized";

const companyHubs = [suraHub, transvipHub];
const individualProjects = [frameworkProject];

export function ProjectsHub({ 
  onNavigateToCaseStudies,
  onNavigateToProject
}: { 
  onNavigateToCaseStudies?: () => void;
  onNavigateToCompany?: (companyId: string) => void;
  onNavigateToProject?: (projectId: string) => void;
}) {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const { language } = useLanguage();
  const t = useTranslation(language);

  // Handler para navegar al Framework UX desde cualquier company hub
  const handleNavigateToFramework = () => {
    // Navegar a la página completa del Framework
    if (onNavigateToProject) {
      onNavigateToProject("framework");
    }
  };

  const stats = [
    { value: "3+", label: t.projects.stats.experience },
    { value: "8+", label: t.projects.stats.projects },
    { value: "G48", label: t.projects.stats.generation },
    { value: "100%", label: t.projects.stats.designThinking },
  ];

  const selectedHub = companyHubs.find(hub => hub.id === selectedCompany);

  // Projects to show: si hay empresa seleccionada, sus proyectos, sino los proyectos individuales
  const projectsToShow = selectedHub ? selectedHub.projects : individualProjects;

  return (
    <section
      id="proyectos"
      className="py-20 md:py-28 px-4"
      aria-labelledby="projects-heading"
    >
      <div className="container max-w-7xl mx-auto">
        <SectionHeader
          badge={t.projects.badge}
          badgeIcon={Briefcase}
          title={t.projects.title}
          description={t.projects.description}
        />

        <AnimatePresence mode="wait">
          {!selectedCompany ? (
            // VISTA 1: Company Hubs + Proyectos Individuales
            <motion.div
              key="hubs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Company Hubs Section */}
              {companyHubs.length > 0 && (
                <div className="mb-16">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                  >
                    <h3 className="text-2xl font-bold mb-2">{t.projects.companies.title}</h3>
                    <p className="text-muted-foreground">{t.projects.companies.description}</p>
                  </motion.div>

                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                    {companyHubs.map((hub, index) => (
                      <CompanyHubCard
                        key={hub.id}
                        {...hub}
                        index={index}
                        onSelect={setSelectedCompany}
                        onNavigateToDetail={handleNavigateToFramework}
                        language={language}
                        lang={{
                          viewProjects: t.projects.viewProjects,
                          projectCount: t.projects.projectCount,
                          featuredProjects: t.projectsHub.featuredProjects,
                          frameworkButton: t.projectsHub.frameworkButton,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Proyectos Individuales */}
              <div className="mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <h3 className="text-2xl font-bold mb-2">{t.projectsHub.otherProjects}</h3>
                  <p className="text-muted-foreground">
                    {t.projectsHub.otherProjectsDesc}
                  </p>
                </motion.div>

                <div className="grid gap-8">
                  {individualProjects.map((project, index) => (
                    <EnhancedProjectCard
                      key={index}
                      {...project}
                      index={index}
                      lang={{
                        processes: t.projects.tabs.processes,
                        details: t.projects.tabs.details,
                        teamSize: t.projects.teamSize,
                        challenge: t.projects.details.challenge,
                        solution: t.projects.details.solution,
                        results: t.projects.details.results,
                        learnings: t.projects.details.learnings,
                        viewMore: t.common.viewMore,
                        viewLess: t.common.viewLess,
                        visitProject: t.common.visitProject,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            // VISTA 2: Proyectos de la empresa seleccionada
            <motion.div
              key="company-projects"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Back button */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
              >
                <Button
                  variant="ghost"
                  onClick={() => setSelectedCompany(null)}
                  className="gap-2 hover:gap-3 transition-all"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t.projects.backToCompanies}
                </Button>
              </motion.div>

              {/* Company header */}
              {selectedHub && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-12 p-8 rounded-2xl bg-muted/30 border-2 border-border"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <CompanyLogo
                      src={selectedHub.logo}
                      alt={`${selectedHub.name} logo`}
                      size="md"
                    />
                    <div>
                      <h3 className="text-3xl font-bold mb-1">{selectedHub.name}</h3>
                      <div className="flex gap-2">
                        <span className="text-sm text-muted-foreground">{selectedHub.industry}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{selectedHub.period}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {localized(selectedHub.description, language)}
                  </p>
                </motion.div>
              )}

              {/* Company projects */}
              <div className="grid gap-8">
                {projectsToShow.map((project, index) => (
                  <EnhancedProjectCard
                    key={index}
                    {...project}
                    index={index}
                    onNavigateToProject={onNavigateToProject}
                    lang={{
                      processes: t.projects.tabs.processes,
                      details: t.projects.tabs.details,
                      teamSize: t.projects.teamSize,
                      challenge: t.projects.details.challenge,
                      solution: t.projects.details.solution,
                      results: t.projects.details.results,
                      learnings: t.projects.details.learnings,
                      viewMore: t.common.viewMore,
                      viewLess: t.common.viewLess,
                      visitProject: t.common.visitProject,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA to Case Studies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-12 md:pt-16"
        >
          <Button
            size="lg"
            className="bg-brand-gradient hover:opacity-90 transition-opacity group relative overflow-hidden"
            onClick={onNavigateToCaseStudies}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
            <span className="relative">
              <FileText className="mr-2 h-5 w-5 inline group-hover:scale-110 transition-transform" />
              {t.projects.cta}
            </span>
          </Button>
        </motion.div>

        {/* Stats */}
        <div className="metric-card-grid pt-12 md:pt-16">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}