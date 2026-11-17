import { ResponsiveImage } from "../atoms/ResponsiveImage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";

export interface MediaLightboxProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  src: string;
  alt: string;
  caption?: string;
  index?: number;
  total?: number;
  /** WebP srcset del mismo recorte. El src sigue siendo el PNG. */
  webpSrcSet?: string;
  width?: number;
  height?: number;
  onPrev?: () => void;
  onNext?: () => void;
  prevLabel?: string;
  nextLabel?: string;
  onCloseAutoFocus?: (event: Event) => void;
}

export function MediaLightbox({
  open,
  onOpenChange,
  src,
  alt,
  caption,
  index,
  total,
  webpSrcSet,
  width,
  height,
  onPrev,
  onNext,
  prevLabel = "",
  nextLabel = "",
  onCloseAutoFocus,
}: MediaLightboxProps) {
  const counter =
    index !== undefined && total !== undefined
      ? `${index + 1} / ${total}`
      : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[min(96vw,1200px)] border-none bg-background/95 p-3 motion-reduce:animate-none sm:p-4 backdrop-blur-md"
        onCloseAutoFocus={onCloseAutoFocus}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" && onNext) {
            event.preventDefault();
            onNext();
          }
          if (event.key === "ArrowLeft" && onPrev) {
            event.preventDefault();
            onPrev();
          }
        }}
      >
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <DialogDescription className="sr-only">
          {caption ?? alt}
        </DialogDescription>

        <div className="max-h-[78vh] w-full overflow-auto rounded-lg">
          <ResponsiveImage
            src={src}
            alt={alt}
            fit="contain"
            sizes="96vw"
            priority
            width={width}
            height={height}
            webpSrcSet={webpSrcSet}
            className="max-h-[78vh] min-h-[200px] w-full"
            imgClassName="max-h-[78vh]"
          />
        </div>
        {(onPrev || onNext) && (
          <div className="flex justify-between gap-3">
            <button
              type="button"
              className="min-h-11 min-w-11 rounded-md border border-border px-3 text-sm font-semibold disabled:opacity-40"
              onClick={onPrev}
              disabled={!onPrev}
              aria-label={prevLabel}
            >
              {prevLabel}
            </button>
            <button
              type="button"
              className="min-h-11 min-w-11 rounded-md border border-border px-3 text-sm font-semibold disabled:opacity-40"
              onClick={onNext}
              disabled={!onNext}
              aria-label={nextLabel}
            >
              {nextLabel}
            </button>
          </div>
        )}

        {(caption || counter) && (
          <div className="flex items-center justify-between gap-3 px-1 pt-1 text-sm text-muted-foreground">
            <p className="truncate">{caption}</p>
            {counter && <span className="shrink-0 tabular-nums">{counter}</span>}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}