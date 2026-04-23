import img01 from "figma:asset/93f752ccf2bf3e160e29c0654ed37065e66cd03a.png";

function Others() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Others">
      <a className="[white-space-collapse:collapse] flex flex-col font-['Sura_Sans:Negrita',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#161618] text-[14px] text-nowrap tracking-[0.25px] uppercase" href="https://www.figma.com/design/2sqtmuruoylv9y2cQXZ1Ag?node-id=311-11143">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] cursor-pointer decoration-solid leading-[1.5] underline whitespace-pre">vOLVER AL INICIO</p>
      </a>
    </div>
  );
}

function ButtonBase() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[12px] relative rounded-[999px] shrink-0" data-name=".button-base">
      <div aria-hidden="true" className="absolute border-2 border-[#161618] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <Others />
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col h-[48px] items-center justify-center relative shrink-0" data-name="button">
      <ButtonBase />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[24px] h-[718px] items-start left-[343px] p-[24px] top-1/2 translate-y-[-50%] w-[342px]">
      <p className="font-['Sura_Sans:Negrita',sans-serif] font-bold leading-[1.15] min-w-full relative shrink-0 text-[38px] text-black tracking-[-0.722px] w-[min-content]">FAQ</p>
      <div className="font-['Sura_Sans:Regular',sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.8)] tracking-[-0.072px] w-[min-content]">
        <ul className="mb-0">
          <li className="list-disc ms-[18px]">
            <span className="font-['Sura_Sans:Bold',sans-serif] leading-[24px] not-italic text-[#0b2dce]">¿Qué contiene cada página de este archivo?</span>
          </li>
        </ul>
        <p className="leading-[24px] mb-0">Encontrarás el proceso de diseño UX y UI de la iniciativas, resultado del proceso de ideación con los equipos de la iniciativa.</p>
        <ul className="mb-0">
          <li className="list-disc ms-[18px]">
            <span className="font-['Sura_Sans:Bold',sans-serif] leading-[24px] not-italic text-[#0b2dce]">¿Cómo está construido el UI ?</span>
          </li>
        </ul>
        <p className="leading-[24px] mb-0 whitespace-pre-wrap">
          <span>{`Con `}</span>
          <a className="[text-decoration-skip-ink:none] [text-underline-position:from-font] cursor-pointer decoration-solid underline" href="https://www.uifrommars.com/atomic-design-ventajas/">
            <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-[24px]">
              atomic design
            </span>
          </a>
          <span>{`, utilizando el nuevo sistema de diseño  de SURA Investments, en estos `}</span>links<span>{` encontrarás la documentación necesaria para el correcto desarrollo de los `}</span>
          <a className="[text-decoration-skip-ink:none] [text-underline-position:from-font] cursor-pointer decoration-solid underline" href="https://www.figma.com/design/1Aks0tH7nEkPsxpsvGDHs8/%F0%9F%93%90-%5BSURA-Investments%5D-Libreri%CC%81a-componentes?node-id=0-1&t=S3RuPyGfooKMi55q-1">
            <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-[24px]">
              estilos
            </span>
          </a>
          <span>{` y `}</span>
          <a className="[text-decoration-skip-ink:none] [text-underline-position:from-font] cursor-pointer decoration-solid underline" href="https://www.figma.com/design/1Aks0tH7nEkPsxpsvGDHs8/%F0%9F%93%90-%5BSURA-Investments%5D-Libreri%CC%81a-componentes?node-id=0-1&t=S3RuPyGfooKMi55q-1">
            <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-[24px]">{`componentes base `}</span>
          </a>
          del sistema de diseño
        </p>
        <ul className="mb-0">
          <li className="list-disc ms-[18px]">
            <span className="font-['Sura_Sans:Bold',sans-serif] leading-[24px] not-italic text-[#0b2dce]">¿Cómo se usa DEV Mode?</span>
          </li>
        </ul>
        <p className="leading-[24px] mb-0">
          <span>{`Puedes ver el siguiente tutorial `}</span>
          <a className="[text-decoration-skip-ink:none] [text-underline-position:from-font] cursor-pointer decoration-solid underline" href="https://www.youtube.com/watch?v=__ABPkb0aF8&t=49s">
            <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-[24px]">
              aquí
            </span>
          </a>
        </p>
        <ul className="mb-0">
          <li className="list-disc ms-[18px]">
            <span className="font-['Sura_Sans:Bold',sans-serif] leading-[24px] not-italic text-[#0b2dce]">¿Qué son las especificaciones UI?</span>
          </li>
        </ul>
        <p className="leading-[24px]">
          <span>{`Son una explicación gráfica de como construir los componentes utilizados `}</span>
          <a className="[text-decoration-skip-ink:none] [text-underline-position:from-font] cursor-pointer decoration-solid underline" href="https://www.figma.com/design/2sqtmuruoylv9y2cQXZ1Ag?node-id=15328-60638">
            <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-[24px]">
              aquí
            </span>
          </a>
          <span>{` y que en términos de CSS su construcción parte del proyecto Módulo FX , cuyo líder técnico es Eduardo Villalobos.`}</span>
        </p>
      </div>
      <Button />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[343px] top-1/2 translate-y-[-50%]">
      <Frame />
    </div>
  );
}

function Component() {
  return (
    <div className="absolute bg-[#111111] h-[718px] left-0 overflow-clip top-0 w-[685px]" data-name="01">
      <div className="absolute h-[638px] left-0 top-0 w-[685px]" data-name="Background" />
      <div className="absolute h-[718px] left-0 top-[229px] w-[343px]" data-name="01">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img01} />
      </div>
      <Group />
    </div>
  );
}

export default function Faq() {
  return (
    <div className="bg-[#111111] relative size-full" data-name="FAQ">
      <Component />
    </div>
  );
}
