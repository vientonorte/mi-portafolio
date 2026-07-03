import { Briefcase, FolderOpen, Home, Mail, User, type LucideIcon } from "lucide-react";
import { ROUTES, isProcessPath } from "./routes";

export type DockNavItemId = "inicio" | "negocios" | "experiencia" | "proceso" | "contacto";

type DockNavItemBase = {
  id: DockNavItemId;
  labelEs: string;
  labelEn: string;
  icon: LucideIcon;
};

export type DockNavItem =
  | (DockNavItemBase & { kind: "anchor"; target: string; route: string })
  | (DockNavItemBase & { kind: "route"; route: string })
  | (DockNavItemBase & { kind: "section"; pathname: string; sectionId: string })
  | (DockNavItemBase & { kind: "contact"; route: string });

export const DOCK_NAV_HOME: DockNavItem[] = [
  {
    id: "inicio",
    labelEs: "Inicio",
    labelEn: "Home",
    icon: Home,
    kind: "anchor",
    target: "#inicio",
    route: ROUTES.home,
  },
  {
    id: "negocios",
    labelEs: "Negocios",
    labelEn: "Business",
    icon: Briefcase,
    kind: "route",
    route: ROUTES.projects,
  },
  {
    id: "experiencia",
    labelEs: "Experiencia",
    labelEn: "Experience",
    icon: User,
    kind: "section",
    pathname: "/sobre-mi",
    sectionId: "experiencia",
  },
  {
    id: "proceso",
    labelEs: "Proceso",
    labelEn: "Process",
    icon: FolderOpen,
    kind: "route",
    route: ROUTES.process,
  },
  {
    id: "contacto",
    labelEs: "Contacto",
    labelEn: "Contact",
    icon: Mail,
    kind: "anchor",
    target: "#contacto",
    route: ROUTES.home,
  },
];

/** Mismos destinos que home; contacto abre la ruta dedicada en subpáginas. */
export const DOCK_NAV_DEEP: DockNavItem[] = [
  {
    id: "inicio",
    labelEs: "Inicio",
    labelEn: "Home",
    icon: Home,
    kind: "route",
    route: ROUTES.home,
  },
  {
    id: "negocios",
    labelEs: "Negocios",
    labelEn: "Business",
    icon: Briefcase,
    kind: "route",
    route: ROUTES.projects,
  },
  {
    id: "experiencia",
    labelEs: "Experiencia",
    labelEn: "Experience",
    icon: User,
    kind: "section",
    pathname: "/sobre-mi",
    sectionId: "experiencia",
  },
  {
    id: "proceso",
    labelEs: "Proceso",
    labelEn: "Process",
    icon: FolderOpen,
    kind: "route",
    route: ROUTES.process,
  },
  {
    id: "contacto",
    labelEs: "Contacto",
    labelEn: "Contact",
    icon: Mail,
    kind: "contact",
    route: ROUTES.contact,
  },
];

export function isProjectsPath(path: string): boolean {
  return (
    path === ROUTES.projects ||
    path.startsWith("/proyecto/") ||
    path.startsWith("/empresa/")
  );
}

export function matchDockItemActive(
  item: DockNavItem,
  path: string,
  options?: { isOnHome?: boolean; homeSection?: "inicio" | "contacto" }
): boolean {
  const normalized = path.replace(/\/+$/, "") || "/";

  if (item.id === "experiencia") return normalized === "/sobre-mi";

  if (item.kind === "route") {
    if (item.id === "negocios") return isProjectsPath(normalized);
    if (item.id === "proceso") return isProcessPath(normalized);
    if (item.id === "inicio") return normalized === ROUTES.home;
    return normalized === item.route;
  }

  if (item.kind === "contact") {
    return normalized === item.route;
  }

  if (item.kind === "anchor" && options?.isOnHome) {
    if (item.id === "contacto") return options.homeSection === "contacto";
    if (item.id === "inicio") return options.homeSection === "inicio";
  }

  return false;
}