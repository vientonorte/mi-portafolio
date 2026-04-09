function Txt() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="TXT">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[46px] items-start not-italic pl-0 pr-[22px] py-[64px] relative size-full text-[#f8f8f8]">
          <p className="font-['Chillax:Bold',sans-serif] leading-[normal] relative shrink-0 text-[92px] w-full">{` Tabla de contenido`}</p>
          <ul className="block font-['Chillax:Regular',sans-serif] h-[591px] leading-[0] relative shrink-0 text-[40px] w-full">
            <li className="mb-0 ms-[60px]">
              <span className="leading-[48px]">Logo</span>
            </li>
            <li className="mb-0 ms-[60px]">
              <span className="leading-[48px]">Área de respeto</span>
            </li>
            <li className="mb-0 ms-[60px]">
              <span className="leading-[48px]">Tipografía</span>
            </li>
            <li className="mb-0 ms-[60px]">
              <span className="leading-[48px]">Paleta de colores</span>
            </li>
            <li className="mb-0 ms-[60px]">
              <span className="leading-[48px]">Patrones de diseño</span>
            </li>
            <li className="mb-0 ms-[60px]">
              <span className="leading-[48px]">Iconos</span>
            </li>
            <li className="mb-0 ms-[60px]">
              <span className="leading-[48px]">Moodboard</span>
            </li>
            <li className="mb-0 ms-[60px]">
              <span className="leading-[48px]">Linked in Banner</span>
            </li>
            <li className="mb-0 ms-[60px]">
              <span className="leading-[48px]">Logo web</span>
            </li>
            <li className="ms-[60px]">
              <span className="leading-[48px]">Otras aplicaiones</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Contenedor() {
  return (
    <div className="basis-0 box-border content-stretch flex gap-[264px] grow items-center min-h-px min-w-px px-[40px] py-[64px] relative shrink-0 w-[2315px]" data-name="CONTENEDOR">
      <Txt />
    </div>
  );
}

function Marca() {
  return (
    <div className="relative shrink-0 w-full" data-name="MARCA">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center px-[40px] py-[8px] relative w-full">
          <p className="font-['Chillax:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#f8f8f8] text-[36px] text-nowrap whitespace-pre">
            <span>{`Rodrigo Gaete `}</span>
            <span className="font-['Chillax:Regular',sans-serif]">BrandBook 2023</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.2)] content-stretch flex flex-col gap-[264px] h-[1232px] items-start justify-center left-1/2 rounded-[24px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[2315px]" data-name="BODY">
      <Contenedor />
      <Marca />
    </div>
  );
}

export default function Overview() {
  return (
    <div className="bg-[#333333] relative size-full" data-name="Overview">
      <Body />
    </div>
  );
}