import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BarChart3, TrendingDown, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { analytics } from "../../lib/analytics";
import { CompanyLogoFromName } from "../atoms/CompanyLogoFromName";
import { ResponsiveImage } from "../atoms/ResponsiveImage";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { ImpactMetricCard } from "../molecules/ImpactMetricCard";
import { ROUTES } from "../../lib/routes";
import { FeaturedCaseNavigator } from "../molecules/FeaturedCaseNavigator";
import { getPortfolioImages } from "../../lib/image-overrides";
import { cn } from "../../lib/utils";

const STAT_STYLES = [
  { color: "text-stat-tint-blue", bgColor: "bg-stat-tint-blue", icon: TrendingDown },
  { color: "text-stat-tint-amber", bgColor: "bg-stat-tint-amber", icon: BarChart3 },
  { color: "text-stat-tint-rose", bgColor: "bg-stat-tint-rose", icon: TrendingUp },
  { color: "text-stat-tint-violet", bgColor: "bg-stat-tint-violet", icon: Zap },
] as const;

export function ImpactStats() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language).impactStats;
  const prefersReducedMotion = useReducedMotion();
  const featuredImage = getPortfolioImages().sura.riaOnboarding;
  const [expandedStats, setExpandedStats] = useState<Set<string>>(new Set());

  const isTouchPrimary = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(hover: none), (pointer: coarse)").matches;
  }, []);

  const fadeUp = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true as const },
          transition: { duration: 0.5, delay },
        };

  const handleStatClick = (value: string, company: string, processId: string) => {
    analytics.viewImpactStat(value, company);
    navigate(ROUTES.processPhase(processId));
  };

  const openFeaturedCase = () => {
    navigate(ROUTES.project(t.featured.projectId));
  };

  const handleStatActivate = (
    processId: string,
    value: string,
    company: string
  ) => {
    if (isTouchPrimary() && !expandedStats.has(processId)) {
      setExpandedStats((prev) => new Set(prev).add(processId));
      return;
    }
    handleStatClick(value, company, processId);
  };

  return (
    <PageSection
      id="impacto"
      padding="compact"
      width="wide"
      tone="section"
      aria-labelledby="impact-stats-heading"
    >
      <SectionHeader
        badge={t.badge}
        badgeIcon={BarChart3}
        title={t.title}
        description={t.description}
        titleId="impact-stats-heading"
      />

      <div className="metric-card-grid">
        {t.stats.map((stat, index) => {
          const style = STAT_STYLES[index] ?? STAT_STYLES[0];

          return (
            <motion.div
              key={stat.processId}
              {...fadeUp(index * 0.08)}
              whileHover={prefersReducedMotion ? undefined : { y: -5, scale: 1.02 }}
              className="h-full"
            >
              <ImpactMetricCard
                {...stat}
                icon={style.icon}
                valueColor={style.color}
                iconBg={style.bgColor}
                viewPhaseLabel={t.viewPhase}
                tapHint={t.tapHint}
                tapNavigate={t.tapNavigate}
                expanded={expandedStats.has(stat.processId)}
                href={`#${ROUTES.processPhase(stat.processId)}`}
                onActivate={() =>
                  handleStatActivate(stat.processId, stat.value, stat.company)
                }
              />
            </motion.div>
          );
        })}
      </div>

      <motion.div {...fadeUp(0.35)} className="mt-12 md:mt-16">
        <article
          className={cn(
            "group overflow-hidden rounded-3xl border border-border/80 bg-card/80 shadow-lg backdrop-blur-sm",
            "transition-[border-color,box-shadow] duration-500 hover:border-primary/25 hover:shadow-xl"
          )}
          aria-labelledby="featured-case-heading"
        >
          <div className="space-y-3 border-b border-border/60 px-4 py-5 sm:px-5 sm:py-6">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t.featured.badge}
              </p>
              <CompanyLogoFromName company="SURA Investments" size="wordmark-md" flat />
            </div>

            <div className="space-y-2">
              <h3
                id="featured-case-heading"
                className="text-xl font-bold leading-tight text-foreground sm:text-2xl"
              >
                {t.featured.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                {t.featured.subtitle}
              </p>
              <p className="text-sm leading-relaxed text-foreground/85">{t.featured.spoiler}</p>
            </div>

            {t.featured.highlights.length > 0 && (
              <ul className="flex flex-wrap gap-2" role="list">
                {t.featured.highlights.map((item) => (
                  <li key={item}>
                    <span className="inline-flex rounded-full border border-border/80 bg-muted/40 px-2.5 py-1 text-xs font-medium text-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="button"
            onClick={openFeaturedCase}
            className="relative block w-full overflow-hidden bg-[#0a0a0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
            aria-label={t.featured.imageAriaLabel}
          >
            <ResponsiveImage
              src={featuredImage}
              alt={t.featured.title}
              fit="contain"
              aspectRatio="16 / 9"
              sizes="100vw"
              className="w-full"
              imgClassName="group-hover:scale-[1.01] transition-transform duration-700 motion-reduce:transition-none"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background/80 to-transparent" />
          </button>

          <div className="px-4 py-5 sm:px-5 sm:py-6">
            <FeaturedCaseNavigator
              label={t.featured.pathsLabel}
              paths={t.featured.paths}
              projectId={t.featured.projectId}
              layout="equal"
            />
          </div>
        </article>
      </motion.div>
    </PageSection>
  );
}