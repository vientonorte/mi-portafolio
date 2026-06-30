import { useCallback, useState } from "react";
import { motion } from "motion/react";
import { Expand, Monitor, Smartphone } from "lucide-react";
import { ResponsiveImage } from "../atoms/ResponsiveImage";
import { MediaLightbox } from "./MediaLightbox";
import { Card } from "../ui/card";
import { cn } from "../../lib/utils";

export interface MockupItem {
  src: string;
  alt?: string;
  label?: string;
}

interface MockupGalleryProps {
  mockups: string[] | MockupItem[];
  title?: string;
  description?: string;
  language: "es" | "en";
}

function normalizeMockups(mockups: string[] | MockupItem[]): MockupItem[] {
  return mockups.map((item, index) =>
    typeof item === "string"
      ? { src: item, alt: `Mockup ${index + 1}`, label: undefined }
      : item
  );
}

function bentoClass(index: number, total: number): string {
  if (total === 1) return "col-span-1 row-span-1";
  if (total === 2) return "col-span-1";
  if (index === 0) return "md:col-span-2 md:row-span-2";
  return "col-span-1";
}

function MockupTile({
  item,
  index,
  total,
  language,
  onOpen,
  className,
}: {
  item: MockupItem;
  index: number;
  total: number;
  language: "es" | "en";
  onOpen: () => void;
  className?: string;
}) {
  const label =
    item.label ??
    (language === "es"
      ? `Vista ${index + 1} de ${total}`
      : `View ${index + 1} of ${total}`);

  return (
    <Card
      className={cn(
        "group relative overflow-hidden border-2 border-border/40 transition-all duration-300",
        "hover:border-primary/40 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary",
        className
      )}
    >
      <ResponsiveImage
        src={item.src}
        alt={item.alt ?? label}
        fit="contain"
        aspectRatio="16 / 10"
        sizes="(max-width: 768px) 92vw, (max-width: 1200px) 45vw, 30vw"
        className="cursor-zoom-in bg-muted/30"
        onClick={onOpen}
      />

      <button
        type="button"
        onClick={onOpen}
        className="absolute right-3 top-3 rounded-full bg-background/90 p-2 opacity-0 shadow-md backdrop-blur-sm transition-opacity group-hover:opacity-100 focus:opacity-100"
        aria-label={language === "es" ? "Ampliar imagen" : "Expand image"}
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
}: MockupGalleryProps) {
  const items = normalizeMockups(mockups);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  if (items.length === 0) return null;

  const defaultTitle =
    language === "es" ? "Evidencias Visuales del Proyecto" : "Project Visual Evidence";
  const defaultDescription =
    language === "es"
      ? "Mockups de alta fidelidad del diseño UX/UI implementado"
      : "High-fidelity mockups of the implemented UX/UI design";

  const active = lightboxIndex !== null ? items[lightboxIndex] : null;

  return (
    <section
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
            <span className="text-sm font-medium text-primary">Mockups</span>
          </div>
          <h2 id="mockups-heading" className="mb-4 text-3xl md:text-4xl">
            {title || defaultTitle}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {description || defaultDescription}
          </p>
          <p className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground md:hidden">
            <Smartphone className="h-3.5 w-3.5" aria-hidden />
            {language === "es"
              ? "Desliza para explorar · Toca para ampliar"
              : "Swipe to explore · Tap to zoom"}
          </p>
        </motion.div>

        {/* Mobile / tablet: scroll-snap horizontal (sin dependencia de carousel) */}
        <div className="md:hidden -mx-4 px-4">
          <div
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            style={{ WebkitOverflowScrolling: "touch" }}
            aria-label={
              language === "es"
                ? "Galería de mockups, desliza horizontalmente"
                : "Mockup gallery, swipe horizontally"
            }
          >
            {items.map((item, index) => (
              <div
                key={item.src + index}
                className="w-[88%] shrink-0 snap-start sm:w-[72%]"
              >
                <MockupTile
                  item={item}
                  index={index}
                  total={items.length}
                  language={language}
                  onOpen={() => openLightbox(index)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: bento grid responsivo */}
        <div
          className={cn(
            "hidden gap-4 md:grid",
            items.length >= 3
              ? "grid-cols-2 lg:grid-cols-3 lg:grid-rows-2"
              : "grid-cols-1 sm:grid-cols-2"
          )}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.src + index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={bentoClass(index, items.length)}
            >
              <MockupTile
                item={item}
                index={index}
                total={items.length}
                language={language}
                onOpen={() => openLightbox(index)}
                className="h-full"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {active && lightboxIndex !== null && (
        <MediaLightbox
          open={lightboxIndex !== null}
          onOpenChange={(open) => !open && closeLightbox()}
          src={active.src}
          alt={active.alt ?? ""}
          caption={active.label}
          index={lightboxIndex}
          total={items.length}
        />
      )}
    </section>
  );
}