import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BarChart3, TrendingDown, TrendingUp, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { analytics } from "../../lib/analytics";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
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

      {/* Strip format — less branding noise, stronger scan (FigJam handoff) */}
      <ul
        className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
        role="list"
      >
        {t.stats.map((stat, index) => {
          const style = STAT_STYLES[index] ?? STAT_STYLES[0];
          const Icon = style.icon;

          return (
            <motion.li key={stat.processId} {...fadeUp(index * 0.06)}>
              <button
                type="button"
                onClick={() =>
                  handleStatActivate(stat.processId, stat.value, stat.company)
                }
                className="group flex h-full w-full flex-col items-start gap-2 rounded-2xl border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated p-4 text-left transition-colors hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px]"
              >
                <span
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${style.bgColor}`}
                  aria-hidden
                >
                  <Icon className={`h-4 w-4 ${style.color}`} />
                </span>
                <span className={`text-2xl font-semibold tracking-tight md:text-3xl ${style.color}`}>
                  {stat.value}
                </span>
                <span className="text-sm font-medium text-foreground leading-snug">
                  {stat.label}
                </span>
                <span className="text-xs text-muted-foreground">{stat.company}</span>
                {expandedStats.has(stat.processId) && (
                  <span className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {stat.description}
                  </span>
                )}
              </button>
            </motion.li>
          );
        })}
      </ul>
    </PageSection>
  );
}