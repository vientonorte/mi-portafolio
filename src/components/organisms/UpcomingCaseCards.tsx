import { motion, useReducedMotion } from "motion/react";
import { Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { SectionHeader } from "../molecules/SectionHeader";
import { upcomingCases } from "../../data/upcoming-cases";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";

export function UpcomingCaseCards() {
  const { language } = useLanguage();
  const t = useTranslation(language).upcomingCases;
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="border-t border-border/60 px-4 py-16 md:py-20"
      aria-labelledby="upcoming-cases-heading"
    >
      <div className="container mx-auto max-w-7xl">
        <SectionHeader
          badge={t.badge}
          badgeIcon={Clock}
          title={t.title}
          description={t.description}
          titleId="upcoming-cases-heading"
        />

        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {upcomingCases.map((item, index) => {
            const images = item.images ?? [];
            return (
              <motion.article
                key={item.id}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Card className="h-full border-dashed border-border/80 bg-muted/20 opacity-90">
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg">{item.title[language]}</CardTitle>
                        <CardDescription>{item.company}</CardDescription>
                      </div>
                      <Badge variant="outline" className="shrink-0 text-xs text-muted-foreground">
                        {t.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description[language]}</p>
                    <p className="font-mono text-xs text-muted-foreground/80">{item.period}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {images.length > 0 ? (
                      <ul
                        className="mt-4 grid gap-2"
                        data-upcoming-images={item.id}
                      >
                        {images.map((src, imageIndex) => (
                          <li key={src}>
                            <img
                              src={src}
                              alt={`${item.company} — ${item.title[language]} ${imageIndex + 1}`}
                              className="w-full rounded-md border border-border/60 bg-muted/30 object-contain"
                              data-upcoming-image={item.id}
                            />
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </CardContent>
                </Card>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
