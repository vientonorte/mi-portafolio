import { useState, useEffect, useCallback, useRef, useMemo } from "react";
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

interface NavigationProps {
  onNavigateToDesignSystem?: () => void;
  onNavigateToCaseStudies?: () => void;
  onNavigateToAuditoria?: () => void;
}

export function Navigation({
  onNavigateToDesignSystem,
  onNavigateToCaseStudies,
  onNavigateToAuditoria,
}: NavigationProps) {
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
      audit: t.nav.audit,
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
      onNavigateToAuditoria,
    }),
    [onNavigateToAuditoria, onNavigateToCaseStudies, onNavigateToDesignSystem]
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

    if (item.action.kind === "anchor") {
      return (
        <Button
          variant="ghost"
          asChild
          className={cn(
            "relative transition-all hover:bg-primary/10 hover:text-primary",
            isActive && "bg-primary/10 text-primary"
          )}
        >
          <a
            href={item.action.target}
            onClick={(e) => handleNavClick(e, item)}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
            {isActive && (
              <motion.div
                layoutId="activeNavIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                initial={false}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </a>
        </Button>
      );
    }

    return (
      <Button
        variant="ghost"
        className={cn(
          "relative transition-all hover:bg-primary/10 hover:text-primary",
          isActive && "bg-primary/10 text-primary"
        )}
        onClick={() => runNavAction(item)}
        aria-current={isActive ? "page" : undefined}
      >
        {item.label}
        {isActive && (
          <motion.div
            layoutId="activeNavIndicator"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            initial={false}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </Button>
    );
  };

  const inicioItem = mobileNavItems.find((item) => item.id === "inicio");

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={isHidden && !isMenuOpen ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
          isMenuOpen ? "z-[115]" : "z-[100]"
        } ${
          /* Home = embudo FO con hero oscuro: header siempre sólido (WCAG contraste).
             Transparente solo en deep pages al top. */
          isScrolled || isMenuOpen || isOnHome
            ? "bg-background/95 backdrop-blur-md border-b border-border/40 shadow-sm supports-[backdrop-filter]:bg-background/80"
            : "max-lg:bg-background/92 max-lg:backdrop-blur-md max-lg:border-b max-lg:border-border/30 max-lg:shadow-sm max-lg:supports-[backdrop-filter]:bg-background/88 lg:bg-transparent"
        }`}
        role="banner"
      >
        <nav
          className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between"
          aria-label="Navegación principal"
        >
          <motion.a
            href="#inicio"
            onClick={(e) => inicioItem && handleNavClick(e, inicioItem)}
            className="flex min-w-0 max-w-[58%] select-none items-center gap-2 rounded-lg px-2 py-2 -ml-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:max-w-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label={`Inicio — ${SEO_SITE.brand} · ${SEO_SITE.role}`}
            data-process-label-variant={processLabelVariant}
          >
            {/* Mobile: solo isologo — libera ancho para utilidades / menú */}
            <span className="min-w-0 sm:hidden">
              <Logo
                size="sm"
                interactive
                showText={false}
                showRole={false}
                plate={isScrolled || isMenuOpen || isOnHome ? "default" : "floating"}
              />
            </span>
            {/* sm+: lockup completo (marca + wordmark) */}
            <span className="hidden min-w-0 sm:block">
              <Logo
                size="sm"
                interactive
                plate={isScrolled || isMenuOpen || isOnHome ? "default" : "floating"}
              />
            </span>
          </motion.a>

          {/* Desktop primary — CSS .nav-desktop-only (not only Tailwind, avoids dual chrome) */}
          <div className="nav-desktop-only hidden items-center gap-6 lg:flex">
            <ul className="flex items-center gap-1" role="list">
              {primaryNavItems.map((item) => (
                <li key={item.id}>{renderPrimaryItem(item)}</li>
              ))}
              <li>
                <NavMoreMenu
                  label={navLabels.more}
                  items={moreNavItems.map(resolvedNavToMenuItem)}
                  onSelect={(menuItem) => {
                    const resolved = moreNavItems.find((entry) => entry.menuHref === menuItem.href);
                    if (resolved) runNavAction(resolved);
                  }}
                />
              </li>
            </ul>

            <div className="flex items-center pl-6 ml-2 border-l border-border/40">
              <ThemeToggle />
            </div>

            <div className="flex items-center pl-6 ml-2 border-l border-border/40">
              <LanguageToggle />
            </div>
          </div>

          {/* Mobile utilities — CSS .nav-mobile-only */}
          <div className="nav-mobile-only flex items-center gap-1.5 sm:gap-2 lg:hidden">
            <LanguageToggle compact className={MOBILE_HEADER_CONTROL_CLASS} />
            <ThemeToggle className={MOBILE_HEADER_CONTROL_CLASS} />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className={cn(
                MOBILE_HEADER_CONTROL_CLASS,
                isMenuOpen && MOBILE_HEADER_CONTROL_ACTIVE_CLASS
              )}
            >
              <span className="sr-only">{isMenuOpen ? "Cerrar menú" : "Abrir menú"}</span>
              {isMenuOpen ? (
                <X className="h-5 w-5 text-current" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5 text-current" aria-hidden="true" />
              )}
            </Button>
          </div>
        </nav>
      </motion.header>

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