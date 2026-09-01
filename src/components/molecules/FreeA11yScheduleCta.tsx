/**
 * CTA visible de agenda Google (free a11y) — no toast oculto ni link sutil.
 * Solo renderiza si existe VITE_A11Y_FREE_SCHEDULE_URL en build.
 */
import { Calendar, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useLanguage } from "../../lib/LanguageContext";
import {
  freeRadarHasSchedule,
  openFreeRadarEntry,
} from "../../lib/free-radar-entry";
import { A11Y_FREE_SCHEDULE_URL } from "../../lib/site-contact";
import type { ContactCtaOrigin } from "../../lib/navigate-to-contact";
import { cn } from "../../lib/utils";

export interface FreeA11yScheduleCtaProps {
  origin?: ContactCtaOrigin;
  className?: string;
  /** compact = barra en assistant; card = bloque en Contact */
  layout?: "card" | "compact" | "inline";
}

export function FreeA11yScheduleCta({
  origin = "contact",
  className,
  layout = "card",
}: FreeA11yScheduleCtaProps) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const es = language === "es";

  if (!freeRadarHasSchedule() || !A11Y_FREE_SCHEDULE_URL) {
    return null;
  }

  const title =
    es
      ? "Agendar diagnóstico gratuito (30 min)"
      : "Book your free diagnostic (30 min)";
  const body =
    es
      ? "Revisión de un flujo crítico (accesibilidad WCAG 2.2 AA + privacidad por diseño). Elige horario en Calendar de Viento Norte — sin formulario previo."
      : "Review of one critical flow (WCAG 2.2 AA accessibility + privacy by design). Pick a slot on Viento Norte Calendar — no form first.";
  const cta = es ? "Abrir agenda online" : "Open online schedule";
  const badge = es ? "Disponible ahora" : "Available now";

  const book = () => {
    openFreeRadarEntry(navigate, language, origin, { mode: "schedule" });
  };

  if (layout === "inline") {
    return (
      <Button
        type="button"
        variant="default"
        className={cn(
          "funnel-cta-primary min-h-[44px] w-full bg-brand-gradient font-semibold hover:opacity-90 sm:w-auto",
          className
        )}
        onClick={book}
      >
        <Calendar className="mr-2 h-4 w-4" aria-hidden />
        {cta}
        <ExternalLink className="ml-2 h-3.5 w-3.5 opacity-80" aria-hidden />
      </Button>
    );
  }

  if (layout === "compact") {
    return (
      <div
        className={cn(
          "flex flex-col gap-3 rounded-xl border-2 border-primary/40 bg-primary/5 p-4 sm:flex-row sm:items-center sm:justify-between",
          className
        )}
        data-testid="free-a11y-schedule-cta"
      >
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <Calendar className="h-4 w-4 shrink-0 text-primary" aria-hidden />
            <p className="text-sm font-semibold tracking-tight">{title}</p>
            <Badge
              variant="outline"
              className="border-primary/30 font-normal normal-case tracking-normal"
            >
              {badge}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
        </div>
        <Button
          type="button"
          className="funnel-cta-primary min-h-[44px] w-full shrink-0 bg-brand-gradient font-semibold hover:opacity-90 sm:w-auto"
          onClick={book}
        >
          {cta}
          <ExternalLink className="ml-2 h-3.5 w-3.5" aria-hidden />
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl border-2 border-primary/40 bg-primary/5 p-5 shadow-none",
        className
      )}
      data-testid="free-a11y-schedule-cta"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3 min-w-0">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-gradient text-white"
            aria-hidden
          >
            <Calendar className="h-5 w-5" />
          </span>
          <div className="min-w-0 space-y-1.5">
            <Badge
              variant="outline"
              className="border-primary/30 font-normal normal-case tracking-normal"
            >
              {badge}
            </Badge>
            <p className="text-base font-semibold tracking-tight">{title}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
            <p className="text-[11px] font-mono text-muted-foreground/90 break-all">
              calendar.app.google
            </p>
          </div>
        </div>
        <Button
          type="button"
          size="lg"
          className="funnel-cta-primary min-h-[48px] w-full shrink-0 bg-brand-gradient px-6 font-semibold hover:opacity-90 sm:w-auto"
          onClick={book}
        >
          {cta}
          <ExternalLink className="ml-2 h-4 w-4" aria-hidden />
        </Button>
      </div>
    </div>
  );
}
