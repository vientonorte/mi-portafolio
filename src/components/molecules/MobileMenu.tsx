import { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from '../ui/button';
import { LanguageToggle } from "../atoms/LanguageToggle";
import { X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface NavItem {
  href: string;
  label: string;
  type: "anchor" | "route" | "external";
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  onNavigateToDesignSystem?: () => void;
  onNavigateToCaseStudies?: () => void;
  onNavigateToAuditoria?: () => void;
}

export function MobileMenu({
  isOpen,
  onClose,
  navItems,
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[105] lg:z-[55]"
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
            className="fixed top-16 right-0 bottom-16 w-full max-w-sm bg-background border-l border-border shadow-2xl z-[110] flex flex-col sm:top-20 md:bottom-0"
            style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
            role="dialog"
            aria-label="Menú de navegación móvil"
            aria-modal="true"
            id="mobile-menu"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/40">
              <h2 className="text-xl font-semibold">Navegación</h2>
              <Button
                ref={firstFocusableRef}
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Cerrar menú de navegación"
                className="hover:bg-muted"
              >
                <X className="h-5 w-5" aria-hidden="true" />
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
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-lg min-h-[44px] h-12 hover:bg-primary/10 hover:text-primary transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      onClick={() => handleNavClick(item)}
                    >
                      {item.label}
                    </Button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Footer - Optional CTA or Info */}
            <div className="p-6 border-t border-border/40 bg-muted/30 space-y-4">
              <div className="flex justify-center">
                <LanguageToggle />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Lead UX Designer
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}