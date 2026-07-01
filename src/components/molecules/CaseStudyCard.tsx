import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ArrowRight } from "lucide-react";
import { ResponsiveImage } from "../atoms/ResponsiveImage";
import { CompanyLogoFromName } from "../atoms/CompanyLogoFromName";
import { resolveCompanyBrand } from "../../lib/company-logos";
import { useTranslation } from "../../lib/i18n";

interface CaseStudyCardProps {
  title: string;
  company: string;
  description: string;
  image: string;
  tags: string[];
  metrics: Array<{ label: string; value: string }>;
  onRead: () => void;
  index?: number;
  language?: "es" | "en";
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
  language = "es",
}: CaseStudyCardProps) {
  const t = useTranslation(language);
  const hasLogo = resolveCompanyBrand(company) !== null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="overflow-hidden h-full bg-surface-matte-elevated hover:shadow-md transition-all duration-300 group border-[color:var(--logo-surface-border)] shadow-none flex flex-col">
        <ResponsiveImage
          src={image}
          alt={`${t.caseStudiesGrid.altPrefix} ${title}`}
          fit="cover"
          aspectRatio="16 / 9"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="bg-muted"
          imgClassName="group-hover:scale-105 transition-transform duration-500"
        />

        <CardHeader className="flex-grow space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <CardTitle className="text-xl md:text-2xl mb-2">{title}</CardTitle>
              <p className="text-sm text-muted-foreground">{company}</p>
            </div>
            {hasLogo ? (
              <CompanyLogoFromName company={company} size="sm" />
            ) : null}
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
            {t.caseStudiesGrid.viewCase}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </motion.article>
  );
}