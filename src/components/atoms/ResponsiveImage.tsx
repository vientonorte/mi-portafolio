import { useState } from "react";
import { cn } from "../../lib/utils";
import { Skeleton } from "../ui/skeleton";

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

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

  const wrapperStyle = aspectRatio ? { aspectRatio } : undefined;

  if (didError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted/40 text-muted-foreground",
          className
        )}
        style={wrapperStyle}
        role="img"
        aria-label={alt}
      >
        <img src={ERROR_IMG_SRC} alt="" aria-hidden className="h-10 w-10 opacity-40" />
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
      {isLoading && <Skeleton className="absolute inset-0 h-full w-full" />}
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        onError={() => {
          setDidError(true);
          setIsLoading(false);
        }}
        onLoad={() => setIsLoading(false)}
        className={cn(
          "h-full w-full transition-opacity duration-300",
          fitClasses[fit],
          isLoading ? "opacity-0" : "opacity-100",
          imgClassName
        )}
      />
    </div>
  );
}