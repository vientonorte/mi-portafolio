import { motion } from "motion/react";
import { Card, CardContent } from '@vientonorte/ui/card';
import { Badge } from '@vientonorte/ui/badge';
import { Button } from "../ui/button";
import { Building2, ArrowRight, Briefcase, FileText } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { LogoMark } from "../atoms/Logo";
import type { CompanyHub } from "../../data/projects-data";

interface CompanyHubCardProps extends CompanyHub {
  index: number;
  onSelect: (companyId: string) => void;
  onNavigateToDetail?: (companyId: string) => void;
  lang: {
    viewProjects: string;
    projectCount: string;
  };
}

export function CompanyHubCard({
  id,
  name,
  logo,
  industry,
  period,
  totalProjects,
  description,
  highlights,
  image,
  index,
  onSelect,
  onNavigateToDetail,
  lang,
}: CompanyHubCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        type: "spring",
        stiffness: 80,
      }}
      className="group focus-visible:outline-none"
    >
      <Card className="overflow-hidden hover:shadow-2xl dark:hover:shadow-primary/5 transition-all duration-500 border-border/50 dark:border-border/30 hover:border-primary/20 dark:hover:border-primary/30 relative h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
        {/* Animated gradient background on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-primary/5 dark:from-primary/5 dark:via-transparent dark:to-primary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={false}
        />

        {/* Image Hero Section with Overlay */}
        {image && (
          <div className="relative h-56 overflow-hidden bg-muted/20">
            <ImageWithFallback
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradient overlay - Más transparente para ver la imagen */}
            <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-card/20 to-transparent" />
            
            {/* Logo overlay */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="absolute top-4 left-4"
            >
              {logo ? (
                <div className="h-16 w-16 rounded-xl overflow-hidden bg-card/95 backdrop-blur-sm flex items-center justify-center ring-1 ring-border/50 group-hover:ring-primary/40 transition-all shadow-lg p-2.5">
                  <ImageWithFallback
                    src={logo}
                    alt={`${name} logo`}
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : (
                <div className="h-16 w-16 rounded-xl bg-brand-gradient flex items-center justify-center shadow-lg">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
              )}
            </motion.div>

            {/* Project count badge - top right - MEJORADO CON MEJOR VISIBILIDAD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 + 0.2 }}
              className="absolute top-4 right-4"
            >
              <div className="h-14 w-14 rounded-full bg-background dark:bg-card backdrop-blur-md flex flex-col items-center justify-center ring-2 ring-primary group-hover:ring-primary/80 transition-all shadow-2xl">
                <span className="text-2xl font-bold text-primary">{totalProjects}</span>
                <span className="text-[10px] text-foreground/70 font-medium uppercase tracking-wide">
                  {lang.projectCount.split(' ')[0]}
                </span>
              </div>
            </motion.div>
          </div>
        )}

        <CardContent className="p-6 relative space-y-4">
          {/* Header with title and badges - MEJORADOS */}
          <div>
            <motion.h3
              className="text-2xl mb-3 leading-tight"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 + 0.1 }}
            >
              {name}
            </motion.h3>
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant="secondary" 
                className="text-xs font-medium bg-primary/15 dark:bg-primary/10 text-primary dark:text-primary/90 border border-primary/20 dark:border-primary/20"
              >
                {industry}
              </Badge>
              <Badge 
                variant="outline" 
                className="text-xs bg-muted/50 dark:bg-muted/20 border-border/60 dark:border-border/40 text-foreground/80 dark:text-foreground/70"
              >
                {period}
              </Badge>
            </div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 + 0.3 }}
            className="text-muted-foreground leading-relaxed"
          >
            {description}
          </motion.p>

          {/* Highlights with better visual hierarchy - MEJORADO */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 + 0.5 }}
            className="pt-2"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-lg bg-primary/15 dark:bg-primary/10 flex items-center justify-center border border-primary/20">
                <Briefcase className="h-4 w-4 text-primary dark:text-primary/90" />
              </div>
              <h4 className="font-semibold text-foreground">Proyectos destacados</h4>
            </div>
            <ul className="space-y-2 ml-1">
              {highlights.slice(0, 3).map((highlight, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.5 + idx * 0.05 }}
                  className="flex items-start gap-2.5 text-sm text-foreground/70 dark:text-muted-foreground group/item"
                >
                  <span className="text-primary dark:text-primary/90 mt-0.5 flex-shrink-0 group-hover/item:translate-x-1 transition-transform font-bold">
                    →
                  </span>
                  <span className="group-hover/item:text-foreground dark:group-hover/item:text-foreground/90 transition-colors">
                    {highlight}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Action Buttons - Stacked with better hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 + 0.6 }}
            className="space-y-3 pt-4"
          >
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(id);
              }}
              size="lg"
              className="w-full bg-brand-gradient hover:opacity-90 transition-opacity group/btn relative overflow-hidden"
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              <span className="relative flex items-center justify-center gap-2">
                {lang.viewProjects}
                <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </span>
            </Button>

            {/* Framework button */}
            {onNavigateToDetail && (
              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigateToDetail(id);
                }}
                className="w-full group/detail border-2 hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <FileText className="h-4 w-4 mr-2 group-hover/detail:scale-110 transition-transform" />
                <span className="flex-1 text-left">Cómo trabajé: Los 5 procesos UX</span>
                <ArrowRight className="h-4 w-4 group-hover/detail:translate-x-1 transition-transform" />
              </Button>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.article>
  );
}