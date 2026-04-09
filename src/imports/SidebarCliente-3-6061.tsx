import imgHs from "figma:asset/fa6311b2bc30bfad079b553c3eaf7a672186c7d7.png";

function Body() {
  return <div className="content-stretch flex flex-col gap-[89px] h-[174.23px] items-start justify-end shrink-0 w-full" data-name="BODY" />;
}

function Hs() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] h-[268.23px] items-start mb-[-10px] pb-[70px] pt-[24px] px-0 relative shrink-0 w-[375px]" data-name="HS">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-full left-[0.03%] max-w-none top-0 w-[114.29%]" src={imgHs} />
        </div>
        <div className="absolute bg-[rgba(28,153,150,0.2)] inset-0" />
      </div>
      <Body />
    </div>
  );
}

function TypographyApp() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative rounded-[10px] shrink-0 w-full" data-name="Typography app">
      <p className="font-['Chillax_Variable:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[20px] text-[rgba(28,153,150,0.2)] text-nowrap tracking-[0.15px] whitespace-pre">
        <span className="font-['Chillax_Variable:Bold',sans-serif] font-bold text-[#1f3444]">Hola</span>
        <span className="text-[#1f3444]"> </span>
        <span className="text-[#1c9996]">somos Karri tu app Shopper</span>
      </p>
    </div>
  );
}

function Inactive() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center overflow-clip px-0 py-[8px] relative shrink-0 w-full" data-name="Inactive">
      <div className="basis-0 flex flex-col font-['Chillax:Regular',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#1f3444] text-[16px] tracking-[0.15px]">
        <p className="leading-[24px]">Ingresa tu teléfono</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#1f3444] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start px-[12px] py-0 relative w-full">
          <Inactive />
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

function UnstyledButton() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] items-start overflow-clip px-[16px] py-[6px] relative shrink-0" data-name="UnstyledButton">
      <p className="font-['Chillax:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[14px] text-nowrap text-white tracking-[0.4px] uppercase whitespace-pre">avanzar</p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#1f3444] h-[36px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] h-[36px] items-center justify-center px-[24px] py-0 relative w-full">
          <UnstyledButton />
        </div>
      </div>
    </div>
  );
}

function CardGrioup() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Card Grioup">
      <TextFieldOutlined />
      <Button />
    </div>
  );
}

function LoginSignUpMail() {
  return (
    <div className="bg-white mb-[-19px] relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full" data-name="Login / Sign up mail">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-center px-[24px] py-[12px] relative w-full">
          <TypographyApp />
          <CardGrioup />
        </div>
      </div>
    </div>
  );
}

function TypographyApp1() {
  return (
    <div className="content-stretch flex flex-col h-[40px] items-center justify-center relative rounded-[10px] shrink-0 w-full" data-name="Typography app">
      <div className="font-['Proxima_Nova:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[#4d6073] text-[12px] text-center text-nowrap whitespace-pre">
        <p className="leading-[1.66] mb-0">
          <span className="font-['Chillax:Regular',sans-serif]">Si continúas, aceptas nuestra</span>
          <span className="font-['Chillax:Bold',sans-serif] text-[#4d6073]"> </span>
          <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Chillax:Bold',sans-serif] text-[#4d6073] underline">Política de privacidad</span>
        </p>
        <p className="leading-[1.66]">
          <span className="font-['Chillax:Regular',sans-serif]">{`y las `}</span>
          <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Chillax:Bold',sans-serif] text-[#4d6073] underline">Condiciones de uso general.</span>
        </p>
      </div>
    </div>
  );
}

function Disclaimer() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full" data-name="Disclaimer">
      <div className="bg-[#c6c6c6] h-[3px] rounded-[4px] shrink-0 w-full" />
      <TypographyApp1 />
    </div>
  );
}

function ButtonRrss() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[20px] grow items-center min-h-px min-w-px relative shrink-0 w-full" data-name="BUTTON RRSS">
      <Disclaimer />
    </div>
  );
}

function UnstyledButton1() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] items-start overflow-clip px-[11px] py-[4px] relative shrink-0" data-name="UnstyledButton">
      <p className="font-['Chillax:Bold',sans-serif] leading-[26px] not-italic relative shrink-0 text-[#203445] text-[12px] text-nowrap tracking-[0.46px] uppercase whitespace-pre">cerrar</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[24px] shrink-0 w-[70px]" data-name="Button">
      <UnstyledButton1 />
    </div>
  );
}

function CardLoginRrss() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[24px] grow items-center mb-[-19px] min-h-px min-w-px pb-[24px] pt-[32px] px-[24px] relative shrink-0 w-[375px]" data-name="Card Login RRSS">
      <ButtonRrss />
      <Button1 />
    </div>
  );
}

function CardSignUpLoigin() {
  return (
    <div className="basis-0 bg-white box-border content-stretch flex flex-col grow items-start mb-[-10px] min-h-px min-w-px pb-[19px] pt-0 px-0 relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-[375px]" data-name="CARD SIGN UP / LOIGIN">
      <LoginSignUpMail />
      <CardLoginRrss />
    </div>
  );
}

export default function SidebarCliente() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[10px] pt-0 px-0 relative size-full" data-name="SIDEBAR CLIENTE">
      <Hs />
      <CardSignUpLoigin />
    </div>
  );
}