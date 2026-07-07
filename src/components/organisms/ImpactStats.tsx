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
import { ROUTES } from "../../lib/routes";
import { FeaturedCaseNavigator } from "../molecules/FeaturedCaseNavigator";
import { SEO_SITE } from "../../lib/seo";
import { getPortfolioImages } from "../../lib/image-overrides";
import { cn } from "../ui/utils";

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
            const Icon = style.icon;
            const link = `/#${ROUTES.processPhase(stat.processId)}`;

            return (
              <motion.div
                key={stat.processId}
                {...fadeUp(index * 0.08)}
                whileHover={prefersReducedMotion ? undefined : { y: -5, scale: 1.02 }}
                className="h-full"
              >
                <Card
                  className={cn(
                    "metric-card-interactive h-full p-0 overflow-hidden",
                    expandedStats.has(stat.processId) && "metric-card-expanded"
                  )}
                >
                  <a
                    href={link}
                    onClick={(e) => {
                      e.preventDefault();
                      if (isTouchPrimary() && !expandedStats.has(stat.processId)) {
                        setExpandedStats((prev) => new Set(prev).add(stat.processId));
                        return;
                      }
                      handleStatClick(stat.value, stat.company, stat.processId);
                    }}
                    className="metric-card-body h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                    aria-label={`${stat.label}: ${stat.value}. ${stat.spoiler}`}
                    aria-expanded={expandedStats.has(stat.processId)}
                  >
                    <div className="flex items-center justify-between gap-3 mb-3 w-full">
                      <div
                        className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${style.bgColor} flex items-center justify-center`}
                      >
                        <Icon className={`h-6 w-6 md:h-7 md:w-7 ${style.color}`} aria-hidden="true" />
                      </div>
                      <CompanyLogoFromName company={stat.company} size="wordmark-sm" flat />
                    </div>

                    <div className={`metric-card-value ${style.color}`}>{stat.value}</div>
                    <h3 className="metric-card-label">{stat.label}</h3>
                    <p className="metric-card-meta">{stat.description}</p>

                    <p className="metric-card-spoiler">{stat.spoiler}</p>

                    <p className="metric-card-tap-hint" aria-hidden="true">
                      {expandedStats.has(stat.processId) ? t.tapNavigate : t.tapHint}
                    </p>

                    <p className="metric-card-phase">
                      {t.viewPhase} · {stat.phase} →
                    </p>
                  </a>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div {...fadeUp(0.35)} className="mt-12 md:mt-16">
          <Card className="group border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated overflow-hidden hover:border-primary/30 transition-all duration-500 shadow-none">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-5 gap-0">
                <div className="lg:col-span-2 relative bg-featured-matte p-6 md:p-8 flex flex-col gap-6 min-h-[220px]">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--featured-matte-accent)] border border-[color:var(--logo-surface-border)] w-fit">
                    <Zap className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span className="text-sm font-semibold text-primary">{t.featured.badge}</span>
                  </div>

                  <div className="space-y-3">
                    <CompanyLogoFromName company="SURA Investments" size="md" />
                    <h3 className="text-2xl md:text-3xl font-bold leading-tight text-foreground">
                      {t.featured.title}
                    </h3>
                    <p className="text-muted-foreground">{t.featured.subtitle}</p>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {t.featured.spoiler}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm pt-2 border-t border-[color:var(--logo-surface-border)]">
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

                <div className="lg:col-span-3 flex flex-col border-t lg:border-t-0 lg:border-l border-[color:var(--logo-surface-border)]">
                  <button
                    type="button"
                    onClick={openFeaturedCase}
                    className="relative overflow-hidden min-h-[160px] md:min-h-[200px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                    aria-label={t.featured.paths[0]?.title ?? t.featured.title}
                  >
                    <ResponsiveImage
                      src={featuredImage}
                      alt={t.featured.title}
                      fit="cover"
                      aspectRatio="16 / 9"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="h-full min-h-[160px] md:min-h-[200px]"
                      imgClassName="group-hover:scale-[1.03] transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />
                  </button>

                  <div className="p-6 md:p-8 border-t border-[color:var(--logo-surface-border)]">
                    <FeaturedCaseNavigator
                      label={t.featured.pathsLabel}
                      paths={t.featured.paths}
                      projectId={t.featured.projectId}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
    </PageSection>
  );
}