import { useState } from "react";
import { Layers, MessageSquare, Sparkles, X } from "lucide-react";
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
import { getPortfolioImages } from "../../lib/image-overrides";
import { scrollToSection } from "../../lib/scroll-to-section";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../lib/routes";

/** Static posters for Apple-style mock demos (no interactive iframe). */
function demoPoster(id: ConsultoriaDemoId): string {
  const img = getPortfolioImages();
  if (id === "gees-propuesta") return img.sura.iaAutomationDashboard;
  return img.consultoria.xCmsDashboard;
}

export function ConsultoriaDemoShowcase() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const demo = useTranslation(language).consultoria.demo;
  const [lightbox, setLightbox] = useState<{
    config: ConsultoriaDemoConfig;
    title: string;
  } | null>(null);

  const goLead = (demoId: string) => {
    trackEvent("consultoria_demo_lead", { demo_id: demoId });
    setLightbox(null);
    if (document.getElementById("contacto")) {
      scrollToSection("contacto");
      return;
    }
    if (document.getElementById("consultoria-onboarding")) {
      scrollToSection("consultoria-onboarding");
      return;
    }
    navigate(ROUTES.home, { state: { scrollTo: "contacto" } });
  };

  const openMockups = (config: ConsultoriaDemoConfig, title: string) => {
    trackEvent("demo_mockup_open", { demo_id: config.id });
    setLightbox({ config, title });
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
            className="text-3xl md:text-4xl font-semibold tracking-tight"
          >
            {demo.title}
          </h2>
          <p className="max-w-3xl text-muted-foreground text-base md:text-lg">
            {demo.description}
          </p>
        </div>

        <div className="space-y-8">
          {CONSULTORIA_DEMOS.map((config) => {
            const item = demo.items[config.id as ConsultoriaDemoId];
            if (!item) return null;
            const poster = demoPoster(config.id as ConsultoriaDemoId);

            return (
              <Card
                key={config.id}
                className="overflow-hidden border-2 border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-md"
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
                          onClick={() => openMockups(config, item.projectName)}
                        >
                          {demo.cta}
                        </Button>
                        <Button
                          type="button"
                          size="lg"
                          variant="outline"
                          className="w-full sm:w-auto"
                          onClick={() => goLead(config.id)}
                        >
                          <MessageSquare className="mr-2 h-4 w-4" aria-hidden />
                          {demo.ctaSecondary}
                        </Button>
                      </div>
                    </div>

                    {/* Static mockup frame — not interactive iframe */}
                    <div className="lg:col-span-3 relative min-h-[240px] md:min-h-[320px] bg-gradient-to-br from-muted/40 to-background p-4 md:p-6">
                      <button
                        type="button"
                        onClick={() => openMockups(config, item.projectName)}
                        className="group relative mx-auto flex h-full w-full max-w-lg items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        aria-label={`${demo.cta}: ${item.projectName}`}
                      >
                        <div className="w-full overflow-hidden rounded-xl border-2 border-border/80 bg-background shadow-2xl ring-1 ring-black/5 transition-transform group-hover:scale-[1.01]">
                          <div className="flex items-center gap-1.5 border-b border-border/60 bg-muted/50 px-3 py-2">
                            <span className="h-2 w-2 rounded-full bg-destructive/50" />
                            <span className="h-2 w-2 rounded-full bg-amber-400/60" />
                            <span className="h-2 w-2 rounded-full bg-emerald-400/60" />
                            <span className="ml-2 truncate text-[10px] text-muted-foreground">
                              {item.projectName}
                            </span>
                          </div>
                          <img
                            src={poster}
                            alt=""
                            className="aspect-[16/10] w-full object-cover object-top"
                            loading="lazy"
                          />
                        </div>
                        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-border/80 bg-background/95 px-3 py-1.5 text-xs font-medium opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
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
      </div>

      {lightbox ? (
        <div
          id="consultoria-demo-lightbox"
          data-demo-lightbox
          className="fixed inset-0 z-[80] flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label={language === "es" ? "Cerrar" : "Close"}
            onClick={() => setLightbox(null)}
          />
          <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border-2 border-border bg-card shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <p className="font-semibold">{lightbox.title}</p>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                data-demo-lightbox-close
                onClick={() => setLightbox(null)}
                aria-label={language === "es" ? "Cerrar" : "Close"}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <img
              src={demoPoster(lightbox.config.id as ConsultoriaDemoId)}
              alt=""
              className="max-h-[70vh] w-full object-contain bg-muted/30"
            />
            <div className="flex flex-wrap gap-2 border-t border-border p-4">
              <Button
                type="button"
                className="bg-brand-gradient font-semibold"
                onClick={() => goLead(lightbox.config.id)}
              >
                {demo.ctaSecondary}
              </Button>
              <Button type="button" variant="outline" onClick={() => setLightbox(null)}>
                {language === "es" ? "Cerrar" : "Close"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
