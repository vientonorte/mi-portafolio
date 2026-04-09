import { motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "../../../lib/utils";

export interface TimelineItem {
  title: string;
  description: string;
  date?: string;
  status?: "completed" | "in-progress" | "upcoming";
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("relative space-y-8", className)}>
      {items.map((item, index) => {
        const isCompleted = item.status === "completed";
        const isInProgress = item.status === "in-progress";
        const isLast = index === items.length - 1;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative flex gap-4"
          >
            {/* Timeline Line */}
            {!isLast && (
              <div className="absolute left-[19px] top-[40px] h-full w-[2px]">
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className={cn(
                    "w-full origin-top",
                    isCompleted ? "bg-primary" : "bg-border"
                  )}
                />
              </div>
            )}

            {/* Status Icon */}
            <div className="relative flex-shrink-0">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: index * 0.1 + 0.2,
                }}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                  isCompleted &&
                    "border-primary bg-primary text-primary-foreground",
                  isInProgress &&
                    "border-primary bg-background animate-pulse",
                  !isCompleted &&
                    !isInProgress &&
                    "border-border bg-background"
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <div className="h-2 w-2 rounded-full bg-current" />
                )}
              </motion.div>
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
              {item.date && (
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="mb-1 text-sm text-muted-foreground"
                >
                  {item.date}
                </motion.p>
              )}
              <motion.h4
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.35 }}
                className="mb-2 font-semibold"
              >
                {item.title}
              </motion.h4>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.4 }}
                className="text-sm text-muted-foreground leading-relaxed"
              >
                {item.description}
              </motion.p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
