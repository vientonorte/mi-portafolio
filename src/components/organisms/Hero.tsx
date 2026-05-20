import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Button } from "../ui/button";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
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

  // Memoized text content for i18n
  const content = useMemo(() => ({
    es: {
      badge: "Lead UX · Senior Product Designer",
      heading: "Transformo estrategia digital en experiencias que impulsan resultados de negocio",
      description: "Resultados medibles en productos financieros y de movilidad: -40% abandono en onboarding · NPS 72 · +35% activación de usuarios. Diseño con impacto a nivel regional.",
      ctaPrimary: "Explorar proyectos",
      ctaSecondary: "Casos de Estudio",
      scroll: "Explorar portafolio",
      metrics: {
        reduction: "40% menos abandono",
        nps: "NPS 72",
        activation: "+35% activación"
      }
    },
    en: {
      badge: "Lead UX · Senior Product Designer",
      heading: "Transforming digital strategy into experiences that drive business results",
      description: "Measurable results in financial and mobility products: -40% onboarding drop-off · NPS 72 · +35% user activation. Designing with regional impact.",
      ctaPrimary: "Explore projects",
      ctaSecondary: "Case Studies",
      scroll: "Explore portfolio",
      metrics: {
        reduction: "40% less drop-off",
        nps: "NPS 72",
        activation: "+35% activation"
      }
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
      className="relative min-h-[80vh] md:min-h-[75vh] flex items-center justify-center px-4 py-20 md:py-16 overflow-hidden"
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
        <div className="text-center space-y-6 md:space-y-8">
          {/* Badge with role */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm md:text-base font-medium text-foreground">
                {t.badge}
              </span>
            </div>
          </motion.div>

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

            {/* Sparkle effect - only if motion enabled */}
            {!prefersReducedMotion && (
              <motion.div
                className="absolute -top-3 -right-3"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="h-6 w-6 md:h-7 md:w-7 text-primary drop-shadow-glow" />
              </motion.div>
            )}
          </motion.div>

          {/* Main Heading - Improved typography and mobile optimization */}
          <motion.h1
            id="hero-heading"
            variants={itemVariants}
            className="max-w-5xl mx-auto px-4 tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          >
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground/90">
              {t.heading}
            </span>
          </motion.h1>

          {/* Description - Better mobile readability */}
          <motion.div
            variants={itemVariants}
            className="max-w-2xl mx-auto text-muted-foreground px-4 text-base md:text-lg lg:text-xl leading-relaxed"
          >
            <p>{t.description}</p>
          </motion.div>

          {/* Social proof metrics - Mobile optimized */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-6 px-4 pt-2"
          >
            {Object.values(t.metrics).map((metric, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-xs md:text-sm font-medium text-foreground/80">
                  {metric}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons - Mobile optimized with better touch targets */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4 pt-2"
          >
            {/* Primary CTA - Full width on mobile */}
            <motion.div
              whileHover={!prefersReducedMotion ? { scale: 1.05 } : undefined}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Button 
                size="lg" 
                onClick={scrollToProjects}
                className="w-full sm:w-auto min-h-[48px] bg-brand-gradient hover:opacity-90 transition-opacity group shadow-lg hover:shadow-xl px-6 md:px-8"
              >
                <span className="font-semibold text-base md:text-lg">{t.ctaPrimary}</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Secondary CTA - Full width on mobile */}
            <motion.div
              whileHover={!prefersReducedMotion ? { scale: 1.05 } : undefined}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  analytics.clickCaseStudies();
                  onNavigateToCaseStudies?.();
                }}
                className="w-full sm:w-auto min-h-[48px] group border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all px-6 md:px-8"
              >
                <FileText className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="text-base md:text-lg">{t.ctaSecondary}</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator - Improved animation and mobile touch target */}
          <motion.div
            variants={itemVariants}
            className="pt-10 md:pt-12"
          >
            <motion.button
              animate={!prefersReducedMotion ? { y: [0, 8, 0] } : undefined}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group min-h-[44px] min-w-[44px] justify-center"
              onClick={scrollToProjects}
              aria-label={t.scroll}
            >
              <span className="text-sm md:text-base font-medium">{t.scroll}</span>
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
