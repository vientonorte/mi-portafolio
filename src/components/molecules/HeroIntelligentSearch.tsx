import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Briefcase,
  ClipboardCheck,
  Mail,
  Search,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";
import { trackEvent } from "../../lib/analytics";
import { navigateFeaturedPath } from "../../lib/featured-path-routes";
import {
  filterHeroSuggestions,
  type HeroSearchCategory,
  type HeroSearchSuggestion,
} from "../../lib/hero-search";
import type { HeroBannerPanelCopy } from "./HeroUnifiedBanner";

interface HeroIntelligentSearchProps {
  groupLabel: string;
  searchPlaceholder: string;
  searchAriaLabel: string;
  suggestionsLabel: string;
  noResults: string;
  tabs: Record<HeroSearchCategory, string>;
  panels: Record<HeroSearchCategory, HeroBannerPanelCopy>;
  suggestions: HeroSearchSuggestion[];
  onPrimaryAction: (category: HeroSearchCategory) => void;
  onSecondaryAction: (category: HeroSearchCategory) => void;
}

const CATEGORY_ORDER: HeroSearchCategory[] = ["negocios", "contacto", "auditorias"];

const CATEGORY_ICONS: Record<HeroSearchCategory, LucideIcon> = {
  negocios: Briefcase,
  contacto: Mail,
  auditorias: ClipboardCheck,
};

export function HeroIntelligentSearch({
  groupLabel,
  searchPlaceholder,
  searchAriaLabel,
  suggestionsLabel,
  noResults,
  tabs,
  panels,
  suggestions,
  onPrimaryAction,
  onSecondaryAction,
}: HeroIntelligentSearchProps) {
  const [active, setActive] = useState<HeroSearchCategory>("negocios");
  const [query, setQuery] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const listboxId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const panel = panels[active];

  const filtered = useMemo(() => filterHeroSuggestions(suggestions, { query }), [query, suggestions]);

  const selectCategory = (category: HeroSearchCategory) => {
    setActive(category);
    const lineIndex = filtered.findIndex((item) => item.category === category);
    setHighlightIndex(lineIndex >= 0 ? lineIndex : 0);
    trackEvent("hero_banner_category", { category });
  };

  const goToSuggestion = useCallback(
    (suggestion: HeroSearchSuggestion) => {
      trackEvent("hero_search_select", {
        suggestion_id: suggestion.id,
        category: suggestion.category,
        query: query.trim(),
      });
      navigateFeaturedPath(navigate, suggestion.href, location.pathname);
      setQuery("");
      inputRef.current?.blur();
    },
    [location.pathname, navigate, query]
  );

  const handleSubmit = () => {
    if (filtered[highlightIndex]) {
      goToSuggestion(filtered[highlightIndex]);
      return;
    }
    trackEvent("hero_search_submit", { category: active, query: query.trim() });
    onPrimaryAction(active);
  };

  useEffect(() => {
    const lineIndex = filtered.findIndex((item) => item.category === active);
    setHighlightIndex(lineIndex >= 0 ? lineIndex : 0);
  }, [query, active, filtered]);

  return (
    <div
      className="w-full rounded-3xl border border-border/80 bg-card/80 shadow-lg backdrop-blur-sm"
      role="search"
      aria-label={groupLabel}
    >
      <div className="border-b border-border/60 px-4 py-4 sm:px-5">
        <p
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
          id="hero-search-label"
        >
          {groupLabel}
        </p>

        <div className="relative mt-3">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground sm:left-4"
            aria-hidden="true"
          />
          <Input
            ref={inputRef}
            type="search"
            value={query}
            role="combobox"
            aria-expanded={filtered.length > 0}
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-labelledby="hero-search-label"
            aria-label={searchAriaLabel}
            placeholder={searchPlaceholder}
            className="h-11 min-h-[44px] rounded-2xl border-border/70 bg-muted/30 pl-10 pr-3 text-base shadow-none sm:h-12 sm:pl-11 sm:pr-4"
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setHighlightIndex((prev) => Math.min(prev + 1, Math.max(filtered.length - 1, 0)));
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                setHighlightIndex((prev) => Math.max(prev - 1, 0));
              } else if (event.key === "Enter") {
                event.preventDefault();
                handleSubmit();
              }
            }}
          />
        </div>

        <div className="mt-3 sm:mt-4">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {suggestionsLabel}
          </p>
          {filtered.length > 0 ? (
            <motion.ul
              id={listboxId}
              role="listbox"
              aria-label={suggestionsLabel}
              className="space-y-1.5"
              layout={prefersReducedMotion ? false : undefined}
            >
              {filtered.map((suggestion, index) => {
                const Icon = CATEGORY_ICONS[suggestion.category];
                const isHighlighted = index === highlightIndex;
                const isActiveLine = suggestion.category === active;

                return (
                  <motion.li key={suggestion.id} role="presentation" layout={prefersReducedMotion ? false : undefined}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isHighlighted}
                      onClick={() => {
                        setActive(suggestion.category);
                        goToSuggestion(suggestion);
                      }}
                      className={cn(
                        "flex w-full min-h-[44px] items-start gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors sm:px-4 sm:py-3",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        isActiveLine
                          ? "border-primary/30 bg-primary/5"
                          : "border-border/70 bg-background/50 hover:border-primary/20 hover:bg-muted/40",
                        isHighlighted && "ring-1 ring-primary/25"
                      )}
                    >
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-medium text-foreground sm:text-[15px]">
                            {suggestion.title}
                          </span>
                          {suggestion.badge && (
                            <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-primary">
                              {suggestion.badge}
                            </span>
                          )}
                        </span>
                        <span className="mt-0.5 block text-xs leading-snug text-muted-foreground sm:text-sm">
                          {suggestion.hint}
                        </span>
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </motion.ul>
          ) : (
            <p className="rounded-xl border border-border/70 bg-muted/20 px-3 py-2.5 text-sm text-muted-foreground">
              {noResults}
            </p>
          )}
        </div>
      </div>

      <div className="border-b border-border/60 px-4 py-3 sm:px-5">
        <div
          className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-labelledby="hero-search-label"
        >
          {CATEGORY_ORDER.map((category) => {
            const Icon = CATEGORY_ICONS[category];
            const isActive = active === category;

            return (
              <button
                key={category}
                type="button"
                role="tab"
                id={`hero-tab-${category}`}
                aria-selected={isActive}
                aria-controls={`hero-panel-${category}`}
                onClick={() => selectCategory(category)}
                className={cn(
                  "inline-flex shrink-0 min-h-[44px] items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-all duration-200 sm:px-3.5",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive
                    ? "border-primary/35 bg-primary/10 text-foreground shadow-sm"
                    : "border-border/80 bg-background/70 text-muted-foreground hover:border-primary/25 hover:bg-surface-matte hover:text-foreground"
                )}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {tabs[category]}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={`hero-panel-${active}`}
        role="tabpanel"
        aria-labelledby={`hero-tab-${active}`}
        className="space-y-4 px-4 py-4 sm:px-5 sm:py-5"
      >
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
          <span className="font-medium text-foreground">{tabs[active]}</span>
          <span aria-hidden="true"> · </span>
          {panel.composerHint}
        </p>

        <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
          <Button
            size="default"
            className="w-full rounded-full bg-brand-gradient font-semibold hover:opacity-90 sm:w-auto"
            onClick={() => {
              trackEvent("hero_banner_cta", { category: active, action: "primary" });
              onPrimaryAction(active);
            }}
          >
            {panel.ctaPrimary}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            size="default"
            variant="outline"
            className="w-full rounded-full sm:w-auto"
            onClick={() => {
              trackEvent("hero_banner_cta", { category: active, action: "secondary" });
              onSecondaryAction(active);
            }}
          >
            {panel.ctaSecondary}
          </Button>
        </div>
      </div>
    </div>
  );
}