import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Button } from "../ui/button";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import { Logo } from "../atoms/Logo";
import { useRef, useMemo } from "react";
import { useLanguage } from "../../lib/LanguageContext";

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
      heading: "Lead UX diseñando experiencias que conectan estrategia digital con usuarios",
      description: "Lead UX con impacto medible: -40% abandono en onboarding, NPS 72, +35% activación. Implemento UX/UI en productos financieros y de movilidad a nivel regional.",
      ctaPrimary: "Ver proyectos",
      ctaSecondary: "Casos de Estudio",
      scroll: "Explorar"
    },
    en: {
      heading: "Lead UX designing experiences that connect digital strategy with users",
      description: "Lead UX with measurable impact: -40% onboarding drop-off, NPS 72, +35% activation. I implement UX/UI for financial and mobility products at a regional scale.",
      ctaPrimary: "View projects",
      ctaSecondary: "Case Studies",
      scroll: "Explore"
    }
  }), []);

  const t = content[language];

  const scrollToProjects = () => {
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
                <Sparkles className="h-7 w-7 text-primary drop-shadow-glow" />
              </motion.div>
            )}
          </motion.div>

          {/* Main Heading - Improved typography */}
          <motion.h1
            id="hero-heading"
            variants={itemVariants}
            className="max-w-5xl mx-auto px-4 tracking-tight"
          >
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground/90">
              {t.heading}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.div
            variants={itemVariants}
            className="max-w-2xl mx-auto text-muted-foreground px-4 text-lg md:text-xl leading-relaxed"
          >
            <p>{t.description}</p>
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
                onClick={onNavigateToCaseStudies}
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
