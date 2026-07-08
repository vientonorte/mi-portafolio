import type { FigmaEmbedConfig } from "../../data/figma-embeds";
import { toFigmaEmbedUrl } from "../../data/figma-embeds";
import type { Language } from "../../lib/i18n";
import { Badge } from "../ui/badge";

export interface FigmaEmbedProps {
  config: FigmaEmbedConfig;
  language: Language;
  sectionId?: string;
  className?: string;
}

export function FigmaEmbed({
  config,
  language,
  sectionId = config.id,
  className,
}: FigmaEmbedProps) {
  const copy = config.copy[language];
  const opensNewTab =
    language === "es" ? "se abre en una pestaña nueva" : "opens in a new tab";
  const embedSrc = toFigmaEmbedUrl(config.shareUrl);
  const needle = config.shareUrl.includes("figma.com/")
    ? config.shareUrl.split("figma.com/")[1]?.split("?")[0]
    : config.id;

  return (
    <section
      id={sectionId}
      aria-labelledby={`${sectionId}-heading`}
      className={className}
    >
      <div className="mb-6 space-y-2">
        <Badge variant="outline" className="border-primary/25 text-foreground">
          {config.kind === "board" ? "FigJam" : "Figma Slides"}
        </Badge>
        <h2
          id={`${sectionId}-heading`}
          className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground"
        >
          {copy.title}
        </h2>
        <p className="max-w-3xl text-muted-foreground">{copy.subtitle}</p>
      </div>

      <p id={`${sectionId}-description`} className="sr-only">
        {copy.embedDescription}
      </p>

      <div className="overflow-hidden rounded-xl border border-[color:var(--logo-surface-border)] bg-card shadow-md">
        <iframe
          width="100%"
          height={config.embedHeight ?? 450}
          src={embedSrc}
          title={copy.embedTitle}
          aria-describedby={`${sectionId}-description`}
          className="w-full border-0"
          loading="lazy"
          allowFullScreen
        />
      </div>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        <a
          href={config.shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
          aria-label={`${copy.openLabel} (${opensNewTab})`}
          data-figma-embed={needle}
        >
          {copy.openLabel} →
        </a>
      </p>
    </section>
  );
}