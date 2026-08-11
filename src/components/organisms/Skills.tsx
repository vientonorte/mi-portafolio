import { Sparkles } from "lucide-react";
import { SectionHeader } from "../molecules/SectionHeader";
import { PageSection } from "../layout/PageSection";
import { METHOD_STRIP } from "../../data/about-visuals";
import { useLanguage } from "../../lib/LanguageContext";
import { Badge } from "../ui/badge";

const CHIPS = {
  es: [
    "Figma",
    "Design systems",
    "Research",
    "Design Thinking",
    "Sprints",
    "WCAG",
    "Handoff",
    "Analytics",
    "Product",
    "Brand UX",
  ],
  en: [
    "Figma",
    "Design systems",
    "Research",
    "Design Thinking",
    "Sprints",
    "WCAG",
    "Handoff",
    "Analytics",
    "Product",
    "Brand UX",
  ],
} as const;

/** Skills visuales: tira de método + chips. Sin párrafos. */
export function Skills() {
  const { language } = useLanguage();
  const es = language === "es";
  const chips = CHIPS[language];

  return (
    <PageSection
      id="habilidades"
      padding="compact"
      width="wide"
      tone="default"
      aria-labelledby="skills-heading"
    >
      <SectionHeader
        badge={es ? "Método Ro" : "Método Ro"}
        badgeIcon={Sparkles}
        titleId="skills-heading"
        title={es ? "Método en una mirada" : "Method at a glance"}
        description={
          es
            ? "Journey, flows, test y design system en el trabajo diario."
            : "Journey, flows, test, and design system in day-to-day work."
        }
      />

      <ul
        className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5 md:gap-3"
        role="list"
        aria-label={es ? "Métodos" : "Methods"}
      >
        {METHOD_STRIP.map((item) => (
          <li
            key={item.id}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated"
          >
            <img
              src={item.src}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent"
              aria-hidden
            />
            <span className="absolute bottom-2 left-2 text-xs font-semibold text-foreground">
              {item.label[language]}
            </span>
          </li>
        ))}
      </ul>

      <div
        className="mt-6 flex flex-wrap gap-2"
        role="list"
        aria-label={es ? "Herramientas" : "Tools"}
      >
        {chips.map((chip) => (
          <Badge
            key={chip}
            variant="outline"
            className="border-border/80 px-3 py-1.5 text-sm font-medium"
          >
            {chip}
          </Badge>
        ))}
      </div>
    </PageSection>
  );
}
