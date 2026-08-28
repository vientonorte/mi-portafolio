/**
 * Device frames for product mockups (Apple-style marketing).
 * Variants: laptop (MacBook-ish + browser chrome), browser, phone.
 */
import { cn } from "../../lib/utils";

export type DeviceMockupVariant = "laptop" | "browser" | "phone";

type DeviceMockupProps = {
  src: string;
  alt?: string;
  caption?: string;
  /** Default laptop — product dashboards */
  variant?: DeviceMockupVariant;
  className?: string;
  /** Soft ambient glow behind device */
  glow?: boolean;
  addressBar?: string;
  loading?: "eager" | "lazy";
};

export function DeviceMockup({
  src,
  alt = "",
  caption,
  variant = "laptop",
  className,
  glow = true,
  addressBar = "x-cms · local",
  loading = "lazy",
}: DeviceMockupProps) {
  if (variant === "phone") {
    return (
      <figure className={cn("relative mx-auto w-full max-w-[280px]", className)}>
        {glow ? (
          <div
            className="pointer-events-none absolute -inset-10 rounded-full bg-white/[0.04] blur-3xl motion-reduce:hidden"
            aria-hidden
          />
        ) : null}
        <div className="relative mx-auto rounded-[2.2rem] bg-gradient-to-b from-[#3a3a3c] to-[#1c1c1e] p-[10px] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.85)] ring-1 ring-white/15">
          {/* Dynamic Island */}
          <div
            className="absolute left-1/2 top-[14px] z-10 h-[22px] w-[90px] -translate-x-1/2 rounded-full bg-black"
            aria-hidden
          />
          <div className="overflow-hidden rounded-[1.7rem] bg-black">
            <img
              src={src}
              alt={alt}
              className="aspect-[9/19.5] w-full object-cover object-top"
              loading={loading}
              decoding="async"
            />
          </div>
          {/* Home indicator */}
          <div
            className="mx-auto mt-2 h-1 w-28 rounded-full bg-white/25"
            aria-hidden
          />
        </div>
        {caption ? (
          <figcaption className="mt-4 text-center text-[11px] tracking-wide text-white/30">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  const screen = (
    <div className="overflow-hidden rounded-lg bg-[#0a0a0a] ring-1 ring-black/40">
      {/* Browser chrome */}
      <div
        className="flex items-center gap-2 border-b border-white/[0.06] bg-[#1a1a1c] px-3 py-2"
        aria-hidden
      >
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <div className="ml-2 flex min-w-0 flex-1 items-center justify-center">
          <div className="w-full max-w-[220px] truncate rounded-md bg-black/40 px-3 py-1 text-center text-[10px] text-white/35">
            {addressBar}
          </div>
        </div>
      </div>
      <img
        src={src}
        alt={alt}
        className="aspect-[16/10] h-auto w-full max-h-[min(42vh,20rem)] object-contain object-top bg-[#0a0a0a] lg:max-h-[min(52vh,28rem)]"
        loading={loading}
        decoding="async"
      />
    </div>
  );

  if (variant === "browser") {
    return (
      <figure className={cn("relative w-full", className)}>
        {glow ? (
          <div
            className="pointer-events-none absolute -inset-8 rounded-[2rem] bg-white/[0.035] blur-2xl motion-reduce:hidden"
            aria-hidden
          />
        ) : null}
        <div className="relative rounded-xl bg-[#2c2c2e] p-1.5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.75)] ring-1 ring-white/12">
          {screen}
        </div>
        {caption ? (
          <figcaption className="mt-3 text-center text-[11px] tracking-wide text-white/30">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  /* laptop — lid 92% so the 108% chin stays inside the column */
  return (
    <figure className={cn("relative mx-auto w-full max-w-md overflow-x-clip lg:max-w-lg", className)}>
      {glow ? (
        <div
          className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-white/[0.04] blur-2xl motion-reduce:hidden lg:-inset-8"
          aria-hidden
        />
      ) : null}

      {/* Lid / bezel */}
      <div className="relative mx-auto w-[92%]">
        <div className="rounded-[14px] bg-gradient-to-b from-[#3a3a3c] via-[#2c2c2e] to-[#1d1d1f] p-[9px] pb-[11px] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/12">
          {/* Camera */}
          <div className="mb-1.5 flex justify-center" aria-hidden>
            <span className="h-1.5 w-1.5 rounded-full bg-black/80 ring-1 ring-white/10" />
          </div>
          {screen}
        </div>

        {/* Hinge */}
        <div
          className="relative mx-auto h-2 w-[18%] rounded-b-sm bg-gradient-to-b from-[#3a3a3c] to-[#1c1c1e]"
          aria-hidden
        />

        {/* Base / chin */}
        <div
          className="relative mx-auto -mt-px h-3 w-[108%] max-w-none -translate-x-[3.7%] rounded-b-[10px] bg-gradient-to-b from-[#3a3a3c] to-[#1a1a1c] shadow-[0_12px_24px_-8px_rgba(0,0,0,0.6)] ring-1 ring-white/8"
          aria-hidden
        >
          <div className="absolute inset-x-[28%] top-1 h-0.5 rounded-full bg-black/35" />
        </div>
      </div>

      {caption ? (
        <figcaption className="mt-5 text-center text-[11px] tracking-wide text-white/30">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
