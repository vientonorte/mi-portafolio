import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavTabItem } from "../atoms/NavTabItem";
import { useLanguage } from "../../lib/LanguageContext";
import { scrollToSection } from "../../lib/scroll-to-section";
import { navigateToPageSection } from "../../lib/navigate-to-section";
import { useProcessNavLabel } from "../../lib/process-label-experiment";
import {
  DOCK_NAV_DEEP,
  DOCK_NAV_HOME,
  matchDockItemActive,
  type DockNavItem,
} from "../../lib/nav-config";
import { BOTTOM_NAV_BASE_CLASS, BOTTOM_NAV_DOCK_CLASS } from "../molecules/bottom-nav-classes";

export type NavDockVariant = "home" | "deep";

interface NavDockProps {
  variant: NavDockVariant;
}

export function NavDock({ variant }: NavDockProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const { label: processLabel, variant: processLabelVariant } = useProcessNavLabel(language);
  const pendingScroll = useRef<string | null>(null);
  const [homeSection, setHomeSection] = useState<"inicio" | "contacto">("inicio");

  const items = variant === "home" ? DOCK_NAV_HOME : DOCK_NAV_DEEP;
  const path = location.pathname.replace(/\/+$/, "") || "/";
  const isOnHome = path === "/";

  useEffect(() => {
    if (isOnHome && pendingScroll.current) {
      const target = pendingScroll.current;
      pendingScroll.current = null;
      scrollToSection(target);
    }
  }, [isOnHome]);

  useEffect(() => {
    if (!isOnHome || variant !== "home") return;

    const contact = document.querySelector("#contacto");
    if (!contact) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHomeSection(entry.isIntersecting ? "contacto" : "inicio");
      },
      { threshold: 0.25, rootMargin: "-20% 0px -55% 0px" }
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, [isOnHome, variant]);

  const handleTap = (item: DockNavItem) => {
    if (item.kind === "route") {
      navigate(item.route);
      return;
    }

    if (item.kind === "section") {
      navigateToPageSection(navigate, item.pathname, item.sectionId, location.pathname);
      return;
    }

    if (item.kind === "contact") {
      navigate(item.route);
      return;
    }

    if (item.kind === "anchor") {
      if (!isOnHome) {
        pendingScroll.current = item.target;
        navigate(item.route);
      } else {
        scrollToSection(item.target);
      }
    }
  };

  const ariaLabel =
    language === "es"
      ? variant === "home"
        ? "Navegación principal"
        : "Navegación rápida"
      : variant === "home"
        ? "Main navigation"
        : "Quick navigation";

  return (
    <nav
      className={`nav-dock bottom-nav-mobile ${BOTTOM_NAV_BASE_CLASS} ${BOTTOM_NAV_DOCK_CLASS}`}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label={ariaLabel}
      data-process-label-variant={processLabelVariant}
      data-nav-variant={variant}
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
                active={matchDockItemActive(item, path, {
                  isOnHome,
                  homeSection: variant === "home" ? homeSection : undefined,
                })}
                onClick={() => handleTap(item)}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}