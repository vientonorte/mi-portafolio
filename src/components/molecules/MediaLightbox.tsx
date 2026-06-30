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
}

export function MediaLightbox({
  open,
  onOpenChange,
  src,
  alt,
  caption,
  index,
  total,
}: MediaLightboxProps) {
  const counter =
    index !== undefined && total !== undefined
      ? `${index + 1} / ${total}`
      : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[min(96vw,1200px)] border-none bg-background/95 p-3 sm:p-4 backdrop-blur-md">
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
            className="max-h-[78vh] min-h-[200px] w-full"
            imgClassName="max-h-[78vh]"
          />
        </div>

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