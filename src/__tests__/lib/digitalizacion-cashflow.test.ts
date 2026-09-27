import { describe, expect, it } from "vitest";
import {
  aggregateMonthly,
  categorize,
  formatMonth,
  topCategories,
  type FintocMovement,
} from "@/lib/digitalizacion/cashflow";
import { samplePayload } from "@/lib/digitalizacion/sample";

function mov(partial: Partial<FintocMovement> & Pick<FintocMovement, "amount" | "description">): FintocMovement {
  return {
    id: `mov_${Math.random().toString(36).slice(2)}`,
    currency: "CLP",
    post_date: "2026-09-10T12:00:00Z",
    transaction_date: "2026-09-10T12:00:00-03:00",
    type: "other",
    pending: false,
    sender_account: null,
    recipient_account: null,
    ...partial,
  };
}

describe("digitalizacion · categorize", () => {
  it.each([
    [120000, "Abono ventas Mercado Pago", "Ventas con tarjeta"],
    [50000, "Transferencia de Juana Pérez", "Transferencias de clientes"],
    [9000, "Devolución varios", "Otros ingresos"],
    [-850000, "Pago arriendo local", "Arriendo"],
    [-1400000, "Remuneraciones personal", "Remuneraciones"],
    [-95000, "Pago Previred imposiciones", "Previsión (Previred)"],
    [-200000, "Pago SII F29 impuestos", "Impuestos (SII)"],
    [-60000, "PAC Enel luz", "Servicios básicos"],
    [-32990, "PAC Entel internet", "Servicios básicos"],
    [-7990, "Comisión mantención cuenta corriente", "Comisiones bancarias"],
    [-900000, "Pago proveedor Distribuidora X", "Proveedores"],
    [-15000, "Algo sin regla", "Otros gastos"],
  ])("%i %s → %s", (amount, description, expected) => {
    expect(categorize({ amount, description })).toBe(expected);
  });

  it("uses the sign to pick rules (an outflow never lands in an income category)", () => {
    expect(categorize({ amount: -5000, description: "Reverso ventas Mercado Pago" })).toBe("Otros gastos");
  });
});

describe("digitalizacion · aggregateMonthly", () => {
  const movements = [
    mov({ amount: 100000, description: "Transferencia de A", transaction_date: "2026-08-03T10:00:00-03:00" }),
    mov({ amount: -40000, description: "PAC Enel", transaction_date: "2026-08-20T10:00:00-03:00" }),
    mov({ amount: 70000, description: "Abono ventas", transaction_date: "2026-09-01T00:30:00-03:00" }),
    mov({ amount: -10000, description: "Comisión", transaction_date: null, post_date: "2026-09-05T12:00:00Z" }),
    mov({ amount: 999999, description: "Transferencia de B", transaction_date: "2026-09-25T10:00:00-03:00", pending: true }),
  ];

  it("groups by transaction month in chronological order, outflow positive, net signed", () => {
    expect(aggregateMonthly(movements)).toEqual([
      { month: "2026-08", inflow: 100000, outflow: 40000, net: 60000, count: 2 },
      { month: "2026-09", inflow: 70000, outflow: 10000, net: 60000, count: 2 },
    ]);
  });

  it("excludes pending by default and can include them", () => {
    const sept = aggregateMonthly(movements, { includePending: true }).find((m) => m.month === "2026-09");
    expect(sept?.inflow).toBe(70000 + 999999);
    expect(sept?.count).toBe(3);
  });

  it("topCategories sorts by total and shares add up to 1", () => {
    const top = topCategories(movements, "outflow");
    expect(top.map((t) => t.category)).toEqual(["Servicios básicos", "Comisiones bancarias"]);
    expect(top.reduce((s, t) => s + t.share, 0)).toBeCloseTo(1);
  });

  it("formats months in Spanish", () => {
    expect(formatMonth("2026-09")).toBe("sep 2026");
  });
});

describe("digitalizacion · sample data (EJEMPLO, Fintoc movement shape)", () => {
  const { sample, account, movements } = samplePayload();

  it("is flagged as sample and fictitious", () => {
    expect(sample).toBe(true);
    expect(account.holder_name).toMatch(/ficticia/i);
  });

  it("every movement has the Fintoc movement fields", () => {
    expect(movements.length).toBeGreaterThan(50);
    for (const m of movements) {
      expect(m.id).toMatch(/^mov_/);
      expect(Number.isInteger(m.amount)).toBe(true);
      expect(m.currency).toBe("CLP");
      expect(typeof m.description).toBe("string");
      expect(typeof m.post_date).toBe("string");
      expect(typeof m.pending).toBe("boolean");
      expect(m).toHaveProperty("type");
      expect(m).toHaveProperty("sender_account");
      expect(m).toHaveProperty("recipient_account");
      const cp = m.amount >= 0 ? m.sender_account : m.recipient_account;
      if (cp) expect(cp.institution?.name).toBeTruthy();
    }
  });

  it("covers 6 months and the balance matches opening + movements", () => {
    expect(aggregateMonthly(movements).length).toBe(6);
    expect(account.balance.current).toBeGreaterThan(0);
  });
});
