import { motion, useScroll, useSpring, useTransform } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Gradient color transition based on scroll
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#FF1D25", "#FF6A1E", "#FF931E"]
  );

  return (
    <>
      {/* Main progress bar with gradient */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left z-50"
        style={{
          scaleX,
          background: "linear-gradient(90deg, var(--brand-red) 0%, var(--brand-orange) 100%)",
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
          opacity: 0.6,
        }}
      />

      {/* Animated gradient trail */}
      <motion.div
        className="fixed top-0 left-0 h-1 w-24 z-40"
        style={{
          x: useTransform(scrollYProgress, [0, 1], ["-100%", "100vw"]),
          background: "linear-gradient(90deg, transparent, rgba(255, 147, 30, 0.8), transparent)",
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}
