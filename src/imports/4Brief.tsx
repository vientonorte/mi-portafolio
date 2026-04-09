import imgCapturaDePantalla20230823ALaS11401 from "figma:asset/a633e31e4ce4652b6a54e3d62bc05ce3b6921232.png";
import imgCapturaDePantalla20230901ALaS12181 from "figma:asset/d7544032e8a1bb7f39d2362b91903b4c94308f07.png";

function Group() {
  return (
    <div className="absolute contents left-[calc(7.14%+42.86px)] not-italic top-[calc(11.11%+21px)]">
      <div className="absolute font-['Proxima_Nova:Black',sans-serif] leading-[normal] left-[calc(7.14%+42.86px)] text-[#666565] text-[72px] top-[calc(11.11%+61px)] w-[500px]">
        <p className="mb-0">Objetivos</p>
        <p>Brief proyecto</p>
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

export default function Component4Brief() {
  return (
    <div className="bg-white relative size-full" data-name="4 - Brief">
      <div className="absolute flex h-[1080px] items-center justify-center left-[calc(35.71%+55.29px)] top-0 w-[1178px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="bg-[#666565] h-[1080px] w-[1178px]" />
        </div>
      </div>
      <div className="absolute h-[300px] left-[calc(67.86%+7.14px)] rounded-[8px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[334px]" data-name="Captura de pantalla 2023-08-23 a la(s) 11.40 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full" src={imgCapturaDePantalla20230823ALaS11401} />
      </div>
      <div className="absolute h-[497px] left-[calc(42.86%+47.14px)] rounded-[8px] top-[calc(50%+0.5px)] translate-y-[-50%] w-[880px]" data-name="Captura de pantalla 2023-08-23 a la(s) 11.29 1" />
      <Group />
      <div className="absolute font-['Proxima_Nova:Regular',sans-serif] h-[603px] leading-[40px] left-[calc(7.14%+42.86px)] not-italic text-[#333333] text-[24px] top-[calc(33.33%+1px)] w-[500px]">
        <p className="mb-0">
          <span className="font-['Proxima_Nova:Bold',sans-serif] not-italic">{`En la sesión 1 `}</span>como equipo nos preparamos en el uso de conceptos y alcances del proyecto.
        </p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">Además Mauricio y Francisca han definido el brief del proyecto, lo que sienta las bases que orientarán nuestras acciones posteriores.</p>
        <p>&nbsp;</p>
      </div>
      <Footer />
      <div className="absolute h-[965px] left-[calc(50%-1px)] rounded-[8px] top-[49px] w-[701px]" data-name="Captura de pantalla 2023-09-01 a la(s) 12.18 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full" src={imgCapturaDePantalla20230901ALaS12181} />
      </div>
    </div>
  );
}