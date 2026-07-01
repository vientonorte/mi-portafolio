import { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from '../ui/button';
import { LanguageToggle } from "../atoms/LanguageToggle";
import { ThemeToggle } from "../atoms/ThemeToggle";
import { X } from "lucide-react";
import {
  MOBILE_HEADER_CONTROL_ACTIVE_CLASS,
  MOBILE_HEADER_CONTROL_CLASS,
} from "./mobile-header-classes";
import { cn } from "../../lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import type { NavItem } from "../../lib/nav-types";
import { SEO_SITE } from "../../lib/seo";

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

  // Handle click outside
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  // Focus trap and keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const frame = requestAnimationFrame(() => {
      firstFocusableRef.current?.focus();
    });

    // Handle Tab key for focus trap
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

  const getNavHeight = useCallback(() => {
    const header = document.querySelector('header[role="banner"]');
    if (header instanceof HTMLElement) {
      return header.offsetHeight;
    }
    return 80;
  }, []);

  const scrollToAnchor = useCallback((selector: string) => {
    requestAnimationFrame(() => {
      const element = document.querySelector(selector);
      if (!element) return;

      const navHeight = getNavHeight();
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    });
  }, [getNavHeight]);

  useEffect(() => {
    if (location.pathname !== "/" || !pendingScroll.current) return;

    const target = pendingScroll.current;
    const maxAttempts = 60;
    let attempts = 0;
    let frameId: number | null = null;

    const tryScroll = () => {
      const element = document.querySelector(target);
      if (element) {
        scrollToAnchor(target);
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
  }, [location.pathname, scrollToAnchor]);

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
      } else if (item.href === "proyectos") {
        navigate("/proyectos");
      } else if (item.href === "proceso") {
        navigate("/proceso");
      } else if (item.href === "sobre-mi") {
        navigate("/sobre-mi");
      }
      return;
    }

    if (location.pathname !== "/") {
      pendingScroll.current = item.href;
      navigate("/");
      return;
    }

    scrollToAnchor(item.href);
  }, [location.pathname, navigate, onClose, onNavigateToDesignSystem, onNavigateToCaseStudies, onNavigateToAuditoria, scrollToAnchor]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 right-0 bottom-0 top-[var(--header-height)] bg-foreground/25 backdrop-blur-sm z-[105] dark:bg-black/60 lg:z-[55]"
            onClick={handleBackdropClick}
            aria-hidden="true"
          />
          
          {/* Menu Panel */}
          <motion.div
            ref={menuRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 flex w-full max-w-sm flex-col border-l border-border bg-background shadow-2xl z-[110] top-[var(--header-height)] bottom-[var(--bottom-nav-total)] md:bottom-0"
            style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
            role="dialog"
            aria-label="Menú de navegación móvil"
            aria-modal="true"
            id="mobile-menu"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/40 bg-background p-6">
              <h2 className="text-xl font-semibold text-foreground">Navegación</h2>
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

            {/* Navigation Items */}
            <nav className="flex-1 overflow-y-auto p-6" aria-label="Menú móvil">
              <ul className="space-y-2" role="list">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {moreDividerLabel && moreStartIndex === index && (
                      <p className="px-3 pt-4 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {moreDividerLabel}
                      </p>
                    )}
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-lg min-h-[44px] h-12 text-foreground hover:bg-primary/10 hover:text-primary transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:hover:bg-primary/15"
                      onClick={() => handleNavClick(item)}
                    >
                      {item.label}
                    </Button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Footer - Optional CTA or Info */}
            <div className="space-y-4 border-t border-border/40 bg-muted/30 p-6 dark:bg-muted/20">
              <div className="flex items-center justify-center gap-3">
                <ThemeToggle className={MOBILE_HEADER_CONTROL_CLASS} />
                <LanguageToggle />
              </div>
              <p className="text-sm text-muted-foreground text-center font-mono uppercase tracking-widest">
                {SEO_SITE.role}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}