import { Cpu, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { useLanguage } from "../../lib/LanguageContext";
import { MICRO1_TOOL_EVIDENCE } from "../../data/micro1-tool-evidence";

/**
 * Evidencia de tools micro1: Anotación + QA de grabación (+ captura).
 * Sin screenshots de juego (herramientas / contenido propietarios).
 */
export function Micro1ToolEvidence() {
  const { language } = useLanguage();
  const es = language === "es";

  return (
    <PageSection
      id="evidencia-micro1"
      padding="compact"
      width="wide"
      tone="default"
      aria-labelledby="micro1-evidence-heading"
    >
      <SectionHeader
        badge="micro1 · AI"
        badgeIcon={Cpu}
        titleId="micro1-evidence-heading"
        title={
          es
            ? "micro1 · captura y calidad"
            : "micro1 · capture and quality"
        }
        description={
          es
            ? "Captura remota, anotación y QA de grabación en proyectos AAA (EE.UU.)."
            : "Remote capture, annotation, and recording QA on AAA projects (US)."
        }
      />

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {MICRO1_TOOL_EVIDENCE.map((item) => (
          <li key={item.id}>
            <Card className="flex h-full flex-col border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-none">
              <CardHeader className="space-y-2 pb-2">
                <Badge variant="secondary" className="w-fit text-[10px] uppercase tracking-wide">
                  {item.tool[language]}
                </Badge>
                <CardTitle className="text-base font-semibold leading-snug sm:text-lg">
                  {item.tool[language]}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{item.summary[language]}</p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-3 pt-0">
                <ol className="space-y-2" role="list">
                  {item.steps[language].map((step, i) => (
                    <li key={step} className="flex gap-2 text-sm text-foreground/90">
                      <span className="font-mono text-[10px] text-primary tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-auto flex items-start gap-2 border-t border-border/50 pt-3 text-xs font-medium text-primary">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                  {item.output[language]}
                </p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </PageSection>
  );
}
