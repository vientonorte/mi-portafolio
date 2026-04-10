import frameworkImg from '../imagenes/framework-ux.png';
import React from 'react';
import { CardCasoEstudio } from '../design-system/CardCasoEstudio';

/**
 * Caso de estudio: Framework UX Enterprise para banca regional
 *
 * 1. Contexto y reto:
 *   - La organización necesitaba escalar la práctica UX a nivel regional, con equipos distribuidos y procesos dispares.
 *   - El reto era lograr alineación y eficiencia sin perder foco en el usuario final.
 *
 * 2. Conflicto y barreras:
 *   - Diferencias culturales y tecnológicas entre países.
 *   - Falta de documentación y handoff estandarizado.
 *
 * 3. Estrategia y liderazgo UX:
 *   - Definí un MVP de framework con procesos mínimos viables y entregables claros.
 *   - Lideré workshops remotos para co-crear lineamientos y obtener buy-in de stakeholders.
 *   - Documenté el framework en vivo y lo iteré según feedback de los equipos scrum.
 *
 * 4. Proceso y momentos clave:
 *   - Investigación: entrevistas con leads de UX y producto en cada país.
 *   - Ideación: mapeo de procesos comunes y divergentes.
 *   - Clímax: adopción del MVP en 5 países y retroalimentación positiva en retrospectivas.
 *
 * 5. Solución y resultados:
 *   - Framework adoptado como estándar regional.
 *   - Reducción de tiempos de handoff y mayor consistencia en entregables UX.
 *   - Aprendizajes documentados para futuras expansiones.
 */

export function CasoFrameworkUX() {
  return (
    <CardCasoEstudio
      titulo="Framework UX Enterprise para banca regional"
      resumen="Diseñé y documenté un framework UX escalable, alineando equipos multidisciplinarios bajo una visión común. El MVP permitió validar procesos clave y acelerar la adopción en 5 países."
      imagen={frameworkImg}
      link="#"
    />
  );
}
