import svgPaths from "./svg-rgm1hoss3v";

function CardTitle() {
  return (
    <div className="[grid-area:1_/_1] relative shrink-0" data-name="CardTitle">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Proceso de Registro</p>
    </div>
  );
}

function CardDescription() {
  return (
    <div className="[grid-area:2_/_1] relative shrink-0" data-name="CardDescription">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#717182] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Flujo completo del proceso de registro de nuevos clientes</p>
    </div>
  );
}

function CardHeader() {
  return (
    <div className="h-[70px] relative shrink-0 w-[1118px]" data-name="CardHeader">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border gap-[6px] grid grid-cols-[repeat(1,_minmax(0px,_1fr))] grid-rows-[16px_minmax(0px,_1fr)] h-[70px] pb-0 pt-[24px] px-[24px] relative w-[1118px]">
        <CardTitle />
        <CardDescription />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.pb47f400} id="Vector" stroke="var(--stroke-0, #314158)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p17a13100} id="Vector_2" stroke="var(--stroke-0, #314158)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M10 9H8" id="Vector_3" stroke="var(--stroke-0, #314158)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M16 13H8" id="Vector_4" stroke="var(--stroke-0, #314158)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M16 17H8" id="Vector_5" stroke="var(--stroke-0, #314158)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-slate-100 relative rounded-[1.67772e+07px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <Icon />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#314158] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Primer paso</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#45556c] text-[12px] text-nowrap top-px whitespace-pre">Validación de identidad</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="basis-0 grow h-[38px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2px] h-[38px] items-start relative w-full">
        <Container1 />
        <Container2 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[191.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] h-full items-center relative w-[191.742px]">
        <Container />
        <Container3 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#0b2dce] h-[6px] relative rounded-[1.67772e+07px] shrink-0 w-[191.742px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[6px] w-[191.742px]" />
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[#eceef2] h-[22px] relative rounded-[8px] shrink-0 w-[61.148px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[61.148px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-nowrap whitespace-pre">1-2 min</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container6() {
  return (
    <div className="basis-0 bg-white grow h-[144px] min-h-px min-w-px relative rounded-[14px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-slate-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-[144px] items-start pl-[22px] pr-[2px] py-[22px] relative w-full">
          <Container4 />
          <Container5 />
          <Badge />
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M5 12H19" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M12 5L19 12L12 19" id="Vector_2" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="basis-0 grow h-[144px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] h-[144px] items-center relative w-full">
        <Container6 />
        <Icon1 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p9c60400} id="Vector" stroke="var(--stroke-0, #314158)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2bf8f980} id="Vector_2" stroke="var(--stroke-0, #314158)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-slate-100 relative rounded-[1.67772e+07px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <Icon2 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#314158] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Segundo paso</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#45556c] text-[12px] text-nowrap top-px whitespace-pre">Validación de contacto</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="basis-0 grow h-[38px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2px] h-[38px] items-start relative w-full">
        <Container9 />
        <Container10 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[188.844px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] h-full items-center relative w-[188.844px]">
        <Container8 />
        <Container11 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[#0b2dce] h-[6px] relative rounded-[1.67772e+07px] shrink-0 w-[188.844px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[6px] w-[188.844px]" />
    </div>
  );
}

function Badge1() {
  return (
    <div className="bg-[#eceef2] h-[22px] relative rounded-[8px] shrink-0 w-[63.078px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[63.078px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-nowrap whitespace-pre">2-3 min</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container14() {
  return (
    <div className="basis-0 bg-white grow h-[144px] min-h-px min-w-px relative rounded-[14px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-slate-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-[144px] items-start pl-[22px] pr-[2px] py-[22px] relative w-full">
          <Container12 />
          <Container13 />
          <Badge1 />
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M5 12H19" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M12 5L19 12L12 19" id="Vector_2" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="basis-0 grow h-[144px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] h-[144px] items-center relative w-full">
        <Container14 />
        <Icon3 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p3f3d8e00} id="Vector" stroke="var(--stroke-0, #314158)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M9 12L11 14L15 10" id="Vector_2" stroke="var(--stroke-0, #314158)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-slate-100 relative rounded-[1.67772e+07px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <Icon4 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#314158] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Tercer paso</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#45556c] text-[12px] text-nowrap top-px whitespace-pre">Preguntas de seguridad</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="basis-0 grow h-[38px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2px] h-[38px] items-start relative w-full">
        <Container17 />
        <Container18 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[194.781px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] h-full items-center relative w-[194.781px]">
        <Container16 />
        <Container19 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="bg-[#0b2dce] h-[6px] relative rounded-[1.67772e+07px] shrink-0 w-[194.781px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[6px] w-[194.781px]" />
    </div>
  );
}

function Badge2() {
  return (
    <div className="bg-[#eceef2] h-[22px] relative rounded-[8px] shrink-0 w-[63.281px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[63.281px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-nowrap whitespace-pre">3-5 min</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container22() {
  return (
    <div className="basis-0 bg-white grow h-[144px] min-h-px min-w-px relative rounded-[14px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-slate-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-[144px] items-start pl-[22px] pr-[2px] py-[22px] relative w-full">
          <Container20 />
          <Container21 />
          <Badge2 />
        </div>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M5 12H19" id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M12 5L19 12L12 19" id="Vector_2" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container23() {
  return (
    <div className="basis-0 grow h-[144px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] h-[144px] items-center relative w-full">
        <Container22 />
        <Icon5 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[25.2px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g id="Icon">
          <path d={svgPaths.p3ae97e00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.1" />
          <path d="M22.05 2.1L11.97 12.18" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.1" />
          <path d={svgPaths.p2febed00} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.1" />
        </g>
      </svg>
    </div>
  );
}

function Container24() {
  return (
    <div className="bg-[#161618] relative rounded-[1.67772e+07px] shrink-0 size-[50.4px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[50.4px]">
        <Icon6 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#161618] text-[14px] text-nowrap top-[0.58px] tracking-[-0.1504px] whitespace-pre">Paso final</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[16.8px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#45556c] text-[12px] text-nowrap top-[1.05px] whitespace-pre">Clave provisoria</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="basis-0 grow h-[39.9px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2.1px] h-[39.9px] items-start relative w-full">
        <Container25 />
        <Container26 />
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[183.365px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12.6px] h-full items-center relative w-[183.365px]">
        <Container24 />
        <Container27 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="bg-[#0b2dce] h-[6.3px] relative rounded-[1.67772e+07px] shrink-0 w-[183.365px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[6.3px] w-[183.365px]" />
    </div>
  );
}

function Badge3() {
  return (
    <div className="bg-[#030213] h-[23.1px] relative rounded-[8px] shrink-0 w-[61.991px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[23.1px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[61.991px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre">{`< 1 min`}</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container30() {
  return (
    <div className="bg-blue-50 h-[151.2px] relative rounded-[14px] shrink-0 w-[229.564px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#0b2dce] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12.6px] h-[151.2px] items-start pl-[23.1px] pr-[2px] py-[23.1px] relative w-[229.564px]">
        <Container28 />
        <Container29 />
        <Badge3 />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="box-border content-stretch flex gap-[12px] h-[144px] items-center pl-0 py-0 relative shrink-0 w-full" data-name="App">
      <Container7 />
      <Container15 />
      <Container23 />
      <Container30 />
    </div>
  );
}

function PrimitiveDiv() {
  return <div className="bg-[rgba(0,0,0,0.1)] h-px shrink-0 w-full" data-name="Primitive.div" />;
}

function Icon7() {
  return (
    <div className="absolute left-[18px] size-[24px] top-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.pace200} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M9 12L11 14L15 10" id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#0d542b] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Registro Exitoso</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#008236] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Usuario puede iniciar sesión con su clave provisoria y debe cambiarla dentro de 72 horas</p>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[48px] items-start left-[54px] top-[18px] w-[572.625px]" data-name="Container">
      <Container31 />
      <Container32 />
    </div>
  );
}

function App1() {
  return (
    <div className="bg-gradient-to-r from-[#f0fdf4] h-[84px] relative rounded-[14px] shrink-0 to-[#ecfdf5] w-full" data-name="App">
      <div aria-hidden="true" className="absolute border-2 border-[#b9f8cf] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Icon7 />
      <Container33 />
    </div>
  );
}

function CardContent() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1118px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[32px] h-full items-start pb-0 pt-[24px] px-[24px] relative w-[1118px]">
        <App />
        <PrimitiveDiv />
        <App1 />
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white h-[429px] relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div className="box-border content-stretch flex flex-col gap-[24px] h-[429px] items-start overflow-clip p-px relative rounded-[inherit] w-full">
        <CardHeader />
        <CardContent />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p51c6380} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M21 2L11.4 11.6" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.pff86670} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container34() {
  return (
    <div className="bg-[#161618] relative rounded-[1.67772e+07px] shrink-0 size-[64px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[64px]">
        <Icon8 />
      </div>
    </div>
  );
}

function CardTitle1() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="CardTitle">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[32px] left-0 not-italic text-[24px] text-neutral-950 text-nowrap top-0 tracking-[0.0703px] whitespace-pre">Paso final</p>
    </div>
  );
}

function CardDescription1() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="CardDescription">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28px] left-0 not-italic text-[#717182] text-[18px] text-nowrap top-0 tracking-[-0.4395px] whitespace-pre">Clave provisoria</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#314158] text-[16px] top-[-0.5px] tracking-[-0.3125px] w-[928px]">Se genera una clave provisoria que es enviada al correo electrónico del usuario. El usuario debe cambiar esta clave dentro de las próximas 72 horas.</p>
    </div>
  );
}

function Badge4() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[8px] top-0 w-[86.109px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[86.109px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">Paso 4 de 4</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Badge5() {
  return (
    <div className="absolute bg-[#eceef2] h-[22px] left-[94.11px] rounded-[8px] top-0 w-[59.039px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[59.039px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-nowrap whitespace-pre">{`< 1 min`}</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Container">
      <Badge4 />
      <Badge5 />
    </div>
  );
}

function Container36() {
  return (
    <div className="basis-0 grow h-[158px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[158px] items-start relative w-full">
        <CardTitle1 />
        <CardDescription1 />
        <Paragraph />
        <Container35 />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="basis-0 grow h-[158px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[158px] items-start relative w-full">
        <Container34 />
        <Container36 />
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M12 10L8 6L4 10" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-center justify-center relative w-[36px]">
        <Icon9 />
      </div>
    </div>
  );
}

function App2() {
  return (
    <div className="h-[158px] relative shrink-0 w-[1070px]" data-name="App">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[158px] items-start justify-between relative w-[1070px]">
        <Container37 />
        <Button />
      </div>
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[6px] h-[29px] items-center justify-center left-[3px] px-[9px] py-[5px] rounded-[14px] top-[3.5px] w-[354.664px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Resumen</p>
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="absolute box-border content-stretch flex gap-[6px] h-[29px] items-center justify-center left-[357.66px] px-[9px] py-[5px] rounded-[14px] top-[3.5px] w-[354.664px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Validaciones</p>
    </div>
  );
}

function PrimitiveButton2() {
  return (
    <div className="absolute box-border content-stretch flex gap-[6px] h-[29px] items-center justify-center left-[712.33px] px-[9px] py-[5px] rounded-[14px] top-[3.5px] w-[354.664px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Errores</p>
    </div>
  );
}

function TabList() {
  return (
    <div className="bg-[#ececf0] h-[36px] relative rounded-[14px] shrink-0 w-[1070px]" data-name="Tab List">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[1070px]">
        <PrimitiveButton />
        <PrimitiveButton1 />
        <PrimitiveButton2 />
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p1dee4500} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.pde53700} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[970px]" data-name="Heading 4">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#0d542b] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">¡Proceso completado!</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[20px] left-0 top-[32px] w-[970px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#016630] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">El usuario ha completado exitosamente todos los pasos de validación. La clave provisoria ha sido generada y enviada al correo electrónico.</p>
    </div>
  );
}

function BoldText() {
  return (
    <div className="absolute content-stretch flex h-[16.5px] items-start left-0 top-[1.5px] w-[99.133px]" data-name="Bold Text">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#733e0a] text-[14px] text-nowrap tracking-[-0.1504px] whitespace-pre">⚠️ Importante:</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <BoldText />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[99.13px] not-italic text-[#733e0a] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">El usuario debe cambiar su clave provisoria dentro de las próximas 72 horas.</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute bg-yellow-50 box-border content-stretch flex flex-col h-[52px] items-start left-0 pb-0 pl-[20px] pr-[16px] pt-[16px] rounded-[4px] top-[68px] w-[970px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#fdc700] border-[0px_0px_0px_4px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Paragraph2 />
    </div>
  );
}

function Badge6() {
  return (
    <div className="absolute bg-[#030213] h-[38px] left-0 rounded-[8px] top-0 w-[114.438px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[4px] h-[38px] items-center justify-center overflow-clip px-[17px] py-[9px] relative rounded-[inherit] w-[114.438px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white tracking-[-0.1504px] whitespace-pre">IR AL INICIO</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Badge7() {
  return (
    <div className="absolute bg-[#ffe946] h-[38px] left-[126.44px] rounded-[8px] top-0 w-[139.406px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[4px] h-[38px] items-center justify-center overflow-clip px-[17px] py-[9px] relative rounded-[inherit] w-[139.406px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#0f172b] text-[14px] text-nowrap tracking-[-0.1504px] whitespace-pre">INICIAR SESIÓN</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute h-[38px] left-0 top-[136px] w-[970px]" data-name="Container">
      <Badge6 />
      <Badge7 />
    </div>
  );
}

function Container40() {
  return (
    <div className="basis-0 grow h-[174px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[174px] relative w-full">
        <Heading1 />
        <Paragraph1 />
        <Container38 />
        <Container39 />
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex gap-[16px] h-[174px] items-start relative shrink-0 w-full" data-name="Container">
      <Icon10 />
      <Container40 />
    </div>
  );
}

function App3() {
  return (
    <div className="basis-0 bg-gradient-to-r from-[#f0fdf4] grow min-h-px min-w-px relative rounded-[14px] shrink-0 to-[#eff6ff] w-[1070px]" data-name="App">
      <div aria-hidden="true" className="absolute border-2 border-[#7bf1a8] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start pb-[2px] pt-[26px] px-[26px] relative w-[1070px]">
        <Container41 />
      </div>
    </div>
  );
}

function PrimitiveDiv1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1070px]" data-name="Primitive.div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[32px] h-full items-start relative w-[1070px]">
        <TabList />
        <App3 />
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-white h-[532px] relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[30px] h-[532px] items-start pl-[25px] pr-px py-[25px] relative w-full">
          <App2 />
          <PrimitiveDiv1 />
        </div>
      </div>
    </div>
  );
}

function CardTitle2() {
  return (
    <div className="[grid-area:1_/_1] relative shrink-0" data-name="CardTitle">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Tabla de Referencia Rápida</p>
    </div>
  );
}

function CardDescription2() {
  return (
    <div className="[grid-area:2_/_1] relative shrink-0" data-name="CardDescription">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#717182] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Resumen completo del flujo de registro</p>
    </div>
  );
}

function CardHeader1() {
  return (
    <div className="absolute box-border gap-[6px] grid grid-cols-[repeat(1,_minmax(0px,_1fr))] grid-rows-[16px_minmax(0px,_1fr)] h-[70px] left-px pb-0 pt-[24px] px-[24px] top-px w-[1118px]" data-name="CardHeader">
      <CardTitle2 />
      <CardDescription2 />
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="absolute h-[57px] left-0 top-0 w-[185.211px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-[16px] not-italic text-[16px] text-neutral-950 text-nowrap top-[15.5px] tracking-[-0.3125px] whitespace-pre">Paso</p>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="absolute h-[57px] left-[185.21px] top-0 w-[604.242px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-[16px] not-italic text-[16px] text-neutral-950 text-nowrap top-[15.5px] tracking-[-0.3125px] whitespace-pre">Descripción</p>
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="absolute h-[57px] left-[789.45px] top-0 w-[185.25px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-[16px] not-italic text-[16px] text-neutral-950 text-nowrap top-[15.5px] tracking-[-0.3125px] whitespace-pre">Datos requeridos</p>
    </div>
  );
}

function HeaderCell3() {
  return (
    <div className="absolute h-[57px] left-[974.7px] top-0 w-[95.297px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-[16px] not-italic text-[16px] text-neutral-950 text-nowrap top-[15.5px] tracking-[-0.3125px] whitespace-pre">Tiempo</p>
    </div>
  );
}

function TableRow() {
  return (
    <div className="absolute h-[57px] left-0 top-0 w-[1070px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[0px_0px_2px] border-slate-200 border-solid inset-0 pointer-events-none" />
      <HeaderCell />
      <HeaderCell1 />
      <HeaderCell2 />
      <HeaderCell3 />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="absolute h-[57px] left-0 top-0 w-[1070px]" data-name="Table Header">
      <TableRow />
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20px] relative shrink-0 w-[6.789px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[6.789px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.5px] tracking-[-0.1504px] whitespace-pre">1</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="bg-[#161618] relative rounded-[1.67772e+07px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.008px] py-0 relative size-[40px]">
        <Text />
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Primer paso</p>
    </div>
  );
}

function Container44() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#45556c] text-[12px] top-px w-[76px]">Validación de identidad</p>
    </div>
  );
}

function Container45() {
  return (
    <div className="basis-0 grow h-[52px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[52px] items-start relative w-full">
        <Container43 />
        <Container44 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[52px] items-center left-[16px] top-[23px] w-[153.211px]" data-name="Container">
      <Container42 />
      <Container45 />
    </div>
  );
}

function TableCell() {
  return (
    <div className="absolute h-[97.5px] left-0 top-0 w-[185.211px]" data-name="Table Cell">
      <Container46 />
    </div>
  );
}

function TableCell1() {
  return (
    <div className="absolute h-[97.5px] left-[185.21px] top-0 w-[604.242px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#314158] text-[14px] top-[29.5px] tracking-[-0.1504px] w-[558px]">El usuario debe ingresar sus datos de identificación personal para iniciar el proceso de registro.</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[6.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[6.453px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#0b2dce] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[27.891px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[27.891px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#314158] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">RUT</p>
      </div>
    </div>
  );
}

function ListItem() {
  return (
    <div className="content-stretch flex gap-[4px] h-[20px] items-start relative shrink-0 w-full" data-name="List Item">
      <Text1 />
      <Text2 />
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[6.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[6.453px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#0b2dce] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="basis-0 grow h-[40px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[40px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#314158] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[123px]">Número de documento Cédula</p>
      </div>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="content-stretch flex gap-[4px] h-[40px] items-start relative shrink-0 w-full" data-name="List Item">
      <Text3 />
      <Text4 />
    </div>
  );
}

function List() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[64px] items-start left-[16px] top-[17px] w-[153.25px]" data-name="List">
      <ListItem />
      <ListItem1 />
    </div>
  );
}

function TableCell2() {
  return (
    <div className="absolute h-[97.5px] left-[789.45px] top-0 w-[185.25px]" data-name="Table Cell">
      <List />
    </div>
  );
}

function Badge8() {
  return (
    <div className="absolute bg-[#eceef2] h-[22px] left-[16px] rounded-[8px] top-[39.25px] w-[61.148px]" data-name="Badge">
      <div className="h-[22px] overflow-clip relative rounded-[inherit] w-[61.148px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[9px] not-italic text-[#030213] text-[12px] text-nowrap top-[4px] whitespace-pre">1-2 min</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function TableCell3() {
  return (
    <div className="absolute h-[97.5px] left-[974.7px] top-0 w-[95.297px]" data-name="Table Cell">
      <Badge8 />
    </div>
  );
}

function TableRow1() {
  return (
    <div className="absolute h-[97.5px] left-0 top-0 w-[1070px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-slate-100 border-solid inset-0 pointer-events-none" />
      <TableCell />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[8.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[8.672px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.5px] tracking-[-0.1504px] whitespace-pre">2</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="bg-[#161618] relative rounded-[1.67772e+07px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <Text5 />
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Segundo paso</p>
    </div>
  );
}

function Container49() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#45556c] text-[12px] top-px w-[76px]">Validación de contacto</p>
    </div>
  );
}

function Container50() {
  return (
    <div className="basis-0 grow h-[52px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[52px] items-start relative w-full">
        <Container48 />
        <Container49 />
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[52px] items-center left-[16px] top-[16.5px] w-[153.211px]" data-name="Container">
      <Container47 />
      <Container50 />
    </div>
  );
}

function TableCell4() {
  return (
    <div className="absolute h-[85px] left-0 top-0 w-[185.211px]" data-name="Table Cell">
      <Container51 />
    </div>
  );
}

function TableCell5() {
  return (
    <div className="absolute h-[85px] left-[185.21px] top-0 w-[604.242px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#314158] text-[14px] top-[23px] tracking-[-0.1504px] w-[530px]">Se envía un código de verificación de 6 dígitos al correo electrónico registrado del usuario.</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[6.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[6.453px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#0b2dce] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="basis-0 grow h-[40px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[40px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#314158] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[75px]">Código de verificación</p>
      </div>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[40px] items-start left-[16px] top-[22.5px] w-[153.25px]" data-name="List Item">
      <Text6 />
      <Text7 />
    </div>
  );
}

function TableCell6() {
  return (
    <div className="absolute h-[85px] left-[789.45px] top-0 w-[185.25px]" data-name="Table Cell">
      <ListItem2 />
    </div>
  );
}

function Badge9() {
  return (
    <div className="absolute bg-[#eceef2] h-[22px] left-[16px] rounded-[8px] top-[32.75px] w-[63.078px]" data-name="Badge">
      <div className="h-[22px] overflow-clip relative rounded-[inherit] w-[63.078px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[9px] not-italic text-[#030213] text-[12px] text-nowrap top-[4px] whitespace-pre">2-3 min</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function TableCell7() {
  return (
    <div className="absolute h-[85px] left-[974.7px] top-0 w-[95.297px]" data-name="Table Cell">
      <Badge9 />
    </div>
  );
}

function TableRow2() {
  return (
    <div className="absolute h-[85px] left-0 top-[97.5px] w-[1070px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-slate-100 border-solid inset-0 pointer-events-none" />
      <TableCell4 />
      <TableCell5 />
      <TableCell6 />
      <TableCell7 />
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[9.023px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[9.023px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.5px] tracking-[-0.1504px] whitespace-pre">3</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="bg-[#161618] relative rounded-[1.67772e+07px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.008px] py-0 relative size-[40px]">
        <Text8 />
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Tercer paso</p>
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#45556c] text-[12px] top-px w-[76px]">Preguntas de seguridad</p>
    </div>
  );
}

function Container55() {
  return (
    <div className="basis-0 grow h-[52px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[52px] items-start relative w-full">
        <Container53 />
        <Container54 />
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[52px] items-center left-[16px] top-[36.5px] w-[153.211px]" data-name="Container">
      <Container52 />
      <Container55 />
    </div>
  );
}

function TableCell8() {
  return (
    <div className="absolute h-[125px] left-0 top-0 w-[185.211px]" data-name="Table Cell">
      <Container56 />
    </div>
  );
}

function TableCell9() {
  return (
    <div className="absolute h-[125px] left-[185.21px] top-0 w-[604.242px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#314158] text-[14px] top-[43px] tracking-[-0.1504px] w-[544px]">El usuario debe responder 4 preguntas de seguridad para completar la validación de identidad.</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[20px] relative shrink-0 w-[6.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[6.453px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#0b2dce] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[20px] relative shrink-0 w-[101.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[101.359px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#314158] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Pregunta 1 de 4</p>
      </div>
    </div>
  );
}

function ListItem3() {
  return (
    <div className="content-stretch flex gap-[4px] h-[20px] items-start relative shrink-0 w-full" data-name="List Item">
      <Text9 />
      <Text10 />
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[20px] relative shrink-0 w-[6.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[6.453px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#0b2dce] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[20px] relative shrink-0 w-[103.313px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[103.313px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#314158] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Pregunta 2 de 4</p>
      </div>
    </div>
  );
}

function ListItem4() {
  return (
    <div className="content-stretch flex gap-[4px] h-[20px] items-start relative shrink-0 w-full" data-name="List Item">
      <Text11 />
      <Text12 />
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[20px] relative shrink-0 w-[6.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[6.453px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#0b2dce] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[20px] relative shrink-0 w-[103.641px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[103.641px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#314158] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Pregunta 3 de 4</p>
      </div>
    </div>
  );
}

function ListItem5() {
  return (
    <div className="content-stretch flex gap-[4px] h-[20px] items-start relative shrink-0 w-full" data-name="List Item">
      <Text13 />
      <Text14 />
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[20px] relative shrink-0 w-[6.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[6.453px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#0b2dce] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[20px] relative shrink-0 w-[103.875px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[103.875px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#314158] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Pregunta 4 de 4</p>
      </div>
    </div>
  );
}

function ListItem6() {
  return (
    <div className="content-stretch flex gap-[4px] h-[20px] items-start relative shrink-0 w-full" data-name="List Item">
      <Text15 />
      <Text16 />
    </div>
  );
}

function List1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[92px] items-start left-[16px] top-[16.5px] w-[153.25px]" data-name="List">
      <ListItem3 />
      <ListItem4 />
      <ListItem5 />
      <ListItem6 />
    </div>
  );
}

function TableCell10() {
  return (
    <div className="absolute h-[125px] left-[789.45px] top-0 w-[185.25px]" data-name="Table Cell">
      <List1 />
    </div>
  );
}

function Badge10() {
  return (
    <div className="absolute bg-[#eceef2] h-[22px] left-[16px] rounded-[8px] top-[52.75px] w-[63.281px]" data-name="Badge">
      <div className="h-[22px] overflow-clip relative rounded-[inherit] w-[63.281px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[9px] not-italic text-[#030213] text-[12px] text-nowrap top-[4px] whitespace-pre">3-5 min</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function TableCell11() {
  return (
    <div className="absolute h-[125px] left-[974.7px] top-0 w-[95.297px]" data-name="Table Cell">
      <Badge10 />
    </div>
  );
}

function TableRow3() {
  return (
    <div className="absolute h-[125px] left-0 top-[182.5px] w-[1070px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-slate-100 border-solid inset-0 pointer-events-none" />
      <TableCell8 />
      <TableCell9 />
      <TableCell10 />
      <TableCell11 />
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[20px] relative shrink-0 w-[9.266px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[9.266px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.5px] tracking-[-0.1504px] whitespace-pre">4</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="bg-[#161618] relative rounded-[1.67772e+07px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <Text17 />
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Paso final</p>
    </div>
  );
}

function Container59() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#45556c] text-[12px] text-nowrap top-px whitespace-pre">Clave provisoria</p>
    </div>
  );
}

function Container60() {
  return (
    <div className="h-[36px] relative shrink-0 w-[90.086px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[36px] items-start relative w-[90.086px]">
        <Container58 />
        <Container59 />
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[40px] items-center left-[16px] top-[16.5px] w-[153.211px]" data-name="Container">
      <Container57 />
      <Container60 />
    </div>
  );
}

function TableCell12() {
  return (
    <div className="absolute h-[73px] left-0 top-0 w-[185.211px]" data-name="Table Cell">
      <Container61 />
    </div>
  );
}

function TableCell13() {
  return (
    <div className="absolute h-[73px] left-[185.21px] top-0 w-[604.242px]" data-name="Table Cell">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#314158] text-[14px] top-[17px] tracking-[-0.1504px] w-[528px]">Se genera una clave provisoria que es enviada al correo electrónico del usuario. El usuario debe cambiar esta clave dentro de las próximas 72 horas.</p>
    </div>
  );
}

function Text18() {
  return (
    <div className="absolute content-stretch flex h-[16.5px] items-start left-[16px] top-[28px] w-[149.336px]" data-name="Text">
      <p className="font-['Inter:Italic',sans-serif] font-normal italic leading-[20px] relative shrink-0 text-[#62748e] text-[14px] text-nowrap tracking-[-0.1504px] whitespace-pre">Generación automática</p>
    </div>
  );
}

function TableCell14() {
  return (
    <div className="absolute h-[73px] left-[789.45px] top-0 w-[185.25px]" data-name="Table Cell">
      <Text18 />
    </div>
  );
}

function Badge11() {
  return (
    <div className="absolute bg-[#eceef2] h-[22px] left-[16px] rounded-[8px] top-[26.75px] w-[59.039px]" data-name="Badge">
      <div className="h-[22px] overflow-clip relative rounded-[inherit] w-[59.039px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[9px] not-italic text-[#030213] text-[12px] text-nowrap top-[4px] whitespace-pre">{`< 1 min`}</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function TableCell15() {
  return (
    <div className="absolute h-[73px] left-[974.7px] top-0 w-[95.297px]" data-name="Table Cell">
      <Badge11 />
    </div>
  );
}

function TableRow4() {
  return (
    <div className="absolute bg-blue-50 h-[73px] left-0 top-[307.5px] w-[1070px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-slate-100 border-solid inset-0 pointer-events-none" />
      <TableCell12 />
      <TableCell13 />
      <TableCell14 />
      <TableCell15 />
    </div>
  );
}

function TableBody() {
  return (
    <div className="absolute h-[380.5px] left-0 top-[57px] w-[1070px]" data-name="Table Body">
      <TableRow1 />
      <TableRow2 />
      <TableRow3 />
      <TableRow4 />
    </div>
  );
}

function App4() {
  return (
    <div className="absolute h-[438px] left-[25px] overflow-clip top-[95px] w-[1070px]" data-name="App">
      <TableHeader />
      <TableBody />
    </div>
  );
}

function Card2() {
  return (
    <div className="bg-white h-[558px] relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CardHeader1 />
      <App4 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[534.16px] not-italic text-[#45556c] text-[14px] text-center top-[0.5px] tracking-[-0.1504px] translate-x-[-50%] w-[539px]">Documentación del flujo UX - SURA Investments | Última actualización: 04-11-2025</p>
    </div>
  );
}

function Container62() {
  return (
    <div className="bg-white h-[72px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-slate-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[72px] items-start pb-[2px] pt-[26px] px-[26px] relative w-full">
          <Paragraph3 />
        </div>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="h-[1783px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] h-[1783px] items-start pb-0 pt-[48px] px-[32px] relative w-full">
          <Card />
          <Card1 />
          <Card2 />
          <Container62 />
        </div>
      </div>
    </div>
  );
}

function App5() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[1963px] items-start left-0 pb-0 pt-[180px] px-0 top-0 w-[1184px]" data-name="App">
      <Container63 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="h-[36px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[90.2%_85.57%_0.75%_9.4%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 4">
          <path d={svgPaths.p2513ff00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[36px] items-start pl-0 pr-[175.977px] py-0 relative w-full">
          <Icon11 />
        </div>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex h-[36px] items-start relative shrink-0 w-full" data-name="Heading 1">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[36px] not-italic relative shrink-0 text-[30px] text-nowrap text-white tracking-[0.3955px] whitespace-pre">Diagrama de Flujo UX</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[28px] opacity-90 relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28px] left-0 not-italic text-[20px] text-nowrap text-white top-0 tracking-[-0.4492px] whitespace-pre">Hazte cliente SURA Investments</p>
    </div>
  );
}

function Container65() {
  return (
    <div className="h-[116px] relative shrink-0 w-[285.977px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-[116px] items-start relative w-[285.977px]">
        <Container64 />
        <Heading />
        <Paragraph4 />
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="absolute left-[11px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M8 10V2" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p23ad1400} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p19411800} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0.1)] grow h-[32px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-full">
        <Icon12 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[41px] not-italic text-[14px] text-nowrap text-white top-[6.5px] tracking-[-0.1504px] whitespace-pre">Exportar</p>
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="absolute left-[11px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_5_671)" id="Icon">
          <path d={svgPaths.p3397ec80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p4adfe2c} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p27a74a00} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_5_671">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] h-[32px] relative rounded-[8px] shrink-0 w-[106.898px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[106.898px]">
        <Icon13 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[41px] not-italic text-[14px] text-nowrap text-white top-[6.5px] tracking-[-0.1504px] whitespace-pre">Imprimir</p>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="h-[32px] relative shrink-0 w-[223.43px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[32px] items-start relative w-[223.43px]">
        <Button1 />
        <Button2 />
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex h-[116px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container65 />
      <Container66 />
    </div>
  );
}

function App6() {
  return (
    <div className="absolute bg-[#161618] box-border content-stretch flex flex-col h-[180px] items-start left-0 pb-0 pt-[32px] px-[32px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-0 w-[1184px]" data-name="App">
      <Container67 />
    </div>
  );
}

export default function FlujoDeDiagramaUsuario() {
  return (
    <div className="bg-white relative size-full" data-name="Flujo de Diagrama Usuario">
      <App5 />
      <App6 />
    </div>
  );
}