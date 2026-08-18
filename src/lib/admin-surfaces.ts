/** Hub Option A: cards → subdominios. Calendar Método Ro 18 ago. Sin iframe. */

export const CALENDAR_DAY = "2026-08-18";
export const P0_WRANGLER = "wrangler deploy --keep-vars";

export const FINANZAS_URL = "https://finanzas.vientonorte.io/";
export const FINANZAS_LEDGER_URL = "https://finanzas.vientonorte.io/ledger.json";
export const CONTACT_URL = "https://contact.vientonorte.io/";
export const CONTACT_HEALTH_URL = "https://contact.vientonorte.io/api/health";

export type FinanzasSurface = {
  updated: string | null;
  stale: boolean;
  evidence: string;
};

export type ContactSurface = {
  ok: boolean | null;
  evidence: string;
};

export function datePrefix(iso: string): string {
  return iso.length >= 10 ? iso.slice(0, 10) : iso;
}

/** stale si `updated` no es el día Calendar (Decider 2026-08-18). Missing = stale. */
export function isFinanzasStale(
  updated: string | null | undefined,
  calendarDay = CALENDAR_DAY
): boolean {
  if (!updated) return true;
  return datePrefix(updated) !== calendarDay;
}

export async function fetchFinanzasSurface(
  fetcher: typeof fetch = fetch
): Promise<FinanzasSurface> {
  try {
    const res = await fetcher(FINANZAS_LEDGER_URL, { cache: "no-store" });
    if (!res.ok) {
      return { updated: null, stale: true, evidence: `HTTP ${res.status}` };
    }
    const data = (await res.json()) as { meta?: { updated?: unknown } };
    const updated = typeof data?.meta?.updated === "string" ? data.meta.updated : null;
    return {
      updated,
      stale: isFinanzasStale(updated),
      evidence: updated ?? "NO DATO",
    };
  } catch {
    return { updated: null, stale: true, evidence: "NO DATO" };
  }
}

export async function fetchContactHealth(
  fetcher: typeof fetch = fetch
): Promise<ContactSurface> {
  try {
    const res = await fetcher(CONTACT_HEALTH_URL, { cache: "no-store" });
    if (!res.ok) {
      return { ok: false, evidence: `HTTP ${res.status}` };
    }
    const data = (await res.json()) as { ok?: unknown };
    return {
      ok: data?.ok === true,
      evidence: data?.ok === true ? "ok" : "not ok",
    };
  } catch {
    return { ok: null, evidence: "NO DATO" };
  }
}
