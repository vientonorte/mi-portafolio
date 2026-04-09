import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { Card, CardContent } from "../card";
import { LucideIcon } from "lucide-react";
import { useEffect, useRef } from "react";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  suffix?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  delay?: number;
  description?: string;
}

export function MetricCard({
  icon: Icon,
  label,
  value,
  suffix = "",
  trend,
  trendValue,
  delay = 0,
  description,
}: MetricCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 50,
    damping: 20,
  });

  useEffect(() => {
    if (isInView && typeof value === "number") {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  const displayValue =
    typeof value === "number" ? (
      <motion.span>
        {springValue.get() === 0
          ? 0
          : Math.round(springValue.get())}
      </motion.span>
    ) : (
      value
    );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
    >
      <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <motion.div
              className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Icon className="h-6 w-6 text-primary" />
            </motion.div>

            {trend && trendValue && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: delay + 0.3 }}
                className={`text-sm font-medium ${
                  trend === "up"
                    ? "text-green-600 dark:text-green-400"
                    : trend === "down"
                    ? "text-red-600 dark:text-red-400"
                    : "text-muted-foreground"
                }`}
              >
                {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}{" "}
                {trendValue}
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.2 }}
          >
            <p className="text-sm text-muted-foreground mb-2">{label}</p>
            <p className="text-3xl font-bold mb-1 text-primary">
              {displayValue}
              {suffix && <span className="text-xl ml-1">{suffix}</span>}
            </p>
            {description && (
              <p className="text-xs text-muted-foreground mt-2">
                {description}
              </p>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}