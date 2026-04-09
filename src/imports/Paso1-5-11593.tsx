import svgPaths from "./svg-3m8uceqnnw";
import imgFlags from "figma:asset/d7cad0e13be7a40071ccaec70eb93d0304f2b679.png";
import imgJoshHildRMkprNmh4NuUnsplash1 from "figma:asset/c5ab5a126dbc3ad0e19afa9c12c260710138c58f.png";
import { imgGrowthLines } from "./svg-z3dh6";

function Segments() {
  return (
    <div className="bg-[#161618] box-border content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[8px] relative rounded-bl-[8px] rounded-br-[8px] shrink-0" data-name="segments">
      <p className="font-['Sura_Sans:Negrita',sans-serif] font-bold leading-[1.5] relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">Wealth Management</p>
    </div>
  );
}

function Segments1() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[8px] relative rounded-bl-[8px] rounded-br-[8px] shrink-0" data-name="segments">
      <p className="font-['Sura_Sans:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#161618] text-[16px] text-nowrap whitespace-pre">Corporate Solutions</p>
    </div>
  );
}

function Segments2() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[8px] relative rounded-bl-[8px] rounded-br-[8px] shrink-0" data-name="segments">
      <p className="font-['Sura_Sans:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#161618] text-[16px] text-nowrap whitespace-pre">Investment Management</p>
    </div>
  );
}

function SegmentsContainer() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="segments-container">
      <Segments />
      <Segments1 />
      <Segments2 />
    </div>
  );
}

function LocationOn() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="location_on">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="location_on">
          <path d={svgPaths.p3d98ea00} fill="var(--fill-0, #161618)" id="location_on_2" />
        </g>
      </svg>
    </div>
  );
}

function QuickLinks() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[4px] relative rounded-[8px] shrink-0" data-name="quick links">
      <LocationOn />
      <p className="font-['Sura_Sans:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#161618] text-[16px] text-nowrap whitespace-pre">Sucursales</p>
    </div>
  );
}

function QuickLinksContainer() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="quick-links-container">
      <QuickLinks />
    </div>
  );
}

function Call() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="call">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="call">
          <path d={svgPaths.p33b9adc0} fill="var(--fill-0, #161618)" id="call_2" />
        </g>
      </svg>
    </div>
  );
}

function QuickLinks1() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[4px] relative rounded-[8px] shrink-0" data-name="quick links">
      <Call />
      <p className="font-['Sura_Sans:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#161618] text-[16px] text-nowrap whitespace-pre">Contáctanos</p>
    </div>
  );
}

function QuickLinksContainer1() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="quick-links-container">
      <QuickLinks1 />
    </div>
  );
}

function Flags() {
  return (
    <div className="absolute inset-[7.35%_34.38%_8.14%_5.25%]" data-name="Flags">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFlags} />
    </div>
  );
}

function Cl() {
  return (
    <div className="absolute h-[27.214px] left-[-1px] overflow-clip top-[-1px] w-[38.1px]" data-name="CL">
      <Flags />
    </div>
  );
}

function Bandera() {
  return (
    <div className="relative rounded-[100px] shrink-0 size-[24px]" data-name="Bandera">
      <div className="overflow-clip relative rounded-[inherit] size-[24px]">
        <Cl />
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[100px]" />
    </div>
  );
}

function ExpandMore() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="expand_more">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="expand_more">
          <path d={svgPaths.p247c0070} fill="var(--fill-0, #161618)" id="expand_more_2" />
        </g>
      </svg>
    </div>
  );
}

function QuickLinks2() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[4px] relative rounded-[8px] shrink-0" data-name="quick links">
      <Bandera />
      <p className="font-['Sura_Sans:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#161618] text-[16px] text-nowrap whitespace-pre">Chile</p>
      <ExpandMore />
    </div>
  );
}

function QuickLinksContainer2() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="quick-links-container">
      <QuickLinks2 />
    </div>
  );
}

function QuickLinks3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0 w-[475.333px]" data-name="quick-links">
      <QuickLinksContainer />
      <QuickLinksContainer1 />
      <QuickLinksContainer2 />
    </div>
  );
}

function PreHeader() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="pre-header">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[75px] py-0 relative w-full">
          <SegmentsContainer />
          <QuickLinks3 />
        </div>
      </div>
    </div>
  );
}

function SuraLogo() {
  return (
    <div className="h-[48px] relative shrink-0 w-[147px]" data-name="SURA logo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 147 48">
        <g id="SURA logo">
          <path d={svgPaths.paa71ae0} fill="var(--fill-0, #161618)" id="wing" />
          <path clipRule="evenodd" d={svgPaths.p108b9400} fill="var(--fill-0, #161618)" fillRule="evenodd" id="sura" />
        </g>
      </svg>
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Body">
      <p className="font-['Sura_Sans:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#161618] text-[16px] text-nowrap whitespace-pre">Invierte Asesorado</p>
    </div>
  );
}

function ExpandMore1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="expand_more">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="expand_more">
          <path d={svgPaths.p247c0070} fill="var(--fill-0, #161618)" id="expand_more_2" />
        </g>
      </svg>
    </div>
  );
}

function MenuItem() {
  return (
    <div className="box-border content-stretch flex items-center pl-[8px] pr-[4px] py-[4px] relative shrink-0" data-name="menu-item">
      <Body />
      <ExpandMore1 />
    </div>
  );
}

function Body1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Body">
      <p className="font-['Sura_Sans:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#161618] text-[16px] text-nowrap whitespace-pre">Nosotros</p>
    </div>
  );
}

function ExpandMore2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="expand_more">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="expand_more">
          <path d={svgPaths.p247c0070} fill="var(--fill-0, #161618)" id="expand_more_2" />
        </g>
      </svg>
    </div>
  );
}

function MenuItem1() {
  return (
    <div className="box-border content-stretch flex items-center pl-[8px] pr-[4px] py-[4px] relative shrink-0" data-name="menu-item">
      <Body1 />
      <ExpandMore2 />
    </div>
  );
}

function Body2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Body">
      <p className="font-['Sura_Sans:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#161618] text-[16px] text-nowrap whitespace-pre">Visión de Expertos</p>
    </div>
  );
}

function ExpandMore3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="expand_more">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="expand_more">
          <path d={svgPaths.p247c0070} fill="var(--fill-0, #161618)" id="expand_more_2" />
        </g>
      </svg>
    </div>
  );
}

function MenuItem2() {
  return (
    <div className="box-border content-stretch flex items-center pl-[8px] pr-[4px] py-[4px] relative shrink-0" data-name="menu-item">
      <Body2 />
      <ExpandMore3 />
    </div>
  );
}

function Frame() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center pl-[12px] pr-0 py-0 relative shrink-0">
      <MenuItem />
      <MenuItem1 />
      <MenuItem2 />
    </div>
  );
}

function LogoLinks() {
  return (
    <div className="content-stretch flex gap-[40px] items-center relative shrink-0" data-name="logo - links">
      <SuraLogo />
      <Frame />
    </div>
  );
}

function Others() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Others">
      <div className="flex flex-col font-['Sura_Sans:Negrita',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#161618] text-[14px] text-nowrap tracking-[0.25px] uppercase">
        <p className="leading-[1.5] whitespace-pre">hazte cliente</p>
      </div>
    </div>
  );
}

function ButtonBase() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[12px] relative rounded-[999px] shrink-0" data-name=".button-base">
      <div aria-hidden="true" className="absolute border-2 border-[#161618] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <Others />
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col h-[48px] items-center justify-center relative shrink-0" data-name="button">
      <ButtonBase />
    </div>
  );
}

function Others1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Others">
      <div className="flex flex-col font-['Sura_Sans:Negrita',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.25px] uppercase">
        <p className="leading-[1.5] whitespace-pre">ingresar</p>
      </div>
    </div>
  );
}

function ExpandMore4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="expand_more">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="expand_more">
          <path d={svgPaths.p247c0070} fill="var(--fill-0, white)" id="expand_more_2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonBase1() {
  return (
    <div className="bg-[#161618] box-border content-stretch flex gap-[8px] items-center justify-center pl-[24px] pr-[16px] py-[12px] relative rounded-[999px] shrink-0" data-name=".button-base">
      <Others1 />
      <ExpandMore4 />
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex flex-col h-[48px] items-center justify-center relative shrink-0" data-name="button">
      <ButtonBase1 />
    </div>
  );
}

function Cta() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center justify-end min-h-px min-w-px relative shrink-0" data-name="CTA">
      <Button />
      <Button1 />
    </div>
  );
}

function Container() {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0" data-name="container">
      <LogoLinks />
      <Cta />
    </div>
  );
}

function MenuNavegacionDesktop() {
  return (
    <div className="bg-white max-w-[1440px] min-w-[1200px] relative shrink-0 w-full" data-name="menu-navegacion-desktop">
      <div className="flex flex-row items-center max-w-inherit min-w-inherit size-full">
        <div className="box-border content-stretch flex gap-[56px] items-center max-w-inherit min-w-inherit pb-[24px] pt-[32px] px-[75px] relative w-full">
          <Container />
        </div>
      </div>
    </div>
  );
}

function Body3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Body">
      <div className="flex flex-col font-['Sura_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-nowrap text-white">
        <p className="leading-[1.5] whitespace-pre">INVESTMENTS</p>
      </div>
    </div>
  );
}

function DescriptorItem() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[48px] items-center px-[16px] py-[12px] relative shrink-0" data-name="descriptor-item">
      <Body3 />
    </div>
  );
}

function LineDescriptor() {
  return (
    <div className="bg-[#161618] max-w-[1440px] min-w-[1200px] relative shrink-0 w-full" data-name="line-descriptor">
      <div className="max-w-inherit min-w-inherit size-full">
        <div className="box-border content-stretch flex gap-[8px] items-start max-w-inherit min-w-inherit px-[70px] py-0 relative w-full">
          <DescriptorItem />
        </div>
      </div>
    </div>
  );
}

function HeaderComponent() {
  return (
    <div className="content-stretch flex flex-col items-start shrink-0 sticky top-0 w-full" data-name="header-component">
      <PreHeader />
      <MenuNavegacionDesktop />
      <LineDescriptor />
    </div>
  );
}

function GrowthLines() {
  return (
    <div className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[83px_-247px] mask-size-[434px_640px] relative size-full" data-name="Growth lines" style={{ maskImage: `url('${imgGrowthLines}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 563 423">
        <g id="Growth lines">
          <path d={svgPaths.p20bb2a00} fill="var(--fill-0, #24272A)" id="Vector" />
          <path d={svgPaths.p20bb2a00} fill="var(--fill-0, #161618)" fillOpacity="0.3" id="Vector_2" />
          <path d={svgPaths.p167fb100} fill="url(#paint0_linear_5_11597)" id="Vector_3" />
          <path d={svgPaths.p1d9cbf00} fill="var(--fill-0, #161618)" id="Vector_4" />
          <path d={svgPaths.p1f488080} fill="url(#paint1_linear_5_11597)" id="Vector_5" />
          <path d="M0 423L563 13.3079V0L0 423Z" fill="url(#paint2_linear_5_11597)" id="Vector_6" />
          <path d={svgPaths.p6590f00} fill="var(--fill-0, #0B2DCE)" id="Vector_7" />
          <path d={svgPaths.p201ffa00} fill="var(--fill-0, #FFE946)" id="Vector_8" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_5_11597" x1="0" x2="563" y1="324.598" y2="324.598">
            <stop stopColor="#333333" />
            <stop offset="0.31" stopColor="#222222" />
            <stop offset="0.66" stopColor="#151515" />
            <stop offset="1" stopColor="#111111" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_5_11597" x1="-18.7667" x2="-18.4539" y1="218.154" y2="218.154">
            <stop stopColor="#333333" />
            <stop offset="0.31" stopColor="#222222" />
            <stop offset="0.66" stopColor="#151515" />
            <stop offset="1" stopColor="#111111" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_5_11597" x1="0" x2="563" y1="211.5" y2="211.5">
            <stop stopColor="#5A646E" />
            <stop offset="1" stopColor="#F9F9FF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function ImgFormHazteCliente() {
  return (
    <div className="h-[640px] relative shrink-0 w-[434px]" data-name="IMG FORM HAZTE CLIENTE">
      <div className="absolute bottom-0 left-[-15.21%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[66px_0px] mask-size-[434px_640px] right-[-29.49%] top-0" data-name="josh-hild-rMkprNMH4NU-unsplash 1" style={{ maskImage: `url('${imgGrowthLines}')` }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[131.83%] left-[-31.68%] max-w-none top-[-8.07%] w-[209.32%]" src={imgJoshHildRMkprNmh4NuUnsplash1} />
        </div>
      </div>
      <div className="absolute flex inset-[38.59%_-31.4%_-25.2%_-19.12%] items-center justify-center">
        <div className="flex-none h-[423px] rotate-[15deg] w-[563px]">
          <GrowthLines />
        </div>
      </div>
    </div>
  );
}

function Title() {
  return (
    <div className="relative shrink-0 w-full" data-name="Title">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[24px] py-0 relative w-full">
          <div className="basis-0 flex flex-col font-['Sura_Sans:Seminegrita',sans-serif] font-semibold grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#161618] text-[32px]">
            <p className="leading-[1.5]">Hazte cliente SURA Investments</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardTitle() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full" data-name="CARD TITLE">
      <Title />
    </div>
  );
}

function Description() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="description">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="description">
          <path d={svgPaths.pc5dc980} fill="var(--fill-0, #161618)" id="description_2" />
        </g>
      </svg>
    </div>
  );
}

function Body4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Body">
      <p className="font-['Sura_Sans:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#161618] text-[16px] text-nowrap whitespace-pre">Datos de identificación 1 de 2</p>
    </div>
  );
}

function TabItemBase() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name=".tab-item-base">
      <div aria-hidden="true" className="absolute border-[#0b2dce] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[24px] py-[12px] relative w-full">
          <Description />
          <Body4 />
        </div>
      </div>
    </div>
  );
}

function TabBase() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[534px]" data-name=".tab-base">
      <TabItemBase />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Label">
      <div className="flex flex-col font-['Sura_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a646e] text-[14px] text-nowrap">
        <p className="leading-[1.5] whitespace-pre">RUT</p>
      </div>
    </div>
  );
}

function LabelInput() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name=".Label-input">
      <Label />
    </div>
  );
}

function Body5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Body">
      <p className="font-['Sura_Sans:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#5a646e] text-[16px] text-nowrap whitespace-pre">Ingresar</p>
    </div>
  );
}

function Placeholder() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name=".placeholder">
      <Body5 />
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#98a4ae] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[16px] py-[12px] relative w-full">
          <Placeholder />
        </div>
      </div>
    </div>
  );
}

function Caption() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Caption">
      <div className="flex flex-col font-['Sura_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a646e] text-[14px] text-nowrap">
        <p className="leading-[1.5] whitespace-pre">Sin puntos ni guión</p>
      </div>
    </div>
  );
}

function AssistiveText() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Assistive text">
      <Caption />
    </div>
  );
}

function TextFieldBase() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[109px] items-start relative shrink-0 w-full" data-name=".text-field-base">
      <LabelInput />
      <Input />
      <AssistiveText />
    </div>
  );
}

function TextField() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[255px]" data-name="Text-field">
      <TextFieldBase />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Label">
      <div className="flex flex-col font-['Sura_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a646e] text-[14px] text-nowrap">
        <p className="leading-[1.5] whitespace-pre">{`Número de serie o documento  `}</p>
      </div>
    </div>
  );
}

function Info() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="info">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="info">
          <path d={svgPaths.p1d877580} fill="var(--fill-0, #5A646E)" id="info_2" />
        </g>
      </svg>
    </div>
  );
}

function LabelInput1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name=".Label-input">
      <Label1 />
      <Info />
    </div>
  );
}

function Body6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Body">
      <p className="font-['Sura_Sans:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#5a646e] text-[16px] text-nowrap whitespace-pre">Ingresar</p>
    </div>
  );
}

function Placeholder1() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name=".placeholder">
      <Body6 />
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#98a4ae] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[16px] py-[12px] relative w-full">
          <Placeholder1 />
        </div>
      </div>
    </div>
  );
}

function Caption1() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Caption">
      <div className="flex flex-col font-['Sura_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a646e] text-[14px] text-nowrap">
        <p className="leading-[1.5] whitespace-pre">Sin puntos ni guión</p>
      </div>
    </div>
  );
}

function AssistiveText1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Assistive text">
      <Caption1 />
    </div>
  );
}

function TextFieldBase1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[109px] items-start relative shrink-0 w-full" data-name=".text-field-base">
      <LabelInput1 />
      <Input1 />
      <AssistiveText1 />
    </div>
  );
}

function TextField1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[255px]" data-name="Text-field">
      <TextFieldBase1 />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Label">
      <div className="flex flex-col font-['Sura_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a646e] text-[14px] text-nowrap">
        <p className="leading-[1.5] whitespace-pre">Nombres</p>
      </div>
    </div>
  );
}

function LabelInput2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name=".Label-input">
      <Label2 />
    </div>
  );
}

function Body7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Body">
      <p className="font-['Sura_Sans:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#5a646e] text-[16px] text-nowrap whitespace-pre">Ingresar</p>
    </div>
  );
}

function Placeholder2() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name=".placeholder">
      <Body7 />
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#98a4ae] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[16px] py-[12px] relative w-full">
          <Placeholder2 />
        </div>
      </div>
    </div>
  );
}

function Caption2() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Caption">
      <div className="flex flex-col font-['Sura_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a646e] text-[14px] text-nowrap">
        <p className="leading-[1.5] whitespace-pre">Sin puntos ni guión</p>
      </div>
    </div>
  );
}

function AssistiveText2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Assistive text">
      <Caption2 />
    </div>
  );
}

function TextFieldBase2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[109px] items-start relative shrink-0 w-full" data-name=".text-field-base">
      <LabelInput2 />
      <Input2 />
      <AssistiveText2 />
    </div>
  );
}

function TextField2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[255px]" data-name="Text-field">
      <TextFieldBase2 />
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Label">
      <div className="flex flex-col font-['Sura_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a646e] text-[14px] text-nowrap">
        <p className="leading-[1.5] whitespace-pre">Apellidos</p>
      </div>
    </div>
  );
}

function LabelInput3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name=".Label-input">
      <Label3 />
    </div>
  );
}

function Body8() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Body">
      <p className="font-['Sura_Sans:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#5a646e] text-[16px] text-nowrap whitespace-pre">Ingresar</p>
    </div>
  );
}

function Placeholder3() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name=".placeholder">
      <Body8 />
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#98a4ae] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[16px] py-[12px] relative w-full">
          <Placeholder3 />
        </div>
      </div>
    </div>
  );
}

function Caption3() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Caption">
      <div className="flex flex-col font-['Sura_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a646e] text-[14px] text-nowrap">
        <p className="leading-[1.5] whitespace-pre">Sin puntos ni guión</p>
      </div>
    </div>
  );
}

function AssistiveText3() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Assistive text">
      <Caption3 />
    </div>
  );
}

function TextFieldBase3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[109px] items-start relative shrink-0 w-full" data-name=".text-field-base">
      <LabelInput3 />
      <Input3 />
      <AssistiveText3 />
    </div>
  );
}

function TextField3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[255px]" data-name="Text-field">
      <TextFieldBase3 />
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Label">
      <div className="flex flex-col font-['Sura_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a646e] text-[14px] text-nowrap">
        <p className="leading-[1.5] whitespace-pre">Correo electrónico</p>
      </div>
    </div>
  );
}

function LabelInput4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name=".Label-input">
      <Label4 />
    </div>
  );
}

function Body9() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Body">
      <p className="font-['Sura_Sans:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#5a646e] text-[16px] text-nowrap whitespace-pre">Ingresar</p>
    </div>
  );
}

function Placeholder4() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name=".placeholder">
      <Body9 />
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#98a4ae] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[16px] py-[12px] relative w-full">
          <Placeholder4 />
        </div>
      </div>
    </div>
  );
}

function TextFieldBase4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[109px] items-start relative shrink-0 w-full" data-name=".text-field-base">
      <LabelInput4 />
      <Input4 />
    </div>
  );
}

function TextField4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[255px]" data-name="Text-field">
      <TextFieldBase4 />
    </div>
  );
}

function Label5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Label">
      <div className="flex flex-col font-['Sura_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a646e] text-[14px] text-nowrap">
        <p className="leading-[1.5] whitespace-pre">Confirmar correo electrónico</p>
      </div>
    </div>
  );
}

function LabelInput5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name=".Label-input">
      <Label5 />
    </div>
  );
}

function Body10() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Body">
      <p className="font-['Sura_Sans:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#5a646e] text-[16px] text-nowrap whitespace-pre">Ingresar</p>
    </div>
  );
}

function Placeholder5() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name=".placeholder">
      <Body10 />
    </div>
  );
}

function Input5() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#98a4ae] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[16px] py-[12px] relative w-full">
          <Placeholder5 />
        </div>
      </div>
    </div>
  );
}

function TextFieldBase5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[109px] items-start relative shrink-0 w-full" data-name=".text-field-base">
      <LabelInput5 />
      <Input5 />
    </div>
  );
}

function TextField5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[255px]" data-name="Text-field">
      <TextFieldBase5 />
    </div>
  );
}

function Label6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Label">
      <div className="flex flex-col font-['Sura_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5a646e] text-[14px] text-nowrap">
        <p className="leading-[1.5] whitespace-pre">Teléfono celular</p>
      </div>
    </div>
  );
}

function LabelInput6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name=".Label-input">
      <Label6 />
    </div>
  );
}

function Body11() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Body">
      <p className="font-['Sura_Sans:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#5a646e] text-[16px] text-nowrap whitespace-pre">+56 9</p>
    </div>
  );
}

function Placeholder6() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name=".placeholder">
      <Body11 />
    </div>
  );
}

function Input6() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#98a4ae] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[16px] py-[12px] relative w-full">
          <Placeholder6 />
        </div>
      </div>
    </div>
  );
}

function TextFieldBase6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[109px] items-start relative shrink-0 w-full" data-name=".text-field-base">
      <LabelInput6 />
      <Input6 />
    </div>
  );
}

function TextField6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[255px]" data-name="Text-field">
      <TextFieldBase6 />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p235fbc00} fill="var(--fill-0, #161618)" id="check_box_outline_blank" />
        </g>
      </svg>
    </div>
  );
}

function IconCheckboxBase() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name=".icon-checkbox-base">
      <Icon />
    </div>
  );
}

function Caption4() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Caption">
      <p className="font-['Sura_Sans:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#161618] text-[0px] text-[16px] text-nowrap whitespace-pre">
        <span>{`He leído y acepto `}</span>
        <span className="[text-underline-position:from-font] decoration-solid underline">condiciones</span>{" "}
      </p>
    </div>
  );
}

function CheckboxBase() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name=".checkbox-base">
      <IconCheckboxBase />
      <Caption4 />
    </div>
  );
}

function Checkbox() {
  return (
    <div className="content-stretch flex h-[22px] items-start relative shrink-0 w-[534px]" data-name="checkbox">
      <CheckboxBase />
    </div>
  );
}

function Others2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Others">
      <div className="flex flex-col font-['Sura_Sans:Negrita',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#161618] text-[14px] text-nowrap tracking-[0.25px] uppercase">
        <p className="leading-[1.5] whitespace-pre">CANCELAR</p>
      </div>
    </div>
  );
}

function ButtonBase2() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[12px] relative rounded-[999px] shrink-0" data-name=".button-base">
      <div aria-hidden="true" className="absolute border-2 border-[#161618] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <Others2 />
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex flex-col h-[48px] items-center justify-center relative shrink-0" data-name="button">
      <ButtonBase2 />
    </div>
  );
}

function Others3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Others">
      <div className="flex flex-col font-['Sura_Sans:Negrita',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.25px] uppercase">
        <p className="leading-[1.5] whitespace-pre">continuar</p>
      </div>
    </div>
  );
}

function ButtonBase3() {
  return (
    <div className="bg-[#161618] box-border content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[12px] relative rounded-[999px] shrink-0" data-name=".button-base">
      <Others3 />
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex flex-col h-[48px] items-center justify-center opacity-40 relative shrink-0" data-name="button">
      <ButtonBase3 />
    </div>
  );
}

function ButtonGroup() {
  return (
    <div className="content-stretch flex gap-[12px] items-end justify-end relative shrink-0 w-[528px]" data-name="BUTTON GROUP">
      <Button2 />
      <Button3 />
    </div>
  );
}

function CardForms() {
  return (
    <div className="relative shrink-0 w-full" data-name="CARD FORMS">
      <div className="size-full">
        <div className="box-border content-start flex flex-wrap gap-[24px] items-start p-[24px] relative w-full">
          <TabBase />
          <TextField />
          <TextField1 />
          <TextField2 />
          <TextField3 />
          <TextField4 />
          <TextField5 />
          <TextField6 />
          <Checkbox />
          <ButtonGroup />
        </div>
      </div>
    </div>
  );
}

function FormSignUp() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-center px-0 py-[24px] relative rounded-[8px] shadow-[0px_4px_10px_0px_rgba(36,39,42,0.12)] shrink-0 w-full" data-name="FORM SIGN UP">
      <CardTitle />
      <CardForms />
    </div>
  );
}

function CardLoginCliente() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[10px] items-center left-[144px] pl-[26px] pr-[70px] py-[56px] top-0 w-[678px]" data-name="CARD LOGIN CLIENTE">
      <FormSignUp />
    </div>
  );
}

function StepContainerBase() {
  return (
    <div className="bg-[#161618] box-border content-stretch flex gap-[10px] items-center justify-center mb-[-2px] p-[10px] relative rounded-[999px] shrink-0 size-[30px]" data-name=".step-container-base">
      <div className="flex flex-col font-['Sura_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[1.5] whitespace-pre">1</p>
      </div>
    </div>
  );
}

function VerticalLine() {
  return (
    <div className="h-[100px] mb-[-2px] relative shrink-0 w-[2px]" data-name="vertical-line">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 100">
        <g id="vertical-line">
          <line id="line" stroke="var(--stroke-0, #161618)" strokeWidth="2" x1="1" x2="1" y1="4.37114e-08" y2="100" />
        </g>
      </svg>
    </div>
  );
}

function ContainerLine() {
  return (
    <div className="box-border content-stretch flex flex-col items-center mr-[-2px] pb-[2px] pt-0 px-0 relative shrink-0" data-name="container-line">
      <StepContainerBase />
      <VerticalLine />
    </div>
  );
}

function StepWithLineBase() {
  return (
    <div className="box-border content-stretch flex items-start justify-center pl-px pr-[3px] py-px relative shrink-0" data-name=".step-with-line-base">
      <ContainerLine />
    </div>
  );
}

function ContainerDescriptionBase() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[1.5] relative shrink-0 text-[#161618] text-nowrap whitespace-pre" data-name=".container-description-base">
      <div className="font-['Sura_Sans:Negrita',sans-serif] font-bold relative shrink-0 text-[16px]">
        <p className="mb-0">{`Ingreso `}</p>
        <p>de datos</p>
      </div>
      <p className="font-['Sura_Sans:Regular',sans-serif] not-italic relative shrink-0 text-[14px]">&nbsp;</p>
    </div>
  );
}

function ContainerSteperPosition() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-start mb-[-2px] relative shrink-0 w-full" data-name=".container-steper-position">
      <StepWithLineBase />
      <ContainerDescriptionBase />
    </div>
  );
}

function StepContainerBase1() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center mb-[-2px] p-[10px] relative rounded-[999px] shrink-0 size-[30px]" data-name=".step-container-base">
      <div aria-hidden="true" className="absolute border-2 border-[#161618] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <div className="flex flex-col font-['Sura_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#161618] text-[16px] text-nowrap">
        <p className="leading-[1.5] whitespace-pre">2</p>
      </div>
    </div>
  );
}

function VerticalLine1() {
  return (
    <div className="h-[100px] mb-[-2px] relative shrink-0 w-[2px]" data-name="vertical-line">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 100">
        <g id="vertical-line">
          <line id="line" stroke="var(--stroke-0, #161618)" strokeWidth="2" x1="1" x2="1" y1="4.37114e-08" y2="100" />
        </g>
      </svg>
    </div>
  );
}

function ContainerLine1() {
  return (
    <div className="box-border content-stretch flex flex-col items-center mr-[-2px] pb-[2px] pt-0 px-0 relative shrink-0" data-name="container-line">
      <StepContainerBase1 />
      <VerticalLine1 />
    </div>
  );
}

function StepWithLineBase1() {
  return (
    <div className="box-border content-stretch flex items-start justify-center pl-px pr-[3px] py-px relative shrink-0" data-name=".step-with-line-base">
      <ContainerLine1 />
    </div>
  );
}

function ContainerDescriptionBase1() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[1.5] relative shrink-0 text-[#161618] text-nowrap whitespace-pre" data-name=".container-description-base">
      <div className="font-['Sura_Sans:Negrita',sans-serif] font-bold relative shrink-0 text-[16px]">
        <p className="mb-0">Validación</p>
        <p>de correo</p>
      </div>
      <p className="font-['Sura_Sans:Regular',sans-serif] not-italic relative shrink-0 text-[14px]">&nbsp;</p>
    </div>
  );
}

function ContainerSteperPosition1() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-start mb-[-2px] relative shrink-0 w-full" data-name=".container-steper-position">
      <StepWithLineBase1 />
      <ContainerDescriptionBase1 />
    </div>
  );
}

function StepContainerBase2() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center mb-[-2px] p-[10px] relative rounded-[999px] shrink-0 size-[30px]" data-name=".step-container-base">
      <div aria-hidden="true" className="absolute border-2 border-[#161618] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <div className="flex flex-col font-['Sura_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#161618] text-[16px] text-nowrap">
        <p className="leading-[1.5] whitespace-pre">3</p>
      </div>
    </div>
  );
}

function VerticalLine2() {
  return (
    <div className="h-[100px] mb-[-2px] relative shrink-0 w-[2px]" data-name="vertical-line">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 100">
        <g id="vertical-line">
          <line id="line" stroke="var(--stroke-0, #161618)" strokeWidth="2" x1="1" x2="1" y1="4.37114e-08" y2="100" />
        </g>
      </svg>
    </div>
  );
}

function ContainerLine2() {
  return (
    <div className="box-border content-stretch flex flex-col items-center mr-[-2px] pb-[2px] pt-0 px-0 relative shrink-0" data-name="container-line">
      <StepContainerBase2 />
      <VerticalLine2 />
    </div>
  );
}

function StepWithLineBase2() {
  return (
    <div className="box-border content-stretch flex items-start justify-center pl-px pr-[3px] py-px relative shrink-0" data-name=".step-with-line-base">
      <ContainerLine2 />
    </div>
  );
}

function ContainerDescriptionBase2() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[1.5] relative shrink-0 text-[#161618] text-nowrap whitespace-pre" data-name=".container-description-base">
      <div className="font-['Sura_Sans:Negrita',sans-serif] font-bold relative shrink-0 text-[16px]">
        <p className="mb-0">Verificación</p>
        <p>de identidad</p>
      </div>
      <p className="font-['Sura_Sans:Regular',sans-serif] not-italic relative shrink-0 text-[14px]">&nbsp;</p>
    </div>
  );
}

function ContainerSteperPosition2() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-start mb-[-2px] relative shrink-0 w-full" data-name=".container-steper-position">
      <StepWithLineBase2 />
      <ContainerDescriptionBase2 />
    </div>
  );
}

function StepContainerBase3() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center mb-[-2px] p-[10px] relative rounded-[999px] shrink-0 size-[30px]" data-name=".step-container-base">
      <div aria-hidden="true" className="absolute border-2 border-[#161618] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <div className="flex flex-col font-['Sura_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#161618] text-[16px] text-nowrap">
        <p className="leading-[1.5] whitespace-pre">4</p>
      </div>
    </div>
  );
}

function ContainerLine3() {
  return (
    <div className="box-border content-stretch flex flex-col items-center mr-[-2px] pb-[2px] pt-0 px-0 relative shrink-0" data-name="container-line">
      <StepContainerBase3 />
    </div>
  );
}

function StepWithLineBase3() {
  return (
    <div className="box-border content-stretch flex items-start justify-center pl-px pr-[3px] py-px relative shrink-0" data-name=".step-with-line-base">
      <ContainerLine3 />
    </div>
  );
}

function ContainerDescriptionBase3() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[1.5] relative shrink-0 text-[#161618] text-nowrap whitespace-pre" data-name=".container-description-base">
      <p className="font-['Sura_Sans:Negrita',sans-serif] font-bold relative shrink-0 text-[16px]">Confirmación</p>
      <p className="font-['Sura_Sans:Regular',sans-serif] not-italic relative shrink-0 text-[14px]">&nbsp;</p>
    </div>
  );
}

function ContainerSteperPosition3() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-start mb-[-2px] relative shrink-0 w-full" data-name=".container-steper-position">
      <StepWithLineBase3 />
      <ContainerDescriptionBase3 />
    </div>
  );
}

function Stepper() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[1087px] items-center left-0 pb-[122px] pt-[120px] px-0 top-0 w-[144px]" data-name="stepper">
      <ContainerSteperPosition />
      <ContainerSteperPosition1 />
      <ContainerSteperPosition2 />
      <ContainerSteperPosition3 />
    </div>
  );
}

function FormmHazteCliente() {
  return (
    <div className="h-[640px] relative shrink-0 w-[822px]" data-name="FORMM HAZTE CLIENTE">
      <CardLoginCliente />
      <Stepper />
    </div>
  );
}

function Section() {
  return (
    <div className="bg-[#eff0f0] content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="section">
      <ImgFormHazteCliente />
      <FormmHazteCliente />
    </div>
  );
}

export default function Paso() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="PASO 1">
      <HeaderComponent />
      <Section />
    </div>
  );
}