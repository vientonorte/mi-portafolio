import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

/**
 * Skeleton component for loading states
 * 
 * Usage:
 * <Skeleton className="h-12 w-full" />
 * <Skeleton className="h-40 w-40 rounded-full" />
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-muted/50 rounded-md",
        className
      )}
      aria-label="Loading..."
      role="status"
    />
  );
}
