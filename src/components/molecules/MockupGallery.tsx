import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Expand, Monitor } from "lucide-react";
import { ResponsiveImage } from "../atoms/ResponsiveImage";
import { MediaLightbox } from "./MediaLightbox";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { useTranslation, type Language } from "../../lib/i18n";

export interface MockupItem {
  src: string;
  alt?: string;
  label?: string;
  title?: string;
  /** Marcador visible, por ejemplo un [TODO Rö]. */
  note?: string;
  width?: number;
  height?: number;
  webpSrcSet?: string;
}

interface MockupGalleryProps {
  mockups: string[] | MockupItem[];
  title?: string;
  description?: string;
  language: Language;
  sectionId?: string;
  /** Sin cabecera ni wrapper de sección — para anidar dentro de #evidence */
  embedded?: boolean;
  /**
   * Cuántas capturas mostrar en grilla. Default: todas (la evidencia no se esconde).
   * Pasar un número menor activa "Ver n capturas más". Lightbox se mantiene.
   */
  maxVisible?: number;
  /** 2 columnas desde 1024px. Default: 3. */
  columns?: 2 | 3;
}

function normalizeMockups(mockups: string[] | MockupItem[]): MockupItem[] {
  return mockups.map((item, index) =>
    typeof item === "string"
      ? { src: item, alt: `Mockup ${index + 1}`, label: undefined }
      : item
  );
}

function MockupTile({
  item,
  viewOfLabel,
  expandLabel,
  onOpen,
  className,
  featured = false,
  priority = false,
}: {
  item: MockupItem;
  viewOfLabel: string;
  expandLabel: string;
  onOpen: (trigger: HTMLElement) => void;
  className?: string;
  featured?: boolean;
  priority?: boolean;
}) {
  const label = item.label ?? viewOfLabel;
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <Card
      data-slide
      className={cn(
        "group relative overflow-hidden border border-[color:var(--logo-surface-border)] transition-all duration-300 shadow-none",
        "hover:border-primary/30 hover:shadow-md focus-within:ring-2 focus-within:ring-primary",
        className
      )}
    >
      <div className="relative">
        <ResponsiveImage
          src={item.src}
          alt={item.alt ?? label}
          fit="contain"
          aspectRatio={featured ? "16 / 9" : "16 / 10"}
          sizes="(max-width: 768px) 100vw, 720px"
          width={item.width}
          height={item.height}
          webpSrcSet={item.webpSrcSet}
          priority={priority}
          className="bg-muted/30"
        />
        <button
          type="button"
          ref={buttonRef}
          onClick={() => {
            if (buttonRef.current) onOpen(buttonRef.current);
          }}
          data-slide-open
          className="absolute inset-0 cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label={expandLabel}
        >
          <span className="sr-only">{viewOfLabel}</span>
          <span className="absolute right-3 top-3 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-background/90 p-2.5 shadow-md">
            <Expand className="h-4 w-4 text-primary" aria-hidden />
          </span>
        </button>
      </div>

      <div className="border-t border-border/40 bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
        {item.title ? <p className="font-semibold text-foreground">{item.title}</p> : null}
        <p className="mt-1 flex items-start gap-2">
          <Monitor className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>{label}</span>
        </p>
        {item.note ? (
          <p className="mt-2">
            <strong
              data-todo="ro"
              className="inline rounded-sm border border-dashed border-amber-800/80 bg-amber-100 px-1 py-0.5 font-semibold text-foreground dark:border-amber-200/80 dark:bg-amber-950/70"
            >
              {item.note}
            </strong>
          </p>
        ) : null}
      </div>
    </Card>
  );
}

export function MockupGallery({
  mockups,
  title,
  description,
  language,
  sectionId = "mockups",
  embedded = false,
  maxVisible,
  columns = 3,
}: MockupGalleryProps) {
  const t = useTranslation(language);
  const reduceMotion = useReducedMotion();
  const items = useMemo(() => normalizeMockups(mockups), [mockups]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const focusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    return () => {
      if (focusTimerRef.current !== null) {
        clearTimeout(focusTimerRef.current);
      }
    };
  }, []);

  const openLightbox = useCallback((index: number, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setLightboxIndex(index);
  }, []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  if (items.length === 0) return null;

  const limit = maxVisible == null ? items.length : Math.max(1, maxVisible);
  const hasMore = items.length > limit;
  const visibleItems = expanded || !hasMore ? items : items.slice(0, limit);
  const hiddenCount = items.length - limit;

  const viewOf = (current: number, total: number) =>
    t.mockups.viewOf
      .replace("{current}", String(current))
      .replace("{total}", String(total));

  const active = lightboxIndex !== null ? items[lightboxIndex] : null;

  const moreLabel = (t.mockups.moreCaptures ?? "Ver {n} capturas más").replace(
    "{n}",
    String(hiddenCount)
  );
  const lessLabel = t.mockups.showFeaturedOnly ?? "Solo la principal";

  const grid = (
    <div className="space-y-4">
      {/* Grilla responsive — sin carrusel infinito en mobile */}
      <div
        className={cn(
          "grid gap-4",
          visibleItems.length === 1
            ? "grid-cols-1 max-w-3xl mx-auto w-full"
            : columns === 2
              ? "grid-cols-1 lg:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        )}
        role="group"
        aria-label={t.mockups.galleryAria}
      >
        {visibleItems.map((item, index) => {
          const absoluteIndex = expanded
            ? index
            : items.findIndex((i) => i.src === item.src);
          const realIndex = absoluteIndex >= 0 ? absoluteIndex : index;
          return (
            <motion.div
              key={item.src + realIndex}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                delay: reduceMotion ? 0 : Math.min(index * 0.05, 0.2),
              }}
            >
              <MockupTile
                item={item}
                viewOfLabel={viewOf(realIndex + 1, items.length)}
                expandLabel={t.mockups.expand}
                onOpen={(trigger) => openLightbox(realIndex, trigger)}
                featured={visibleItems.length === 1}
                priority={realIndex === 0}
                className="h-full"
              />
            </motion.div>
          );
        })}
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="min-h-[44px] border-[color:var(--logo-surface-border)]"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? lessLabel : moreLabel}
          </Button>
        </div>
      )}
    </div>
  );

  const shown = active ?? items[0];
  const lightbox = (
    <MediaLightbox
      open={lightboxIndex !== null}
      onOpenChange={(open) => {
        if (!open) {
          const trigger = triggerRef.current;
          closeLightbox();
          trigger?.focus();
        }
      }}
      prevLabel={t.mockups.previous}
      nextLabel={t.mockups.next}
      onCloseAutoFocus={(event) => {
        event.preventDefault();
        const index = lightboxIndex ?? 0;
        // El foco vuelve cuando el diálogo ya soltó el resto de la página.
        if (focusTimerRef.current !== null) {
          clearTimeout(focusTimerRef.current);
        }
        focusTimerRef.current = setTimeout(() => {
          focusTimerRef.current = null;
          if (typeof document === "undefined") return;
          const buttons = document.querySelectorAll<HTMLButtonElement>("[data-slide-open]");
          (buttons[index] ?? triggerRef.current)?.focus();
        }, 0);
      }}
      src={shown.src}
      alt={shown.alt ?? ""}
      caption={shown.label}
      index={lightboxIndex ?? 0}
      total={items.length}
      width={shown.width}
      height={shown.height}
      webpSrcSet={shown.webpSrcSet}
      onPrev={
        lightboxIndex !== null && lightboxIndex > 0
          ? () => setLightboxIndex(lightboxIndex - 1)
          : undefined
      }
      onNext={
        lightboxIndex !== null && lightboxIndex < items.length - 1
          ? () => setLightboxIndex(lightboxIndex + 1)
          : undefined
      }
    />
  );

  if (embedded) {
    return (
      <div>
        {grid}
        {lightbox}
      </div>
    );
  }

  return (
    <section
      id={sectionId}
      className="py-16 md:py-24 px-4 scroll-mt-20"
      aria-labelledby="mockups-heading"
    >
      <div className="container max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.6 }}
          className="mb-10 text-center md:mb-12"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
            <Monitor className="h-4 w-4 text-primary" aria-hidden />
            <span className="text-sm font-medium text-primary">{t.mockups.badge}</span>
          </div>
          <h2 id="mockups-heading" className="mb-4 text-3xl md:text-4xl">
            {title || t.mockups.defaultTitle}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {description || t.mockups.defaultDescription}
          </p>
          {items.length > 1 && (
            <p className="mt-3 text-xs text-muted-foreground">
              {language === "es"
                ? `${items.length} capturas`
                : `${items.length} captures`}
            </p>
          )}
        </motion.div>
        {grid}
      </div>
      {lightbox}
    </section>
  );
}
