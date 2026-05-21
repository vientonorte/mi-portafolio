import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  BarChart3,
  Users,
  Palette,
  TestTube,
  RefreshCw,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Target,
  Lightbulb,
  TrendingUp,
  X,
} from "lucide-react";
import { frameworkPhases, frameworkPrinciples, frameworkCaseStudies } from "../../data/framework-data";
import type { FrameworkPhase } from "../../data/framework-data";

const iconMap = {
  BarChart3,
  Users,
  Palette,
  TestTube,
  RefreshCw,
};

interface FrameworkDetailPageProps {
  lang: "es" | "en";
  onClose?: () => void;
}

export function FrameworkDetailPage({ lang, onClose }: FrameworkDetailPageProps) {
  const [selectedPhase, setSelectedPhase] = useState<FrameworkPhase | null>(null);
  const [activeTab, setActiveTab] = useState<string>("overview");

  const t = {
    es: {
      title: "Framework UX",
      subtitle: "Discovery & Product Design",
      description: "Metodología de 5 macroprocesos que priorizan decisiones basadas en data y validación con usuarios reales",
      viewPhase: "Ver detalle",
      closePhase: "Cerrar",
      objectives: "Objetivos",
      methods: "Métodos",
      tools: "Herramientas",
      deliverables: "Entregables",
      duration: "Duración",
      keyQuestions: "Preguntas Clave",
      tabOverview: "Visión General",
      tabPrinciples: "Principios",
      tabCases: "Casos de Uso",
      phases: "Los 5 Macroprocesos",
      phasesDesc: "Cada fase se conecta y alimenta a las demás en un ciclo continuo de mejora",
    },
    en: {
      title: "UX Framework",
      subtitle: "Discovery & Product Design",
      description: "5-stage methodology prioritizing data-driven decisions and real user validation",
      viewPhase: "View details",
      closePhase: "Close",
      objectives: "Objectives",
      methods: "Methods",
      tools: "Tools",
      deliverables: "Deliverables",
      duration: "Duration",
      keyQuestions: "Key Questions",
      tabOverview: "Overview",
      tabPrinciples: "Principles",
      tabCases: "Use Cases",
      phases: "The 5 Core Processes",
      phasesDesc: "Each phase connects and feeds the others in a continuous improvement cycle",
    },
  }[lang];

  const principles = frameworkPrinciples[lang];
  const cases = frameworkCaseStudies[lang];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background border-b">
        <motion.div
          className="absolute inset-0 bg-brand-gradient opacity-5"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">
          {onClose && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6"
            >
              <Button
                variant="ghost"
                onClick={onClose}
                className="gap-2 hover:gap-3 transition-all"
              >
                ← Volver a proyectos
              </Button>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              className="inline-flex items-center justify-center mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <div className="h-20 w-20 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-lg">
                <Target className="h-10 w-10 text-white" />
              </div>
            </motion.div>

            <h1 className="mb-4">
              {t.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              {t.subtitle}
            </p>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              {t.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="overview">{t.tabOverview}</TabsTrigger>
            <TabsTrigger value="principles">{t.tabPrinciples}</TabsTrigger>
            <TabsTrigger value="cases">{t.tabCases}</TabsTrigger>
          </TabsList>

          {/* Tab 1: Overview - Las 5 fases */}
          <TabsContent value="overview" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="mb-3">{t.phases}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t.phasesDesc}
              </p>
            </motion.div>

            {/* Process Flow Visualization */}
            <div className="hidden lg:flex items-center justify-center gap-4 mb-12">
              {frameworkPhases.map((phase, idx) => (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="flex flex-col items-center gap-2 cursor-pointer"
                    onClick={() => setSelectedPhase(phase)}
                  >
                    <div
                      className="h-16 w-16 rounded-full flex items-center justify-center shadow-lg text-white"
                      style={{ background: phase.color }}
                    >
                      <span className="text-2xl font-bold">{phase.number}</span>
                    </div>
                    <span className="text-xs text-center max-w-[80px]">
                      {lang === "es" ? phase.name : phase.nameEN}
                    </span>
                  </motion.div>
                  
                  {idx < frameworkPhases.length - 1 && (
                    <ChevronRight className="h-6 w-6 text-muted-foreground mx-2" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Phase Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {frameworkPhases.map((phase, idx) => {
                const Icon = iconMap[phase.icon as keyof typeof iconMap];
                
                return (
                  <motion.div
                    key={phase.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 cursor-pointer group relative overflow-hidden">
                      {/* Gradient accent */}
                      <div
                        className="absolute top-0 left-0 right-0 h-1"
                        style={{ background: phase.color }}
                      />

                      {/* Phase number badge */}
                      <div className="absolute top-4 right-4">
                        <motion.div
                          className="h-10 w-10 rounded-full flex items-center justify-center text-white shadow-md"
                          style={{ background: phase.color }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <span className="font-bold">{phase.number}</span>
                        </motion.div>
                      </div>

                      <CardHeader className="pb-4">
                        <div className="flex items-start gap-3 mb-4">
                          <motion.div
                            className="h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${phase.color}15` }}
                            whileHover={{ scale: 1.05 }}
                          >
                            {Icon && <Icon className="h-6 w-6" style={{ color: phase.color }} />}
                          </motion.div>

                          <div className="flex-1 min-w-0 pt-1">
                            <h3 className="text-base mb-1">
                              {lang === "es" ? phase.name : phase.nameEN}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {lang === "es" ? phase.tagline : phase.taglineEN}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {lang === "es" ? phase.description : phase.descriptionEN}
                        </p>
                      </CardHeader>

                      {/* Image preview */}
                      <motion.div
                        className="relative h-40 mx-6 rounded-lg overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                      >
                        <ImageWithFallback
                          src={phase.image}
                          alt={lang === "es" ? phase.name : phase.nameEN}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      </motion.div>

                      <CardContent className="pt-6">
                        {/* Quick info */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">⏱️ {t.duration}:</span>
                            <Badge variant="outline">
                              {lang === "es" ? phase.duration : phase.durationEN}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">🛠️ {t.tools}:</span>
                            <Badge variant="secondary">{phase.tools.length}</Badge>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">📦 {t.deliverables}:</span>
                            <Badge variant="secondary">
                              {(lang === "es" ? phase.deliverables : phase.deliverablesEN).length}
                            </Badge>
                          </div>
                        </div>

                        <Button
                          onClick={() => setSelectedPhase(phase)}
                          className="w-full bg-brand-gradient hover:opacity-90 group/btn"
                        >
                          {t.viewPhase}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          {/* Tab 2: Principles */}
          <TabsContent value="principles" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="mb-3">{principles.title}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Filosofía que guía cada decisión de diseño
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {principles.principles.map((principle, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all border-2 hover:border-primary/20">
                    <CardContent className="pt-6">
                      <h3 className="text-base mb-3">{principle.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {principle.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Tab 3: Case Studies */}
          <TabsContent value="cases" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="mb-3">{cases.title}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {cases.description}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cases.cases.map((caseStudy, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="hover:shadow-xl transition-all border-2 hover:border-primary/30">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline">{caseStudy.company}</Badge>
                        <TrendingUp className="h-5 w-5 text-green-500" />
                      </div>
                      <h3 className="text-lg mb-2">{caseStudy.project}</h3>
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-semibold">{caseStudy.impact}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground mb-3">
                          Fases aplicadas:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {caseStudy.phases.map((phaseName) => (
                            <Badge key={phaseName} variant="secondary" className="text-xs">
                              {phaseName}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Phase Detail Modal */}
      <AnimatePresence>
        {selectedPhase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhase(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b z-10 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className="h-16 w-16 rounded-2xl flex items-center justify-center text-white shadow-lg flex-shrink-0"
                      style={{ background: selectedPhase.color }}
                    >
                      {(() => {
                        const Icon = iconMap[selectedPhase.icon as keyof typeof iconMap];
                        return Icon ? <Icon className="h-8 w-8" /> : null;
                      })()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge style={{ backgroundColor: selectedPhase.color, color: "white" }}>
                          Fase {selectedPhase.number}
                        </Badge>
                      </div>
                      <h2 className="text-xl sm:text-2xl mb-1 truncate">
                        {lang === "es" ? selectedPhase.name : selectedPhase.nameEN}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {lang === "es" ? selectedPhase.tagline : selectedPhase.taglineEN}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedPhase(null)}
                    className="flex-shrink-0"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Image */}
                <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden">
                  <ImageWithFallback
                    src={selectedPhase.image}
                    alt={lang === "es" ? selectedPhase.name : selectedPhase.nameEN}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>

                {/* Description */}
                <div>
                  <p className="text-base leading-relaxed">
                    {lang === "es" ? selectedPhase.description : selectedPhase.descriptionEN}
                  </p>
                </div>

                {/* Objectives */}
                <div>
                  <h3 className="text-lg mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5" style={{ color: selectedPhase.color }} />
                    {t.objectives}
                  </h3>
                  <ul className="space-y-2">
                    {(lang === "es" ? selectedPhase.objectives : selectedPhase.objectivesEN).map(
                      (obj, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-start gap-3 text-sm"
                        >
                          <CheckCircle2
                            className="h-5 w-5 mt-0.5 flex-shrink-0"
                            style={{ color: selectedPhase.color }}
                          />
                          <span>{obj}</span>
                        </motion.li>
                      )
                    )}
                  </ul>
                </div>

                {/* Methods */}
                <div>
                  <h3 className="text-lg mb-4 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" style={{ color: selectedPhase.color }} />
                    {t.methods}
                  </h3>
                  <div className="space-y-4">
                    {selectedPhase.methods.map((method, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="p-4 rounded-lg bg-muted/50 border border-border"
                      >
                        <h4 className="font-semibold text-sm mb-2">
                          {lang === "es" ? method.name : method.nameEN}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {lang === "es" ? method.description : method.descriptionEN}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div>
                  <h3 className="text-lg mb-4">{t.tools}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPhase.tools.map((tool) => (
                      <Badge key={tool} variant="secondary">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Deliverables */}
                <div>
                  <h3 className="text-lg mb-4">{t.deliverables}</h3>
                  <ul className="space-y-2">
                    {(lang === "es"
                      ? selectedPhase.deliverables
                      : selectedPhase.deliverablesEN
                    ).map((deliverable, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <div
                          className="h-2 w-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: selectedPhase.color }}
                        />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Questions */}
                <div>
                  <h3 className="text-lg mb-4">{t.keyQuestions}</h3>
                  <div className="space-y-3">
                    {(lang === "es"
                      ? selectedPhase.keyQuestions
                      : selectedPhase.keyQuestionsEN
                    ).map((question, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10"
                      >
                        <span className="text-lg flex-shrink-0">💭</span>
                        <p className="text-sm">{question}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}