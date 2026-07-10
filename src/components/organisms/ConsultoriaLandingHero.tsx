import {
  ArrowRight,
  Compass,
  FileSearch,
  GitBranch,
  Layers,
  Lock,
  Workflow,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { trackEvent } from "../../lib/analytics";
import { cn } from "../../lib/utils";

interface ConsultoriaLandingHeroProps {
  onStartOnboarding?: () => void;
  onExploreEvidence?: () => void;
}

const ANCHORS = [
  { id: "metodo-n2n", icon: Workflow, labelKey: "n2n" as const },
  { id: "offline-private", icon: Lock, labelKey: "private" as const },
  { id: "practicas", icon: FileSearch, labelKey: "practices" as const },
  { id: "modalidades", icon: Layers, labelKey: "packages" as const },
  { id: "valor", icon: Compass, labelKey: "evidence" as const },
  { id: "arbol", icon: GitBranch, labelKey: "fit" as const },
] as const;

export function ConsultoriaLandingHero({
  onStartOnboarding,
  onExploreEvidence,
}: ConsultoriaLandingHeroProps) {
  const { language } = useLanguage();
  const t = useTranslation(language).consultoria.landing;
  const es = language === "es";

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const start = () => {
    trackEvent("consultoria_hero_cta", { action: "onboarding" });
    onStartOnboarding?.();
  };

  const evidence = () => {
    trackEvent("consultoria_hero_cta", { action: "evidence" });
    if (onExploreEvidence) onExploreEvidence();
    else scrollTo("valor");
  };

  return (
    <section
      className="relative overflow-hidden border-b border-border/60 bg-surface-matte px-4 py-14 md:py-20"
      aria-labelledby="consultoria-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, color-mix(in oklab, var(--primary) 12%, transparent), transparent)",
        }}
      />

      <div className="container relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <Badge variant="outline" className="border-primary/25 text-foreground">
            {t.badge}
          </Badge>

          <h1
            id="consultoria-hero-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            {t.title}{" "}
            <span className="text-brand-gradient">{t.titleAccent}</span>
          </h1>

          <p className="text-base text-muted-foreground md:text-lg leading-relaxed">
            {t.description}
          </p>

          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              className="bg-brand-gradient font-semibold hover:opacity-90 min-h-[44px]"
              onClick={start}
            >
              {t.ctaPrimary}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-h-[44px]"
              onClick={evidence}
            >
              {t.ctaSecondary}
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="min-h-[44px]"
              onClick={() => scrollTo("offline-private")}
            >
              {es ? "C1 Offline" : "C1 Offline"}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">{t.trustLine}</p>
        </div>

        <ul
          className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-4"
          role="list"
        >
          {t.metrics.map((m) => (
            <li
              key={m.label}
              className="rounded-xl border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated px-4 py-4 text-center shadow-none"
            >
              <p className="font-mono text-xl font-bold tracking-tight text-foreground md:text-2xl">
                {m.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground leading-snug">
                {m.label}
              </p>
            </li>
          ))}
        </ul>

        <nav
          aria-label={es ? "Secciones de la landing" : "Landing sections"}
          className="mt-10 md:mt-12"
        >
          <ul
            className="flex flex-wrap items-center justify-center gap-2"
            role="list"
          >
            {ANCHORS.map((a) => {
              const Icon = a.icon;
              return (
                <li key={a.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(a.id)}
                    className={cn(
                      "inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors",
                      "hover:border-primary/25 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5 text-primary" aria-hidden />
                    {t.nav[a.labelKey]}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
}
