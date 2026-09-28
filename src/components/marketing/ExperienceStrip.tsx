import { SECTION_TITLE_CLASS } from "./marketing-env";

export interface ExperienceStripProps {
  heading: string;
  /** Nombres en texto. Sin logos de terceros. */
  names: readonly string[];
}

/** Franja de experiencia de Rö. Siempre visible (prod y QA): no es un placeholder. */
export function ExperienceStrip({ heading, names }: ExperienceStripProps) {
  return (
    <section
      id="experiencia"
      aria-labelledby="experiencia-heading"
      className="border-b border-border/40 bg-background py-8 md:py-10"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <h2 id="experiencia-heading" className={SECTION_TITLE_CLASS}>
          {heading}
        </h2>
        <ul className="mt-5 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-4">
          {names.map((name) => (
            <li
              key={name}
              className="flex min-h-16 items-center justify-center rounded-lg border border-border bg-card px-3 text-center text-base font-semibold text-foreground"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
