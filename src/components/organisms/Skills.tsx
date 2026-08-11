import { Sparkles } from "lucide-react";
import { SectionHeader } from "../molecules/SectionHeader";
import { PageSection } from "../layout/PageSection";
import { ResponsiveImage } from "../atoms/ResponsiveImage";
import { METHOD_STRIP } from "../../data/about-visuals";
import { useLanguage } from "../../lib/LanguageContext";
import { Badge } from "../ui/badge";
import { portfolioImages } from "../../lib/portfolio-image-urls";

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

/** Skills: 4 cartas método + cadena de valor a ancho completo (diagrama wide). */
export function Skills() {
  const { language } = useLanguage();
  const es = language === "es";
  const chips = CHIPS[language];
  const cards = METHOD_STRIP.filter((item) => item.id !== "value");
  const cadena = METHOD_STRIP.find((item) => item.id === "value");

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
            ? "Journey, flows, test, design system y cadena de valor en el trabajo diario."
            : "Journey, flows, test, design system, and value chain in day-to-day work."
        }
      />

      <ul
        className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3"
        role="list"
        aria-label={es ? "Métodos" : "Methods"}
      >
        {cards.map((item) => (
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

      {/* Cadena de valor: diagrama 16:9 — object-contain, no recorte en tile 4:3 */}
      {cadena && (
        <figure className="mt-4 overflow-hidden rounded-xl border border-[color:var(--logo-surface-border)] bg-black/90">
          <ResponsiveImage
            src={portfolioImages.framework.uxValueChain}
            alt={
              es
                ? "Cadena de valor UX: Analytics → Research → UI Design → Testing → Desarrollo MVP"
                : "UX value chain: Analytics → Research → UI Design → Testing → MVP development"
            }
            fit="contain"
            aspectRatio="21 / 9"
            className="w-full min-h-[140px] sm:min-h-[180px]"
            imgClassName="bg-black"
            priority={false}
          />
          <figcaption className="border-t border-border/40 bg-background/95 px-3 py-2 text-center text-xs font-semibold text-foreground sm:text-sm">
            {es ? "Cadena de valor UX" : "UX value chain"}
          </figcaption>
        </figure>
      )}

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
