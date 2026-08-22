import type { ReactNode } from "react";
import { motion } from "motion/react";

/** Isolated so default Logo (nav) does not import motion on the critical path. */
export function LogoAnimatedMark({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
