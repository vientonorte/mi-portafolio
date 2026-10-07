/**
 * Demo del dashboard de caja · ROUTES.digitalizacionDemo (/#/digitalizacion/demo).
 * DATOS DE EJEMPLO: pyme ficticia (src/data/digitalizacion-sample-movements.json),
 * con la forma de los objetos account/movement de Fintoc. Sin datos bancarios reales.
 * El JSON va empaquetado en el bundle (sin fetch → sin rutas relativas que romper).
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Info, MessageCircle } from "lucide-react";
import { SEOHead } from "../components/atoms/SEOHead";
import { canonicalFromPath } from "../lib/seo";
import { ROUTES } from "../lib/routes";
import { SAMPLE_BUSINESS_NAME, samplePayload } from "../lib/digitalizacion/sample";
import {
  aggregateMonthly,
  categorize,
  formatCLP,
  formatDay,
  formatMonth,
  monthKey,
  topCategories,
  type MonthlyTotals,
} from "../lib/digitalizacion/cashflow";
import {
  DIGITALIZACION_DEMO_WA_TEXT,
  trackDigitalizacionCta,
  trackDigitalizacionDemoView,
  trackDigitalizacionWhatsapp,
  whatsappUrl,
} from "../lib/digitalizacion/offer";

const IN_CLASS = "fill-emerald-700 dark:fill-emerald-400";
const OUT_CLASS = "fill-rose-700 dark:fill-rose-400";

function MonthlyChart({ months }: { months: MonthlyTotals[] }) {
  const max = Math.max(1, ...months.flatMap((m) => [m.inflow, m.outflow]));
  const W = 640;
  const H = 240;
  const pad = { top: 12, bottom: 32, left: 8, right: 8 };
  const groupW = (W - pad.left - pad.right) / Math.max(1, months.length);
  const barW = Math.min(36, groupW / 3);
  const y = (v: number) => pad.top + (H - pad.top - pad.bottom) * (1 - v / max);
  const summary = months
    .map((m) => `${formatMonth(m.month)}: entradas ${formatCLP(m.inflow)}, salidas ${formatCLP(m.outflow)}`)
    .join("; ");

  return (
    <figure className="m-0">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`Flujo mensual. ${summary}`}>
        <line x1={pad.left} x2={W - pad.right} y1={H - pad.bottom} y2={H - pad.bottom} className="stroke-border" strokeWidth={1} />
        {months.map((m, i) => {
          const cx = pad.left + groupW * i + groupW / 2;
          return (
            <g key={m.month}>
              <rect x={cx - barW - 2} y={y(m.inflow)} width={barW} height={H - pad.bottom - y(m.inflow)} rx={3} className={IN_CLASS} />
              <rect x={cx + 2} y={y(m.outflow)} width={barW} height={H - pad.bottom - y(m.outflow)} rx={3} className={OUT_CLASS} />
              <text x={cx} y={H - 10} textAnchor="middle" className="fill-muted-foreground text-[13px]">
                {formatMonth(m.month)}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <svg width="12" height="12" aria-hidden><rect width="12" height="12" rx="2" className={IN_CLASS} /></svg>
          Entradas
        </span>
        <span className="inline-flex items-center gap-2">
          <svg width="12" height="12" aria-hidden><rect width="12" height="12" rx="2" className={OUT_CLASS} /></svg>
          Salidas
        </span>
      </figcaption>
      <table className="sr-only">
        <caption>Entradas, salidas y flujo neto por mes</caption>
        <thead>
          <tr><th scope="col">Mes</th><th scope="col">Entradas</th><th scope="col">Salidas</th><th scope="col">Neto</th></tr>
        </thead>
        <tbody>
          {months.map((m) => (
            <tr key={m.month}>
              <th scope="row">{formatMonth(m.month)}</th>
              <td>{formatCLP(m.inflow)}</td>
              <td>{formatCLP(m.outflow)}</td>
              <td>{formatCLP(m.net)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

function Kpi({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 text-card-foreground">
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-xl font-black tabular-nums sm:text-2xl">{value}</dd>
      {hint ? <dd className="mt-1 text-xs text-muted-foreground">{hint}</dd> : null}
    </div>
  );
}

export default function DigitalizacionDemo() {
  const data = useMemo(() => samplePayload(), []);
  const { account, movements } = data;
  const months = useMemo(() => aggregateMonthly(movements), [movements]);
  const topOut = useMemo(() => topCategories(movements, "outflow", 6), [movements]);
  const topIn = useMemo(() => topCategories(movements, "inflow", 3), [movements]);
  const last = months[months.length - 1];
  const totalNet = months.reduce((s, m) => s + m.net, 0);
  const pendingCount = movements.filter((m) => m.pending).length;

  const monthOptions = useMemo(() => [...months].reverse().map((m) => m.month), [months]);
  const [monthFilter, setMonthFilter] = useState<string>(monthOptions[0] ?? "all");
  const rows = useMemo(
    () => movements.filter((m) => monthFilter === "all" || monthKey(m) === monthFilter),
    [movements, monthFilter]
  );

  useEffect(() => {
    trackDigitalizacionDemoView(data.sample);
  }, [data.sample]);

  return (
    <div className="digitalizacion-demo min-h-screen bg-background text-foreground" data-surface="digitalizacion-demo" data-sample={String(data.sample)}>
      <SEOHead
        title="Demo dashboard de caja (datos de ejemplo)"
        description="Demo del dashboard mensual de caja de Viento Norte con datos de ejemplo de una pyme ficticia: saldo, flujo mensual, gastos por categoría y movimientos."
        url={canonicalFromPath(ROUTES.digitalizacionDemo)}
        noIndex
      />

      <div
        role="note"
        data-testid="sample-banner"
        className="sticky top-0 z-20 border-b border-amber-300 bg-amber-100 px-4 py-2 text-center text-sm font-semibold text-amber-950"
      >
        <Info className="mr-1 inline h-4 w-4 align-[-2px]" aria-hidden />
        Datos de ejemplo · pyme ficticia, ningún dato bancario es real
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6">
        <Link
          to={ROUTES.digitalizacion}
          className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-foreground underline underline-offset-4"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Volver a Digitalización de tu negocio
        </Link>

        <header className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight sm:text-4xl">Dashboard de caja</h1>
            <p className="mt-1 text-base text-muted-foreground">
              {SAMPLE_BUSINESS_NAME} · {account.name} {account.institution?.name ?? ""}
            </p>
          </div>
          <a
            href={whatsappUrl(DIGITALIZACION_DEMO_WA_TEXT)}
            target="_blank"
            rel="noopener noreferrer"
            data-digitalizacion-cta="demo-header"
            onClick={() => {
              trackDigitalizacionCta("demo-header", "whatsapp");
              trackDigitalizacionWhatsapp("demo-header");
            }}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--vn-primitive-azul-noche,#0d1b3d)] px-5 py-3 text-base font-semibold text-white dark:bg-[var(--vn-primitive-marfil,#f7f2e7)] dark:text-[#0d1b3d] hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            Quiero esto con mis datos
          </a>
        </header>

        <section aria-labelledby="dig-kpis" className="mt-6">
          <h2 id="dig-kpis" className="sr-only">Resumen</h2>
          <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4" data-testid="demo-kpis">
            <Kpi label="Saldo actual" value={formatCLP(account.balance.current)} hint={`Disponible ${formatCLP(account.balance.available)}`} />
            <Kpi label={`Entradas ${last ? formatMonth(last.month) : ""}`} value={formatCLP(last?.inflow ?? 0)} />
            <Kpi label={`Salidas ${last ? formatMonth(last.month) : ""}`} value={formatCLP(last?.outflow ?? 0)} />
            <Kpi label={`Flujo neto ${months.length} meses`} value={formatCLP(totalNet)} hint={pendingCount ? `${pendingCount} movimiento(s) pendiente(s) no incluidos` : undefined} />
          </dl>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          <section aria-labelledby="dig-flujo" className="rounded-2xl border border-border p-4 sm:p-6 lg:col-span-3">
            <h2 id="dig-flujo" className="text-lg font-bold">Flujo mensual</h2>
            <div className="mt-4">
              <MonthlyChart months={months} />
            </div>
          </section>

          <section aria-labelledby="dig-cats" className="rounded-2xl border border-border p-4 sm:p-6 lg:col-span-2">
            <h2 id="dig-cats" className="text-lg font-bold">Gastos por categoría</h2>
            <ul className="mt-4 space-y-3" data-testid="demo-top-categories">
              {topOut.map((c) => (
                <li key={c.category}>
                  <div className="flex justify-between gap-2 text-sm">
                    <span className="font-medium">{c.category}</span>
                    <span className="tabular-nums text-muted-foreground">
                      {formatCLP(c.total)} · {Math.round(c.share * 100)}%
                    </span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-muted" aria-hidden>
                    <div className="h-2 rounded-full bg-rose-700 dark:bg-rose-400" style={{ width: `${Math.max(2, c.share * 100)}%` }} />
                  </div>
                </li>
              ))}
            </ul>
            <h3 className="mt-6 text-base font-bold">Ingresos por origen</h3>
            <ul className="mt-2 space-y-1 text-sm">
              {topIn.map((c) => (
                <li key={c.category} className="flex justify-between gap-2">
                  <span>{c.category}</span>
                  <span className="tabular-nums text-muted-foreground">{formatCLP(c.total)} · {Math.round(c.share * 100)}%</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section aria-labelledby="dig-movs" className="mt-6 rounded-2xl border border-border p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 id="dig-movs" className="text-lg font-bold">Movimientos</h2>
            <label className="flex items-center gap-2 text-sm">
              <span>Mes</span>
              <select
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                className="min-h-11 rounded-lg border border-border bg-background px-3 text-foreground"
              >
                {monthOptions.map((m) => (
                  <option key={m} value={m}>{formatMonth(m)}</option>
                ))}
                <option value="all">Todos</option>
              </select>
            </label>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm" data-testid="demo-movements">
              <caption className="sr-only">Movimientos de la cuenta ({rows.length})</caption>
              <thead className="border-b border-border text-muted-foreground">
                <tr>
                  <th scope="col" className="py-2 pr-3 font-semibold">Fecha</th>
                  <th scope="col" className="py-2 pr-3 font-semibold">Descripción</th>
                  <th scope="col" className="py-2 pr-3 font-semibold">Categoría</th>
                  <th scope="col" className="py-2 text-right font-semibold">Monto</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((m) => (
                  <tr key={m.id} className="border-b border-border/60">
                    <td className="py-2 pr-3 tabular-nums">{formatDay(m.transaction_date ?? m.post_date)}</td>
                    <td className="py-2 pr-3">
                      {m.description}
                      {m.pending ? <span className="ml-2 rounded bg-muted px-1.5 py-0.5 text-xs">Pendiente</span> : null}
                    </td>
                    <td className="py-2 pr-3 text-muted-foreground">{categorize(m)}</td>
                    <td className={`py-2 text-right font-semibold tabular-nums ${m.amount >= 0 ? "text-emerald-800 dark:text-emerald-300" : "text-rose-800 dark:text-rose-300"}`}>
                      {m.amount >= 0 ? "+" : "−"}{formatCLP(Math.abs(m.amount))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <p className="mt-6 text-sm text-muted-foreground">
          Categorías asignadas por reglas simples sobre la descripción del movimiento. En la versión real los datos
          vienen de tu banco vía la API de Fintoc (Movements), con tu autorización.
        </p>
      </div>
    </div>
  );
}
