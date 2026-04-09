import imgCadenaValorUxUiDesign1 from "figma:asset/d875ff7cbc9428b37b29af656c4f765e8cb8b779.png";

export default function Component() {
  return (
    <div className="bg-white relative size-full" data-name="3">
      <p className="absolute font-['Proxima_Nova:Black',sans-serif] leading-[normal] left-[calc(7.14%+42.86px)] not-italic text-[#666565] text-[72px] top-[calc(11.11%+60.97px)] w-[562px]">Detalles</p>
      <p className="absolute font-['Proxima_Nova:Semibold',sans-serif] leading-[32px] left-[calc(7.14%+42.86px)] not-italic text-[#ff6900] text-[21px] text-nowrap top-[calc(11.11%+20.97px)] tracking-[2.1px] whitespace-pre">Propuesta Sprint de diseño</p>
      <div className="absolute font-['Proxima_Nova:Light',sans-serif] h-[754px] leading-[40px] left-[calc(7.14%+42.86px)] not-italic text-[#666565] text-[24px] top-[calc(22.22%+40px)] w-[504px]">
        <p className="mb-0">
          <span>{`El propósito de declarar los macro procesos de diseño del producto es agregar valor mediante un `}</span>
          <span className="font-['Proxima_Nova:Bold_Italic',sans-serif] italic">{`Discovery Activo `}</span>el cual se centra en corregir errores detectados mediante las herramientas de analítica disponibles, priorizando adecuadamente los esfuerzos para no depender de un Discovery Pasivo (a partir de dolores detectados en reviews o conversaciones con stakeholders), sustentándonos en la data para tomar decisiones estratégicas.
        </p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0 whitespace-pre-wrap">
          <span>{`Al incluir una estrategia de producto basada en la ideación colaborativa durante el `}</span>
          <span className="font-['Proxima_Nova:Bold_Italic',sans-serif] italic">Product Design</span>
          <span className="font-['Proxima_Nova:Light_Italic',sans-serif] italic">,</span>
          <span className="font-['Proxima_Nova:Bold_Italic',sans-serif] italic"> </span>
          <span>{`desde la jerarquización de los hallazgos de la UX  y la competencia, hasta el testeo con usuari@s finales y stakeholders antes de llegar al sprint de desarrollo, nos permite disminuir los errores de diseño y eventuales desarrollos.`}</span>
        </p>
        <p className="mb-0">&nbsp;</p>
        <p>&nbsp;</p>
      </div>
      <div className="absolute h-[461px] left-[calc(35.71%+56.29px)] top-[calc(22.22%+69px)] w-[1058px]" data-name="Cadena valor UX UI Design 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgCadenaValorUxUiDesign1} />
      </div>
    </div>
  );
}