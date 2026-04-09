import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { LucideIcon } from "lucide-react";

interface ProcessPhaseCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  accentColor?: string;
  onClick?: () => void;
}

export function ProcessPhaseCard({
  icon: Icon,
  title,
  description,
  index,
  accentColor = "primary",
  onClick,
}: ProcessPhaseCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        type: "spring",
        stiffness: 80,
      }}
      whileHover={{ y: -8 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <Card className="h-full border-2 hover:border-primary/30 transition-all duration-300 hover:shadow-xl relative overflow-hidden">
        {/* Gradient accent on hover */}
        <motion.div
          className="absolute inset-0 bg-brand-gradient opacity-0 group-hover:opacity-5"
          initial={false}
          transition={{ duration: 0.3 }}
        />

        {/* Number badge */}
        <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <span className="text-6xl font-black">{String(index + 1).padStart(2, '0')}</span>
        </div>

        <CardContent className="p-6 relative">
          {/* Icon */}
          <motion.div
            className="mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Icon className="h-7 w-7 text-primary" />
            </div>
          </motion.div>

          {/* Content */}
          <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed text-sm mb-4">
            {description}
          </p>

          {/* Click indicator */}
          {onClick && (
            <div className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity font-medium">
              Click para ver más →
            </div>
          )}

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-brand-gradient"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
          />
        </CardContent>
      </Card>
    </motion.article>
  );
}