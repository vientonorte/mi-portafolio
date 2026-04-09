import { motion } from "motion/react";

interface SectionDividerProps {
  variant?: "default" | "gradient";
  spacing?: "sm" | "md" | "lg";
}

export function SectionDivider({ variant = "default", spacing = "md" }: SectionDividerProps) {
  const spacingClass = {
    sm: "my-12",
    md: "my-16 md:my-20",
    lg: "my-20 md:my-28",
  }[spacing];

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.8 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${spacingClass}`}
    >
      {variant === "gradient" ? (
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      ) : (
        <div className="h-px bg-border" />
      )}
    </motion.div>
  );
}
