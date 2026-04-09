import svgPaths from "./svg-rypftfkhnz";
import imgKarriHorizontal1 from "figma:asset/a31e098be9118630dbd647bf5cfea93582c8f9af.png";

function LogoKarri() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="LOGO KARRI">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[24px] py-[8px] relative w-full">
          <div className="h-[32px] relative shrink-0 w-[86.486px]" data-name="karri-horizontal 1">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgKarriHorizontal1} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="bg-[#1e110d] content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="LOGO">
      <LogoKarri />
    </div>
  );
}

function Calculate() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Calculate">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Calculate">
          <path d={svgPaths.p10cfee00} fill="var(--fill-0, #1F3444)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Content() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[6px] items-center justify-center p-[8px] relative size-full">
          <Calculate />
          <p className="font-['Chillax:Medium',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[#1f3444] text-[14px] text-center tracking-[0.4px] uppercase w-[min-content]">CALCULADORA DE GANANCIAS</p>
        </div>
      </div>
    </div>
  );
}

function TabItem() {
  return (
    <div className="basis-0 bg-white content-stretch flex flex-col grow h-[88px] items-center justify-center min-h-px min-w-px relative shrink-0" data-name="TabItem">
      <Content />
      <div className="h-0 relative shrink-0 w-full" data-name="Line">
        <div className="absolute bottom-0 left-0 right-0 top-[-4px]" style={{ "--stroke-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 188 4">
            <line id="Line" stroke="var(--stroke-0, #1F3444)" strokeWidth="4" x2="187.5" y1="2" y2="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function History() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="History">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="History">
          <path d={svgPaths.p7fe8d80} fill="var(--fill-0, #1F3444)" id="Vector" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
}

function Content1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[6px] items-center justify-center p-[8px] relative size-full">
          <History />
          <div className="font-['Chillax:Medium',sans-serif] leading-[24px] min-w-full not-italic opacity-70 relative shrink-0 text-[#1f3444] text-[14px] text-center tracking-[0.4px] uppercase w-[min-content]">
            <p className="mb-0">{`ver `}</p>
            <p>mis pagos</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabItem1() {
  return (
    <div className="basis-0 bg-white content-stretch flex flex-col grow h-[88px] items-center justify-center min-h-px min-w-px relative shrink-0" data-name="TabItem">
      <Content1 />
    </div>
  );
}

function Tabs() {
  return (
    <div className="box-border content-stretch flex items-start relative shadow-[0px_4px_4px_0px_rgba(0,0,0,0.12)] shrink-0 w-[375px]" data-name="Tabs">
      <TabItem />
      <TabItem1 />
    </div>
  );
}

function TypographyApp() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative rounded-[10px] shrink-0" data-name="Typography app">
      <p className="font-['Chillax:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[12px] text-center text-white tracking-[0.15px] w-full">Simula tus ganancias futuras, explicación de uso + disclaimer simulación</p>
    </div>
  );
}

function Instruction() {
  return (
    <div className="bg-[rgba(28,153,150,0.6)] relative rounded-[8px] shrink-0 w-full" data-name="INSTRUCTION">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[8px] items-start px-[8px] py-[2px] relative w-full">
          <TypographyApp />
        </div>
      </div>
    </div>
  );
}

function Info() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full" data-name="info">
      <Instruction />
    </div>
  );
}

function LabelContainer() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] h-[2px] items-center px-[4px] py-0 relative shrink-0" data-name="Label Container">
      <div className="flex flex-col font-['Chillax:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1c9996] text-[12px] text-nowrap tracking-[0.15px]">
        <p className="leading-[12px] whitespace-pre">Ingresa KM</p>
      </div>
    </div>
  );
}

function Active() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center overflow-clip px-0 py-[7px] relative shrink-0 w-full" data-name="Active">
      <div className="basis-0 flex flex-col font-['Chillax:Regular',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.87)] tracking-[0.15px]">
        <p className="leading-[24px]">Numérico</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#1c9996] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start px-[12px] py-0 relative w-full">
          <LabelContainer />
          <Active />
        </div>
      </div>
    </div>
  );
}

function TextFieldOutlined() {
  return (
    <div className="content-stretch flex flex-col gap-[3px] items-start relative shrink-0 w-[327px]" data-name="TextField/Outlined">
      <Input />
    </div>
  );
}

function ListInput() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full" data-name="LIST INPUT">
      <TextFieldOutlined />
    </div>
  );
}

function LabelContainer1() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] h-[2px] items-center px-[4px] py-0 relative shrink-0" data-name="Label Container">
      <div className="flex flex-col font-['Chillax:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1c9996] text-[12px] text-nowrap tracking-[0.15px]">
        <p className="leading-[12px] whitespace-pre">Ingresa Cliente</p>
      </div>
    </div>
  );
}

function Active1() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center overflow-clip px-0 py-[7px] relative shrink-0 w-full" data-name="Active">
      <div className="basis-0 flex flex-col font-['Chillax:Regular',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.87)] tracking-[0.15px]">
        <p className="leading-[24px]">Suggest supermercado</p>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#1c9996] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start px-[12px] py-0 relative w-full">
          <LabelContainer1 />
          <Active1 />
        </div>
      </div>
    </div>
  );
}

function TextFieldOutlined1() {
  return (
    <div className="content-stretch flex flex-col gap-[3px] items-start relative shrink-0 w-[327px]" data-name="TextField/Outlined">
      <Input1 />
    </div>
  );
}

function ListInput1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full" data-name="LIST INPUT">
      <TextFieldOutlined1 />
    </div>
  );
}

function LabelContainer2() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] h-[2px] items-center px-[4px] py-0 relative shrink-0" data-name="Label Container">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1c9996] text-[12px] text-nowrap tracking-[0.15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[12px] whitespace-pre">Nº de pedidos</p>
      </div>
    </div>
  );
}

function Active2() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center overflow-clip px-0 py-[7px] relative shrink-0 w-full" data-name="Active">
      <div className="basis-0 flex flex-col font-['Chillax:Regular',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.87)] tracking-[0.15px]">
        <p className="leading-[24px]">Numérico</p>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#1c9996] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start px-[12px] py-0 relative w-full">
          <LabelContainer2 />
          <Active2 />
        </div>
      </div>
    </div>
  );
}

function TextFieldOutlined2() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[3px] grow items-start min-h-px min-w-px relative shrink-0" data-name="TextField/Outlined">
      <Input2 />
    </div>
  );
}

function LabelContainer3() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] h-[2px] items-center px-[4px] py-0 relative shrink-0" data-name="Label Container">
      <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1c9996] text-[12px] text-nowrap tracking-[0.15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[12px] whitespace-pre">Nº Productos (SKU)</p>
      </div>
    </div>
  );
}

function Active3() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center overflow-clip px-0 py-[7px] relative shrink-0 w-full" data-name="Active">
      <div className="basis-0 flex flex-col font-['Chillax:Regular',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.87)] tracking-[0.15px]">
        <p className="leading-[24px]">Numérico</p>
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#1c9996] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start px-[12px] py-0 relative w-full">
          <LabelContainer3 />
          <Active3 />
        </div>
      </div>
    </div>
  );
}

function TextFieldOutlined3() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[3px] grow items-start min-h-px min-w-px relative shrink-0" data-name="TextField/Outlined">
      <Input3 />
    </div>
  );
}

function Productos() {
  return (
    <div className="content-stretch flex gap-[16px] items-start justify-center relative shrink-0 w-full" data-name="Productos">
      <TextFieldOutlined2 />
      <TextFieldOutlined3 />
    </div>
  );
}

function LabelContainer4() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] h-[2px] items-center px-[4px] py-0 relative shrink-0" data-name="Label Container">
      <div className="flex flex-col font-['Chillax:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1c9996] text-[12px] text-nowrap tracking-[0.15px]">
        <p className="leading-[12px] whitespace-pre">DÍAS A TRABAJAR / MES</p>
      </div>
    </div>
  );
}

function Active4() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center overflow-clip px-0 py-[7px] relative shrink-0 w-full" data-name="Active">
      <div className="basis-0 flex flex-col font-['Chillax:Regular',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.87)] tracking-[0.15px]">
        <p className="leading-[24px]">NUMERICO</p>
      </div>
    </div>
  );
}

function Input4() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#1c9996] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start px-[12px] py-0 relative w-full">
          <LabelContainer4 />
          <Active4 />
        </div>
      </div>
    </div>
  );
}

function TextFieldOutlined4() {
  return (
    <div className="content-stretch flex flex-col gap-[3px] items-start relative shrink-0 w-[327px]" data-name="TextField/Outlined">
      <Input4 />
    </div>
  );
}

function ListInputs() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full" data-name="LIST INPUTS">
      <Info />
      <ListInput />
      <ListInput1 />
      <Productos />
      <TextFieldOutlined4 />
    </div>
  );
}

function TypographyApp1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="Typography app">
      <p className="font-['Chillax:Regular',sans-serif] leading-[1.66] not-italic relative shrink-0 text-[#1f3444] text-[12px] text-nowrap whitespace-pre">Nº Pedidos</p>
    </div>
  );
}

function Label() {
  return (
    <div className="basis-0 content-stretch flex gap-[89px] grow items-center min-h-px min-w-px relative shrink-0" data-name="LABEL">
      <TypographyApp1 />
    </div>
  );
}

function TypographyApp2() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-end justify-center min-h-px min-w-px relative shrink-0" data-name="Typography app">
      <p className="font-['Chillax:Medium',sans-serif] leading-[1.66] not-italic relative shrink-0 text-[#1f3444] text-[12px] text-nowrap whitespace-pre">$2.000</p>
    </div>
  );
}

function RowTarifas() {
  return (
    <div className="relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full" data-name="ROW TARIFAS">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[163px] items-start px-[12px] py-[2px] relative w-full">
          <Label />
          <TypographyApp2 />
        </div>
      </div>
    </div>
  );
}

function TypographyApp3() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="Typography app">
      <p className="font-['Chillax:Regular',sans-serif] leading-[1.66] not-italic relative shrink-0 text-[#1f3444] text-[12px] text-nowrap whitespace-pre">Nº Productos</p>
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex gap-[89px] items-center justify-center relative shrink-0" data-name="LABEL">
      <TypographyApp3 />
    </div>
  );
}

function Descuento() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-start min-h-px min-w-px relative shrink-0" data-name="DESCUENTO">
      <Label1 />
    </div>
  );
}

function TypographyApp4() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-end min-h-px min-w-px relative shrink-0" data-name="Typography app">
      <p className="font-['Chillax:Medium',sans-serif] leading-[1.66] not-italic relative shrink-0 text-[#1f3444] text-[12px] text-nowrap whitespace-pre">{` $2.000`}</p>
    </div>
  );
}

function Body() {
  return (
    <div className="basis-0 content-stretch flex gap-[77px] grow items-center min-h-px min-w-px relative shrink-0" data-name="BODY">
      <Descuento />
      <TypographyApp4 />
    </div>
  );
}

function RowTarifas1() {
  return (
    <div className="relative shrink-0 w-full" data-name="ROW TARIFAS">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[165px] items-start px-[12px] py-[2px] relative w-full">
          <Body />
        </div>
      </div>
    </div>
  );
}

function TypographyApp5() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="Typography app">
      <p className="font-['Chillax:Regular',sans-serif] leading-[1.66] not-italic relative shrink-0 text-[#1f3444] text-[12px] text-nowrap whitespace-pre">x</p>
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex gap-[89px] items-center justify-center relative shrink-0" data-name="LABEL">
      <TypographyApp5 />
    </div>
  );
}

function TypographyApp6() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="Typography app">
      <p className="font-['Chillax:Regular',sans-serif] leading-[1.66] not-italic relative shrink-0 text-[#1f3444] text-[12px] text-nowrap whitespace-pre">KM recorridos</p>
    </div>
  );
}

function NombreDescuento() {
  return (
    <div className="content-stretch flex gap-[89px] items-center justify-center relative shrink-0" data-name="NOMBRE DESCUENTO">
      <TypographyApp6 />
    </div>
  );
}

function Descuento1() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-start min-h-px min-w-px relative shrink-0" data-name="DESCUENTO">
      <Label2 />
      <NombreDescuento />
    </div>
  );
}

function TypographyApp7() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-end min-h-px min-w-px relative shrink-0" data-name="Typography app">
      <p className="font-['Chillax:Medium',sans-serif] leading-[1.66] not-italic relative shrink-0 text-[#1f3444] text-[12px] text-nowrap whitespace-pre">{` $2.000`}</p>
    </div>
  );
}

function Body1() {
  return (
    <div className="basis-0 content-stretch flex gap-[77px] grow items-center min-h-px min-w-px relative shrink-0" data-name="BODY">
      <Descuento1 />
      <TypographyApp7 />
    </div>
  );
}

function RowTarifas2() {
  return (
    <div className="relative shrink-0 w-full" data-name="ROW TARIFAS">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[165px] items-start px-[12px] py-[2px] relative w-full">
          <Body1 />
        </div>
      </div>
    </div>
  );
}

function TypographyApp8() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="Typography app">
      <p className="font-['Chillax:Regular',sans-serif] leading-[1.66] not-italic relative shrink-0 text-[#1f3444] text-[12px] text-nowrap whitespace-pre">Monto base</p>
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex gap-[89px] items-center justify-center relative shrink-0" data-name="LABEL">
      <TypographyApp8 />
    </div>
  );
}

function Descuento2() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-start min-h-px min-w-px relative shrink-0" data-name="DESCUENTO">
      <Label3 />
    </div>
  );
}

function TypographyApp9() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-end min-h-px min-w-px relative shrink-0" data-name="Typography app">
      <p className="font-['Chillax:Medium',sans-serif] leading-[1.66] not-italic relative shrink-0 text-[#1f3444] text-[12px] text-nowrap whitespace-pre">{` $2.000`}</p>
    </div>
  );
}

function Body2() {
  return (
    <div className="basis-0 content-stretch flex gap-[77px] grow items-center min-h-px min-w-px relative shrink-0" data-name="BODY">
      <Descuento2 />
      <TypographyApp9 />
    </div>
  );
}

function RowTarifas3() {
  return (
    <div className="relative shrink-0 w-full" data-name="ROW TARIFAS">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[165px] items-start px-[12px] py-[2px] relative w-full">
          <Body2 />
        </div>
      </div>
    </div>
  );
}

function TypographyApp10() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="Typography app">
      <p className="font-['Chillax:Medium',sans-serif] leading-[1.75] not-italic relative shrink-0 text-[#1f3444] text-[18px] text-nowrap whitespace-pre">Ganancia proyectada</p>
    </div>
  );
}

function LabelCta() {
  return (
    <div className="basis-0 content-stretch flex gap-[89px] grow items-center min-h-px min-w-px relative shrink-0" data-name="LABEL + CTA">
      <TypographyApp10 />
    </div>
  );
}

function TypographyApp11() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-end justify-center min-h-px min-w-px relative shrink-0" data-name="Typography app">
      <p className="font-['Chillax:Medium',sans-serif] leading-[1.75] not-italic relative shrink-0 text-[#1c9996] text-[18px] text-nowrap whitespace-pre">{` $4.000`}</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="basis-0 content-stretch flex gap-[101px] grow items-start min-h-px min-w-px relative shrink-0">
      <LabelCta />
      <TypographyApp11 />
    </div>
  );
}

function RowTarifas4() {
  return (
    <div className="relative rounded-bl-[8px] rounded-br-[8px] shrink-0 w-full" data-name="ROW TARIFAS">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[110px] items-center px-[12px] py-[2px] relative w-full">
          <Frame />
        </div>
      </div>
    </div>
  );
}

function CardTarifa() {
  return (
    <div className="content-stretch flex flex-col items-end justify-end relative rounded-[8px] shrink-0 w-full" data-name="CARD TARIFA">
      <div aria-hidden="true" className="absolute border border-[#1f3444] border-dashed inset-0 pointer-events-none rounded-[8px]" />
      <RowTarifas />
      <RowTarifas1 />
      <RowTarifas2 />
      <RowTarifas3 />
      <RowTarifas4 />
    </div>
  );
}

function Form() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-[327px]" data-name="FORM,">
      <ListInputs />
      <CardTarifa />
    </div>
  );
}

function TabMisPagos() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-center relative shrink-0" data-name="TAB MIS PAGOS">
      <Tabs />
      <Form />
    </div>
  );
}

function Body3() {
  return (
    <div className="basis-0 bg-[#f7f7f7] content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="body">
      <Logo />
      <TabMisPagos />
    </div>
  );
}

function UnstyledButton() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] items-start overflow-clip px-[22px] py-[8px] relative shrink-0" data-name="UnstyledButton">
      <p className="font-['Proxima_Nova:Regular',sans-serif] leading-[26px] not-italic relative shrink-0 text-[#1f3444] text-[15px] text-nowrap tracking-[0.46px] uppercase whitespace-pre">volver</p>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[48px] relative rounded-[4px] shrink-0 w-[150px]" data-name="Button">
      <div className="box-border content-stretch flex flex-col gap-[4px] h-[48px] items-center justify-center overflow-clip px-[24px] py-0 relative rounded-[inherit] w-[150px]">
        <UnstyledButton />
      </div>
      <div aria-hidden="true" className="absolute border border-[#1f3444] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function UnstyledButton1() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] items-start overflow-clip px-[22px] py-[8px] relative shrink-0" data-name="UnstyledButton">
      <p className="font-['Proxima_Nova:Regular',sans-serif] leading-[26px] not-italic relative shrink-0 text-[#f7f7f7] text-[15px] text-nowrap tracking-[0.46px] uppercase whitespace-pre">limpiar datos</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#1c9996] box-border content-stretch flex flex-col gap-[4px] h-[48px] items-center justify-center overflow-clip px-[24px] py-0 relative rounded-[4px] shrink-0 w-[150px]" data-name="Button">
      <UnstyledButton1 />
    </div>
  );
}

function BtnCard() {
  return (
    <div className="bg-white content-stretch flex gap-[27px] h-[89px] items-center justify-center relative shrink-0 w-[375px]" data-name="BTN CARD">
      <Button />
      <Button1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start relative shadow-[0px_-3px_4px_0px_rgba(0,0,0,0.12)] shrink-0 w-full">
      <BtnCard />
    </div>
  );
}

export default function MisPagos() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Mis pagos">
      <Body3 />
      <Frame1 />
    </div>
  );
}