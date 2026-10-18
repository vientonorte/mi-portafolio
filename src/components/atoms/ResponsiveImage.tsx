import { useEffect, useRef, useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "../../lib/utils";
import { Skeleton } from "../ui/skeleton";

export type ImageFit = "cover" | "contain" | "scale-down";

export interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  fit?: ImageFit;
  aspectRatio?: string;
  sizes?: string;
  priority?: boolean;
  onClick?: () => void;
}

const fitClasses: Record<ImageFit, string> = {
  cover: "object-cover object-center",
  contain: "object-contain object-center",
  "scale-down": "object-scale-down object-center",
};

/**
 * Image with visible 404 state when load fails.
 * Soft failures used to show only a faint SVG — now a clear badge.
 */
export function ResponsiveImage({
  src,
  alt,
  className,
  imgClassName,
  fit = "cover",
  aspectRatio,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
  onClick,
}: ResponsiveImageProps) {
  const [didError, setDidError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  // El HTML de /sobre-mi/ se prerenderiza. opacity-0 en ese HTML deja la foto
  // invisible si el lazy-load o el onLoad no llegan a hidratar. La imagen se pinta
  // sola; el skeleton solo tapa el hueco hasta que hay píxeles.
  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    if (el.complete && el.naturalWidth > 0) {
      setIsLoading(false);
      return;
    }
    const markLoaded = () => setIsLoading(false);
    el.addEventListener("load", markLoaded);
    return () => el.removeEventListener("load", markLoaded);
  }, [src]);

  const ratio = aspectRatio?.split("/").map((part) => Number(part.trim()));
  const widthAttr = ratio && ratio.length === 2 && ratio.every((n) => n > 0) ? ratio[0] : 1;
  const heightAttr = ratio && ratio.length === 2 && ratio.every((n) => n > 0) ? ratio[1] : 1;

  const wrapperStyle = aspectRatio ? { aspectRatio } : undefined;

  if (didError) {
    return (
      <div
        className={cn(
          "relative flex flex-col items-center justify-center gap-2 bg-muted/50 text-muted-foreground border border-dashed border-destructive/30",
          className
        )}
        style={wrapperStyle}
        role="img"
        aria-label={`${alt} — error 404, imagen no disponible`}
        data-error-status="404"
        data-testid="image-error-404"
        title={`404 · ${src}`}
      >
        <span
          className="absolute top-2 right-2 rounded-md bg-destructive text-destructive-foreground text-[10px] font-bold tracking-wide px-1.5 py-0.5 tabular-nums shadow-sm"
          aria-hidden
        >
          404
        </span>
        <ImageOff className="h-8 w-8 opacity-50" aria-hidden />
        <span className="text-xs font-medium text-center px-2 max-w-[90%] line-clamp-2">
          Imagen no encontrada
        </span>
        <span className="text-[10px] font-mono opacity-60 truncate max-w-[90%] px-2">
          HTTP 404
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn("relative w-full overflow-hidden bg-muted/20", className)}
      style={wrapperStyle}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {isLoading && <Skeleton className="pointer-events-none absolute inset-0 z-0 h-full w-full" />}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={widthAttr}
        height={heightAttr}
        sizes={sizes}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        onError={() => {
          setDidError(true);
          setIsLoading(false);
        }}
        onLoad={() => setIsLoading(false)}
        // Inline: gana a cualquier height:auto suelto y le da caja al lazy-load.
        style={{ width: "100%", height: "100%" }}
        className={cn(
          "relative z-[1] h-full w-full",
          fitClasses[fit],
          imgClassName
        )}
      />
    </div>
  );
}
