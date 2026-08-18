import { ExternalLink } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  CONTACT_URL,
  FINANZAS_URL,
  P0_WRANGLER,
  type ContactSurface,
  type FinanzasSurface,
} from "../../lib/admin-surfaces";

type SurfaceCardsProps = {
  finanzas: FinanzasSurface | null;
  contact: ContactSurface | null;
};

export function SurfaceCards({ finanzas, contact }: SurfaceCardsProps) {
  const stale = finanzas?.stale !== false;
  const updated = finanzas?.updated ?? "NO DATO";

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <a
        href={FINANZAS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Card className="h-full transition-colors group-hover:border-primary/40">
          <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">finanzas.vientonorte.io</CardTitle>
            <Badge variant={stale ? "destructive" : "secondary"}>
              {finanzas == null ? "…" : stale ? "stale" : "ok"}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">
              <span className="text-muted-foreground">updated </span>
              <span className="font-mono tabular-nums">{updated}</span>
            </p>
            {finanzas != null && stale ? (
              <p className="text-sm">
                P0 <code className="rounded bg-muted px-1 py-0.5 text-xs">{P0_WRANGLER}</code>
              </p>
            ) : null}
            <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              Abrir subdominio
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </p>
          </CardContent>
        </Card>
      </a>

      <a
        href={CONTACT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Card className="h-full transition-colors group-hover:border-primary/40">
          <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">contact.vientonorte.io</CardTitle>
            <Badge variant={contact?.ok === true ? "secondary" : "outline"}>
              {contact == null ? "…" : contact.ok === true ? "ok" : "NO DATO"}
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              Abrir subdominio
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </p>
          </CardContent>
        </Card>
      </a>
    </div>
  );
}
