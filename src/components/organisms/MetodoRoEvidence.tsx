import { BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { ResponsiveImage } from "../atoms/ResponsiveImage";
import { useLanguage } from "../../lib/LanguageContext";
import { METODO_RO_CASES } from "../../data/metodo-ro-cases";

/**
 * Evidencia de casos del Método Ro en Viento Norte.
 * No es galería general del portafolio (eso es /proyectos).
 * Va justo después de “Método en una mirada”.
 */
export function MetodoRoEvidence() {
  const { language } = useLanguage();
  const es = language === "es";

  return (
    <PageSection
      id="metodo-ro-casos"
      padding="compact"
      width="wide"
      tone="matte"
      aria-labelledby="metodo-ro-heading"
    >
      <SectionHeader
        badge={es ? "Método Ro · Viento Norte" : "Método Ro · Viento Norte"}
        badgeIcon={BookOpen}
        titleId="metodo-ro-heading"
        title={es ? "Evidencia de casos" : "Case evidence"}
        description={
          es
            ? "Artefactos de la práctica VN (asesorías). No reemplaza Proyectos enterprise."
            : "VN practice artifacts (advisory). Does not replace enterprise Projects."
        }
      />

      <ul
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label={
          es
            ? "Casos Método Ro en Viento Norte"
            : "Método Ro cases at Viento Norte"
        }
      >
        {METODO_RO_CASES.map((item) => (
          <li key={item.id} className="min-w-0">
            <Card className="flex h-full flex-col overflow-hidden border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-none transition-shadow hover:shadow-md">
              <ResponsiveImage
                src={item.src}
                alt={`${item.caseName[language]} — ${item.artifact[language]}`}
                fit="cover"
                aspectRatio="16 / 9"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="bg-muted"
                imgClassName="object-top"
              />
              <CardHeader className="space-y-2 pb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="text-[10px] uppercase tracking-wide">
                    {item.phase[language]}
                  </Badge>
                  <span className="text-xs font-medium text-muted-foreground">
                    {item.caseName[language]}
                  </span>
                </div>
                <CardTitle className="text-base font-semibold leading-snug sm:text-lg">
                  {item.artifact[language]}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground">
                  {es
                    ? "Caso · Método Ro · Viento Norte"
                    : "Case · Método Ro · Viento Norte"}
                </p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </PageSection>
  );
}

/** @deprecated Use MetodoRoEvidence — kept so old imports don't break mid-refactor */
export { MetodoRoEvidence as InterfaceWall };
