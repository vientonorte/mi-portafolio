import type { ReactNode } from "react";
import { DeviceMockup } from "../molecules/DeviceMockup";
import { DeviceFrame } from "./DeviceFrame";
import { assetUrl } from "./marketing-env";
import type { MarketingImage } from "./ResponsiveImage";

export interface HeroWithMockupProps {
  id?: string;
  headingId: string;
  badge?: string;
  /**
   * Oferta destacada (p. ej. «Web en 72h · $30.000 · 50/50»). Va primero en el
   * hero para que quede visible sin scroll en mobile (390×844 y 360×740).
   * Misma caja que el badge (min-h-8, 1 línea) para no mover el DeviceMockup
   * aprobado en 5d17bb9 (criterio PO S42; e2e scripts/e2e-home-s42.mjs).
   */
  offer?: string;
  eyebrow?: string;
  title: string;
  subtitle: string;
  /** Botones/enlaces (el consumidor decide destinos: #contacto, /servicios/#…). */
  actions?: ReactNode;
  desktopImage: MarketingImage;
  /** Overlay teléfono (rubros / dual-device). Si falta, se usa DeviceMockup browser. */
  phoneImage?: MarketingImage;
  /** Barra del marco DeviceMockup. Estándar Figma de Rö: "x-cms · operaciones". */
  addressBar?: string;
  /** Leyenda bajo el mockup (p. ej. «Ejemplo · marca ficticia» en rubros). */
  caption?: string;
}

/** Hero oscuro con mockup: DeviceMockup (home) o DeviceFrame dual (rubros). */
export function HeroWithMockup({
  id,
  headingId,
  badge,
  offer,
  eyebrow,
  title,
  subtitle,
  actions,
  desktopImage,
  phoneImage,
  addressBar = "x-cms · operaciones",
  caption = "X|CMS · demo 5 min",
}: HeroWithMockupProps) {
  const dualMockup = (
    <div className="relative pb-8 pr-6 sm:pr-10" data-testid="hero-mockup">
      <DeviceFrame
        variant="desktop"
        image={desktopImage}
        loading="eager"
        sizes="(min-width: 1024px) 560px, 92vw"
      />
      {phoneImage ? (
        <DeviceFrame
          variant="phone"
          image={phoneImage}
          loading="eager"
          sizes="(min-width: 1024px) 150px, 30vw"
          className="absolute bottom-0 right-0 w-[28%] max-w-[160px]"
        />
      ) : null}
    </div>
  );

  const browserMockup = (
    <div className="relative min-w-0 overflow-hidden" data-testid="hero-mockup">
      <DeviceMockup
        variant="browser"
        src={assetUrl(desktopImage.png)}
        alt={desktopImage.alt}
        caption={caption}
        addressBar={addressBar}
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );

  const mockupNode = phoneImage ? (
    caption ? (
      <figure className="m-0 min-w-0">
        {dualMockup}
        <figcaption
          className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-white/80"
          data-mockup-caption
        >
          {caption}
        </figcaption>
      </figure>
    ) : (
      dualMockup
    )
  ) : (
    browserMockup
  );

  return (
    <section
      id={id}
      className="relative overflow-x-clip border-b border-border/40 bg-[#0A0A0A] text-[#E8E5DF]"
      aria-labelledby={headingId}
    >
      <div className="h-1.5 w-full bg-brand-gradient" aria-hidden />
      <div className="container mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 md:py-16 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-5">
          {offer ? (
            <p
              className="inline-flex min-h-8 items-center rounded-full border border-primary/50 bg-primary/15 px-3 text-sm font-semibold leading-5 text-[#E8E5DF]"
              data-hero-offer
            >
              {offer}
            </p>
          ) : null}
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
        {mockupNode}
      </div>
    </section>
  );
}
