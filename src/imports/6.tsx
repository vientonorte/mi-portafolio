import img6 from "figma:asset/b39a807f5a67223b2c7c2fd9399005166e91a018.png";

function Txt() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[46px] h-full items-start not-italic pl-[40px] pr-[22px] py-[64px] relative shrink-0 text-[#f8f8f8] w-[589px]" data-name="TXT">
      <p className="font-['Chillax:Bold',sans-serif] leading-[normal] relative shrink-0 text-[92px] w-full">Tipografía</p>
      <p className="font-['Chillax:Light',sans-serif] leading-[48px] relative shrink-0 text-[40px] w-full">
        <span>{`La necesidad de un cuerpo que sostenga y comunique las ideas de la marca, me llevaron a escoger `}</span>
        <span className="font-['Chillax:Medium',sans-serif] not-italic">{`Chillax `}</span>
        <span>{`por su conexión con la Bauhaus y su ideología fundacional cuyo lema al igual que el mío `}</span>
        <span className="font-['Chillax:Medium',sans-serif] not-italic">“unión entre uso y estética”.</span>
      </p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col font-['Chillax:Regular',sans-serif] gap-[116px] items-start relative shrink-0">
      <div className="flex flex-col h-[90px] justify-center relative shrink-0 text-[100px] w-[690px]">
        <p className="leading-[1.3]">Chillax</p>
      </div>
      <div className="flex flex-col justify-center leading-[1.3] relative shrink-0 text-[40px] text-nowrap whitespace-pre">
        <p className="mb-0">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
        <p className="mb-0">abcdefghijklmnopqrstuvwxyz</p>
        <p>{`1234567890~!@#$%^&*()_+`}</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex gap-[213px] items-start ml-0 mt-0 not-italic relative text-neutral-900">
      <Frame />
      <div className="flex flex-col font-['Chillax:Medium',sans-serif] justify-center relative shrink-0 text-[400px] text-nowrap tracking-[-32px]">
        <p className="leading-[1.3] whitespace-pre">Aa</p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Text">
      <Frame1 />
    </div>
  );
}

function Icons() {
  return (
    <div className="absolute bg-[#f8f8f8] box-border content-stretch flex flex-col h-[923px] items-center justify-center left-[776px] px-[12px] py-[40px] rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.12)] top-[64px] w-[1539px]" data-name="ICONS">
      <Text />
    </div>
  );
}

function Contenedor() {
  return (
    <div className="box-border content-stretch flex gap-[112px] h-[918px] items-center px-0 py-[64px] relative shrink-0 w-[2315px]" data-name="CONTENEDOR">
      <Txt />
      <Icons />
    </div>
  );
}

function Marca() {
  return (
    <div className="h-[50px] relative shrink-0 w-full" data-name="MARCA">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] h-[50px] items-center px-[40px] py-0 relative w-full">
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
    <div className="absolute content-stretch flex flex-col gap-[264px] h-[1232px] items-start justify-center left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[2315px]" data-name="BODY">
      <Contenedor />
      <Marca />
    </div>
  );
}

export default function Component() {
  return (
    <div className="relative size-full" data-name="6">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#1d1326] inset-0" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={img6} />
      </div>
      <div className="absolute bg-[#333333] h-[1556px] left-0 top-0 w-[2765px]" />
      <Body />
    </div>
  );
}