import { ChevronRight, Home } from "lucide-react";
import { motion } from "motion/react";
import { Button } from '@vientonorte/ui/button';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

interface EnhancedBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function EnhancedBreadcrumbs({ items }: EnhancedBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center flex-wrap gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight 
                  className="h-4 w-4 text-muted-foreground/50" 
                  aria-hidden="true" 
                />
              )}
              
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {isLast || !item.onClick ? (
                  <span 
                    className={`${
                      isLast 
                        ? "text-foreground font-medium" 
                        : "text-muted-foreground"
                    }`}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {index === 0 && <Home className="h-4 w-4 inline mr-1" aria-hidden="true" />}
                    {item.label}
                  </span>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={item.onClick}
                    className="h-auto p-1 hover:text-primary hover:underline text-muted-foreground"
                  >
                    {index === 0 && <Home className="h-4 w-4 inline mr-1" aria-hidden="true" />}
                    {item.label}
                  </Button>
                )}
              </motion.div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
