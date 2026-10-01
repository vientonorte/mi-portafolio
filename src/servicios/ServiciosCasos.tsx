import { ResponsiveImage, SECTION_TITLE_CLASS } from "../components/marketing";
import { cn } from "../lib/utils";
import {
  SERVICIOS_VN_CASE_GROUPS,
  SERVICIOS_VN_CASES,
  type VnCase,
} from "./servicios-content";

/** Títulos en Chillax (token del design system). */
const CHILLAX = "font-[family-name:var(--font-chillax)]";
const SECTION_CLASS = "scroll-mt-[calc(var(--header-height)+0.75rem)] border-t border-border/40 py-12 md:py-16";
const TAG_CLASS = "rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold text-foreground";

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

/** Casos de VN en grilla, agrupados por ancla de servicio. Enlaces solo a #web-pymes y #consultoria-ux. */
export function ServiciosCasos() {
  return (
    <section id="casos-vn" aria-labelledby="casos-vn-heading" className={cn(SECTION_CLASS, "bg-background")}>
      <div className="container mx-auto max-w-6xl px-4">
        <h2 id="casos-vn-heading" className={cn(SECTION_TITLE_CLASS, CHILLAX, "flex items-center gap-3")}>
          <IsologoAccent className="size-3" />
          {SERVICIOS_VN_CASES.heading}
        </h2>
        <p className="mt-2 max-w-2xl text-base text-muted-foreground">{SERVICIOS_VN_CASES.intro}</p>
        {SERVICIOS_VN_CASE_GROUPS.map((group) => (
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
            <ul className="mt-4 grid list-none gap-6 p-0 md:grid-cols-2">
              {group.cases.map((item) => (
                <li key={item.id}>
                  <VnCaseCard item={item} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
