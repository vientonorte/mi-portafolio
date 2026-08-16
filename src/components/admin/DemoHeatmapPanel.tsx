import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Flame } from "lucide-react";
import { SERVICE_PATH_DEMOS, type ServicePathId } from "../../data/service-path-demos";
import type { DemoHeatBucket } from "../../lib/admin-api";
import { ROUTES } from "../../lib/routes";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const COLS = 32;
const ROWS = 18;
const PATHS = SERVICE_PATH_DEMOS.map((d) => d.id);

function maxCell(grid: number[]) {
  return grid.reduce((m, n) => (n > m ? n : m), 0);
}

export function DemoHeatmapPanel({
  paths,
}: {
  paths: Record<string, DemoHeatBucket>;
}) {
  const [active, setActive] = useState<ServicePathId>("diagnostic");
  const bucket = paths[active];
  const peak = bucket ? maxCell(bucket.grid) : 0;
  const demo = SERVICE_PATH_DEMOS.find((d) => d.id === active);

  const cells = useMemo(() => {
    if (!bucket) return [];
    return bucket.grid.map((value, i) => ({
      i,
      value,
      opacity: peak ? 0.08 + (value / peak) * 0.82 : 0,
    }));
  }, [bucket, peak]);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Clics en el chrome de la demo (gate, reloj, CTAs). El iframe del producto
        es otro origen: no se ve el interior.
      </p>
      <div className="flex flex-wrap gap-2">
        {PATHS.map((id) => {
          const hits = paths[id]?.counts.click ?? 0;
          const starts = paths[id]?.counts.start ?? 0;
          return (
            <Button
              key={id}
              type="button"
              size="sm"
              variant={active === id ? "default" : "outline"}
              className="min-h-11"
              onClick={() => setActive(id)}
            >
              {id}
              <Badge variant="secondary" className="ml-2">
                {starts} / {hits}
              </Badge>
            </Button>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Flame className="h-4 w-4" aria-hidden />
              Heatmap · {demo?.caption.es ?? active}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="relative aspect-[16/10] overflow-hidden rounded-lg border bg-muted"
              role="img"
              aria-label={`Mapa de clics de la demo ${active}`}
            >
              {demo ? (
                <img
                  src={demo.poster}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover object-top opacity-50"
                />
              ) : null}
              <div
                className="absolute inset-0 grid"
                style={{
                  gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                  gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
                }}
              >
                {cells.map((cell) => (
                  <span
                    key={cell.i}
                    className="bg-primary"
                    style={{ opacity: cell.value ? cell.opacity : 0 }}
                  />
                ))}
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {bucket?.updatedAt
                ? `Último hit ${new Date(bucket.updatedAt).toLocaleString("es-CL")}`
                : "Sin hits todavía. Abrí la demo y hacé clic en Start / CTAs."}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Acciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Stat label="Start" value={bucket?.counts.start} />
            <Stat label="Fin (reloj)" value={bucket?.counts.end} />
            <Stat label="Pausa" value={bucket?.counts.pause} />
            <Stat label="+1 min" value={bucket?.counts.add_minute} />
            <Stat label="CTA agenda" value={bucket?.counts.cta_schedule} />
            <Stat label="CTA consultoría" value={bucket?.counts.cta_consult} />
            <Stat label="Clics chrome" value={bucket?.counts.click} />
            <Button asChild variant="outline" className="mt-2 min-h-11 w-full">
              <Link to={ROUTES.serviceDemo(active)}>Abrir demo</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value?: number }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono tabular-nums">{value ?? 0}</span>
    </div>
  );
}
