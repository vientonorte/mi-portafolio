import { Badge } from "../ui/badge";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";

/**
 * Hero SEM/FO · Radio de tres nombres.
 * Alcance y CTA único viven en #modalidades. Calendar no va en el hero (parking DS).
 */
export function ConsultoriaLandingHero() {
  const { language } = useLanguage();
  const t = useTranslation(language).consultoria.landing;
  const es = language === "es";

  return (
    <section
      id="inicio"
      className="funnel-section-enter section-pad-default section-atmosphere section-atmosphere-matte relative overflow-hidden border-b border-border/40 scroll-mt-[calc(var(--header-height)+0.75rem)]"
      aria-labelledby="consultoria-hero-heading"
    >
      <div className="container relative mx-auto max-w-2xl">
        <div className="mx-auto space-y-6 text-center">
          <Badge
            variant="outline"
            className="border-primary/25 font-normal text-foreground"
          >
            {t.badge}
          </Badge>

          <h1
            id="consultoria-hero-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.5rem] md:leading-[1.12]"
          >
            {t.title}{" "}
            <span className="text-brand-gradient">{t.titleAccent}</span>
          </h1>

          <p className="mx-auto max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.description}
          </p>

          <ul
            className="flex flex-wrap items-center justify-center gap-2"
            role="list"
            aria-label={es ? "Compromisos" : "Commitments"}
          >
            {t.trustChips.map((chip) => (
              <li key={chip}>
                <span className="inline-flex min-h-[32px] items-center rounded-full border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated/90 px-3 py-1 text-xs font-medium text-muted-foreground">
                  {chip}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
