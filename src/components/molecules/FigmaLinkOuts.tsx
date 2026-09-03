import { ExternalLink } from "lucide-react";
import type { UpcomingFigmaLink } from "../../data/upcoming-cases";

export function FigmaLinkOuts({
  links,
  openLabel,
  dataAttribute,
}: {
  links: UpcomingFigmaLink[];
  openLabel: string;
  dataAttribute?: { name: string; value: string };
}) {
  if (!links.length) return null;

  return (
    <ul className="mt-4 flex flex-col gap-2">
      {links.map((link) => (
        <li key={link.url}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            {...(dataAttribute ? { [dataAttribute.name]: dataAttribute.value } : {})}
            aria-label={`${openLabel}: ${link.label}`}
          >
            {openLabel}
            <span className="text-muted-foreground">· {link.label}</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}
