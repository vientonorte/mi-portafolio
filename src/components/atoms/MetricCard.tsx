import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  value: string;
  label: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  color?: string;
  index?: number;
}

export function MetricCard({ 
  value, 
  label, 
  icon: Icon, 
  trend = "neutral",
  color = "text-primary",
  index = 0 
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className="flex flex-col items-center text-center p-6 rounded-xl bg-muted/30 dark:bg-muted/20 border hover:bg-muted/50 dark:hover:bg-muted/30 transition-all duration-300"
    >
      {Icon && (
        <div className={`h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 ${color}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      )}
      <div className={`text-3xl md:text-4xl ${color} mb-2`}>
        {value}
      </div>
      <div className="text-sm text-muted-foreground">
        {label}
      </div>
    </motion.div>
  );
}