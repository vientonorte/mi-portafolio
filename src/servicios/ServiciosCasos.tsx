import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { PendingSlot, SECTION_TITLE_CLASS } from "../components/marketing";
import { assetUrl, placeholdersEnabled } from "../components/marketing/marketing-env";
import { DeviceMockup } from "../components/molecules/DeviceMockup";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { cn } from "../lib/utils";
import {
  SERVICIOS_CONCEPTOS,
  SERVICIOS_CONCEPTOS_CASES,
  SERVICIOS_VN_CASE_GROUPS,
  SERVICIOS_VN_CASES,
  type ConceptCase,
  type ServiciosAnchor,
  type VnCase,
} from "./servicios-content";

/** Títulos en Chillax (token del design system). */
const CHILLAX = "font-[family-name:var(--font-chillax)]";
const SECTION_CLASS = "scroll-mt-[calc(var(--header-height)+0.75rem)] border-t border-border/40 py-12 md:py-16";

/**
 * Tarjeta de caso = Card del DS (tokens como home) + DeviceMockup.
 * Hover/focus visibles; prefers-reduced-motion vía motion-reduce en glow del mockup.
 * Toda la tarjeta es un enlace al servicio (teclado + click).
 */
const CARD_CLASS =
  "group flex h-full flex-col gap-5 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm transition-[box-shadow,border-color] duration-200 hover:border-primary/40 hover:shadow-md focus-within:border-primary focus-within:shadow-md focus-within:outline-none motion-reduce:transition-none";
const CARD_LINK_CLASS =
  "absolute inset-0 z-10 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const EYEBROW = "font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground";
const TITLE = "text-xl font-bold leading-snug text-foreground";

function IsologoAccent({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      data-accent="isologo"
      className={cn("inline-block size-2.5 shrink-0 rounded-full bg-[var(--primary)]", className)}
    />
  );
}

function FindingsList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((f) => (
        <li key={f} className="flex gap-2 text-sm leading-relaxed text-foreground">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
          <span>{f}</span>
        </li>
      ))}
    </ul>
  );
}

function RubroChip({ label }: { label: string }) {
  return (
    <Badge data-tag="rubro" variant="outline" className="rounded-full border-border bg-muted px-3 py-1 text-xs font-semibold text-foreground">
      {label}
    </Badge>
  );
}

/** Imagen WebP del repo dentro del mockup DS (browser o phone). */
function CaseMockup({
  image,
  addressBar,
  variant = "browser",
  gapNote,
  pending,
}: {
  image?: VnCase["image"];
  addressBar: string;
  variant?: "browser" | "phone";
  gapNote?: string;
  pending?: ConceptCase;
}) {
  if (pending && !pending.image) {
    const { fileName, fileKey, nodeId, ratio } = pending.pendingAsset!;
    return (
      <div data-device-frame data-pending-asset={`${fileKey}:${nodeId}`}>
        <DeviceMockup
          variant={variant}
          src=""
          addressBar={addressBar}
          fit="cover"
          glow={false}
          screenContent={
            <PendingSlot
              variant="thumb"
              className="rounded-none border-0"
              label={`Imagen pendiente: Figma «${fileName}» (${fileKey}), nodo ${nodeId}, ${ratio}`}
            />
          }
        />
      </div>
    );
  }

  if (!image) {
    // Gap Figma Design (X|CMS / GEES): sin asset repo. Marco reservado CLS; sin PendingSlot (solo #conceptos).
    return (
      <div data-device-frame data-asset-gap="figma-design-no-dato">
        <DeviceMockup
          variant="browser"
          src=""
          addressBar={addressBar}
          fit="cover"
          glow={false}
          width={1440}
          height={900}
          screenContent={
            <div
              className="flex aspect-[16/10] w-full items-center justify-center bg-muted px-4 text-center text-sm font-medium text-muted-foreground"
              role="img"
              aria-label={gapNote ?? "Gap Figma Design · NO DATO"}
            >
              {gapNote ?? "Gap Figma Design · NO DATO"}
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div data-device-frame data-asset-origen="repo">
      <DeviceMockup
        variant={variant}
        src={assetUrl(image.png)}
        webpSrc={image.webp ? assetUrl(image.webp) : undefined}
        alt={image.alt}
        addressBar={addressBar}
        fit="cover"
        glow={false}
        loading="lazy"
        width={image.width}
        height={image.height}
      />
    </div>
  );
}

function CaseCardShell({
  children,
  href,
  linkLabel,
  caseId,
  assetOrigen,
}: {
  children: ReactNode;
  href: string;
  linkLabel: string;
  caseId: string;
  assetOrigen?: string;
}) {
  return (
    <Card
      data-card-variant="service"
      data-vn-case={caseId}
      data-asset-origen={assetOrigen}
      className={cn(CARD_CLASS, "relative gap-5 py-0 shadow-sm")}
    >
      <a href={href} className={CARD_LINK_CLASS} aria-label={linkLabel}>
        <span className="sr-only">{linkLabel}</span>
      </a>
      <CardContent className="relative z-0 flex flex-1 flex-col gap-5 p-0">{children}</CardContent>
    </Card>
  );
}

function ServiceStyleCaseCard({
  item,
  number,
  groupAnchor,
}: {
  item: VnCase;
  number: number;
  groupAnchor: ServiciosAnchor;
}) {
  const href = `#${item.ctaAnchor ?? groupAnchor}`;
  const linkLabel = item.name;
  return (
    <CaseCardShell
      href={href}
      linkLabel={linkLabel}
      caseId={item.id}
      assetOrigen={item.assetOrigen}
    >
      <CaseMockup
        image={item.image}
        addressBar={item.addressBar ?? "vientonorte.io"}
        variant={item.mockupVariant ?? "browser"}
        gapNote={item.figmaGap?.note}
      />
      <div className="space-y-2">
        <p data-tag="servicio" className={EYEBROW}>
          {String(number).padStart(2, "0")} · {item.tags.servicio}
        </p>
        <div className="flex flex-wrap gap-2">
          <RubroChip label={item.tags.rubro} />
        </div>
        <h4 className={cn(CHILLAX, TITLE, "flex items-center gap-2")}>
          <IsologoAccent />
          {item.name}
        </h4>
      </div>
      {item.origin ? (
        <div data-origin={item.origin.label} className="space-y-2">
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-semibold">
            {item.origin.label}
          </Badge>
          <p data-origin-note className="text-sm font-semibold leading-relaxed text-foreground">
            {item.origin.note}
          </p>
        </div>
      ) : null}
      <p className="text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
      <FindingsList items={item.findings} />
      {item.startingPoint ? (
        <p data-starting-point className="mt-auto border-t border-border/60 pt-4 text-sm leading-relaxed text-foreground">
          <strong className="font-semibold">Punto de partida, no resultado: </strong>
          {item.startingPoint}
        </p>
      ) : null}
      {item.ctaAnchor && item.ctaAnchor !== groupAnchor ? (
        <p className="text-sm font-semibold text-foreground underline underline-offset-4 group-hover:text-primary">
          Ir a {item.ctaAnchor === "revision-gratis" ? "Revisión gratis" : item.ctaAnchor}
        </p>
      ) : null}
    </CaseCardShell>
  );
}

/** Casos de VN en grilla, agrupados por ancla. Enlaces solo a anclas canónicas. */
export function ServiciosCasos() {
  return (
    <section id="casos-vn" aria-labelledby="casos-vn-heading" className={cn(SECTION_CLASS, "bg-background")}>
      <div className="container mx-auto max-w-6xl px-4">
        <h2 id="casos-vn-heading" className={cn(SECTION_TITLE_CLASS, CHILLAX, "flex items-center gap-3")}>
          <IsologoAccent className="size-3" />
          {SERVICIOS_VN_CASES.heading}
        </h2>
        <p className="mt-2 max-w-2xl text-base text-muted-foreground">{SERVICIOS_VN_CASES.intro}</p>
        {SERVICIOS_VN_CASE_GROUPS.map((group, groupIndex) => (
          <div key={group.anchor} data-case-group={group.anchor} className="mt-10">
            <h3 className={cn(CHILLAX, "text-lg font-bold text-foreground sm:text-xl")}>{group.label}</h3>
            <ul className="mt-4 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
              {group.cases.map((item) => (
                <li key={item.id}>
                  <ServiceStyleCaseCard item={item} number={groupIndex + 1} groupAnchor={group.anchor} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
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
          {image.stage ? (
            <p className="mt-1 text-xs font-semibold text-foreground">{image.stage}</p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function ConceptCard({ item }: { item: ConceptCase }) {
  return (
    <Card
      data-concept={item.id}
      data-card-variant="service"
      className={cn(CARD_CLASS, "gap-5 py-0 shadow-sm")}
    >
      <CardContent className="flex flex-1 flex-col gap-5 p-0">
        <CaseMockup
          image={item.image}
          addressBar={item.addressBar}
          variant={item.mockupVariant ?? "browser"}
          pending={!item.image ? item : undefined}
        />
        {item.gallery && item.gallery.length > 0 ? <ConceptGallery images={item.gallery} /> : null}
        <div className="space-y-2">
          <p data-tag="servicio" className={EYEBROW}>
            {item.tags.servicio}
          </p>
          <div className="flex flex-wrap gap-2">
            <RubroChip label={item.tags.rubro} />
          </div>
          <h3 className={cn(CHILLAX, TITLE, "flex items-center gap-2")}>
            <IsologoAccent />
            {item.name}
          </h3>
        </div>
        {item.origin ? (
          <div data-origin={item.origin.label} className="space-y-2">
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-semibold">
              {item.origin.label}
            </Badge>
            <p data-origin-note className="text-sm font-semibold leading-relaxed text-foreground">
              {item.origin.note}
            </p>
          </div>
        ) : null}
        <p className="text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
        <FindingsList items={item.findings} />
      </CardContent>
    </Card>
  );
}

/**
 * «Conceptos»: Claro + Walmart + Transvip (con imagen) en prod; MASCOTAPP solo /qa/ (sin image).
 */
export function ServiciosConceptos() {
  const visible = SERVICIOS_CONCEPTOS_CASES.filter((c) => c.image || placeholdersEnabled());
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
