import { useState, useEffect, useCallback, useRef, useMemo, type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Button } from '../ui/button';
import { Menu, X } from "lucide-react";
import { MobileMenu } from "../molecules/MobileMenu";
import { NavMoreMenu } from "../molecules/NavMoreMenu";
import { ThemeToggle } from "../atoms/ThemeToggle";
import { LanguageToggle } from "../atoms/LanguageToggle";
import { Logo } from "../atoms/Logo";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { useProcessNavLabel } from "../../lib/process-label-experiment";
import { isDeepPortfolioPage } from "../../lib/page-depth";
import { ROUTES } from "../../lib/routes";
import { SEO_SITE } from "../../lib/seo";
import { scrollToSection } from "../../lib/scroll-to-section";
import {
  executeNavAction,
  getHeaderMoreNavItems,
  getHeaderPrimaryNavItems,
  getMobileDrawerNavItems,
  getMobileMoreDividerIndex,
  matchNavItemActive,
  resolvedNavToMenuItem,
  type ResolvedNavItem,
} from "../../lib/nav-config";
import {
  MOBILE_HEADER_CONTROL_ACTIVE_CLASS,
  MOBILE_HEADER_CONTROL_CLASS,
} from "../molecules/mobile-header-classes";
import { cn } from "../../lib/utils";
import type { SiteNavLink } from "../../lib/site-nav";

/** Enlace plano (sin router ni nav-config) para páginas estáticas. Fuente: src/lib/site-nav.ts. */
export type StaticNavLink = SiteNavLink;

interface NavigationProps {
  onNavigateToDesignSystem?: () => void;
  onNavigateToCaseStudies?: () => void;
  /**
   * Variante estática: si se pasa, el header usa SOLO estos enlaces
   * (sin HashRouter, sin nav-config). Salen de src/lib/site-nav.ts (minimalNavLinks).
   * La home no la usa: su nav sale de nav-config (que también lee site-nav).
   */
  staticLinks?: StaticNavLink[];
  /** href del logo en la variante estática (home root, respetando base). */
  staticHomeHref?: string;
  /**
   * Variante estática: muestra el toggle de idioma de la home («🌐 ES»). La página queda en
   * español; el toggle guarda "en" (misma clave que la home) y navega a este href (la raíz).
   */
  staticEnglishHref?: string;
}

export function Navigation({ staticLinks, staticHomeHref, staticEnglishHref, ...props }: NavigationProps) {
  if (staticLinks) {
    return <StaticNavigation links={staticLinks} homeHref={staticHomeHref ?? "/"} englishHref={staticEnglishHref} />;
  }
  return <SiteNavigation {...props} />;
}

const HEADER_BASE_CLASS = "fixed top-0 left-0 right-0 transition-all duration-300";
const HEADER_SOLID_CLASS =
  "bg-background/95 backdrop-blur-md border-b border-border/40 shadow-sm supports-[backdrop-filter]:bg-background/80";
const HEADER_TRANSPARENT_CLASS =
  "max-lg:bg-background/92 max-lg:backdrop-blur-md max-lg:border-b max-lg:border-border/30 max-lg:shadow-sm max-lg:supports-[backdrop-filter]:bg-background/88 lg:bg-transparent";
const LOGO_LINK_CLASS =
  "flex min-w-0 max-w-[58%] select-none items-center gap-2 rounded-lg px-2 py-2 -ml-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:max-w-none";
const NAV_ITEM_CLASS = "relative transition-all hover:bg-primary/10 hover:text-primary";
const NAV_ITEM_ACTIVE_CLASS = "bg-primary/10 text-primary";
const LOGO_ARIA = `Inicio — ${SEO_SITE.brand} · ${SEO_SITE.role}`;

/** Lockup del logo: isologo en mobile, marca completa desde sm (igual en todas las páginas). */
function NavLogoLockup({ plate }: { plate: "default" | "floating" }) {
  return (
    <>
      {/* Mobile: solo isologo — libera ancho para utilidades / menú */}
      <span className="min-w-0 sm:hidden">
        <Logo size="sm" interactive showText={false} showRole={false} plate={plate} />
      </span>
      {/* sm+: lockup completo (marca + wordmark) */}
      <span className="hidden min-w-0 sm:block">
        <Logo size="sm" interactive plate={plate} />
      </span>
    </>
  );
}

interface NavShellProps {
  /** Header sólido (home siempre; estáticas siempre). */
  solid: boolean;
  hidden?: boolean;
  menuOpen: boolean;
  onToggleMenu: () => void;
  menuControlsId: string;
  /** Link del logo (ya armado: <a> o <motion.a>). */
  logo: ReactNode;
  /** Items primarios del desktop (cada uno va en su <li>). */
  primaryItems: { id: string; node: ReactNode }[];
  /** Toggle de idioma desktop («🌐 ES») y mobile compacto («es»). */
  languageDesktop?: ReactNode;
  languageMobile?: ReactNode;
  /** Drawer/menú mobile, dentro del header (estáticas). */
  children?: ReactNode;
}

/**
 * Cáscara única del header (nav minimal canónico): logo · links primarios · | tema | idioma
 * (desktop) y idioma · tema · hamburguesa (mobile). La usan SiteNavigation (home) y
 * StaticNavigation (/servicios/, rubros), así no hay dos markups que diverjan.
 * Sin dependencias de router: apta para prerender (react-dom/server) + hydrateRoot.
 */
function NavShell({
  solid,
  hidden = false,
  menuOpen,
  onToggleMenu,
  menuControlsId,
  logo,
  primaryItems,
  languageDesktop,
  languageMobile,
  children,
}: NavShellProps) {
  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      initial={false}
      animate={hidden && !menuOpen ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        HEADER_BASE_CLASS,
        menuOpen ? "z-[115]" : "z-[100]",
        solid || menuOpen ? HEADER_SOLID_CLASS : HEADER_TRANSPARENT_CLASS
      )}
      role="banner"
      data-nav-shell="minimal"
    >
      <nav
        className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between"
        aria-label="Navegación principal"
      >
        {logo}

        {/* Desktop primary — CSS .nav-desktop-only (not only Tailwind, avoids dual chrome) */}
        <div className="nav-desktop-only hidden items-center gap-6 lg:flex">
          <ul className="flex items-center gap-1" role="list">
            {primaryItems.map((item) => (
              <li key={item.id}>{item.node}</li>
            ))}
          </ul>

          <div className="flex items-center pl-6 ml-2 border-l border-border/40">
            <ThemeToggle />
          </div>

          {languageDesktop ? (
            <div className="flex items-center pl-6 ml-2 border-l border-border/40">{languageDesktop}</div>
          ) : null}
        </div>

        {/* Mobile utilities — CSS .nav-mobile-only */}
        <div className="nav-mobile-only flex items-center gap-1.5 sm:gap-2 lg:hidden">
          {languageMobile}
          <ThemeToggle className={MOBILE_HEADER_CONTROL_CLASS} />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onToggleMenu}
            aria-label={menuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            aria-expanded={menuOpen}
            aria-controls={menuControlsId}
            className={cn(MOBILE_HEADER_CONTROL_CLASS, menuOpen && MOBILE_HEADER_CONTROL_ACTIVE_CLASS)}
          >
            {menuOpen ? (
              <X className="h-5 w-5 text-current" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5 text-current" aria-hidden="true" />
            )}
          </Button>
        </div>
      </nav>
      {children}
    </motion.header>
  );
}

/**
 * Header estático (/servicios/, /servicios/web-<rubro>/): misma cáscara que la home
 * (NavShell), links de src/lib/site-nav.ts y toggle de idioma estático.
 */
function StaticNavigation({
  links,
  homeHref,
  englishHref,
}: {
  links: StaticNavLink[];
  homeHref: string;
  englishHref?: string;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  const drawerLinkClass =
    "inline-flex min-h-11 w-full items-center rounded-md px-3 text-base font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

  return (
    <NavShell
      solid
      menuOpen={isMenuOpen}
      onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
      menuControlsId="static-mobile-menu"
      logo={
        <a href={homeHref} className={LOGO_LINK_CLASS} aria-label={LOGO_ARIA}>
          <NavLogoLockup plate="default" />
        </a>
      }
      primaryItems={links.map((link) => ({
        id: link.id,
        node: (
          <Button variant="ghost" asChild className={NAV_ITEM_CLASS}>
            <a href={link.href}>{link.label}</a>
          </Button>
        ),
      }))}
      languageDesktop={englishHref ? <LanguageToggle variant="static" englishHref={englishHref} /> : undefined}
      languageMobile={
        englishHref ? (
          <LanguageToggle variant="static" englishHref={englishHref} compact className={MOBILE_HEADER_CONTROL_CLASS} />
        ) : undefined
      }
    >
      <div
        id="static-mobile-menu"
        hidden={!isMenuOpen}
        className="nav-mobile-only border-t border-border/40 bg-background lg:hidden"
      >
        <ul className="container mx-auto flex flex-col gap-1 px-4 py-3" role="list">
          {links.map((link) => (
            <li key={link.id}>
              <a href={link.href} className={drawerLinkClass} onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </NavShell>
  );
}

function SiteNavigation({
  onNavigateToDesignSystem,
  onNavigateToCaseStudies,
}: Omit<NavigationProps, "staticLinks" | "staticHomeHref">) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMenuOpenRef = useRef(isMenuOpen);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [homeSection, setHomeSection] = useState<"inicio" | "contacto">("inicio");
  const { language } = useLanguage();
  const t = useTranslation(language);
  const { label: processLabel, variant: processLabelVariant } = useProcessNavLabel(language);
  const location = useLocation();
  const navigate = useNavigate();
  const pendingScroll = useRef<string | null>(null);
  const path = location.pathname.replace(/\/+$/, "") || "/";
  const isOnHome = path === ROUTES.home;

  const navLabels = useMemo(
    () => ({
      home: t.nav.home,
      projects: t.nav.projects,
      experience: t.nav.experience,
      consulting: t.nav.consulting,
      services: t.nav.services,
      news: t.nav.news,
      contact: t.nav.contact,
      about: t.nav.about,
      designSystem: t.nav.designSystem,
      uxtools: t.nav.uxtools,
      more: t.nav.more,
    }),
    [t.nav]
  );

  const primaryNavItems = useMemo(
    () => getHeaderPrimaryNavItems(navLabels, processLabel),
    [navLabels, processLabel]
  );

  const moreNavItems = useMemo(
    () => getHeaderMoreNavItems(navLabels, processLabel),
    [navLabels, processLabel]
  );

  const mobileNavItems = useMemo(
    () => getMobileDrawerNavItems(navLabels, processLabel, location.pathname),
    [location.pathname, navLabels, processLabel]
  );

  const mobileMenuItems = useMemo(
    () => mobileNavItems.map(resolvedNavToMenuItem),
    [mobileNavItems]
  );

  const navCallbacks = useMemo(
    () => ({
      onNavigateToDesignSystem,
      onNavigateToCaseStudies,
    }),
    [onNavigateToCaseStudies, onNavigateToDesignSystem]
  );

  useEffect(() => {
    isMenuOpenRef.current = isMenuOpen;
  }, [isMenuOpen]);

  useEffect(() => {
    if (location.pathname !== ROUTES.home || !pendingScroll.current) return;
    const target = pendingScroll.current;
    pendingScroll.current = null;
    scrollToSection(target);
  }, [location.pathname]);

  // Spy home: Contacto del header activo al llegar a #contacto
  useEffect(() => {
    if (!isOnHome) return;
    const contact = document.querySelector("#contacto");
    if (!contact) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHomeSection(entry.isIntersecting ? "contacto" : "inicio");
      },
      { threshold: 0.2, rootMargin: "-15% 0px -50% 0px" }
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, [isOnHome, path]);

  /** Off-home: treat header as "inicio" without effect setState */
  const activeHomeSection = isOnHome ? homeSection : "inicio";

  // Always start with scroll unlocked (stuck overflow:hidden blocks page + dock)
  useEffect(() => {
    document.body.style.overflow = "";
    document.body.removeAttribute("data-menu-open");
    return () => {
      document.body.style.overflow = "";
      document.body.removeAttribute("data-menu-open");
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      document.body.removeAttribute("data-menu-open");
      return;
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    document.body.setAttribute("data-menu-open", "true");

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
      document.body.removeAttribute("data-menu-open");
    };
  }, [isMenuOpen]);

  // Desktop: hide header on scroll down; mobile always shows header + bottom dock.
  // Dock legibility is handled in CSS (glass opacity), not by pinning the header.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const isDesktopNav = window.matchMedia("(min-width: 1024px)").matches;

    if (isDesktopNav && !isMenuOpenRef.current) {
      if (latest > previous && latest > 150) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    } else {
      setIsHidden(false);
    }

    setIsScrolled(latest > 50);
  });

  const runNavAction = useCallback(
    (item: ResolvedNavItem) => {
      executeNavAction(item, {
        pathname: location.pathname,
        navigate,
        pendingScrollRef: pendingScroll,
        callbacks: navCallbacks,
      });
    },
    [location.pathname, navigate, navCallbacks]
  );

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, item: ResolvedNavItem) => {
      e.preventDefault();
      runNavAction(item);
    },
    [runNavAction]
  );

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const renderPrimaryItem = (item: ResolvedNavItem) => {
    const isActive = matchNavItemActive(item, path, {
      isOnHome,
      homeSection: isOnHome ? activeHomeSection : undefined,
    });
    const indicator = isActive ? (
      <motion.div
        layoutId="activeNavIndicator"
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
        initial={false}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      />
    ) : null;

    // Ancla, HTTP y rutas internas de la SPA llevan href. El click sigue en executeNavAction.
    if (item.action.kind === "anchor" || item.action.kind === "http" || item.action.kind === "route") {
      return (
        <Button variant="ghost" asChild className={cn(NAV_ITEM_CLASS, isActive && NAV_ITEM_ACTIVE_CLASS)}>
          <a
            href={item.action.kind === "route" ? `#${item.action.target}` : item.action.target}
            onClick={(e) => handleNavClick(e, item)}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
            {indicator}
          </a>
        </Button>
      );
    }

    return (
      <Button
        variant="ghost"
        className={cn(NAV_ITEM_CLASS, isActive && NAV_ITEM_ACTIVE_CLASS)}
        onClick={() => runNavAction(item)}
        aria-current={isActive ? "page" : undefined}
      >
        {item.label}
        {indicator}
      </Button>
    );
  };

  const inicioItem = mobileNavItems.find((item) => item.id === "inicio");
  /**
   * Header sólido en toda la SPA (WCAG contraste). Desde el 9-oct las subpáginas también
   * montan esta nav (sin SubpageToolbar), con el contenido bajo el header: el modo
   * transparente al top dejaba ver el fondo oscuro del body con texto oscuro encima.
   */
  const solid = isScrolled || isMenuOpen || isOnHome || isDeepPortfolioPage(location.pathname);

  const primaryItems: NavShellProps["primaryItems"] = primaryNavItems.map((item) => ({
    id: item.id,
    node: renderPrimaryItem(item),
  }));
  // «Más» solo si nav-config todavía tiene destinos secundarios (hoy vacío: nav minimal canónico).
  if (moreNavItems.length > 0) {
    primaryItems.push({
      id: "more",
      node: (
        <NavMoreMenu
          label={navLabels.more}
          items={moreNavItems.map(resolvedNavToMenuItem)}
          onSelect={(menuItem) => {
            const resolved = moreNavItems.find((entry) => entry.menuHref === menuItem.href);
            if (resolved) runNavAction(resolved);
          }}
        />
      ),
    });
  }

  return (
    <>
      <NavShell
        solid={solid}
        hidden={isHidden}
        menuOpen={isMenuOpen}
        onToggleMenu={toggleMenu}
        menuControlsId="mobile-menu"
        logo={
          <motion.a
            href="#inicio"
            onClick={(e) => inicioItem && handleNavClick(e, inicioItem)}
            className={LOGO_LINK_CLASS}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label={LOGO_ARIA}
            data-process-label-variant={processLabelVariant}
          >
            <NavLogoLockup plate={solid ? "default" : "floating"} />
          </motion.a>
        }
        primaryItems={primaryItems}
        languageDesktop={<LanguageToggle />}
        languageMobile={<LanguageToggle compact className={MOBILE_HEADER_CONTROL_CLASS} />}
      />

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        navItems={mobileMenuItems}
        resolvedItems={mobileNavItems}
        moreDividerLabel={navLabels.more}
        moreStartIndex={getMobileMoreDividerIndex()}
        onNavigate={runNavAction}
      />
    </>
  );
}
