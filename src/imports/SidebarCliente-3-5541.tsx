import svgPaths from "./svg-3575178vz8";
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

function Frame() {
  return (
    <div className="bg-[#b4b4b4] content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <LogoKarri />
    </div>
  );
}

function Person() {
  return (
    <div className="absolute inset-[17.74%]" data-name="Person">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47 47">
        <g id="Person">
          <path d={svgPaths.p85ab180} fill="var(--fill-0, #1C9996)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Avatar() {
  return (
    <div className="relative shrink-0 size-[72px]" data-name="AVATAR">
      <div className="absolute bg-white inset-0 rounded-[50px]" data-name="BG">
        <div aria-hidden="true" className="absolute border-2 border-[#4d6073] border-solid inset-0 pointer-events-none rounded-[50px]" />
      </div>
      <Person />
    </div>
  );
}

function AvatarConBoton() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Avatar con Botón">
      <Avatar />
    </div>
  );
}

function TypographyApp() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="Typography app">
      <p className="font-['Chillax:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#203445] text-[20px] text-nowrap tracking-[0.15px] whitespace-pre">Roberto Martínez</p>
    </div>
  );
}

function TypographyApp1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="Typography app">
      <p className="font-['Chillax:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#203445] text-[16px] text-nowrap whitespace-pre">Mi perfil:</p>
    </div>
  );
}

function TypographyApp2() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="Typography app">
      <p className="font-['Chillax:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1f3444] text-[16px] text-nowrap whitespace-pre">Shopper</p>
    </div>
  );
}

function ShoppingBasket() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="ShoppingBasket">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_3_5663)" id="ShoppingBasket">
          <path d={svgPaths.p1ba2a300} fill="var(--fill-0, #1C9996)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_3_5663">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function RowIdCuenta() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Row ID CUENTA">
      <TypographyApp1 />
      <TypographyApp2 />
      <ShoppingBasket />
    </div>
  );
}

function DatosCliente() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Datos Cliente">
      <TypographyApp />
      <RowIdCuenta />
    </div>
  );
}

function CardPerfilCliente() {
  return (
    <div className="bg-white h-[100px] relative rounded-[8px] shrink-0 w-full" data-name="CARD PERFIL CLIENTE">
      <div aria-hidden="true" className="absolute border-[#1c9996] border-[0px_0px_2px] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] h-[100px] items-center px-[24px] py-[14px] relative w-full">
          <AvatarConBoton />
          <DatosCliente />
        </div>
      </div>
    </div>
  );
}

function TypographyApp3() {
  return (
    <div className="content-stretch flex flex-col h-[32px] items-start justify-center relative shrink-0 w-full" data-name="Typography app">
      <div className="basis-0 flex flex-col font-['Chillax:Regular',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#203445] text-[18px] w-full">
        <p className="leading-[normal]">Mi Perfil</p>
      </div>
    </div>
  );
}

function TypographyApp4() {
  return (
    <div className="content-stretch flex flex-col h-[32px] items-start justify-center relative shrink-0 w-full" data-name="Typography app">
      <div className="basis-0 flex flex-col font-['Chillax:Regular',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#203445] text-[18px] w-full">
        <p className="leading-[normal]">Mis Notificaciones</p>
      </div>
    </div>
  );
}

function TypographyApp5() {
  return (
    <div className="content-stretch flex flex-col h-[32px] items-start justify-center relative shrink-0 w-full" data-name="Typography app">
      <div className="basis-0 flex flex-col font-['Chillax:Regular',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#203445] text-[18px] w-full">
        <p className="leading-[normal]">Mis Pagos</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[16px] items-start pb-[24px] pt-0 px-0 relative shrink-0 w-full" data-name="LINK">
      <div aria-hidden="true" className="absolute border-[#4d6073] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TypographyApp3 />
      <TypographyApp4 />
      <TypographyApp5 />
    </div>
  );
}

function TypographyApp6() {
  return (
    <div className="content-stretch flex flex-col h-[32px] items-start justify-center relative shrink-0 w-full" data-name="Typography app">
      <div className="basis-0 flex flex-col font-['Chillax:Regular',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#1f3444] text-[18px] w-full">
        <p className="leading-[normal]">Mis capacitaciones</p>
      </div>
    </div>
  );
}

function TypographyApp7() {
  return (
    <div className="content-stretch flex flex-col h-[32px] items-start justify-center relative shrink-0 w-full" data-name="Typography app">
      <div className="basis-0 flex flex-col font-['Chillax:Regular',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#1c9996] text-[18px] w-full">
        <p className="leading-[normal]">Preguntas Frecuentes</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[135.5px] items-start relative shrink-0 w-full">
      <TypographyApp6 />
      <TypographyApp7 />
    </div>
  );
}

function Logout() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Logout">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Logout">
          <path d={svgPaths.pa05ef80} fill="var(--fill-0, #1F3444)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TypographyApp8() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="Typography app">
      <p className="font-['Chillax:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1f3444] text-[18px] text-nowrap whitespace-pre">Cerrar sesión</p>
    </div>
  );
}

function BtnLogOut() {
  return (
    <div className="content-stretch flex gap-[12px] h-[32px] items-center relative shrink-0 w-full" data-name="BTN LOG OUT">
      <Logout />
      <TypographyApp8 />
    </div>
  );
}

function LinksSeundarios() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-between min-h-px min-w-px relative shrink-0 w-full" data-name="LINKS SEUNDARIOS">
      <Frame1 />
      <BtnLogOut />
    </div>
  );
}

function LinksSidebar() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow min-h-px min-w-px relative shrink-0 w-full" data-name="LINKS SIDEBAR">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] items-start px-[24px] py-[32px] relative size-full">
          <Link />
          <LinksSeundarios />
        </div>
      </div>
    </div>
  );
}

export default function SidebarCliente() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="SIDEBAR CLIENTE">
      <Frame />
      <CardPerfilCliente />
      <LinksSidebar />
    </div>
  );
}