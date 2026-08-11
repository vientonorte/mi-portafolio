import { LayoutGrid } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { ResponsiveImage } from "../atoms/ResponsiveImage";
import { useLanguage } from "../../lib/LanguageContext";
import { INTERFACE_WALL } from "../../data/interface-wall";

/**
 * Galería L2 — mismo patrón visual que Projects / CaseStudyCard:
 * grid 1→2→3, imagen 16:9, card elevada, tags. Sin bento caótico.
 */
export function InterfaceWall() {
  const { language } = useLanguage();
  const es = language === "es";

  return (
    <PageSection
      id="interfaces"
      padding="compact"
      width="wide"
      tone="matte"
      aria-labelledby="interface-wall-heading"
    >
      <SectionHeader
        badge={es ? "Galería" : "Gallery"}
        badgeIcon={LayoutGrid}
        titleId="interface-wall-heading"
        title={es ? "Interfaces de producto" : "Product interfaces"}
        description={
          es
            ? "Mismo ritmo que proyectos: captura 16:9, marca y alcance."
            : "Same rhythm as projects: 16:9 capture, brand, and scope."
        }
      />

      <ul
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label={es ? "Galería de interfaces" : "Interface gallery"}
      >
        {INTERFACE_WALL.map((tile) => (
          <li key={tile.id} className="min-w-0">
            <Card className="flex h-full flex-col overflow-hidden border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-none transition-shadow hover:shadow-md">
              <ResponsiveImage
                src={tile.src}
                alt={`${tile.brand[language]} — ${tile.label[language]}`}
                fit="cover"
                aspectRatio="16 / 9"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="bg-muted"
                imgClassName="object-top transition-transform duration-500 group-hover:scale-105"
              />
              <CardHeader className="space-y-2 pb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant={tile.scope === "global" ? "default" : "secondary"}
                    className="text-[10px] uppercase tracking-wide"
                  >
                    {tile.scope === "global"
                      ? es
                        ? "Transnacional"
                        : "Global"
                      : es
                        ? "Nacional"
                        : "National"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {tile.brand[language]}
                  </span>
                </div>
                <CardTitle className="text-base font-semibold leading-snug sm:text-lg">
                  {tile.label[language]}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground">
                  {es ? "Evidencia de UI · práctica / empresa" : "UI evidence · practice / company"}
                </p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </PageSection>
  );
}
