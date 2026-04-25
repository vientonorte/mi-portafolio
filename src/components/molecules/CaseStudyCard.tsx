import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@vientonorte/ui/card';
import { Badge } from '@vientonorte/ui/badge';
import { Button } from '@vientonorte/ui/button';
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Briefcase } from "lucide-react";

interface CaseStudyCardProps {
  title: string;
  company: string;
  description: string;
  image: string;
  tags: string[];
  metrics: Array<{ label: string; value: string }>;
  onRead: () => void;
  index?: number;
}

export function CaseStudyCard({
  title,
  company,
  description,
  image,
  tags,
  metrics,
  onRead,
  index = 0,
}: CaseStudyCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="overflow-hidden h-full hover:shadow-xl dark:hover:shadow-primary/5 transition-all duration-300 group border-border/50 flex flex-col">
        <div className="aspect-video overflow-hidden bg-muted">
          <ImageWithFallback
            src={image}
            alt={`Caso de estudio: ${title}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        <CardHeader className="flex-grow space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <CardTitle className="text-xl md:text-2xl mb-2">{title}</CardTitle>
              <p className="text-sm text-muted-foreground">{company}</p>
            </div>
            <Briefcase className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
          </div>

          <CardDescription className="text-base leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 pt-0">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Metrics */}
          <div className="flex gap-4 py-4 border-t">
            {metrics.map((metric) => (
              <div key={metric.label} className="flex-1 text-center">
                <div className="text-lg md:text-xl text-primary mb-1">
                  {metric.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Button 
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" 
            variant="outline"
            onClick={onRead}
          >
            Ver Caso de Estudio
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </motion.article>
  );
}