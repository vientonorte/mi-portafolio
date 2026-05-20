import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { LucideIcon } from "lucide-react";

interface MethodCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  steps: string[];
  index?: number;
}

export function MethodCard({ icon: Icon, title, description, steps, index = 0 }: MethodCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-xl dark:hover:shadow-primary/5 transition-all duration-300 border-border/50">
        <CardHeader>
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
            <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{description}</p>
          
          <div className="space-y-2">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary">
                  {i + 1}
                </div>
                <p className="text-sm flex-1">{step}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.article>
  );
}