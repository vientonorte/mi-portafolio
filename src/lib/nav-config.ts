import {
  Briefcase,
  ClipboardCheck,
  FolderOpen,
  Home,
  Mail,
  Sparkles,
  User,
  type LucideIcon,
} from "lucide-react";
import type { NavigateFunction } from "react-router-dom";
import { ROUTES, isProcessPath } from "./routes";
import { VIENTO_NORTE_LINKS } from "./viento-norte-links";
import { navigateToPageSection } from "./navigate-to-section";
import { scrollToSection } from "./scroll-to-section";
import type { NavItem, NavItemType } from "./nav-types";

export type NavItemId =
  | "inicio"
  | "negocios"
  | "experiencia"
  | "consultoria"
  | "auditoria"
  | "proceso"
  | "contacto"
  | "sobre-mi"
  | "design-system"
  | "uxtools";

export type DockNavItemId = Extract<
  NavItemId,
  "inicio" | "negocios" | "consultoria" | "proceso" | "contacto"
>;

/** Slot central elevado del dock (liquid CTA → consultoría). */
export const DOCK_CENTER_ID: DockNavItemId = "consultoria";

export type NavActionKind = "anchor" | "route" | "section" | "contact" | "external";

export interface NavAction {
  kind: NavActionKind;
  target: string;
  homeRoute?: string;
  sectionId?: string;
}

export interface NavLabels {
  home: string;
  projects: string;
  experience: string;
  consulting: string;
  audit: string;
  contact: string;
  about: string;
  designSystem: string;
  uxtools: string;
  more: string;
}

export interface NavRegistryItem {
  id: NavItemId;
  icon: LucideIcon;
  labelKey: keyof NavLabels | "process";
}

/**
 * Design thinking — dock (5 slots, thumb zone):
 * - Inicio / Negocios → recruiter + work-first
 * - Consultoría (centro liquid) → conversión principal
 * - Proceso → método UX
 * - Contacto → cierre
 * Experiencia y auditoría siguen en header / drawer / hero search.
 * Plantillas premium emprendedores: fuera de alcance (próxima sesión).
 */
export const NAV_SURFACE = {
  dock: ["inicio", "negocios", "consultoria", "proceso", "contacto"] as const satisfies readonly DockNavItemId[],
  headerPrimary: ["negocios", "experiencia", "consultoria", "proceso", "contacto"] as const,
  headerMore: ["sobre-mi", "auditoria", "design-system", "uxtools"] as const,
  mobileDrawer: [
    "inicio",
    "negocios",
    "experiencia",
    "consultoria",
    "auditoria",
    "proceso",
    "contacto",
    "sobre-mi",
    "design-system",
    "uxtools",
  ] as const,
} as const;

const NAV_REGISTRY: Record<NavItemId, NavRegistryItem> = {
  inicio: { id: "inicio", icon: Home, labelKey: "home" },
  negocios: { id: "negocios", icon: Briefcase, labelKey: "projects" },
  experiencia: { id: "experiencia", icon: User, labelKey: "experience" },
  consultoria: { id: "consultoria", icon: Sparkles, labelKey: "consulting" },
  auditoria: { id: "auditoria", icon: ClipboardCheck, labelKey: "audit" },
  proceso: { id: "proceso", icon: FolderOpen, labelKey: "process" },
  contacto: { id: "contacto", icon: Mail, labelKey: "contact" },
  "sobre-mi": { id: "sobre-mi", icon: User, labelKey: "about" },
  "design-system": { id: "design-system", icon: FolderOpen, labelKey: "designSystem" },
  uxtools: { id: "uxtools", icon: Sparkles, labelKey: "uxtools" },
};

export function getNavItemLabel(
  id: NavItemId,
  labels: NavLabels,
  processLabel: string
): string {
  const item = NAV_REGISTRY[id];
  if (item.labelKey === "process") return processLabel;
  return labels[item.labelKey];
}

function getStaticNavAction(id: NavItemId): NavAction {
  switch (id) {
    case "negocios":
      return { kind: "route", target: ROUTES.projects };
    case "experiencia":
      return { kind: "section", target: "/sobre-mi", sectionId: "experiencia" };
    case "consultoria":
      return { kind: "route", target: ROUTES.consulting };
    case "auditoria":
      return { kind: "route", target: ROUTES.audit };
    case "proceso":
      return { kind: "route", target: ROUTES.process };
    case "sobre-mi":
      return { kind: "route", target: "/sobre-mi" };
    case "design-system":
      return { kind: "route", target: ROUTES.designSystem };
    case "uxtools":
      return { kind: "external", target: VIENTO_NORTE_LINKS.uxtools };
    default:
      return { kind: "route", target: ROUTES.home };
  }
}

export function getDockNavAction(id: DockNavItemId, variant: "home" | "deep"): NavAction {
  if (id === "inicio") {
    return variant === "home"
      ? { kind: "anchor", target: "#inicio", homeRoute: ROUTES.home }
      : { kind: "route", target: ROUTES.home };
  }
  if (id === "contacto") {
    return variant === "home"
      ? { kind: "anchor", target: "#contacto", homeRoute: ROUTES.home }
      : { kind: "contact", target: ROUTES.contact };
  }
  return getStaticNavAction(id);
}

export function getHeaderNavAction(id: NavItemId): NavAction {
  if (id === "contacto") {
    return { kind: "anchor", target: "#contacto", homeRoute: ROUTES.home };
  }
  return getStaticNavAction(id);
}

export interface ResolvedNavItem {
  id: NavItemId;
  label: string;
  icon: LucideIcon;
  action: NavAction;
  menuType: NavItemType;
  menuHref: string;
}

function navActionToMenuFields(action: NavAction, id: NavItemId): Pick<ResolvedNavItem, "menuType" | "menuHref"> {
  if (action.kind === "external") {
    return { menuType: "external", menuHref: action.target };
  }
  if (action.kind === "anchor") {
    return { menuType: "anchor", menuHref: action.target };
  }
  if (action.kind === "section") {
    return { menuType: "route", menuHref: `${id}-section` };
  }
  if (action.kind === "contact") {
    return { menuType: "route", menuHref: "contacto" };
  }
  return { menuType: "route", menuHref: id };
}

function resolveNavItems(
  ids: readonly NavItemId[],
  labels: NavLabels,
  processLabel: string,
  resolveAction: (id: NavItemId) => NavAction
): ResolvedNavItem[] {
  return ids.map((id) => {
    const registry = NAV_REGISTRY[id];
    const action = resolveAction(id);
    const menu = navActionToMenuFields(action, id);
    return {
      id,
      label: getNavItemLabel(id, labels, processLabel),
      icon: registry.icon,
      action,
      ...menu,
    };
  });
}

export function getDockNavItems(
  variant: "home" | "deep",
  labels: NavLabels,
  processLabel: string
): ResolvedNavItem[] {
  return resolveNavItems(NAV_SURFACE.dock, labels, processLabel, (id) =>
    getDockNavAction(id as DockNavItemId, variant)
  );
}

export function getHeaderPrimaryNavItems(labels: NavLabels, processLabel: string): ResolvedNavItem[] {
  return resolveNavItems(NAV_SURFACE.headerPrimary, labels, processLabel, getHeaderNavAction);
}

export function getHeaderMoreNavItems(labels: NavLabels, processLabel: string): ResolvedNavItem[] {
  return resolveNavItems(NAV_SURFACE.headerMore, labels, processLabel, getStaticNavAction);
}

function patchContactRouteItem(item: ResolvedNavItem): ResolvedNavItem {
  const action: NavAction = { kind: "contact", target: ROUTES.contact };
  return {
    ...item,
    action,
    menuType: "route",
    menuHref: "contacto",
  };
}

export function getMobileDrawerNavItems(
  labels: NavLabels,
  processLabel: string,
  pathname: string = ROUTES.home
): ResolvedNavItem[] {
  const items = resolveNavItems(NAV_SURFACE.mobileDrawer, labels, processLabel, getHeaderNavAction);
  if (pathname === ROUTES.home) return items;
  return items.map((item) => (item.id === "contacto" ? patchContactRouteItem(item) : item));
}

export function getMobileMoreDividerIndex(): number {
  return NAV_SURFACE.mobileDrawer.indexOf("sobre-mi");
}

export function resolvedNavToMenuItem(item: ResolvedNavItem): NavItem {
  return {
    href: item.menuHref,
    label: item.label,
    type: item.menuType,
  };
}

export function getMobileMenuNavItems(labels: NavLabels, processLabel: string): NavItem[] {
  return getMobileDrawerNavItems(labels, processLabel).map(resolvedNavToMenuItem);
}

export interface NavRuntimeCallbacks {
  onNavigateToDesignSystem?: () => void;
  onNavigateToCaseStudies?: () => void;
  onNavigateToAuditoria?: () => void;
}

export interface NavRuntimeContext {
  pathname: string;
  navigate: NavigateFunction;
  pendingScrollRef: { current: string | null };
  callbacks?: NavRuntimeCallbacks;
}

export function executeNavAction(item: ResolvedNavItem, ctx: NavRuntimeContext): void {
  const { action } = item;
  const { pathname, navigate, pendingScrollRef, callbacks } = ctx;

  if (action.kind === "external") {
    window.open(action.target, "_blank", "noopener,noreferrer");
    return;
  }

  if (action.kind === "section") {
    navigateToPageSection(navigate, action.target, action.sectionId!, pathname);
    return;
  }

  if (action.kind === "route" || action.kind === "contact") {
    if (item.id === "design-system") {
      callbacks?.onNavigateToDesignSystem?.();
      return;
    }
    if (item.id === "auditoria") {
      callbacks?.onNavigateToAuditoria?.();
      return;
    }
    navigate(action.target);
    return;
  }

  if (action.kind === "anchor") {
    if (pathname !== ROUTES.home) {
      pendingScrollRef.current = action.target;
      navigate(action.homeRoute ?? ROUTES.home);
      return;
    }
    scrollToSection(action.target);
  }
}

export function isProjectsPath(path: string): boolean {
  return (
    path === ROUTES.projects ||
    path.startsWith("/proyecto/") ||
    path.startsWith("/empresa/")
  );
}

export function matchNavItemActive(
  item: ResolvedNavItem,
  path: string,
  options?: { isOnHome?: boolean; homeSection?: "inicio" | "contacto" }
): boolean {
  const normalized = path.replace(/\/+$/, "") || "/";

  if (item.id === "experiencia" || item.id === "sobre-mi") {
    return normalized === "/sobre-mi";
  }

  if (item.id === "negocios") return isProjectsPath(normalized);
  if (item.id === "proceso") return isProcessPath(normalized);
  if (item.id === "auditoria") return normalized === ROUTES.audit;
  if (item.id === "consultoria") return normalized === ROUTES.consulting;
  if (item.id === "design-system") return normalized === ROUTES.designSystem;

  if (item.action.kind === "contact") {
    return normalized === ROUTES.contact;
  }

  if (item.action.kind === "route") {
    if (item.id === "inicio") return normalized === ROUTES.home;
    return normalized === item.action.target;
  }

  if (item.action.kind === "anchor" && options?.isOnHome) {
    if (item.id === "contacto") return options.homeSection === "contacto";
    if (item.id === "inicio") return options.homeSection === "inicio";
  }

  return false;
}

export function matchDockItemActive(
  item: ResolvedNavItem,
  path: string,
  options?: { isOnHome?: boolean; homeSection?: "inicio" | "contacto" }
): boolean {
  return matchNavItemActive(item, path, options);
}