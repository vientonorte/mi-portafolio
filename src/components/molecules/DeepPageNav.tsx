import { Home, Briefcase, FolderOpen, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../../lib/LanguageContext";
import { NavTabItem } from "../atoms/NavTabItem";
import { ROUTES, isProcessPath } from "../../lib/routes";
import { useProcessNavLabel } from "../../lib/process-label-experiment";
import { BOTTOM_NAV_BASE_CLASS, BOTTOM_NAV_DOCK_CLASS } from "./bottom-nav-classes";

const items = [
  {
    id: "home",
    labelEs: "Inicio",
    labelEn: "Home",
    icon: Home,
    route: ROUTES.home,
    match: (path: string) => path === ROUTES.home,
  },
  {
    id: "negocios",
    labelEs: "Negocios",
    labelEn: "Business",
    icon: Briefcase,
    route: ROUTES.projects,
    match: (path: string) =>
      path === ROUTES.projects ||
      path.startsWith("/proyecto/") ||
      path.startsWith("/empresa/"),
  },
  {
    id: "proceso",
    labelEs: "Proceso",
    labelEn: "Process",
    icon: FolderOpen,
    route: ROUTES.process,
    match: (path: string) => isProcessPath(path),
  },
  {
    id: "sobre-mi",
    labelEs: "Sobre mí",
    labelEn: "About",
    icon: User,
    route: "/sobre-mi",
    match: (path: string) => path === "/sobre-mi",
  },
] as const;

export function DeepPageNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const { label: processLabel, variant: processLabelVariant } = useProcessNavLabel(language);
  const path = location.pathname.replace(/\/+$/, "") || "/";

  return (
    <nav
      className={`deep-page-nav bottom-nav-mobile ${BOTTOM_NAV_BASE_CLASS} ${BOTTOM_NAV_DOCK_CLASS}`}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label={language === "es" ? "Navegación rápida" : "Quick navigation"}
      data-process-label-variant={processLabelVariant}
    >
      <ul className="bottom-nav-mobile__list">
        {items.map((item) => {
          const label =
            item.id === "proceso"
              ? processLabel
              : language === "es"
                ? item.labelEs
                : item.labelEn;
          return (
            <li key={item.id} className="bottom-nav-mobile__item">
              <NavTabItem
                icon={item.icon}
                label={label}
                active={item.match(path)}
                onClick={() => navigate(item.route)}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}