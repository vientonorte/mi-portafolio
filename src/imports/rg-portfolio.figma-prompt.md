# Brief — Rodrigo Gaete Portfolio DS

## Contexto
Portafolio Lead UX (Fintech & Mobility). Marca minimalista, superficies mate de evidencia, regla de color 70-20-10.

## Tokens de diseño (importar como Figma Variables)

### Colores
- brand/red: #FF1D25
- brand/orange: #FF931E
- brand/gradient: 135deg #FF1D25 → #FF931E (solo CTAs y highlights ~10%)
- neutral/background: #FFFFFF
- neutral/foreground: #171717
- neutral/muted-foreground: #525252
- neutral/border: #E5E5E5
- surface/matte-elevated: #F7F5F1
- semantic/primary (light): #FF1D25
- semantic/primary (dark): #FF931E

### Tipografía
- Display/UI: Chillax (300, 400, 500, 700)
- Mono/labels: mono del sistema, 12px, tracking 0.1em
- Body: 16px / 1.6
- H2: 28–40px Bold / 1.3 / -0.01em

### Espaciado (base 4px)
- spacing.1: 4px
- spacing.2: 8px
- spacing.3: 12px
- spacing.4: 16px
- spacing.5: 20px
- spacing.6: 24px
- spacing.7: 32px
- spacing.8: 40px
- spacing.9: 48px
- spacing.10: 64px
- spacing.touch-min: 44px

### Radius
- radius.sm: 8px
- radius.md: 10px (paso deliberado fuera de cuadrícula 4px)
- radius.lg: 12px
- radius.xl: 16px
- radius.full: full

### Accesibilidad
- Contraste ≥ 4.5:1
- Touch targets ≥ 44px
- Foco: outline 2px primary · offset 2px

## Frames
- Mobile: 375×812
- Tablet: 768×1024
- Desktop: 1440×900

## Biblioteca de componentes a reconstruir en Figma
1. LogoMark (RG) + Logo lockup — plato mate
2. Button — Primary / Secondary / Outline / Ghost / Destructive · sm/md/lg · default/hover/focus/disabled
3. Badge — Default / Secondary / Outline / Destructive
4. Card — Header + Description + Content · matte elevated
5. HeroResultCard — métrica + descripción + logo cliente
6. ImpactMetricCard — KPI + spoiler + enlace a fase
7. Input — default / disabled / focus
8. Alert — info con icono

## Reglas
- Sin glass/blur en métricas
- Gradiente solo en CTAs, acento del isologo y highlights
- Logos cliente: wordmark-sm + flat sobre cards matte
- Baseline WCAG 2.2 AA

## Entregables
- [ ] Collection Variables Light + Dark
- [ ] Estilos tipográficos
- [ ] Variables spacing + radius
- [ ] Component set con variantes
- [ ] Frames sample desktop + mobile
