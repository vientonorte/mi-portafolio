import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Button } from '../ui/button';
import { Menu, X } from "lucide-react";
import { MobileMenu } from "../molecules/MobileMenu";
import { NavMoreMenu } from "../molecules/NavMoreMenu";
import { ThemeToggle } from "../atoms/ThemeToggle";
import { LanguageToggle } from "../atoms/LanguageToggle";
import { LogoMark } from "../atoms/Logo";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import type { NavItem } from "../../lib/nav-types";
import { useProcessNavLabel } from "../../lib/process-label-experiment";
import { ROUTES } from "../../lib/routes";
import { SEO_SITE } from "../../lib/seo";

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
  const { language } = useLanguage();
  const t = useTranslation(language);
  const { label: processLabel, variant: processLabelVariant } = useProcessNavLabel(language);
  const location = useLocation();
  const navigate = useNavigate();
  const pendingScroll = useRef<string | null>(null);

  const primaryNavItems: NavItem[] = useMemo(
    () => [
      { href: "proyectos", label: t.nav.projects, type: "route" },
      { href: "proceso", label: processLabel, type: "route" },
      { href: "#contacto", label: t.nav.contact, type: "anchor" },
    ],
    [processLabel, t.nav.projects, t.nav.contact]
  );

  const moreNavItems: NavItem[] = useMemo(
    () => [
      { href: "sobre-mi", label: t.nav.about, type: "route" },
      { href: "#experiencia", label: t.nav.experience, type: "anchor" },
      { href: "design-system", label: t.nav.designSystem, type: "route" },
      { href: "auditoria", label: language === "es" ? "Auditoría ✦" : "Audit ✦", type: "route" },
      {
        href: "https://vientonorte.github.io/antropologia-corrupcion/zuboff-archivo.html",
        label: language === "es" ? "Investigación" : "Research",
        type: "external",
      },
    ],
    [t.nav.about, t.nav.experience, t.nav.designSystem, language]
  );

  const mobileNavItems = useMemo(
    () => [...primaryNavItems, ...moreNavItems],
    [primaryNavItems, moreNavItems]
  );

  useEffect(() => {
    isMenuOpenRef.current = isMenuOpen;
  }, [isMenuOpen]);

  const scrollToAnchor = useCallback((selector: string) => {
    requestAnimationFrame(() => {
      const element = document.querySelector(selector);
      if (!element) return;

      const header = document.querySelector('header[role="banner"]');
      const navHeight = header instanceof HTMLElement ? header.offsetHeight : 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  }, []);

  useEffect(() => {
    if (location.pathname !== "/" || !pendingScroll.current) return;

    const target = pendingScroll.current;
    pendingScroll.current = null;
    scrollToAnchor(target);
  }, [location.pathname, scrollToAnchor]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

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
    (item: NavItem) => {
      if (item.type === "external") {
        window.open(item.href, "_blank", "noopener,noreferrer");
        return;
      }

      if (item.type === "route") {
        switch (item.href) {
          case "design-system":
            onNavigateToDesignSystem?.();
            break;
          case "cases":
            onNavigateToCaseStudies?.();
            break;
          case "auditoria":
            onNavigateToAuditoria?.();
            break;
          case "proyectos":
            navigate(ROUTES.projects);
            break;
          case "proceso":
            navigate(ROUTES.process);
            break;
          case "sobre-mi":
            navigate("/sobre-mi");
            break;
        }
        return;
      }

      if (location.pathname !== "/") {
        pendingScroll.current = item.href;
        navigate("/");
        return;
      }

      scrollToAnchor(item.href);
    },
    [
      location.pathname,
      navigate,
      onNavigateToAuditoria,
      onNavigateToCaseStudies,
      onNavigateToDesignSystem,
      scrollToAnchor,
    ]
  );

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
      e.preventDefault();
      runNavAction(item);
    },
    [runNavAction]
  );

  const isRouteActive = useCallback(
    (href: string) => {
      if (href === "design-system") return location.pathname === "/design-system";
      if (href === "proceso") {
        return (
          location.pathname === "/proceso" ||
          location.pathname.startsWith("/proceso/") ||
          location.pathname.startsWith("/cases")
        );
      }
      if (href === "auditoria") return location.pathname === "/auditoria";
      if (href === "sobre-mi") return location.pathname === "/sobre-mi";
      if (href === "proyectos") {
        return (
          location.pathname === "/proyectos" ||
          location.pathname.startsWith("/proyecto/") ||
          location.pathname.startsWith("/empresa/")
        );
      }
      return false;
    },
    [location.pathname]
  );

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const renderPrimaryItem = (item: NavItem) => {
    const isActive = item.type === "route" && isRouteActive(item.href);

    if (item.type === "route") {
      return (
        <Button
          variant="ghost"
          className={`hover:text-primary hover:bg-primary/10 transition-all relative ${
            isActive ? "text-primary bg-primary/10" : ""
          }`}
          onClick={() => runNavAction(item)}
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
    }

    return (
      <Button variant="ghost" asChild className="hover:text-primary hover:bg-primary/10 transition-all">
        <a href={item.href} onClick={(e) => handleNavClick(e, item)}>
          {item.label}
        </a>
      </Button>
    );
  };

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={isHidden && !isMenuOpen ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border/40 shadow-sm supports-[backdrop-filter]:bg-background/80"
            : "bg-transparent"
        }`}
        role="banner"
      >
        <nav
          className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between"
          aria-label="Navegación principal"
        >
          <motion.a
            href="#inicio"
            onClick={(e) => handleNavClick(e, { href: "#inicio", label: "Inicio", type: "anchor" })}
            className="flex items-center gap-2 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg px-2 py-2 -ml-2 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label={`Inicio — ${SEO_SITE.brand} · ${SEO_SITE.role}`}
            data-process-label-variant={processLabelVariant}
          >
            <LogoMark size={32} />
          </motion.a>

          <div className="hidden lg:flex items-center gap-6">
            <ul className="flex items-center gap-1" role="list">
              {primaryNavItems.map((item) => (
                <li key={item.href}>{renderPrimaryItem(item)}</li>
              ))}
              <li>
                <NavMoreMenu
                  label={t.nav.more}
                  items={moreNavItems}
                  onSelect={runNavAction}
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

          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="relative h-11 w-11 rounded-full border border-border/60 bg-background/85 shadow-sm backdrop-blur-sm transition-all hover:bg-muted/90 hover:shadow-md"
            >
              <span className="sr-only">{isMenuOpen ? "Cerrar menú" : "Abrir menú"}</span>
              {isMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        navItems={mobileNavItems}
        moreDividerLabel={t.nav.more}
        moreStartIndex={primaryNavItems.length}
        onNavigateToDesignSystem={onNavigateToDesignSystem}
        onNavigateToCaseStudies={onNavigateToCaseStudies}
        onNavigateToAuditoria={onNavigateToAuditoria}
      />
    </>
  );
}
