import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Button } from "../ui/button";
import { ArrowRight, ClipboardList, Sparkles, Users } from "lucide-react";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { analytics } from "../../lib/analytics";
import { ROUTES } from "../../lib/routes";
import { navigateToPageSection } from "../../lib/navigate-to-section";

interface HeroProps {
  onNavigateToDesignSystem?: () => void;
  onNavigateToCaseStudies?: () => void;
}

export function Hero({ onNavigateToCaseStudies: _onNavigateToCaseStudies }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const location = useLocation();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, 60]);

  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language).hero;

  const goToRecruiters = () => {
    analytics.clickHeroRecruiters();
    const onHome = (location.pathname.replace(/\/+$/, "") || "/") === "/";
    if (onHome) {
      document.getElementById("sobre-mi")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    navigateToPageSection(navigate, "/sobre-mi", "sobre-mi", location.pathname);
  };

  const goToAuditLeads = () => {
    analytics.clickHeroAuditLeads();
    navigate(ROUTES.consulting);
  };

  const goToFreeAudit = () => {
    analytics.clickHeroFreeAudit();
    navigate(ROUTES.audit);
  };

  const scrollToTeaser = () => {
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

      {/*
        El fade/desplazamiento ligado al scroll (style={{ opacity, y }}) y la animación
        de entrada (variants/animate) deben vivir en elementos motion.div separados:
        si ambos controlan `opacity` en el mismo nodo, framer-motion y Safari pueden
        pintar dos estados de opacidad en conflicto, produciendo un efecto "fantasma"
        (texto duplicado) durante el scroll en Safari/macOS.
      */}
      <motion.div
        className="container max-w-6xl mx-auto relative z-10 px-6 md:px-10"
        style={{ opacity, y, paddingBottom: "5rem" }}
      >
        <motion.div
          variants={containerVariants}
          initial={prefersReducedMotion ? false : "hidden"}
          animate={prefersReducedMotion ? false : "visible"}
        >
          <div className="max-w-2xl">
            <motion.p
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-matte-elevated px-3 py-1.5 font-mono text-xs uppercase text-foreground"
              style={{ letterSpacing: "0.18em", marginBottom: "1.25rem" }}
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                aria-hidden="true"
              />
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
              className="max-w-md text-base font-light leading-snug text-muted-foreground md:text-lg"
              style={{ marginBottom: "2rem" }}
            >
              {t.valueProp}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              style={{ marginBottom: "3rem" }}
              role="group"
              aria-label={language === "es" ? "Acciones por audiencia" : "Audience actions"}
            >
              <Button
                size="lg"
                onClick={goToRecruiters}
                className="bg-brand-gradient hover:opacity-90 transition-opacity group shadow-md hover:shadow-lg font-semibold w-full sm:w-auto"
              >
                <Users className="mr-2 h-4 w-4" aria-hidden="true" />
                {t.cta.recruiters}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={goToAuditLeads}
                className="border-2 hover:border-primary hover:bg-primary/5 transition-all w-full sm:w-auto"
              >
                <ClipboardList className="mr-2 h-4 w-4" aria-hidden="true" />
                {t.cta.auditLeads}
              </Button>

              <Button
                size="lg"
                variant="ghost"
                onClick={goToFreeAudit}
                className="text-muted-foreground hover:text-foreground hover:bg-transparent border border-border transition-all w-full sm:w-auto"
              >
                <Sparkles className="mr-2 h-4 w-4" aria-hidden="true" />
                {t.cta.freeAuditB2b}
              </Button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                animate={!prefersReducedMotion ? { y: [0, 6, 0] } : undefined}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex flex-col items-start gap-2 transition-colors cursor-pointer"
                style={{ color: "var(--muted-foreground)", opacity: 0.7 }}
                onClick={scrollToTeaser}
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
        </motion.div>
      </motion.div>
    </section>
  );
}