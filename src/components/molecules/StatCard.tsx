import { motion, useReducedMotion } from "motion/react";

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
      className="relative group"
    >
      <div className="relative text-center p-6 md:p-8 rounded-2xl border-2 border-border bg-card overflow-hidden transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg">
        {/* Gradient background on hover */}
        <div className="absolute inset-0 bg-brand-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

        <div className="relative z-10">
          <div className="mb-3" aria-live="polite">
            <span className="text-4xl md:text-5xl font-bold inline-block text-brand-gradient">
              {value}
            </span>
          </div>

          <p className="text-sm md:text-base text-foreground/80 group-hover:text-foreground transition-colors">
            {label}
          </p>
        </div>
      </div>
    </motion.div>
  );
}