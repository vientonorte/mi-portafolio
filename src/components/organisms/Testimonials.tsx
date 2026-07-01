import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { SectionHeader } from "../molecules/SectionHeader";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";

export function Testimonials() {
  const { language } = useLanguage();
  const t = useTranslation(language).testimonials;

  return (
    <section
      id="testimonios"
      className="py-16 md:py-24 px-4 bg-muted/20"
      aria-labelledby="testimonials-heading"
    >
      <div className="container max-w-7xl mx-auto">
        <SectionHeader
          badge={t.badge}
          title={t.title}
          description={t.description}
          titleId="testimonials-heading"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {t.items.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-border/50">
                <CardContent className="flex h-full flex-col p-6">
                  <Quote className="mb-4 h-8 w-8 text-primary/40" aria-hidden />
                  <blockquote className="mb-6 flex-1 text-muted-foreground leading-relaxed">
                    «{item.quote}»
                  </blockquote>
                  <footer className="border-t border-border/50 pt-4">
                    <cite className="not-italic">
                      <div className="font-medium text-foreground">{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.role} · {item.company}
                      </div>
                    </cite>
                  </footer>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}