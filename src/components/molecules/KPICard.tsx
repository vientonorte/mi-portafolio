import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
  index: number;
}

export function KPICard({ label, value, description, icon: Icon, index }: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative"
    >
      {/* Card Background with Gradient Border Effect */}
      <div className="relative h-full min-h-[240px] bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-2xl border-2 border-border/50 overflow-hidden transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-2xl">
        
        {/* Gradient Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-gradient"></div>

        {/* Animated Gradient Background on Hover */}
        <motion.div
          className="absolute inset-0 bg-brand-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-500"
          initial={false}
        />

        {/* Content Container */}
        <div className="relative z-10 p-6 flex flex-col h-full">
          
          {/* Icon with Gradient Background */}
          <motion.div
            className="mb-6"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="h-16 w-16 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow">
              <Icon className="h-8 w-8 text-white" strokeWidth={2.5} />
            </div>
          </motion.div>

          {/* Value with Large Display */}
          <motion.div 
            className="mb-3"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
          >
            <div className="relative inline-block">
              {/* Gradient Bar Below Value */}
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-brand-gradient rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.4 }}
              />
              
              <span className="text-5xl md:text-6xl font-bold text-brand-gradient leading-none">
                {value}
              </span>
            </div>
          </motion.div>

          {/* Label */}
          <motion.h4 
            className="text-base mb-3 text-foreground/90 group-hover:text-foreground transition-colors mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            {label}
          </motion.h4>

          {/* Description */}
          <motion.p 
            className="text-sm text-muted-foreground leading-relaxed mt-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            {description}
          </motion.p>

          {/* Decorative Corner Accent */}
          <motion.div
            className="absolute top-0 right-0 w-24 h-24 bg-brand-gradient opacity-0 group-hover:opacity-10 blur-3xl rounded-full transition-opacity duration-500"
            initial={false}
          />
        </div>

        {/* Bottom Gradient Bar (appears on hover) */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1.5 bg-brand-gradient opacity-0 group-hover:opacity-100"
          initial={false}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Glow Effect on Hover */}
      <motion.div
        className="absolute -inset-1 bg-brand-gradient rounded-2xl blur-xl opacity-0 group-hover:opacity-20 -z-10 transition-opacity duration-500"
        initial={false}
      />
    </motion.div>
  );
}