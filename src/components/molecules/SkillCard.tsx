import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { LucideIcon } from "lucide-react";

interface SkillCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export function SkillCard({ icon: Icon, title, description, index }: SkillCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className="border-2 hover:border-primary transition-all duration-300 h-full hover:shadow-lg focus-within:border-primary"
        tabIndex={0}
        role="article"
        aria-labelledby={`skill-${index}-title`}
      >
        <CardHeader>
          <motion.div 
            className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
          </motion.div>
          <CardTitle id={`skill-${index}-title`} className="text-base md:text-lg">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.article>
  );
}
