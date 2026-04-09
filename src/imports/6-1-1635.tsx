import imgCadenaValorUxUiDesign1 from "figma:asset/d875ff7cbc9428b37b29af656c4f765e8cb8b779.png";
import imgCapturaDePantalla20230405ALaS19041 from "figma:asset/84a772361fb8479f9e7f68a945694e700b7f7321.png";
import imgCapturaDePantalla20230405ALaS19131 from "figma:asset/d1ab9c8c94b2a7e89d137d276bf558f69f930bbc.png";
import img5042 from "figma:asset/77b107e97d12e770619a89e345639f0bc08f5202.png";

export default function Component() {
  return (
    <div className="bg-white relative size-full" data-name="6">
      <p className="absolute font-['Proxima_Nova:Black',sans-serif] leading-[normal] left-[calc(7.14%+42.86px)] not-italic text-[#666565] text-[72px] top-[calc(11.11%+60.97px)] w-[562px]">UX DESIGN</p>
      <p className="absolute font-['Proxima_Nova:Semibold',sans-serif] leading-[32px] left-[calc(7.14%+42.86px)] not-italic text-[#ff6900] text-[21px] text-nowrap top-[calc(11.11%+20.97px)] tracking-[2.1px] whitespace-pre">{`DETALLES `}</p>
      <div className="absolute font-['Proxima_Nova:Light',sans-serif] h-[698px] leading-[0] left-[calc(7.14%+42.86px)] not-italic text-[#666565] text-[24px] top-[calc(22.22%+40px)] w-[504px]">
        <p className="font-['Proxima_Nova:Bold',sans-serif] leading-[40px] mb-0">Co diseñamos la solución</p>
        <p className="leading-[40px] mb-0">&nbsp;</p>
        <p className="leading-[40px] mb-0">
          <span>{`Para comenzar a diseñar la UX, primero hay que `}</span>
          <span className="font-['Proxima_Nova:Bold',sans-serif] not-italic">Jerarquizar nuestros hallazgos</span>, en tanto valor x esfuerzo.
        </p>
        <p className="leading-[40px] mb-0">&nbsp;</p>
        <p className="leading-[40px] mb-0">
          En este punto del proceso podemos trabajar en conjunto a Stakeholders y/o P.O y el Líder Técnico del proyecto con tal de obtener la mejor<span className="font-['Proxima_Nova:Bold',sans-serif] not-italic">{` Diagramación del Journey Map `}</span>de la Solución.
        </p>
        <p className="leading-[40px] mb-0">&nbsp;</p>
        <p className="leading-[40px]">
          Finalmente tenemos e<span className="font-['Proxima_Nova:Bold',sans-serif] not-italic">{`l Prototipo, `}</span>que funciona tanto para usarlo como hand off a los equipo de Desarrollo y QA, como para probar nuestros test de usabilidad (etapa posterior)-
        </p>
      </div>
      <div className="absolute h-[693px] left-[calc(28.57%+127.43px)] top-[calc(11.11%+73px)] w-[422px]" data-name="Cadena valor UX UI Design 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[126.71%] left-[-154.52%] max-w-none top-[-12.17%] w-[478.87%]" src={imgCadenaValorUxUiDesign1} />
        </div>
      </div>
      <div className="absolute h-[181px] left-[calc(57.14%+35.86px)] top-[117px] w-[631px]" data-name="Captura de pantalla 2023-04-05 a la(s) 19.04 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgCapturaDePantalla20230405ALaS19041} />
      </div>
      <div className="absolute h-[324px] left-[calc(57.14%+56.86px)] top-[calc(66.67%-4px)] w-[589px]" data-name="Captura de pantalla 2023-04-05 a la(s) 19.13 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgCapturaDePantalla20230405ALaS19131} />
      </div>
      <div className="absolute h-[383px] left-[calc(57.14%+66.86px)] top-[calc(22.22%+75px)] w-[552px]" data-name="504 2">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img5042} />
      </div>
    </div>
  );
}