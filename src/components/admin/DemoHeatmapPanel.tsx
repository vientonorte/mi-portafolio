import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Flame } from "lucide-react";
import { SERVICE_PATH_DEMOS, type ServicePathId } from "../../data/service-path-demos";
import { CONSULTORIA_DEMOS, type ConsultoriaDemoId } from "../../data/consultoria-demos";
import { consultoriaDemoPoster } from "../../lib/consultoria-demo-poster";
import type { DemoHeatBucket } from "../../lib/admin-api";
import { ROUTES } from "../../lib/routes";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const COLS = 32;
const ROWS = 18;

type DemoHeatId = ServicePathId | ConsultoriaDemoId;

type HeatEntry = {
  id: DemoHeatId;
  caption: string;
  poster: string;
  /** Solo las demos con reloj tienen ruta `/demo/:pathId` */
  timedRoute: boolean;
};

const ENTRIES: HeatEntry[] = [
  ...SERVICE_PATH_DEMOS.map((d) => ({
    id: d.id,
    caption: d.caption.es,
    poster: d.poster,
    timedRoute: true,
  })),
  ...CONSULTORIA_DEMOS.map((d) => ({
    id: d.id,
    caption: d.label,
    poster: consultoriaDemoPoster(d),
    timedRoute: false,
  })),
];

const PATHS = ENTRIES.map((e) => e.id);

function maxCell(grid: number[]) {
  return grid.reduce((m, n) => (n > m ? n : m), 0);
}

function fmtMs(ms: number) {
  if (!ms) return "0s";
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m ${s % 60}s`;
}

export function DemoHeatmapPanel({
  paths,
}: {
  paths: Record<string, DemoHeatBucket>;
}) {
  const [active, setActive] = useState<DemoHeatId>("diagnostic");
  const bucket = paths[active];
  const peak = bucket ? maxCell(bucket.grid) : 0;
  const demo = ENTRIES.find((d) => d.id === active);
  const sess = bucket?.sessions;
  const started = sess?.started ?? bucket?.counts.start ?? 0;
  const dwell = sess?.dwellMs ?? 0;
  const avg = started ? dwell / started : 0;

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
        Sesión real: vista, start, tiempo en vivo, abandono y CTAs. El mapa
        son clics y movimiento sobre el poster / chrome VN. Un iframe de
        Figma Sites no se puede leer (otro origen).
      </p>
      <div className="flex flex-wrap gap-2">
        {PATHS.map((id) => {
          const n = paths[id]?.sessions?.started ?? paths[id]?.counts.start ?? 0;
          const d = paths[id]?.sessions?.dwellMs ?? 0;
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
                {n} · {fmtMs(d)}
              </Badge>
            </Button>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Metric label="Sesiones start" value={String(started)} />
        <Metric label="Tiempo medio" value={fmtMs(avg)} />
        <Metric
          label="Fin / abandono / CTA"
          value={`${sess?.ended ?? 0} / ${sess?.left ?? 0} / ${sess?.cta ?? 0}`}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Flame className="h-4 w-4" aria-hidden />
              Mapa · {demo?.caption ?? active}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="relative aspect-[16/10] overflow-hidden rounded-lg border bg-muted"
              role="img"
              aria-label={`Mapa de la demo ${active}`}
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
              {peak
                ? `Último hit ${
                    bucket?.updatedAt
                      ? new Date(bucket.updatedAt).toLocaleString("es-CL")
                      : "—"
                  }`
                : "Mapa vacío: no hubo clics en el poster. Abrí la demo, tocá la imagen, esperá 5 s y volvé."}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Eventos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Stat label="Vistas gate" value={bucket?.counts.view} />
            <Stat label="Start" value={bucket?.counts.start} />
            <Stat label="Tick 5s" value={bucket?.counts.tick as number | undefined} />
            <Stat label="Abandono" value={bucket?.counts.leave} />
            <Stat label="Fin reloj" value={bucket?.counts.end} />
            <Stat label="CTA agenda" value={bucket?.counts.cta_schedule} />
            <Stat label="CTA consultoría" value={bucket?.counts.cta_consult} />
            <Stat label="Clics poster/chrome" value={bucket?.counts.click} />
            <Button asChild variant="outline" className="mt-2 min-h-11 w-full">
              {demo?.timedRoute ? (
                <Link to={ROUTES.serviceDemo(active as ServicePathId)}>Abrir demo</Link>
              ) : (
                <Link to={`${ROUTES.home}#consultoria-demo?demo=${active}`}>Ver mockup</Link>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardHeader className="pb-1">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold tabular-nums">{value}</p>
      </CardContent>
    </Card>
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
