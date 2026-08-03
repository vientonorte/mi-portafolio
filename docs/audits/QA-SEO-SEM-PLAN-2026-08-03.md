# Auditoría QA · SEO · SEM — plan aplicado 2026-08-03

**Fuente PDF:** `docs/audits/Auditoria_Vientonorte_QA_SEO_2026-07.pdf`  
**Decider:** Rö · **Marco:** Design Sprint VN (Map) · no SEM spend sin Test path  
**Live:**

| Uso | URL canónica |
|-----|----------------|
| **SEO orgánico** | https://vientonorte.io/ |
| **SEM / paid final URL** | https://vientonorte.io/#/consultoria |

---

## 1 · Hallazgos del PDF (resumen)

| Dimensión | Estado pre-fix | Acción PDF |
|-----------|-----------------|------------|
| SEO técnico SPA + hash | HashRouter `/#/…` | Meta estáticos + JSON-LD; SSR = P2 |
| CWV / Lighthouse | CI `lighthouse.yml` existe | Monitoreo GSC + no regresar CLS |
| SEM captación | URL oferta definida | Message-match + keywords; **no gastar** sin Test |
| QA / E2E | CI build-smoke | E2E Playwright = parking |
| Branding | Meta home decía “Rodrigo Gaete · UX Lead” | Alinear a **Viento Norte** FO |

---

## 2 · Aplicado 2026-08-03 (código)

### SEO — `https://vientonorte.io/`

- [x] Title/description **marca VN** (i18n `seo.pages.home` ES/EN) — deja de ser portfolio personal en Helmet
- [x] Keywords orgánicos FO (pyme, UXtech, módulos, WCAG)
- [x] Static `index.html`: description alineada a hero live · OG/Twitter · **JSON-LD** Organization + WebSite + ProfessionalService
- [x] `link rel="alternate"` hacia SEM offer URL
- [x] `sitemap.xml` lastmod 2026-08-03 · prioridad root 1.0

### SEM — `https://vientonorte.io/#/consultoria`

- [x] **Bugfix:** `canonical` en superficie SEM apuntaba a `ROUTES.consultingFunnel` (`/`) → ahora `ROUTES.consulting` (`/consultoria`) → `https://vientonorte.io/#/consultoria`
- [x] Title/description message-match (“Elige tu alcance” / diagnóstico·prototipo·proceso·app)
- [x] Keywords SEM propios (design sprint, arquitectura fintech, flujos UX) vía `seo.pages.consultoria.keywords`
- [x] `data-role="fo-sem-offer"` (antes `fo-funnel-legacy`)
- [x] Constantes `SEO_SITE.semOfferUrl` / `seoHomeUrl` en `src/lib/seo.ts`

### Branding (Google + Ads message-match)

| Capa | Canon |
|------|--------|
| Marca pública | **Viento Norte** (no wordmark personal en FO B2B) |
| Root SEO | Módulos / UXtech / dueño del dato |
| SEM landing | Elige alcance · free a11y · kickoff &lt;24 h |
| Persona / casos | `/#/sobre-mi`, `/#/proyectos` — no final URL de ads pyme |

---

## 3 · Buenas prácticas Google (checklist)

| Práctica | Estado |
|----------|--------|
| Title único y ≤ ~60 chars | Home / consultoria revisados |
| Meta description ~155–160 | Trim en `SEOHead` |
| Canonical por superficie | Fix SEM 03 ago |
| OG + Twitter estáticos (share sin JS) | `index.html` |
| Structured data JSON-LD | `index.html` @graph |
| robots + sitemap | `public/robots.txt` · `public/sitemap.xml` |
| Final URL Ads = landing real | `/#/consultoria` documentada |
| Message-match anuncio ↔ H1/CTA | Copy hero ya live; meta alineada |
| No gastar SEM sin path usable | Gate DS (Test) — **sin spend en este PR** |
| URLs sin hash (path history) | **P2** — requiere BrowserRouter + 404 SPA + retest |

---

## 4 · No aplicado (parking / DS)

| Ítem | Por qué |
|------|---------|
| SSR / pre-render por ruta | Scope infra; hash limita indexación profunda |
| GTM / GA4 full / SEM live | Post-Test embudo (DS rule) |
| E2E Playwright suite | QA P1; CI smoke ya existe |
| Lab admin OB-RIA | Pre-Decide B; Sketch/Decide, no SEO |
| BrowserRouter migration | Mejora URL “limpia”; proyecto aparte |

---

## 5 · Verificación post-deploy

1. View-source `https://vientonorte.io/` → JSON-LD + title VN  
2. Abrir `/#/consultoria` → DevTools `<link rel="canonical">` = `https://vientonorte.io/#/consultoria`  
3. Document title SEM ≠ home  
4. GSC: reenviar sitemap cuando Pages despliegue  
5. Ads (cuando Test OK): final URL exacta `https://vientonorte.io/#/consultoria`

---

## 6 · Relación Design Sprint

- Map 03 ago: path FO usable + superficies B  
- SEO/SEM técnico aquí = **habilita** Q5 (message-match antes de gastar)  
- No reemplaza Test humano ni Decide de lab
