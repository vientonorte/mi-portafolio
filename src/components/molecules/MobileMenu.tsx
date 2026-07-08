import { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from '../ui/button';
import { LanguageToggle } from "../atoms/LanguageToggle";
import { ThemeToggle } from "../atoms/ThemeToggle";
import { Logo } from "../atoms/Logo";
import { X } from "lucide-react";
import {
  MOBILE_HEADER_CONTROL_ACTIVE_CLASS,
  MOBILE_HEADER_CONTROL_CLASS,
} from "./mobile-header-classes";
import { cn } from "../../lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import type { NavItem } from "../../lib/nav-types";
import { SEO_SITE } from "../../lib/seo";
import { ROUTES } from "../../lib/routes";
import { navigateToPageSection } from "../../lib/navigate-to-section";
import { scrollToSection } from "../../lib/scroll-to-section";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  moreDividerLabel?: string;
  moreStartIndex?: number;
  onNavigateToDesignSystem?: () => void;
  onNavigateToCaseStudies?: () => void;
  onNavigateToAuditoria?: () => void;
}

function isNavItemActive(item: NavItem, pathname: string): boolean {
  if (item.type === "route") {
    if (item.href === "proyectos") {
      return (
        pathname === "/proyectos" ||
        pathname.startsWith("/proyecto/") ||
        pathname.startsWith("/empresa/")
      );
    }
    if (item.href === "proceso") {
      return (
        pathname === ROUTES.process ||
        pathname.startsWith(`${ROUTES.process}/`) ||
        pathname.startsWith("/cases")
      );
    }
    if (item.href === "sobre-mi" || item.href === "sobre-mi-experiencia") {
      return pathname === "/sobre-mi";
    }
    if (item.href === "design-system") return pathname === "/design-system";
    if (item.href === "auditoria") return pathname === ROUTES.audit;
    if (item.href === "consultoria") return pathname === ROUTES.consulting;
    return pathname === `/${item.href}`;
  }
  if (item.type === "anchor" && item.href === "#inicio") {
    return pathname === "/";
  }
  return false;
}

export function MobileMenu({
  isOpen,
  onClose,
  navItems,
  moreDividerLabel,
  moreStartIndex,
  onNavigateToDesignSystem,
  onNavigateToCaseStudies,
  onNavigateToAuditoria,
}: MobileMenuProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const pendingScroll = useRef<string | null>(null);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const frame = requestAnimationFrame(() => {
      firstFocusableRef.current?.focus();
    });

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements = menuRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleTab);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleTab);
    };
  }, [isOpen]);

  useEffect(() => {
    if (location.pathname !== "/" || !pendingScroll.current) return;

    const target = pendingScroll.current;
    const maxAttempts = 60;
    let attempts = 0;
    let frameId: number | null = null;

    const tryScroll = () => {
      const element = document.querySelector(target);
      if (element) {
        scrollToSection(target);
        if (pendingScroll.current === target) {
          pendingScroll.current = null;
        }
        return;
      }

      attempts += 1;
      if (attempts < maxAttempts) {
        frameId = requestAnimationFrame(tryScroll);
      }
    };

    frameId = requestAnimationFrame(tryScroll);

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [location.pathname]);

  const handleNavClick = useCallback((item: NavItem) => {
    onClose();

    if (item.type === "external") {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }

    if (item.type === "route") {
      if (item.href === "design-system") {
        onNavigateToDesignSystem?.();
      } else if (item.href === "cases") {
        onNavigateToCaseStudies?.();
      } else if (item.href === "auditoria") {
        onNavigateToAuditoria?.();
      } else if (item.href === "consultoria") {
        navigate(ROUTES.consulting);
      } else if (item.href === "proyectos") {
        navigate("/proyectos");
      } else if (item.href === "proceso") {
        navigate(ROUTES.process);
      } else if (item.href === "sobre-mi") {
        navigate("/sobre-mi");
      } else if (item.href === "sobre-mi-experiencia") {
        navigateToPageSection(navigate, "/sobre-mi", "experiencia", location.pathname);
      }
      return;
    }

    if (location.pathname !== "/") {
      pendingScroll.current = item.href;
      navigate("/");
      return;
    }

    scrollToSection(item.href);
  }, [location.pathname, navigate, onClose, onNavigateToDesignSystem, onNavigateToCaseStudies, onNavigateToAuditoria]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-0 left-0 right-0 top-[var(--header-height)] z-[105] bg-foreground/25 backdrop-blur-sm dark:bg-black/60 lg:z-[55]"
            onClick={handleBackdropClick}
            aria-hidden="true"
          />

          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, x: "12%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "12%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="fixed inset-x-0 bottom-0 top-[var(--header-height)] z-[110] flex w-full max-w-none flex-col bg-background shadow-2xl"
            style={{
              paddingLeft: "max(1rem, env(safe-area-inset-left, 0px))",
              paddingRight: "max(1rem, env(safe-area-inset-right, 0px))",
            }}
            role="dialog"
            aria-label="Menú de navegación móvil"
            aria-modal="true"
            id="mobile-menu"
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border/40 bg-background py-3">
              <div className="min-w-0 flex-1">
                <Logo size="sm" interactive showRole={false} />
              </div>
              <Button
                ref={firstFocusableRef}
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Cerrar menú de navegación"
                className={cn(MOBILE_HEADER_CONTROL_CLASS, MOBILE_HEADER_CONTROL_ACTIVE_CLASS)}
              >
                <X className="h-5 w-5 text-current" aria-hidden="true" />
              </Button>
            </div>

            <nav
              className="flex min-h-0 flex-1 flex-col overflow-y-auto py-2"
              aria-label="Menú móvil"
            >
              <ul className="flex w-full flex-col gap-0.5" role="list">
                {navItems.map((item, index) => {
                  const active = isNavItemActive(item, location.pathname);
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                    >
                      {moreDividerLabel && moreStartIndex === index && (
                        <p className="px-4 pb-1 pt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {moreDividerLabel}
                        </p>
                      )}
                      <Button
                        variant="ghost"
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "h-14 min-h-[48px] w-full justify-start rounded-xl px-4 text-lg transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                          active
                            ? "bg-primary/10 font-semibold text-primary"
                            : "text-foreground hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/15"
                        )}
                        onClick={() => handleNavClick(item)}
                      >
                        {item.label}
                      </Button>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <div
              className="shrink-0 space-y-3 border-t border-border/40 bg-muted/30 px-0 py-4 dark:bg-muted/20"
              style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom, 0px))" }}
            >
              <div className="flex items-center justify-center gap-3">
                <ThemeToggle className={MOBILE_HEADER_CONTROL_CLASS} />
                <LanguageToggle />
              </div>
              <p className="text-center text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                {SEO_SITE.brand} · {SEO_SITE.role}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}