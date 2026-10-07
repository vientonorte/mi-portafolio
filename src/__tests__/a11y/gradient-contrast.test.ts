/**
 * Contraste WCAG AA de TODO texto sobre (o hecho de) un degradado.
 * Para cada caso del inventario se muestrea cada 5 % de cada capa de degradado
 * (producto cartesiano entre capas, y entre texto con degradado y fondo) y se
 * exige ≥ 4.5:1 (texto normal), ≥ 3:1 solo si el texto es grande verificable
 * (≥ 24px, o ≥ 18.66px bold; se documenta en `why`) y ≥ 3:1 para iconos (1.4.11).
 *
 * `GRADIENT_REPORT=/tmp/report.md vitest run …` escribe la tabla antes/después en markdown.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { render as renderServicios } from "@/servicios/entry-server";
import { STEPS, contrast, hex, over, parseColor, sampleGradient, toRGBA, type RGBA } from "./contrast-utils";
import {
  AZUL_700,
  CSS,
  CTA_SURFACES_C3,
  GRADIENT_PATTERN,
  INVENTORY,
  ROJO_700,
  ROOT,
  SERVICIOS_GRADIENT_ENTRIES,
  SOLID_CTA_SURFACES,
  THEME,
  val,
  type Case,
  type Era,
} from "./gradient-inventory";

function minRatio(k: Case, era: Era): { ratio: number; text: string; bg: string } {
  const base = toRGBA(k.base);
  const layers = val(k.layers, era);
  const textStops = val(k.text, era);
  let bgs: RGBA[] = [base];
  for (const layer of layers) {
    const next: RGBA[] = [];
    for (const b of bgs)
      for (const t of STEPS) {
        const s = sampleGradient(layer.stops, t);
        next.push(over({ ...s, a: s.a * (layer.opacity ?? 1) }, b));
      }
    // dedupe para acotar el producto cartesiano
    const seen = new Map<string, RGBA>();
    for (const n of next) seen.set(hex(n), n);
    bgs = [...seen.values()];
  }
  let worst = { ratio: Infinity, text: "", bg: "" };
  const textSamples = textStops.length === 1 ? [textStops[0]] : STEPS.map((t) => sampleGradient(textStops, t));
  for (const bg of bgs)
    for (const tx of textSamples) {
      const fg = over(tx, bg);
      const r = contrast(fg, bg);
      if (r < worst.ratio) worst = { ratio: r, text: hex(fg), bg: hex(bg) };
    }
  return worst;
}

const required = (k: Case) => (k.size === "normal" ? 4.5 : 3);

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name === "__tests__") continue;
      walk(p, out);
    } else if (/\.(tsx?|css)$/.test(name)) out.push(p);
  }
  return out;
}

describe("tokens de degradado (leídos de CSS)", () => {
  it("--brand-gradient usa las variantes 700 AA de vn-tokens.css", () => {
    expect(ROJO_700.toLowerCase()).toBe("#c2330f");
    expect(AZUL_700.toLowerCase()).toBe("#0f6aa8");
    expect(CSS.globals).toMatch(
      /--brand-gradient:\s*linear-gradient\(\s*135deg,\s*var\(--vn-primitive-rojo-700\)\s*0%,\s*var\(--vn-primitive-azul-evo-700\)\s*100%\s*\)/
    );
    expect(CSS.globals).toMatch(/\.dark \.text-brand-gradient\s*\{\s*background-image:\s*var\(--brand-gradient-on-dark\)/);
    expect(CSS.globals).toMatch(/--brand-gradient-on-dark:\s*linear-gradient\(\s*135deg,\s*var\(--brand-red\)\s*0%,\s*var\(--brand-orange\)\s*100%/);
    expect(THEME.dark.brandRed.toLowerCase()).toBe("#e8401c");
    expect(THEME.dark.brandOrange.toLowerCase()).toBe("#1a8fdc");
  });

  it(".heading-gradient: claro = --brand-gradient; oscuro = #ff1d25 → #ff931e", () => {
    expect(CSS.global).toMatch(/\.heading-gradient\s*\{\s*background:\s*var\(--brand-gradient\)/);
    expect(CSS.global).toMatch(/\.dark \.heading-gradient\s*\{\s*background-image:\s*linear-gradient\(135deg, #ff1d25 0%, #ff931e 100%\)/);
  });

  it("src/index.css (tokens legacy #ff1d25/#ff931e) no se importa en ninguna entrada", () => {
    const entries = ["src/main.tsx", "src/servicios/entry-client.tsx", "index.html", "servicios/index.html"];
    for (const e of entries) expect(readFileSync(join(ROOT, e), "utf8")).not.toMatch(/index\.css/);
  });
});

describe("inventario completo de degradados en src/**", () => {
  it("cada línea con degradado de src/** está inventariada (conteo por archivo)", () => {
    const found: Record<string, number> = {};
    for (const f of walk(join(ROOT, "src"))) {
      const rel = relative(ROOT, f).split("\\").join("/");
      if (rel === "src/index.css") continue; // no importado (ver test anterior)
      const n = readFileSync(f, "utf8").split("\n").filter((l) => GRADIENT_PATTERN.test(l)).length;
      if (n) found[rel] = n;
    }
    const inv: Record<string, number> = {};
    for (const e of INVENTORY) inv[e.file] = (inv[e.file] ?? 0) + e.matches;
    expect(inv).toEqual(found);
  });

  it("los ids son únicos y todo 'checked' tiene casos; todo 'separate-pr' tiene motivo", () => {
    const ids = INVENTORY.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const e of INVENTORY) {
      if (e.status === "checked") expect(e.cases?.length, e.id).toBeGreaterThan(0);
      if (e.status === "separate-pr") expect(e.note, e.id).toBeTruthy();
      for (const k of e.cases ?? []) if (k.size === "large") expect(k.why, `${e.id} ${k.label}`).toBeTruthy();
    }
  });

  it("pendientes para PR aparte (no arreglables con tokens)", () => {
    // global-glass-nav y about-bento se corrigieron en fix/aa-contrast-mobile-bento-dark
    expect(INVENTORY.filter((e) => e.status === "separate-pr").map((e) => e.id)).toEqual([]);
  });
});

describe("prerender de /servicios/: solo degradados inventariados", () => {
  const doc = new DOMParser().parseFromString(renderServicios(), "text/html");
  it("clases de degradado ⊆ {bg-brand-gradient} y cada elemento con texto usa texto blanco", () => {
    const els = [...doc.querySelectorAll<HTMLElement>("[class*='gradient']")];
    expect(els.length).toBeGreaterThan(0);
    const classes = new Set(els.flatMap((el) => [...el.classList].filter((c) => c.includes("gradient"))));
    // bg-gradient-to-b es el marco del celular en Conceptos (decorativo, sin texto).
    expect([...classes].sort()).toEqual(["bg-brand-gradient", "bg-gradient-to-b"]);
    for (const el of els) {
      if (!el.textContent?.trim()) continue;
      if (el.classList.contains("bg-gradient-to-b") && !el.classList.contains("bg-brand-gradient")) continue;
      const cls = el.className;
      // PRIMARY_CTA_CLASS (19px bold) o número de HowWeWork (text-base bold)
      expect(cls, el.outerHTML.slice(0, 120)).toContain("text-white");
      expect(cls.includes("text-[1.1875rem]") || cls.includes("text-base")).toBe(true);
    }
    for (const id of SERVICIOS_GRADIENT_ENTRIES) expect(INVENTORY.find((e) => e.id === id), id).toBeTruthy();
  });
});

describe("contraste WCAG en cada 5 % de cada degradado (después de este PR)", () => {
  for (const e of INVENTORY.filter((x) => x.status === "checked")) {
    for (const k of e.cases!) {
      it(`${e.file} · ${e.component} · ${k.label} [${k.theme}] ≥ ${required(k)}:1`, () => {
        const w = minRatio(k, "after");
        expect(w.ratio, `${w.text} sobre ${w.bg}`).toBeGreaterThanOrEqual(required(k));
      });
    }
  }
});

describe("antes de este PR (documenta los fallos corregidos)", () => {
  const before = (id: string, label: string, theme: "light" | "dark") => {
    const k = INVENTORY.find((e) => e.id === id)!.cases!.find((x) => x.label === label && x.theme === theme)!;
    return minRatio(k, "before").ratio;
  };
  it("--brand-gradient con texto blanco: 3.50:1 (min en #1A8FDC) → falla AA texto normal", () => {
    expect(before("how-we-work", "HowWeWork paso · reposo", "light")).toBeCloseTo(3.5, 2);
  });
  it("brillo via-white/20 sobre CTA: 2.70:1 → ahora via-white/10", () => {
    expect(before("casestudies", "CTA final text-lg · brillo animado (pico)", "light")).toBeLessThan(3);
  });
  it(".heading-gradient claro #ff1d25→#ff931e: < 3:1 incluso para texto grande", () => {
    expect(before("stats-tooltip", "Valor .heading-gradient", "light")).toBeLessThan(3);
  });
});

describe("AA: barra móvil glass, AboutEvidenceBento, botones azules dark (antes → después)", () => {
  const caseOf = (id: string, label: string, theme: "light" | "dark") =>
    INVENTORY.find((e) => e.id === id)!.cases!.find((x) => x.label === label && x.theme === theme)!;
  const ba = (id: string, label: string, theme: "light" | "dark") => {
    const k = caseOf(id, label, theme);
    return { before: minRatio(k, "before").ratio, after: minRatio(k, "after").ratio };
  };

  it("glass: el CSS usa solo --background ≥ 96 % (sin highlight #ffffff en el degradado)", () => {
    const light = CSS.global.match(/\n\.bottom-nav-mobile--glass \{[\s\S]*?\n\}/)![0];
    const dark = CSS.global.match(/\nhtml\.dark \.bottom-nav-mobile--glass \{[\s\S]*?\n\}/)![0];
    for (const b of [light, dark]) {
      const grad = b.match(/linear-gradient\(([\s\S]*?)\);/)![1];
      const stops = [...grad.matchAll(/color-mix\(in srgb, ([^ ]+) (\d+)%, transparent\)/g)];
      expect(stops.length).toBe(3);
      for (const [, color, pct] of stops) {
        expect(color).toBe("var(--background)");
        expect(Number(pct)).toBeGreaterThanOrEqual(96);
      }
    }
  });

  it("glass claro idle (#404040) sobre contenido negro: 1.12:1 → ≥ 4.5:1 (texto) y ≥ 3:1 (ícono)", () => {
    const t = ba("global-glass-nav", "Idle label · tope glass sobre negro", "light");
    expect(t.before).toBeCloseTo(1.12, 1);
    expect(t.after).toBeGreaterThanOrEqual(4.5);
    expect(ba("global-glass-nav", "Idle icon · tope glass sobre negro", "light").after).toBeGreaterThanOrEqual(3);
  });

  it("glass oscuro idle (#a3a3a3) sobre contenido blanco: < 3:1 → ≥ 4.5:1", () => {
    const t = ba("global-glass-nav", "Idle label · tope glass sobre blanco", "dark");
    expect(t.before).toBeLessThan(3);
    expect(t.after).toBeGreaterThanOrEqual(4.5);
    expect(ba("global-glass-nav", "Idle icon · tope glass sobre blanco", "dark").after).toBeGreaterThanOrEqual(3);
  });

  it("AboutEvidenceBento: label 11px → text-xs sobre chip bg-background/95; 1.42:1 → ≥ 4.5:1", () => {
    const src = readFileSync(join(ROOT, "src/components/organisms/AboutEvidenceBento.tsx"), "utf8");
    expect(src).not.toMatch(/text-\[11px\]/);
    expect(src).toMatch(/rounded-md bg-background\/95 px-1\.5 py-0\.5 text-xs font-medium tracking-wide text-foreground/);
    const light = ba("about-bento", "Label sobre foto oscura (zona via/20 → chip/95)", "light");
    expect(light.before).toBeCloseTo(1.42, 1);
    expect(light.after).toBeGreaterThanOrEqual(4.5);
    const dark = ba("about-bento", "Label sobre foto clara (zona via/20 → chip/95)", "dark");
    expect(dark.before).toBeLessThan(4.5);
    expect(dark.after).toBeGreaterThanOrEqual(4.5);
  });

  describe("botones sólidos azules en dark", () => {
    const white = parseColor("#ffffff");
    it("tokens: --vn-color-cta-bg = azul-evo-700, cta-bg-hover = azul-evo-800, cta-fg = blanco; --primary claro sigue en #0f6aa8", () => {
      expect(THEME.light.ctaBg.toLowerCase()).toBe("#0f6aa8");
      expect(THEME.dark.ctaBg.toLowerCase()).toBe("#0f6aa8");
      expect(THEME.dark.ctaFg.toLowerCase()).toBe("#ffffff");
      expect(THEME.light.primary.toLowerCase()).toBe("#0f6aa8");
      expect(CSS.vnTokens).toMatch(/--vn-color-cta-bg-hover:\s*var\(--vn-primitive-azul-evo-800\)/);
    });
    it("antes: bg-primary oscuro (#1A8FDC) + text-primary-foreground (#fff) = 3.50:1", () => {
      expect(contrast(parseColor(THEME.dark.primaryFg), parseColor(THEME.dark.primary))).toBeCloseTo(3.5, 2);
    });
    it("después: Button default y ProcessNavigation activo usan --vn-color-cta-* → 5.76:1 (hover 6.79:1)", () => {
      const btn = readFileSync(join(ROOT, "src/components/ui/button.tsx"), "utf8");
      expect(btn).toMatch(/default: "bg-\[var\(--vn-color-cta-bg\)\] text-\[var\(--vn-color-cta-fg\)\] hover:bg-\[var\(--vn-color-cta-bg-hover\)\]"/);
      const nav = readFileSync(join(ROOT, "src/components/molecules/ProcessNavigation.tsx"), "utf8");
      expect(nav).toMatch(/bg-\[var\(--vn-color-cta-bg\)\] text-\[var\(--vn-color-cta-fg\)\]/);
      const r = contrast(parseColor(THEME.dark.ctaFg), parseColor(THEME.dark.ctaBg));
      expect(r).toBeGreaterThanOrEqual(4.5);
      expect(r).toBeCloseTo(5.76, 2);
      expect(contrast(white, parseColor("#0b5f96"))).toBeGreaterThanOrEqual(4.5);
    });
  });
});

describe("superficies azules sólidas (no botones) → --vn-color-cta-* (antes → después)", () => {
  const white = parseColor("#ffffff");
  const r = (bg: string) => contrast(white, parseColor(bg));
  const src = (f: string) => readFileSync(join(ROOT, f), "utf8");

  it("tokens intactos: --primary-foreground dark = #fff, --primary light = #0f6aa8, --primary dark = #1A8FDC", () => {
    expect(THEME.dark.primaryFg.toLowerCase()).toBe("#ffffff");
    expect(THEME.light.primary.toLowerCase()).toBe("#0f6aa8");
    expect(THEME.dark.primary.toLowerCase()).toBe("#1a8fdc");
    expect(THEME.dark.ctaBgHover.toLowerCase()).toBe("#0b5f96");
  });

  it("antes / después por tema: dark 3.50 → 5.76:1 (hover 6.79:1); light 5.76 → 5.76:1 (sin empeorar)", () => {
    expect(r(THEME.dark.primary)).toBeCloseTo(3.5, 2);
    expect(r(THEME.dark.ctaBg)).toBeCloseTo(5.76, 2);
    expect(r(THEME.dark.ctaBgHover)).toBeCloseTo(6.79, 2);
    expect(r(THEME.light.primary)).toBeCloseTo(5.76, 2);
    expect(r(THEME.light.ctaBg)).toBeGreaterThanOrEqual(r(THEME.light.primary));
    expect(r(THEME.light.ctaBgHover)).toBeGreaterThanOrEqual(r(THEME.light.primary));
  });

  const PATTERNS: Record<string, { mustMatch: RegExp[]; mustNot: RegExp[] }> = {
    "process-nav-number": {
      mustMatch: [/"bg-\[var\(--vn-color-cta-bg\)\] text-\[var\(--vn-color-cta-fg\)\] scale-110/],
      mustNot: [/bg-primary text-primary-foreground/],
    },
    "trajectory-highlight": {
      mustMatch: [/"bg-\[var\(--vn-color-cta-bg\)\] text-\[var\(--vn-color-cta-fg\)\] ring-2/],
      mustNot: [/bg-primary text-primary-foreground/],
    },
    tooltip: {
      mustMatch: [/"bg-\[var\(--vn-color-cta-bg\)\] text-\[var\(--vn-color-cta-fg\)\] animate-in/, /fill-\[var\(--vn-color-cta-bg\)\]/],
      mustNot: [/bg-primary/, /fill-primary/, /text-primary-foreground/],
    },
    calendar: {
      mustMatch: [
        /day-range-start aria-selected:bg-\[var\(--vn-color-cta-bg\)\] aria-selected:text-\[var\(--vn-color-cta-fg\)\]/,
        /day-range-end aria-selected:bg-\[var\(--vn-color-cta-bg\)\] aria-selected:text-\[var\(--vn-color-cta-fg\)\]/,
        /hover:bg-\[var\(--vn-color-cta-bg-hover\)\]/,
      ],
      mustNot: [/bg-primary/, /text-primary-foreground/],
    },
    "badge-default": {
      mustMatch: [/bg-\[var\(--vn-color-cta-bg\)\] text-\[var\(--vn-color-cta-fg\)\] \[a&\]:hover:bg-\[var\(--vn-color-cta-bg-hover\)\]/],
      mustNot: [/bg-primary text-primary-foreground/],
    },
    "about-equation": {
      mustMatch: [/rounded-md bg-\[var\(--vn-color-cta-bg\)\] px-2 py-0\.5 text-xs font-semibold text-\[var\(--vn-color-cta-fg\)\]/],
      mustNot: [/bg-primary px-2 py-0\.5 text-xs font-semibold text-primary-foreground/],
    },
    "process-flow-number": {
      mustMatch: [/rounded-full bg-\[var\(--vn-color-cta-bg\)\] flex items-center justify-center text-\[var\(--vn-color-cta-fg\)\]/],
      mustNot: [/text-primary-foreground/],
    },
    "timeline-completed": {
      mustMatch: [/"border-\[var\(--vn-color-cta-bg\)\] bg-\[var\(--vn-color-cta-bg\)\] text-\[var\(--vn-color-cta-fg\)\]"/],
      mustNot: [/text-primary-foreground/],
    },
  };

  for (const s of SOLID_CTA_SURFACES) {
    it(`${s.file.split("/").pop()} · ${s.label}: usa --vn-color-cta-* (dark 3.50 → 5.76:1)`, () => {
      const code = src(s.file);
      const p = PATTERNS[s.id];
      expect(p, s.id).toBeTruthy();
      for (const re of p.mustMatch) expect(code).toMatch(re);
      for (const re of p.mustNot) expect(code).not.toMatch(re);
    });
  }

  it("inventario: process-flow y trajectory con casos sólidos antes → después (dark ≥ 4.5, light sin empeorar)", () => {
    for (const [id, label] of [
      ["process-flow", "Número paso · blanco sobre azul sólido"],
      ["trajectory", "Nodo highlight · blanco sobre azul sólido"],
    ] as const) {
      const e = INVENTORY.find((x) => x.id === id)!;
      expect(e.status).toBe("checked");
      const dark = e.cases!.find((k) => k.label === label && k.theme === "dark")!;
      const light = e.cases!.find((k) => k.label === label && k.theme === "light")!;
      expect(minRatio(dark, "before").ratio).toBeCloseTo(3.5, 2);
      expect(minRatio(dark, "after").ratio).toBeCloseTo(5.76, 2);
      expect(minRatio(light, "after").ratio).toBeGreaterThanOrEqual(minRatio(light, "before").ratio);
    }
  });
});

describe("tercer commit: skip-links, checkbox, CaseStudyCard hover, tab ProjectDetail, LanguageContext, ::selection → --vn-color-cta-* (antes → después)", () => {
  const src = (f: string) => readFileSync(join(ROOT, f), "utf8");
  const CTA = String.raw`bg-\[var\(--vn-color-cta-bg\)\]`;
  const FG = String.raw`text-\[var\(--vn-color-cta-fg\)\]`;
  const SKIP = { mustMatch: [new RegExp(`focus:${CTA} focus:${FG}`)], mustNot: [/focus:bg-primary/, /focus:text-primary-foreground/] };

  const PATTERNS: Record<string, { mustMatch: RegExp[]; mustNot: RegExp[] }> = {
    "skip-framework": SKIP,
    "skip-project": SKIP,
    "skip-company": SKIP,
    "skip-globals-css": {
      mustMatch: [/\.skip-link \{[^}]*background: var\(--vn-color-cta-bg\);\s*color: var\(--vn-color-cta-fg\);/],
      mustNot: [/\.skip-link \{[^}]*var\(--primary(-foreground)?\)/],
    },
    "checkbox-checked": {
      mustMatch: [
        new RegExp(`data-\\[state=checked\\]:${CTA} data-\\[state=checked\\]:${FG} dark:data-\\[state=checked\\]:${CTA}`),
        /data-\[state=checked\]:border-\[var\(--vn-color-cta-bg\)\]/,
      ],
      mustNot: [/checked\]:bg-primary/, /checked\]:text-primary-foreground/, /checked\]:border-primary/],
    },
    "case-study-hover": {
      mustMatch: [new RegExp(`group-hover:${CTA} group-hover:${FG}`)],
      mustNot: [/group-hover:bg-primary/, /group-hover:text-primary-foreground/],
    },
    "projectdetail-tab": {
      // dark:data-[state=active]:* es necesario: TabsTrigger trae dark:data-[state=active]:bg-input/30
      // con mayor especificidad que data-[state=active]:*, así que sin él el tema oscuro lo ignoraba.
      mustMatch: [new RegExp(`data-\\[state=active\\]:${CTA} data-\\[state=active\\]:${FG} dark:data-\\[state=active\\]:${CTA} dark:data-\\[state=active\\]:${FG}`)],
      mustNot: [/active\]:bg-primary(?!\/)/, /active\]:text-primary-foreground/],
    },
    "language-reload": {
      mustMatch: [new RegExp(`rounded-md ${CTA} px-4 text-sm font-semibold ${FG} hover:bg-\\[var\\(--vn-color-cta-bg-hover\\)\\]`)],
      mustNot: [/rounded-md bg-primary px-4/, /font-semibold text-primary-foreground/],
    },
    "input-selection": {
      mustMatch: [new RegExp(`selection:${CTA} selection:${FG}`)],
      mustNot: [/selection:bg-primary/, /selection:text-primary-foreground/],
    },
  };

  for (const s of CTA_SURFACES_C3) {
    it(`${s.file.split("/").pop()} · ${s.label}: usa --vn-color-cta-*`, () => {
      const code = src(s.file);
      const p = PATTERNS[s.id];
      expect(p, s.id).toBeTruthy();
      for (const re of p.mustMatch) expect(code).toMatch(re);
      for (const re of p.mustNot) expect(code).not.toMatch(re);
    });

    it(`${s.id}: ratios antes → después (dark cumple AA, light no empeora)`, () => {
      for (const k of s.cases) {
        const before = minRatio(k, "before").ratio;
        const after = minRatio(k, "after").ratio;
        expect(after, `${k.label} ${k.theme}`).toBeGreaterThanOrEqual(required(k));
        if (k.theme === "light") expect(after, `${k.label} light`).toBeGreaterThanOrEqual(before - 1e-9);
      }
    });
  }

  it("valores clave: blanco sobre azul dark 3.50 → 5.76:1; caja del checkbox vs página dark ≥ 3:1", () => {
    const skip = CTA_SURFACES_C3.find((x) => x.id === "skip-framework")!.cases.find((k) => k.theme === "dark")!;
    expect(minRatio(skip, "before").ratio).toBeCloseTo(3.5, 2);
    expect(minRatio(skip, "after").ratio).toBeCloseTo(5.76, 2);
    const reload = CTA_SURFACES_C3.find((x) => x.id === "language-reload")!.cases.find((k) => k.theme === "dark" && k.label.endsWith("hover"))!;
    expect(minRatio(reload, "after").ratio).toBeCloseTo(6.79, 2);
    const box = CTA_SURFACES_C3.find((x) => x.id === "checkbox-checked")!.cases.find((k) => k.label.includes("caja") && k.theme === "dark")!;
    expect(minRatio(box, "after").ratio).toBeGreaterThanOrEqual(3);
  });

  it(".skip-link efectivo (cascada global.css → design-system.css) sigue ≥ 4.5:1 y no se toca", () => {
    const ds = src("src/styles/design-system.css");
    expect(CSS.global).toMatch(/\.skip-link \{[^}]*background: var\(--vn-color-brand-dark\);\s*color: #ffffff;/);
    expect(ds).toMatch(/\.skip-link:focus-visible \{[^}]*background: var\(--color-noche\);\s*color: var\(--color-marfil\);/);
    const prim = (n: string) => CSS.vnTokens.match(new RegExp(`${n}:\\s*(#[0-9a-fA-F]{3,8})`))![1];
    const noche = parseColor(prim("--vn-primitive-azul-noche"));
    expect(contrast(parseColor("#ffffff"), noche)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(parseColor(prim("--vn-primitive-marfil")), noche)).toBeGreaterThanOrEqual(4.5);
  });
});

const fmtStops = (stops: RGBA[]) => stops.map((x) => (x.a === 0 ? "transparent" : x.a < 1 ? `${hex(x)}/${Math.round(x.a * 100)}%` : hex(x))).join("→");

if (process.env.GRADIENT_REPORT) {
  it("reporte", () => {
    // Tabla resumida por entrada: peor caso (menor margen ratio/requerido) antes y después.
    const rows = [
      "| Archivo | Componente · elemento | Texto (peor caso) | Degradado (después) | Req. | Antes | Después | Estado |",
      "|---|---|---|---|---|---|---|---|",
    ];
    for (const e of INVENTORY) {
      if (e.status !== "checked") {
        rows.push(`| \`${e.file}\` | ${e.component} · ${e.element} | — | — | — | — | — | ${e.status}${e.note ? `: ${e.note}` : ""} |`);
        continue;
      }
      const scored = e.cases!.map((k) => ({ k, b: minRatio(k, "before"), a: minRatio(k, "after"), req: required(k) }));
      const worstB = scored.reduce((m, x) => (x.b.ratio / x.req < m.b.ratio / m.req ? x : m));
      const worstA = scored.reduce((m, x) => (x.a.ratio / x.req < m.a.ratio / m.req ? x : m));
      const k = worstA.k;
      const txt = val(k.text, "after");
      const layers = val(k.layers, "after");
      const fmt = (r: number, req: number) => `${r.toFixed(2)}${r < req ? " ❌" : " ✅"}`;
      const changed = worstB.b.ratio < worstB.req;
      rows.push(
        `| \`${e.file}\` | ${e.component} · ${e.element} (${e.cases!.length} casos) | ${fmtStops(txt)} · ${k.size}${k.why ? ` (${k.why})` : ""} | ${layers.map((l) => fmtStops(l.stops) + (l.opacity !== undefined ? ` ×${l.opacity}` : "")).join(" + ") || `(sobre ${hex(toRGBA(k.base))})`} | ${worstA.req} | ${fmt(worstB.b.ratio, worstB.req)} (${worstB.k.label}, ${worstB.k.theme}) | ${fmt(worstA.a.ratio, worstA.req)} (${k.label}, ${k.theme}) | ${changed ? "corregido" : "ok"} |`
      );
    }
    writeFileSync(process.env.GRADIENT_REPORT!, rows.join("\n") + "\n");
  });
}
