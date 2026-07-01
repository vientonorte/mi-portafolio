import { ChevronRight, Home, LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface BreadcrumbLink {
  href?: string;
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  current?: boolean;
}

interface BreadcrumbsProps {
  links: BreadcrumbLink[];
  className?: string;
}

export function Breadcrumbs({ links, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className ?? "mb-4"}>
      <ol className="flex items-center gap-2 text-sm flex-wrap">
        {links.map((link, index) => {
          const isLast = index === links.length - 1 || link.current;
          const Icon = link.icon;
          
          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              )}
              
              {isLast ? (
                <span className="text-foreground font-medium flex items-center gap-1.5" aria-current="page">
                  {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                  {link.label}
                </span>
              ) : (
                <motion.button
                  onClick={link.onClick}
                  className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded px-1 -mx-1 flex items-center gap-1.5"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                  {link.label}
                </motion.button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}