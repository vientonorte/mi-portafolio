import { PendingSlot } from "./PendingSlot";
import { placeholdersEnabled } from "./marketing-env";
import { ResponsiveImage, type MarketingImage } from "./ResponsiveImage";

export interface LogoStripProps {
  heading: string;
  /** Logos autorizados (vacío hasta que Rö autorice cada uno). */
  logos?: MarketingImage[];
  /** Slots grises de QA mientras no hay logos autorizados. */
  pendingSlots?: number;
  pendingLabel?: string;
}

/** Franja de logos de clientes. Sin logos reales y fuera de QA → no se renderiza. */
export function LogoStrip({
  heading,
  logos = [],
  pendingSlots = 0,
  pendingLabel = "Logo pendiente de autorización",
}: LogoStripProps) {
  const pending = placeholdersEnabled() ? pendingSlots : 0;
  if (logos.length === 0 && pending === 0) return null;
  return (
    <section aria-labelledby="logo-strip-heading" className="border-b border-border/40 bg-background py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <h2
          id="logo-strip-heading"
          className="text-center font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground"
        >
          {heading}
        </h2>
        <ul className="mt-5 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 lg:grid-cols-5">
          {logos.map((logo) => (
            <li key={logo.png} className="flex min-h-16 items-center justify-center">
              <ResponsiveImage image={logo} className="max-h-10 w-auto" />
            </li>
          ))}
          {Array.from({ length: pending }, (_, i) => (
            <li key={`pending-${i}`}>
              <PendingSlot variant="logo" label={pendingLabel} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
