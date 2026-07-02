import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  GitBranch,
  Sparkles,
  TrendingDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { LogoMark } from "../atoms/Logo";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "../ui/carousel";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { ROUTES } from "../../lib/routes";
import { trackEvent } from "../../lib/analytics";
import { cn } from "../ui/utils";

const SLIDE_ICONS = [ClipboardCheck, TrendingDown, GitBranch] as const;

type SlideId = "audit" | "sura-case" | "consultoria";

interface ValueCarouselBannerProps {
  onStartConsulting?: () => void;
  onViewSampleAudit?: () => void;
}

export function ValueCarouselBanner({
  onStartConsulting,
  onViewSampleAudit,
}: ValueCarouselBannerProps) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language).valueCarousel;
  const prefersReducedMotion = useReducedMotion();

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  const goToSlide = (index: number) => {
    api?.scrollTo(index);
  };

  const handlePrimaryCta = (slideId: SlideId) => {
    trackEvent("value_carousel_cta", { slide: slideId, action: "primary" });

    switch (slideId) {
      case "audit":
        if (onViewSampleAudit) onViewSampleAudit();
        else navigate(ROUTES.audit);
        break;
      case "sura-case":
        navigate(ROUTES.project("sura-ria-us"));
        break;
      case "consultoria":
        if (onStartConsulting) onStartConsulting();
        else navigate(ROUTES.consulting);
        break;
    }
  };

  const handleSecondaryCta = (slideId: SlideId) => {
    trackEvent("value_carousel_cta", { slide: slideId, action: "secondary" });

    switch (slideId) {
      case "audit":
        if (onStartConsulting) onStartConsulting();
        else navigate(ROUTES.consulting);
        break;
      case "sura-case":
        navigate(ROUTES.processPhase("ux-analytics"));
        break;
      case "consultoria":
        navigate(ROUTES.consulting, { state: { scrollTo: "arbol" } });
        break;
    }
  };

  const slideOfLabel = t.slideOf
    .replace("{current}", String(current + 1))
    .replace("{total}", String(t.slides.length));

  return (
    <section
      id="valor"
      className="relative overflow-hidden px-4 py-14 md:py-20 bg-surface-matte"
      aria-labelledby="value-carousel-heading"
    >
      <div
        className="pointer-events-none absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full opacity-15"
        style={{ background: "var(--brand-gradient)", filter: "blur(120px)" }}
        aria-hidden
      />

      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <Badge
              variant="outline"
              className="border-primary/25 bg-surface-matte-elevated text-foreground"
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5 text-primary" aria-hidden />
              {t.sectionBadge}
            </Badge>
            <p id="value-carousel-heading" className="sr-only">
              {t.sectionBadge}
            </p>
          </div>

          <div className="flex items-center gap-2" aria-live="polite">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {slideOfLabel}
            </span>
            <div className="flex gap-1.5" role="tablist" aria-label={t.sectionBadge}>
              {t.slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={current === index}
                  aria-label={slide.badge}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    current === index
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <Carousel
          setApi={setApi}
          opts={{ loop: true, align: "start" }}
          className="w-full"
        >
          <div className="relative">
            <CarouselContent className="-ml-0">
              {t.slides.map((slide, index) => {
                const Icon = SLIDE_ICONS[index] ?? Sparkles;

                return (
                  <CarouselItem key={slide.id} className="pl-0">
                    <motion.div
                      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
                      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                      transition={{ duration: 0.45 }}
                      className="overflow-hidden rounded-2xl border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-none"
                    >
                      <div
                        className="pointer-events-none h-1 bg-brand-gradient"
                        aria-hidden
                      />

                      <div className="grid gap-8 p-6 md:grid-cols-[1.05fr_0.95fr] md:items-center md:p-10">
                        <div className="space-y-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                              <Icon className="h-5 w-5 text-primary" aria-hidden />
                            </div>
                            <Badge variant="secondary" className="font-medium">
                              {slide.badge}
                            </Badge>
                          </div>

                          <div className="space-y-2">
                            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl lg:text-4xl">
                              {slide.title}{" "}
                              <span className="text-brand-gradient">{slide.titleAccent}</span>
                            </h2>
                            <p className="max-w-xl text-base text-muted-foreground md:text-lg">
                              {slide.description}
                            </p>
                          </div>

                          <ul className="flex flex-wrap gap-2" role="list">
                            {slide.highlights.map((item) => (
                              <li key={item}>
                                <span className="inline-flex rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-foreground">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>

                          <div className="flex flex-wrap gap-3 pt-1">
                            <Button
                              size="lg"
                              className="bg-brand-gradient font-semibold hover:opacity-90"
                              onClick={() => handlePrimaryCta(slide.id as SlideId)}
                            >
                              {slide.cta}
                              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                            </Button>
                            <Button
                              size="lg"
                              variant="outline"
                              onClick={() => handleSecondaryCta(slide.id as SlideId)}
                            >
                              {slide.ctaSecondary}
                            </Button>
                          </div>
                        </div>

                        <div className="relative overflow-hidden rounded-2xl border border-[color:var(--logo-surface-border)] bg-surface-matte p-6 md:p-8">
                          <div className="flex items-start justify-between gap-4">
                            <LogoMark size={48} interactive />
                            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                              Viento Norte
                            </p>
                          </div>

                          <div className="mt-8 grid grid-cols-3 gap-3">
                            {slide.metrics.map((metric) => (
                              <div
                                key={metric.label}
                                className="rounded-xl border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated px-3 py-4 text-center"
                              >
                                <p className="text-lg font-semibold text-foreground">
                                  {metric.value}
                                </p>
                                <p className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">
                                  {metric.label}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            <div className="absolute right-4 top-4 flex gap-2 md:right-6 md:top-6">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm"
                onClick={() => api?.scrollPrev()}
                aria-label={t.prevSlide}
              >
                <ChevronLeft className="h-4 w-4" aria-hidden />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm"
                onClick={() => api?.scrollNext()}
                aria-label={t.nextSlide}
              >
                <ChevronRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}