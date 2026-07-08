import { motion, useReducedMotion } from "motion/react";
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ExternalLink, TrendingDown, TrendingUp } from "lucide-react";
import { StickyCTA } from "../components/molecules/StickyCTA";
import { ProcessNavigation } from "../components/molecules/ProcessNavigation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { withHomeCrumb } from "../lib/breadcrumb-helpers";
import { useLanguage } from "../lib/LanguageContext";
import { SubpageToolbar } from "../components/molecules/SubpageToolbar";
import { useTranslation } from "../lib/i18n";
import { SectionDivider } from "../components/molecules/SectionDivider";
import { SectionHeader } from "../components/molecules/SectionHeader";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { KPICard } from "../components/molecules/KPICard";
import { MockupGallery } from "../components/molecules/MockupGallery";
import { buildMockupItems, projectGalleryCopy } from "../lib/mockup-gallery";
import { buildProjectNavSections, navNumberFor } from "../lib/project-nav-sections";
import { ResponsiveDesignFrame } from "../components/molecules/ResponsiveDesignFrame";
import { CompanyLogo } from "../components/atoms/CompanyLogo";
import { SEOHead } from "../components/atoms/SEOHead";
import { canonicalFromPath, projectPageSeo } from "../lib/seo";
import { getProjectSeoKeywords } from "../lib/project-metrics";

interface ProcessApplied {
  id: string;
  number: string;
  name: string;
  description: string;
  activities: string[];
  impact: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}

// Original Karri project structure
interface ProjectData {
  id: string;
  name: string;
  company: string;
  companyLogo?: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
  challenge: {
    problem: string;
    solution: string;
  };
  processesApplied: ProcessApplied[];
  designComponents?: React.ComponentType[];
  designComponentNames?: string[];
  results?: {
    label: string;
    value: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
  details?: Pick<ProjectDetails, "mockups">;
  externalLink?: string;
}

// SURA enhanced project structure
interface Process {
  name: string;
  description: string;
  tools?: string[];
}

interface ProjectDetails {
  challenge?: string;
  solution?: string;
  metrics?: string[];
  learnings?: string[];
  mockups?: string[];
}

interface EnhancedProject {
  id?: string;
  company: string;
  companyLogo?: string;
  role: string;
  period: string;
  projectName: string;
  description: string;
  image?: string;
  tags: string[];
  processes?: Process[];
  teamSize?: string;
  details: ProjectDetails;
  externalLink?: string;
}

interface ProjectDetailProps {
  project: ProjectData | EnhancedProject;
  companyName?: string;
  onBack: () => void;
  onBackToCompany: () => void;
  onNavigateToProcess?: (processId: string) => void;
}

// Type guard to check if project is EnhancedProject
function isEnhancedProject(project: ProjectData | EnhancedProject): project is EnhancedProject {
  return (
    "projectName" in project &&
    "details" in project &&
    !("processesApplied" in project)
  );
}

export default function ProjectDetail({
  project,
  companyName,
  onBack,
  onBackToCompany,
  onNavigateToProcess,
}: ProjectDetailProps) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const shouldReduceMotion = useReducedMotion();
  const hubName = companyName ?? project.company;

  // Determine project type and extract data accordingly
  const isEnhanced = isEnhancedProject(project);
  const projectName = isEnhanced ? project.projectName : project.name;
  const challengeProblem = isEnhanced ? project.details.challenge : project.challenge.problem;
  const challengeSolution = isEnhanced ? project.details.solution : project.challenge.solution;
  const projectMockupSources = isEnhanced
    ? project.details.mockups
    : project.details?.mockups;
  const projectMockups =
    projectMockupSources && projectMockupSources.length > 0
      ? buildMockupItems(
          projectMockupSources,
          { projectName, companyName: hubName },
          t.mockups
        )
      : undefined;
  const mockupCopy = projectGalleryCopy(projectName, language);
  const hasProcess = isEnhanced
    ? Boolean(project.processes && project.processes.length > 0)
    : Boolean(project.processesApplied && project.processesApplied.length > 0);
  const hasDesignArtifacts =
    !isEnhanced && Boolean(project.designComponents && project.designComponents.length > 0);
  const hasMockupTiles = Boolean(projectMockups && projectMockups.length > 0);
  const hasResults = isEnhanced
    ? Boolean(project.details.metrics?.length || project.details.learnings?.length)
    : Boolean(project.results && project.results.length > 0);
  const hasEvidence = hasDesignArtifacts || hasMockupTiles;
  const projectId = project.id;
  const externalLink = "externalLink" in project ? project.externalLink : undefined;
  const pageSeo = projectPageSeo(projectName, hubName, project.description, language);

  const navigationSections = buildProjectNavSections(language, {
    hasProcess,
    hasResults,
    hasEvidence,
  });

  const fadeInVariant = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0 },
  };

  const scaleVariant = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-8 md:pb-0">
      {projectId && (
        <SEOHead
          {...pageSeo}
          keywords={getProjectSeoKeywords(projectId, language) ?? t.seo.keywords}
          url={canonicalFromPath(`/proyecto/${projectId}`)}
        />
      )}
      {/* Skip Links */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        {language === "es" ? "Saltar al contenido principal" : "Skip to main content"}
      </a>

      {/* Sticky CTA */}
      <StickyCTA
        label={t.processDetail.viewAllProjects}
        onClick={onBack}
        ariaLabel={language === "es" ? "Volver a la lista de proyectos" : "Return to projects list"}
        showAfterScroll={800}
      />

      <ProcessNavigation sections={navigationSections} />

      <SubpageToolbar
        crumbs={withHomeCrumb(t.breadcrumbs.home, () => navigate("/"), [
          { label: t.breadcrumbs.projects, onClick: onBack },
          { label: hubName, onClick: onBackToCompany },
          { label: projectName, current: true },
        ])}
      />

      <main id="main-content" role="main">
        {/* Hero Section */}
        <section 
          id="hero" 
          className="py-20 md:py-32 px-4 relative overflow-hidden scroll-mt-20"
          aria-labelledby="project-heading"
        >
          {/* Animated gradient background */}
          {!shouldReduceMotion && (
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 50%, rgba(255, 29, 37, 0.15) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, rgba(255, 147, 30, 0.15) 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 80%, rgba(255, 29, 37, 0.15) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 50%, rgba(255, 29, 37, 0.15) 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            />
          )}

          <div className="container max-w-7xl mx-auto relative z-10">
            <motion.div
              variants={fadeInVariant}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Company Logo */}
              {project.companyLogo && (
                <motion.div
                  variants={scaleVariant}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5 }}
                  className="mb-6 flex justify-center"
                >
                  <CompanyLogo
                    src={project.companyLogo}
                    alt={`${project.company} logo`}
                    size="lg"
                  />
                </motion.div>
              )}

              {/* Badge */}
              <motion.div
                variants={scaleVariant}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6"
              >
                <Badge variant="outline" className="text-base px-4 py-1.5 bg-primary/10 border-primary/30">
                  {project.company} • {project.period}
                </Badge>
              </motion.div>

              {/* Project Name */}
              <motion.h1
                id="project-heading"
                variants={fadeInVariant}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl md:text-7xl mb-6 text-foreground"
              >
                {projectName}
              </motion.h1>

              {/* Role */}
              <motion.p
                variants={fadeInVariant}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-muted-foreground mb-8"
              >
                {project.role}
              </motion.p>
              
              {/* Description */}
              <motion.p
                variants={fadeInVariant}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-12"
              >
                {project.description}
              </motion.p>

              {/* Tags */}
              <motion.div
                variants={fadeInVariant}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-2 justify-center"
              >
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </motion.div>

              {externalLink && (
                <motion.div
                  variants={fadeInVariant}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="mt-8 flex justify-center"
                >
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-primary/30 bg-primary/5 hover:bg-primary/10"
                  >
                    <a
                      href={externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t.processDetail.viewExternalProof} (${language === "es" ? "se abre en nueva pestaña" : "opens in a new tab"})`}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" aria-hidden />
                      {t.processDetail.viewExternalProof}
                    </a>
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Challenge Section */}
        <section 
          id="challenge" 
          className="py-16 md:py-24 px-4 bg-muted/30 scroll-mt-20"
          aria-labelledby="challenge-heading"
        >
          <div className="container max-w-7xl mx-auto">
            <SectionDivider 
              number={navNumberFor(navigationSections, "challenge")} 
              label={language === "es" ? "El Desafío" : "The Challenge"} 
              sectionId="challenge"
              language={language}
            />

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {/* Problem */}
              <motion.article
                variants={fadeInVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                aria-labelledby="problem-heading"
              >
                <Card className="border-2 border-destructive/30 h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingDown className="h-6 w-6 text-destructive" aria-hidden="true" />
                      <h3 id="problem-heading" className="text-2xl">
                        {language === "es" ? "El problema" : "The Problem"}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {challengeProblem}
                    </p>
                  </CardContent>
                </Card>
              </motion.article>

              {/* Solution */}
              <motion.article
                variants={fadeInVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                aria-labelledby="solution-heading"
              >
                <Card className="border-2 border-primary/30 h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp className="h-6 w-6 text-primary" aria-hidden="true" />
                      <h3 id="solution-heading" className="text-2xl">
                        {language === "es" ? "La solución" : "The Solution"}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {challengeSolution}
                    </p>
                  </CardContent>
                </Card>
              </motion.article>
            </div>
          </div>
        </section>

        {/* Process Section */}
        {!isEnhanced && project.processesApplied && project.processesApplied.length > 0 && (
          <section 
          id="process" 
          className="py-16 md:py-24 px-4 scroll-mt-20"
          aria-labelledby="process-heading"
        >
          <div className="container max-w-7xl mx-auto">
            <SectionDivider 
              number={navNumberFor(navigationSections, "process")} 
              label={language === "es" ? "El Proceso" : "The Process"} 
              sectionId="process"
              language={language}
            />

            <motion.div
              variants={fadeInVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-12"
            >
              <SectionHeader
                badge={language === "es" ? "Metodología" : "Methodology"}
                title={language === "es" ? "5 Macroprocesos Aplicados" : "5 Applied Macro-processes"}
                description={language === "es"
                  ? "Cómo implementamos cada fase del framework en este proyecto específico."
                  : "How we implemented each framework phase in this specific project."}
              />

              <div className="space-y-6 mt-12">
                {project.processesApplied.map((process, index) => (
                  <motion.article
                    key={process.id}
                    variants={fadeInVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="border-2 hover:border-primary/50 transition-colors">
                      <CardContent className="p-8">
                        <div className="flex items-start gap-6">
                          {/* Process Number */}
                          <div className="relative flex-shrink-0">
                            <div className="text-6xl font-black text-primary/20 leading-none">
                              {process.number}
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-gradient rounded-full" />
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <h3 className="text-2xl">{process.name}</h3>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    {language === "es" ? "Ver detalle" : "View details"}
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl">
                                  <DialogHeader>
                                    <DialogTitle className="text-2xl">{process.name}</DialogTitle>
                                    <DialogDescription className="text-base pt-2">
                                      {process.description}
                                    </DialogDescription>
                                  </DialogHeader>
                                  
                                  {/* Activities */}
                                  <div className="mt-4">
                                    <h4 className="font-medium mb-3">
                                      {language === "es" ? "Actividades realizadas:" : "Activities performed:"}
                                    </h4>
                                    <ul className="space-y-2">
                                      {process.activities.map((activity, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                                          <span className="text-primary mt-1">•</span>
                                          <span>{activity}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Impact */}
                                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                                    <h4 className="font-medium mb-2">
                                      {language === "es" ? "Impacto:" : "Impact:"}
                                    </h4>
                                    <p className="text-muted-foreground">{process.impact}</p>
                                  </div>

                                  {/* Metrics */}
                                  {process.metrics && process.metrics.length > 0 && (
                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                      {process.metrics.map((metric, idx) => (
                                        <div key={idx} className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                                          <div className="text-3xl font-bold text-primary mb-1">
                                            {metric.value}
                                          </div>
                                          <div className="text-sm text-muted-foreground">
                                            {metric.label}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                            </div>

                            <p className="text-muted-foreground mb-4">
                              {process.description}
                            </p>

                            {/* Quick metrics preview */}
                            {process.metrics && process.metrics.length > 0 && (
                              <div className="flex gap-4 mt-4">
                                {process.metrics.slice(0, 2).map((metric, idx) => (
                                  <div key={idx} className="flex items-baseline gap-2">
                                    <span className="text-2xl font-bold text-primary">{metric.value}</span>
                                    <span className="text-sm text-muted-foreground">{metric.label}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        )}

        {/* Enhanced Project Process Section */}
        {isEnhanced && project.processes && project.processes.length > 0 && (
          <section 
            id="process" 
            className="py-16 md:py-24 px-4 scroll-mt-20"
            aria-labelledby="process-heading"
          >
            <div className="container max-w-7xl mx-auto">
              <SectionDivider 
                number={navNumberFor(navigationSections, "process")} 
                label={language === "es" ? "El Proceso" : "The Process"} 
                sectionId="process"
                language={language}
              />

              <motion.div
                variants={fadeInVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mt-12"
              >
                <SectionHeader
                  badge={language === "es" ? "Metodología" : "Methodology"}
                  title={language === "es" ? "Procesos UX Aplicados" : "Applied UX Processes"}
                  description={language === "es"
                    ? "Metodología y herramientas utilizadas en este proyecto."
                    : "Methodology and tools used in this project."}
                />

                <div className="grid md:grid-cols-2 gap-6 mt-12">
                  {project.processes.map((process, index) => (
                    <motion.article
                      key={index}
                      variants={fadeInVariant}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="border-2 hover:border-primary/50 transition-colors h-full">
                        <CardContent className="p-8">
                          <h3 className="text-2xl mb-4">{process.name}</h3>
                          <p className="text-muted-foreground mb-4 leading-relaxed">
                            {process.description}
                          </p>
                          
                          {process.tools && process.tools.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-border">
                              <p className="text-sm font-medium mb-2">
                                {language === "es" ? "Herramientas:" : "Tools:"}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {process.tools.map((tool, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {tool}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Enhanced Project Metrics & Learnings */}
        {isEnhanced && (project.details.metrics || project.details.learnings) && (
          <section 
            id="results" 
            className="py-16 md:py-24 px-4 bg-muted/30 scroll-mt-20"
            aria-labelledby="results-heading"
          >
            <div className="container max-w-7xl mx-auto">
              <SectionDivider 
                number={navNumberFor(navigationSections, "results")} 
                label={language === "es" ? "Resultados" : "Results"} 
                sectionId="results"
                language={language}
              />

              <motion.div
                variants={fadeInVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mt-12 grid md:grid-cols-2 gap-8"
              >
                {/* Metrics */}
                {project.details.metrics && project.details.metrics.length > 0 && (
                  <motion.article
                    variants={fadeInVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <Card className="border-2 border-primary/30 h-full">
                      <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                          <TrendingUp className="h-6 w-6 text-primary" aria-hidden="true" />
                          <h3 className="text-2xl">
                            {language === "es" ? "Métricas" : "Metrics"}
                          </h3>
                        </div>
                        <ul className="space-y-3">
                          {project.details.metrics.map((metric, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="text-primary mt-1 flex-shrink-0">✓</span>
                              <span className="text-muted-foreground leading-relaxed">{metric}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.article>
                )}

                {/* Learnings */}
                {project.details.learnings && project.details.learnings.length > 0 && (
                  <motion.article
                    variants={fadeInVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Card className="border-2 border-border/50 h-full">
                      <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                          <span className="text-2xl" aria-hidden="true">💡</span>
                          <h3 className="text-2xl">
                            {language === "es" ? "Aprendizajes" : "Learnings"}
                          </h3>
                        </div>
                        <ul className="space-y-3">
                          {project.details.learnings.map((learning, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="text-primary mt-1 flex-shrink-0">→</span>
                              <span className="text-muted-foreground leading-relaxed">{learning}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.article>
                )}
              </motion.div>
            </div>
          </section>
        )}



        {/* Results Section */}
        {!isEnhanced && project.results && project.results.length > 0 && (
          <section 
            id="results" 
            className="py-16 md:py-24 px-4 scroll-mt-20"
            aria-labelledby="results-heading"
          >
            <div className="container max-w-7xl mx-auto">
              <SectionDivider 
                number={navNumberFor(navigationSections, "results")} 
                label={language === "es" ? "Resultados" : "Results"} 
                sectionId="results"
                language={language}
              />

              <motion.div
                variants={fadeInVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mt-12"
              >
                <SectionHeader
                  badge={language === "es" ? "Impacto" : "Impact"}
                  title={language === "es" ? "Resultados medibles" : "Measurable Results"}
                  description={language === "es"
                    ? "Métricas e impacto real obtenido tras la implementación."
                    : "Metrics and real impact achieved after implementation."}
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                  {project.results.map((result, index) => {
                    const Icon = result.icon;
                    return (
                      <KPICard
                        key={index}
                        label={result.label}
                        value={result.value}
                        description={result.description}
                        icon={Icon}
                        index={index}
                      />
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {hasEvidence && (
          <section
            id="evidence"
            className="py-16 md:py-24 px-4 bg-muted/30 scroll-mt-20"
            aria-labelledby="evidence-heading"
          >
            <div className="container max-w-7xl mx-auto">
              <SectionDivider
                number={navNumberFor(navigationSections, "evidence")}
                label={language === "es" ? "Evidencias" : "Evidence"}
                sectionId="evidence"
                language={language}
              />

              <motion.div
                variants={fadeInVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mt-12 space-y-12"
              >
                {hasDesignArtifacts && project.designComponents && (
                  <div>
                    <SectionHeader
                      badge={t.mockups.badge}
                      title={t.mockups.designTitle}
                      description={t.mockups.designDescription}
                    />
                    <div className="mt-12">
                      <Tabs defaultValue="screen-0" className="w-full">
                        <TabsList className="mb-8 flex h-auto w-full flex-wrap justify-start gap-2">
                          {project.designComponentNames?.map((name, idx) => (
                            <TabsTrigger
                              key={idx}
                              value={`screen-${idx}`}
                              className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                            >
                              <span>{name}</span>
                            </TabsTrigger>
                          ))}
                        </TabsList>
                        {project.designComponents.map((DesignComponent, idx) => (
                          <TabsContent key={idx} value={`screen-${idx}`} className="m-0">
                            <ResponsiveDesignFrame label={project.designComponentNames?.[idx]}>
                              <DesignComponent />
                            </ResponsiveDesignFrame>
                          </TabsContent>
                        ))}
                      </Tabs>
                    </div>
                  </div>
                )}

                {hasMockupTiles && projectMockups && (
                  <div>
                    {hasDesignArtifacts ? (
                      <SectionHeader
                        badge={t.mockups.badge}
                        title={t.mockups.capturesTitle}
                        description={t.mockups.capturesDescription}
                      />
                    ) : (
                      <SectionHeader
                        badge={t.mockups.badge}
                        title={mockupCopy.title}
                        description={mockupCopy.description}
                      />
                    )}
                    <div className={hasDesignArtifacts ? "mt-10" : ""}>
                      <MockupGallery
                        mockups={projectMockups}
                        language={language}
                        embedded
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}