import type { MouseEvent, ReactNode } from "react";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { DeviceFrame } from "./DeviceFrame";
import { PendingSlot } from "./PendingSlot";
import type { MarketingImage } from "./ResponsiveImage";

export type ServiceCardThumbnail =
  | { kind: "device"; image: MarketingImage }
  | { kind: "pending"; label: string };

export interface ServiceCardData {
  id: string;
  eyebrow: string;
  title: string;
  forWhom: string;
  includes: string[];
  price: string;
  priceNote: string;
  cta: string;
  /** Destino del botón: "#contacto" en /servicios/, "/servicios/#<id>" desde la home. */
  href?: string;
  /** Valor para data-intent (preselección del formulario). */
  intent?: string;
  thumbnail?: ServiceCardThumbnail;
}

export interface ServiceCardsProps {
  cards: ServiceCardData[];
  /** Clase del botón principal (gradiente de marca). */
  ctaClassName?: string;
  onChoose?: (e: MouseEvent<HTMLAnchorElement>, card: ServiceCardData) => void;
  testId?: string;
}

function Thumbnail({ thumb }: { thumb?: ServiceCardThumbnail }): ReactNode {
  if (!thumb) return null;
  if (thumb.kind === "pending") return <PendingSlot variant="thumb" label={thumb.label} />;
  return (
    <div className="aspect-[16/10] overflow-hidden rounded-lg bg-neutral-900 p-3 sm:p-4">
      <DeviceFrame variant="desktop" size="sm" image={thumb.image} sizes="(min-width: 1024px) 340px, 90vw" />
    </div>
  );
}

export function ServiceCards({ cards, ctaClassName, onChoose, testId = "servicios-cards" }: ServiceCardsProps) {
  return (
    <ol className="mt-8 grid list-none gap-6 p-0 lg:grid-cols-3" data-testid={testId}>
      {cards.map((card, index) => (
        <li key={card.id} id={card.id} data-card={card.id} className="scroll-mt-[calc(var(--header-height)+0.75rem)]">
          <article
            className="flex h-full flex-col gap-5 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm"
            aria-labelledby={`${card.id}-title`}
          >
            <Thumbnail thumb={card.thumbnail} />
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {String(index + 1).padStart(2, "0")} · {card.eyebrow}
              </p>
              <h3 id={`${card.id}-title`} className="text-xl font-bold leading-snug text-foreground">
                {card.title}
              </h3>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Para quién</h4>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{card.forWhom}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Qué incluye</h4>
              <ul className="mt-2 space-y-2">
                {card.includes.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto space-y-4 border-t border-border/60 pt-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Precio</p>
                <p className="text-2xl font-bold tracking-tight text-foreground" data-price>
                  {card.price}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{card.priceNote}</p>
              </div>
              <Button asChild size="lg" className={cn(ctaClassName, "w-full")}>
                <a
                  href={card.href ?? "#contacto"}
                  data-intent={card.intent}
                  aria-describedby={`${card.id}-title`}
                  onClick={onChoose ? (e) => onChoose(e, card) : undefined}
                >
                  {card.cta}
                </a>
              </Button>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
