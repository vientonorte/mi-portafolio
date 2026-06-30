import { motion } from "motion/react";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ProcessMethodCard } from "../components/molecules/ProcessMethodCard";
import { useLanguage } from "../lib/LanguageContext";
import { useTranslation } from "../lib/i18n";
import { LanguageToggle } from "../components/atoms/LanguageToggle";
import { processesData, ProcessDetailData } from "../data/processes-data";
import { GradientHeading } from "../components/atoms/GradientHeading";

interface ProcessDetailProps {
  processId: string;
  onBack: () => void;
  onNavigateToPortfolio?: () => void;
}

export default function ProcessDetail({ processId, onBack, onNavigateToPortfolio }: ProcessDetailProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const processData: ProcessDetailData = processesData[processId];

  if (!processData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Proceso no encontrado</h1>
          <Button onClick={onBack}>Volver</Button>
        </div>
      </div>
    );
  }

  const Icon = processData.icon;
  const title = language === 'es' ? processData.title : processData.titleEN;
  const question = language === 'es' ? processData.question : processData.questionEN;
  const description = language === 'es' ? processData.description : processData.descriptionEN;
  const methodologyTitle = language === 'es' ? processData.methodology.title : processData.methodology.titleEN;
  const methodologySteps = language === 'es' ? processData.methodology.steps : processData.methodology.stepsEN;
  const methods = processData.methods.map(m => ({
    title: language === 'es' ? m.title : m.titleEN,
    description: language === 'es' ? m.description : m.descriptionEN,
    tools: m.tools,
  }));
  const benefits = language === 'es' ? processData.benefits : processData.benefitsEN;
  const relatedProjects = processData.relatedProjects.map(p => ({
    company: p.company,
    projectName: language === 'es' ? p.projectName : p.projectNameEN,
  }));

  return (
    <div className="min-h-screen bg-background">
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
            {t.processDetail.backToCaseStudies}
          </Button>

          <LanguageToggle />
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="subpage-hero py-12 md:py-20 px-4 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="container max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            {/* Icon + Title */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
              <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
              </div>
              
              <div className="min-w-0 flex-1">
                <Badge variant="secondary" className="mb-2">
                  {t.caseStudies.process.badge}
                </Badge>
                <h1 className="subpage-hero__title">
                  <GradientHeading as="span">{title}</GradientHeading>
                </h1>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-muted-foreground italic mb-6 break-words">
              &ldquo;{question}&rdquo;
            </h2>
            
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
            >
              {description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-16 md:py-24 px-4 bg-muted/30">
        <div className="container max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Badge variant="outline" className="mb-4">
              {t.processDetail.methodology}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              {methodologyTitle}
            </h2>
          </motion.div>

          {/* Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {methodologySteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-2 hover:border-primary/30 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-primary">{index + 1}</span>
                      </div>
                      <p className="text-sm leading-relaxed pt-1">{step}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-background border-2">
              <CardContent className="p-8">
                <h3 className="font-bold text-xl mb-4">{t.processDetail.tools}</h3>
                <div className="flex flex-wrap gap-3">
                  {processData.tools.map((tool) => (
                    <Badge
                      key={tool}
                      variant="secondary"
                      className="text-base py-2 px-4"
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Methods Section (solo si hay métodos) */}
      {methods.length > 0 && (
        <section className="py-16 md:py-24 px-4">
          <div className="container max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Badge variant="outline" className="mb-4">
                {t.processDetail.methods}
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                {language === 'es' ? 'Técnicas que aplico' : 'Techniques I apply'}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {methods.map((method, index) => (
                <ProcessMethodCard
                  key={index}
                  {...method}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      <section className="py-16 md:py-24 px-4 bg-muted/30">
        <div className="container max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Badge variant="outline" className="mb-4">
              {t.processDetail.benefits}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              {language === 'es' ? 'Valor que aporta' : 'Value it provides'}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-2 hover:border-primary/30 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <p className="leading-relaxed">{benefit}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Badge variant="outline" className="mb-4">
              {t.processDetail.relatedProjects}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black mb-4 break-words">
              {language === 'es' ? 'Casos reales' : 'Real cases'}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground break-words">
              {language === 'es' 
                ? `Proyectos donde apliqué ${title} con resultados medibles`
                : `Projects where I applied ${title} with measurable results`
              }
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {relatedProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-2 hover:border-primary/30 transition-all group cursor-pointer">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <Badge variant="secondary" className="mb-3">
                          {project.company}
                        </Badge>
                        <h3 className="font-bold text-xl sm:text-2xl group-hover:text-primary transition-colors break-words">
                          {project.projectName}
                        </h3>
                      </div>
                      <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 group-hover:gap-3 transition-all mt-4"
                      onClick={onNavigateToPortfolio}
                    >
                      {t.processDetail.viewProject}
                      <ArrowLeft className="h-4 w-4 rotate-180" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA to Portfolio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              onClick={onNavigateToPortfolio}
              className="bg-brand-gradient hover:opacity-90 transition-opacity group relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              <span className="relative flex items-center gap-2">
                {language === 'es' ? 'Ver todos los proyectos' : 'View all projects'}
                <ArrowLeft className="h-5 w-5 rotate-180 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
