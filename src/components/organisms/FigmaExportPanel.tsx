import { useState } from "react";
import {
  Download,
  Copy,
  Check,
  Frame,
  FileJson,
  FileCode2,
  FileText,
  Package,
  ExternalLink,
  BookOpen,
  PenTool,
} from "lucide-react";
import { SectionHeader } from "../molecules/SectionHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { useLanguage } from "../../lib/LanguageContext";
import {
  copyExport,
  downloadExport,
  type ExportFormat,
} from "../../lib/design-tokens-export";
import { designSystemMeta } from "../../data/design-tokens";

type ExportCard = {
  id: ExportFormat;
  icon: typeof FileJson;
  titleEs: string;
  titleEn: string;
  descEs: string;
  descEn: string;
  badge: string;
  primary?: boolean;
};

const EXPORTS: ExportCard[] = [
  {
    id: "tokens-studio",
    icon: PenTool,
    titleEs: "Tokens Studio JSON",
    titleEn: "Tokens Studio JSON",
    descEs:
      "Importá en el plugin Tokens Studio for Figma (sets global / light / dark). Sync a Variables.",
    descEn:
      "Import into Tokens Studio for Figma (global / light / dark sets). Sync to Variables.",
    badge: "Recomendado",
    primary: true,
  },
  {
    id: "w3c",
    icon: FileJson,
    titleEs: "W3C Design Tokens",
    titleEn: "W3C Design Tokens",
    descEs: "Formato DTCG ($value / $type). Compatible con pipelines y otros plugins.",
    descEn: "DTCG format ($value / $type). Compatible with pipelines and other plugins.",
    badge: "DTCG",
  },
  {
    id: "css",
    icon: FileCode2,
    titleEs: "CSS variables",
    titleEn: "CSS variables",
    descEs: ":root + .dark con hex resueltos. Paridad dev ↔ Figma.",
    descEn: ":root + .dark with resolved hex. Dev ↔ Figma parity.",
    badge: "CSS",
  },
  {
    id: "figma-prompt",
    icon: FileText,
    titleEs: "Prompt handoff Figma AI",
    titleEn: "Figma AI handoff prompt",
    descEs:
      "Brief listo para pegar en plugins AI de Figma: variables, frames, componentes y estados.",
    descEn:
      "Brief ready for Figma AI plugins: variables, frames, components, and states.",
    badge: "AI",
  },
  {
    id: "manifest",
    icon: Package,
    titleEs: "Manifest",
    titleEn: "Manifest",
    descEs: "Metadatos del sistema, conteos y mapa de archivos de export.",
    descEn: "System metadata, counts, and export file map.",
    badge: "Meta",
  },
];

const steps = {
  es: [
    {
      n: "01",
      title: "Descargá Tokens Studio JSON",
      body: "Usá el botón Descargar del pack recomendado.",
    },
    {
      n: "02",
      title: "Abrí Tokens Studio en Figma",
      body: "Plugins → Tokens Studio for Figma → Load from file / Import.",
    },
    {
      n: "03",
      title: "Activá sets light + dark",
      body: "global (spacing, type, radius) + light/dark (colores). Export to Figma Variables.",
    },
    {
      n: "04",
      title: "Reconstruí componentes",
      body: "Usá el prompt AI o la biblioteca de la página como referencia 1:1.",
    },
  ],
  en: [
    {
      n: "01",
      title: "Download Tokens Studio JSON",
      body: "Use the Download button on the recommended pack.",
    },
    {
      n: "02",
      title: "Open Tokens Studio in Figma",
      body: "Plugins → Tokens Studio for Figma → Load from file / Import.",
    },
    {
      n: "03",
      title: "Enable light + dark sets",
      body: "global (spacing, type, radius) + light/dark (colors). Export to Figma Variables.",
    },
    {
      n: "04",
      title: "Rebuild components",
      body: "Use the AI prompt or this page library as 1:1 reference.",
    },
  ],
} as const;

export function FigmaExportPanel() {
  const { language } = useLanguage();
  const es = language === "es";
  const [copiedId, setCopiedId] = useState<ExportFormat | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const handleDownload = (format: ExportFormat) => {
    setBusy(`dl-${format}`);
    try {
      downloadExport(format, language);
      toast.success(es ? `Descargado: ${format}` : `Downloaded: ${format}`);
    } catch {
      toast.error(es ? "No se pudo descargar" : "Download failed");
    } finally {
      setBusy(null);
    }
  };

  const handleCopy = async (format: ExportFormat) => {
    setBusy(`cp-${format}`);
    try {
      await copyExport(format, language);
      setCopiedId(format);
      toast.success(es ? "Copiado al portapapeles" : "Copied to clipboard");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error(es ? "No se pudo copiar" : "Copy failed");
    } finally {
      setBusy(null);
    }
  };

  return (
    <section
      id="figma-export"
      className="section-pad-x scroll-mt-[calc(var(--header-height)+0.75rem)] bg-surface-matte py-8 md:py-12"
      aria-labelledby="figma-export-heading"
    >
      <div className="container mx-auto max-w-6xl space-y-8 md:space-y-10">
        <SectionHeader
          badge="Figma"
          badgeIcon={Frame}
          title={
            es
              ? "Exportar design system a Figma"
              : "Export design system to Figma"
          }
          description={
            es
              ? `Fuente de verdad v${designSystemMeta.version}. Tokens con paths Figma-ready, modes light/dark y brief de componentes.`
              : `Source of truth v${designSystemMeta.version}. Figma-ready token paths, light/dark modes, and component brief.`
          }
          align="left"
          titleId="figma-export-heading"
        />

        {/* Quick start steps */}
        <ol className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {steps[language].map((step) => (
            <li key={step.n}>
              <Card className="h-full border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-none">
                <CardContent className="pt-5 space-y-2">
                  <span className="font-mono text-xs tracking-widest text-primary">
                    {step.n}
                  </span>
                  <p className="text-sm font-medium leading-snug">{step.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {step.body}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>

        {/* Export cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXPORTS.map((item) => {
            const Icon = item.icon;
            const isCopied = copiedId === item.id;
            return (
              <Card
                key={item.id}
                className={`border-[color:var(--logo-surface-border)] shadow-none ${
                  item.primary
                    ? "ring-1 ring-primary/30 bg-surface-matte-elevated"
                    : "bg-background"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" aria-hidden />
                    </div>
                    <Badge variant={item.primary ? "default" : "outline"} className="text-[10px]">
                      {item.badge === "Recomendado" && !es ? "Recommended" : item.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">
                    {es ? item.titleEs : item.titleEn}
                  </CardTitle>
                  <CardDescription className="text-xs leading-relaxed">
                    {es ? item.descEs : item.descEn}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant={item.primary ? "default" : "secondary"}
                    onClick={() => handleDownload(item.id)}
                    disabled={busy === `dl-${item.id}`}
                    className="gap-1.5"
                  >
                    <Download className="h-3.5 w-3.5" aria-hidden />
                    {es ? "Descargar" : "Download"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopy(item.id)}
                    disabled={busy === `cp-${item.id}`}
                    className="gap-1.5"
                    aria-label={
                      es
                        ? `Copiar ${item.titleEs}`
                        : `Copy ${item.titleEn}`
                    }
                  >
                    {isCopied ? (
                      <Check className="h-3.5 w-3.5" aria-hidden />
                    ) : (
                      <Copy className="h-3.5 w-3.5" aria-hidden />
                    )}
                    {isCopied ? (es ? "Copiado" : "Copied") : es ? "Copiar" : "Copy"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Spec strip */}
        <Card className="border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-none">
          <CardContent className="pt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                {es ? "Tipografía" : "Typography"}
              </p>
              <p className="font-medium">{designSystemMeta.fonts.display}</p>
              <p className="text-xs text-muted-foreground">300 · 400 · 500 · 700</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                Grid
              </p>
              <p className="font-medium">
                {designSystemMeta.grid.base}px base · {designSystemMeta.grid.columnsDesktop} col
              </p>
              <p className="text-xs text-muted-foreground">
                gutter {designSystemMeta.grid.gutter} · margin{" "}
                {designSystemMeta.grid.marginDesktop}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                Frames
              </p>
              <p className="font-medium">
                {designSystemMeta.grid.frames.mobile.w} ·{" "}
                {designSystemMeta.grid.frames.tablet.w} ·{" "}
                {designSystemMeta.grid.frames.desktop.w}
              </p>
              <p className="text-xs text-muted-foreground">mobile · tablet · desktop</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                A11y
              </p>
              <p className="font-medium">WCAG 2.2 AA</p>
              <p className="text-xs text-muted-foreground">
                ≥{designSystemMeta.a11y.contrastMin} · touch{" "}
                {designSystemMeta.a11y.touchMinPx}px
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <BookOpen className="h-4 w-4 shrink-0" aria-hidden />
          <span>
            {es
              ? "Fuente CSS en producción:"
              : "Production CSS source:"}{" "}
            <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
              {designSystemMeta.figma.sourceCss}
            </code>
          </span>
          <a
            href="https://tokens.studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline ml-auto"
          >
            Tokens Studio
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
