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
  type DockVariant,
  type ResolvedNavItem,
  matchNavItemActive,
} from "../../lib/nav-config";
import { ROUTES } from "../../lib/routes";
import { BOTTOM_NAV_BASE_CLASS, BOTTOM_NAV_DOCK_CLASS } from "../molecules/bottom-nav-classes";

export type NavDockVariant = DockVariant;

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

  const path = location.pathname.replace(/\/+$/, "") || "/";
  const isOnHome = path === ROUTES.home;
  const isOnConsulting = path === ROUTES.consulting;
  /**
   * Home → anclas #inicio / #contacto + spy de sección.
   * Consultoría → embudo (liquid CTA = kickoff).
   * Resto deep → rutas (negocios, consultoría, proceso, contacto).
   */
  const effectiveVariant: NavDockVariant = isOnHome
    ? "home"
    : isOnConsulting
      ? "funnel"
      : "deep";
  // variant prop se conserva por API; el pathname manda para hover/activo
  void variant;

  const items = getDockNavItems(effectiveVariant, navLabels, processLabel);

  useEffect(() => {
    if (!pendingScroll.current) return;
    const target = pendingScroll.current;
    pendingScroll.current = null;
    scrollToSection(target);
  }, [path]);

  // Spy de sección en home: Inicio vs Contacto (header + dock)
  useEffect(() => {
    if (!isOnHome) return;

    const contact = document.querySelector("#contacto");
    const inicio = document.querySelector("#inicio");
    if (!contact) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const contactEntry = entries.find((e) => e.target.id === "contacto");
        if (contactEntry?.isIntersecting) {
          setHomeSection("contacto");
          return;
        }
        const inicioVisible = entries.some(
          (e) => e.target.id === "inicio" && e.isIntersecting
        );
        if (inicioVisible || !contactEntry?.isIntersecting) {
          setHomeSection("inicio");
        }
      },
      { threshold: [0.15, 0.35], rootMargin: "-15% 0px -45% 0px" }
    );

    observer.observe(contact);
    if (inicio) observer.observe(inicio);
    return () => observer.disconnect();
  }, [isOnHome, path]);

  const handleTap = (item: ResolvedNavItem) => {
    executeNavAction(item, {
      pathname: location.pathname,
      navigate,
      pendingScrollRef: pendingScroll,
    });
  };

  // Distinct from header aria-label so AT users don't hear two "main" navs
  const ariaLabel = t.nav.bottomNav;

  const centerLabel = isOnConsulting
    ? t.consultoria.landing.nav.start
    : t.nav.consultingDock;
  const centerAria = isOnConsulting
    ? t.consultoria.landing.nav.startAria
    : t.nav.consultingDockAria;

  return (
    <nav
      className={`${BOTTOM_NAV_BASE_CLASS} ${BOTTOM_NAV_DOCK_CLASS}`}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label={ariaLabel}
      data-process-label-variant={processLabelVariant}
      data-nav-variant={effectiveVariant}
      data-on-home={isOnHome ? "true" : "false"}
      data-home-section={isOnHome ? homeSection : undefined}
    >
      <ul className="bottom-nav-mobile__list">
        {items.map((item) => {
          const active = matchNavItemActive(item, path, {
            isOnHome,
            homeSection: isOnHome ? homeSection : undefined,
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
                  /* Solo texto bajo el isologo — sin ✦ ni Lucide (logo = único glifo) */
                  label={centerLabel}
                  active={active}
                  onClick={() => handleTap(item)}
                  ariaLabel={centerAria}
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