import { ExternalLink } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ADMIN_ROADMAP,
  ADMIN_ROADMAP_UPDATED,
  type RoadmapStatus,
} from "../../data/admin-roadmap";

const VARIANT: Record<RoadmapStatus, "default" | "secondary" | "outline" | "destructive"> = {
  now: "default",
  next: "secondary",
  blocked: "destructive",
  done: "outline",
};

export function RoadmapPanel() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Roadmap VN</CardTitle>
        <p className="font-mono text-xs text-muted-foreground">
          {ADMIN_ROADMAP_UPDATED}
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {ADMIN_ROADMAP.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-border/60 px-3 py-3"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={VARIANT[item.status]}>{item.status}</Badge>
              {item.href ? (
                <a
                  href={item.href}
                  className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
                >
                  {item.title}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              ) : (
                <p className="text-sm font-medium">{item.title}</p>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{item.notes}</p>
          </div>
        ))}
        <p className="text-xs text-muted-foreground">
          Detalle ops:{" "}
          <a
            className="underline"
            href="https://vientonorte.io/ops/"
          >
            vientonorte.io/ops
          </a>
          {" · "}
          DS Fintoc: vault{" "}
          <code>Sprints/DS-2026-08-28-fintoc-bdp.md</code>
        </p>
      </CardContent>
    </Card>
  );
}
