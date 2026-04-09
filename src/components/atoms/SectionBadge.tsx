import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface SectionBadgeProps {
  icon?: LucideIcon;
  children: React.ReactNode;
}

export function SectionBadge({ icon: Icon, children }: SectionBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 15
      }}
      whileHover={{ scale: 1.05 }}
      className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-primary/20 bg-card backdrop-blur-sm overflow-hidden group cursor-default"
    >
      {/* Animated gradient background on hover */}
      <motion.div
        className="absolute inset-0 bg-brand-gradient opacity-0 group-hover:opacity-10"
        initial={false}
        transition={{ duration: 0.3 }}
      />

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 5,
        }}
      />

      {Icon && (
        <motion.div
          animate={{
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 3,
          }}
        >
          <Icon className="h-4 w-4 text-primary relative z-10" aria-hidden="true" />
        </motion.div>
      )}
      
      <span className="text-sm font-medium text-primary relative z-10">
        {children}
      </span>
    </motion.div>
  );
}
