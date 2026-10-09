import { PendingSlot, SECTION_TITLE_CLASS } from "../components/marketing";
import { placeholdersEnabled } from "../components/marketing/marketing-env";
import { cn } from "../lib/utils";
import { ServicioPieceCard } from "./ServicioPieceCard";
import { SERVICIOS_CONCEPTOS, conceptCases, type ConceptCase } from "./servicios-content";

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

function ConceptCard({ item }: { item: ConceptCase }) {
  if (!item.image) {
    return (
      <article
        data-concept={item.id}
        className="flex h-full flex-col gap-5 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm"
      >
        <PendingSlot variant="thumb" label="Imagen pendiente de exportar" />
      </article>
    );
  }
  return (
    <ServicioPieceCard
      dataAttr="data-concept"
      id={item.id}
      name={item.name}
      rubro={item.tags.rubro}
      servicio={item.tags.servicio}
      summary={item.summary}
      findings={item.findings}
      image={item.image}
      addressBar={item.addressBar}
      fit={item.mockupFit ?? "cover"}
      pixelScale={item.pixelScale}
    />
  );
}

/** Claro, Walmart y Transvip. Sin imagen no entra a la grilla. */
export function ServiciosConceptos({ embedded = false }: { embedded?: boolean }) {
  const visible = conceptCases().filter((item) => item.image || placeholdersEnabled());
  if (visible.length === 0) return null;
  if (embedded) {
    return (
      <div id="conceptos" className="contents">
        {visible.map((item) => (
          <ConceptCard key={item.id} item={item} />
        ))}
      </div>
    );
  }
  return (
    <section id="conceptos" aria-labelledby="conceptos-heading" className={cn(SECTION_CLASS, "bg-background")}>
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
