import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Button } from "../ui/button";
import { ArrowRight, FileText, Target, Layers, TrendingUp } from "lucide-react";
import { Logo } from "../atoms/Logo";
import { useRef, useMemo } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import { analytics } from "../../lib/analytics";

interface HeroProps {
  onNavigateToDesignSystem?: () => void;
  onNavigateToCaseStudies?: () => void;
}

export function Hero({ onNavigateToDesignSystem, onNavigateToCaseStudies }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  const { language } = useLanguage();

  // Flow nodes: la metáfora visual de transformación
  const flowNodes = useMemo(() => ([
    { icon: Target,     labelEs: "Estrategia",  labelEn: "Strategy",   detailEs: "Discovery activo",          detailEn: "Active discovery",         metric: "5+ países" },
    { icon: Layers,     labelEs: "Diseño UX",   labelEn: "UX Design",  detailEs: "Design Sprint adaptado",     detailEn: "Adapted Design Sprint",    metric: "10+ proyectos" },
    { icon: TrendingUp, labelEs: "Impacto",     labelEn: "Impact",    detailEs: "Resultados medibles",        detailEn: "Measurable results",       metric: "−40% abandono" },
  ]), []);

  // Memoized text content for i18n
  const content = useMemo(() => ({
    es: {
      heading: "Transformo estrategia",
      headingAccent: "en experiencias reales",
      ctaPrimary: "Ver proyectos",
      ctaSecondary: "Casos de Estudio",
      scroll: "Explorar"
    },
    en: {
      heading: "I transform strategy",
      headingAccent: "into real experiences",
      ctaPrimary: "View projects",
      ctaSecondary: "Case Studies",
      scroll: "Explore"
    }
  }), []);

  const t = content[language];

  const scrollToProjects = () => {
    analytics.clickViewProjects();
    document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth" });
  };

  // Optimized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number] // Custom easing for smooth feel
      }
    }
  };

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative min-h-[75vh] flex items-center justify-center px-4 py-16 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Optimized Background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Single animated gradient orb - better performance */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
          style={{ 
            background: "var(--brand-gradient)",
            willChange: "transform, opacity"
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.04, 0.08, 0.04],
            x: [0, 40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Optimized floating particles - reduced and simpler */}
      {!prefersReducedMotion && [...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-muted-foreground/10 rounded-full"
          style={{
            left: `${30 + i * 25}%`,
            top: `${45 + (i % 2) * 15}%`,
          }}
          animate={{
            y: [-15, 15],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      <motion.div 
        className="container max-w-6xl mx-auto relative z-10"
        style={{ opacity, scale, y }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center space-y-5 md:space-y-7">
          {/* Logo with optimized animations */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center relative"
          >
            <motion.div
              animate={!prefersReducedMotion ? {
                boxShadow: [
                  "0 0 0 0 rgba(255, 29, 37, 0)",
                  "0 0 50px 15px rgba(255, 147, 30, 0.15)",
                  "0 0 0 0 rgba(255, 29, 37, 0)",
                ],
              } : undefined}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="rounded-full"
            >
              <Logo size="lg" showText={true} animated={!prefersReducedMotion} />
            </motion.div>
          </motion.div>

          {/* Main Heading — 2 líneas, segunda con acento de marca */}
          <motion.h1
            id="hero-heading"
            variants={itemVariants}
            className="max-w-4xl mx-auto px-4 tracking-tight leading-tight"
          >
            <span className="block text-foreground">{t.heading}</span>
            <span className="block bg-clip-text text-transparent bg-brand-gradient">
              {t.headingAccent}
            </span>
          </motion.h1>

          {/* Flow pictogram — la metáfora de transformación */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 md:gap-6 flex-wrap px-4 py-2"
            role="list"
            aria-label={language === "es" ? "Proceso de trabajo" : "Work process"}
          >
            {flowNodes.map((node, idx) => (
              <>
                {/* Nodo */}
                <motion.div
                  key={node.labelEs}
                  role="listitem"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={!prefersReducedMotion ? { y: -4, transition: { duration: 0.2 } } : undefined}
                  className="flex flex-col items-center gap-2 cursor-default"
                >
                  <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-muted/60 border border-border/60 flex items-center justify-center backdrop-blur-sm">
                    <node.icon className="h-6 w-6 md:h-7 md:w-7 text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="font-semibold text-sm text-foreground">
                    {language === "es" ? node.labelEs : node.labelEn}
                  </span>
                  <span className="text-xs text-muted-foreground text-center leading-tight max-w-[90px]">
                    {language === "es" ? node.detailEs : node.detailEn}
                  </span>
                  <motion.span
                    className="text-xs font-mono font-bold text-primary/80 bg-primary/8 px-2 py-0.5 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 + idx * 0.15 }}
                  >
                    {node.metric}
                  </motion.span>
                </motion.div>

                {/* Conector animado */}
                {idx < flowNodes.length - 1 && !prefersReducedMotion && (
                  <motion.div
                    key={`arrow-${idx}`}
                    className="flex items-center gap-0 flex-shrink-0"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.55 + idx * 0.15, duration: 0.4, transformOrigin: "left" }}
                  >
                    <motion.div
                      className="h-px w-6 md:w-10 bg-gradient-to-r from-border to-primary/50"
                      animate={{ opacity: [0.4, 0.9, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: idx * 0.3 }}
                    />
                    <ArrowRight className="h-3.5 w-3.5 text-primary/60 -ml-0.5" />
                  </motion.div>
                )}
              </>
            ))}
          </motion.div>

          {/* CTA Buttons - Better spacing and hierarchy */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 md:gap-4 flex-wrap px-4"
          >
            {/* Primary CTA */}
            <motion.div
              whileHover={!prefersReducedMotion ? { scale: 1.05 } : undefined}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                size="lg" 
                onClick={scrollToProjects}
                className="bg-brand-gradient hover:opacity-90 transition-opacity group shadow-lg hover:shadow-xl"
              >
                <span className="font-semibold">{t.ctaPrimary}</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div
              whileHover={!prefersReducedMotion ? { scale: 1.05 } : undefined}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  analytics.clickCaseStudies();
                  onNavigateToCaseStudies?.();
                }}
                className="group border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all"
              >
                <FileText className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                {t.ctaSecondary}
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator - Improved animation */}
          <motion.div
            variants={itemVariants}
            className="pt-8 md:pt-10"
          >
            <motion.button
              animate={!prefersReducedMotion ? { y: [0, 8, 0] } : undefined}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group"
              onClick={scrollToProjects}
              aria-label={t.scroll}
            >
              <span className="text-sm font-medium">{t.scroll}</span>
              <div className="w-6 h-10 border-2 border-current rounded-full flex items-start justify-center p-1.5 group-hover:border-foreground transition-colors">
                <motion.div
                  className="w-1.5 h-3 bg-current rounded-full"
                  animate={!prefersReducedMotion ? { y: [0, 14, 0] } : undefined}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
