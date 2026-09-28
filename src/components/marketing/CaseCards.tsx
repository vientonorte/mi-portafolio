import { PendingSlot } from "./PendingSlot";
import { placeholdersEnabled, SECTION_TITLE_CLASS } from "./marketing-env";
import { ResponsiveImage, type MarketingImage } from "./ResponsiveImage";

export interface CaseCard {
  id: string;
  client: string;
  kicker?: string;
  problem: string;
  whatWeDid: string;
  /** Solo si la cifra ya estaba publicada. Vacío = no se muestra. */
  result?: string;
  images?: MarketingImage[];
  cta?: { label: string; href: string };
}

export interface CaseCardsProps {
  id?: string;
  heading: string;
  intro?: string;
  /** Casos confirmados por Rö. */
  cases?: CaseCard[];
  /** Tarjetas placeholder (solo QA) mientras no hay casos confirmados. */
  pendingCount?: number;
  pendingLabel?: string;
}

const FIELDS = [
  ["Problema", "problem"],
  ["Qué hicimos", "whatWeDid"],
] as const;

/** Casos con resultado concreto. Sin casos confirmados y fuera de QA → no se renderiza. */
export function CaseCards({
  id = "casos",
  heading,
  intro,
  cases = [],
  pendingCount = 0,
  pendingLabel = "Caso pendiente de confirmar",
}: CaseCardsProps) {
  const pending = placeholdersEnabled() ? pendingCount : 0;
  if (cases.length === 0 && pending === 0) return null;
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-[calc(var(--header-height)+0.75rem)] border-t border-border/40 bg-muted/30 py-12 md:py-16"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <h2 id={`${id}-heading`} className={SECTION_TITLE_CLASS}>
          {heading}
        </h2>
        {intro ? <p className="mt-2 max-w-2xl text-base text-muted-foreground">{intro}</p> : null}
        <ul className="mt-8 grid list-none gap-6 p-0 md:grid-cols-2">
          {cases.map((c) => (
            <li key={c.id}>
              <article className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
                {c.kicker ? (
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">{c.kicker}</p>
                ) : null}
                <h3 className="mt-2 text-xl font-bold text-foreground">{c.client}</h3>
                {c.images && c.images.length > 0 ? (
                  <ol className="mt-4 flex list-none gap-2 overflow-x-auto p-0">
                    {c.images.map((image, index) => (
                      <li key={image.png} className="w-28 shrink-0">
                        <div className="overflow-hidden rounded-md border border-border bg-muted">
                          <ResponsiveImage image={image} className="h-20 w-full object-cover" />
                        </div>
                        <p className="mt-1 text-xs font-semibold text-foreground">
                          <span className="text-muted-foreground">{index + 1}. </span>
                          {image.stage ?? image.alt}
                        </p>
                      </li>
                    ))}
                  </ol>
                ) : null}
                <p className="mt-3 text-sm text-muted-foreground">{c.whatWeDid}</p>
                {c.result ? (
                  <ul className="mt-3 flex list-none flex-wrap gap-2 p-0">
                    {c.result
                      .split(",")
                      .map((part) => part.trim().replace(/\.$/, ""))
                      .filter(Boolean)
                      .map((part) => (
                        <li
                          key={part}
                          className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold text-foreground"
                        >
                          {part}
                        </li>
                      ))}
                  </ul>
                ) : null}
                {c.cta ? (
                  <p className="mt-auto pt-4">
                    <a
                      href={c.cta.href}
                      data-case-cta={c.id}
                      className="inline-flex min-h-11 items-center font-semibold text-foreground underline underline-offset-4 hover:text-primary"
                    >
                      {c.cta.label}
                    </a>
                  </p>
                ) : null}
              </article>
            </li>
          ))}
          {Array.from({ length: pending }, (_, i) => (
            <li key={`pending-${i}`}>
              <PendingSlot variant="case" label={pendingLabel}>
                <dl className="space-y-3">
                  {FIELDS.map(([label]) => (
                    <div key={label}>
                      <dt className="font-semibold">{label}</dt>
                      <dd className="mt-0.5">—</dd>
                    </div>
                  ))}
                </dl>
              </PendingSlot>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
