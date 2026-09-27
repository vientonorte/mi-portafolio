import { PendingSlot } from "./PendingSlot";
import { placeholdersEnabled } from "./marketing-env";

export interface CaseCard {
  id: string;
  client: string;
  problem: string;
  whatWeDid: string;
  result: string;
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
  ["Resultado medible", "result"],
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
        <h2 id={`${id}-heading`} className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {heading}
        </h2>
        {intro ? <p className="mt-2 max-w-2xl text-base text-muted-foreground">{intro}</p> : null}
        <ul className="mt-8 grid list-none gap-6 p-0 md:grid-cols-3">
          {cases.map((c) => (
            <li key={c.id}>
              <article className="h-full rounded-xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-bold text-foreground">{c.client}</h3>
                <dl className="mt-3 space-y-3 text-sm">
                  {FIELDS.map(([label, key]) => (
                    <div key={key}>
                      <dt className="font-semibold text-foreground">{label}</dt>
                      <dd className="mt-0.5 text-muted-foreground">{c[key]}</dd>
                    </div>
                  ))}
                </dl>
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
