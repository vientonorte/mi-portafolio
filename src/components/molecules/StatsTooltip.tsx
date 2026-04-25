import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@vientonorte/ui/tooltip';
import { Card, CardContent } from '@vientonorte/ui/card';
import { LucideIcon } from "lucide-react";

interface StatsTooltipProps {
  value: string;
  label: string;
  icon: LucideIcon;
  ariaLabel: string;
  tooltipContent: string;
  tooltipContext?: string;
}

export function StatsTooltip({
  value,
  label,
  icon: Icon,
  ariaLabel,
  tooltipContent,
  tooltipContext,
}: StatsTooltipProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="h-full border-2 hover:border-primary/50 transition-all cursor-help">
            <CardContent className="p-6 text-center">
              <Icon 
                className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" 
                aria-hidden="true"
              />
              <div 
                className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-brand-gradient mb-2"
                aria-label={ariaLabel}
              >
                {value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {label}
              </div>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent 
          side="bottom" 
          className="max-w-xs p-4 bg-background/95 backdrop-blur-lg border-2"
          sideOffset={5}
        >
          <div className="space-y-2">
            <p className="font-medium text-foreground">
              {tooltipContent}
            </p>
            {tooltipContext && (
              <p className="text-xs text-muted-foreground">
                {tooltipContext}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
