import { LogoMarkSvg } from "../atoms/Logo";
import { SECTION_TITLE_CLASS } from "./marketing-env";

export interface FounderBandProps {
  heading: string;
  name: string;
  role: string;
  lines: readonly string[];
}

/**
 * Quién está detrás. El isologo es el del design system.
 * El hueco de la foto queda vacío: no se genera una foto.
 */
export function FounderBand({ heading, name, role, lines }: FounderBandProps) {
  return (
    <section
      id="quien"
      aria-labelledby="quien-heading"
      className="scroll-mt-[calc(var(--header-height)+0.75rem)] border-t border-border/40 bg-background py-12 md:py-16"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <h2 id="quien-heading" className={SECTION_TITLE_CLASS}>
          {heading}
        </h2>
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
          <LogoMarkSvg size={48} labelled />
          <div className="min-w-0 flex-1">
            <p className="text-xl font-bold text-foreground">{name}</p>
            <p className="mt-1 text-base text-muted-foreground">{role}</p>
            <ul className="mt-3 list-none space-y-1 p-0 text-base text-foreground">
              {lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div
            data-testid="founder-photo-slot"
            data-photo-slot="empty"
            aria-hidden
            className="h-24 w-24 shrink-0 rounded-full border border-dashed border-border bg-muted"
          />
        </div>
      </div>
    </section>
  );
}
