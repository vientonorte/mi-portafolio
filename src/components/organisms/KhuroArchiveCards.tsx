import { motion, useReducedMotion } from "motion/react";
import { Archive } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { SectionHeader } from "../molecules/SectionHeader";
import { useLanguage } from "../../lib/LanguageContext";
import {
  KHURO_SOURCE,
  khuroArchiveCopy,
  khuroArchiveItems,
} from "../../data/khuro-portfoliobox";

export function KhuroArchiveCards() {
  const { language } = useLanguage();
  const t = khuroArchiveCopy[language];
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="border-t border-border/60 px-4 py-16 md:py-20"
      aria-labelledby="khuro-archive-heading"
    >
      <div className="container mx-auto max-w-7xl">
        <SectionHeader
          badge={t.badge}
          badgeIcon={Archive}
          title={t.title}
          description={t.description}
          titleId="khuro-archive-heading"
        />

        <p className="mb-8 text-sm">
          <a
            href={KHURO_SOURCE}
            className="text-primary underline-offset-4 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            {t.source}
          </a>
        </p>

        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {khuroArchiveItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="flex h-full flex-col overflow-hidden bg-surface-matte-elevated">
                {item.image ? (
                  <img
                    src={item.image}
                    alt=""
                    className="aspect-video w-full object-cover bg-muted"
                  />
                ) : null}
                <CardHeader className="space-y-2">
                  <CardTitle className="text-lg">{item.role}</CardTitle>
                  <CardDescription>{item.company}</CardDescription>
                  <p className="whitespace-pre-line text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardHeader>
                <CardContent className="mt-auto space-y-4 pt-0">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {t.open}
                  </a>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
