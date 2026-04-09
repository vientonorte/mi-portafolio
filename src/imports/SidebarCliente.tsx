import svgPaths from "./svg-thwkqqswbd";
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
    <div className="bg-[#1e110d] content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <LogoKarri />
    </div>
  );
}

function Person() {
  return (
    <div className="absolute inset-[17.74%]" data-name="Person">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47 47">
        <g id="Person">
          <path d={svgPaths.p20d15f00} fill="var(--fill-0, #1C9996)" id="Vector" />
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
      <p className="font-['Chillax:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#1f3444] text-[20px] text-nowrap tracking-[0.15px] whitespace-pre">Mis notificaciones</p>
    </div>
  );
}

function TypographyApp1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="Typography app">
      <p className="font-['Chillax:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1f3444] text-[16px] text-nowrap whitespace-pre">Shopper:</p>
    </div>
  );
}

function TypographyApp2() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="Typography app">
      <p className="font-['Chillax:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1f3444] text-[16px] text-nowrap whitespace-pre">Pedro Guitierrez</p>
    </div>
  );
}

function ShoppingBasket() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="ShoppingBasket">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="ShoppingBasket">
          <path d={svgPaths.p2d02f00} fill="var(--fill-0, #1C9996)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function RowIdCuenta() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Row ID CUENTA">
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
      <div aria-hidden="true" className="absolute border-[#1f3444] border-[0px_0px_2px] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] h-[100px] items-center px-[24px] py-[14px] relative w-full">
          <AvatarConBoton />
          <DatosCliente />
        </div>
      </div>
    </div>
  );
}

function CircleNotifications() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="CircleNotifications">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="CircleNotifications">
          <path d={svgPaths.pd1f5380} fill="var(--fill-0, #1F3444)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TypographyApp3() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Typography app">
      <div className="flex flex-col font-['Chillax:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#203445] text-[16px] text-center text-nowrap">
        <p className="leading-[1.75] whitespace-pre">Novedades con tu postulación</p>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="label">
      <TypographyApp3 />
    </div>
  );
}

function ArrowForward() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="ArrowForward">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="ArrowForward">
          <path d={svgPaths.p1c78c6c0} fill="var(--fill-0, #1C9996)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function BotonesSelectCuenta() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex gap-[16px] h-[62px] items-center px-[24px] py-[15px] relative shrink-0 w-[375px]" data-name="Botones Select Cuenta">
      <div aria-hidden="true" className="absolute border-[#899db2] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <CircleNotifications />
      <Label />
      <ArrowForward />
    </div>
  );
}

function CircleNotifications1() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="CircleNotifications">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="CircleNotifications">
          <path d={svgPaths.pd1f5380} fill="var(--fill-0, #1F3444)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TypographyApp4() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Typography app">
      <div className="flex flex-col font-['Chillax:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#203445] text-[16px] text-center text-nowrap">
        <p className="leading-[1.75] whitespace-pre">Has completado tu capacitación</p>
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="label">
      <TypographyApp4 />
    </div>
  );
}

function ArrowForward1() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="ArrowForward">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="ArrowForward">
          <path d={svgPaths.p1c78c6c0} fill="var(--fill-0, #1C9996)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function BotonesSelectCuenta1() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex gap-[16px] h-[62px] items-center px-[24px] py-[15px] relative shrink-0 w-[375px]" data-name="Botones Select Cuenta">
      <div aria-hidden="true" className="absolute border-[#1f3444] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <CircleNotifications1 />
      <Label1 />
      <ArrowForward1 />
    </div>
  );
}

function CircleNotifications2() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="CircleNotifications">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="CircleNotifications">
          <path d={svgPaths.pd1f5380} fill="var(--fill-0, #1F3444)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TypographyApp5() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Typography app">
      <div className="flex flex-col font-['Chillax:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#203445] text-[16px] text-center text-nowrap">
        <p className="leading-[1.75] whitespace-pre">Problemas con tus documentos</p>
      </div>
    </div>
  );
}

function Label2() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="label">
      <TypographyApp5 />
    </div>
  );
}

function ArrowForward2() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="ArrowForward">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="ArrowForward">
          <path d={svgPaths.p1c78c6c0} fill="var(--fill-0, #1C9996)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function BotonesSelectCuenta2() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex gap-[16px] h-[62px] items-center px-[24px] py-[15px] relative shrink-0 w-[375px]" data-name="Botones Select Cuenta">
      <div aria-hidden="true" className="absolute border-[#1f3444] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <CircleNotifications2 />
      <Label2 />
      <ArrowForward2 />
    </div>
  );
}

function ListCuentas() {
  return (
    <div className="basis-0 bg-[#f7f7f7] content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="List cuentas">
      <BotonesSelectCuenta />
      <BotonesSelectCuenta1 />
      <BotonesSelectCuenta2 />
    </div>
  );
}

function UnstyledButton() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] items-start overflow-clip px-[22px] py-[8px] relative shrink-0" data-name="UnstyledButton">
      <p className="font-['Chillax:Regular',sans-serif] leading-[26px] not-italic relative shrink-0 text-[#f7f7f7] text-[15px] text-nowrap tracking-[0.46px] uppercase whitespace-pre">volver</p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#1c9996] box-border content-stretch flex flex-col gap-[4px] h-[48px] items-center justify-center overflow-clip px-[24px] py-0 relative rounded-[4px] shrink-0 w-[150px]" data-name="Button">
      <UnstyledButton />
    </div>
  );
}

function BtnCard() {
  return (
    <div className="bg-white content-stretch flex gap-[27px] h-[89px] items-center justify-center relative shrink-0 w-[375px]" data-name="BTN CARD">
      <Button />
    </div>
  );
}

export default function SidebarCliente() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="SIDEBAR CLIENTE">
      <Frame />
      <CardPerfilCliente />
      <ListCuentas />
      <BtnCard />
    </div>
  );
}