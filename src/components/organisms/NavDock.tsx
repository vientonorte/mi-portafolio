import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavTabItem } from "../atoms/NavTabItem";
import { LiquidNavCta } from "../atoms/LiquidNavCta";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { scrollToSection } from "../../lib/scroll-to-section";
import { useProcessNavLabel } from "../../lib/process-label-experiment";
import {
  DOCK_CENTER_ID,
  executeNavAction,
  getDockNavItems,
  matchNavItemActive,
  type ResolvedNavItem,
} from "../../lib/nav-config";
import { ROUTES } from "../../lib/routes";
import { BOTTOM_NAV_BASE_CLASS, BOTTOM_NAV_DOCK_CLASS } from "../molecules/bottom-nav-classes";

export type NavDockVariant = "home" | "deep";

interface NavDockProps {
  variant: NavDockVariant;
}

export function NavDock({ variant }: NavDockProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const { label: processLabel, variant: processLabelVariant } = useProcessNavLabel(language);
  const pendingScroll = useRef<string | null>(null);
  const [homeSection, setHomeSection] = useState<"inicio" | "contacto">("inicio");

  const navLabels = {
    home: t.nav.home,
    projects: t.nav.projects,
    experience: t.nav.experience,
    consulting: t.nav.consulting,
    audit: t.nav.audit,
    contact: t.nav.contact,
    about: t.nav.about,
    designSystem: t.nav.designSystem,
    uxtools: t.nav.uxtools,
    more: t.nav.more,
  };

  const items = getDockNavItems(variant, navLabels, processLabel);
  const path = location.pathname.replace(/\/+$/, "") || "/";
  const isOnHome = path === ROUTES.home;

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

  const handleTap = (item: ResolvedNavItem) => {
    executeNavAction(item, {
      pathname: location.pathname,
      navigate,
      pendingScrollRef: pendingScroll,
    });
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
          const active = matchNavItemActive(item, path, {
            isOnHome,
            homeSection: variant === "home" ? homeSection : undefined,
          });
          const isCenter = item.id === DOCK_CENTER_ID;

          return (
            <li
              key={item.id}
              className={
                isCenter
                  ? "bottom-nav-mobile__item bottom-nav-mobile__item--center"
                  : "bottom-nav-mobile__item"
              }
            >
              {isCenter ? (
                <LiquidNavCta
                  icon={item.icon}
                  label={item.label}
                  active={active}
                  onClick={() => handleTap(item)}
                  ariaLabel={
                    language === "es"
                      ? "Consultoría Viento Norte"
                      : "Viento Norte consulting"
                  }
                />
              ) : (
                <NavTabItem
                  icon={item.icon}
                  label={item.label}
                  active={active}
                  onClick={() => handleTap(item)}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}