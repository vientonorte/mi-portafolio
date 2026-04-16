import { motion } from "motion/react";
import { AnimatedCounter } from "../atoms/AnimatedCounter";

interface StatCardProps {
  value: string;
  label: string;
  index?: number;
}

export function StatCard({ value, label, index = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.05,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      className="relative group"
    >
      <motion.div
        className="relative text-center p-6 md:p-8 rounded-2xl border-2 border-border bg-card overflow-hidden"
        whileHover={{ borderColor: "var(--primary)" }}
        transition={{ duration: 0.3 }}
      >
        {/* Gradient background on hover */}
        <motion.div
          className="absolute inset-0 bg-brand-gradient opacity-0 group-hover:opacity-5"
          initial={false}
          transition={{ duration: 0.3 }}
        />

        {/* Animated glow effect */}
        <motion.div
          className="absolute inset-0 bg-brand-gradient opacity-0 blur-xl"
          animate={{
            opacity: [0, 0.1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5,
          }}
        />

        <div className="relative z-10">
          <motion.div
            className="mb-3"
            aria-live="polite"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.1 + 0.2,
              type: "spring",
              stiffness: 200,
            }}
          >
            <motion.span
              className="text-4xl md:text-5xl font-bold inline-block text-brand-gradient"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {value}
            </motion.span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="text-sm md:text-base text-foreground/80 group-hover:text-foreground transition-colors"
          >
            {label}
          </motion.p>
        </div>

        {/* Decorative corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-16 h-16 bg-brand-gradient opacity-0 group-hover:opacity-20 blur-2xl"
          initial={false}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}