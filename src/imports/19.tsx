import imgCadenaValorUxUiDesign1 from "figma:asset/d875ff7cbc9428b37b29af656c4f765e8cb8b779.png";
import imgCapturaDePantalla20230405ALaS17111 from "figma:asset/70518d704593e324e05fed17928549e0e0e5fbd0.png";
import imgCapturaDePantalla20230405ALaS17121 from "figma:asset/351998f57aeca5a0721f29366c3e661a468847b6.png";
import imgCapturaDePantalla20230405ALaS20021 from "figma:asset/8f110ae182ecb20cb32d266577a4411e4215f9a8.png";

export default function Component() {
  return (
    <div className="bg-white relative size-full" data-name="19">
      <p className="absolute font-['Proxima_Nova:Black',sans-serif] leading-[normal] left-[calc(7.14%+42.86px)] not-italic text-[#666565] text-[72px] top-[calc(11.11%+60.97px)] w-[562px]">UX ANALYTICS</p>
      <p className="absolute font-['Proxima_Nova:Semibold',sans-serif] leading-[32px] left-[calc(7.14%+42.86px)] not-italic text-[#ff6900] text-[21px] text-nowrap top-[calc(11.11%+20.97px)] tracking-[2.1px] whitespace-pre">{`DETALLES `}</p>
      <div className="absolute font-['Proxima_Nova:Light',sans-serif] h-[618px] leading-[0] left-[calc(7.14%+42.86px)] not-italic text-[#666565] text-[24px] top-[calc(22.22%+40px)] w-[504px]">
        <p className="font-['Proxima_Nova:Bold',sans-serif] leading-[40px] mb-0">¿Hay errores?</p>
        <p className="leading-[40px] mb-0">&nbsp;</p>
        <p className="leading-[40px] mb-0">
          <span>{`Ya sea si este ticket es un Requerimiento nuevo o le refinamiento de un ticket en producción, la primera fuente de data serán los `}</span>
          <span className="font-['Proxima_Nova:Bold',sans-serif] not-italic">Análisis de datos</span>
          <span>{` a través de reportes de analíticas de los productos, y luego un `}</span>
          <span className="font-['Proxima_Nova:Bold',sans-serif] not-italic">Benchmark</span>
          <span>{` a 3 competencias ( u otra herramienta tipo Heurísticas).`}</span>
        </p>
        <p className="leading-[40px] mb-0">&nbsp;</p>
        <p className="leading-[40px]">
          <span>{`Con tal de poder generar una `}</span>
          <span className="font-['Proxima_Nova:Bold',sans-serif] not-italic">hipótesis</span>
          <span>{` y pasar directamente a los procesos de UX Research.`}</span>
        </p>
      </div>
      <div className="absolute h-[693px] left-[calc(35.71%+56.29px)] top-[calc(11.11%+73px)] w-[360px]" data-name="Cadena valor UX UI Design 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[126.71%] left-0 max-w-none top-[-12.27%] w-[561.34%]" src={imgCadenaValorUxUiDesign1} />
        </div>
      </div>
      <div className="absolute h-[253px] left-[calc(57.14%+84.86px)] rounded-[8px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.12)] top-[132px] w-[490px]" data-name="Captura de pantalla 2023-04-05 a la(s) 17.11 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full" src={imgCapturaDePantalla20230405ALaS17111} />
      </div>
      <div className="absolute h-[254px] left-[calc(57.14%+84.86px)] rounded-[8px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.12)] top-[calc(33.33%+50px)] w-[490px]" data-name="Captura de pantalla 2023-04-05 a la(s) 17.12 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full" src={imgCapturaDePantalla20230405ALaS17121} />
      </div>
      <div className="absolute h-[257px] left-[calc(57.14%+84.86px)] rounded-[8px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.12)] top-[calc(55.56%+89px)] w-[490px]" data-name="Captura de pantalla 2023-04-05 a la(s) 20.02 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full" src={imgCapturaDePantalla20230405ALaS20021} />
      </div>
    </div>
  );
}