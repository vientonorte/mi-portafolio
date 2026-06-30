import React from "react";
import { ResponsiveImage, type ImageFit } from "../atoms/ResponsiveImage";
import { cn } from "../../lib/utils";

function resolveFit(className?: string): ImageFit {
  if (className?.includes("object-contain")) return "contain";
  if (className?.includes("object-scale-down")) return "scale-down";
  return "cover";
}

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { src, alt, className, loading } = props;

  if (!src || !alt) return null;

  const fit = resolveFit(className);
  const isPriority = loading === "eager";

  const layoutClasses = cn(
    className?.includes("h-full") && "h-full",
    className?.includes("w-full") && "w-full"
  );

  const imgClasses = cn(
    className?.match(/object-\S+/)?.[0],
    className?.includes("group-hover:scale") && "group-hover:scale-105 transition-transform duration-500",
    className?.includes("object-top") && "object-top"
  );

  return (
    <ResponsiveImage
      src={src}
      alt={alt}
      fit={fit}
      priority={isPriority}
      className={cn("h-full w-full", layoutClasses)}
      imgClassName={imgClasses}
    />
  );
}