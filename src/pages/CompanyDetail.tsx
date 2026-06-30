import { motion, useReducedMotion } from "motion/react";
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { 
  ArrowLeft, 
  BarChart3, 
  Users2, 
  Palette, 
  TestTube, 
  Repeat,
  RefreshCw,
  TrendingUp,
  GraduationCap,
  Building2,
  Users,
  TrendingDown
} from "lucide-react";
import { MockupGallery } from "../components/molecules/MockupGallery";
import { useLanguage } from "../lib/LanguageContext";
import { useTranslation } from "../lib/i18n";
import { LanguageToggle } from "../components/atoms/LanguageToggle";
import { CompanyHub } from "../data/projects-data";
import { StickyCTA } from "../components/molecules/StickyCTA";
import { ProcessNavigation } from "../components/molecules/ProcessNavigation";
import { EnhancedBreadcrumbs } from "../components/molecules/EnhancedBreadcrumbs";
import { StatsTooltip } from "../components/molecules/StatsTooltip";
import { SectionDivider } from "../components/molecules/SectionDivider";
import { SectionHeader } from "../components/molecules/SectionHeader";
import { ProcessPhaseCard } from "../components/molecules/ProcessPhaseCard";
import { ProjectCard } from "../components/molecules/ProjectCard";

interface CompanyDetailProps {
  company: CompanyHub;
  onBack: () => void;
  onNavigateToProject?: (projectId: string) => void;
  onNavigateToProcess?: (processId: string) => void;
}

export default function CompanyDetail({ company, onBack, onNavigateToProject, onNavigateToProcess }: CompanyDetailProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const shouldReduceMotion = useReducedMotion();

  const processes = [
    {
      id: "ux-analytics",
      number: "01",
      icon: BarChart3,
      title: language === "es" ? "UX Analytics" : "UX Analytics",
      description: language === "es" 
        ? "Análisis cuantitativo de comportamiento con herramientas de analytics"
        : "Quantitative behavior analysis with analytics tools",
    },
    {
      id: "ux-research",
      number: "02",
      icon: Users2,
      title: language === "es" ? "UX Research" : "UX Research",
      description: language === "es"
        ? "Investigación cualitativa con usuarios finales y stakeholders"
        : "Qualitative research with end users and stakeholders",
    },
    {
      id: "ux-ui-design",
      number: "03",
      icon: Palette,
      title: language === "es" ? "UX/UI Design" : "UX/UI Design",
      description: language === "es"
        ? "Ideación colaborativa, wireframes y prototipos interactivos"
        : "Collaborative ideation, wireframes and interactive prototypes",
    },
    {
      id: "ux-testing",
      number: "04",
      icon: TestTube,
      title: language === "es" ? "UX Testing" : "UX Testing",
      description: language === "es"
        ? "Validación de prototipos con usuarios reales mediante testing"
        : "Prototype validation with real users through testing",
    },
    {
      id: "refinamiento",
      number: "05",
      icon: Repeat,
      title: language === "es" ? "Refinamiento" : "Refinement",
      description: language === "es"
        ? "Iteración continua post-lanzamiento basada en métricas"
        : "Continuous post-launch iteration based on metrics",
    },
  ];

  const navigationSections = [
    { 
      id: "hero", 
      label: language === "es" ? "Empresa" : "Company", 
      number: "00" 
    },
    { 
      id: "challenge", 
      label: language === "es" ? "Desafío" : "Challenge", 
      number: "01" 
    },
    { 
      id: "process", 
      label: language === "es" ? "Proceso" : "Process", 
      number: "02" 
    },
    { 
      id: "projects", 
      label: language === "es" ? "Proyectos" : "Projects", 
      number: "03" 
    },
  ];

  // Animation variants respecting prefers-reduced-motion
  const fadeInVariant = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0 },
  };

  const scaleVariant = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Skip Links - WCAG 2.1 AA */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        {language === "es" ? "Saltar al contenido principal" : "Skip to main content"}
      </a>

      {/* Sticky CTA */}
      <StickyCTA
        label={language === "es" ? "Ver todos los proyectos" : "View all projects"}
        onClick={onBack}
        ariaLabel={language === "es" ? "Volver a la página de proyectos" : "Return to projects page"}
        showAfterScroll={800}
      />

      {/* Lateral Navigation */}
      <ProcessNavigation sections={navigationSections} />

      {/* Fixed Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
        className="subpage-toolbar backdrop-blur-xl bg-background/80 border-b border-border/40"
        role="region"
        aria-label={language === "es" ? "Navegación de empresa" : "Company navigation"}
      >
        <div className="container max-w-7xl mx-auto px-4 py-4">
          {/* Breadcrumbs */}
          <EnhancedBreadcrumbs
            items={[
              { label: language === "es" ? "Inicio" : "Home", onClick: onBack },
              { label: company.name, isActive: true },
            ]}
          />

          {/* Header Actions */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="gap-2 hover:gap-3 transition-all"
              aria-label={language === "es" ? "Volver a lista de proyectos" : "Back to projects list"}
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">
                {language === "es" ? "Volver" : "Back"}
              </span>
            </Button>

            <LanguageToggle />
          </div>
        </div>
      </motion.header>

      <main id="main-content" role="main">
        {/* Hero Section */}
        <section 
          id="hero" 
          className="py-20 md:py-32 px-4 relative overflow-hidden scroll-mt-20"
          aria-labelledby="company-heading"
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
              {company.logo && (
                <motion.div
                  variants={scaleVariant}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <img 
                    src={company.logo} 
                    alt=""
                    role="presentation"
                    className="h-20 w-20 rounded-2xl mx-auto object-cover border-2 border-primary/20"
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
                  {company.industry} • {company.period}
                </Badge>
              </motion.div>

              {/* Company Name */}
              <motion.h1
                id="company-heading"
                variants={fadeInVariant}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl md:text-7xl mb-6"
              >
                <motion.span
                  className="bg-clip-text text-transparent bg-brand-gradient inline-block"
                  animate={shouldReduceMotion ? {} : { opacity: [1, 0.8, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {company.name}
                </motion.span>
              </motion.h1>
              
              <motion.p
                variants={fadeInVariant}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-2xl md:text-3xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-12"
              >
                {language === "es" 
                  ? "Framework de diseño de producto estructurado en 5 macroprocesos que priorizan decisiones basadas en data y validación con usuarios reales"
                  : "Product design framework structured in 5 macro-processes that prioritize data-driven decisions and real user validation"
                }
              </motion.p>

              {/* Subtitle - Company Context */}
              <motion.p
                variants={fadeInVariant}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lg text-muted-foreground/80 max-w-3xl mx-auto mb-16"
              >
                {language === "es"
                  ? "Metodología aplicada de forma transversal en todos los proyectos digitales"
                  : "Methodology applied transversally across all digital projects"
                }
              </motion.p>

              {/* Stats destacados - METODOLOGÍA */}
              <motion.div
                variants={fadeInVariant}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, delay: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-16"
                role="region"
                aria-label={language === "es" ? "Estadísticas de metodología" : "Methodology statistics"}
              >
                <motion.div
                  variants={scaleVariant}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: 0.8 }}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  className="relative group"
                >
                  <StatsTooltip
                    value="5"
                    label={language === "es" ? "Macroprocesos" : "Macro Processes"}
                    icon={RefreshCw}
                    ariaLabel={language === "es" ? "5 macroprocesos UX" : "5 UX macro processes"}
                    tooltipContent={language === "es" 
                      ? "Framework completo de diseño UX" 
                      : "Complete UX design framework"}
                    tooltipContext={language === "es"
                      ? "Analytics, Research, Design, Testing y Refinamiento"
                      : "Analytics, Research, Design, Testing and Refinement"}
                  />
                </motion.div>

                <motion.div
                  variants={scaleVariant}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: 0.9 }}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  className="relative group"
                >
                  <StatsTooltip
                    value={company.methodologyStats?.yearsExperience || "3+"}
                    label={language === "es" ? "Años de experiencia" : "Years of Experience"}
                    icon={TrendingUp}
                    ariaLabel={language === "es" ? `${company.methodologyStats?.yearsExperience || "3+"} de experiencia` : `${company.methodologyStats?.yearsExperience || "3+"} of experience`}
                    tooltipContent={language === "es"
                      ? company.methodologyStats?.experienceContext.es || `Experiencia aplicando metodología UX en ${company.name}`
                      : company.methodologyStats?.experienceContext.en || `Experience applying UX methodology at ${company.name}`}
                    tooltipContext={language === "es"
                      ? company.methodologyStats?.experienceDetail.es || `Desde ${company.period.split(" - ")[0]} desarrollando productos digitales`
                      : company.methodologyStats?.experienceDetail.en || `Since ${company.period.split(" - ")[0]} developing digital products`}
                  />
                </motion.div>

                <motion.div
                  variants={scaleVariant}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: 1.0 }}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  className="relative group"
                >
                  {company.methodologyStats?.teachingEvaluation ? (
                    <StatsTooltip
                      value={company.methodologyStats.teachingEvaluation.value}
                      label={language === "es" ? company.methodologyStats.teachingEvaluation.context.es : company.methodologyStats.teachingEvaluation.context.en}
                      icon={GraduationCap}
                      ariaLabel={`${company.methodologyStats.teachingEvaluation.value} ${language === "es" ? company.methodologyStats.teachingEvaluation.context.es : company.methodologyStats.teachingEvaluation.context.en}`}
                      tooltipContent={language === "es" ? company.methodologyStats.teachingEvaluation.context.es : company.methodologyStats.teachingEvaluation.context.en}
                      tooltipContext={language === "es" ? company.methodologyStats.teachingEvaluation.detail.es : company.methodologyStats.teachingEvaluation.detail.en}
                    />
                  ) : company.methodologyStats?.regionalReach ? (
                    <StatsTooltip
                      value={company.methodologyStats.regionalReach.value}
                      label={language === "es" ? company.methodologyStats.regionalReach.context.es : company.methodologyStats.regionalReach.context.en}
                      icon={Building2}
                      ariaLabel={`${company.methodologyStats.regionalReach.value} ${language === "es" ? company.methodologyStats.regionalReach.context.es : company.methodologyStats.regionalReach.context.en}`}
                      tooltipContent={language === "es" ? company.methodologyStats.regionalReach.context.es : company.methodologyStats.regionalReach.context.en}
                      tooltipContext={language === "es" ? company.methodologyStats.regionalReach.detail.es : company.methodologyStats.regionalReach.detail.en}
                    />
                  ) : (
                    <StatsTooltip
                      value="90%"
                      label={language === "es" ? "Evaluación pedagógica" : "Teaching Evaluation"}
                      icon={GraduationCap}
                      ariaLabel={language === "es" ? "90% en evaluación pedagógica" : "90% teaching evaluation"}
                      tooltipContent={language === "es"
                        ? "Evaluación obtenida como docente en Desafío Latam"
                        : "Teaching evaluation at Desafío Latam"}
                      tooltipContext={language === "es"
                        ? "Bootcamp UX/UI Design - G48 (2023)"
                        : "UX/UI Design Bootcamp - G48 (2023)"}
                    />
                  )}
                </motion.div>

                <motion.div
                  variants={scaleVariant}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: 1.1 }}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  className="relative group"
                >
                  {company.methodologyStats?.studentsImpact ? (
                    <StatsTooltip
                      value={company.methodologyStats.studentsImpact.value}
                      label={language === "es" ? company.methodologyStats.studentsImpact.context.es : company.methodologyStats.studentsImpact.context.en}
                      icon={Users}
                      ariaLabel={`${company.methodologyStats.studentsImpact.value} ${language === "es" ? company.methodologyStats.studentsImpact.context.es : company.methodologyStats.studentsImpact.context.en}`}
                      tooltipContent={language === "es" ? company.methodologyStats.studentsImpact.context.es : company.methodologyStats.studentsImpact.context.en}
                      tooltipContext={language === "es" ? company.methodologyStats.studentsImpact.detail.es : company.methodologyStats.studentsImpact.detail.en}
                    />
                  ) : (
                    <StatsTooltip
                      value="25+"
                      label={language === "es" ? "Estudiantes capacitados" : "Trained Students"}
                      icon={Users}
                      ariaLabel={language === "es" ? "Más de 25 estudiantes capacitados" : "More than 25 trained students"}
                      tooltipContent={language === "es"
                        ? "Estudiantes capacitados en metodología UX"
                        : "Students trained in UX methodology"}
                      tooltipContext={language === "es"
                        ? "Talleres de UX Research, Testing y Design Systems"
                        : "UX Research, Testing and Design Systems workshops"}
                    />
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Challenge Section - EL DESAFÍO */}
        <section 
          id="challenge" 
          className="py-16 md:py-24 px-4 bg-muted/30 scroll-mt-20"
          aria-labelledby="challenge-heading"
        >
          <div className="container max-w-7xl mx-auto">
            <SectionDivider 
              number="01" 
              label={language === "es" ? "El Desafío" : "The Challenge"} 
              sectionId="challenge"
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
                badge={language === "es" ? "El Desafío" : "The Challenge"}
                title={language === "es" ? "De procesos ambiguos a framework estructurado" : "From ambiguous processes to structured framework"}
                description={language === "es" 
                  ? "Transformar la manera de trabajar en diseño UX mediante un framework claro y documentado."
                  : "Transform the way we work in UX design through a clear, documented framework."}
              />

              <div className="grid md:grid-cols-2 gap-8 mt-12">
                {/* Problema */}
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
                          {language === "es" ? "El problema inicial" : "Initial Problem"}
                        </h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {language === "es"
                          ? "Anteriormente, el proceso de diseño no contaba con tareas definidas y se sustentaba en dos estados durante los sprints: \"Diseño en progreso\" y \"Diseño en aprobación\"."
                          : "Previously, the design process had no defined tasks and relied on two states during sprints: \"Design in progress\" and \"Design in approval\"."}
                      </p>
                    </CardContent>
                  </Card>
                </motion.article>

                {/* Solución */}
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
                          {language === "es" ? "Propuesta de framework" : "Framework Proposal"}
                        </h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {language === "es"
                          ? "Definir claramente los macroprocesos del diseño de producto, facilitando la estimación de esfuerzos, el registro del trabajo y la documentación estructurada."
                          : "Clearly define product design macro-processes, facilitating effort estimation, work logging, and structured documentation."}
                      </p>
                    </CardContent>
                  </Card>
                </motion.article>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Process Section - LOS 5 MACROPROCESOS */}
        <section 
          id="process" 
          className="py-16 md:py-24 px-4 scroll-mt-20"
          aria-labelledby="process-heading"
        >
          <div className="container max-w-7xl mx-auto">
            <SectionDivider 
              number="02" 
              label={language === "es" ? "Mi Proceso" : "My Process"} 
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
                title={language === "es" ? "Los 5 macroprocesos" : "The 5 Macro Processes"}
                description={language === "es"
                  ? "Cada fase está pensada para agregar valor mediante mejora continua y validación constante."
                  : "Each phase is designed to add value through continuous improvement and constant validation."}
              />

              <div 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
                role="list"
                aria-label={language === "es" ? "Lista de macroprocesos UX" : "UX macro processes list"}
              >
                {processes.map((process, index) => (
                  <div key={process.id} role="listitem">
                    <ProcessPhaseCard
                      icon={process.icon}
                      title={process.title}
                      description={process.description}
                      index={index}
                      onClick={() => onNavigateToProcess?.(process.id)}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section 
          id="projects" 
          className="py-16 md:py-24 px-4 bg-muted/30 scroll-mt-20"
          aria-labelledby="projects-heading"
        >
          <div className="container max-w-7xl mx-auto">
            <SectionDivider 
              number="03" 
              label={language === "es" ? "Proyectos" : "Projects"} 
              sectionId="projects"
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
                badge={language === "es" ? `${company.totalProjects} Proyectos` : `${company.totalProjects} Projects`}
                title={language === "es" ? "Aplicación transversal del framework" : "Transversal framework application"}
                description={language === "es"
                  ? "Cada proyecto implementa los 5 macroprocesos de forma integral, adaptándose a las necesidades específicas del producto."
                  : "Each project implements all 5 macro-processes holistically, adapting to specific product needs."}
              />

              <div 
                className="grid md:grid-cols-2 gap-6 mt-12"
                role="list"
                aria-label={language === "es" ? "Lista de proyectos" : "Projects list"}
              >
                {/* Proyecto 1: Karri - Calculadora de Ganancias */}
                <ProjectCard
                  name="Karri - Calculadora de Ganancias"
                  description={language === "es"
                    ? "Sistema de simulación de ingresos para shoppers que permite calcular ganancias proyectadas basadas en parámetros reales."
                    : "Income simulation system for shoppers that calculates projected earnings based on real parameters."}
                  period="2022-2023"
                  tags={["Figma", "React Native", "UX Research", "Mobile First", "Design System"]}
                  processCount={5}
                  onClick={() => onNavigateToProject?.("karri-calculadora")}
                  language={language}
                  index={0}
                />

                {/* Proyecto 2: Karri - Sistema de Notificaciones */}
                <ProjectCard
                  name="Karri - Sistema de Notificaciones + Onboarding"
                  description={language === "es"
                    ? "Hub centralizado de notificaciones y flujo de autenticación para shoppers. Reduce la carga cognitiva y mejora la retención."
                    : "Centralized notification hub and authentication flow for shoppers. Reduces cognitive load and improves retention."}
                  period="2022-2023"
                  tags={["Figma", "React Native", "Information Architecture", "Mobile UX", "Accessibility"]}
                  processCount={5}
                  onClick={() => onNavigateToProject?.("karri-notificaciones")}
                  language={language}
                  index={1}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mockups Gallery - Evidencias visuales de proyectos */}
        {company.projects.some(p => p.details?.mockups && p.details.mockups.length > 0) && (
          <MockupGallery
            mockups={company.projects.flatMap(p => p.details?.mockups || [])}
            title={language === "es" ? "Evidencias Visuales del Proyecto RIA SURA US" : "RIA SURA US Project Visual Evidence"}
            description={language === "es" 
              ? "Mockups de alta fidelidad del flujo de onboarding diseñado para la plataforma RIA (Registered Investment Advisor) en Estados Unidos" 
              : "High-fidelity mockups of the onboarding flow designed for the RIA (Registered Investment Advisor) platform in the United States"}
            language={language}
          />
        )}
      </main>
    </div>
  );
}