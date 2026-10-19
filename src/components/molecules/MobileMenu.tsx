import { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from '../ui/button';
import { cn } from "../../lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import type { NavItem } from "../../lib/nav-types";
import { ROUTES } from "../../lib/routes";
import { scrollToSection } from "../../lib/scroll-to-section";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { SITE_CONTACT, getContactMailtoUrl } from "../../lib/site-contact";
import { VIENTO_NORTE_LINKS } from "../../lib/viento-norte-links";
import { matchNavItemActive, type ResolvedNavItem } from "../../lib/nav-config";
import { usePageSections } from "../../lib/page-sections";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  resolvedItems: ResolvedNavItem[];
  moreDividerLabel?: string;
  moreStartIndex?: number;
  onNavigate: (item: ResolvedNavItem) => void;
}

export interface MobileMenuPanelItem {
  id: string;
  label: string;
  active: boolean;
}

export interface MobileMenuSection {
  id: string;
  number: string;
  label: string;
}

export interface MobileMenuFooterItem {
  id: string;
  label: string;
  href?: string;
  kind: "href" | "external" | "spa";
}

/**
 * Panel responsive del menú móvil de /inicio. La home lo usa vía MobileMenu.
 * Las páginas estáticas (/servicios/, rubros, /noticias/) lo montan directo,
 * sin HashRouter ni LanguageProvider.
 */
export function MobileMenuPanel({
  isOpen,
  onClose,
  items,
  moreDividerLabel,
  moreStartIndex,
  onSelect,
  sections,
  onSection,
  sectionsLabel,
  quickLinksLabel,
  footerItems,
  onSpa,
  dialogLabel,
  menuLabel,
}: {
  isOpen: boolean;
  onClose: () => void;
  items: MobileMenuPanelItem[];
  moreDividerLabel?: string;
  moreStartIndex?: number;
  onSelect: (index: number) => void;
  sections: MobileMenuSection[];
  onSection: (id: string) => void;
  sectionsLabel: string;
  quickLinksLabel: string;
  footerItems: MobileMenuFooterItem[];
  onSpa: (href: string) => void;
  dialogLabel: string;
  menuLabel: string;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  const firstNavRef = useRef<HTMLButtonElement>(null);

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
            aria-label={dialogLabel}
            aria-modal="true"
            id="mobile-menu"
          >
            <nav
              className="flex min-h-0 flex-1 flex-col overflow-y-auto pt-2"
              aria-label={menuLabel}
            >
              <ul className="flex w-full flex-col gap-0.5" role="list">
                {items.map((item, index) => (
                  <motion.li
                    key={item.id}
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
                      aria-current={item.active ? "page" : undefined}
                      className={cn(
                        "h-14 min-h-[48px] w-full justify-start rounded-xl px-4 text-lg transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                        item.active
                          ? "bg-primary/10 font-semibold text-primary"
                          : "text-foreground hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/15"
                      )}
                      onClick={() => onSelect(index)}
                    >
                      {item.label}
                    </Button>
                  </motion.li>
                ))}
              </ul>
              {sections.length > 0 ? (
                <>
                  <p className="px-4 pb-1 pt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {sectionsLabel}
                  </p>
                  <ul className="flex w-full flex-col gap-0.5" role="list">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <Button
                          variant="ghost"
                          className="h-11 w-full justify-start rounded-xl px-4 text-base"
                          onClick={() => onSection(section.id)}
                        >
                          <span className="w-8 shrink-0 font-bold tabular-nums">{section.number}</span>
                          {section.label}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </nav>

            <div
              className="shrink-0 border-t border-border/40 bg-muted/20 px-0 py-4 dark:bg-muted/10"
              style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom, 0px))" }}
            >
              <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {quickLinksLabel}
              </p>
              <ul className="flex flex-wrap gap-2 px-4" role="list">
                {footerItems.map((item) => (
                  <li key={item.id}>
                    {item.kind === "spa" ? (
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => onSpa(item.href ?? "")}
                      >
                        {item.label}
                      </Button>
                    ) : (
                      <Button variant="outline" asChild>
                        <a
                          href={item.href}
                          onClick={onClose}
                          {...(item.kind === "external"
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {item.label}
                        </a>
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function MobileMenu({
  isOpen,
  onClose,
  navItems,
  resolvedItems,
  moreDividerLabel,
  moreStartIndex,
  onNavigate,
}: MobileMenuProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const footer = useTranslation(language).footer;
  const pendingScroll = useRef<string | null>(null);

  useEffect(() => {
    if (location.pathname !== ROUTES.home || !pendingScroll.current) return;

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

  const handleNavClick = useCallback(
    (index: number) => {
      const resolved = resolvedItems[index];
      if (!resolved) return;
      onClose();
      onNavigate(resolved);
    },
    [onClose, onNavigate, resolvedItems]
  );

  const quickLinksLabel = language === "es" ? "Enlaces rápidos" : "Quick links";
  const sectionsLabel = language === "es" ? "Secciones" : "Sections";
  const pageSections = usePageSections();
  const items: MobileMenuPanelItem[] = navItems.map((item, index) => {
    const resolved = resolvedItems[index];
    const active = resolved
      ? matchNavItemActive(resolved, location.pathname, {
          isOnHome: location.pathname === ROUTES.home,
        })
      : false;
    return {
      id: resolved?.id ?? item.href,
      label: item.label,
      active,
    };
  });

  return (
    <MobileMenuPanel
      isOpen={isOpen}
      onClose={onClose}
      items={items}
      moreDividerLabel={moreDividerLabel}
      moreStartIndex={moreStartIndex}
      onSelect={handleNavClick}
      sections={pageSections}
      onSection={(id) => {
        onClose();
        window.setTimeout(() => scrollToSection(id), 32);
      }}
      sectionsLabel={sectionsLabel}
      quickLinksLabel={quickLinksLabel}
      footerItems={[
        { id: "contact", label: footer.contact, href: getContactMailtoUrl(), kind: "href" },
        { id: "linkedin", label: footer.linkedin, href: SITE_CONTACT.linkedin, kind: "external" },
        { id: "privacy", label: footer.privacy, href: ROUTES.privacy, kind: "spa" },
        { id: "uxtools", label: footer.uxtools, href: VIENTO_NORTE_LINKS.uxtools, kind: "external" },
      ]}
      onSpa={(href) => {
        onClose();
        navigate(href);
      }}
      dialogLabel={language === "es" ? "Menú de navegación móvil" : "Mobile navigation menu"}
      menuLabel={language === "es" ? "Menú móvil" : "Mobile menu"}
    />
  );
}
