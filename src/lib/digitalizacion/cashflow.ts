/**
 * Dashboard de caja · /#/digitalizacion/demo
 * Lógica pura (sin DOM ni red): categorización por reglas simples sobre
 * `description` y agregación mensual de movimientos con la forma del objeto
 * `movement` de Fintoc (https://docs.fintoc.com/reference/movements-object).
 */

export interface FintocInstitution {
  id: string;
  name: string;
  country: string;
}

export interface FintocCounterpartyAccount {
  holder_id: string | null;
  holder_name: string | null;
  number: string | null;
  institution: FintocInstitution | null;
}

export interface FintocMovement {
  id: string;
  object?: "movement";
  /** Entero en CLP. Positivo = entrada, negativo = salida. */
  amount: number;
  currency: string;
  description: string;
  post_date: string;
  transaction_date: string | null;
  type: "transfer" | "check" | "other" | string;
  pending: boolean;
  reference_id?: string | null;
  sender_account: FintocCounterpartyAccount | null;
  recipient_account: FintocCounterpartyAccount | null;
  comment?: string | null;
}

export interface FintocAccount {
  id: string;
  name: string;
  official_name?: string;
  number: string;
  holder_name?: string;
  currency: string;
  type?: string;
  institution?: FintocInstitution;
  balance: { available: number; current: number; limit: number };
  refreshed_at?: string | null;
}

export type Direction = "inflow" | "outflow";

interface CategoryRule {
  category: string;
  direction: Direction;
  pattern: RegExp;
}

/** Orden = prioridad. La primera regla que calza gana. */
export const CATEGORY_RULES: CategoryRule[] = [
  { category: "Ventas con tarjeta", direction: "inflow", pattern: /mercado\s*pago|transbank|getnet|sumup|abono ventas|ventas/i },
  { category: "Transferencias de clientes", direction: "inflow", pattern: /transferencia de|transf\.? de|abono de|pago fintoc/i },
  { category: "Remuneraciones", direction: "outflow", pattern: /remuneraci|sueldo|n[oó]mina|honorario/i },
  { category: "Previsión (Previred)", direction: "outflow", pattern: /previred|imposiciones|afp|isapre/i },
  { category: "Impuestos (SII)", direction: "outflow", pattern: /\bsii\b|f29|tesorer[ií]a|impuesto/i },
  { category: "Arriendo", direction: "outflow", pattern: /arriendo|alquiler/i },
  { category: "Proveedores", direction: "outflow", pattern: /proveedor|distribuidora|mayorista|insumos/i },
  { category: "Servicios básicos", direction: "outflow", pattern: /enel|cge|aguas|esval|metrogas|lipigas|abastible|entel|movistar|vtr|wom|claro|internet|\bluz\b|\bagua\b/i },
  { category: "Comisiones bancarias", direction: "outflow", pattern: /comisi[oó]n|mantenci[oó]n|cargo banco|intereses/i },
];

export const FALLBACK_CATEGORY: Record<Direction, string> = {
  inflow: "Otros ingresos",
  outflow: "Otros gastos",
};

export function directionOf(movement: Pick<FintocMovement, "amount">): Direction {
  return movement.amount >= 0 ? "inflow" : "outflow";
}

/** Categoriza por reglas simples. La dirección (signo del monto) filtra las reglas. */
export function categorize(movement: Pick<FintocMovement, "amount" | "description">): string {
  const direction = directionOf(movement);
  const text = movement.description ?? "";
  const rule = CATEGORY_RULES.find((r) => r.direction === direction && r.pattern.test(text));
  return rule ? rule.category : FALLBACK_CATEGORY[direction];
}

/** `YYYY-MM` del día de la transacción (fecha local del banco, sin conversión de zona). */
export function monthKey(movement: Pick<FintocMovement, "transaction_date" | "post_date">): string {
  return (movement.transaction_date ?? movement.post_date).slice(0, 7);
}

export interface MonthlyTotals {
  month: string;
  inflow: number;
  outflow: number;
  net: number;
  count: number;
}

/**
 * Totales por mes (orden cronológico). `outflow` va en positivo.
 * Excluye movimientos `pending` salvo que se pida lo contrario.
 */
export function aggregateMonthly(
  movements: FintocMovement[],
  { includePending = false }: { includePending?: boolean } = {}
): MonthlyTotals[] {
  const byMonth = new Map<string, MonthlyTotals>();
  for (const m of movements) {
    if (m.pending && !includePending) continue;
    const key = monthKey(m);
    const row = byMonth.get(key) ?? { month: key, inflow: 0, outflow: 0, net: 0, count: 0 };
    if (m.amount >= 0) row.inflow += m.amount;
    else row.outflow += -m.amount;
    row.net += m.amount;
    row.count += 1;
    byMonth.set(key, row);
  }
  return [...byMonth.values()].sort((a, b) => a.month.localeCompare(b.month));
}

export interface CategoryTotal {
  category: string;
  total: number;
  count: number;
  share: number;
}

/** Top de categorías por dirección (montos en positivo), excluye pendientes. */
export function topCategories(
  movements: FintocMovement[],
  direction: Direction,
  limit = 5
): CategoryTotal[] {
  const totals = new Map<string, { total: number; count: number }>();
  let grand = 0;
  for (const m of movements) {
    if (m.pending || directionOf(m) !== direction) continue;
    const cat = categorize(m);
    const abs = Math.abs(m.amount);
    const t = totals.get(cat) ?? { total: 0, count: 0 };
    t.total += abs;
    t.count += 1;
    totals.set(cat, t);
    grand += abs;
  }
  return [...totals.entries()]
    .map(([category, t]) => ({ category, ...t, share: grand ? t.total / grand : 0 }))
    .sort((a, b) => b.total - a.total)
    .slice(0, limit);
}

const clp = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

export function formatCLP(amount: number): string {
  return clp.format(amount);
}

const MONTHS_ES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

/** `2026-09` → `sep 2026` */
export function formatMonth(key: string): string {
  const [y, m] = key.split("-");
  return `${MONTHS_ES[Number(m) - 1] ?? m} ${y}`;
}

/** `2026-09-25T12:00:00-03:00` → `25-09-2026` (sin conversión de zona). */
export function formatDay(iso: string | null): string {
  if (!iso) return "—";
  const [y, m, d] = iso.slice(0, 10).split("-");
  return `${d}-${m}-${y}`;
}
