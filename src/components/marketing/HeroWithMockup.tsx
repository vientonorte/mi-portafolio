import type { ReactNode } from "react";
import { DeviceMockup } from "../molecules/DeviceMockup";
import { assetUrl } from "./marketing-env";
import type { MarketingImage } from "./ResponsiveImage";

export interface HeroWithMockupProps {
  id?: string;
  headingId: string;
  badge?: string;
  eyebrow?: string;
  title: string;
  subtitle: string;
  /** Botones/enlaces (el consumidor decide destinos: #contacto, /servicios/#…). */
  actions?: ReactNode;
  desktopImage: MarketingImage;
  /** Barra del marco. Estándar Figma de Rö: "x-cms · operaciones". */
  addressBar?: string;
  caption?: string;
}

/** Hero con el marco DeviceMockup (Figma VN) y captura X|CMS. */
export function HeroWithMockup({
  id,
  headingId,
  badge,
  eyebrow,
  title,
  subtitle,
  actions,
  desktopImage,
  addressBar = "x-cms · operaciones",
  caption = "X|CMS · demo 5 min",
}: HeroWithMockupProps) {
  return (
    <section
      id={id}
      className="relative overflow-x-clip border-b border-border/40 bg-[#0A0A0A] text-[#E8E5DF]"
      aria-labelledby={headingId}
    >
      <div className="h-1.5 w-full bg-brand-gradient" aria-hidden />
      <div className="container mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 md:py-16 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-5">
          {badge ? (
            <p className="inline-flex min-h-8 items-center rounded-full border border-primary/40 bg-primary/10 px-3 text-xs font-medium text-[#E8E5DF]">
              {badge}
            </p>
          ) : null}
          {eyebrow ? (
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/70">{eyebrow}</p>
          ) : null}
          <h1
            id={headingId}
            className="text-[1.75rem] font-bold leading-tight tracking-tight text-[#E8E5DF] sm:text-4xl lg:text-5xl"
          >
            {title}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-white/75 md:text-lg">{subtitle}</p>
          {actions ? (
            <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-center">{actions}</div>
          ) : null}
        </div>
        <div className="relative min-w-0 overflow-hidden" data-testid="hero-mockup">
          <DeviceMockup
            variant="browser"
            src={assetUrl(desktopImage.png)}
            alt={desktopImage.alt}
            caption={caption}
            addressBar={addressBar}
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
