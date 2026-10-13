import { HeartHandshake } from "lucide-react";
import { Badge } from "../ui/badge";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { getVolunteerEntries } from "../../data/volunteer-data";
import { useLanguage } from "../../lib/LanguageContext";

/** Causas fuera del trayecto laboral. Lista abierta: cada ítem es una frase. */
export function Volunteer() {
  const { language } = useLanguage();
  const es = language === "es";
  const entries = getVolunteerEntries(language);

  return (
    <PageSection
      id="voluntariado"
      padding="compact"
      width="wide"
      tone="section"
      aria-labelledby="voluntariado-heading"
    >
      <SectionHeader
        badge={es ? "Voluntariado" : "Volunteering"}
        badgeIcon={HeartHandshake}
        title={es ? "Cuatro causas" : "Four causes"}
        description={
          es
            ? "Mentorías, comunicaciones, investigación y reconstrucción."
            : "Mentoring, communications, research, and reconstruction."
        }
        titleId="voluntariado-heading"
      />

      <ol className="mx-auto max-w-3xl space-y-3" aria-label={es ? "Voluntariado" : "Volunteering"}>
        {entries.map((entry) => (
          <li key={entry.org}>
            <article className="rounded-xl border border-border/50 bg-card/60 px-4 py-3 sm:px-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="outline"
                  className="border-primary/25 font-mono text-[10px] uppercase tracking-[0.14em] text-primary"
                >
                  {entry.cause}
                </Badge>
              </div>
              <h3 className="mt-2 text-base font-semibold leading-tight">{entry.role}</h3>
              <p className="text-sm font-medium text-foreground/80">
                {entry.org}
                <span className="text-muted-foreground"> · {entry.period}</span>
              </p>
              <p className="mt-2 text-sm leading-snug text-muted-foreground">{entry.summary}</p>
            </article>
          </li>
        ))}
      </ol>
    </PageSection>
  );
}
