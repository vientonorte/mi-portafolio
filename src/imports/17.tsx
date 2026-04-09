import imgCapturaDePantalla20221009ALaS14401 from "figma:asset/94e64e0789d3cb3779d529afdfca4db701e1ffe5.png";

export default function Component() {
  return (
    <div className="bg-white relative size-full" data-name="17">
      <p className="absolute font-['Proxima_Nova:Black',sans-serif] leading-[normal] left-[calc(7.14%+42.86px)] not-italic text-[#666565] text-[72px] top-[calc(11.11%+60.97px)] w-[562px]">Resumen</p>
      <p className="absolute font-['Proxima_Nova:Semibold',sans-serif] leading-[32px] left-[calc(7.14%+42.86px)] not-italic text-[#ff6900] text-[21px] text-nowrap top-[calc(11.11%+20.97px)] tracking-[2.1px] whitespace-pre">Propuesta Sprint de diseño</p>
      <div className="absolute font-['Proxima_Nova:Light',sans-serif] h-[618px] leading-[40px] left-[calc(7.14%+42.86px)] not-italic text-[#666565] text-[24px] top-[calc(22.22%+40px)] w-[504px]">
        <p className="mb-0">
          <span>{`Actualmente el proceso de diseño para la APP no cuenta con tareas definidas y se sustenta en dos estados durante los sprints de desarrollo: `}</span>
          <span className="font-['Proxima_Nova:Bold_Italic',sans-serif] italic">“Diseño en progreso”</span>
          <span className="font-['Proxima_Nova:Bold',sans-serif] not-italic"> </span>
          <span>{`y `}</span>
          <span className="font-['Proxima_Nova:Bold_Italic',sans-serif] italic">“Diseño en Aprobación”</span>
          <span className="font-['Proxima_Nova:Thin',sans-serif] not-italic">.</span>
        </p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0 whitespace-pre-wrap">
          <span className="font-['Proxima_Nova:Light',sans-serif] not-italic text-[#666565]">{`Es por esto que nace esta propuesta, que tiene por objetivo  definir claramente los macro procesos del proceso deI`}</span>
          <span>{` Producto`}</span>
          <span className="font-['Proxima_Nova:Light',sans-serif] not-italic text-[#666565]">, facilitando por una parte la estimación de los esfuerzos así como el registro del trabajo</span>
          <span>{` y la documentación.`}</span>
        </p>
        <p>&nbsp;</p>
      </div>
      <div className="absolute h-[506px] left-[calc(35.71%+56.29px)] top-[calc(22.22%+39px)] w-[1056px]" data-name="Captura de Pantalla 2022-10-09 a la(s) 14.40 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgCapturaDePantalla20221009ALaS14401} />
      </div>
    </div>
  );
}