import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../atoms/Skeleton";

/**
 * Skeleton loader for project cards
 */
export function ProjectCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      <CardContent className="p-0">
        {/* Image skeleton */}
        <Skeleton className="h-48 w-full rounded-t-lg rounded-b-none" />
        
        <div className="p-6 space-y-4">
          {/* Badge skeleton */}
          <Skeleton className="h-6 w-24" />
          
          {/* Title skeleton */}
          <Skeleton className="h-7 w-3/4" />
          
          {/* Description skeletons */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          
          {/* Tags skeleton */}
          <div className="flex gap-2 flex-wrap">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-18" />
          </div>
          
          {/* Button skeleton */}
          <Skeleton className="h-10 w-full mt-4" />
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Skeleton loader for company hub cards
 */
export function CompanyCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      <CardContent className="p-6 space-y-6">
        {/* Logo skeleton */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        
        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="space-y-2">
            <Skeleton className="h-8 w-12" />
            <Skeleton className="h-3 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-8 w-12" />
            <Skeleton className="h-3 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-8 w-12" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
        
        {/* Button */}
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}

/**
 * Grid of skeleton loaders
 */
export function ProjectsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Loading page skeleton
 */
export function PageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-16 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Skeleton className="h-12 w-64 mx-auto" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>
      
      {/* Content */}
      <ProjectsGridSkeleton count={6} />
    </div>
  );
}
