# Navegación, secciones y atomic design

> Última actualización: 2026-07-08 · Nav unificado (`nav-config.ts` + `NAV_SURFACE`)

Guía de referencia para mantener el chrome de navegación y las secciones del portafolio alineadas con mobile UI y atomic design.

---

## Resumen ejecutivo

| Área | Decisión |
|------|----------|
| **Breakpoints nav** | Dock inferior `< lg` (1024px); header completo `≥ lg` |
| **Config nav** | Una fuente: `src/lib/nav-config.ts` (`NAV_SURFACE`, `executeNavAction`) |
| **Dock** | `NavDock` organism con variantes `home` \| `deep` — **3 slots** (P0) |
| **Header desktop** | **2 primarios** (Negocios · Contacto); resto en «Más» (P0) |
| **Hero** | 3 path cards (`HeroAudienceCta` equal) — sin combobox (P0) |
| **QA nav** | `npm run qa:nav` — valida orden estratégico y matchers |
| **Secciones** | Primitivo `PageSection` en `layout/` |
| **Scroll anclas** | `scrollToSection()` respeta `--header-height` |
| **Subpáginas** | `SubpageToolbar` + `DeepPageNav` (mismos 3 destinos del dock) |

---

## Atomic design — capas

```
lib/
  nav-config.ts          ← NAV_REGISTRY + NAV_SURFACE (header, dock, mobile)
  scroll-to-section.ts   ← scroll con offset de header
  routes.ts              ← rutas canónicas

atoms/
  NavTabItem             ← tab 44×44 del dock
  LanguageToggle         ← compact (header mobile) | full (desktop)
  ThemeToggle
  Logo / LogoMark

molecules/
  BottomNav              ← wrapper → NavDock variant="home"
  DeepPageNav            ← wrapper → NavDock variant="deep"
  MobileMenu             ← drawer secundario (hamburger)
  SubpageToolbar         ← header en subpáginas
  SectionHeader          ← badge + título + descripción

organisms/
  Navigation             ← header fijo home (desktop nav + mobile chrome)
  NavDock                ← dock inferior unificado
  Hero, About, Contact…  ← contenido; usan PageSection donde aplique

layout/
  PageSection            ← section + container + tokens responsive
  PageShell              ← subpágina: toolbar + main
  PortfolioChrome        ← data-nav, providers
```

### Reglas

1. **No duplicar ítems de navegación** — editar solo `nav-config.ts`.
2. **No usar `scrollIntoView` directo** — usar `scrollToSection` o `navigateToPageSection`.
3. **Nuevas secciones de landing** — preferir `PageSection` con tokens existentes.
4. **`ui/`** — primitivos shadcn; no mezclar lógica de negocio ahí.

---

## Modos de chrome

### Home (`/`)

| Viewport | Header | Dock | Menú |
|----------|--------|------|------|
| `< lg` | Logo + idioma + tema + hamburger | 5 tabs fijos | `MobileMenu` drawer |
| `≥ lg` | Logo + nav primaria + Más + tema + idioma | oculto | — |

**Dock** (`NAV_SURFACE.dock`): Inicio · **Consultoría** (centro liquid) · Contacto  
- P0 board: dock de 5 → **3**, conservando CTA central.  
- Negocios / Proceso / Experiencia / Auditoría → header «Más» o drawer móvil.  
- Inicio / Contacto → anclas en home; Contacto → `/contacto` en profundidad.  
- Consultoría → `/consultoria` (conversión principal).

**Header desktop** (`NAV_SURFACE.headerPrimary`): **Negocios · Contacto**  

**Más** (`NAV_SURFACE.headerMore`): Experiencia · Consultoría ✦ · Proceso · Sobre mí · Auditoría UX · Design System · UX Tools  

**Hero** (`HeroAudienceCta` layout `equal`): Demo X\|CMS · Experiencia · Auditoría — click directo al contenido (sin buscador).  

**Menú móvil** (`NAV_SURFACE.mobileDrawer`): Inicio → bloque estratégico → divisor «Más» → utilidades.

### Subpáginas (`isDeepPortfolioPage`)

Todo path distinto de `/` activa `html[data-nav="subpage"]`:

| Elemento | Comportamiento |
|----------|----------------|
| `Navigation` | No se renderiza |
| `SubpageToolbar` | Sticky top; logo + breadcrumbs + tema + idioma |
| `DeepPageNav` | Mismos 5 destinos; Contacto → `/contacto` |
| `--header-height` | `0` (toolbar es el header visual) |
| `page-shell` padding-bottom | `--bottom-nav-total` solo `< lg` |

---

## `PageSection` — API

```tsx
import { PageSection } from "../layout/PageSection";

<PageSection
  id="experiencia"
  padding="compact"      // compact | default | spacious
  width="wide"           // narrow (4xl) | content (6xl) | wide (7xl)
  tone="section"         // default | muted | matte | section
  aria-labelledby="experience-heading"
>
  <SectionHeader … />
  {/* contenido */}
</PageSection>
```

### Tokens de spacing

| Token | Clases | Uso típico |
|-------|--------|------------|
| `compact` | `py-10 sm:py-12 md:py-16` | About, Contact, Experience |
| `default` | `py-12 sm:py-14 md:py-20` | Secciones estándar |
| `spacious` | `py-16 sm:py-20 md:py-24` | ProjectsTeaser, Testimonials |

Horizontal: `px-4 sm:px-6` en todas. Anclas: `scroll-mt-[calc(var(--header-height)+0.75rem)]`.

### Secciones ya migradas (home)

- `AboutTeaser`, `About`, `Experience`, `ImpactStats`
- `ProjectsTeaser`, `Testimonials`, `Contact`

**Pendiente opcional:** `ValueCarouselBanner`, páginas de detalle (`ProjectDetail`, etc.).

---

## Variables CSS (`global.css` + `global.css`)

```css
:root {
  --header-height: 4rem;        /* 5rem ≥ 640px */
  --bottom-nav-height: 4rem;
  --bottom-nav-total: calc(var(--bottom-nav-height) + env(safe-area-inset-bottom, 0px));
}

/* Solo mobile/tablet */
@media (max-width: 1023px) {
  html { scroll-padding-bottom: var(--bottom-nav-total); }
  .site-footer { padding-bottom: var(--bottom-nav-total); }
}
```

Floating UI (`BackToTop`, `StickyCTA`) usa `max-lg:bottom-[calc(var(--bottom-nav-total)+0.75rem)]`.

---

## Checklist QA mobile

Viewport: **375×812** (iPhone) y **768×1024** (iPad).

```
□ Dock visible < 1024px; oculto en desktop
□ 5 tabs legibles (truncate en 320px)
□ Tap Inicio → scroll / home según contexto
□ Tap Contacto → #contacto (home) o /contacto (subpágina)
□ Hamburger no tapa dock (drawer termina en --bottom-nav-total)
□ Anclas no quedan bajo header
□ SubpageToolbar: tema + idioma funcionan
□ Hero: sin solapamiento con dock (padding inferior)
□ Experience: línea temporal visible en móvil
□ Focus visible en tabs y controles header
```

---

## Cómo extender

### Añadir ítem de navegación

1. Registrar en `NAV_REGISTRY` y añadir el `id` a la superficie correcta en `NAV_SURFACE` (dock, headerPrimary, headerMore, mobileDrawer).
2. Extender `getStaticNavAction` / `matchNavItemActive` si aplica.
3. Ejecutar `npm run qa:nav` antes del merge.

### Nueva sección en home

```tsx
<PageSection id="mi-seccion" padding="default" width="wide" tone="muted">
  <SectionHeader … />
</PageSection>
```

### Nueva subpágina

- Envolver en `PageShell` con crumbs.
- `App.tsx` ya renderiza `DeepPageNav` vía `isDeepPortfolioPage`.

---

## Commits de referencia (julio 2026)

| Commit | Tema |
|--------|------|
| `7f3f5f57` / `833f3aee` | Hero CTAs por audiencia |
| `6e99735c` | Avatar, logos tema, branding |
| `bb00eb59` | Retoque foto perfil |
| `ce4d9e8b` | Nav + PageSection responsive |

**Producción:** https://vientonorte.io/