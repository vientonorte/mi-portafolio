import { cn } from "../../lib/utils";
import { assetUrl } from "./marketing-env";

/** Imagen real con fuente webp + fallback png y dimensiones fijas (sin layout shift). */
export interface MarketingImage {
  /** Ruta relativa a public/, sin base (p. ej. "images/consultoria/x.png"). */
  png: string;
  webp?: string;
  alt: string;
  width: number;
  height: number;
}


export interface ResponsiveImageProps {
  image: MarketingImage;
  /** "eager" solo para el hero (above the fold). */
  loading?: "eager" | "lazy";
  className?: string;
  sizes?: string;
}

export function ResponsiveImage({ image, loading = "lazy", className, sizes }: ResponsiveImageProps) {
  return (
    <picture>
      {image.webp ? <source type="image/webp" srcSet={assetUrl(image.webp)} sizes={sizes} /> : null}
      <img
        src={assetUrl(image.png)}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={loading}
        decoding="async"
        className={cn("block h-auto w-full", className)}
      />
    </picture>
  );
}
