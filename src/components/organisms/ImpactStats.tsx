import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { BarChart3, TrendingDown, TrendingUp, Zap } from "lucide-react";
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
import { SEO_SITE } from "../../lib/seo";
import { getPortfolioImages } from "../../lib/image-overrides";

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
        <Card className="group border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated overflow-hidden hover:border-primary/30 transition-all duration-500 shadow-none">
          <CardContent className="p-0">
            <div className="border-b border-[color:var(--logo-surface-border)] bg-featured-matte p-6 md:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-4 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--logo-surface-border)] bg-[var(--featured-matte-accent)] px-4 py-2">
                      <Zap className="h-4 w-4 text-primary" aria-hidden="true" />
                      <span className="text-sm font-semibold text-primary">{t.featured.badge}</span>
                    </div>
                    <CompanyLogoFromName company="SURA Investments" size="wordmark-md" flat />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl md:text-3xl font-bold leading-tight text-foreground">
                      {t.featured.title}
                    </h3>
                    <p className="text-muted-foreground">{t.featured.subtitle}</p>
                    <p className="text-sm text-foreground/80 leading-relaxed">{t.featured.spoiler}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-sm lg:min-w-[220px] lg:pt-12">
                  <div>
                    <span className="text-muted-foreground">{t.featured.companyLabel}:</span>{" "}
                    <span className="font-semibold">SURA Investments</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t.featured.roleLabel}:</span>{" "}
                    <span className="font-semibold">{SEO_SITE.role}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={openFeaturedCase}
              className="relative block w-full overflow-hidden bg-[#0a0a0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
              aria-label={t.featured.title}
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
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/90 to-transparent" />
            </button>

            <div className="p-6 md:p-8">
              <FeaturedCaseNavigator
                label={t.featured.pathsLabel}
                paths={t.featured.paths}
                projectId={t.featured.projectId}
                layout="equal"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </PageSection>
  );
}