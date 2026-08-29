// url=https://www.figma.com/design/C2ZgaajABQa3NiFJTnFF45/VN-%C2%B7-Campaign-assets-%C2%B7-piloto-a11y?node-id=44-32
// source=src/components/organisms/ConsultoriaLandingHero.tsx
// component=ConsultoriaLandingHero
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Title')
const description = instance.getString('Description')
const ctaPrimary = instance.getString('CtaPrimary')
const ctaFree = instance.getString('CtaFree')
const showFree = instance.getBoolean('ShowFreeCta')
void title
void description
void ctaPrimary
void ctaFree
void showFree

export default {
  example: figma.code`<ConsultoriaLandingHero />`,
  imports: [
    'import { ConsultoriaLandingHero } from "@/components/organisms/ConsultoriaLandingHero"',
  ],
  id: 'consultoria-landing-hero-v3',
  metadata: { nestable: false },
}
