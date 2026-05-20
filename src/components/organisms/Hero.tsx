import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Button } from "../ui/button";
import { ArrowRight, FileText } from "lucide-react";
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

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, 60]);

  const { language } = useLanguage();

  const stats = useMemo(() => ([
    { value: "5+",   labelEs: "países",     labelEn: "countries" },
    { value: "10+",  labelEs: "proyectos",  labelEn: "projects" },
    { value: "6+",   labelEs: "años UX",    labelEn: "years UX" },
  ]), []);

  const content = useMemo(() => ({
    es: {
      label:        "Lead UX Designer",
      anchor:       "−40%",
      anchorCtx:    "abandono en onboarding",
      h1a:          "Diseño que",
      h1b:          "reduce el ruido.",
      ctaPrimary:   "Ver proyectos",
      ctaSecondary: "Casos de Estudio",
      scroll:       "Explorar",
    },
    en: {
      label:        "Lead UX Designer",
      anchor:       "−40%",
      anchorCtx:    "onboarding drop-off",
      h1a:          "Design that",
      h1b:          "cuts the noise.",
      ctaPrimary:   "View projects",
      ctaSecondary: "Case Studies",
      scroll:       "Explore",
    },
  }), []);

  const t = content[language];

  const scrollToProjects = () => {
    analytics.clickViewProjects();
    document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth" });
  };

  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

  const containerVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  };

  const itemVariants = {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  };

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
      aria-labelledby="hero-heading"
    >
      {/* Ambient arc — top-right accent */}
      <div
        className="pointer-events-none absolute right-0 w-[800px] h-[800px] rounded-full"
        style={{
          top: "-200px",
          background: "var(--brand-gradient)",
          filter: "blur(140px)",
          opacity: 0.18,
        }}
        aria-hidden="true"
      />

      <motion.div
        className="container max-w-6xl mx-auto relative z-10 px-6 md:px-10"
        style={{ opacity, y, paddingTop: "7rem", paddingBottom: "5rem" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Label — eyebrow, whisper */}
        <motion.p
          variants={itemVariants}
          className="font-mono text-xs uppercase text-primary mb-10"
          style={{ letterSpacing: "0.22em" }}
        >
          {t.label}
        </motion.p>

        {/* Anchor number — el dato que ancla todo */}
        <motion.div variants={itemVariants} className="mb-6 select-none" aria-hidden="true">
          <span
            className="font-mono font-black leading-none text-foreground"
            style={{ fontSize: "clamp(80px, 14vw, 160px)", letterSpacing: "-0.04em" }}
          >
            {t.anchor}
          </span>
          <p
            className="text-base text-muted-foreground mt-1 ml-1"
            style={{ fontWeight: 300 }}
          >
            {t.anchorCtx}
          </p>
        </motion.div>

        {/* H1 — línea 1 susurra, línea 2 declara */}
        <motion.h1
          id="hero-heading"
          variants={itemVariants}
          className="font-black tracking-tighter mb-10 max-w-2xl"
          style={{ fontSize: "clamp(44px, 7vw, 88px)", lineHeight: 0.92 }}
        >
          <span
            className="block text-foreground"
            style={{ fontWeight: 300, opacity: 0.45 }}
          >
            {t.h1a}
          </span>
          <span className="block text-foreground">
            {t.h1b}
          </span>
        </motion.h1>

        {/* Stats row */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-6 mb-12 flex-wrap"
          role="list"
          aria-label={language === "es" ? "Indicadores clave" : "Key metrics"}
        >
          {stats.map((s, i) => (
            <div key={s.value} className="flex items-center gap-6" role="listitem">
              <div>
                <span className="font-mono font-bold text-2xl text-foreground">
                  {s.value}
                </span>
                <span className="block text-xs text-muted-foreground" style={{ marginTop: "2px" }}>
                  {language === "es" ? s.labelEs : s.labelEn}
                </span>
              </div>
              {i < stats.length - 1 && (
                <div
                  className="w-px h-8 bg-border"
                  style={{ opacity: 0.5 }}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 flex-wrap"
        >
          <Button
            size="lg"
            onClick={scrollToProjects}
            className="bg-brand-gradient hover:opacity-90 transition-opacity group shadow-md hover:shadow-lg font-semibold"
          >
            {t.ctaPrimary}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            size="lg"
            variant="ghost"
            onClick={() => {
              analytics.clickCaseStudies();
              onNavigateToCaseStudies?.();
            }}
            className="text-muted-foreground hover:text-foreground hover:bg-transparent border border-border hover:border-border transition-all"
            style={{ borderOpacity: 0.4 } as React.CSSProperties}
          >
            <FileText className="mr-2 h-4 w-4" aria-hidden="true" />
            {t.ctaSecondary}
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="mt-16"
        >
          <motion.button
            animate={!prefersReducedMotion ? { y: [0, 6, 0] } : undefined}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex flex-col items-start gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            style={{ opacity: 0.4 }}
            onClick={scrollToProjects}
            aria-label={t.scroll}
          >
            <span
              className="font-mono text-xs uppercase"
              style={{ letterSpacing: "0.2em" }}
            >
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
      </motion.div>
    </section>
  );
}
