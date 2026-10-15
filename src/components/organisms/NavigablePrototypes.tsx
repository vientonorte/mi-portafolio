import { ExternalLink } from "lucide-react";
import { Badge } from "../ui/badge";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { useLanguage } from "../../lib/LanguageContext";
import { NAVIGABLE_PROTOTYPES } from "../../data/navigable-prototypes";

const KIND_LABEL = {
  proto: { es: "Prototipo Figma", en: "Figma prototype" },
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
            ? "Prototipos y archivos Figma de proyectos reales. Se abren en una pestaña nueva; no requieren cuenta."
            : "Prototypes and Figma files from real projects. They open in a new tab; no account needed."
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
              <span className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="text-[10px] uppercase tracking-wide">
                  {KIND_LABEL[p.kind][language]}
                </Badge>
                <span className="text-xs text-muted-foreground">{p.client}</span>
                <span className="sr-only">: </span>
              </span>
              <span className="flex items-start justify-between gap-2 text-base font-semibold">
                <span>{p.title[language]}</span>
                <ExternalLink className="mt-1 h-4 w-4 shrink-0" aria-hidden />
              </span>
              <span className="sr-only"> {es ? "(abre en pestaña nueva)" : "(opens in new tab)"}</span>
            </a>
          </li>
        ))}
      </ul>
    </PageSection>
  );
}
