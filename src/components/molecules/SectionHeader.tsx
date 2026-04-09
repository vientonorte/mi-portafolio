import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";
import { SectionBadge } from "../atoms/SectionBadge";

interface SectionHeaderProps {
  badge?: string;
  badgeIcon?: LucideIcon;
  title: string;
  description: string;
  align?: "left" | "center";
}

export function SectionHeader({ 
  badge, 
  badgeIcon,
  title, 
  description,
  align = "center"
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";
  const containerClass = align === "center" ? "items-center" : "items-start";

  // Split title into words for staggered animation
  const words = title.split(" ");

  return (
    <div className={`flex flex-col ${containerClass} space-y-4 mb-10 md:mb-14 relative`}>
      {/* Decorative background element */}
      <motion.div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-brand-gradient opacity-5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {badge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.5,
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
        >
          <SectionBadge icon={badgeIcon}>
            {badge}
          </SectionBadge>
        </motion.div>
      )}
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 80 }}
        className={`${alignClass} relative`}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 0.1 + index * 0.05,
            }}
            className="inline-block mr-[0.3em]"
          >
            {word}
          </motion.span>
        ))}
      </motion.h2>
      
      {description && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 80 }}
          className={`text-muted-foreground text-base md:text-lg max-w-2xl ${alignClass} relative`}
        >
          <p>{description}</p>
          
          {/* Decorative underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`mt-4 h-1 bg-brand-gradient rounded-full ${
              align === "center" ? "mx-auto" : ""
            } w-20`}
          />
        </motion.div>
      )}
    </div>
  );
}
