import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface ProjectCardProps {
  name: string;
  description: string;
  period: string;
  tags: string[];
  processCount: number;
  thumbnail?: string;
  onClick: () => void;
  index?: number;
  language?: "es" | "en";
}

export function ProjectCard({
  name,
  description,
  period,
  tags,
  processCount,
  thumbnail,
  onClick,
  index = 0,
  language = "es",
}: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();

  const fadeInVariant = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.article
      variants={fadeInVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={shouldReduceMotion ? {} : { y: -4 }}
      className="group cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`${language === "es" ? "Ver detalles del proyecto" : "View project details"}: ${name}`}
    >
      <Card className="border-2 hover:border-primary/50 transition-all h-full overflow-hidden">
        {/* Thumbnail */}
        {thumbnail && (
          <div className="aspect-video overflow-hidden bg-muted/30">
            <img
              src={thumbnail}
              alt=""
              role="presentation"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl mb-1 group-hover:text-primary transition-colors">
                {name}
              </h3>
              <p className="text-sm text-muted-foreground">{period}</p>
            </div>
            
            <Badge variant="outline" className="bg-primary/10 border-primary/30 flex-shrink-0 ml-2">
              {processCount} {language === "es" ? "procesos" : "processes"}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>

          {/* CTA */}
          <Button
            variant="ghost"
            className="w-full group-hover:bg-primary/10 transition-colors gap-2 group/button"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            <span>{language === "es" ? "Ver caso de estudio" : "View case study"}</span>
            <ArrowRight className="h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </motion.article>
  );
}
