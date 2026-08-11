import { useLanguage } from "../../lib/LanguageContext";
import { INTERFACE_WALL } from "../../data/interface-wall";
import { cn } from "../../lib/utils";

/**
 * S1 — muro de interfaces (menos copy, más pantallas).
 * Práctica Viento Norte + roles enterprise.
 */
export function InterfaceWall() {
  const { language } = useLanguage();
  const es = language === "es";

  return (
    <section
      id="interfaces"
      aria-labelledby="interface-wall-heading"
      className="scroll-mt-[calc(var(--header-height)+0.75rem)]"
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {es ? "Viento Norte · UX Manager" : "Viento Norte · UX Manager"}
          </p>
          <h3
            id="interface-wall-heading"
            className="mt-1 text-lg font-semibold tracking-tight sm:text-xl"
          >
            {es ? "Interfaces" : "Interfaces"}
          </h3>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            {es
              ? "Pantallas reales: enterprise regional + práctica nacional."
              : "Real screens: regional enterprise + national practice."}
          </p>
        </div>
        <ul className="flex gap-2 text-[11px] font-medium" role="list">
          <li className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-primary">
            {es ? "Transnacional" : "Global"}
          </li>
          <li className="rounded-full border border-border bg-muted/40 px-2.5 py-1 text-muted-foreground">
            {es ? "Nacional" : "National"}
          </li>
        </ul>
      </div>

      <ul
        className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 md:gap-3"
        role="list"
        aria-label={es ? "Muro de interfaces" : "Interface wall"}
      >
        {INTERFACE_WALL.map((tile) => (
          <li
            key={tile.id}
            className={cn(
              "group relative overflow-hidden rounded-xl border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated",
              tile.featured
                ? "col-span-2 min-h-[160px] sm:min-h-[200px] md:min-h-[220px]"
                : "min-h-[120px] sm:min-h-[140px]"
            )}
          >
            <img
              src={tile.src}
              alt={`${tile.brand[language]} — ${tile.label[language]}`}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/95 via-background/35 to-transparent"
              aria-hidden
            />
            <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {tile.brand[language]}
                <span className="mx-1 opacity-40" aria-hidden>
                  ·
                </span>
                <span
                  className={
                    tile.scope === "global" ? "text-primary" : "text-foreground/70"
                  }
                >
                  {tile.scope === "global"
                    ? es
                      ? "Global"
                      : "Global"
                    : es
                      ? "Nacional"
                      : "National"}
                </span>
              </p>
              <p className="text-xs font-semibold text-foreground sm:text-sm">
                {tile.label[language]}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
