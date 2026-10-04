import { Check } from "lucide-react";
import { PendingSlot, ResponsiveImage, SECTION_TITLE_CLASS } from "../components/marketing";
import { assetUrl, placeholdersEnabled } from "../components/marketing/marketing-env";
import { DeviceMockup } from "../components/molecules/DeviceMockup";
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
const TAG_CLASS = "rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold text-foreground";

/**
 * Secciones 02 (#revision-gratis) y 03 (#consultoria-ux): formato exacto de la tarjeta 01 de «Tres formas de partir»
 * (ServiceCards): article p-6 gap-5, DeviceMockup browser 16:10 `fit="cover"` sin glow, eyebrow mono «NN · servicio»,
 * línea con borde primario, título text-xl bold leading-snug y lista con Check.
 */
const SERVICE_STYLE_ANCHORS: readonly ServiciosAnchor[] = ["revision-gratis", "consultoria-ux"];

/** Clases de la tarjeta 01 (ServiceCards). Cambiar aquí y allá a la vez. */
const CARD01_ARTICLE = "flex h-full flex-col gap-5 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm";
const CARD01_EYEBROW = "font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground";
const CARD01_AUDIENCE = "border-l-2 border-primary pl-2 text-sm font-semibold leading-snug text-foreground";
const CARD01_TITLE = "text-xl font-bold leading-snug text-foreground";

/** Acento del isologo: el núcleo del punto en var(--primary). Decorativo. */
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

/** Marco de navegador de la tarjeta 01, con la captura real. */
function BrowserFrame({ png, alt, addressBar }: { png: string; alt: string; addressBar: string }) {
  return (
    <div data-device-frame>
      <DeviceMockup
        variant="browser"
        src={assetUrl(png)}
        alt={alt}
        addressBar={addressBar}
        fit="cover"
        glow={false}
        loading="lazy"
      />
    </div>
  );
}

/**
 * Mismo marco de navegador, con el asset de Figma que falta. Solo en el build QA (PendingSlot devuelve null en
 * producción). El texto dice qué archivo, nodo y formato hay que exportar.
 */
function BrowserFramePending({ item }: { item: ConceptCase }) {
  const { fileName, fileKey, nodeId, ratio } = item.pendingAsset;
  return (
    <div data-device-frame data-pending-asset={`${fileKey}:${nodeId}`}>
      <DeviceMockup
        variant="browser"
        src=""
        addressBar={item.addressBar}
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

function ServiceStyleCaseCard({ item, number }: { item: VnCase; number: number }) {
  return (
    <article data-vn-case={item.id} data-card-variant="service" className={CARD01_ARTICLE}>
      <BrowserFrame png={item.image.png} alt={item.image.alt} addressBar={item.addressBar ?? "vientonorte.io"} />
      <div className="space-y-2">
        <p data-tag="servicio" className={CARD01_EYEBROW}>
          {String(number).padStart(2, "0")} · {item.tags.servicio}
        </p>
        <p data-tag="rubro" className={CARD01_AUDIENCE}>
          {item.tags.rubro}
        </p>
        <h4 className={cn(CHILLAX, CARD01_TITLE, "flex items-center gap-2")}>
          <IsologoAccent />
          {item.name}
        </h4>
      </div>
      {item.origin ? (
        <div data-origin={item.origin.label} className="space-y-2">
          <p className="inline-flex rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold text-foreground">
            {item.origin.label}
          </p>
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
    </article>
  );
}

function VnCaseCard({ item }: { item: VnCase }) {
  return (
    <article
      data-vn-case={item.id}
      className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm"
    >
      <div className="aspect-[16/9] overflow-hidden border-b border-border bg-muted">
        <ResponsiveImage image={item.image} className="h-full w-full object-cover object-center" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <ul className="flex list-none flex-wrap gap-2 p-0" aria-label="Etiquetas">
          <li data-tag="rubro" className={TAG_CLASS}>
            {item.tags.rubro}
          </li>
          <li data-tag="servicio" className={TAG_CLASS}>
            {item.tags.servicio}
          </li>
        </ul>
        <h4 className={cn(CHILLAX, "mt-3 flex items-center gap-2 text-xl font-bold text-foreground")}>
          <IsologoAccent />
          {item.name}
        </h4>
        <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-foreground">
          {item.findings.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        {item.startingPoint ? (
          <p data-starting-point className="mt-4 rounded-md border border-border bg-muted/50 p-3 text-sm text-foreground">
            <strong className="font-semibold">Punto de partida, no resultado: </strong>
            {item.startingPoint}
          </p>
        ) : null}
      </div>
    </article>
  );
}

/** Casos de VN en grilla, agrupados por ancla de servicio. Enlaces solo a las anclas canónicas de /servicios/. */
export function ServiciosCasos() {
  return (
    <section id="casos-vn" aria-labelledby="casos-vn-heading" className={cn(SECTION_CLASS, "bg-background")}>
      <div className="container mx-auto max-w-6xl px-4">
        <h2 id="casos-vn-heading" className={cn(SECTION_TITLE_CLASS, CHILLAX, "flex items-center gap-3")}>
          <IsologoAccent className="size-3" />
          {SERVICIOS_VN_CASES.heading}
        </h2>
        <p className="mt-2 max-w-2xl text-base text-muted-foreground">{SERVICIOS_VN_CASES.intro}</p>
        {SERVICIOS_VN_CASE_GROUPS.map((group, groupIndex) => {
          const serviceStyle = SERVICE_STYLE_ANCHORS.includes(group.anchor);
          return (
            <div key={group.anchor} data-case-group={group.anchor} className="mt-10">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className={cn(CHILLAX, "text-lg font-bold text-foreground sm:text-xl")}>{group.label}</h3>
                <a
                  href={`#${group.anchor}`}
                  className="inline-flex min-h-11 items-center text-sm font-semibold text-foreground underline underline-offset-4 hover:text-primary"
                >
                  {group.linkLabel}
                </a>
              </div>
              <ul className={cn("mt-4 grid list-none gap-6 p-0 md:grid-cols-2", serviceStyle && "lg:grid-cols-3")}>
                {group.cases.map((item) => (
                  <li key={item.id}>
                    {serviceStyle ? (
                      // Número 02/03 = posición del grupo (groupIndex + 1): sigue el orden de «Tres formas de partir».
                      <ServiceStyleCaseCard item={item} number={groupIndex + 1} />
                    ) : (
                      <VnCaseCard item={item} />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ConceptCard({ item }: { item: ConceptCase }) {
  return (
    <article data-concept={item.id} data-card-variant="service" className={CARD01_ARTICLE}>
      {item.image ? (
        <BrowserFrame png={item.image.png} alt={item.image.alt} addressBar={item.addressBar} />
      ) : (
        <BrowserFramePending item={item} />
      )}
      <div className="space-y-2">
        <p data-tag="servicio" className={CARD01_EYEBROW}>
          {item.tags.servicio}
        </p>
        <p data-tag="rubro" className={CARD01_AUDIENCE}>
          {item.tags.rubro}
        </p>
        <h3 className={cn(CHILLAX, CARD01_TITLE, "flex items-center gap-2")}>
          <IsologoAccent />
          {item.name}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
      <FindingsList items={item.findings} />
    </article>
  );
}

/**
 * «Conceptos»: exploración propia, sin cliente. Una pieza sin captura real solo se muestra en QA (placeholder);
 * en producción la sección no se renderiza mientras ninguna pieza tenga imagen.
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
