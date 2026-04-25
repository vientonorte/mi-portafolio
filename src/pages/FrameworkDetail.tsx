import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, RefreshCw, TrendingUp, GraduationCap, Users, Home, Sparkles, Zap, Target, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from '@vientonorte/ui/badge';
import { Card, CardContent } from '@vientonorte/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@vientonorte/ui/tabs';
import { SectionHeader } from "../components/molecules/SectionHeader";
import { ProcessPhaseCard } from "../components/molecules/ProcessPhaseCard";
import { ProcessNavigation } from "../components/molecules/ProcessNavigation";
import { SectionDivider } from "../components/molecules/SectionDivider";
import { StatsTooltip } from "../components/molecules/StatsTooltip";
import { StickyCTA } from "../components/molecules/StickyCTA";
import { ProjectCard } from "../components/molecules/ProjectCard";
import { useLanguage } from "../lib/LanguageContext";
import { LanguageToggle } from "../components/atoms/LanguageToggle";

interface CompanyContext {
  id: string;
  name: string;
  logo?: string;
  period: string;
  challenge: {
    title: string;
    problem: string;
    solution: string;
  };
  projects: {
    id: string;
    name: string;
    description: string;
    period: string;
    tags: string[];
    processCount: number;
  }[];
}

interface FrameworkDetailProps {
  onBack: () => void;
  onNavigateToProject?: (companyId: string, projectId: string) => void;
  onNavigateToProcess?: (processId: string) => void;
}

export default function FrameworkDetail({ onBack, onNavigateToProject, onNavigateToProcess }: FrameworkDetailProps) {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState("transvip");

  const processes = [
    {
      id: "ux-analytics",
      number: "01",
      title: language === "es" ? "UX Analytics" : "UX Analytics",
      description: language === "es" 
        ? "Análisis cuantitativo de comportamiento con herramientas de analytics"
        : "Quantitative behavior analysis with analytics tools",
    },
    {
      id: "ux-research",
      number: "02",
      title: language === "es" ? "UX Research" : "UX Research",
      description: language === "es"
        ? "Investigación cualitativa con usuarios finales y stakeholders"
        : "Qualitative research with end users and stakeholders",
    },
    {
      id: "ux-ui-design",
      number: "03",
      title: language === "es" ? "UX/UI Design" : "UX/UI Design",
      description: language === "es"
        ? "Ideación colaborativa, wireframes y prototipos interactivos"
        : "Collaborative ideation, wireframes and interactive prototypes",
    },
    {
      id: "ux-testing",
      number: "04",
      title: language === "es" ? "UX Testing" : "UX Testing",
      description: language === "es"
        ? "Validación de prototipos con usuarios reales mediante testing"
        : "Prototype validation with real users through testing",
    },
    {
      id: "refinamiento",
      number: "05",
      title: language === "es" ? "Refinamiento" : "Refinement",
      description: language === "es"
        ? "Iteración continua post-lanzamiento basada en métricas"
        : "Continuous post-launch iteration based on metrics",
    },
  ];

  const companyContexts: CompanyContext[] = [
    {
      id: "transvip",
      name: "Transvip",
      period: "2021 - 2024",
      challenge: {
        title: language === "es" 
          ? "De procesos ambiguos a framework estructurado" 
          : "From ambiguous processes to structured framework",
        problem: language === "es"
          ? "Anteriormente, el proceso de diseño no contaba con tareas definidas y se sustentaba en dos estados durante los sprints: \"Diseño en progreso\" y \"Diseño en aprobación\". Esto generaba confusión en estimaciones, difícil trazabilidad del trabajo y falta de documentación estructurada."
          : "Previously, the design process had no defined tasks and relied on two states during sprints: \"Design in progress\" and \"Design in approval\". This created confusion in estimations, difficult work traceability, and lack of structured documentation.",
        solution: language === "es"
          ? "Implementé un framework de 5 macroprocesos que estructura cada fase del diseño UX, facilitando la estimación de esfuerzos, el registro del trabajo y la documentación. Cada macroproceso tiene actividades claras, entregables definidos y métricas de éxito."
          : "I implemented a 5 macro-process framework that structures each UX design phase, facilitating effort estimation, work logging, and documentation. Each macro-process has clear activities, defined deliverables, and success metrics.",
      },
      projects: [
        {
          id: "karri-calculadora",
          name: "Karri - Calculadora de Ganancias",
          description: language === "es"
            ? "Sistema de simulación de ingresos para shoppers que permite calcular ganancias proyectadas basadas en parámetros reales."
            : "Income simulation system for shoppers that calculates projected earnings based on real parameters.",
          period: "2022-2023",
          tags: ["Figma", "React Native", "UX Research", "Mobile First", "Design System"],
          processCount: 5,
        },
        {
          id: "karri-notificaciones",
          name: "Karri - Sistema de Notificaciones + Onboarding",
          description: language === "es"
            ? "Hub centralizado de notificaciones y flujo de autenticación para shoppers. Reduce la carga cognitiva y mejora la retención."
            : "Centralized notification hub and authentication flow for shoppers. Reduces cognitive load and improves retention.",
          period: "2022-2023",
          tags: ["Figma", "React Native", "Information Architecture", "Mobile UX", "Accessibility"],
          processCount: 5,
        },
      ],
    },
    {
      id: "sura",
      name: "SURA Investments",
      period: "2024",
      challenge: {
        title: language === "es"
          ? "Modernización de experiencia financiera enterprise"
          : "Enterprise financial experience modernization",
        problem: language === "es"
          ? "[Placeholder] Describe el desafío específico en SURA Investments"
          : "[Placeholder] Describe the specific challenge at SURA Investments",
        solution: language === "es"
          ? "[Placeholder] Describe cómo aplicaste el framework en SURA"
          : "[Placeholder] Describe how you applied the framework at SURA",
      },
      projects: [
        // Se llenarán con datos de SURA
      ],
    },
    {
      id: "otros",
      name: language === "es" ? "Otros Proyectos" : "Other Projects",
      period: "2019 - 2024",
      challenge: {
        title: language === "es"
          ? "Versatilidad del framework en diversos contextos"
          : "Framework versatility across diverse contexts",
        problem: language === "es"
          ? "Cada proyecto presenta desafíos únicos que requieren adaptar la metodología sin perder su esencia."
          : "Each project presents unique challenges requiring methodology adaptation without losing its essence.",
        solution: language === "es"
          ? "El framework se adapta escalando procesos según complejidad: proyectos pequeños priorizan fases críticas, mientras proyectos enterprise implementan todos los macroprocesos."
          : "The framework adapts by scaling processes based on complexity: small projects prioritize critical phases, while enterprise projects implement all macro-processes.",
      },
      projects: [
        // Se llenarán con datos del CV
      ],
    },
  ];

  const navigationSections = [
    { 
      id: "hero", 
      label: language === "es" ? "Framework" : "Framework", 
      number: "00" 
    },
    { 
      id: "process", 
      label: language === "es" ? "Proceso" : "Process", 
      number: "01" 
    },
    { 
      id: "applications", 
      label: language === "es" ? "Aplicaciones" : "Applications", 
      number: "02" 
    },
  ];

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
      {/* Skip Links */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        {language === "es" ? "Saltar al contenido principal" : "Skip to main content"}
      </a>

      {/* Sticky CTA */}
      <StickyCTA
        label={language === "es" ? "Volver a inicio" : "Back to home"}
        onClick={onBack}
        ariaLabel={language === "es" ? "Volver a la página principal" : "Return to main page"}
        showAfterScroll={800}
      />

      {/* Lateral Navigation */}
      <ProcessNavigation sections={navigationSections} />

      {/* Fixed Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/40"
        role="banner"
      >
        <div className="container max-w-7xl mx-auto px-4 py-4">
          {/* Breadcrumbs */}
          <nav aria-label={language === "es" ? "Navegación de ruta" : "Breadcrumb"} className="mb-3">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="h-auto p-0 hover:text-primary transition-colors"
                  aria-label={language === "es" ? "Ir a inicio" : "Go to home"}
                >
                  <Home className="h-4 w-4" />
                </Button>
              </li>
              <li aria-hidden="true">/</li>
              <li className="flex items-center gap-2 text-foreground" aria-current="page">
                <Sparkles className="h-4 w-4" />
                <span>{language === "es" ? "Framework UX" : "UX Framework"}</span>
              </li>
            </ol>
          </nav>

          {/* Header Actions */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="gap-2 hover:gap-3 transition-all"
              aria-label={language === "es" ? "Volver a inicio" : "Back to home"}
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">
                {language === "es" ? "Volver a Inicio" : "Back to Home"}
              </span>
              <span className="sm:hidden">
                {language === "es" ? "Volver" : "Back"}
              </span>
            </Button>

            <LanguageToggle />
          </div>
        </div>
      </motion.header>

      <main id="main-content" role="main">
        {/* Hero Section - MEJORADO */}
        <section 
          id="hero" 
          className="py-20 md:py-32 px-4 relative overflow-hidden scroll-mt-20"
          aria-labelledby="framework-heading"
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

          {/* Floating Elements */}
          {!shouldReduceMotion && (
            <>
              <motion.div
                className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-xl"
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />
              <motion.div
                className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-primary/15 to-primary/5 blur-2xl"
                animate={{
                  y: [0, 20, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                aria-hidden="true"
              />
            </>
          )}

          <div className="container max-w-7xl mx-auto relative z-10">
            <motion.div
              variants={fadeInVariant}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Badge con icono */}
              <motion.div
                variants={scaleVariant}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-6 flex justify-center"
              >
                <Badge variant="outline" className="text-base px-6 py-2 bg-primary/10 border-primary/30 gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span>{language === "es" ? "Metodología UX" : "UX Methodology"}</span>
                </Badge>
              </motion.div>

              {/* Title con gradiente animado */}
              <motion.h1
                id="framework-heading"
                variants={fadeInVariant}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl md:text-8xl mb-8 leading-tight"
              >
                <motion.span
                  className="bg-clip-text text-transparent bg-brand-gradient inline-block"
                  animate={shouldReduceMotion ? {} : { 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  {language === "es" ? "Framework de " : "Product Design "}
                </motion.span>
                <br />
                <motion.span
                  className="bg-clip-text text-transparent bg-brand-gradient inline-block"
                  animate={shouldReduceMotion ? {} : { 
                    backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"] 
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 0.5 }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  {language === "es" ? "Diseño de Producto" : "Framework"}
                </motion.span>
              </motion.h1>

              {/* Subtitle con highlights */}
              <motion.div
                variants={fadeInVariant}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, delay: 0.3 }}
                className="max-w-4xl mx-auto mb-12"
              >
                <p className="text-2xl md:text-3xl text-muted-foreground leading-relaxed mb-6">
                  {language === "es" 
                    ? "5 macroprocesos que priorizan " 
                    : "5 macro-processes that prioritize "}
                  <span className="text-foreground font-medium relative inline-block">
                    {language === "es" ? "decisiones basadas en data" : "data-driven decisions"}
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-1 bg-brand-gradient rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    />
                  </span>
                  {language === "es" ? " y " : " and "}
                  <span className="text-foreground font-medium relative inline-block">
                    {language === "es" ? "validación con usuarios reales" : "real user validation"}
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-1 bg-brand-gradient rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 1.0 }}
                    />
                  </span>
                </p>
              </motion.div>

              {/* Stats Grid - Rediseñado */}
              <motion.div
                variants={fadeInVariant}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16"
                role="region"
                aria-label={language === "es" ? "Estadísticas del framework" : "Framework statistics"}
              >
                <motion.div
                  variants={scaleVariant}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                >
                  <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                    <CardContent className="p-6 text-center">
                      <RefreshCw className="h-8 w-8 text-primary mx-auto mb-3" aria-hidden="true" />
                      <div className="text-4xl font-bold bg-clip-text text-transparent bg-brand-gradient mb-1">
                        5
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {language === "es" ? "Macroprocesos" : "Macro Processes"}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  variants={scaleVariant}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: 0.7 }}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                >
                  <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" aria-hidden="true" />
                      <div className="text-4xl font-bold bg-clip-text text-transparent bg-brand-gradient mb-1">
                        3+
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {language === "es" ? "Años aplicando" : "Years applying"}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  variants={scaleVariant}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: 0.8 }}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                >
                  <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                    <CardContent className="p-6 text-center">
                      <GraduationCap className="h-8 w-8 text-primary mx-auto mb-3" aria-hidden="true" />
                      <div className="text-4xl font-bold bg-clip-text text-transparent bg-brand-gradient mb-1">
                        90%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {language === "es" ? "Eval. pedagógica" : "Teaching eval."}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  variants={scaleVariant}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: 0.9 }}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                >
                  <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                    <CardContent className="p-6 text-center">
                      <Users className="h-8 w-8 text-primary mx-auto mb-3" aria-hidden="true" />
                      <div className="text-4xl font-bold bg-clip-text text-transparent bg-brand-gradient mb-1">
                        25+
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {language === "es" ? "Estudiantes" : "Students"}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              {/* Key Benefits */}
              <motion.div
                variants={fadeInVariant}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, delay: 0.5 }}
                className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
              >
                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                  <CardContent className="p-6 text-center">
                    <Zap className="h-10 w-10 text-primary mx-auto mb-4" aria-hidden="true" />
                    <h3 className="text-lg mb-2">
                      {language === "es" ? "Decisiones data-driven" : "Data-driven decisions"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {language === "es" 
                        ? "Cada decisión respaldada por métricas cuantitativas y feedback cualitativo"
                        : "Every decision backed by quantitative metrics and qualitative feedback"}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                  <CardContent className="p-6 text-center">
                    <Target className="h-10 w-10 text-primary mx-auto mb-4" aria-hidden="true" />
                    <h3 className="text-lg mb-2">
                      {language === "es" ? "Validación continua" : "Continuous validation"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {language === "es" 
                        ? "Testing con usuarios reales en cada fase del proceso"
                        : "Real user testing at every phase of the process"}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                  <CardContent className="p-6 text-center">
                    <RefreshCw className="h-10 w-10 text-primary mx-auto mb-4" aria-hidden="true" />
                    <h3 className="text-lg mb-2">
                      {language === "es" ? "Mejora iterativa" : "Iterative improvement"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {language === "es" 
                        ? "Ciclo continuo de análisis, diseño, validación y refinamiento"
                        : "Continuous cycle of analysis, design, validation and refinement"}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section 
          id="process" 
          className="py-16 md:py-24 px-4 bg-muted/30 scroll-mt-20"
          aria-labelledby="process-heading"
        >
          <div className="container max-w-7xl mx-auto">
            <SectionDivider 
              number="01" 
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
                      phase={process}
                      index={index}
                      onClick={() => onNavigateToProcess?.(process.id)}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Applications Section - CON TABS */}
        <section 
          id="applications" 
          className="py-16 md:py-24 px-4 scroll-mt-20"
          aria-labelledby="applications-heading"
        >
          <div className="container max-w-7xl mx-auto">
            <SectionDivider 
              number="02" 
              label={language === "es" ? "Aplicaciones" : "Applications"} 
              sectionId="applications"
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
                badge={language === "es" ? "Casos de Estudio" : "Case Studies"}
                title={language === "es" ? "Framework en acción" : "Framework in Action"}
                description={language === "es"
                  ? "Cómo el framework se adapta a diferentes contextos empresariales y desafíos específicos."
                  : "How the framework adapts to different business contexts and specific challenges."}
              />

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-12">
                <TabsList className="w-full justify-start mb-8 flex-wrap h-auto bg-muted/50">
                  {companyContexts.map((company) => (
                    <TabsTrigger 
                      key={company.id} 
                      value={company.id}
                      className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:border-primary/30"
                    >
                      <span>{company.name}</span>
                      {company.projects.length > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {company.projects.length}
                        </Badge>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {companyContexts.map((company) => (
                  <TabsContent key={company.id} value={company.id} className="m-0">
                    <div className="space-y-12">
                      {/* Company Challenge */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                          <CardContent className="p-8">
                            <div className="flex items-center gap-3 mb-6">
                              <div className="h-12 w-12 rounded-lg bg-brand-gradient flex items-center justify-center">
                                <Sparkles className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <h3 className="text-2xl">{company.challenge.title}</h3>
                                <p className="text-sm text-muted-foreground">{company.period}</p>
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-medium mb-3 flex items-center gap-2">
                                  <span className="text-destructive">●</span>
                                  {language === "es" ? "Desafío" : "Challenge"}
                                </h4>
                                <p className="text-muted-foreground leading-relaxed">
                                  {company.challenge.problem}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-3 flex items-center gap-2">
                                  <span className="text-primary">●</span>
                                  {language === "es" ? "Aplicación del Framework" : "Framework Application"}
                                </h4>
                                <p className="text-muted-foreground leading-relaxed">
                                  {company.challenge.solution}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>

                      {/* Company Projects */}
                      {company.projects.length > 0 ? (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <h3 className="text-xl mb-6 flex items-center gap-2">
                            <ChevronRight className="h-5 w-5 text-primary" />
                            {language === "es" ? "Proyectos implementados" : "Implemented Projects"}
                          </h3>
                          <div className="grid md:grid-cols-2 gap-6">
                            {company.projects.map((project, index) => (
                              <ProjectCard
                                key={project.id}
                                name={project.name}
                                description={project.description}
                                period={project.period}
                                tags={project.tags}
                                processCount={project.processCount}
                                onClick={() => onNavigateToProject?.(company.id, project.id)}
                                language={language}
                                index={index}
                              />
                            ))}
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="text-center py-12"
                        >
                          <p className="text-muted-foreground">
                            {language === "es" 
                              ? "Proyectos próximamente..." 
                              : "Projects coming soon..."}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
