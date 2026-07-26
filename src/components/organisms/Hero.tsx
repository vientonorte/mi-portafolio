import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useMemo, useRef } from "react";
import { ClipboardCheck, Sparkles, Users, type LucideIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { trackEvent } from "../../lib/analytics";
import { navigateFeaturedPath } from "../../lib/featured-path-routes";
import { openFreeRadarEntry } from "../../lib/free-radar-entry";
import type { HeroSearchCategory } from "../../lib/hero-search";
import { HeroAudienceCta, type HeroAudienceOption } from "../molecules/HeroAudienceCta";

interface HeroProps {
  onNavigateToDesignSystem?: () => void;
  onNavigateToCaseStudies?: () => void;
}

/** Card order: CX Reclutadores · Consultoría VN · Auditoría accesibilidad */
const PATH_ICONS: Record<HeroSearchCategory, LucideIcon> = {
  contacto: Users,
  negocios: Sparkles,
  auditorias: ClipboardCheck,
};

export function Hero(_props: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language).hero;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, 60]);

  const pathOptions = useMemo<HeroAudienceOption[]>(
    () =>
      t.unifiedBanner.suggestions.map((suggestion) => ({
        id: suggestion.id,
        icon: PATH_ICONS[suggestion.category],
        title: suggestion.title,
        hint: suggestion.hint,
        badge: suggestion.badge,
        onClick: () => {
          trackEvent("hero_path_card", {
            suggestion_id: suggestion.id,
            category: suggestion.category,
            href: suggestion.href,
          });
          // Entrada gratis Radar (a11y) → contacto, NO /auditoria mentoría
          if (
            suggestion.category === "auditorias" ||
            suggestion.href === "route/radar-gratis" ||
            suggestion.href === "route/auditoria"
          ) {
            openFreeRadarEntry(navigate, language, "hero-path");
            return;
          }
          navigateFeaturedPath(navigate, suggestion.href, location.pathname, language);
        },
      })),
    [language, location.pathname, navigate, t.unifiedBanner.suggestions]
  );

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
      className="relative flex min-h-[100dvh] items-center overflow-x-hidden bg-background pt-[var(--header-height)]"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute right-0 overflow-hidden rounded-full"
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
        className="container relative z-10 mx-auto w-full max-w-3xl px-4 sm:px-6 pb-[calc(var(--bottom-nav-total)+2rem)]"
        style={{ opacity, y }}
      >
        <motion.div
          variants={containerVariants}
          initial={prefersReducedMotion ? false : "hidden"}
          animate={prefersReducedMotion ? false : "visible"}
          className="flex flex-col gap-8 sm:gap-10"
        >
          <div className="text-center sm:text-left">
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
              className="font-black tracking-tighter"
              style={{ fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 0.92, marginBottom: 0 }}
            >
              <span className="block text-foreground" style={{ fontWeight: 300, opacity: 0.7 }}>
                {t.headlineLead}
              </span>
              <span className="block text-foreground">{t.headlineFocus}</span>
            </motion.h1>
          </div>

          <motion.div variants={itemVariants} className="w-full">
            <HeroAudienceCta
              label={t.unifiedBanner.groupLabel}
              options={pathOptions}
              layout="equal"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
