import { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from '../ui/button';
import { cn } from "../../lib/utils";
import { useLocation, useNavigate, Link } from "react-router-dom";
import type { NavItem } from "../../lib/nav-types";
import { ROUTES } from "../../lib/routes";
import { navigateToPageSection } from "../../lib/navigate-to-section";
import { scrollToSection } from "../../lib/scroll-to-section";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { SITE_CONTACT, getContactMailtoUrl } from "../../lib/site-contact";
import { VIENTO_NORTE_LINKS } from "../../lib/viento-norte-links";

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
  const { language } = useLanguage();
  const footer = useTranslation(language).footer;
  const menuRef = useRef<HTMLDivElement>(null);
  const firstNavRef = useRef<HTMLButtonElement>(null);
  const pendingScroll = useRef<string | null>(null);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const frame = requestAnimationFrame(() => {
      firstNavRef.current?.focus();
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

  const quickLinksLabel = language === "es" ? "Enlaces rápidos" : "Quick links";

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
            aria-label={language === "es" ? "Menú de navegación móvil" : "Mobile navigation menu"}
            aria-modal="true"
            id="mobile-menu"
          >
            <nav
              className="flex min-h-0 flex-1 flex-col overflow-y-auto pt-2"
              aria-label={language === "es" ? "Menú móvil" : "Mobile menu"}
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
                        ref={index === 0 ? firstNavRef : undefined}
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
              className="shrink-0 border-t border-border/40 bg-muted/20 px-0 py-4 dark:bg-muted/10"
              style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom, 0px))" }}
            >
              <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {quickLinksLabel}
              </p>
              <ul className="flex flex-wrap gap-2 px-4" role="list">
                <li>
                  <a
                    href={getContactMailtoUrl()}
                    className="inline-flex min-h-[44px] items-center rounded-full border border-border/70 bg-background px-4 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5"
                  >
                    {footer.contact}
                  </a>
                </li>
                <li>
                  <a
                    href={SITE_CONTACT.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center rounded-full border border-border/70 bg-background px-4 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5"
                  >
                    {footer.linkedin}
                  </a>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    onClick={onClose}
                    className="inline-flex min-h-[44px] items-center rounded-full border border-border/70 bg-background px-4 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5"
                  >
                    {footer.privacy}
                  </Link>
                </li>
                <li>
                  <a
                    href={VIENTO_NORTE_LINKS.uxtools}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center rounded-full border border-border/70 bg-background px-4 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5"
                  >
                    {footer.uxtools}
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}