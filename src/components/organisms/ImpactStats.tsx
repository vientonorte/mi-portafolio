import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BarChart3, TrendingDown, TrendingUp, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { analytics } from "../../lib/analytics";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { ImpactMetricCard } from "../molecules/ImpactMetricCard";
import { ROUTES } from "../../lib/routes";

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
    </PageSection>
  );
}