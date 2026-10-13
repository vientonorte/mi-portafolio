import { ExternalLink } from "lucide-react";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { useLanguage } from "../../lib/LanguageContext";
import { NAVIGABLE_PROTOTYPES } from "../../data/navigable-prototypes";

const KIND_LABEL = {
  proto: { es: "Prototipo Figma", en: "Figma prototype" },
  site: { es: "Figma Sites", en: "Figma Sites" },
  file: { es: "Archivo Figma", en: "Figma file" },
} as const;

export function NavigablePrototypes() {
  const { language } = useLanguage();
  const es = language === "es";
  return (
    <PageSection
      id="prototipos"
      padding="compact"
      width="wide"
      aria-labelledby="prototipos-heading"
    >
      <SectionHeader
        titleId="prototipos-heading"
        title={es ? "Prototipos navegables" : "Navigable prototypes"}
        description={
          es
            ? "Ábrelos y recórrelos: se abren en Figma en una pestaña nueva."
            : "Open and click through them: they open in Figma in a new tab."
        }
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {NAVIGABLE_PROTOTYPES.map((p) => (
          <li key={p.id} className="min-w-0">
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              data-prototype-id={p.id}
              className="flex h-full flex-col gap-1 rounded-lg border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated p-4 transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2"
            >
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {p.client} · {KIND_LABEL[p.kind][language]}
              </span>
              <span className="flex items-center gap-2 text-base font-semibold">
                {p.title[language]}
                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                <span className="sr-only">{es ? "(abre en pestaña nueva)" : "(opens in new tab)"}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </PageSection>
  );
}
