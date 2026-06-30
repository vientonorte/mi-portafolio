import { motion } from "motion/react";
import { ShareButton } from "./ShareButton";

interface SectionDividerProps {
  number: string;
  label: string;
  sectionId?: string;
  language?: "es" | "en";
  showShare?: boolean;
}

export function SectionDivider({ number, label, sectionId, language = "es", showShare = true }: SectionDividerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-6 mb-8"
    >
      {/* Large number */}
      <div className="relative">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="text-8xl md:text-9xl font-black text-primary/10 leading-none select-none"
        >
          {number}
        </motion.div>
        
        {/* Gradient overlay */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-0 left-0 h-2 bg-brand-gradient rounded-full"
        />
      </div>

      {/* Label */}
      <div className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-3">
        <h2 className="min-w-0 break-words text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight">
          {label}
        </h2>
        
        {/* Share Button */}
        {showShare && sectionId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <ShareButton 
              sectionId={sectionId}
              sectionLabel={label}
              language={language}
              variant="outline"
              size="sm"
              showLabel
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}