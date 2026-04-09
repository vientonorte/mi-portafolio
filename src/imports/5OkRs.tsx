import imgImage1 from "figma:asset/87f8a6e7a81d96e3e86411d762aae491d3952734.png";

function Group() {
  return (
    <div className="absolute contents left-[calc(7.14%+42.86px)] not-italic top-[calc(11.11%+21px)]">
      <div className="absolute font-['Proxima_Nova:Black',sans-serif] leading-[normal] left-[calc(7.14%+42.86px)] text-[#666565] text-[72px] top-[calc(11.11%+61px)] w-[500px]">
        <p className="mb-0">Objetivos</p>
        <p>{`OKRs `}</p>
      </div>
      <p className="absolute font-['Proxima_Nova:Semibold',sans-serif] leading-[32px] left-[calc(7.14%+42.86px)] text-[#ff6900] text-[21px] text-nowrap top-[calc(11.11%+21px)] tracking-[2.1px] whitespace-pre">Taller Design Thinking - APP Shopper</p>
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute font-['Roboto:Regular',sans-serif] font-normal h-[48px] leading-[0] left-[calc(7.14%+42.86px)] text-[18px] top-[calc(88.89%+28px)] w-[1560.1px]" data-name="Footer">
      <div className="absolute bottom-0 flex flex-col justify-end left-0 right-[84.74%] text-[#ff6900] top-[54.17%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">rodrigo.gaete@transvip.cl</p>
      </div>
      <div className="absolute bottom-0 flex flex-col justify-end left-[76.19%] right-0 text-right text-white top-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">Agosto 2023</p>
      </div>
    </div>
  );
}

export default function Component5OkRs() {
  return (
    <div className="bg-white relative size-full" data-name="5 - OKRs">
      <div className="absolute flex h-[1080px] items-center justify-center right-0 top-0 w-[1178px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="bg-[#666565] h-[1080px] w-[1178px]" />
        </div>
      </div>
      <div className="absolute h-[610px] left-[calc(42.86%+39.14px)] top-1/2 translate-y-[-50%] w-[897px]" data-name="image 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
      <div className="absolute h-[497px] left-[calc(42.86%+47.14px)] rounded-[8px] top-[calc(50%+0.5px)] translate-y-[-50%] w-[880px]" data-name="Captura de pantalla 2023-08-23 a la(s) 11.29 1" />
      <Group />
      <div className="absolute font-['Proxima_Nova:Regular',sans-serif] h-[603px] leading-[40px] left-[calc(7.14%+42.86px)] not-italic text-[#333333] text-[24px] top-[calc(33.33%+1px)] w-[500px]">
        <p className="mb-0">
          <span className="font-['Proxima_Nova:Bold',sans-serif] not-italic">{`En la sesión 3 `}</span>Terminamos por objetivar el proyecto con toda la información necesaria para establecer los MVP 1 con sus iniciativas asociadas y funcionalidades.
        </p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">Aprovechamos de declarar también los MVP 2 y 3 a manera de deseables una vez podamos escalar el proyecto.</p>
        <p className="mb-0">&nbsp;</p>
        <p>Lo que sigue es el proceso de ideación que lideraremos en conjunto con Juan Cortés desde el equipo de diseño de producto.</p>
      </div>
      <Footer />
    </div>
  );
}