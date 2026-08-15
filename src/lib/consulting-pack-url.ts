import type { ConsultingPackageId } from "../data/vientonorte-consulting";

const PACKS = new Set<ConsultingPackageId>(["radar", "marco", "ops"]);

export function isConsultingPackageId(
  value: string | null | undefined
): value is ConsultingPackageId {
  return Boolean(value && PACKS.has(value as ConsultingPackageId));
}

/** Lee `pack` de `?pack=radar` (HashRouter: query después del hash). */
export function parsePackFromSearch(
  search: string
): ConsultingPackageId | undefined {
  const raw = new URLSearchParams(
    search.startsWith("?") ? search.slice(1) : search
  ).get("pack");
  return isConsultingPackageId(raw) ? raw : undefined;
}

/** Appointment Schedule: Rö añade el campo pack; el query llega en la URL. */
export function withPackQuery(
  url: string,
  pack?: ConsultingPackageId
): string {
  if (!pack) return url;
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("pack", pack);
    return parsed.toString();
  } catch {
    const join = url.includes("?") ? "&" : "?";
    return `${url}${join}pack=${pack}`;
  }
}
