import movilidadImg from '../imagenes/movilidad-premium.png';
import React from 'react';
import { CardCasoEstudio } from '../design-system/CardCasoEstudio';

/**
 * Caso de estudio: Optimización de reservas en movilidad premium
 *
 * 1. Contexto y reto:
 *   - El servicio de movilidad premium enfrentaba baja conversión y tiempos de reserva elevados.
 *   - El reto era mejorar la experiencia sin interrumpir la operación diaria.
 *
 * 2. Conflicto y barreras:
 *   - Restricciones técnicas del sistema legacy.
 *   - Resistencia al cambio en el equipo operativo.
 *
 * 3. Estrategia y liderazgo UX:
 *   - Se definió un MVP con quick wins priorizados en backlog scrum.
 *   - Facilitación de workshops para identificar pain points y oportunidades.
 *   - Validación continua con usuarios reales en cada sprint.
 *
 * 4. Proceso y momentos clave:
 *   - Investigación: análisis de métricas y entrevistas con usuarios frecuentes.
 *   - Ideación: prototipos de bajo costo validados semanalmente.
 *   - Clímax: lanzamiento del MVP y medición de impacto inmediato.
 *
 * 5. Solución y resultados:
 *   - Reducción del tiempo de reserva y aumento de conversión.
 *   - Cultura de mejora continua instaurada en el equipo scrum.
 *   - Documentación de aprendizajes para siguientes releases.
 */

export function CasoMovilidadPremium() {
  return (
    <CardCasoEstudio
      titulo="Optimización de reservas en movilidad premium"
      resumen="Apliqué metodología scrum para rediseñar el flujo de reservas, priorizando quick wins y validando hipótesis en cada sprint. El MVP redujo el tiempo de reserva y mejoró la conversión."
      imagen={movilidadImg}
      link="#"
    />
  );
}
