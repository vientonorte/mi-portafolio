import { DeviceMockup } from "../components/molecules/DeviceMockup";
import { assetUrl } from "../components/marketing/marketing-env";
import { cn } from "../lib/utils";
import type { MarketingImage } from "../components/marketing";

const CHILLAX = "font-[family-name:var(--font-chillax)]";
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

export function ServicioPieceCard({
  dataAttr,
  id,
  name,
  rubro,
  servicio,
  summary,
  findings,
  image,
  addressBar,
  fit = "cover",
  pixelScale,
  startingPoint,
}: {
  dataAttr: "data-vn-case" | "data-concept";
  id: string;
  name: string;
  rubro: string;
  servicio: string;
  summary: string;
  findings: readonly string[];
  image: MarketingImage;
  addressBar: string;
  fit?: "cover" | "contain";
  pixelScale?: number;
  startingPoint?: string;
}) {
  return (
    <article
      {...{ [dataAttr]: id }}
      className="flex h-full flex-col gap-5 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm"
    >
      <DeviceMockup
        variant="browser"
        src={assetUrl(image.png)}
        alt={image.alt}
        addressBar={addressBar}
        fit={fit}
        imageWidth={image.width}
        imageHeight={image.height}
        pixelScale={pixelScale}
        glow={false}
        loading="lazy"
      />
      <div className="flex flex-1 flex-col">
        <ul className="flex list-none flex-wrap gap-2 p-0" aria-label="Etiquetas">
          <li data-tag="rubro" className={TAG_CLASS}>
            {rubro}
          </li>
          <li data-tag="servicio" className={TAG_CLASS}>
            {servicio}
          </li>
        </ul>
        <h3 className={cn(CHILLAX, "mt-3 flex items-center gap-2 text-xl font-bold leading-snug text-foreground")}>
          <IsologoAccent />
          {name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{summary}</p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-foreground">
          {findings.map((finding) => (
            <li key={finding}>{finding}</li>
          ))}
        </ul>
        {startingPoint ? (
          <p data-starting-point className="mt-4 rounded-md border border-border bg-muted/50 p-3 text-sm text-foreground">
            <strong className="font-semibold">Punto de partida, no resultado: </strong>
            {startingPoint}
          </p>
        ) : null}
      </div>
    </article>
  );
}
