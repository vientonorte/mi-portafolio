# Auditoría canon de URLs · docs y logs · 2026-10

**Fecha:** 2026-10-02 (CLT, UTC-3). **Base:** `origin/main` @ `f85db15`. **Rama:** `docs/auditoria-canon-docs`.
**Alcance:** `docs/`, los README, los `.md`, `.txt` y `.log` versionados (102 archivos). Insumo: `vn-auditoria-docs-logs-2026-10-01.md` (brief del box).
**Regla del PR:** solo arreglos de texto documentales. No se tocan código, tests, configs ni JSON de datos; esos quedan como pendientes (§4). Los logs históricos no se reescriben: se marcan como superados o solo se listan.

## 1. Canon vigente (referencia)

- **Link final para clientes:** `https://vientonorte.io/servicios/?<utm>`, con ancla opcional `#web-pymes`, `#revision-gratis` o `#consultoria-ux`. La UTM va **antes** del ancla.
- **Páginas de rubro permitidas:** `/servicios/web-dental/`, `/servicios/web-contable/` y `/servicios/web-juridico/`. Hoy `src/data/rubros.json` en main solo tiene `web-dental`, y `rubros-guard.test.ts` falla si una fuente (src/public/scripts) nombra un rubro que no existe.
- **Denylist:**
  - `/servicios/diagnostico-accesibilidad-wcag/` y `/servicios/consultoria-ux-pymes/`
  - `/s/`, salvo `/s/polijuego-privacy/`
  - `/#/`, `/news/`, `/qa/` y `/mi-portafolio/`
- **Dev local:** `http://localhost:3000/` (`vite.config.ts` → `server.port: 3000`). El 5173 está obsoleto.
- **Prod:** GitHub Pages en `vientonorte.io`. `vientonorte.github.io` ya no se usa como URL pública.

## 2. Resumen

- **Hallazgos (archivo:línea):** 264, en 50 archivos. Se descartaron 9 falsos positivos: links a `github.com/vientonorte/mi-portafolio/...` y el nombre del repo hub `vientonorte.github.io` en DEPLOY.md:7 y :16.
- **Por clasificación:**
  - Log histórico: trata como vigente una URL hoy fuera del canon: **113**
  - Doc vivo: trata como vigente una URL fuera del canon: **100**
  - Guía legado: instrucción obsoleta: **27**
  - Interno QA/infra: OK si no se envía a clientes: **12**
  - Correcto: declara la regla o la denylist: **7**
  - Interno (`#/admin`): OK si no se envía a clientes: **4**
  - Otra app en github.io: por revisar: **1**
- **Por acción en este PR:**
  - Solo listado: **110**
  - Banner de canon arriba (línea sin reescribir): **67**
  - **Corregido** en este PR: **40**
  - Marcado como superado (banner), sin reescribir: **28**
  - Sin cambio: **19**
- **Arreglo obligatorio:** `docs/DEMO-X-CMS-CAMPAIGN.md`.
  - Se marcó **DEPRECADO** el gate `/#/demo/x-cms` como URL de campaña.
  - Los ejemplos `…/mi-portafolio/#/demo/x-cms?utm_…` se reemplazaron por `https://vientonorte.io/servicios/?utm_…#consultoria-ux`.
  - El local pasó a `http://localhost:3000/`.

## 3. Tabla completa de hallazgos

Patrones buscados: `/s/` (salvo polijuego-privacy), `/#/`, `/news/`, `/qa/`, los slugs viejos de `/servicios/`, `5173`, `vientonorte.github.io` y `/mi-portafolio/`. La columna «Acción» describe el estado **después** de este PR.

| Archivo:línea | Patrón | Extracto (origin/main) | Clasificación | Acción |
|---|---|---|---|---|
| `.github/pull_request_template.md:3` | /qa/ | `- [ ] **QA humano de Rö:** para el ship a '/qa/' o 'main', hay un bloque reservado en su calendario con la …` | Interno QA/infra: OK si no se envía a clientes | Sin cambio |
| `CHANGELOG.md:10` | /#/ | `Home '/#/': Agendar + Gratis + Ver prototipo (Apple POC). Laptop abre '/#/consultoria/modulos/dashboard'. D…` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:16` | /#/ | `Header primary llega a fichas HTTP ('/servicios/'). Más: News + SEM '/#/consultoria'. Home: especialidades …` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:22` | /s/, /#/ | `'/#/' muestra cómo llegar a las landings HTTP. Privacidad de datos (Ley 21.719) es especialidad. Cada news …` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:28` | /#/ | `Embudo '/#/consultoria': primario **Agendar**, Gratis / Ver prototipo / demo X\|CMS como links.` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:29` | /#/ | `POC '/#/consultoria/modulos/dashboard': skip y Empezar → embudo (no home). Un sólido Agendar. Intro = Ver m…` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:35` | /#/ | `'/servicios/seguridad-privacidad-digital/' es ficha Ley 21.719, no el tour X\|CMS. POC Apple = '/#/consulto…` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:39` | /s/ | `## [2026-09-14] — Ads: '/s/consultoria' deprecado` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:41` | /#/ | `Final URL DoD = '/#/consultoria' (UTM tras el hash). Lock ads-query falla si la URL sigue en '/s/'.` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:48` | /#/ | `## [2026-09-14] — Fase 2: CTAs '/servicios/*' → '/#/consultoria'` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:50` | /s/, /#/ | `Producto UI = Hash '/#/consultoria'. Orgánico HTTP se queda. Piloto Ads '/s/consultoria/' intacto.` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:53` | /#/ | `- Generador: nav + Hablemos/Gratis + **POC Apple** (dashboard X\|CMS) apuntan a '/#/consultoria'.` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:54` | /s/, /#/ | `- 'public/s/share.css' bloque '.share-poc'. Hub SPA '/#/landings' mismo prototipo.` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:63` | /s/, /#/ | `Decide: UI / DoD = '/#/consultoria'. Orgánico = '/servicios/*'. '/s/consultoria/' = **piloto Ads** (200, no…` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:70` | /s/ | `- Sin HTML live. Sin hop. Sin '/consultoria/' HTTP. Ads lock '/s/consultoria' intacto. #261/#262 no merge.` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:74` | /s/ | `## [2026-09-09] — Purge '/s/news' orphan (LinkedIn OG)` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:77` | /s/, /news/ | `- LinkedIn OG mostraba **"News para empresas"** porque el hop crawler '/s/news' (y alias '/news') seguía en…` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:78` | github.io | `- Deploy a 'vientonorte.github.io': force-remove de 's/news', 'news' (y 'images/news' si no viene en dist) …` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:79` | /s/ | `- Weekly LinkedIn CTA vuelve a '/s/consultoria/?utm_source=linkedin&utm_medium=organic&utm_campaign=weekly_…` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:82` | /s/ | `- '.github/workflows/news-autorun.yml' ('if: false') y 'scripts/build-news-hops.py' (no-op): no regenerar '…` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:83` | /s/ | `- Nav/footer '/s/**' sin link News; sitemap sin locs '/s/news*'.` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:90` | /#/ | `## [2026-09-07] — QA HashRouter UI ('/#/' only)` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:93` | /#/ | `- 'scripts/qa-hash-ui.mjs' + 'npm run qa:hash-ui': Playwright sobre '/#/', '/#/consultoria', '/#/proceso', …` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:103` | /#/ | `- Acceso nav a '/#/auditoria': fuera del registry, callbacks y 'App'. La ruta sigue noIndex (muestra mentor…` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:110` | /s/, /#/, /mi-portafolio/ | `- Live '/mi-portafolio/' devolvía el SPA (200 + 'location.replace' a '/#/') → GSC **Error de redirección**.…` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:111` | /#/ | `- '/poc' ya no salta a '/#/consultoria'. Sitemap 'lastmod' 2026-09-07 para recrawl de '/s/**' post-#241.` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:122` | /#/ | `- '/#/proceso': H1 **Diseño que reduce el ruido**; CTA consultoría no «Negocios». News: lead sin jerga PAUSED.` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:125` | /s/, /#/ | `- Canon UI = HashRouter ('/#/proceso'), no '/s/proceso/index.html'.` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:132` | /s/ | `- HTML crawler '/s/**' ya no es un dump sin UI: skip-link, 'header' banner, nav Principal, miga, 'main#main…` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:134` | /#/ | `- Sigue **sin** meta-refresh ni 'location.replace' a '/#/' (GSC).` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:144` | /#/ | `- Páginas crawler 'public/s/**' ya no hacen meta-refresh 5s ni 'location.replace' a '/#/…'. Canonical '/s/……` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:159` | /s/ | `- 'public/sitemap.xml': se saca 'https://vientonorte.io/s/' (canonical a home = duplicado). Quedan '/', '/s…` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:166` | /#/ | `- Hero SEM ('ConsultoriaLandingHero'): mockup laptop X\|CMS ('data-hero-version="3"') en vez de teselas de …` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:172` | /s/ | `- No merge a 'main'. Live HTML '/s/consultoria' sigue last-mod 27 ago hasta deploy.` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:176` | /s/ | `## [2026-08-27] — SEM: operaciones digitales en '/s/consultoria'` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:179` | /s/ | `- Meta, OG, JSON-LD y cuerpo crawler de '/s/consultoria' nombran **operaciones digitales** (message match A…` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:190` | /s/ | `- '/s/consultoria', '/s/', 'index.html' (meta + LCP shell) con el mismo relato para message-match Ads.` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:195` | /s/, /#/ | `- HTML crawler '/s/proceso/' (hop a '/#/proceso', GTM, OG 1200×630). Sitemap +1 loc.` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:196` | /#/ | `- Capa de método en '/#/proceso' (branding, analytics, research, CM, social) sobre CMS/CRM del cliente. CTA…` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:202` | /s/ | `- '/s/consultoria', RSA, Radio, GTM eventos, tour Apple.` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:207` | /#/ | `- '/#/privacy': layout VN (badge, título Chillax, cards 4 principios, inventario, ARSOPL como acciones, enl…` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:216` | /#/ | `## [2026-08-22] — Recarga /#/sobre-mi: LCP shell no tapa inner routes` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:219` | /#/ | `- El overlay LCP de home (#206) esperaba '#inicio'. En '/#/sobre-mi' nunca llega: recarga = pantalla “Tecno…` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:226` | /#/ | `- QA VB-SOBRE-MI en '/#/sobre-mi': chips **7+ años** (craft) y **3+ lead** (mobility→wealth) otra vez visib…` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:241` | /s/ | `## [2026-08-20] — '/s/consultoria' GTM, sin gtag paralelo` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:245` | /s/ | `- Hop 1.5 s al SPA; Tag Assistant / 'gtm_debug' se quedan en '/s/consultoria'.` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:257` | /#/ | `- 'https://vientonorte.io/poc#/auditoria' redirige a '/#/consultoria'. No es freemium.` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:258` | /s/, /#/ | `- '/#/auditoria' = muestra mentoría, 'noindex'. Paid = '/s/consultoria'.` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:263` | /#/ | `- '/#/consultoria': tres radios Diagnóstico / Prototipo / Proceso. SKU Radar·Marco·Ops no se pinta.` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:265` | /s/ | `- Hero sin Calendar ni CTAs duales. '/s/consultoria' lista 3 alcances + kickoff 30 min.` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:289` | /s/ | `## [2026-08-18] — Tag Assistant no pierde '/s/consultoria'` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:298` | /s/ | `- '/s/' y '/s/consultoria': H1 + Diagnóstico · Prototipo · Proceso · App. Description con el query.` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:299` | /s/ | `- Canonical de '/s/consultoria' = 'https://vientonorte.io/s/consultoria/' (ya no el hash).` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:300` | /s/ | `- 'sitemap.xml' solo lista '/', '/s/' y '/s/consultoria/'. Sin '#/'.` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:302` | /s/ | `## [2026-08-16] — '/s/consultoria' lleva la Etiqueta de Google` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:317` | /#/ | `- Reloj de '/#/demo/diagnostic' de 3 min a **1 min** (poster; 3 min era largo).` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:322` | /#/ | `- 'duct-juice-51509104.figma.site' ya no se iframea ni se abre desde el FO. Diagnóstico usa poster; la card…` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:337` | /s/ | `## [2026-08-16] — '/s/consultoria' lleva GTM` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:341` | /#/ | `- El redirect a '/#/consultoria' espera el hit y conserva 'gclid' / UTM.` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:346` | /#/ | `- '/#/demo/*' usa PageShell, Badge, Card y tokens de marca (gradiente VN).` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:354` | /#/ | `- Demos '/#/demo/*' sin dock del sitio (el iframe no queda debajo).` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:362` | /#/ | `- Rutas: '/#/demo/diagnostic' · '/#/demo/prototype' · '/#/demo/process' · '/#/demo/app'.` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:363` | /#/ | `- '/#/demo/x-cms' sigue siendo el alias de campaña del prototipo (5 min).` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:366` | /#/ | `## [2026-08-16] — '/#/consultoria' = solo funnel 01–02–03` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:370` | /#/ | `- App strip, método y demos quedan fuera de '/#/consultoria' (siguen en '/' o interiores).` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:372` | /#/ | `## [2026-08-15] — SEM: '/#/consultoria' = funnel 3 packs + OB` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:375` | /#/ | `- Paid landing '/#/consultoria' usa el mismo funnel que home (Diagnóstico · Prototipo · Proceso), no el tou…` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:378` | /#/ | `- Tour de módulos queda en '/#/consultoria/modulos/:id'.` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:396` | /#/ | `- Fuera del landing: onboarding, N2N, edu y demos (viven en '/proceso', '/proyectos', '/#/consultoria').` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:429` | /s/ | `- OG 1200×630 (home + consultoría) y rutas de share **sin hash** '/s/' · '/s/consultoria'.` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:433` | /#/ | `## [2026-08-03] — SEO root + SEM '/#/consultoria' (audit QA)` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:436` | /#/ | `- **Canonical SEM:** en '/#/consultoria' el 'SEOHead' usaba 'ROUTES.consultingFunnel' ('/') → ahora 'ROUTES…` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `CHANGELOG.md:446` | /#/ | `- SEM '/#/consultoria' = entrada paid; Empezar allí → onboarding local.` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `DEPLOY.md:4` | /mi-portafolio/ | `**Canon:** 'https://vientonorte.io/' (sin '/mi-portafolio/')` | Correcto: declara la regla o la denylist | Sin cambio |
| `DEPLOY.md:28` | /mi-portafolio/ | `· upload-pages-artifact + deploy-pages (path /mi-portafolio/ en Pages de este repo)` | Doc vivo: trata como vigente una URL fuera del canon | Solo listado |
| `DEPLOY.md:63` | /qa/ | `- [ ] **Ship a '/qa/':** bloque de QA humano de Rö reservado en su calendario, con la URL de QA, los PRs in…` | Interno QA/infra: OK si no se envía a clientes | Sin cambio |
| `DEPLOY.md:90` | github.io | `- **No** tratar 'vientonorte.github.io' sin dominio como “prod SEO” — el canon es '.io'.` | Correcto: declara la regla o la denylist | Sin cambio |
| `DEPLOYMENT_CHECKLIST.md:65` | /#/ | `- [ ] '/#/sobre-mi' (About) loads` | Guía legado: instrucción obsoleta | Solo listado |
| `DEPLOYMENT_CHECKLIST.md:66` | /#/ | `- [ ] '/#/proyectos' (Projects) loads` | Guía legado: instrucción obsoleta | Solo listado |
| `DEPLOYMENT_CHECKLIST.md:67` | /#/ | `- [ ] '/#/contacto' (Contact) loads` | Guía legado: instrucción obsoleta | Solo listado |
| `DEPLOYMENT_CHECKLIST.md:68` | /#/ | `- [ ] '/#/proceso' (Process) loads` | Guía legado: instrucción obsoleta | Solo listado |
| `DEPLOYMENT_CHECKLIST.md:69` | /#/ | `- [ ] '/#/proceso/fase/:id' (Process Detail) loads` | Guía legado: instrucción obsoleta | Solo listado |
| `DEPLOYMENT_CHECKLIST.md:70` | /#/ | `- [ ] '/#/design-system' (Design System) loads` | Guía legado: instrucción obsoleta | Solo listado |
| `HANDOFF_SPRINT.md:82` | /#/ | `- [x] '/#/proceso' carga CaseStudies` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `HANDOFF_SPRINT.md:83` | /#/ | `- [x] '/#/cases' redirige a '/#/proceso'` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `HANDOFF_SPRINT.md:84` | /#/ | `- [x] '/#/proceso/fase/ux-analytics' carga ProcessDetail` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `IMPLEMENTATION_SUMMARY.md:101` | /mi-portafolio/ | `#    <SEOHead image="/mi-portafolio/og-home.jpg" ... />` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `MOBILE_QA.md:138` | 5173 | `npx lighthouse http://localhost:5173 --preset=mobile --view` | Guía legado: instrucción obsoleta | **Corregido** en este PR |
| `MOBILE_QA.md:141` | 5173 | `npx axe http://localhost:5173 --mobile --save axe-mobile-report.html` | Guía legado: instrucción obsoleta | **Corregido** en este PR |
| `PRODUCTION_SETUP.md:176` | /#/ | `- [ ] All routes work ('/', '/#/proyectos', '/#/sobre-mi', '/#/contacto', '/#/proceso')` | Guía legado: instrucción obsoleta | Marcado como superado (banner), sin reescribir |
| `PRODUCTION_SETUP.md:226` | /mi-portafolio/ | `2. Verify 'base: '/mi-portafolio/'' in 'vite.config.ts'` | Guía legado: instrucción obsoleta | Marcado como superado (banner), sin reescribir |
| `QUICK_WINS_COMPLETE.md:304` | 5173 | `# 5. View at http://localhost:5173` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `SPRINT2_REVIEW_VERIFICATION.md:10` | /#/ | `### ✅ Item 1: '/#/proceso' carga CaseStudies` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `SPRINT2_REVIEW_VERIFICATION.md:24` | /#/, github.io, /mi-portafolio/ | `**Test manual:** Navegar a 'https://vientonorte.github.io/mi-portafolio/#/proceso' → debe cargar página de …` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `SPRINT2_REVIEW_VERIFICATION.md:28` | /#/ | `### ✅ Item 2: '/#/cases' redirige a '/#/proceso'` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `SPRINT2_REVIEW_VERIFICATION.md:42` | /#/, github.io, /mi-portafolio/ | `**Test manual:** Navegar a 'https://vientonorte.github.io/mi-portafolio/#/cases' → debe redirigir a '/#/pro…` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `SPRINT2_REVIEW_VERIFICATION.md:46` | /#/ | `### ✅ Item 3: '/#/proceso/fase/ux-analytics' carga ProcessDetail` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `SPRINT2_REVIEW_VERIFICATION.md:60` | /#/, github.io, /mi-portafolio/ | `**Test manual:** Navegar a 'https://vientonorte.github.io/mi-portafolio/#/proceso/fase/ux-analytics' → debe…` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `SPRINT2_REVIEW_VERIFICATION.md:84` | /#/ | `**Test manual:** En mobile, navegar a '/#/proyecto/sura-ria' → debe mostrar DeepPageNav en la parte inferio…` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `SPRINT2_REVIEW_VERIFICATION.md:99` | /#/ | `**Test manual:** En mobile, navegar a '/#/' (Home) → debe mostrar BottomNav completo en la parte inferior c…` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `V2/QA-CHECKLIST.md:72` | 5173 | `- 'npx axe http://localhost:5173 --save axe-report.html'` | Guía legado: instrucción obsoleta | Solo listado |
| `V2/QA-CHECKLIST.md:73` | 5173 | `- 'npx lighthouse http://localhost:5173 --view'` | Guía legado: instrucción obsoleta | Solo listado |
| `VALIDATION_REPORT.md:199` | github.io, /mi-portafolio/ | `3. Deploys to: https://vientonorte.github.io/mi-portafolio/` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `campaigns/2026-08-26-piloto-a11y/README.md:7` | /#/ | `- Final URL (DoD, '/s/' deprecado): 'https://vientonorte.io/#/consultoria?utm_source=google&utm_medium=cpc&…` | Doc vivo: trata como vigente una URL fuera del canon | **Corregido** en este PR |
| `docs/API-KICKOFF.md:63` | /#/ | `UI: 'https://vientonorte.io/#/admin' — **no está en la nav**. noIndex + robots. Sin sesión solo se ve un ga…` | Interno (`#/admin`): OK si no se envía a clientes | Sin cambio |
| `docs/ASSETS-RELEASE.md:51` | 5173 | `1. 'npm run dev' → 'http://127.0.0.1:5173/'` | Doc vivo: trata como vigente una URL fuera del canon | **Corregido** en este PR |
| `docs/ASSETS-RELEASE.md:53` | /#/ | `3. '/#/consultoria#consultoria-demo' → poster GEES ≠ X\\|CMS` | Doc vivo: trata como vigente una URL fuera del canon | Solo listado |
| `docs/ASSETS-RELEASE.md:66` | /mi-portafolio/ | `- Studio: '10-productos/mi-portafolio/INVENTARIO-ASSETS.md'` | Doc vivo: trata como vigente una URL fuera del canon | Solo listado |
| `docs/AUDITORIA-ADS-INSTAGRAM.md:16` | /s/ | `\| OG share 1200×630 \| Código listo \| 'og-portfolio.png' + 'og-consultoria-1200.png' · '/s/' · '/s/consul…` | Log histórico: trata como vigente una URL hoy fuera del canon | Marcado como superado (banner), sin reescribir |
| `docs/AUDITORIA-ADS-INSTAGRAM.md:40` | /s/, /#/ | `\| Landing SEM '/#/consultoria' o share '/s/consultoria' \| Casi (tras deploy Pages del OG) \|` | Log histórico: trata como vigente una URL hoy fuera del canon | Marcado como superado (banner), sin reescribir |
| `docs/AUDITORIA-ADS-INSTAGRAM.md:49` | /s/ | `1. Pages con OG + '/s/consultoria' live + debugger verde.` | Log histórico: trata como vigente una URL hoy fuera del canon | Marcado como superado (banner), sin reescribir |
| `docs/AUDITORIA-ADS-INSTAGRAM.md:52` | /s/ | `4. Final URL de anuncio = **'https://vientonorte.io/s/consultoria'** (no solo el hash).` | Log histórico: trata como vigente una URL hoy fuera del canon | Marcado como superado (banner), sin reescribir |
| `docs/AUDITORIA-ADS-INSTAGRAM.md:64` | /s/ | `\| Landing de share con OG \| Código listo ('/s/consultoria') \|` | Log histórico: trata como vigente una URL hoy fuera del canon | Marcado como superado (banner), sin reescribir |
| `docs/AUDITORIA-ADS-INSTAGRAM.md:71` | /s/ | `3. Destino de anuncio = '/s/consultoria'.` | Log histórico: trata como vigente una URL hoy fuera del canon | Marcado como superado (banner), sin reescribir |
| `docs/AUDITORIA-ADS-INSTAGRAM.md:75` | /s/ | `Instagram orgánico (bio + stories con '/s/consultoria') **sí** se puede en cuanto el OG esté en prod — no r…` | Log histórico: trata como vigente una URL hoy fuera del canon | Marcado como superado (banner), sin reescribir |
| `docs/BLUEPRINT-SEO-SEM.md:3` | /#/ | `**Decide 15 ago:** '/#/consultoria' se **queda** y es el funnel de conversión (3 packs + OB).` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/BLUEPRINT-SEO-SEM.md:4` | /s/ | `**Decide 14 sep:** '/s/' no es producto. Orgánico = '/servicios/*'. '/s/consultoria' = piloto Ads (200).` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/BLUEPRINT-SEO-SEM.md:13` | /#/ | `\| **UI / producto** \| '/#/consultoria' \| Packs + '#consultoria-onboarding' + Calendar \|` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/BLUEPRINT-SEO-SEM.md:15` | /s/ | `\| Piloto Ads (no producto) \| '/s/consultoria' \| OG 1200×630 · final URL campañas · no IA \|` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/BLUEPRINT-SEO-SEM.md:16` | /#/ | `\| Tour módulos \| '/#/consultoria/modulos/:id' \| Craft / deep link \|` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/BLUEPRINT-SEO-SEM.md:22` | 5173 | `'bash ~/.grok/skills/seo-vn/scripts/local-onboarding-smoke.sh http://127.0.0.1:5173'` | Doc vivo: trata como vigente una URL fuera del canon | **Corregido** en este PR |
| `docs/BLUEPRINT-SEO-SEM.md:28` | /s/ | `\| S3 \| piloto '/s/consultoria' 200 + og 1200×630 (no hop) \|` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/BLUEPRINT-SEO-SEM.md:29` | /#/ | `\| S4 \| Free CTA ≠ '/#/auditoria' \|` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/BLUEPRINT-SEO-SEM.md:38` | /s/ | `\| D1 \| SPA + '/s/consultoria': GTM 'GTM-PM5LBQRP' (sin gtag paralelo) · 'page_view' \|` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/BLUEPRINT-SEO-SEM.md:44` | /#/ | `\| D7 \| Final URL Ads = '/#/consultoria' ('/s/' deprecado) \|` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/CHECKLIST-CANALES-PAID.md:6` | /s/, /#/ | `**Producto UI:** '/#/consultoria'. **Orgánico:** '/servicios/*'. **Piloto Ads (no producto):** '/s/consulto…` | Doc vivo: trata como vigente una URL fuera del canon | **Corregido** en este PR |
| `docs/CHECKLIST-CANALES-PAID.md:8` | /#/ | `**Final URL Ads = producto:** 'https://vientonorte.io/#/consultoria'` | Doc vivo: trata como vigente una URL fuera del canon | **Corregido** en este PR |
| `docs/CHECKLIST-CANALES-PAID.md:9` | /s/ | `'/s/consultoria' deprecado (no UX/UI/DoD). Display path ya era '/consultoria' (sin '/s/').` | Doc vivo: trata como vigente una URL fuera del canon | **Corregido** en este PR |
| `docs/CHECKLIST-CANALES-PAID.md:10` | /#/ | `**No usar** '/#/auditoria' ni '#/admin' en anuncios.` | Interno (`#/admin`): OK si no se envía a clientes | Banner de canon arriba (línea sin reescribir) |
| `docs/CHECKLIST-CANALES-PAID.md:12` | /s/ | `Evidencia 15 ago: '/s/consultoria' **200** · OG 'og-home-1200.png' **1200×630** · secret 'VITE_GTM_ID' · **…` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/CHECKLIST-CANALES-PAID.md:22` | /s/ | `- [ ] 'https://vientonorte.io/s/consultoria' → **200** (HTML con 'og:image' 1200×630)` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/CHECKLIST-CANALES-PAID.md:25` | /s/ | `- [ ] [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) scrapea '/s/consultoria' → card V…` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/CHECKLIST-CANALES-PAID.md:27` | /s/ | `- [ ] WhatsApp: pega '/s/consultoria' en un chat tuyo → preview correcto` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/CHECKLIST-CANALES-PAID.md:37` | /s/ | `- [ ] Nombre / bio: **Viento Norte** · link **'vientonorte.io/s/consultoria'** (o link in bio a esa URL)` | Doc vivo: trata como vigente una URL fuera del canon | **Corregido** en este PR |
| `docs/CHECKLIST-CANALES-PAID.md:72` | /s/ | `- [x] '/s/consultoria' view-source contiene 'GTM-PM5LBQRP' (sin gtag.js paralelo) · hop #205 merged 22 ago` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/CHECKLIST-CANALES-PAID.md:91` | /#/ | `- [ ] Final URL = 'https://vientonorte.io/#/consultoria?utm_source=google&utm_medium=cpc&utm_campaign=a11y_…` | Doc vivo: trata como vigente una URL fuera del canon | **Corregido** en este PR |
| `docs/CHECKLIST-CANALES-PAID.md:105` | /s/ | `- [ ] A scrape: [Post Inspector](https://www.linkedin.com/post-inspector/) '/s/consultoria' → card 1200` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/CHECKLIST-CANALES-PAID.md:109` | /s/ | `- [ ] Final URL 'https://vientonorte.io/s/consultoria/?utm_source=linkedin&utm_medium=cpc&utm_campaign=a11y…` | Doc vivo: trata como vigente una URL fuera del canon | **Corregido** en este PR |
| `docs/CHECKLIST-CANALES-PAID.md:127` | /s/ | `- [ ] Test Events: visita '/s/consultoria' + CTA visible en el pixel` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/CHECKLIST-CANALES-PAID.md:128` | /s/ | `- [ ] Destino del anuncio = 'https://vientonorte.io/s/consultoria'` | Doc vivo: trata como vigente una URL fuera del canon | **Corregido** en este PR |
| `docs/CHECKLIST-CANALES-PAID.md:162` | /s/ | `\| Google SEO / GSC \| — \| verify+sitemap 03 ago · **inspección '/s/consultoria' 27 ago** \|` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/CMS-ADMIN-CAPABILIDADES.md:4` | /#/ | `**Superficie:** https://vientonorte.io/#/admin (passkey) + https://vientonorte.io/#/admin/fotos` | Interno (`#/admin`): OK si no se envía a clientes | Banner de canon arriba (línea sin reescribir) |
| `docs/CMS-ADMIN-CAPABILIDADES.md:47` | /s/ | `**Shipped 2026-08-13 (código):** tarjetas 1200×630 'og-home-1200.png' / 'og-consultoria-1200.png' · 'og-por…` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/CMS-ADMIN-CAPABILIDADES.md:72` | /#/ | `\| **Google Ads** \| Skill '/google-ads-vn' local-first; SEM final URL '/#/consultoria' \| Spend / pixel Ad…` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/CMS-ADMIN-CAPABILIDADES.md:105` | /s/, /#/ | `\| P0 \| **OG por ruta** \| 'GET /og/home.png' ' /og/consultoria.png' \| Imagine variantes \| Preview disti…` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/CMS-ADMIN-CAPABILIDADES.md:117` | /s/, /#/ | `https://vientonorte.io/s/consultoria/  →  200 HTML estático (OG + GTM). Sin hop a /#/.` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/CONSULTORIA-MVP-SCOPE.md:18` | /#/ | `Ads SEM → /#/consultoria     (story tour · módulos)` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/CONSULTORIA-MVP-SCOPE.md:22` | /#/ | `Demo campaña → /#/demo/x-cms` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/CONSULTORIA-MVP-SCOPE.md:30` | /#/ | `\| '/consultoria' \| **Landing SEM** (tour) \| https://vientonorte.io/#/consultoria \|` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/CONSULTORIA-MVP-SCOPE.md:33` | /#/ | `\| '/demo/x-cms' \| Demo campaña \| https://vientonorte.io/#/demo/x-cms \|` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/CONSULTORIA-MVP-SCOPE.md:34` | /#/ | `\| '/poc' · '/poc#/auditoria' \| **Deprecado** → SEM \| redirect '/#/consultoria' \|` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/CONSULTORIA-MVP-SCOPE.md:35` | /#/ | `\| '/proceso' \| Macros de método \| https://vientonorte.io/#/proceso \|` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/CONSULTORIA-MVP-SCOPE.md:37` | /#/, 5173 | `**Local:** home 'http://127.0.0.1:5173/#/' · SEM '…/#/consultoria'` | Doc vivo: trata como vigente una URL fuera del canon | **Corregido** en este PR |
| `docs/CONTACT_AND_PRIVACY.md:17` | /#/ | `\| Enlace a '/#/privacy' \| Política del **sitio** (Privacy by design, Ley 21.719, noIndex) \|` | Doc vivo: trata como vigente una URL fuera del canon | Solo listado |
| `docs/CONTACT_AND_PRIVACY.md:160` | /#/ | `1. Envío desde '/#/contacto' (formulario o asistente).` | Doc vivo: trata como vigente una URL fuera del canon | Solo listado |
| `docs/CONTACT_AND_PRIVACY.md:169` | /#/ | `1. Envía un mensaje de prueba desde [Contacto](https://vientonorte.io/#/contacto).` | Doc vivo: trata como vigente una URL fuera del canon | Solo listado |
| `docs/CONTACT_AND_PRIVACY.md:237` | /#/ | `- [ ] Redirect FormSubmit → '/#/contacto?sent=1' muestra toast` | Doc vivo: trata como vigente una URL fuera del canon | Solo listado |
| `docs/DEMO-X-CMS-CAMPAIGN.md:4` | /#/ | `'https://vientonorte.io/#/demo/x-cms'` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/DEMO-X-CMS-CAMPAIGN.md:7` | /#/, 5173 | `'http://127.0.0.1:5173/#/demo/x-cms'` | Doc vivo: trata como vigente una URL fuera del canon | **Corregido** en este PR |
| `docs/DEMO-X-CMS-CAMPAIGN.md:24` | /#/ | `→ /#/demo/x-cms?utm_source=…&utm_campaign=…` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/DEMO-X-CMS-CAMPAIGN.md:48` | /#/, /mi-portafolio/ | `…/mi-portafolio/#/demo/x-cms?utm_source=google&utm_medium=cpc&utm_campaign=xcms_modulos&utm_content=demo_5m` | Doc vivo: trata como vigente una URL fuera del canon | **Corregido** en este PR |
| `docs/DEMO-X-CMS-CAMPAIGN.md:51` | /#/, /mi-portafolio/ | `…/mi-portafolio/#/demo/x-cms?utm_source=linkedin&utm_medium=paid_social&utm_campaign=xcms_modulos&utm_conte…` | Doc vivo: trata como vigente una URL fuera del canon | **Corregido** en este PR |
| `docs/DEMO-X-CMS-CAMPAIGN.md:58` | /#/ | `“Ver X\|CMS en vivo” en '/#/poc/product-onboarding' navega a **esta** ruta (no 'window.open' Sites).` | Doc vivo: trata como vigente una URL fuera del canon | **Corregido** en este PR |
| `docs/GTM-KICKOFF.md:12` | /s/ | `**Share '/s/consultoria':** snippet **GTM-PM5LBQRP** (mismo contenedor que el SPA). **No** gtag.js paralelo…` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/GTM-KICKOFF.md:73` | /#/ | `6. Preview Chrome: '/#/demo/x-cms' → Iniciar → 'demo_x_cms_start' en Capa de datos **y** 'GA4 · demo_funnel…` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/HANDOFF-M1.md:19` | 5173 | `npm run dev -- --host 127.0.0.1 --port 5173` | Doc vivo: trata como vigente una URL fuera del canon | **Corregido** en este PR |
| `docs/HANDOFF-M1.md:24` | /#/ | `\| POC Apple (prod) \| https://vientonorte.io/#/consultoria/modulos/dashboard \|` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/HANDOFF-M1.md:25` | /#/ | `\| POC Apple (local) \| http://127.0.0.1:3000/#/consultoria/modulos/dashboard \|` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/HANDOFF-M1.md:26` | /#/ | `\| Funnel SEM (prod) \| https://vientonorte.io/#/consultoria \|` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/HANDOFF-M1.md:27` | /#/ | `\| Funnel (local) \| http://127.0.0.1:3000/#/consultoria \|` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/HANDOFF-M1.md:28` | /#/ | `\| Legacy '/#/poc/product-onboarding' \| redirige al embudo, no al tour \|` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/NOW-2-GENERATE-LEAD.md:37` | /#/ | `- [ ] Smoke manual: abrir free CTA en '/#/consultoria/embudo' → DevTools → 'dataLayer' contiene 'generate_l…` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/NOW-2-GENERATE-LEAD.md:44` | /#/ | `1. https://vientonorte.io/#/consultoria/embudo` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/QA-ENV.md:7` | /#/, /qa/ | `\| **https://vientonorte.io/qa/#/sobre-mi** \| **VB principal** (ya en hub tras Deploy QA) \|` | Interno QA/infra: OK si no se envía a clientes | Sin cambio |
| `docs/QA-ENV.md:8` | /#/, /qa/ | `\| https://vientonorte.io/qa/#/ \| Home embudo en QA \|` | Interno QA/infra: OK si no se envía a clientes | Sin cambio |
| `docs/QA-ENV.md:9` | /#/ | `\| https://vientonorte.io/#/sobre-mi \| Producción (solo post-VB) \|` | Interno QA/infra: OK si no se envía a clientes | Sin cambio |
| `docs/QA-ENV.md:18` | /qa/ | `→ vite build  base=/qa/  VITE_APP_ENV=qa` | Interno QA/infra: OK si no se envía a clientes | Sin cambio |
| `docs/QA-ENV.md:19` | /qa/, github.io | `→ push dist → hub vientonorte.github.io/qa/` | Interno QA/infra: OK si no se envía a clientes | Sin cambio |
| `docs/QA-ENV.md:27` | github.io | `'CNAME qa → vientonorte.github.io'` | Interno QA/infra: OK si no se envía a clientes | Sin cambio |
| `docs/QA-ENV.md:30` | /qa/ | `'qa.vientonorte.io/*' → 'https://vientonorte.io/qa/$1'` | Interno QA/infra: OK si no se envía a clientes | Sin cambio |
| `docs/QA-ENV.md:34` | /qa/ | `**Mientras no haya DNS:** usar siempre **https://vientonorte.io/qa/**.` | Interno QA/infra: OK si no se envía a clientes | Sin cambio |
| `docs/QA-ERROR-UI.md:38` | /#/ | `https://vientonorte.io/#/esto-no-existe     → 404 grande` | Doc vivo: trata como vigente una URL fuera del canon | Solo listado |
| `docs/QA-ERROR-UI.md:54` | /#/, 5173 | `open 'http://127.0.0.1:5173/#/pagina-que-no-existe'` | Doc vivo: trata como vigente una URL fuera del canon | **Corregido** en este PR |
| `docs/RUNBOOK-APIS-MCP-BD.md:5` | /#/ | `**CMS:** 'https://vientonorte.io/#/admin' (passkey) · fotos '#/admin/fotos'` | Interno (`#/admin`): OK si no se envía a clientes | Sin cambio |
| `docs/RUNBOOK-APIS-MCP-BD.md:49` | /s/ | `\| GET \| '/s' '/s/consultoria' \| HTML OG para crawlers \|` | Doc vivo: trata como vigente una URL fuera del canon | Solo listado |
| `docs/RUNBOOK-APIS-MCP-BD.md:129` | /s/ | `\| Pages viejo \| '/s/consultoria' 404 o OG 512px \|` | Doc vivo: trata como vigente una URL fuera del canon | Solo listado |
| `docs/SEO-DOMAIN-AND-GTM.md:13` | /#/ | `\| 2 \| https://vientonorte.io/#/consultoria \| **Producto UI** (packs + OB). DoD = HashRouter \|` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/SEO-DOMAIN-AND-GTM.md:15` | /#/ | `\| 4 \| https://vientonorte.io/#/contacto \| Conversión / contacto \|` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/SEO-DOMAIN-AND-GTM.md:16` | /s/ | `\| piloto \| https://vientonorte.io/s/consultoria/ \| Ads leftover. 200. No producto \|` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/SEO-DOMAIN-AND-GTM.md:40` | /#/ | `Rutas '/#/...' limitan SEO de deep links.` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/SEO-DOMAIN-AND-GTM.md:49` | github.io, /mi-portafolio/ | `https://vientonorte.github.io/mi-portafolio/     → https://vientonorte.io/` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/SEO-DOMAIN-AND-GTM.md:50` | /#/, github.io, /mi-portafolio/ | `https://vientonorte.github.io/mi-portafolio/#/…  → https://vientonorte.io/#/…` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/SEO-DOMAIN-AND-GTM.md:51` | /mi-portafolio/ | `https://vientonorte.io/mi-portafolio/            → https://vientonorte.io/` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/SEO-DOMAIN-AND-GTM.md:52` | github.io | `https://vientonorte.github.io/{app}/             → https://vientonorte.io/{app}/  (si aplica)` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/SESSION-2026-07-07.md:36` | /#/ | `\| Home / Hero \| https://vientonorte.io/#/ \|` | Log histórico: trata como vigente una URL hoy fuera del canon | Marcado como superado (banner), sin reescribir |
| `docs/SESSION-2026-07-07.md:39` | /#/ | `\| POC IA DEI \| https://vientonorte.io/#/proyecto/sura-ia-automation-dashboard \|` | Log histórico: trata como vigente una URL hoy fuera del canon | Marcado como superado (banner), sin reescribir |
| `docs/SESSION-2026-07-07.md:41` | /#/ | `\| Autosuggest \| https://vientonorte.io/#/proyectos/autosuggest-fondos \|` | Log histórico: trata como vigente una URL hoy fuera del canon | Marcado como superado (banner), sin reescribir |
| `docs/SESSION-2026-07-07.md:42` | /#/ | `\| Auditoría AAA \| https://vientonorte.io/#/auditoria \|` | Log histórico: trata como vigente una URL hoy fuera del canon | Marcado como superado (banner), sin reescribir |
| `docs/SESSION-2026-07-07.md:43` | /#/ | `\| UX Analytics taxonomía \| https://vientonorte.io/#/proceso/fase/ux-analytics \|` | Log histórico: trata como vigente una URL hoy fuera del canon | Marcado como superado (banner), sin reescribir |
| `docs/SESSION-2026-07-07.md:44` | /#/ | `\| Consultoría \| https://vientonorte.io/#/consultoria \|` | Log histórico: trata como vigente una URL hoy fuera del canon | Marcado como superado (banner), sin reescribir |
| `docs/SESSION-2026-07-07.md:45` | /#/ | `\| Demo X \\| CMS (sección '#consultoria-demo') \| https://vientonorte.io/#/consultoria \|` | Log histórico: trata como vigente una URL hoy fuera del canon | Marcado como superado (banner), sin reescribir |
| `docs/SESSION-2026-07-07.md:47` | /#/ | `\| Hub SURA \| https://vientonorte.io/#/empresa/sura-investments \|` | Log histórico: trata como vigente una URL hoy fuera del canon | Marcado como superado (banner), sin reescribir |
| `docs/SOLID-VN.md:17` | /s/ | `**URLs:** producto Hash '#/consultoria' · orgánico '/servicios/*' (sin '/s/') · piloto Ads '/s/consultoria'…` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/URL-CANON-VIENTONORTE.md:3` | /mi-portafolio/ | `**Canon:** 'https://vientonorte.io/' (sin '/mi-portafolio/')` | Correcto: declara la regla o la denylist | Banner de canon arriba (línea sin reescribir) |
| `docs/URL-CANON-VIENTONORTE.md:5` | /s/, /#/ | `**Decide 14-sep-2026:** '/s/' **no** es URL de producto (ni diseño ni DoD). UI = '/#/'. Orgánico = '/servic…` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/URL-CANON-VIENTONORTE.md:11` | /#/ | `\| **UI / DoD / embudo SEM** \| '/#/consultoria' \| https://vientonorte.io/#/consultoria \| 3 packs. 'qa:ha…` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/URL-CANON-VIENTONORTE.md:12` | /#/ | `\| **POC Apple** \| '/#/consultoria/modulos/dashboard' \| https://vientonorte.io/#/consultoria/modulos/dash…` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/URL-CANON-VIENTONORTE.md:15` | /#/ | `\| Módulo SEM \| '/#/consultoria/modulos/:id' \| … \| Deep link tour \|` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/URL-CANON-VIENTONORTE.md:16` | /#/ | `\| Proceso \| '/#/proceso' \| … \| Macros método \|` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/URL-CANON-VIENTONORTE.md:17` | /#/ | `\| Design system \| '/#/design-system' \| … \| Tokens \|` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/URL-CANON-VIENTONORTE.md:18` | /#/ | `\| Demo X\\|CMS \| '/#/demo/x-cms' \| … \| Gate campaña · alias de Prototipo \|` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/URL-CANON-VIENTONORTE.md:20` | /s/ | `\| **Piloto Ads (no producto)** \| '/s/consultoria/' \| https://vientonorte.io/s/consultoria/ \| Final URL …` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/URL-CANON-VIENTONORTE.md:26` | /#/ | `**Embudo:** 'https://vientonorte.io/#/consultoria'` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/URL-CANON-VIENTONORTE.md:27` | /#/ | `**POC Apple:** 'https://vientonorte.io/#/consultoria/modulos/dashboard'` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/URL-CANON-VIENTONORTE.md:28` | /s/ | `**'/s/consultoria/'** deprecado.` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/URL-CANON-VIENTONORTE.md:36` | /#/, 5173 | `\| Home embudo \| http://127.0.0.1:5173/#/ \|` | Doc vivo: trata como vigente una URL fuera del canon | **Corregido** en este PR |
| `docs/URL-CANON-VIENTONORTE.md:37` | /#/ | `\| SEM oferta \| http://127.0.0.1:3000/#/consultoria \|` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/URL-CANON-VIENTONORTE.md:43` | /#/ | `\| '/#/consultoria/embudo' \| '/' (home) \|` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/URL-CANON-VIENTONORTE.md:44` | /#/ | `\| '/#/poc/product-onboarding' \| '/#/consultoria' (SEM) \|` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/URL-CANON-VIENTONORTE.md:45` | /s/ | `\| **'/poc' · '/poc#/auditoria'** \| **'/s/consultoria/'** (piloto Ads HTTP; deprecado · no freemium) \|` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/URL-CANON-VIENTONORTE.md:46` | /mi-portafolio/ | `\| '/mi-portafolio/…' \| root '.io' \|` | Correcto: declara la regla o la denylist | Banner de canon arriba (línea sin reescribir) |
| `docs/URL-CANON-VIENTONORTE.md:48` | /s/, /#/ | `'/#/auditoria' sigue vivo como **muestra mentoría** (noIndex). **Nunca** Ads ni lead pyme. Freemium = nota …` | Doc vivo: trata como vigente una URL fuera del canon | Banner de canon arriba (línea sin reescribir) |
| `docs/VB-SOBRE-MI.md:3` | /#/, /qa/ | `**Ambiente:** https://vientonorte.io/qa/#/sobre-mi` | Interno QA/infra: OK si no se envía a clientes | Sin cambio |
| `docs/VB-SOBRE-MI.md:43` | /qa/ | `\| VB-15 \| Banner QA visible en '/qa/'; no en prod \| \|` | Interno QA/infra: OK si no se envía a clientes | Sin cambio |
| `docs/audits/2026-08-03-GSC-Pruebas-Enlaces.md:4` | /#/ | `**SEO:** https://vientonorte.io/ · **SEM:** https://vientonorte.io/#/consultoria` | Log histórico: trata como vigente una URL hoy fuera del canon | Marcado como superado (banner), sin reescribir |
| `docs/audits/2026-08-03-GSC-Pruebas-Enlaces.md:20` | /#/ | `- https://vientonorte.io/#/consultoria` | Log histórico: trata como vigente una URL hoy fuera del canon | Marcado como superado (banner), sin reescribir |
| `docs/audits/2026-08-03-GSC-verification.md:16` | github.io | `2. Espejo opcional en 'vientonorte.github.io/' root.` | Log histórico: trata como vigente una URL hoy fuera del canon | Solo listado |
| `docs/audits/HUs-SEO-SEM-2026-08-03.md:14` | /#/ | `\| **HU-02** \| SEM URL — canonical + meta message-match \| P0 \| 'https://vientonorte.io/#/consultoria' \|` | Log histórico: trata como vigente una URL hoy fuera del canon | Marcado como superado (banner), sin reescribir |
| `docs/audits/QA-SEO-SEM-PLAN-2026-08-03.md:10` | /#/ | `\| **SEM / paid final URL** \| https://vientonorte.io/#/consultoria \|` | Log histórico: trata como vigente una URL hoy fuera del canon | Marcado como superado (banner), sin reescribir |
| `docs/audits/QA-SEO-SEM-PLAN-2026-08-03.md:18` | /#/ | `\| SEO técnico SPA + hash \| HashRouter '/#/…' \| Meta estáticos + JSON-LD; SSR = P2 \|` | Log histórico: trata como vigente una URL hoy fuera del canon | Marcado como superado (banner), sin reescribir |
| `docs/audits/QA-SEO-SEM-PLAN-2026-08-03.md:36` | /#/ | `### SEM — 'https://vientonorte.io/#/consultoria'` | Log histórico: trata como vigente una URL hoy fuera del canon | Marcado como superado (banner), sin reescribir |
| `docs/audits/QA-SEO-SEM-PLAN-2026-08-03.md:38` | /#/ | `- [x] **Bugfix:** 'canonical' en superficie SEM apuntaba a 'ROUTES.consultingFunnel' ('/') → ahora 'ROUTES.…` | Log histórico: trata como vigente una URL hoy fuera del canon | Marcado como superado (banner), sin reescribir |
| `docs/audits/QA-SEO-SEM-PLAN-2026-08-03.md:51` | /#/ | `\| Persona / casos \| '/#/sobre-mi', '/#/proyectos' — no final URL de ads pyme \|` | Log histórico: trata como vigente una URL hoy fuera del canon | Marcado como superado (banner), sin reescribir |
| `docs/audits/QA-SEO-SEM-PLAN-2026-08-03.md:65` | /#/ | `\| Final URL Ads = landing real \| '/#/consultoria' documentada \|` | Log histórico: trata como vigente una URL hoy fuera del canon | Marcado como superado (banner), sin reescribir |
| `docs/audits/QA-SEO-SEM-PLAN-2026-08-03.md:87` | /#/ | `2. Abrir '/#/consultoria' → DevTools '<link rel="canonical">' = 'https://vientonorte.io/#/consultoria'` | Log histórico: trata como vigente una URL hoy fuera del canon | Marcado como superado (banner), sin reescribir |
| `docs/audits/QA-SEO-SEM-PLAN-2026-08-03.md:90` | /#/ | `5. Ads (cuando Test OK): final URL exacta 'https://vientonorte.io/#/consultoria'` | Log histórico: trata como vigente una URL hoy fuera del canon | Marcado como superado (banner), sin reescribir |
| `docs/checklist-ley-21719-ssot.md:5` | /s/ | `**CTA:** https://vientonorte.io/s/consultoria/` | Doc vivo: trata como vigente una URL fuera del canon | **Corregido** en este PR |
| `docs/checklist-ley-21719-ssot.md:47` | /s/ | `- Internals: WCAG 2.2 · asistente-ia · '/s/consultoria/'.` | Doc vivo: trata como vigente una URL fuera del canon | Solo listado |
| `public/images/poc-modules/README.md:3` | /#/ | `Capturas live del producto **X\|CMS** (Figma Sites) para la landing oferta '/#/consultoria'.` | Doc vivo: trata como vigente una URL fuera del canon | **Corregido** en este PR |
| `public/resources/ux-tools/README.md:14` | github.io | `Suite live: https://vientonorte.github.io/uxtools/` | Otra app en github.io: por revisar | Solo listado |
| `public/robots.txt:1` | /mi-portafolio/ | `# Viento Norte · vientonorte.io (canon sin /mi-portafolio/)` | Correcto: declara la regla o la denylist | Sin cambio |
| `public/robots.txt:7` | /#/ | `# Superficies no indexables. Sin líneas /#/: el fragmento no llega al servidor (sin efecto).` | Correcto: declara la regla o la denylist | Sin cambio |
| `public/robots.txt:11` | /mi-portafolio/ | `Disallow: /mi-portafolio/` | Correcto: declara la regla o la denylist | Sin cambio |
| `src/COMO_DESCARGAR_ZIP.md:320` | 5173 | `➜  Local:   http://localhost:5173/` | Guía legado: instrucción obsoleta | **Corregido** en este PR |
| `src/COMO_DESCARGAR_ZIP.md:324` | 5173 | `Abre 'http://localhost:5173' en tu navegador.` | Guía legado: instrucción obsoleta | **Corregido** en este PR |
| `src/COMO_DESCARGAR_ZIP.md:397` | 5173 | `✅ Portfolio carga en localhost:5173` | Guía legado: instrucción obsoleta | **Corregido** en este PR |
| `src/COPY_PASTE_SETUP.md:232` | 5173 | `# http://localhost:5173` | Guía legado: instrucción obsoleta | **Corregido** en este PR |
| `src/COPY_PASTE_SETUP.md:378` | 5173 | `- [ ] Portfolio carga en localhost:5173` | Guía legado: instrucción obsoleta | **Corregido** en este PR |
| `src/FIX_ERRORS.md:52` | 5173 | `➜  Local:   http://localhost:5173/` | Guía legado: instrucción obsoleta | **Corregido** en este PR |
| `src/FIX_ERRORS.md:56` | 5173 | `**Abre** http://localhost:5173 en tu navegador` | Guía legado: instrucción obsoleta | **Corregido** en este PR |
| `src/FIX_ERRORS.md:160` | 5173 | `- [ ] 'npm run dev' funciona y sitio carga en localhost:5173` | Guía legado: instrucción obsoleta | **Corregido** en este PR |
| `src/GIT_FIX_COMMANDS.md:120` | 5173 | `➜  Local:   http://localhost:5173/` | Guía legado: instrucción obsoleta | **Corregido** en este PR |
| `src/GIT_FIX_COMMANDS.md:124` | 5173 | `**Abre http://localhost:5173** y verifica:` | Guía legado: instrucción obsoleta | **Corregido** en este PR |
| `src/GIT_FIX_COMMANDS.md:250` | 5173 | `- [ ] Portfolio carga en http://localhost:5173` | Guía legado: instrucción obsoleta | **Corregido** en este PR |
| `src/MAINTENANCE_GUIDE.md:571` | github.io | `El override remoto ('/api/images/manifest') solo se consulta en '/admin/fotos' para evitar errores CORS en …` | Doc vivo: trata como vigente una URL fuera del canon | Solo listado |
| `src/MAINTENANCE_GUIDE.md:642` | /#/, github.io, /mi-portafolio/ | `Rutas públicas en GitHub Pages: 'https://vientonorte.github.io/mi-portafolio/#/proyecto/:id'` | Doc vivo: trata como vigente una URL fuera del canon | **Corregido** en este PR |
| `src/README.md:168` | 5173 | `El proyecto estará disponible en 'http://localhost:5173'` | Guía legado: instrucción obsoleta | **Corregido** en este PR |
| `src/RESUMEN_COMPLETO.md:113` | 5173 | `# Abrir: http://localhost:5173` | Guía legado: instrucción obsoleta | **Corregido** en este PR |
| `src/RESUMEN_COMPLETO.md:378` | 5173 | `✅ Portfolio carga en localhost:5173` | Guía legado: instrucción obsoleta | **Corregido** en este PR |
| `src/START_HERE.md:32` | 5173 | `# Abrir http://localhost:5173` | Guía legado: instrucción obsoleta | **Corregido** en este PR |
| `worker/README.md:65` | github.io | `ALLOWED_ORIGIN = "https://vientonorte.github.io,http://localhost:3000"` | Doc vivo: trata como vigente una URL fuera del canon | Solo listado |
| `worker/README.md:84` | github.io | `-H "Origin: https://vientonorte.github.io" \` | Doc vivo: trata como vigente una URL fuera del canon | Solo listado |
| `worker/README.md:95` | /#/, github.io, /mi-portafolio/ | `Ruta del sitio: 'https://vientonorte.github.io/mi-portafolio/#/admin/fotos'` | Doc vivo: trata como vigente una URL fuera del canon | **Corregido** en este PR |
| `worker/README.md:119` | github.io, /mi-portafolio/ | `2. Homepage: 'https://vientonorte.github.io/mi-portafolio/'` | Doc vivo: trata como vigente una URL fuera del canon | **Corregido** en este PR |

## 4. Pendientes fuera de alcance (código, tests, configs y JSON: no se tocan en este PR)

Estos archivos versionados también contienen alguno de los patrones (`rg`). Muchos lo hacen a propósito: redirects legacy, tests que **verifican** la denylist, el workflow de deploy QA o la CORS del Worker. Hay que revisarlos uno por uno en un PR de código, con el TL:

- `.claude/launch.json`
- `.claude/settings.local.json`
- `.github/workflows/deploy-qa.yml`
- `.github/workflows/deploy.yml`
- `.github/workflows/news-autorun.yml`
- `V2/axe-report.json`
- `V2/package.json`
- `V2/scripts/axe-ci.js`
- `ads-query/src/google-ads-client.test.js`
- `ads-query/src/query-processor.js`
- `ads-query/src/query-processor.test.js`
- `ads-query/ssot/fixture-2026-09-02.json`
- `campaigns/2026-08-26-piloto-a11y/assets/ad-1080x1080.html`
- `campaigns/2026-08-26-piloto-a11y/assets/ad-1080x1920.html`
- `campaigns/2026-08-26-piloto-a11y/assets/ad-1200x628.html`
- `campaigns/2026-08-26-proceso/og-proceso-1200.html`
- `public/images/ads/index.html`
- `public/s/polijuego-privacy/index.html`
- `public/s/share.css`
- `public/servicios/share.css`
- `scripts/build-news-hops.py`
- `scripts/generate-service-landings.py`
- `scripts/preprod-gate.sh`
- `scripts/qa-error-ui.sh`
- `scripts/qa-production.sh`
- `scripts/redirect_pages.py`
- `scripts/share_chrome.py`
- `scripts/start-local.sh`
- `src/App.tsx`
- `src/__tests__/data/news-topic-landing.test.ts`
- `src/__tests__/data/posicionapp-ia-empresas.test.ts`
- `src/__tests__/data/service-landings.test.ts`
- `src/__tests__/lib/deploy-qa-noindex.test.ts`
- `src/__tests__/lib/legacy-redirects.test.ts`
- `src/__tests__/lib/seo-p0-crawler.test.ts`
- `src/__tests__/lib/sitemap-gate.test.ts`
- `src/__tests__/lib/url-canon-piloto.test.ts`
- `src/__tests__/lib/vn-core-dip.test.ts`
- `src/__tests__/pages/branding-canon.test.ts`
- `src/components/organisms/HomeSpecialtyPaths.tsx`
- `src/data/admin-roadmap.ts`
- `src/data/image-roles.ts`
- `src/data/legacy-redirects.json`
- `src/data/linkedin-cold-demos.json`
- `src/data/news-editions.json`
- `src/data/news-editions.ts`
- `src/data/posicionapp-ia-empresas-chile.json`
- `src/data/service-landings.json`
- `src/data/sitemap-canon.json`
- `src/imports/svg-3m8uceqnnw.ts`
- `src/imports/svg-gdqn4ibrlm.ts`
- `src/lib/i18n/locales/en/portfolio.ts`
- `src/lib/i18n/locales/en/seo.ts`
- `src/lib/i18n/locales/es/portfolio.ts`
- `src/lib/i18n/locales/es/seo.ts`
- `src/lib/structured-data.ts`
- `src/servicios/servicios-content.ts`
- `src/styles/vn-tokens.css`
- `src/vn-core/analytics/config.ts`
- `src/vn-core/routes.ts`
- `src/vn-core/seo.ts`
- `worker/src/admin/bootstrap.js`
- `worker/src/api/public.js`
- `worker/src/api/share.js`
- `worker/src/contact.js`
- `worker/src/data/catalog.js`
- `worker/src/data/image-roles.js`
- `worker/src/lib/public-paths.js`
- `worker/src/mcp/server.js`
- `worker/wrangler.contact.toml`
- `worker/wrangler.toml`

**Puntos concretos que vale la pena mirar primero:**

- `campaigns/2026-08-26-piloto-a11y/assets/ad-*.html` y `campaigns/2026-08-26-proceso/og-proceso-1200.html`: las creatividades muestran `vientonorte.io/s/consultoria` y `/s/proceso` (según el brief).
- `worker/README.md:65,84` y `src/MAINTENANCE_GUIDE.md:571`: describen el `ALLOWED_ORIGIN` / CORS con `vientonorte.github.io`. El valor real vive en `worker/wrangler*.toml` (config, no tocado). Hay que confirmar si sigue haciendo falta.
- `public/robots.txt`: es correcto (declara `Disallow: /mi-portafolio/`). Sin cambio.
- `V2/`: es un proyecto aparte, con su propio `package.json`. Su 5173 puede ser el default de su Vite. Solo listado.

## 5. Otros hallazgos del brief 2026-10-01 que siguen abiertos (no son de URL; no se corrigieron)

- `DEPLOY.md:75` y varios docs: recomiendan `wrangler deploy --config wrangler.contact.toml` o `npm run deploy` sin `--keep-vars`. Es una regla de prod que decide Rö o el TL; acá no se toca nada de wrangler.
- `DEPLOY.md` y `docs/RUNBOOK-APIS-MCP-BD.md` siguen describiendo `/ops/`, que da 404 desde #278.
- `src/DEPLOYMENT.md` (y otras guías en `src/`) recomiendan Vercel, que no aplica.
- El `README.md` de la raíz es la plantilla «Vertex AI Studio», que no describe el repo.
- `CHANGELOG.md` está congelado en 2026-09-15: faltan los merges desde #261.

## 6. Decisiones para Rö / TL

1. **`docs/URL-CANON-VIENTONORTE.md`:** ¿se reescribe completo con el canon 2026-10 (hoy solo tiene un banner arriba) o se reemplaza por un canon nuevo?
2. **UTM de canales sin valor definido:** los valores UTM propuestos para la bio de IG, LinkedIn y Meta en `CHECKLIST-CANALES-PAID.md` hay que confirmarlos.
3. **PR #283:** también corrige `campaigns/2026-08-26-piloto-a11y/README.md:7`. Si se mergea después de este, puede haber conflicto (mismo contenido de destino).
4. **Logs:** los logs históricos (`CHANGELOG.md`, `SPRINT2_REVIEW_VERIFICATION.md`, `VALIDATION_REPORT.md`, etc.) quedaron solo listados. ¿Se agrega un banner de «superado» también a esos?
5. **Código y config pendientes (§4):** ¿se abre un PR de código para las creatividades `campaigns/*.html` y la CORS `vientonorte.github.io`?
