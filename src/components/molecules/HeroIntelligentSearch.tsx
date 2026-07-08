import { useCallback, useId, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
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

const CATEGORY_ICONS: Record<HeroSearchCategory, LucideIcon> = {
  negocios: Briefcase,
  contacto: Mail,
  auditorias: ClipboardCheck,
};

interface SuggestionsListProps {
  listboxId: string;
  suggestionsLabel: string;
  noResults: string;
  filtered: HeroSearchSuggestion[];
  highlightIndex: number;
  onSelect: (suggestion: HeroSearchSuggestion) => void;
  className?: string;
  maxHeightClass?: string;
}

function SuggestionsList({
  listboxId,
  suggestionsLabel,
  noResults,
  filtered,
  highlightIndex,
  onSelect,
  className,
  maxHeightClass = "max-h-[min(16rem,50dvh)]",
}: SuggestionsListProps) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border/80 bg-background/95 shadow-xl backdrop-blur-md", className)}>
      <p className="border-b border-border/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {suggestionsLabel}
      </p>
      {filtered.length > 0 ? (
        <ul id={listboxId} role="listbox" className={cn(maxHeightClass, "overflow-y-auto py-1")}>
          {filtered.map((suggestion, index) => {
            const Icon = CATEGORY_ICONS[suggestion.category];
            const isHighlighted = index === highlightIndex;

            return (
              <li key={suggestion.id} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isHighlighted}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => onSelect(suggestion)}
                  className={cn(
                    "flex w-full min-h-[44px] items-start gap-3 px-4 py-3 text-left transition-colors",
                    isHighlighted ? "bg-primary/10" : "hover:bg-muted/50"
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
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="px-4 py-3 text-sm text-muted-foreground">{noResults}</p>
      )}
    </div>
  );
}

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
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<HeroSearchCategory | null>(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState<HeroSearchSuggestion | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const listboxId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const panel = selectedCategory ? panels[selectedCategory] : null;
  const showMobileSuggestions = !selectedCategory;

  const filtered = useMemo(() => filterHeroSuggestions(suggestions, { query }), [query, suggestions]);

  const selectSuggestion = useCallback((suggestion: HeroSearchSuggestion) => {
    setSelectedCategory(suggestion.category);
    setSelectedSuggestion(suggestion);
    setQuery(suggestion.title);
    setIsOpen(false);
    trackEvent("hero_search_select", {
      suggestion_id: suggestion.id,
      category: suggestion.category,
      query: query.trim(),
    });
    trackEvent("hero_banner_category", { category: suggestion.category });
  }, [query]);

  const goToSelectedCase = useCallback(() => {
    if (!selectedCategory) return;

    if (selectedSuggestion) {
      trackEvent("hero_banner_cta", { category: selectedCategory, action: "primary" });
      navigateFeaturedPath(navigate, selectedSuggestion.href, location.pathname);
      return;
    }

    onPrimaryAction(selectedCategory);
  }, [location.pathname, navigate, onPrimaryAction, selectedCategory, selectedSuggestion]);

  const handleSubmit = () => {
    if (isOpen && filtered[highlightIndex]) {
      selectSuggestion(filtered[highlightIndex]);
      return;
    }
    if (selectedCategory) {
      goToSelectedCase();
      return;
    }
    if (filtered[0]) {
      selectSuggestion(filtered[0]);
    }
  };

  return (
    <div
      className="w-full rounded-3xl border border-border/80 bg-card/80 shadow-lg backdrop-blur-sm"
      role="search"
      aria-label={groupLabel}
    >
      <div className={cn("px-4 py-4 sm:px-5", selectedCategory && "border-b border-border/60")}>
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
            aria-expanded={isOpen}
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-labelledby="hero-search-label"
            aria-label={searchAriaLabel}
            placeholder={searchPlaceholder}
            className="h-11 min-h-[44px] rounded-2xl border-border/70 bg-muted/30 pl-10 pr-3 text-base shadow-none sm:h-12 sm:pl-11 sm:pr-4"
            onChange={(event) => {
              setQuery(event.target.value);
              setHighlightIndex(0);
              setIsOpen(true);
              if (selectedCategory && event.target.value !== selectedSuggestion?.title) {
                setSelectedCategory(null);
                setSelectedSuggestion(null);
              }
            }}
            onFocus={() => {
              setHighlightIndex(0);
              setIsOpen(true);
            }}
            onBlur={() => {
              window.setTimeout(() => setIsOpen(false), 150);
            }}
            onKeyDown={(event) => {
              if (!isOpen) {
                if (event.key === "ArrowDown" || event.key === "Enter") {
                  setHighlightIndex(0);
                  setIsOpen(true);
                }
                return;
              }
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setHighlightIndex((prev) => Math.min(prev + 1, Math.max(filtered.length - 1, 0)));
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                setHighlightIndex((prev) => Math.max(prev - 1, 0));
              } else if (event.key === "Enter") {
                event.preventDefault();
                handleSubmit();
              } else if (event.key === "Escape") {
                setIsOpen(false);
              }
            }}
          />

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: -4 }}
                animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.16 }}
                className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 hidden sm:block"
              >
                <SuggestionsList
                  listboxId={listboxId}
                  suggestionsLabel={suggestionsLabel}
                  noResults={noResults}
                  filtered={filtered}
                  highlightIndex={highlightIndex}
                  onSelect={selectSuggestion}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {showMobileSuggestions && (
          <div className="mt-3 sm:hidden">
            <SuggestionsList
              listboxId={`${listboxId}-mobile`}
              suggestionsLabel={suggestionsLabel}
              noResults={noResults}
              filtered={filtered}
              highlightIndex={highlightIndex}
              onSelect={selectSuggestion}
              maxHeightClass="max-h-none"
            />
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {selectedCategory && panel && selectedSuggestion && (
          <motion.div
            key={selectedCategory}
            id={`hero-panel-${selectedCategory}`}
            role="region"
            aria-label={tabs[selectedCategory]}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4 px-4 py-4 sm:px-5 sm:py-5"
          >
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {panel.badge}
              </p>
              <p className="text-sm leading-relaxed text-foreground sm:text-[15px]">
                <span className="font-medium">{selectedSuggestion.title}</span>
                <span aria-hidden="true"> · </span>
                {selectedSuggestion.hint}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">{panel.description}</p>
            </div>

            {panel.highlights.length > 0 && (
              <ul className="flex flex-wrap gap-2" role="list">
                {panel.highlights.map((item) => (
                  <li key={item}>
                    <span className="inline-flex rounded-full border border-border/80 bg-muted/40 px-2.5 py-1 text-xs font-medium text-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <Button
                size="default"
                className="w-full rounded-full bg-brand-gradient font-semibold hover:opacity-90 sm:w-auto"
                onClick={goToSelectedCase}
              >
                {panel.ctaPrimary}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                size="default"
                variant="outline"
                className="w-full rounded-full sm:w-auto"
                onClick={() => {
                  trackEvent("hero_banner_cta", { category: selectedCategory, action: "secondary" });
                  onSecondaryAction(selectedCategory);
                }}
              >
                {panel.ctaSecondary}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}