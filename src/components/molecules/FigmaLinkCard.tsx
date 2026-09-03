import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import type { Language } from "../../lib/i18n";
import {
  figmaCalorKindLabel,
  type FigmaCalorItem,
} from "../../data/figma-calor";

export interface FigmaLinkCardProps {
  item: FigmaCalorItem;
  language: Language;
  index?: number;
}

export function FigmaLinkCard({ item, language }: FigmaLinkCardProps) {
  const copy = item.copy[language];
  const opensNewTab =
    language === "es" ? "se abre en una pestaña nueva" : "opens in a new tab";
  const kindLabel = figmaCalorKindLabel(item.kind, language);
  const needle = item.shareUrl.includes("figma.com/")
    ? item.shareUrl.split("figma.com/")[1]?.split("?")[0]
    : item.id;

  return (
    <article className="h-full">
      <a
        href={item.shareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-label={`${copy.openLabel}: ${copy.title} (${opensNewTab})`}
        data-figma-calor={item.id}
        data-figma-file={needle}
      >
        <Card className="h-full border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-none transition-colors group-hover:border-primary/40">
          <CardHeader className="space-y-3">
            <Badge variant="outline" className="w-fit border-primary/25 text-foreground">
              {kindLabel}
            </Badge>
            <div>
              <CardTitle className="text-lg md:text-xl">{copy.title}</CardTitle>
              <CardDescription className="mt-1 text-sm leading-relaxed">
                {copy.subtitle}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="inline-flex items-center gap-1 text-sm text-primary">
              {copy.openLabel}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </p>
          </CardContent>
        </Card>
      </a>
    </article>
  );
}
