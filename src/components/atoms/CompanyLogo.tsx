import { Building2 } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { cn } from "../../lib/utils";

const SIZES = {
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
  return /karri\/logo|karriLogo/i.test(src);
}

interface CompanyLogoProps {
  src?: string;
  alt: string;
  size?: CompanyLogoSize;
  className?: string;
  wordmark?: boolean;
}

export function CompanyLogo({
  src,
  alt,
  size = "md",
  className,
  wordmark,
}: CompanyLogoProps) {
  const styles = SIZES[size];
  const isWordmark = wordmark ?? (src ? isWordmarkLogo(src) : false);

  if (!src) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-center bg-brand-gradient shadow-lg",
          styles.box,
          className
        )}
      >
        <Building2 className={cn(styles.icon, "text-white")} aria-hidden />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden",
        "bg-card/95 backdrop-blur-sm ring-1 ring-border/50 shadow-lg",
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
          isWordmark && styles.wordmark
        )}
      />
    </div>
  );
}