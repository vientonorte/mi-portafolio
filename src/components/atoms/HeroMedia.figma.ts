// url=https://www.figma.com/design/C2ZgaajABQa3NiFJTnFF45/VN-%C2%B7-Campaign-assets-%C2%B7-piloto-a11y?node-id=44-32
// source=src/components/molecules/DeviceMockup.tsx
// component=DeviceMockup
import figma from 'figma'
void figma.selectedInstance

export default {
  example: figma.code`
    <DeviceMockup
      variant="browser"
      src="/images/consultoria/x-cms-dashboard.png"
      alt="Dashboard CMS — operaciones digitales en el stack del cliente"
      caption="cms · operaciones"
    />
  `,
  imports: ['import { DeviceMockup } from "@/components/molecules/DeviceMockup"'],
  id: 'hero-ops-media',
  metadata: { nestable: true },
}
