import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Button } from "../ui/button";
import { ArrowDown, ArrowRight, FileText } from "lucide-react";
import { useRef, useMemo } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import { analytics } from "../../lib/analytics";

interface HeroProps {
  onNavigateToDesignSystem?: () => void;
  onNavigateToCaseStudies?: () => void;
}

const resultCards = [
  { metric: "−40%", desc: "abandono en onboarding", company: "SURA Investments" },
  { metric: "NPS 72", desc: "+25 pts sobre baseline", company: "SURA Inversiones" },
  { metric: "+35%", desc: "activación de shoppers", company: "Karri" },
];

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

  const content = useMemo(() => ({
    es: {
      label:        "Lead UX Designer",
      valueProp:    "6 años liderando UX\nen fintech y movilidad",
      h1a:          "Diseño que",
      h1b:          "reduce el ruido.",
      ctaPrimary:   "Ver proyectos",
      ctaSecondary: "Casos de Estudio",
      scroll:       "Explorar",
      resultados:   "Resultados",
    },
    en: {
      label:        "Lead UX Designer",
      valueProp:    "6 years leading UX\nin fintech & mobility",
      h1a:          "Design that",
      h1b:          "cuts the noise.",
      ctaPrimary:   "View projects",
      ctaSecondary: "Case Studies",
      scroll:       "Explore",
      resultados:   "Results",
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
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };

  const itemVariants = {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
  };

  const cardVariants = {
    hidden:  { opacity: 0, x: 24 },
    visible: (i: number) => ({
      opacity: 1, x: 0,
      transition: { duration: 0.65, ease, delay: 0.3 + i * 0.12 },
    }),
  };

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
      aria-labelledby="hero-heading"
    >
      {/* Ambient arc — top-right */}
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
        style={{ opacity, y, paddingTop: "7rem", paddingBottom: "5rem" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Split grid: texto izquierda | cards derecha */}
        <div className="hero-split">

          {/* ── Left column ── */}
          <div className="hero-left">

            {/* Eyebrow */}
            <motion.p
              variants={itemVariants}
              className="font-mono text-xs uppercase text-primary"
              style={{ letterSpacing: "0.22em", marginBottom: "1.5rem" }}
            >
              {t.label}
            </motion.p>

            {/* H1 */}
            <motion.h1
              id="hero-heading"
              variants={itemVariants}
              className="font-black tracking-tighter max-w-xl"
              style={{ fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 0.92, marginBottom: "1.5rem" }}
            >
              <span className="block text-foreground" style={{ fontWeight: 400, opacity: 0.72 }}>
                {t.h1a}
              </span>
              <span className="block text-foreground">
                {t.h1b}
              </span>
            </motion.h1>

            {/* Value proposition */}
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground"
              style={{
                fontSize: "clamp(15px, 1.4vw, 18px)",
                fontWeight: 400,
                lineHeight: 1.5,
                marginBottom: "2.5rem",
                whiteSpace: "pre-line",
                opacity: 0.88,
              }}
            >
              {t.valueProp}
            </motion.p>

            {/* CTAs */}
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
                {t.ctaPrimary}
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
                {t.ctaSecondary}
              </Button>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div variants={itemVariants}>
              <motion.button
                animate={!prefersReducedMotion ? { y: [0, 6, 0] } : undefined}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex flex-col items-start gap-2 transition-colors cursor-pointer"
                style={{ color: "var(--muted-foreground)", opacity: 0.4 }}
                onClick={scrollToProjects}
                aria-label={t.scroll}
              >
                <span className="font-mono text-xs uppercase" style={{ letterSpacing: "0.2em" }}>
                  {t.scroll}
                </span>
                <motion.span
                  animate={!prefersReducedMotion ? { y: [0, 6, 0] } : undefined}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-current"
                >
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </motion.span>
              </motion.button>
            </motion.div>
          </div>

          {/* ── Right column — result cards ── */}
          <div className="hero-right" aria-label={t.resultados} role="list">
            {resultCards.map((card, i) => (
              <motion.div
                key={card.metric}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                role="listitem"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "1.25rem 1.5rem",
                  marginLeft: i === 1 ? "2rem" : i === 2 ? "1rem" : "0",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span
                  className="font-mono font-black text-foreground block"
                  style={{ fontSize: "clamp(28px, 3.5vw, 44px)", letterSpacing: "-0.03em", lineHeight: 1 }}
                >
                  {card.metric}
                </span>
                <span
                  className="block text-muted-foreground"
                  style={{ fontSize: "0.8125rem", marginTop: "0.375rem", fontWeight: 400 }}
                >
                  {card.desc}
                </span>
                <span
                  className="block"
                  style={{ fontSize: "0.6875rem", marginTop: "0.25rem", color: "var(--muted-foreground)", opacity: 0.55, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "monospace" }}
                >
                  {card.company}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.div>
    </section>
  );
}
