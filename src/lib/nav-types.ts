export type NavItemType = "anchor" | "route" | "external";

export interface NavItem {
  href: string;
  label: string;
  type: NavItemType;
}