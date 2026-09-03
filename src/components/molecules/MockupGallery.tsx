import { useCallback, useMemo, useState } from "react";
import { motion } from "motion/react";
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
}: {
  item: MockupItem;
  viewOfLabel: string;
  expandLabel: string;
  onOpen: () => void;
  className?: string;
  featured?: boolean;
}) {
  const label = item.label ?? viewOfLabel;

  return (
    <Card
      className={cn(
        "group relative overflow-hidden border border-[color:var(--logo-surface-border)] transition-all duration-300 shadow-none",
        "hover:border-primary/30 hover:shadow-md focus-within:ring-2 focus-within:ring-primary",
        className
      )}
    >
      <ResponsiveImage
        src={item.src}
        alt={item.alt ?? label}
        fit="contain"
        aspectRatio={featured ? "16 / 9" : "16 / 10"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 720px"
        className="cursor-zoom-in bg-muted/30"
        onClick={onOpen}
      />

      <button
        type="button"
        onClick={onOpen}
        className="absolute right-3 top-3 min-h-[44px] min-w-[44px] rounded-full bg-background/90 p-2.5 opacity-90 shadow-md backdrop-blur-sm transition-opacity hover:opacity-100 focus:opacity-100 md:opacity-0 md:group-hover:opacity-100"
        aria-label={expandLabel}
      >
        <Expand className="h-4 w-4 text-primary" aria-hidden />
      </button>

      <div className="flex items-center gap-2 border-t border-border/40 bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
        <Monitor className="h-4 w-4 shrink-0" aria-hidden />
        <span className="truncate">{label}</span>
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
}: MockupGalleryProps) {
  const t = useTranslation(language);
  const items = useMemo(() => normalizeMockups(mockups), [mockups]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
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
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        )}
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
              transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.2) }}
            >
              <MockupTile
                item={item}
                viewOfLabel={viewOf(realIndex + 1, items.length)}
                expandLabel={t.mockups.expand}
                onOpen={() => openLightbox(realIndex)}
                featured={visibleItems.length === 1}
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

  const lightbox =
    active && lightboxIndex !== null ? (
      <MediaLightbox
        open={lightboxIndex !== null}
        onOpenChange={(open) => !open && closeLightbox()}
        src={active.src}
        alt={active.alt ?? ""}
        caption={active.label}
        index={lightboxIndex}
        total={items.length}
      />
    ) : null;

  if (embedded) {
    return (
      <div aria-label={t.mockups.galleryAria}>
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
          transition={{ duration: 0.6 }}
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
