import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from '../ui/button';
import { ArrowRight, X } from "lucide-react";

interface StickyCtaProps {
  label: string;
  onClick: () => void;
  ariaLabel?: string;
  showAfterScroll?: number;
}

export function StickyCTA({ 
  label, 
  onClick, 
  ariaLabel,
  showAfterScroll = 800 
}: StickyCtaProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      if (isDismissed) return;
      
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show after scrolling past threshold
      // Hide when near bottom (within 200px)
      const isNearBottom = scrollPosition + windowHeight >= documentHeight - 200;
      
      setIsVisible(scrollPosition > showAfterScroll && !isNearBottom);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfterScroll, isDismissed]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
  };

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { y: 100, opacity: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  /* Apple FO ease (align offer-tour / funnel) */
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }
          }
          className="fixed bottom-[var(--back-to-top-offset)] left-1/2 z-40 -translate-x-1/2"
        >
          <div className="funnel-sticky-shell relative">
            {/* Glow effect */}
            {!shouldReduceMotion && (
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150" />
            )}
            
            {/* CTA Card */}
            <div className="relative bg-background/95 backdrop-blur-xl border-2 border-primary/50 rounded-full shadow-2xl flex items-center gap-2 overflow-hidden">
              <Button
                size="lg"
                onClick={onClick}
                className="funnel-cta-primary gap-2 group rounded-full pl-6 pr-6 min-h-[44px]"
                aria-label={ariaLabel || label}
              >
                {label}
                <ArrowRight className="h-4 w-4 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out)] motion-reduce:transition-none group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" />
              </Button>

              {/* Visual separator */}
              <div className="h-8 w-px bg-border/50" />

              {/* Dismiss button */}
              <button
                onClick={handleDismiss}
                className="h-10 w-10 rounded-full hover:bg-destructive/10 transition-colors flex items-center justify-center text-muted-foreground hover:text-destructive group mr-2"
                aria-label="Cerrar"
                title="Cerrar"
              >
                <X className="h-4 w-4 group-hover:rotate-90 transition-transform duration-200" />
              </button>
            </div>

            {/* Pulsing indicator */}
            {!shouldReduceMotion && (
              <motion.div
                className="absolute -inset-2 border-2 border-primary/30 rounded-full"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}