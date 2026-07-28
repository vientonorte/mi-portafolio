<!-- Viento Norte Manual QA v1.0.0 · 2026-07-20 · colectivo -->

# Manual QA — Viento Norte FO (empresa)

**App:** Portafolio Lead UX (React 19 + Vite) + chatbot frontend/backend + Workers  
**Repo:** https://github.com/vientonorte/mi-portafolio  
**Prod (referencia):** https://vientonorte.io/  
**Versión checklist:** 1.0.0 · 2026-07-20

---

## Enlaces rápidos

| Área | URL / path |
|------|------------|
| Home | `https://vientonorte.io/` o hash routes del nav |
| Repo | https://github.com/vientonorte/mi-portafolio |
| Actions | https://github.com/vientonorte/mi-portafolio/actions |
| Docs internas | `docs/`, `MOBILE_QA.md`, `RECRUITER_TEST_PROTOCOL.md` |
| Worker contacto | `worker/` |

---

## A · Smoke (5–8 min) — **obligatorio**

- [ ] **A1** Home carga sin pantalla blanca; título de pestaña coherente
- [ ] **A2** Console: sin errores rojos de runtime (ignorar warnings 3rd-party conocidos)
- [ ] **A3** Nav principal visible (desktop): secciones alcanzables (Negocios / proyectos / consultoría según nav-config)
- [ ] **A4** Hero legible: rol + industrias comprensibles en &lt;10 s (spot recruiter)
- [ ] **A5** CTA primario responde (scroll, ruta o modal)
- [ ] **A6** Footer visible; links legales/contacto no 404
- [ ] **A7** Theme toggle (si existe) persiste tras reload
- [ ] **A8** Language toggle (si existe) cambia copy sin romper layout

**Resultado A:** PASS / FAIL · notas: ___________

---

## B · Navegación y rutas (8 min)

- [ ] **B1** Deep-link a sección vía hash/ruta funciona (reload mantiene contexto o redirige limpio)
- [ ] **B2** Buscador hero / «¿Qué buscas?» (si activo): query de ejemplo devuelve resultados útiles
- [ ] **B3** Dock / header / hamburger (mobile): todas las destinos del nav-config alcanzables
- [ ] **B4** Ruta `/proyectos` o equivalente: cards cargan; no layout shift brutal
- [ ] **B5** Consultoría: onboarding/entry no bloquea back-button del browser
- [ ] **B6** 404 / ruta inválida: fallback amable (no crash)

**Resultado B:** PASS / FAIL / N/A

---

## C · Contacto y privacidad (8 min)

- [ ] **C1** Formulario contacto visible y usable
- [ ] **C2** Validación client-side en campos requeridos
- [ ] **C3** Submit (staging o dry-run): feedback de éxito/error claro
- [ ] **C4** Draft local (si existe): sobrevive reload
- [ ] **C5** Página/sección privacidad accesible y actualizada
- [ ] **C6** Network: submit no expone secrets; endpoint esperado (Worker / Forms)

**Resultado C:** PASS / FAIL / N/A

---

## D · Chatbot (si build lo incluye) (10 min)

- [ ] **D1** UI chat monta sin error
- [ ] **D2** Enviar mensaje de prueba → respuesta o estado de carga
- [ ] **D3** Error de API se muestra con mensaje humano (no stack trace)
- [ ] **D4** Input no se bloquea tras error (retry posible)

**Resultado D:** PASS / FAIL / N/A

---

## E · Mobile (10 min) — DevTools 390×844 + un device real si se puede

- [ ] **E1** 320–390px: sin scroll horizontal en home
- [ ] **E2** CTAs ≥ ~44×44 px; no se pisan
- [ ] **E3** Nav mobile (hamburger/dock) usable con pulgar
- [ ] **E4** Tipografía body legible (≥16px efectivo en inputs)
- [ ] **E5** Hero no “aplana” métricas/badges ilegibles
- [ ] **E6** `prefers-reduced-motion`: animaciones no impiden leer

*Refuerzo:* ver también `MOBILE_QA.md` del repo para breakpoints 320/375/414/768/1024.

**Resultado E:** PASS / FAIL

---

## F · Performance spot (5 min)

- [ ] **F1** LCP percibido &lt; ~3s en red normal (home)
- [ ] **F2** Lazy routes: navegar a sección pesada no congela UI &gt;2s
- [ ] **F3** Lighthouse CI (si corrió en PR): no regresión roja vs baseline del repo

**Resultado F:** PASS / FAIL / N/A

---

## Z · A11y mínimo (5 min)

- [ ] **Z1** Tab por hero → CTA → nav: orden lógico
- [ ] **Z2** Focus visible en links y botones
- [ ] **Z3** Skip link o h1 único razonable
- [ ] **Z4** Iconos decorativos no anunciados de más (spot VoiceOver opcional)
- [ ] **Z5** Contraste texto/fondo en hero y body (spot)

**Resultado Z:** PASS / FAIL

---

## Go / No-Go

| Check | OK |
|-------|-----|
| Smoke A PASS | [ ] |
| Cero S0/S1 | [ ] |
| Contacto o N/A justificado | [ ] |
| Mobile E PASS | [ ] |

**Decisión:** GO / GO condicional / NO-GO  
**Executor:** ___________ **Fecha:** ___________ **SHA:** ___________

---

## Protocolo colectivo (extracto)

Severidades: **S0** crash/security (bloquea) · **S1** feature crítica (bloquea) · **S2** UX material · **S3** cosmético.

Gate: Smoke A PASS + 0× S0/S1 = GO. Registrar sesión en issue/PR o archivo de log local.

A11y mínimo (sección Z): tab order, focus visible, Escape en modales, contraste spot, reduced-motion.

Fuente del paquete: workflow Viento Norte · Manual QA 1.0.0
