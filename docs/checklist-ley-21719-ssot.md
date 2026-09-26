# Checklist Ley 21.719 · SSOT interno (no indexar)

**Estado:** parking DS-2026-09-14. No URL pública `/recursos/` hasta Prototype `codeá`.  
**Canónica de captura (live):** https://vientonorte.io/servicios/privacidad-datos/  
**CTA:** https://vientonorte.io/#/consultoria  
**No:** `/auditoria`, WCAG 2.1, Ads, 301 de `/servicios/*`.

Audiencia: CTO / compliance / mkt digital. 12 ítems · sí/no. Scorecard = **orientación**, no dictamen legal.

## M1 · Captura y consentimiento (UX)

1. Opt-in activo: checkboxes desmarcados; no consentimiento por navegación.
2. Finalidad visible + link a política junto al envío.
3. Scripts de medición no disparan antes de consentimiento (CMP / Consent Mode — **si** el stack lo tiene; no vender CMP como SKU VN).
4. Rechazar cookies con la misma jerarquía visual que Aceptar (no dark patterns).

## M2 · CRM / almacenamiento

5. HTTPS/TLS en tránsito; cifrado en reposo = **pregunta al proveedor CRM**, no un pack VN.
6. Minimización: solo campos necesarios.
7. RBAC + MFA en admin CMS/CRM.

## M3 · Automatización / DevSecOps

8. API keys no en JS de cliente; proxy server-side.
9. Sanitización XSS/SQLi en servidor.
10. Log de consentimiento (timestamp + versión de política).

## M4 · Derechos (ARCOP)

11. Canal de solicitudes (acceso, rectificación, supresión, oposición, portabilidad). **No** exigir slug `/privacidad/derechos-arco` como producto.
12. Procedimiento de borrado/anonimización en CMS+CRM+mail.

## Scorecard (interno)

| Sí | Lectura |
|----|---------|
| 11–12 | Bajo · monitoreo |
| 7–10 | Medio · huecos CMP/API |
| 0–6 | Alto · **revisión** (no “auditoría urgente” → colisión `/auditoria`) |

## SEO (cuando se publique)

- Title ≤60: `Checklist Ley 21.719 · Viento Norte`
- Canonical: o sección en `/servicios/privacidad-datos/` o `/servicios/seguridad-privacidad-digital/` (B) **después** de Prototype.
- No sitemap hasta index=true.
- Internals: WCAG 2.2 · asistente-ia · `/s/consultoria/`.
