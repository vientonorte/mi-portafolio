import { cn } from "../../lib/utils";
import { ResponsiveImage, type MarketingImage } from "./ResponsiveImage";

export interface DeviceFrameProps {
  variant: "desktop" | "phone";
  image: MarketingImage;
  loading?: "eager" | "lazy";
  /** "sm" para miniaturas dentro de tarjetas. */
  size?: "md" | "sm";
  className?: string;
  sizes?: string;
}

/**
 * Marco de dispositivo en CSS puro (sin dependencias). El marco es decorativo
 * (aria-hidden); la captura conserva su alt.
 */
export function DeviceFrame({ variant, image, loading = "lazy", size = "md", className, sizes }: DeviceFrameProps) {
  if (variant === "phone") {
    return (
      <div
        className={cn(
          "relative rounded-[1.75rem] border-[6px] border-neutral-800 bg-neutral-800 shadow-2xl",
          className
        )}
        data-device="phone"
      >
        <span
          aria-hidden
          className="absolute left-1/2 top-1 z-10 h-1.5 w-10 -translate-x-1/2 rounded-full bg-neutral-700"
        />
        <div className="overflow-hidden rounded-[1.3rem] bg-white">
          <ResponsiveImage image={image} loading={loading} sizes={sizes} />
        </div>
      </div>
    );
  }
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 shadow-2xl",
        className
      )}
      data-device="desktop"
    >
      <div
        aria-hidden
        className={cn("flex items-center gap-1.5 bg-neutral-800 px-3", size === "sm" ? "h-5" : "h-7")}
      >
        <span className="h-2 w-2 rounded-full bg-[#E8401C]" />
        <span className="h-2 w-2 rounded-full bg-neutral-500" />
        <span className="h-2 w-2 rounded-full bg-[#1A8FDC]" />
        {size === "md" ? <span className="ml-3 h-3 flex-1 rounded bg-neutral-700" /> : null}
      </div>
      <div className="bg-white">
        <ResponsiveImage image={image} loading={loading} sizes={sizes} />
      </div>
    </div>
  );
}
