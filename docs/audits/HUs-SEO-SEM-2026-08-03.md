# HUs · SEO orgánico + SEM oferta

**SoT Obsidian:** `Viento Norte/Sprints/2026-08-03 HUs SEO-SEM path-oferta.md`  
**DS:** DS-2026-08-03 path-oferta-analytics · **Día:** Map → **Prototype**  
**Firma Decider 2026-08-03:** P0 HU-01…04 **sí** · copy meta home/SEM **ok** · Empezar home → onboarding (no SEM) · SEM = entrada paid + onboarding local · re-Map tour-vs-embudo **rechazada** · SEM spend $0 hasta Test  

**Prototype 2026-08-03:** HU-01 / HU-02 / HU-03 implementados en código (DoD local). Pendiente: deploy Pages + HU-04 en prod.

## Resumen ejecutivo

| ID | Título | Prio | Superficie |
|----|--------|------|------------|
| **HU-01** | SEO root marca Viento Norte | P0 | `https://vientonorte.io/` |
| **HU-02** | SEM URL — canonical + meta message-match | P0 | `https://vientonorte.io/#/consultoria` |
| **HU-03** | Sitemap + robots al día | P0 | `sitemap.xml` / `robots.txt` |
| **HU-04** | Gate SEM sin gastar (Q5) | P0 gate | Doc + QA Decider |
| **HU-05** | Branding FO coherente ES/EN share | P1 | meta + OG |
| **HU-P2-01** | URLs sin hash (BrowserRouter) | P2 | infra |
| **HU-P2-02** | CWV monitor continuo | P2 | Lighthouse/GSC |

## Reglas

1. **Diseño antes de código:** no se declara done por commit exploratorio; se cierra por CA de cada HU.  
2. **SEM spend = $0** hasta Test del embudo (DS).  
3. **Lab admin / OB-RIA** no entra en estas HUs (apuesta B, otro slice).  
4. **Hash `#`** es constraint actual; limpieza de URL = P2.

## Flujo

```
✅ Firma DoR Decider (2026-08-03)
  → Prototype HU-01/02/03/05 → deploy
  → HU-04 checklist Decider → (DS Test path) → SEM opcional
```

Detalle completo (CA tablas, DoR/DoD, riesgos): vault Obsidian link arriba.
