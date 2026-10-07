import { SECTION_TITLE_CLASS } from "../components/marketing";
import { cn } from "../lib/utils";
import { ServicioPieceCard } from "./ServicioPieceCard";
import { SERVICIOS_VN_CASE_GROUPS, SERVICIOS_VN_CASES } from "./servicios-content";

/** Títulos en Chillax (token del design system). */
const CHILLAX = "font-[family-name:var(--font-chillax)]";
const SECTION_CLASS = "scroll-mt-[calc(var(--header-height)+0.75rem)] border-t border-border/40 py-12 md:py-16";

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
                  <ServicioPieceCard
                  dataAttr="data-vn-case"
                  id={item.id}
                  name={item.name}
                  rubro={item.tags.rubro}
                  servicio={item.tags.servicio}
                  summary={item.summary}
                  findings={item.findings}
                  image={item.image}
                  addressBar={item.addressBar}
                  fit={item.mockupFit}
                  startingPoint={item.startingPoint}
                />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
