import { motion } from "motion/react";
import { ArrowLeft, BarChart3, Search, Palette, TestTube, RefreshCw, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { SectionHeader } from "../components/molecules/SectionHeader";
import { ProcessPhaseCard } from "../components/molecules/ProcessPhaseCard";
import { ProcessNavigation } from "../components/molecules/ProcessNavigation";
import { SectionDivider } from "../components/molecules/SectionDivider";
import { useLanguage } from "../lib/LanguageContext";
import { useTranslation } from "../lib/i18n";
import { LanguageToggle } from "../components/atoms/LanguageToggle";
import { SEOHead } from "../components/atoms/SEOHead";

interface CaseStudiesProps {
  onBack: () => void;
  onNavigateToProcess?: (processId: string) => void;
}

export default function CaseStudies({ onBack, onNavigateToProcess }: CaseStudiesProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);

  const processes = [
    {
      id: "ux-analytics",
      icon: BarChart3,
      title: t.caseStudies.process.phases.analytics.title,
      description: t.caseStudies.process.phases.analytics.description,
    },
    {
      id: "ux-research",
      icon: Search,
      title: t.caseStudies.process.phases.research.title,
      description: t.caseStudies.process.phases.research.description,
    },
    {
      id: "ux-ui-design",
      icon: Palette,
      title: t.caseStudies.process.phases.design.title,
      description: t.caseStudies.process.phases.design.description,
    },
    {
      id: "ux-testing",
      icon: TestTube,
      title: t.caseStudies.process.phases.testing.title,
      description: t.caseStudies.process.phases.testing.description,
    },
    {
      id: "refinamiento",
      icon: RefreshCw,
      title: t.caseStudies.process.phases.refinement.title,
      description: t.caseStudies.process.phases.refinement.description,
    },
  ];

  const navigationSections = [
    { id: "hero", label: t.caseStudies.navigation.hero, number: "00" },
    { id: "challenge", label: t.caseStudies.navigation.challenge, number: "01" },
    { id: "process", label: t.caseStudies.navigation.process, number: "02" },
    { id: "valueChain", label: t.caseStudies.navigation.valueChain, number: "03" },
    { id: "cta", label: t.caseStudies.navigation.cta, number: "04" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <SEOHead 
        title="Framework UX & Case Studies"
        description="Framework de UX completo: Analytics, Research, UI Design y Testing. Metodología aplicada en casos reales de SURA, Transvip y Karri."
      />
      {/* Process Navigation - Lateral TOC */}
      <ProcessNavigation sections={navigationSections} />

      {/* Fixed Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="subpage-toolbar backdrop-blur-xl bg-background/80 border-b border-border/40"
      >
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className="gap-2 hover:gap-3 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.caseStudies.cta.backToPortfolio}
          </Button>

          <LanguageToggle />
        </div>
      </motion.header>

      {/* Hero Section - MEGA DESTACADO */}
      <section id="hero" className="py-20 md:py-32 px-4 relative overflow-hidden">
        {/* Animated gradient background */}
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
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        <div className="container max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto text-center"
          >
            {/* Glowing badge */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(255, 29, 37, 0.3)",
                  "0 0 40px rgba(255, 147, 30, 0.3)",
                  "0 0 20px rgba(255, 29, 37, 0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block mb-8"
            >
              <Badge variant="secondary" className="text-base uppercase tracking-wider py-2 px-6 bg-brand-gradient text-white">
                {t.caseStudies.hero.badge}
              </Badge>
            </motion.div>
            
            {/* MEGA TITLE con gradiente animado */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight"
            >
              <motion.span
                className="bg-clip-text text-transparent bg-brand-gradient inline-block"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t.caseStudies.hero.title}
              </motion.span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl md:text-3xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-12"
            >
              {t.caseStudies.hero.description}
            </motion.p>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-20"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block"
              >
                <div className="h-12 w-8 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
                  <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-2 w-2 rounded-full bg-primary"
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Challenge Section */}
      <section id="challenge" className="py-16 md:py-24 px-4 bg-muted/30 scroll-mt-20">
        <div className="container max-w-7xl mx-auto">
          <SectionDivider number="01" label={t.caseStudies.challenge.badge} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              {t.caseStudies.challenge.title}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Problem Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-2 border-destructive/30 bg-destructive/5">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                      <TrendingDown className="h-6 w-6 text-destructive" />
                    </div>
                    <h3 className="font-bold text-2xl">{t.caseStudies.challenge.subtitle}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {t.caseStudies.challenge.problem}
                  </p>
                  
                  {/* Visual representation */}
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-destructive/20 flex items-center justify-center text-xs font-bold">1</div>
                      <div className="flex-1 h-12 rounded bg-muted flex items-center px-4 text-sm italic">
                        "Diseño en progreso"
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-destructive/20 flex items-center justify-center text-xs font-bold">2</div>
                      <div className="flex-1 h-12 rounded bg-muted flex items-center px-4 text-sm italic">
                        "Diseño en aprobación"
                      </div>
                    </div>
                    <div className="flex items-center justify-center py-2">
                      <span className="text-xs text-destructive font-medium">❌ Ambiguo y difícil de trackear</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Solution Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full border-2 border-primary/30 bg-primary/5 relative overflow-hidden">
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
                
                <CardContent className="p-8 relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-2xl">{t.caseStudies.challenge.solution}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {t.caseStudies.challenge.solutionText}
                  </p>

                  {/* Visual representation */}
                  <div className="mt-6 space-y-2">
                    {['Analytics', 'Research', 'Design', 'Testing', 'Refinamiento'].map((phase, idx) => (
                      <motion.div
                        key={phase}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="h-8 w-8 rounded bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                          {idx + 1}
                        </div>
                        <div className="flex-1 h-10 rounded bg-background border border-primary/20 flex items-center px-4 text-sm font-medium">
                          {phase}
                        </div>
                      </motion.div>
                    ))}
                    <div className="flex items-center justify-center py-2">
                      <span className="text-xs text-primary font-medium">✓ Estructurado y medible</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-16 md:py-24 px-4 scroll-mt-20">
        <div className="container max-w-7xl mx-auto">
          <SectionDivider number="02" label={t.caseStudies.process.badge} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              {t.caseStudies.process.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl">
              {t.caseStudies.process.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {processes.map((process, index) => (
              <ProcessPhaseCard 
                key={process.title} 
                {...process} 
                index={index}
                onClick={() => onNavigateToProcess?.(process.id)}
              />
            ))}
          </div>

          {/* Process Flow Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-8 bg-gradient-to-br from-muted/50 to-muted/20 border-2">
              <h4 className="font-bold text-xl mb-6 text-center">Flujo de Mejora Continua</h4>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                {processes.map((process, idx) => (
                  <motion.div
                    key={process.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/30">
                        <process.icon className="h-7 w-7 text-primary" />
                      </div>
                      <span className="text-xs font-medium mt-2 max-w-[80px] text-center leading-tight">
                        {process.title}
                      </span>
                    </div>
                    
                    {idx < processes.length - 1 && (
                      <ArrowRight className="h-6 w-6 text-muted-foreground hidden md:block" />
                    )}
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Value Chain Section */}
      <section id="valueChain" className="py-16 md:py-24 px-4 bg-muted/30 scroll-mt-20">
        <div className="container max-w-7xl mx-auto">
          <SectionDivider number="03" label={t.caseStudies.valueChain.badge} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              {t.caseStudies.valueChain.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl">
              {t.caseStudies.valueChain.description}
            </p>
          </motion.div>

          {/* Active vs Passive Discovery Comparison */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Active Discovery */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 border-primary/30 bg-primary/5">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-2xl text-primary">
                      {t.caseStudies.valueChain.activeDiscovery.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {t.caseStudies.valueChain.activeDiscovery.description}
                  </p>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-sm">Decisiones basadas en data real</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-sm">Identificación proactiva de problemas</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-sm">Priorización estratégica de esfuerzos</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Passive Discovery */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full border-2 border-muted-foreground/20">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                      <TrendingDown className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-bold text-2xl text-muted-foreground">
                      {t.caseStudies.valueChain.passiveDiscovery.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {t.caseStudies.valueChain.passiveDiscovery.description}
                  </p>

                  <div className="mt-6 space-y-3 opacity-60">
                    <div className="flex items-start gap-2">
                      <span className="text-muted-foreground mt-1">✗</span>
                      <span className="text-sm">Reacción a quejas de stakeholders</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-muted-foreground mt-1">✗</span>
                      <span className="text-sm">Falta de priorización clara</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-muted-foreground mt-1">✗</span>
                      <span className="text-sm">Correcciones costosas post-desarrollo</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Benefit Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-12"
          >
            <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-2xl">💡</span>
                  </div>
                  <p className="text-lg leading-relaxed">
                    {t.caseStudies.valueChain.benefit}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Value Chain Diagram */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 bg-background">
              <h4 className="font-bold text-xl mb-8 text-center">Cadena de Valor UX/UI Design</h4>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Discovery Activo */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex-1 w-full"
                >
                  <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-2 border-blue-500/30 rounded-xl p-6">
                    <h5 className="font-bold text-center mb-4 text-blue-600">
                      {t.caseStudies.valueChain.phases.discovery}
                    </h5>
                    <div className="space-y-2">
                      <div className="bg-background/50 rounded p-3 text-sm text-center">UX Analytics</div>
                      <div className="bg-background/50 rounded p-3 text-sm text-center">UX Research</div>
                    </div>
                  </div>
                </motion.div>

                <ArrowRight className="h-8 w-8 text-muted-foreground rotate-90 md:rotate-0" />

                {/* Product Design */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex-1 w-full"
                >
                  <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-2 border-green-500/30 rounded-xl p-6">
                    <h5 className="font-bold text-center mb-4 text-green-600">
                      {t.caseStudies.valueChain.phases.productDesign}
                    </h5>
                    <div className="space-y-2">
                      <div className="bg-background/50 rounded p-3 text-sm text-center">UX/UI Design</div>
                      <div className="bg-background/50 rounded p-3 text-sm text-center">UX Testing</div>
                    </div>
                  </div>
                </motion.div>

                <ArrowRight className="h-8 w-8 text-muted-foreground rotate-90 md:rotate-0" />

                {/* Development */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex-1 w-full"
                >
                  <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-2 border-purple-500/30 rounded-xl p-6">
                    <h5 className="font-bold text-center mb-4 text-purple-600">
                      {t.caseStudies.valueChain.phases.development}
                    </h5>
                    <div className="space-y-2">
                      <div className="bg-background/50 rounded p-3 text-sm text-center">MVP</div>
                      <div className="bg-background/50 rounded p-3 text-sm text-center">Refinamiento</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-16 md:py-24 px-4 scroll-mt-20">
        <div className="container max-w-7xl mx-auto text-center">
          <SectionDivider number="04" label={language === "es" ? "Proyectos Reales" : "Real Projects"} />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              ¿Quieres ver este framework en acción?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explora proyectos reales donde apliqué esta metodología en empresas como SURA y Transvip
            </p>
            
            <Button
              size="lg"
              onClick={onBack}
              className="bg-brand-gradient hover:opacity-90 transition-opacity group relative overflow-hidden text-lg px-8 py-6 h-auto"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              <span className="relative flex items-center gap-2">
                {t.caseStudies.cta.viewProjects}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}