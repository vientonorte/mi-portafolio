import { Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { ResponsiveImage } from "../atoms/ResponsiveImage";
import { useLanguage } from "../../lib/LanguageContext";
import { METODO_RO_CASES } from "../../data/metodo-ro-cases";

/**
 * Evidencia del cargo UX Manager · Viento Norte
 * (bullets: Monitas, Edu21, funnels, design ops, FO).
 * No es galería general del portafolio enterprise (SURA/Transvip → /proyectos).
 */
export function MetodoRoEvidence() {
  const { language } = useLanguage();
  const es = language === "es";

  return (
    <PageSection
      id="evidencia-vn"
      padding="compact"
      width="wide"
      tone="matte"
      aria-labelledby="evidencia-vn-heading"
    >
      <SectionHeader
        badge={es ? "UX Manager · Viento Norte" : "UX Manager · Viento Norte"}
        badgeIcon={Briefcase}
        titleId="evidencia-vn-heading"
        title={
          es
            ? "Casos Viento Norte"
            : "Viento Norte cases"
        }
        description={
          es
            ? "E-comm, educación, funnels y front office — Design Ops y Figma en práctica."
            : "E-comm, education, funnels, and front office — Design Ops and Figma in practice."
        }
      />

      <ul
        className="mb-6 flex flex-wrap gap-2"
        aria-label={es ? "Tools del cargo" : "Role tools"}
      >
        {(es
          ? ["Desarrollo web", "CX", "Figma", "Design Ops", "N2N"]
          : ["Web dev", "CX", "Figma", "Design Ops", "N2N"]
        ).map((tool) => (
          <li key={tool}>
            <Badge variant="secondary" className="text-xs">
              {tool}
            </Badge>
          </li>
        ))}
      </ul>

      <ul
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label={
          es
            ? "Evidencia UI/UX del cargo Viento Norte"
            : "UI/UX evidence for Viento Norte role"
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
                  {es ? "Viento Norte · N2N" : "Viento Norte · N2N"}
                </p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </PageSection>
  );
}

export { MetodoRoEvidence as InterfaceWall };
