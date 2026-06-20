import { motion, useReducedMotion } from "motion/react";
import { Card, CardContent } from "../ui/card";

interface StatCardProps {
  value: string;
  label: string;
  index?: number;
}

export function StatCard({ value, label, index = 0 }: StatCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      className="h-full"
    >
      <Card className="metric-card group hover:border-primary/40 hover:shadow-lg">
        <CardContent className="metric-card-body">
          <div className="metric-card-value text-brand-gradient" aria-live="polite">
            {value}
          </div>
          <p className="metric-card-label text-foreground/80 group-hover:text-foreground transition-colors">
            {label}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}