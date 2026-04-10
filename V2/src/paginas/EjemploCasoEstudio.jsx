import onboardingImg from '../imagenes/onboarding.webp';
import React from 'react';
import { CardCasoEstudio } from '../design-system/CardCasoEstudio';

/**
 * Caso de estudio: Onboarding digital bancario inclusivo
 *
 * 1. Contexto y reto:
 *   - El banco buscaba digitalizar el proceso de alta de nuevos clientes para reducir tiempos y mejorar la experiencia.
 *   - El reto era cumplir regulación financiera y lograr que usuarios no digitales completaran el proceso sin fricción.
 *
 * 2. Conflicto y barreras:
 *   - Restricciones legales y de compliance (validación de identidad, firma electrónica).
 *   - Usuarios con baja alfabetización digital y dispositivos móviles antiguos.
 *
 * 3. Estrategia y liderazgo UX:
 *   - Se definió un MVP con el equipo scrum: solo los pasos esenciales para abrir cuenta, validando hipótesis de abandono.
 *   - Lideré workshops de co-creación con negocio, legal y tecnología para mapear riesgos y oportunidades.
 *   - Se priorizó accesibilidad y lenguaje claro desde el inicio.
 *
 * 4. Proceso y momentos clave:
 *   - Investigación: entrevistas y pruebas con usuarios reales para identificar puntos de fricción.
 *   - Ideación: prototipos rápidos validados semanalmente en sprint reviews.
 *   - Clímax: el MVP fue lanzado a un segmento controlado, midiendo tasa de finalización y feedback.
 *
 * 5. Solución y resultados:
 *   - El onboarding digital permitió abrir cuenta en menos de 10 minutos desde cualquier dispositivo.
 *   - Se redujo el abandono en móviles y se documentaron aprendizajes para siguientes releases.
 *   - El equipo scrum adoptó retrospectivas centradas en experiencia usuaria para iterar el producto.
 */

export function EjemploCasoEstudio() {
  return (
    <CardCasoEstudio
      titulo="Onboarding digital bancario inclusivo"
      resumen="Lideré el diseño y validación de un MVP de onboarding digital, priorizando accesibilidad y cumplimiento. El proceso fue iterado en sprints scrum, logrando reducir el abandono y sentar bases para releases futuros."
      imagen={onboardingImg}
      link="#"
    />
  );
}
