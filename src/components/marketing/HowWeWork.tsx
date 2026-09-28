import { SECTION_TITLE_CLASS } from "./marketing-env";

export interface HowWeWorkStep {
  title: string;
  description: string;
}

export interface HowWeWorkProps {
  id?: string;
  heading: string;
  intro?: string;
  steps: HowWeWorkStep[];
}

export function HowWeWork({ id = "como-trabajamos", heading, intro, steps }: HowWeWorkProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-[calc(var(--header-height)+0.75rem)] border-t border-border/40 bg-background py-12 md:py-16"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <h2 id={`${id}-heading`} className={SECTION_TITLE_CLASS}>
          {heading}
        </h2>
        {intro ? <p className="mt-2 max-w-2xl text-base text-muted-foreground">{intro}</p> : null}
        <ol className="mt-8 grid list-none gap-6 p-0 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <span
                aria-hidden
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-base font-bold text-white"
              >
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold text-foreground">
                <span className="sr-only">Paso {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
