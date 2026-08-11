import { motion } from "motion/react";
import { ExternalLink, Quote } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";

export function Testimonials() {
  const { language } = useLanguage();
  const t = useTranslation(language).testimonials;

  return (
    <PageSection
      id="testimonios"
      padding="default"
      width="wide"
      tone="matte"
      aria-labelledby="testimonials-heading"
    >
        <SectionHeader
          badge={t.badge}
          badgeIcon={Quote}
          title={t.title}
          description={t.description}
          titleId="testimonials-heading"
        />

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {t.items.map((item, index) => (
            <motion.article
              key={item.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-none">
                <CardContent className="flex h-full flex-col p-6">
                  <Quote className="mb-4 h-8 w-8 text-primary/35" aria-hidden />
                  <blockquote className="mb-6 flex-1 text-muted-foreground leading-relaxed">
                    «{item.quote}»
                  </blockquote>
                  <footer className="border-t border-[color:var(--logo-surface-border)] pt-4">
                    <cite className="not-italic">
                      <div className="font-semibold text-foreground">{item.author}</div>
                      <div className="mt-0.5 text-sm text-muted-foreground">
                        {item.role} · {item.company}
                      </div>
                      {item.context && (
                        <div className="mt-1 text-xs text-muted-foreground/70">
                          {item.context}
                        </div>
                      )}
                    </cite>
                  </footer>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button variant="outline" size="lg" asChild className="min-h-[44px]">
            <a
              href={t.linkedInHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.linkedInCta}
              <ExternalLink className="ml-2 h-4 w-4" aria-hidden />
            </a>
          </Button>
        </div>
    </PageSection>
  );
}