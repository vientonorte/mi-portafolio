import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface MethodBadgeProps {
  icon: LucideIcon;
  label: string;
  index?: number;
}

export function MethodBadge({ icon: Icon, label, index = 0 }: MethodBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="inline-flex items-center gap-2 px-4 py-2 bg-background border rounded-full text-sm"
    >
      <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
      <span>{label}</span>
    </motion.div>
  );
}
