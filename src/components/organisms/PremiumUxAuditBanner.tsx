import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ClipboardCheck, Sparkles, Shield } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { LogoMark } from "../atoms/Logo";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";

interface PremiumUxAuditBannerProps {
  variant?: "hero" | "compact";
  /** Use `p` when the page already exposes an `h1` above this banner (heading order). */
  titleTag?: "h2" | "p";
  onStartConsulting?: () => void;
  onViewSampleAudit?: () => void;
}

export function PremiumUxAuditBanner({
  variant = "hero",
  titleTag = "h2",
  onStartConsulting,
  onViewSampleAudit,
}: PremiumUxAuditBannerProps) {
  const { language } = useLanguage();
  const t = useTranslation(language).uxAuditBanner;
  const prefersReducedMotion = useReducedMotion();

  const metrics = [
    { value: "WCAG 2.2", label: t.metrics.a11y },
    { value: "P0–P2", label: t.metrics.priority },
    { value: "<10 s", label: t.metrics.recruiter },
  ];

  const content = (
    <div
      className={
        variant === "hero"
          ? "grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
          : "flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
      }
    >
      <div className={variant === "compact" ? "flex-1 space-y-4" : "space-y-6"}>
        <Badge
          variant="outline"
          className="border-primary/25 bg-surface-matte-elevated text-foreground"
        >
          <Sparkles className="mr-1.5 h-3.5 w-3.5 text-primary" aria-hidden />
          {t.badge}
        </Badge>

        <div className="space-y-3">
          {titleTag === "h2" ? (
            <h2
              id="ux-audit-banner-heading"
              className={
                variant === "hero"
                  ? "text-4xl font-black tracking-tighter text-foreground md:text-5xl lg:text-6xl lg:leading-[0.95]"
                  : "text-3xl font-bold tracking-tight text-foreground md:text-4xl"
              }
            >
              {t.titleLead}{" "}
              <span className="text-brand-gradient">{t.titleAccent}</span>
            </h2>
          ) : (
            <p
              id="ux-audit-banner-heading"
              className={
                variant === "hero"
                  ? "text-4xl font-black tracking-tighter text-foreground md:text-5xl lg:text-6xl lg:leading-[0.95]"
                  : "text-3xl font-bold tracking-tight text-foreground md:text-4xl"
              }
            >
              {t.titleLead}{" "}
              <span className="text-brand-gradient">{t.titleAccent}</span>
            </p>
          )}
          <p className="max-w-xl text-base text-muted-foreground md:text-lg">{t.description}</p>
        </div>

        <ul className="flex flex-wrap gap-2" role="list">
          {t.highlights.map((item) => (
            <li key={item}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-foreground">
                <Shield className="h-3 w-3 text-primary" aria-hidden />
                {item}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3">
          <Button
            size="lg"
            className="bg-brand-gradient font-semibold hover:opacity-90"
            onClick={onStartConsulting}
          >
            {t.ctaPrimary}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
          </Button>
          <Button size="lg" variant="outline" onClick={onViewSampleAudit}>
            <ClipboardCheck className="mr-2 h-4 w-4" aria-hidden />
            {t.ctaSecondary}
          </Button>
        </div>
      </div>

      {variant === "hero" && (
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          aria-hidden
        >
          <div className="relative overflow-hidden rounded-2xl border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated p-8 shadow-none">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-brand-gradient"
              aria-hidden
            />
            <div className="flex items-start justify-between gap-4">
              <LogoMark size={56} interactive />
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Viento Norte
              </p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-[color:var(--logo-surface-border)] bg-surface-matte px-3 py-4 text-center"
                >
                  <p className="text-lg font-semibold text-foreground">{m.value}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">{t.panelNote}</p>
          </div>
        </motion.div>
      )}
    </div>
  );

  return (
    <section
      className={
        variant === "hero"
          ? "relative overflow-hidden border-b border-border/60 bg-surface-matte px-4 py-16 md:py-24"
          : "px-4 py-10 md:py-12"
      }
      aria-labelledby="ux-audit-banner-heading"
    >
      {variant === "hero" && (
        <div
          className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full opacity-20"
          style={{ background: "var(--brand-gradient)", filter: "blur(100px)" }}
          aria-hidden
        />
      )}
      <div className="container relative z-10 mx-auto max-w-6xl">
        <div
          className={
            variant === "compact"
              ? "rounded-2xl border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated p-6 md:p-8"
              : undefined
          }
        >
          {content}
        </div>
      </div>
    </section>
  );
}