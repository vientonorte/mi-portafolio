import { Check } from "lucide-react";
import { PendingSlot, SECTION_TITLE_CLASS } from "../components/marketing";
import { assetUrl, placeholdersEnabled } from "../components/marketing/marketing-env";
import { DeviceMockup } from "../components/molecules/DeviceMockup";
import { Badge } from "../components/ui/badge";
import { cn } from "../lib/utils";
import {
  SERVICIOS_CONCEPTOS,
  SERVICIOS_CONCEPTOS_CASES,
  type ConceptCase,
} from "./servicios-content";

const CHILLAX = "font-[family-name:var(--font-chillax)]";
const SECTION_CLASS = "scroll-mt-[calc(var(--header-height)+0.75rem)] border-t border-border/40 py-12 md:py-16";

function IsologoAccent({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      data-accent="isologo"
      className={cn("inline-block size-2.5 shrink-0 rounded-full bg-[var(--primary)]", className)}
    />
  );
}

function ConceptGallery({ images }: { images: NonNullable<ConceptCase["gallery"]> }) {
  return (
    <ol data-concept-gallery className="flex list-none gap-2 overflow-x-auto p-0" aria-label="Galería del concepto">
      {images.map((image) => (
        <li key={image.png} className="w-28 shrink-0">
          <div className="overflow-hidden rounded-md border border-border bg-muted">
            <picture>
              {image.webp ? <source type="image/webp" srcSet={assetUrl(image.webp)} /> : null}
              <img
                src={assetUrl(image.png)}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
                className="h-20 w-full object-cover"
              />
            </picture>
          </div>
          {image.stage ? <p className="mt-1 text-xs font-semibold text-foreground">{image.stage}</p> : null}
        </li>
      ))}
    </ol>
  );
}

function ConceptCard({ item }: { item: ConceptCase }) {
  return (
    <article
      data-concept={item.id}
      className="flex h-full flex-col gap-5 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm"
    >
      {item.image ? (
        <DeviceMockup
          variant={item.mockupVariant ?? "browser"}
          src={assetUrl(item.image.png)}
          alt={item.image.alt}
          addressBar={item.addressBar}
          fit="cover"
          glow={false}
          loading="lazy"
        />
      ) : (
        <PendingSlot variant="thumb" label="Imagen pendiente de exportar" />
      )}
      {item.gallery && item.gallery.length > 0 ? <ConceptGallery images={item.gallery} /> : null}
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">{item.tags.servicio}</p>
        <Badge variant="outline" className="rounded-full border-border bg-muted px-3 py-1 text-xs font-semibold text-foreground">
          {item.tags.rubro}
        </Badge>
        <h3 className={cn(CHILLAX, "flex items-center gap-2 text-xl font-bold leading-snug text-foreground")}>
          <IsologoAccent />
          {item.name}
        </h3>
      </div>
      {item.origin ? (
        <div data-origin={item.origin.label} className="space-y-2">
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-semibold">
            {item.origin.label}
          </Badge>
          <p className="text-sm font-semibold leading-relaxed text-foreground">{item.origin.note}</p>
        </div>
      ) : null}
      <p className="text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
      <ul className="space-y-2">
        {item.findings.map((finding) => (
          <li key={finding} className="flex gap-2 text-sm leading-relaxed text-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            <span>{finding}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

/** Claro, Walmart y Transvip siempre. MASCOTAPP solo si el build muestra placeholders. */
export function ServiciosConceptos() {
  const visible = SERVICIOS_CONCEPTOS_CASES.filter((item) => item.image || placeholdersEnabled());
  if (visible.length === 0) return null;
  return (
    <section id="conceptos" aria-labelledby="conceptos-heading" className={cn(SECTION_CLASS, "bg-muted/30")}>
      <div className="container mx-auto max-w-6xl px-4">
        <h2 id="conceptos-heading" className={cn(SECTION_TITLE_CLASS, CHILLAX, "flex items-center gap-3")}>
          <IsologoAccent className="size-3" />
          {SERVICIOS_CONCEPTOS.heading}
        </h2>
        <p className="mt-2 max-w-2xl text-base text-muted-foreground">{SERVICIOS_CONCEPTOS.intro}</p>
        <ul className="mt-8 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <li key={item.id}>
              <ConceptCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
