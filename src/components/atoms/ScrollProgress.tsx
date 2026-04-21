import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";

export function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (prefersReducedMotion) return null;

  return (
    <>
      {/* Main progress bar with gradient */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left z-50"
        style={{
          scaleX,
          background: "linear-gradient(90deg, var(--brand-red) 0%, var(--brand-orange) 100%)",
          willChange: "transform",
        }}
        role="progressbar"
        aria-label="Progreso de lectura de la página"
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Glow effect */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left z-40 blur-sm"
        style={{
          scaleX,
          background: "linear-gradient(90deg, var(--brand-red) 0%, var(--brand-orange) 100%)",
          opacity: 0.5,
          willChange: "transform",
        }}
      />
    </>
  );
}
