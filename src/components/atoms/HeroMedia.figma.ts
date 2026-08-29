// url=https://www.figma.com/design/C2ZgaajABQa3NiFJTnFF45/VN-%C2%B7-Campaign-assets-%C2%B7-piloto-a11y?node-id=44-32
// source=src/components/molecules/DeviceMockup.tsx
// component=DeviceMockup
import figma from "figma";
void figma.selectedInstance;

export default {
  example: figma.code`
    <DeviceMockup
      variant="laptop"
      src="/images/consultoria/x-cms-dashboard.png"
      alt="X|CMS — dashboard de operaciones en el CMS del cliente"
      caption="X|CMS · demo 5 min"
      addressBar="x-cms · operaciones"
    />
  `,
  imports: [
    'import { DeviceMockup } from "@/components/molecules/DeviceMockup"',
  ],
  id: "hero-ops-media",
  metadata: { nestable: true },
};
