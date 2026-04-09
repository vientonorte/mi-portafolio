import imgCadenaValorUxUiDesign1 from "figma:asset/d875ff7cbc9428b37b29af656c4f765e8cb8b779.png";
import imgRectangle220 from "figma:asset/07b1a691d848de20260b8010984e7e68fe438bba.png";
import imgRectangle221 from "figma:asset/b9ae54b6596cfbe173cbffc5d7c905a655a6af7b.png";
import imgRectangle222 from "figma:asset/39c89e78c4c839df83404a07c05ea25dc2ac175c.png";

export default function Component() {
  return (
    <div className="bg-white relative size-full" data-name="12">
      <p className="absolute font-['Proxima_Nova:Black',sans-serif] leading-[normal] left-[calc(7.14%+42.86px)] not-italic text-[#666565] text-[72px] top-[calc(11.11%+60.97px)] w-[562px]">UX RESEARCH</p>
      <p className="absolute font-['Proxima_Nova:Semibold',sans-serif] leading-[32px] left-[calc(7.14%+42.86px)] not-italic text-[#ff6900] text-[21px] text-nowrap top-[calc(11.11%+20.97px)] tracking-[2.1px] whitespace-pre">{`DETALLES `}</p>
      <div className="absolute font-['Proxima_Nova:Light',sans-serif] h-[698px] leading-[0] left-[calc(7.14%+42.86px)] not-italic text-[#666565] text-[24px] top-[calc(22.22%+40px)] w-[504px]">
        <p className="font-['Proxima_Nova:Bold',sans-serif] leading-[40px] mb-0">Ahora probamos nuestra hipóteses.</p>
        <p className="leading-[40px] mb-0">&nbsp;</p>
        <p className="leading-[40px] mb-0">Si bien no es necesario llevar acabo estos tres procesos de ux reseach, al menos debiese aplicarse uno x ticket.</p>
        <p className="leading-[40px] mb-0">&nbsp;</p>
        <p className="leading-[40px] mb-0">
          <span className="font-['Proxima_Nova:Bold',sans-serif] not-italic">Observación participante</span>
          <span>{` : consiste en detallar la relación que existe con el producto en interacción con usuarios finales. `}</span>
        </p>
        <p className="leading-[40px] mb-0">&nbsp;</p>
        <p className="leading-[40px] mb-0">
          <span className="font-['Proxima_Nova:Bold',sans-serif] not-italic">Entrevista con testers:</span>
          <span className="font-['Proxima_Nova:Regular',sans-serif] not-italic"> </span>con el objetivo de conocer de primera fuente los dolores de nuestra UX en cualquier punto de contacto.
        </p>
        <p className="leading-[40px] mb-0">&nbsp;</p>
        <p className="leading-[40px]">
          <span className="font-['Proxima_Nova:Bold',sans-serif] not-italic">Encuestas a testers</span>: dirigidas a confirmar ideas concretas.sobre funcionalidades en producción o en ideación.
        </p>
      </div>
      <div className="absolute h-[693px] left-[calc(28.57%+119.43px)] top-[calc(11.11%+74px)] w-[364px]" data-name="Cadena valor UX UI Design 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[126.71%] left-[-78.4%] max-w-none top-[-12.46%] w-[555.17%]" src={imgCadenaValorUxUiDesign1} />
        </div>
      </div>
      <div className="absolute h-[158px] left-[calc(57.14%+3.86px)] rounded-[8px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.25)] top-[calc(11.11%+108px)] w-[675px]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[8px]">
          <div className="absolute bg-[#d9d9d9] inset-0 rounded-[8px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[8px]">
            <img alt="" className="absolute h-[640.82%] left-[0.2%] max-w-none top-[-455.91%] w-full" src={imgRectangle220} />
          </div>
          <div className="absolute bg-[rgba(38,50,56,0.3)] inset-0 rounded-[8px]" />
        </div>
      </div>
      <div className="absolute h-[158px] left-[calc(57.14%+3.86px)] rounded-[8px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.25)] top-[calc(33.33%+109px)] w-[675px]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[8px]">
          <div className="absolute bg-[#d9d9d9] inset-0 rounded-[8px]" />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[8px] size-full" src={imgRectangle221} />
          <div className="absolute bg-[rgba(38,50,56,0.3)] inset-0 rounded-[8px]" />
        </div>
      </div>
      <div className="absolute h-[158px] left-[calc(57.14%+3.86px)] rounded-[8px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.25)] top-[calc(55.56%+95px)] w-[675px]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[8px]">
          <div className="absolute bg-[#d9d9d9] inset-0 rounded-[8px]" />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[8px] size-full" src={imgRectangle222} />
          <div className="absolute bg-[rgba(38,50,56,0.3)] inset-0 rounded-[8px]" />
        </div>
      </div>
    </div>
  );
}