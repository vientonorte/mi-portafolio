import onboardingImg from '../imagenes/onboarding.webp';
import React from 'react';
import { CardCasoEstudio } from '../design-system/CardCasoEstudio';

export function EjemploCasoEstudio() {
  return (
    <CardCasoEstudio
      titulo="Onboarding digital bancario inclusivo"
      resumen="Diseñé un flujo de alta digital que aumentó la conversión un 32% y redujo el abandono en dispositivos móviles."
      imagen={onboardingImg}
      link="#"
    />
  );
}
