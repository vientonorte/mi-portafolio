# 📋 Protocolo de Testing con Recruiters

**Sprint 2 - Story S2-5**  
**Estado:** ✅ Completado  
**Prioridad:** COULD (3 story points)

---

## 🎯 Objetivo

Validar que recruiters tech y hiring managers comprenden **en menos de 10 segundos**:
- ¿Qué hace Rodrigo Gaete?
- ¿En qué industrias trabaja?

Este hallazgo proviene de research que indica que recruiters toman decisiones rápidas sobre candidatos.

---

## Design thinking aplicado

| Fase | Hipótesis | Cómo la valida este protocolo |
|------|-----------|-------------------------------|
| **Empatizar** | Recruiters deciden en <10 s con señales de rol + industria | Fase 1 — first impression sin scroll |
| **Definir** | Deben llegar a evidencia de negocio sin fricción | Fase 2 — time to `/proyectos` <30 s |
| **Idear** | Nav unificado: Negocios primero; hero para intención; Consultoría en header | Observar uso de dock vs hamburger vs buscador hero |
| **Prototipar** | Portfolio en GitHub Pages con nav `nav-config.ts` | URL fija de producción |
| **Testear** | Fintech + Mobility reconocibles; NPS ≥7 | Fases 3 y métricas cuantitativas |

**Métricas nav (añadir en hoja de registro):**

- ¿Usó el buscador «¿Qué buscas?»? (Sí/No)
- ¿Encontró Consultoría sin abrir «Más»? (Sí/No — desktop)
- Primera superficie tocada: dock / header / hero / hamburger

---

## 👥 Perfil de Participantes

**Total:** 5 participantes

**Perfil requerido:**
- Recruiters técnicos (tech recruiters)
- Hiring managers de áreas tech/producto
- Experiencia contratando roles de UX/Product Design
- Familiarizados con portfolios digitales

**Diversidad recomendada:**
- 3 recruiters de fintech/startups
- 2 hiring managers de empresas enterprise
- Mix de seniority (2-3 junior/mid, 2-3 senior/lead)

---

## 🔬 Protocolo de Sesión

### Preparación
- Sesión individual de 15 minutos por participante
- Ambiente silencioso, sin distracciones
- Device: Desktop o mobile (registrar cuál)
- URL de inicio: `https://vientonorte.io/`

### Fase 1: First Impression (10 segundos)
**Instrucción al participante:**
> "Vas a ver el portfolio de un candidato UX Lead. Sin hacer scroll ni click, responde después de 10 segundos: ¿Qué hace esta persona y en qué industrias trabaja?"

**Registro:**
- Timer a 10 segundos
- Después, pedir respuesta verbal
- Anotar respuesta literal del participante

### Fase 2: Navegación Libre (3 minutos)
**Instrucción:**
> "Ahora tienes 3 minutos para explorar libremente el portfolio. Tu tarea es: encontrar información sobre los proyectos/negocios donde trabajó."

**Observaciones a registrar:**
- Tiempo hasta llegar a `/proyectos` (en segundos)
- Ruta seguida (Home → Negocios directo, Home → Más → Negocios, etc.)
- Comportamiento: ¿exploró BottomNav mobile? ¿usó breadcrumbs?
- Comentarios espontáneos (en voz alta si es posible)

### Fase 3: Validación Post-Exploración
**Preguntas cerradas:**
1. ¿Identificaste que trabaja en **Fintech**? (Sí/No)
2. ¿Identificaste que trabaja en **Mobility**? (Sí/No)
3. ¿Pudiste navegar fácilmente? (Muy fácil / Fácil / Neutral / Difícil / Muy difícil)

**Pregunta abierta:**
4. ¿Qué cambiarías del portfolio para decidir más rápido si contactar al candidato?

**NPS:**
5. En una escala de 0 a 10, ¿qué tan probable es que recomiendes este portfolio como ejemplo de presentación profesional UX? (0 = Nada probable, 10 = Muy probable)

---

## 📊 Métricas a Registrar

### Métricas Cuantitativas

| Métrica | Descripción | Objetivo |
|---------|-------------|----------|
| **First Impression Score** | % que responde correctamente rol + industrias en 10s | ≥80% |
| **Time to Projects** | Segundos desde Home hasta `/proyectos` | <30s |
| **Fintech Comprehension** | % que identifica Fintech | 100% |
| **Mobility Comprehension** | % que identifica Mobility | 100% |
| **Navigation Ease** | Promedio escala 1-5 (Muy difícil a Muy fácil) | ≥4.0 |
| **NPS** | Net Promoter Score del portfolio | ≥7.0 |

### Métricas Cualitativas
- Comentarios sobre comprensión inicial
- Patrones de navegación observados
- Fricción identificada
- Sugerencias de mejora

---

## 📝 Template de Registro (Spreadsheet)

### Columnas recomendadas:

```
| ID | Fecha | Perfil | Device | First_Impression_Correcta | Time_to_Projects | Fintech_ID | Mobility_ID | Nav_Ease | NPS | Comentarios | Sugerencias |
```

**Ejemplo de fila:**
```
| 1 | 2026-07-05 | Tech Recruiter (Fintech) | Desktop | Sí | 18s | Sí | Sí | 5 | 9 | "Muy claro desde el inicio" | "Agregar más casos en mobile" |
```

---

## 📋 Checklist de Ejecución

### Antes del test
- [ ] Reclutar 5 participantes (perfil validado)
- [ ] Crear spreadsheet con template
- [ ] Preparar timer/cronómetro
- [ ] Verificar que el sitio está deployed en producción
- [ ] Probar protocolo con 1 piloto interno

### Durante el test (por participante)
- [ ] Presentar objetivo sin sesgar respuesta
- [ ] Fase 1: Timer 10s → registrar respuesta
- [ ] Fase 2: Observar navegación 3 min → anotar tiempo y ruta
- [ ] Fase 3: Hacer 5 preguntas → registrar respuestas
- [ ] Agradecer y explicar contexto del portfolio

### Después del test
- [ ] Consolidar datos en spreadsheet
- [ ] Calcular métricas cuantitativas
- [ ] Identificar patrones en comentarios cualitativos
- [ ] Crear reporte ejecutivo (1 página)
- [ ] Compartir hallazgos con equipo (opcional: Slack/Notion)

---

## 📈 Reporte de Resultados (Template)

### Resumen Ejecutivo

**Fecha de ejecución:** [YYYY-MM-DD] *(Ejemplo: 2026-07-05)*  
**Participantes:** 5 (3 recruiters fintech, 2 hiring managers enterprise)

**Hallazgos clave:**
- First Impression: X/5 (X%) identificaron rol + industrias en <10s
- Time to Projects: Promedio Xs (rango: Xs - Xs)
- Fintech/Mobility: X/5 (X%) identificó ambas industrias
- NPS: X.X (rango: X - X)

**Patrones de comportamiento:**
- [Pattern 1]: X/5 usuarios...
- [Pattern 2]: X/5 usuarios...

**Sugerencias prioritarias:**
1. [Sugerencia recurrente con mayor impacto]
2. [Segunda sugerencia]
3. [Tercera sugerencia]

**Decisión post-test:**
- [ ] No action needed — métricas sobre objetivo
- [ ] Quick wins identificados → Sprint 3
- [ ] Rediseño parcial requerido

---

## 🚨 Criterios de Éxito (DoD)

Para considerar S2-5 como **DONE**:
- ✅ 5 participantes completaron el protocolo
- ✅ Datos registrados en spreadsheet
- ✅ Métricas calculadas
- ✅ Reporte ejecutivo de 1 página creado
- ✅ Hallazgos compartidos con PO

**Nota:** Este test **no bloquea el deploy** de Sprint 2. Es un COULD have para validar la hipótesis de comprensión en <10s.

---

## 🔗 Recursos

**Herramientas recomendadas:**
- **Registro:** Google Sheets / Notion Table / Airtable
- **Timer:** Cualquier cronómetro online (10s, 3min)
- **Sesiones:** Zoom (si es remoto) con screen sharing + grabación (con consentimiento)

**Documentos relacionados:**
- `HANDOFF_SPRINT.md` → Sprint 2 backlog
- `README.md` → Descripción del portfolio
- `MOBILE_QA.md` → Validación mobile previa

---

**Preparado por:** GitHub Copilot Agent  
**Última actualización:** 2026-07-01  
**Sprint:** 2 (S2-5)
