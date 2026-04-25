import { motion } from "motion/react";
import { Card, CardContent } from '@vientonorte/ui/card';
import { Badge } from '@vientonorte/ui/badge';
import { Check } from "lucide-react";

interface ProcessMethodCardProps {
  title: string;
  description: string;
  tools?: string[];
  index: number;
}

export function ProcessMethodCard({
  title,
  description,
  tools,
  index,
}: ProcessMethodCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Card className="h-full border-2 hover:border-primary/30 transition-all hover:shadow-lg">
        <CardContent className="p-6">
          {/* Check icon */}
          <div className="flex items-start gap-4 mb-4">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-bold text-lg">{title}</h3>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {description}
          </p>

          {/* Tools */}
          {tools && tools.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <Badge
                  key={tool}
                  variant="secondary"
                  className="text-xs"
                >
                  {tool}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.article>
  );
}
