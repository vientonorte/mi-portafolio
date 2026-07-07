import type { LucideIcon } from "lucide-react";
import { Card } from "../ui/card";
import { CompanyLogoFromName } from "../atoms/CompanyLogoFromName";
import { cn } from "../../lib/utils";

export interface ImpactMetricCardProps {
  value: string;
  label: string;
  description: string;
  spoiler: string;
  phase: string;
  company: string;
  processId: string;
  icon: LucideIcon;
  valueColor: string;
  iconBg: string;
  viewPhaseLabel: string;
  tapHint: string;
  tapNavigate: string;
  expanded: boolean;
  href: string;
  onActivate: () => void;
}

export function ImpactMetricCard({
  value,
  label,
  description,
  spoiler,
  phase,
  company,
  icon: Icon,
  valueColor,
  iconBg,
  viewPhaseLabel,
  tapHint,
  tapNavigate,
  expanded,
  href,
  onActivate,
}: ImpactMetricCardProps) {
  return (
    <Card
      className={cn(
        "metric-card-interactive h-full p-0 overflow-hidden",
        expanded && "metric-card-expanded"
      )}
    >
      <a
        href={href}
        onClick={(event) => {
          event.preventDefault();
          onActivate();
        }}
        className="metric-card-body h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
        aria-label={`${label}: ${value}. ${spoiler}`}
        aria-expanded={expanded}
      >
        <div className="flex items-center justify-between gap-3 mb-3 w-full">
          <div
            className={cn(
              "w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center",
              iconBg
            )}
          >
            <Icon className={cn("h-6 w-6 md:h-7 md:w-7", valueColor)} aria-hidden="true" />
          </div>
          <CompanyLogoFromName company={company} size="wordmark-sm" flat />
        </div>

        <div className={cn("metric-card-value", valueColor)}>{value}</div>
        <h3 className="metric-card-label">{label}</h3>
        <p className="metric-card-meta">{description}</p>

        <p className="metric-card-spoiler">{spoiler}</p>

        <p className="metric-card-tap-hint" aria-hidden="true">
          {expanded ? tapNavigate : tapHint}
        </p>

        <p className="metric-card-phase">
          {viewPhaseLabel} · {phase} →
        </p>
      </a>
    </Card>
  );
}