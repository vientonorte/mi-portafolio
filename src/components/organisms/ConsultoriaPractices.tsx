import { useMemo, useState } from "react";
import { BookOpen, CheckCircle2, ClipboardList } from "lucide-react";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import {
  CONSULTORIA_PRACTICES,
  PRACTICE_CATEGORIES,
  type PracticeCategoryId,
} from "../../data/consultoria-practices";
import { cn } from "../../lib/utils";

type FilterId = "all" | PracticeCategoryId;

export function ConsultoriaPractices() {
  const { language } = useLanguage();
  const t = useTranslation(language).consultoria.practices;
  const [filter, setFilter] = useState<FilterId>("all");

  const items = useMemo(
    () =>
      filter === "all"
        ? CONSULTORIA_PRACTICES
        : CONSULTORIA_PRACTICES.filter((p) => p.category === filter),
    [filter]
  );

  const categoryLabel = (id: PracticeCategoryId) =>
    PRACTICE_CATEGORIES.find((c) => c.id === id)?.label[language] ?? id;

  return (
    <PageSection
      id="practicas"
      padding="spacious"
      width="wide"
      tone="default"
      aria-labelledby="consultoria-practices-heading"
    >
      <SectionHeader
        badge={t.badge}
        badgeIcon={BookOpen}
        title={t.title}
        description={t.description}
        titleId="consultoria-practices-heading"
        align="left"
      />

      <div
        className="mb-8 flex flex-wrap gap-2"
        role="tablist"
        aria-label={t.filterAria}
      >
        <button
          type="button"
          role="tab"
          aria-selected={filter === "all"}
          onClick={() => setFilter("all")}
          className={cn(
            "min-h-[44px] rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            filter === "all"
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-border bg-background text-muted-foreground hover:border-primary/20 hover:text-foreground"
          )}
        >
          {t.filterAll}
        </button>
        {PRACTICE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={filter === cat.id}
            onClick={() => setFilter(cat.id)}
            className={cn(
              "min-h-[44px] rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              filter === cat.id
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-border bg-background text-muted-foreground hover:border-primary/20 hover:text-foreground"
            )}
          >
            {cat.label[language]}
          </button>
        ))}
      </div>

      <p className="mb-6 text-sm text-muted-foreground" aria-live="polite">
        {t.showing.replace("{count}", String(items.length))}
      </p>

      <ul className="grid gap-4 md:grid-cols-2" role="list">
        {items.map((practice) => {
          const Icon = practice.icon;
          return (
            <li key={practice.id} className="h-full">
              <Card className="h-full border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-none">
                <CardHeader className="space-y-3 pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" aria-hidden />
                    </div>
                    <Badge variant="outline" className="text-[10px] font-normal">
                      {categoryLabel(practice.category)}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-base md:text-lg leading-snug">
                      {practice.title[language]}
                    </CardTitle>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {practice.standard}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {practice.summary[language]}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-foreground">
                      <ClipboardList className="h-3.5 w-3.5 text-primary" aria-hidden />
                      {t.checklistLabel}
                    </p>
                    <ul className="space-y-1.5" role="list">
                      {practice.checklist[language].map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0 text-primary/80"
                            aria-hidden
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-lg border border-border/80 bg-background/60 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {t.validationLabel}
                    </p>
                    <p className="mt-1 text-sm text-foreground/90 leading-snug">
                      {practice.validation[language]}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ul>

      <aside className="mt-10 rounded-2xl border border-[color:var(--logo-surface-border)] bg-muted/30 p-5 md:p-6">
        <p className="text-sm font-semibold text-foreground">{t.footnoteTitle}</p>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {t.footnote}
        </p>
      </aside>
    </PageSection>
  );
}
