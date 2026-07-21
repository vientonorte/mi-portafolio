import { ExternalLink, Layers, Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  CONSULTORIA_DEMOS,
  type ConsultoriaDemoConfig,
  type ConsultoriaDemoId,
} from "../../data/consultoria-demos";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { trackEvent } from "../../lib/analytics";

export function ConsultoriaDemoShowcase() {
  const { language } = useLanguage();
  const demo = useTranslation(language).consultoria.demo;
  const opensNewTab =
    language === "es" ? "se abre en una pestaña nueva" : "opens in a new tab";

  const openPublishedSite = (config: ConsultoriaDemoConfig) => {
    trackEvent("consultoria_demo_open", {
      demo_id: config.id,
      target: "figma_sites",
    });
    window.open(config.figmaSitesUrl, "_blank", "noopener,noreferrer");
  };

  const openMakeFile = (config: ConsultoriaDemoConfig) => {
    if (!config.figmaMakeUrl) return;
    trackEvent("consultoria_demo_open", {
      demo_id: config.id,
      target: "figma_make",
    });
    window.open(config.figmaMakeUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="consultoria-demo"
      className="section-pad-default scroll-mt-[calc(var(--header-height)+0.75rem)] border-y border-border/60 bg-surface-section"
      aria-labelledby="consultoria-demo-heading"
    >
      <div className="container mx-auto max-w-5xl">
        <div className="mb-8 space-y-3">
          <Badge variant="outline" className="border-primary/25 text-foreground">
            <Sparkles className="mr-1.5 h-3.5 w-3.5 text-primary" aria-hidden />
            {demo.badge}
          </Badge>
          <h2
            id="consultoria-demo-heading"
            className="text-2xl md:text-3xl font-semibold tracking-tight"
          >
            {demo.title}
          </h2>
          <p className="max-w-3xl text-muted-foreground">{demo.description}</p>
        </div>

        <div className="space-y-6">
          {CONSULTORIA_DEMOS.map((config) => {
            const item = demo.items[config.id as ConsultoriaDemoId];
            if (!item) return null;

            return (
              <Card
                key={config.id}
                className="overflow-hidden border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-md"
              >
                <CardContent className="p-0">
                  <div className="grid gap-0 lg:grid-cols-5">
                    <div className="lg:col-span-2 flex flex-col justify-between gap-6 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-[color:var(--logo-surface-border)]">
                      <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--featured-matte-accent)] border border-[color:var(--logo-surface-border)] px-3 py-1.5">
                          <Layers className="h-4 w-4 text-primary" aria-hidden />
                          <span className="text-sm font-semibold text-primary">
                            {item.projectName}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-foreground/90">
                          {item.approach}
                        </p>
                        <ul className="flex flex-wrap gap-2" role="list">
                          {item.highlights.map((tag) => (
                            <li key={tag}>
                              <span className="inline-flex rounded-full border border-border/80 bg-muted/40 px-2.5 py-1 text-xs font-medium text-foreground">
                                {tag}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                        <Button
                          type="button"
                          size="lg"
                          className="w-full bg-brand-gradient font-semibold hover:opacity-90 sm:w-auto"
                          onClick={() => openPublishedSite(config)}
                        >
                          {demo.cta}
                          <ExternalLink className="ml-2 h-4 w-4" aria-hidden />
                        </Button>
                        {config.figmaMakeUrl ? (
                          <Button
                            type="button"
                            size="lg"
                            variant="outline"
                            className="w-full sm:w-auto"
                            onClick={() => openMakeFile(config)}
                          >
                            {demo.ctaSecondary}
                            <ExternalLink className="ml-2 h-4 w-4" aria-hidden />
                          </Button>
                        ) : null}
                      </div>
                    </div>

                    <div className="lg:col-span-3 relative min-h-[280px] md:min-h-[360px] bg-muted/20">
                      <button
                        type="button"
                        onClick={() => openPublishedSite(config)}
                        className="group absolute inset-0 h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                        aria-label={`${demo.cta}: ${item.projectName} (${opensNewTab})`}
                      >
                        <iframe
                          title={item.embedTitle}
                          src={config.figmaSitesUrl}
                          className="pointer-events-none absolute inset-0 h-full w-full border-0"
                          loading="lazy"
                          allowFullScreen
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <span className="pointer-events-none absolute bottom-4 right-4 rounded-full border border-border/80 bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100">
                          {demo.previewCta}
                        </span>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          <button
            type="button"
            onClick={() => openMakeFile(CONSULTORIA_DEMOS[0])}
            className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
            aria-label={`${demo.ctaMakeLink} (${opensNewTab})`}
          >
            {demo.ctaMakeLink} →
          </button>
        </p>
      </div>
    </section>
  );
}
