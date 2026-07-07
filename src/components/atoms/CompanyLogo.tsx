import { Building2 } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { cn } from "../../lib/utils";
import { resolveCompanyBrand, type CompanyBrand } from "../../lib/company-logos";

function resolveBrandFromSrc(src: string): CompanyBrand | null {
  const path = src.split("?")[0] ?? src;
  if (/sura\/logo/i.test(path)) return "sura";
  if (/transvip\/logo/i.test(path)) return "transvip";
  if (/karri\/logo/i.test(path)) return "karri";
  return null;
}

const SIZES = {
  /** Wordmarks horizontales en cards compactas (hero, métricas). */
  "wordmark-sm": {
    box: "h-9 w-[6.75rem] rounded-lg",
    pad: "px-2.5 py-1",
    icon: "h-4 w-4",
    wordmark: "scale-[1.06]",
  },
  sm: {
    box: "h-9 w-9 rounded-lg",
    pad: "p-1",
    icon: "h-4 w-4",
    wordmark: "scale-[1.28]",
  },
  md: {
    box: "h-16 w-16 rounded-xl",
    pad: "p-2",
    icon: "h-8 w-8",
    wordmark: "scale-[1.32]",
  },
  lg: {
    box: "h-16 w-16 sm:h-20 sm:w-20 rounded-2xl",
    pad: "p-2.5",
    icon: "h-10 w-10",
    wordmark: "scale-[1.32]",
  },
} as const;

export type CompanyLogoSize = keyof typeof SIZES;

/** Logos horizontales (p. ej. Karri) necesitan más escala para igualar el peso visual de Transvip. */
export function isWordmarkLogo(src: string): boolean {
  const path = src.split("?")[0] ?? src;
  return /karri\/logo|karriLogo|sura\/logo|transvip\/logo/i.test(path);
}

interface CompanyLogoProps {
  src?: string;
  alt: string;
  size?: CompanyLogoSize;
  className?: string;
  wordmark?: boolean;
  /** Sin relleno matte — para cards que ya usan surface-matte-elevated. */
  flat?: boolean;
}

export function CompanyLogo({
  src,
  alt,
  size = "md",
  className,
  wordmark,
  flat = false,
}: CompanyLogoProps) {
  const styles = SIZES[size];
  const isWordmark =
    wordmark ?? (size === "wordmark-sm" || (src ? isWordmarkLogo(src) : false));
  const brand = src ? (resolveCompanyBrand(alt) ?? resolveBrandFromSrc(src)) : null;
  const brandClass =
    brand === "sura"
      ? "company-logo--sura"
      : brand === "transvip"
        ? "company-logo--transvip"
        : brand === "karri"
          ? "company-logo--karri"
          : undefined;

  if (!src) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-center border border-[color:var(--logo-surface-border)] bg-logo-surface",
          styles.box,
          className
        )}
      >
        <Building2 className={cn(styles.icon, "text-primary")} aria-hidden />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden shadow-none",
        flat
          ? "border border-[color:var(--logo-surface-border)] bg-transparent"
          : "bg-logo-surface",
        styles.box,
        styles.pad,
        className
      )}
    >
      <ImageWithFallback
        src={src}
        alt={alt}
        className={cn(
          "h-full w-full object-contain object-center",
          isWordmark && styles.wordmark,
          brandClass
        )}
      />
    </div>
  );
}