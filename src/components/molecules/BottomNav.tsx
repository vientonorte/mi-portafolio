import { useEffect, useRef, useState } from "react";
import { Home, Briefcase, FolderOpen, Mail } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../../lib/LanguageContext";
import { NavTabItem } from "../atoms/NavTabItem";
import { scrollToSection } from "../../lib/scroll-to-section";
import { ROUTES } from "../../lib/routes";

const items = [
  {
    id: "inicio",
    labelEs: "Inicio",
    labelEn: "Home",
    icon: Home,
    type: "anchor" as const,
    target: "#inicio",
    route: "/",
  },
  {
    id: "negocios",
    labelEs: "Negocios",
    labelEn: "Business",
    icon: Briefcase,
    type: "route" as const,
    target: "/proyectos",
    route: "/proyectos",
  },
  {
    id: "cases",
    labelEs: "Proceso",
    labelEn: "Process",
    icon: FolderOpen,
    type: "route" as const,
    target: ROUTES.process,
    route: ROUTES.process,
  },
  {
    id: "contacto",
    labelEs: "Contacto",
    labelEn: "Contact",
    icon: Mail,
    type: "anchor" as const,
    target: "#contacto",
    route: "/",
  },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const pendingScroll = useRef<string | null>(null);
  const [homeSection, setHomeSection] = useState<"inicio" | "contacto">("inicio");

  useEffect(() => {
    if (location.pathname === "/" && pendingScroll.current) {
      const target = pendingScroll.current;
      pendingScroll.current = null;
      scrollToSection(target);
    }
  }, [location.pathname]);

  const isOnHome = location.pathname === "/";

  useEffect(() => {
    if (!isOnHome) return;

    const contact = document.querySelector("#contacto");
    if (!contact) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHomeSection(entry.isIntersecting ? "contacto" : "inicio");
      },
      { threshold: 0.25, rootMargin: "-20% 0px -55% 0px" }
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, [isOnHome]);

  const handleTap = (item: typeof items[0]) => {
    if (item.type === "route") {
      navigate(item.route);
      return;
    }
    if (location.pathname !== "/") {
      pendingScroll.current = item.target;
      navigate("/");
    } else {
      scrollToSection(item.target);
    }
  };

  const isActive = (item: typeof items[0]) => {
    if (item.type === "route") {
      if (item.id === "negocios") {
        return (
          location.pathname === "/proyectos" ||
          location.pathname.startsWith("/proyecto/") ||
          location.pathname.startsWith("/empresa/")
        );
      }
      if (item.id === "cases") {
        return (
          location.pathname === ROUTES.process ||
          location.pathname.startsWith(`${ROUTES.process}/`) ||
          location.pathname.startsWith("/cases")
        );
      }
      return location.pathname === item.route;
    }
    if (item.id === "contacto") return isOnHome && homeSection === "contacto";
    if (item.id === "inicio") return isOnHome && homeSection === "inicio";
    return false;
  };

  return (
    <nav
      className="bottom-nav-mobile fixed bottom-0 left-0 right-0 z-[60] border-t border-border/70 bg-background/95 shadow-[0_-4px_18px_rgba(15,23,42,0.08)] backdrop-blur-md supports-[backdrop-filter]:bg-background/85"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label={language === "es" ? "Navegación principal" : "Main navigation"}
    >
      <ul className="bottom-nav-mobile__list">
        {items.map((item) => {
          const label = language === "es" ? item.labelEs : item.labelEn;
          return (
            <li key={item.id} className="bottom-nav-mobile__item">
              <NavTabItem
                icon={item.icon}
                label={label}
                active={isActive(item)}
                onClick={() => handleTap(item)}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}