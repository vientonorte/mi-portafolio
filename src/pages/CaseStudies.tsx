import { motion } from "motion/react";
import { BarChart3, Search, Palette, TestTube, RefreshCw, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ProcessPhaseCard } from "../components/molecules/ProcessPhaseCard";
import { ProcessNavigation } from "../components/molecules/ProcessNavigation";
import { ProcessOutcomeStrip } from "../components/molecules/ProcessOutcomeStrip";
import { SubpageToolbar } from "../components/molecules/SubpageToolbar";
import { SectionDivider } from "../components/molecules/SectionDivider";
import { useLanguage } from "../lib/LanguageContext";
import { useTranslation } from "../lib/i18n";
import { SEOHead } from "../components/atoms/SEOHead";
import { GradientHeading } from "../components/atoms/GradientHeading";
import { canonicalFromPath } from "../lib/seo";
import { FlagshipCaseStudy } from "../components/organisms/FlagshipCaseStudy";
import { processesData } from "../data/processes-data";

const processIds = ["ux-analytics", "ux-research", "ux-ui-design", "ux-testing", "refinamiento"] as const;

interface CaseStudiesProps {
  onBack: () => void;
  onNavigateToProcess?: (processId: string) => void;
  onNavigateToFramework?: () => void;
  onNavigateToProject?: (projectId: string) => void;
}

export default function CaseStudies({
  onBack,
  onNavigateToProcess,
  onNavigateToFramework,
  onNavigateToProject,
}: CaseStudiesProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);

  const phaseContent = {
    "ux-analytics": t.caseStudies.process.phases.analytics,
    "ux-research": t.caseStudies.process.phases.research,
    "ux-ui-design": t.caseStudies.process.phases.design,
    "ux-testing": t.caseStudies.process.phases.testing,
    refinamiento: t.caseStudies.process.phases.refinement,
  };

  const processes = processIds.map((id) => {
    const data = processesData[id];
    const evidence = data.evidence;
    return {
      id,
      icon: data.icon,
      title: phaseContent[id].title,
      description: phaseContent[id].description,
      company: evidence.company,
      metric: evidence.metric,
      metricLabel: language === "es" ? evidence.metricLabel : evidence.metricLabelEN,
      viewLabel: t.caseStudies.process.viewApplication,
    };
  });

  const heroMetrics = processIds.slice(0, 4).map((id) => {
    const evidence = processesData[id].evidence;
    return {
      id,
      phase: phaseContent[id].title,
      company: evidence.company,
      metric: evidence.metric,
      label: language === "es" ? evidence.metricLabel : evidence.metricLabelEN,
    };
  });

  const navigationSections = [
    { id: "hero", label: t.caseStudies.navigation.hero, number: "00" },
    { id: "flagship", label: t.flagshipCaseStudy.badge, number: "01" },
    { id: "challenge", label: t.caseStudies.navigation.challenge, number: "02" },
    { id: "process", label: t.caseStudies.navigation.process, number: "03" },
    { id: "valueChain", label: t.caseStudies.navigation.valueChain, number: "04" },
    { id: "cta", label: t.caseStudies.navigation.cta, number: "05" },
  ];

  return (
    <div className="min-h-screen bg-background pb-8">
      <SEOHead
        {...t.seo.pages.cases}
        keywords={t.seo.keywords}
        url={canonicalFromPath('/cases')}
      />
      <SubpageToolbar
        crumbs={[{ label: t.breadcrumbs.process, current: true }]}
      />

      <ProcessNavigation
        sections={navigationSections}
        mobileAriaLabel={t.caseStudies.navMobile}
      />

      {/* Hero Section - MEGA DESTACADO */}
      <section id="hero" className="subpage-hero py-12 md:py-20 px-4 relative overflow-hidden">
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
            <h1 className="subpage-hero__title mb-6">
              <GradientHeading as="span">{t.caseStudies.hero.title}</GradientHeading>
            </h1>
            
            <p className="subpage-hero__lead text-muted-foreground mb-8 px-2">
              {t.caseStudies.hero.description}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-5xl mx-auto mb-10"
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                {t.caseStudies.hero.metricsTitle}
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {heroMetrics.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onNavigateToProcess?.(item.id)}
                    className="rounded-xl border-2 border-primary/20 bg-background/80 p-4 text-left transition-all hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary">{item.company}</span>
                    <div className="text-2xl md:text-3xl font-black text-foreground mt-1">{item.metric}</div>
                    <p className="text-xs text-muted-foreground mt-1 leading-snug">{item.label}</p>
                    <p className="text-xs text-primary/70 mt-2 font-medium">{item.phase}</p>
                  </button>
                ))}
              </div>
            </motion.div>

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

      {onNavigateToProject && (
        <FlagshipCaseStudy onReadCase={onNavigateToProject} />
      )}

      {/* Challenge Section */}
      <section id="challenge" className="py-16 md:py-24 px-4 bg-muted/30 scroll-mt-20">
        <div className="container max-w-7xl mx-auto">
          <SectionDivider number="02" label={t.caseStudies.challenge.badge} />

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
                        {t.caseStudies.challenge.sprintProgress}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-destructive/20 flex items-center justify-center text-xs font-bold">2</div>
                      <div className="flex-1 h-12 rounded bg-muted flex items-center px-4 text-sm italic">
                        {t.caseStudies.challenge.sprintApproval}
                      </div>
                    </div>
                    <div className="flex items-center justify-center py-2">
                      <span className="text-xs text-destructive font-medium">{t.caseStudies.challenge.ambiguous}</span>
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
                    {t.caseStudies.challenge.phaseNames.map((phase, idx) => (
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
                      <span className="text-xs text-primary font-medium">{t.caseStudies.challenge.structured}</span>
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
          <SectionDivider number="03" label={t.caseStudies.process.badge} />

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
              <h3 className="font-bold text-xl mb-6 text-center">{t.caseStudies.process.flowTitle}</h3>
              
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

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 rounded-xl border border-primary/20 bg-primary/5 p-4 md:p-6"
          >
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="border-primary/30 text-primary">
                {t.caseStudies.bridge.badge}
              </Badge>
              <p className="text-sm text-muted-foreground">{t.caseStudies.bridge.description}</p>
            </div>
            <ProcessOutcomeStrip
              items={processes.map(({ id, title, company, metric }) => ({ id, title, company, metric }))}
              onItemClick={(id) => onNavigateToProcess?.(id)}
              ariaLabel={t.caseStudies.bridge.stripLabel}
            />
          </motion.div>
        </div>
      </section>

      {/* Value Chain Section */}
      <section id="valueChain" className="py-16 md:py-24 px-4 bg-muted/30 scroll-mt-20">
        <div className="container max-w-7xl mx-auto">
          <SectionDivider number="04" label={t.caseStudies.valueChain.badge} />

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
                      <span className="text-sm">{t.caseStudies.valueChain.activeBullets[0]}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-sm">{t.caseStudies.valueChain.activeBullets[1]}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-sm">{t.caseStudies.valueChain.activeBullets[2]}</span>
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
                      <span className="text-sm">{t.caseStudies.valueChain.passiveBullets[0]}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-muted-foreground mt-1">✗</span>
                      <span className="text-sm">{t.caseStudies.valueChain.passiveBullets[1]}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-muted-foreground mt-1">✗</span>
                      <span className="text-sm">{t.caseStudies.valueChain.passiveBullets[2]}</span>
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
              <h3 className="font-bold text-xl mb-8 text-center">{t.caseStudies.valueChain.diagramTitle}</h3>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Discovery Activo */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex-1 w-full"
                >
                  <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-2 border-blue-500/30 rounded-xl p-6">
                    <h4 className="font-bold text-center mb-4 text-blue-600">
                      {t.caseStudies.valueChain.phases.discovery}
                    </h4>
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
                    <h4 className="font-bold text-center mb-4 text-green-600">
                      {t.caseStudies.valueChain.phases.productDesign}
                    </h4>
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
                    <h4 className="font-bold text-center mb-4 text-purple-600">
                      {t.caseStudies.valueChain.phases.development}
                    </h4>
                    <div className="space-y-2">
                      <div className="bg-background/50 rounded p-3 text-sm text-center">{t.caseStudies.valueChain.diagramMvp}</div>
                      <div className="bg-background/50 rounded p-3 text-sm text-center">{t.caseStudies.valueChain.diagramRefinement}</div>
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
          <SectionDivider number="05" label={t.caseStudies.cta.sectionLabel} />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              {t.caseStudies.cta.title}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t.caseStudies.cta.description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {onNavigateToFramework && (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={onNavigateToFramework}
                  className="text-lg px-8 py-6 h-auto border-2"
                >
                  {t.projectsHub.frameworkButton}
                </Button>
              )}
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
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}