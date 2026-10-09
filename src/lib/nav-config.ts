import {
  Briefcase,
  FolderOpen,
  Home,
  LayoutGrid,
  Mail,
  Newspaper,
  Sparkles,
  User,
  type LucideIcon,
} from "lucide-react";
import type { NavigateFunction } from "react-router-dom";
import { ROUTES, isConsultingOfferPath, isProcessPath } from "./routes";
import { VIENTO_NORTE_LINKS } from "./viento-norte-links";
import { navigateToPageSection } from "./navigate-to-section";
import { scrollToSection } from "./scroll-to-section";
import type { NavItem, NavItemType } from "./nav-types";
import { analytics } from "./analytics";
import { siteServiciosHref } from "./site-nav";

/** Consultoría canónica (canon vn-agent 2026-09-27): reemplaza /#/consultoria en el nav visible. */
const CONSULTORIA_CANON_PATH = siteServiciosHref("consultoria-ux");

export type NavItemId =
  | "inicio"
  | "negocios"
  | "experiencia"
  | "consultoria"
  | "proceso"
  | "servicios"
  | "news"
  | "contacto"
  | "sobre-mi"
  | "design-system"
  | "uxtools";

export type DockNavItemId = Extract<
  NavItemId,
  "inicio" | "consultoria" | "contacto"
>;

/** Slot central elevado del dock (liquid CTA → consultoría / kickoff). */
export const DOCK_CENTER_ID: DockNavItemId = "consultoria";

/** Variantes del bottom dock: home anchors · deep routes · embudo consultoría. */
export type DockVariant = "home" | "deep" | "funnel";

/** Ancla de conversión del embudo (onboarding / kickoff). */
export const CONSULTORIA_FUNNEL_KICKOFF_ID = "consultoria-onboarding";

export type NavActionKind =
  | "anchor"
  | "route"
  | "section"
  | "contact"
  | "external"
  | "http";

export interface NavAction {
  kind: NavActionKind;
  target: string;
  /** Ruta en la que vive el ancla; si no coincide, navega y luego scrollea. */
  homeRoute?: string;
  sectionId?: string;
}

export interface NavLabels {
  home: string;
  projects: string;
  experience: string;
  consulting: string;
  services: string;
  news: string;
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
 * Header de la SPA (retro 7-oct): Servicios, Noticias, Sobre mí y Contacto.
 * Las páginas estáticas (/servicios/, rubros) siguen en src/lib/site-nav.ts
 * (Servicios + Contacto). Sin «Más». Dock: Inicio · kickoff · Contacto.
 */
export const NAV_SURFACE = {
  dock: ["inicio", "consultoria", "contacto"] as const satisfies readonly DockNavItemId[],
  headerPrimary: ["servicios", "news", "sobre-mi", "contacto"] as const satisfies readonly NavItemId[],
  headerMore: [] as readonly NavItemId[],
  mobileDrawer: ["inicio", "servicios", "news", "sobre-mi", "contacto"] as const satisfies readonly NavItemId[],
} as const;

const NAV_REGISTRY: Record<NavItemId, NavRegistryItem> = {
  inicio: { id: "inicio", icon: Home, labelKey: "home" },
  negocios: { id: "negocios", icon: Briefcase, labelKey: "projects" },
  experiencia: { id: "experiencia", icon: User, labelKey: "experience" },
  consultoria: { id: "consultoria", icon: Sparkles, labelKey: "consulting" },
  proceso: { id: "proceso", icon: FolderOpen, labelKey: "process" },
  servicios: { id: "servicios", icon: LayoutGrid, labelKey: "services" },
  news: { id: "news", icon: Newspaper, labelKey: "news" },
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
    case "servicios":
      return { kind: "http", target: siteServiciosHref() };
    case "news":
      return { kind: "route", target: ROUTES.news };
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

export function getDockNavAction(id: DockNavItemId, variant: DockVariant): NavAction {
  // Inicio / Contacto: anclas de la home en todas las variantes (en deep, navega a la home y
  // scrollea). Nada de rutas hash /#/contacto en el nav visible.
  if (id === "inicio") {
    return { kind: "anchor", target: "#inicio", homeRoute: ROUTES.home };
  }
  if (id === "contacto") {
    return { kind: "anchor", target: "#contacto", homeRoute: ROUTES.home };
  }
  // S42 (PO 5-oct 21:47): CTA central del dock = enlace HTTP a /servicios/ (canon, sin /#/ ni /s/).
  // Home («Empezar») → web 72 h, primario como el hero. Resto de rutas («Consultoría») →
  // consultoría UX canónica (/servicios/#consultoria-ux). Sin Calendar ni ruta hash /consultoria.
  if (variant === "home" || variant === "funnel") {
    return { kind: "http", target: siteServiciosHref("web-pymes") };
  }
  return { kind: "http", target: CONSULTORIA_CANON_PATH };
}

export function getHeaderNavAction(id: NavItemId): NavAction {
  if (id === "inicio") {
    return { kind: "anchor", target: "#inicio", homeRoute: ROUTES.home };
  }
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
  if (action.kind === "http") {
    return { menuType: "route", menuHref: action.target };
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
  variant: DockVariant,
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

export function getMobileDrawerNavItems(
  labels: NavLabels,
  processLabel: string,
  // Se conserva por API: el drawer ya no cambia Contacto a /#/contacto fuera de la home.
  _pathname: string = ROUTES.home
): ResolvedNavItem[] {
  void _pathname;
  return resolveNavItems(NAV_SURFACE.mobileDrawer, labels, processLabel, getHeaderNavAction);
}

/** Índice del separador «Más» en el drawer; -1 = sin separador. */
export function getMobileMoreDividerIndex(): number {
  if (NAV_SURFACE.headerMore.length === 0) return -1;
  return (NAV_SURFACE.mobileDrawer as readonly NavItemId[]).indexOf("sobre-mi");
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
}

export interface NavRuntimeContext {
  pathname: string;
  navigate: NavigateFunction;
  pendingScrollRef: { current: string | null };
  callbacks?: NavRuntimeCallbacks;
}

/** Evento nav_click (también para enlaces <a href> que navegan solos). */
export function trackNavClick(item: ResolvedNavItem): void {
  analytics.navClick({
    nav_id: item.id,
    nav_kind: item.action.kind,
    nav_target: item.action.target,
  });
}

export function executeNavAction(item: ResolvedNavItem, ctx: NavRuntimeContext): void {
  const { action } = item;
  const { pathname, navigate, pendingScrollRef, callbacks } = ctx;

  trackNavClick(item);

  if (action.kind === "external") {
    window.open(action.target, "_blank", "noopener,noreferrer");
    return;
  }

  if (action.kind === "http") {
    window.location.assign(action.target);
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
    navigate(action.target);
    return;
  }

  if (action.kind === "anchor") {
    const anchorRoute = action.homeRoute ?? ROUTES.home;
    const normalized = pathname.replace(/\/+$/, "") || "/";
    if (normalized !== anchorRoute) {
      pendingScrollRef.current = action.target;
      navigate(anchorRoute);
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

/**
 * Activo en header y bottom dock.
 * - Home: Inicio / Contacto según sección en viewport (homeSection)
 * - Otras rutas: match por pathname (negocios, consultoría, proceso, …)
 */
export function matchNavItemActive(
  item: ResolvedNavItem,
  path: string,
  options?: { isOnHome?: boolean; homeSection?: "inicio" | "contacto" }
): boolean {
  const normalized = path.replace(/\/+$/, "") || "/";
  const onHome = options?.isOnHome ?? normalized === ROUTES.home;
  const section = options?.homeSection ?? "inicio";

  // Inicio: solo en home, y no cuando el usuario está en #contacto
  if (item.id === "inicio") {
    if (!onHome && normalized !== ROUTES.home) return false;
    return section === "inicio";
  }

  // Contacto: ruta /contacto o ancla #contacto en home
  if (item.id === "contacto") {
    if (normalized === ROUTES.contact) return true;
    if (item.action.kind === "contact" && normalized === ROUTES.contact) return true;
    if (onHome) return section === "contacto";
    return false;
  }

  if (item.id === "experiencia" || item.id === "sobre-mi") {
    return normalized === "/sobre-mi";
  }

  if (item.id === "negocios") return isProjectsPath(normalized);
  if (item.id === "proceso") return isProcessPath(normalized);
  if (item.id === "consultoria") {
    // Home embudo: center = kickoff anchor (no “ruta activa”)
    if (normalized === ROUTES.home) return false;
    // SEM tour no usa dock; por si acaso deep residual
    return isConsultingOfferPath(normalized);
  }
  if (item.id === "design-system") return normalized === ROUTES.designSystem;
  if (item.id === "news") {
    return normalized === ROUTES.news || normalized.startsWith(`${ROUTES.news}/`);
  }
  if (item.id === "servicios") {
    const hub = siteServiciosHref().replace(/\/$/, "");
    return (
      normalized === ROUTES.landings ||
      normalized.startsWith("/servicios") ||
      normalized === hub ||
      normalized.startsWith(`${hub}/`)
    );
  }

  if (item.action.kind === "contact") {
    return normalized === ROUTES.contact;
  }

  if (item.action.kind === "route") {
    return normalized === item.action.target;
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