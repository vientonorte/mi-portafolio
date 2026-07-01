import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowRight, FileText } from "lucide-react";
import { useRef } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { analytics } from "../../lib/analytics";
import { HeroResultCard } from "../atoms/HeroResultCard";

interface HeroProps {
  onNavigateToDesignSystem?: () => void;
  onNavigateToCaseStudies?: () => void;
}

export function Hero({ onNavigateToCaseStudies }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, 60]);

  const { language } = useLanguage();
  const t = useTranslation(language).hero;

  const scrollToProjects = () => {
    analytics.clickViewProjects();
    document.getElementById("negocios")?.scrollIntoView({ behavior: "smooth" });
  };

  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
  };

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-background pt-20 sm:pt-24"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute right-0 rounded-full"
        style={{
          top: "-200px",
          width: "700px",
          height: "700px",
          background: "var(--brand-gradient)",
          filter: "blur(140px)",
          opacity: 0.15,
        }}
        aria-hidden="true"
      />

      <motion.div
        className="container max-w-6xl mx-auto relative z-10 px-6 md:px-10"
        style={{ opacity, y, paddingBottom: "5rem" }}
        variants={containerVariants}
        initial={prefersReducedMotion ? false : "hidden"}
        animate={prefersReducedMotion ? false : "visible"}
      >
        <div className="hero-split">
          <div className="hero-left">
            <motion.p
              variants={itemVariants}
              className="font-mono text-sm uppercase text-primary"
              style={{ letterSpacing: "0.22em", marginBottom: "1.5rem" }}
            >
              {t.label}
            </motion.p>

            <motion.h1
              id="hero-heading"
              variants={itemVariants}
              className="font-black tracking-tighter max-w-xl"
              style={{ fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 0.92, marginBottom: "1.5rem" }}
            >
              <span className="block text-foreground" style={{ fontWeight: 300, opacity: 0.7 }}>
                {t.headlineLead}
              </span>
              <span className="block text-foreground">{t.headlineFocus}</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="max-w-md text-muted-foreground text-base md:text-lg font-light leading-snug"
              style={{ marginBottom: "1.25rem" }}
            >
              {t.valueProp}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2"
              style={{ marginBottom: "2rem" }}
              aria-label={language === "es" ? "Especialización" : "Specialization"}
            >
              {t.specialties.map((specialty) => (
                <Badge
                  key={specialty}
                  variant="outline"
                  className="border-primary/25 bg-primary/5 text-xs font-medium text-foreground"
                >
                  {specialty}
                </Badge>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 flex-wrap"
              style={{ marginBottom: "3rem" }}
            >
              <Button
                size="lg"
                onClick={scrollToProjects}
                className="bg-brand-gradient hover:opacity-90 transition-opacity group shadow-md hover:shadow-lg font-semibold"
              >
                {t.cta.primary}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Button>

              <Button
                size="lg"
                variant="ghost"
                onClick={() => {
                  analytics.clickCaseStudies();
                  onNavigateToCaseStudies?.();
                }}
                className="text-muted-foreground hover:text-foreground hover:bg-transparent border border-border transition-all"
              >
                <FileText className="mr-2 h-4 w-4" aria-hidden="true" />
                {t.cta.secondary}
              </Button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                animate={!prefersReducedMotion ? { y: [0, 6, 0] } : undefined}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex flex-col items-start gap-2 transition-colors cursor-pointer"
                style={{ color: "var(--muted-foreground)", opacity: 0.7 }}
                onClick={scrollToProjects}
                aria-label={t.scroll}
              >
                <span className="font-mono text-sm uppercase" style={{ letterSpacing: "0.2em" }}>
                  {t.scroll}
                </span>
                <div className="w-5 h-8 border border-current rounded-full flex items-start justify-center p-1">
                  <motion.div
                    className="w-1 h-2 bg-current rounded-full"
                    animate={!prefersReducedMotion ? { y: [0, 10, 0] } : undefined}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </motion.button>
            </motion.div>
          </div>

          <div className="hero-right" aria-label={t.resultsLabel} role="list">
            {t.resultCards.map((card, i) => (
              <HeroResultCard
                key={card.metric}
                metric={card.metric}
                description={card.description}
                company={card.company}
                index={i}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}