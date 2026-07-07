import { ExternalLink, Layers, Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { CONSULTORIA_DEMO_X_CMS } from "../../data/consultoria-demos";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { trackEvent } from "../../lib/analytics";

export function ConsultoriaDemoShowcase() {
  const { language } = useLanguage();
  const demo = useTranslation(language).consultoria.demo;
  const opensNewTab = language === "es" ? "se abre en una pestaña nueva" : "opens in a new tab";

  const openDemo = () => {
    trackEvent("consultoria_demo_open", { demo_id: CONSULTORIA_DEMO_X_CMS.id });
    window.open(CONSULTORIA_DEMO_X_CMS.figmaMakeUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="consultoria-demo"
      className="border-y border-border/60 bg-surface-section px-4 py-12 md:py-16 scroll-mt-24"
      aria-labelledby="consultoria-demo-heading"
    >
      <div className="container mx-auto max-w-5xl">
        <div className="mb-8 space-y-3">
          <Badge variant="outline" className="border-primary/25 text-foreground">
            <Sparkles className="mr-1.5 h-3.5 w-3.5 text-primary" aria-hidden />
            {demo.badge}
          </Badge>
          <h2 id="consultoria-demo-heading" className="text-2xl md:text-3xl font-semibold tracking-tight">
            {demo.title}
          </h2>
          <p className="max-w-3xl text-muted-foreground">{demo.description}</p>
        </div>

        <Card className="overflow-hidden border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-md">
          <CardContent className="p-0">
            <div className="grid gap-0 lg:grid-cols-5">
              <div className="lg:col-span-2 flex flex-col justify-between gap-6 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-[color:var(--logo-surface-border)]">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[var(--featured-matte-accent)] border border-[color:var(--logo-surface-border)] px-3 py-1.5">
                    <Layers className="h-4 w-4 text-primary" aria-hidden />
                    <span className="text-sm font-semibold text-primary">{demo.projectName}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/90">{demo.approach}</p>
                  <ul className="flex flex-wrap gap-2" role="list">
                    {demo.highlights.map((item) => (
                      <li key={item}>
                        <span className="inline-flex rounded-full border border-border/80 bg-muted/40 px-2.5 py-1 text-xs font-medium text-foreground">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  type="button"
                  size="lg"
                  className="w-full bg-brand-gradient font-semibold hover:opacity-90 sm:w-auto"
                  onClick={openDemo}
                >
                  {demo.cta}
                  <ExternalLink className="ml-2 h-4 w-4" aria-hidden />
                </Button>
              </div>

              <div className="lg:col-span-3 relative min-h-[280px] md:min-h-[360px] bg-muted/20">
                <iframe
                  title={demo.embedTitle}
                  src={CONSULTORIA_DEMO_X_CMS.embedUrl}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          <button
            type="button"
            onClick={openDemo}
            className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
            aria-label={`${demo.ctaSecondary} (${opensNewTab})`}
          >
            {demo.ctaSecondary} →
          </button>
        </p>
      </div>
    </section>
  );
}