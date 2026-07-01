import type { SubpageCrumb } from "../components/molecules/SubpageToolbar";

/** Antepone Inicio a cualquier trail de subpágina. */
export function withHomeCrumb(
  homeLabel: string,
  onHome: () => void,
  crumbs: SubpageCrumb[]
): SubpageCrumb[] {
  return [{ label: homeLabel, onClick: onHome }, ...crumbs];
}