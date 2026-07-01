import type { ReactNode } from "react";
import { SubpageToolbar, type SubpageCrumb } from "../molecules/SubpageToolbar";
import { cn } from "../../lib/utils";

interface PageShellProps {
  crumbs: SubpageCrumb[];
  children: ReactNode;
  trailing?: ReactNode;
  className?: string;
}

export function PageShell({ crumbs, children, trailing, className }: PageShellProps) {
  return (
    <div className={cn("min-h-screen bg-background pb-8", className)}>
      <SubpageToolbar crumbs={crumbs} trailing={trailing} />
      {children}
    </div>
  );
}