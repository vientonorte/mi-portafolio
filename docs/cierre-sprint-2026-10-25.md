# Cierre sprint VN 19–25 oct 2026 — preparación PO (9:37, solo lectura)

## Entró a main (prod) esta semana (vientonorte/mi-portafolio)
- #349 6879dbd (18-oct 22:07 CL) fix(nav): menú móvil muestra Inicio y Sobre mí (+ Privacidad sin #/privacy)
- #351 f989e3b (19-oct 08:51 CL) fix(nav): menú móvil de /servicios/ = el de la home
- #353 25833c3 (23-oct 20:39 CL) feat(nosotros): página /nosotros/ + nav Sobre mí → Nosotros (live 200)
(El 18-oct en la tarde entraron #343, #332, #330, #327, #347, #348, #324, #282: ya contados en el cierre anterior.)

## Abierto / en QA sin ship
- #352 @8a5f9c4 forms (único pack de forms; #330 y #332 ya merged): /privacidad/ prerender, a11y F1, envío solo por worker. CI 11/11 verde. Espera QA humano (bloque mar 27 07:00 «Probar formularios") y orden TL.
- #328 sitemap en build con lastmod de git. Verde, «no mergear sin orden TL».
- #331 /sobre-mi/ prerender: probablemente superado por #353/#354 → TL decide cerrar.
- #329 forms (viejo) superado por #352 → cerrar con comentario «superado por #352» tras orden TL.
- #350 dependabot dev-deps.
- Viejos que conviene podar: #315, #306 (draft), #298 (draft), #283 (draft), #276, #275, #342 (NO MERGE).

## Bloqueado
- #354 redirect /sobre-mi/ → ro.vientonorte.io: ro ya responde 200 con SSL (verificado 25-oct), pero falta el patch a .github/workflows (token sin scope `workflow`, lo aplica M5 desde el Mac) y 1 check en rojo; además requiere QA de Rö.
- Issue #325 buscador /noticias/: falta frame Figma.

## Decisiones pendientes de Rö
1. QA de ro.vientonorte.io para dar luz verde al 301 (#354).
2. QA de formularios (#352) en el bloque mar 27 07:00.
3. Frame Figma del buscador de /noticias/ (#325) o aplazarlo.

## Calendario 26–30 oct
- Solo un bloque VN: mar 27 07:00 «Probar formularios». Lun/mié/jue/vie 07:00 sin bloque VN.
- No existen bloques SEO/SEM/Comercial 11:00 (borrados 19-oct→30-nov con OK de Rö): en la fase 10:37 no hay nada que ajustar ahí; no crear nuevos.
- Carga: lun Demanda Sura 09:00, Maas 13:30, Yoga 14:00, Get on Board 17:30; jue Status Maas 13:00; vie Mercor Odin 15:00 (hasta 3 h).

## Plan sprint 26-oct → 1-nov (propuesta PO, a validar orden técnico con TL)
1. #352 forms: QA mar 27 → merge por TL (leads y canon de envío por worker).
2. #354: M5 aplica patch workflows; QA Rö de ro.vientonorte.io → merge 301.
3. #328 sitemap (después de #354, para sacar /sobre-mi/ del sitemap).
4. Poda de PRs superados (#331, #329, #315, #275, #276, #298, #283, #306) con decisión TL.
5. #325 solo si llega el frame Figma.
Meta: VN lista para vender el 30-nov.

## Retro deploy

- Salieron 3 merges a main: #349 (6879dbd), #351 (f989e3b) y #353 (25833c3). /nosotros/ salió con QA hash 7d316ed y responde 200.
- Qué funcionó: en #353 se cumplió el flujo de un solo pack en /qa/ con hash, CI verde y OK de Rö.
- Qué falló:
  1. #354 se trabó por dos cosas: el token no tiene el scope workflow (Rö tiene que hacer el gh auth refresh o M5 parchear desde el Mac) y el certificado de ro tardó en emitirse después del CNAME.
  2. El pack de forms se armó con PR viejos (#329, cuando #330 y #332 ya estaban mergeados) y se corrigió recién en el cierre. Desde ahora, el pack se arma con `gh pr list` contra main.
  3. La orden de QA del 15-oct se perdió entre chats y se recuperó el 23. Las órdenes se escriben en docs/ el mismo día.
  4. Cerramos tarde (después de las 18:00) por decisión de Rö.
- Acción: M5 apila ramas (fix/sitemap-lastmod sobre #354) solo con orden de TL.
