import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { MobileMenu } from "../molecules/MobileMenu";
import { ThemeToggle } from "../atoms/ThemeToggle";
import { LanguageToggle } from "../atoms/LanguageToggle";
import { LogoMark } from "../atoms/Logo";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";

interface NavigationProps {
  onNavigateToDesignSystem?: () => void;
  onNavigateToCaseStudies?: () => void;
}

export function Navigation({ 
  onNavigateToDesignSystem,
  onNavigateToCaseStudies 
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const { language } = useLanguage();
  const t = useTranslation(language);

  const navItems = [
    { href: "#sobre-mi", label: t.nav.about, type: "anchor" as const },
    { href: "#proyectos", label: t.nav.projects, type: "anchor" as const },
    { href: "design-system", label: language === "es" ? "Design System" : "Design System", type: "route" as const },
    { href: "#experiencia", label: t.nav.experience, type: "anchor" as const },
    { href: "#contacto", label: t.nav.contact, type: "anchor" as const },
  ];

  // Close mobile menu when clicking outside or on escape
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    // Prevent body scroll when menu is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Handle scroll behavior
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Hide nav on scroll down, show on scroll up
    if (latest > previous && latest > 150) {
      setIsHidden(true);
      setIsMenuOpen(false); // Close mobile menu on scroll
    } else {
      setIsHidden(false);
    }

    // Add background on scroll
    setIsScrolled(latest > 50);
  });

  // Memoized navigation handler
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, item: typeof navItems[0]) => {
    e.preventDefault();
    
    if (item.type === "route") {
      if (item.href === "design-system") {
        onNavigateToDesignSystem?.();
      } else if (item.href === "case-studies") {
        onNavigateToCaseStudies?.();
      }
      return;
    }
    
    // Smooth scroll to anchor
    const element = document.querySelector(item.href);
    if (element) {
      const navHeight = 80; // Account for fixed nav height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, [onNavigateToDesignSystem, onNavigateToCaseStudies]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
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
          {/* Logo */}
          <motion.a
            href="#inicio"
            onClick={(e) => handleNavClick(e, navItems[0])}
            className="flex items-center gap-2 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg px-2 py-2 -ml-2 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Inicio - Rodrigo Gaete Portfolio"
          >
            <LogoMark size={32} />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <ul className="flex items-center gap-1" role="list">
              {navItems.map((item) => (
                <li key={item.href}>
                  {item.type === "route" ? (
                    <Button
                      variant="ghost"
                      className="hover:text-primary hover:bg-primary/10 transition-all"
                      onClick={
                        item.href === "design-system" 
                          ? onNavigateToDesignSystem 
                          : onNavigateToCaseStudies
                      }
                    >
                      {item.label}
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      asChild
                      className="hover:text-primary hover:bg-primary/10 transition-all"
                    >
                      <a 
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item)}
                      >
                        {item.label}
                      </a>
                    </Button>
                  )}
                </li>
              ))}
            </ul>

            {/* Theme Toggle Desktop */}
            <div className="flex items-center pl-6 ml-2 border-l border-border/40">
              <ThemeToggle />
            </div>

            {/* Language Toggle Desktop */}
            <div className="flex items-center pl-6 ml-2 border-l border-border/40">
              <LanguageToggle />
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="relative w-10 h-10"
            >
              <span className="sr-only">
                {isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              </span>
              {isMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMenuOpen}
        onClose={closeMenu}
        navItems={navItems}
        onNavigateToDesignSystem={onNavigateToDesignSystem}
        onNavigateToCaseStudies={onNavigateToCaseStudies}
      />
    </>
  );
}