import { useLanguage } from "../../lib/LanguageContext";
import { ABOUT_VISUAL_TILES } from "../../data/about-visuals";
import { cn } from "../../lib/utils";

/**
 * Bento de evidencia visual — dashboards, mockups, diagramas.
 * Menos copy: la imagen es el mensaje.
 */
export function AboutEvidenceBento() {
  const { language } = useLanguage();
  const es = language === "es";

  return (
    <section
      aria-label={es ? "Evidencia visual de trabajo" : "Visual work evidence"}
      className="mt-8"
    >
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        {es ? "Evidencia · no slides" : "Evidence · not slides"}
      </p>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3" role="list">
        {ABOUT_VISUAL_TILES.map((tile) => (
          <li
            key={tile.id}
            className={cn(
              "group relative min-h-[120px] overflow-hidden rounded-xl border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated sm:min-h-[140px]",
              tile.span
            )}
          >
            <img
              src={tile.src}
              alt={tile.alt[language]}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"
              aria-hidden
            />
            <span className="absolute bottom-2 left-2 right-2 text-[11px] font-medium tracking-wide text-foreground drop-shadow-sm sm:text-xs">
              {tile.label[language]}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
