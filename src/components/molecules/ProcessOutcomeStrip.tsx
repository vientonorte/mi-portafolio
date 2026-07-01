import { ArrowRight } from "lucide-react";

export interface ProcessOutcomeItem {
  id: string;
  title: string;
  company: string;
  metric: string;
}

interface ProcessOutcomeStripProps {
  items: ProcessOutcomeItem[];
  onItemClick?: (id: string) => void;
  ariaLabel: string;
}

export function ProcessOutcomeStrip({ items, onItemClick, ariaLabel }: ProcessOutcomeStripProps) {
  return (
    <div
      role="list"
      aria-label={ariaLabel}
      className="flex items-center gap-2 overflow-x-auto pb-1 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:justify-center md:overflow-visible"
    >
      {items.map((item, index) => (
        <div key={item.id} role="listitem" className="flex shrink-0 items-center gap-2 snap-start">
          <button
            type="button"
            onClick={() => onItemClick?.(item.id)}
            className="min-w-[7.5rem] rounded-lg border border-primary/25 bg-background/90 px-3 py-2 text-left transition-colors hover:border-primary/50 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:min-w-[8.5rem]"
          >
            <span className="block text-[10px] font-semibold uppercase tracking-wide text-primary leading-tight">
              {item.title}
            </span>
            <span className="block text-lg font-black leading-tight">{item.metric}</span>
            <span className="block text-[10px] text-muted-foreground truncate">{item.company}</span>
          </button>
          {index < items.length - 1 && (
            <ArrowRight
              className="h-4 w-4 shrink-0 text-muted-foreground/70 md:h-5 md:w-5"
              aria-hidden="true"
            />
          )}
        </div>
      ))}
    </div>
  );
}