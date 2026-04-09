import svgPaths from "./svg-wz5w6i9h8a";
import imgCardGif from "figma:asset/8b2d0de2ad888eef0501080acb3db66b4d75ba53.png";

function CardGif() {
  return (
    <div className="box-border content-stretch flex gap-[10px] h-[156px] items-center justify-center overflow-clip px-[128px] py-0 relative shrink-0 w-[375px]" data-name="CARD GIF">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={imgCardGif} />
        <div className="absolute bg-gradient-to-b from-[rgba(255,130,38,0.2)] inset-0 to-[rgba(255,175,83,0.2)]" />
      </div>
    </div>
  );
}

function Hs() {
  return (
    <div className="bg-gradient-to-b box-border content-stretch flex flex-col from-[#ff8226] gap-[10px] items-start mb-[-10px] relative shrink-0 to-[#ff7568] w-[375px]" data-name="HS">
      <CardGif />
    </div>
  );
}

function TypographyApp() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative rounded-[10px] shrink-0 w-full" data-name="Typography app">
      <p className="font-['Chillax:Bold',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#1f3444] text-[20px] text-nowrap tracking-[0.15px] whitespace-pre">
        <span>{`Ingresa `}</span>
        <span className="font-['Chillax:Regular',sans-serif]">{`el `}</span>
        <span className="font-['Chillax:Regular',sans-serif]">PIN</span>
        <span className="font-['Chillax:Regular',sans-serif]">{` de 4 dígitos`}</span>
      </p>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white mb-[-19px] relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full" data-name="HEADER">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-center px-[24px] py-[12px] relative w-full">
          <TypographyApp />
        </div>
      </div>
    </div>
  );
}

function Inactive() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center overflow-clip px-0 py-[8px] relative shrink-0 w-full" data-name="Inactive">
      <div className="basis-0 flex flex-col font-['Roboto:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#899db2] text-[16px] text-center tracking-[0.15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">-</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#4d6073] border-solid inset-0 pointer-events-none rounded-[4px]" />
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
    <div className="basis-0 content-stretch flex flex-col gap-[3px] grow items-start min-h-px min-w-px relative shrink-0" data-name="TextField/Outlined">
      <Input />
    </div>
  );
}

function Inputs() {
  return (
    <div className="content-stretch flex gap-[20px] items-start justify-center relative shrink-0 w-full" data-name="INPUTS">
      {[...Array(4).keys()].map((_, i) => (
        <TextFieldOutlined key={i} />
      ))}
    </div>
  );
}

function TypographyApp1() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px relative rounded-[10px] shrink-0" data-name="Typography app">
      <p className="font-['Chillax:Bold',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#1f3444] text-[16px] tracking-[0.15px] w-full">{`Ingresa el código que hemos enviado a `}</p>
    </div>
  );
}

function Instruction() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-start relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full" data-name="INSTRUCTION">
      <TypographyApp1 />
    </div>
  );
}

function TypographyApp2() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative rounded-[10px] shrink-0" data-name="Typography app">
      <p className="font-['Chillax:Bold',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#1c9996] text-[16px] tracking-[0.15px] w-full">+569 1232 1233</p>
    </div>
  );
}

function Edit() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Edit">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Edit">
          <path d={svgPaths.p28867800} fill="var(--fill-0, #1F3444)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-start min-h-px min-w-px relative shrink-0">
      <TypographyApp2 />
      <Edit />
    </div>
  );
}

function Instruction1() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-start relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full" data-name="INSTRUCTION">
      <Frame1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px relative shrink-0 w-full">
      <Instruction />
      <Instruction1 />
    </div>
  );
}

function InputPin() {
  return (
    <div className="content-stretch flex flex-col h-[112px] items-center justify-between relative shrink-0 w-full" data-name="INPUT PIN">
      <Inputs />
      <Frame />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[31.53%_56.05%_43.1%_27.73%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 22">
        <g id="Group" opacity="0.77">
          <path d={svgPaths.p3447d00} fill="var(--fill-0, white)" id="Vector_12" opacity="0.77" />
          <path d={svgPaths.p11498f80} fill="var(--fill-0, #4D6073)" id="Vector_13" opacity="0.77" />
          <path d={svgPaths.p28925800} fill="var(--fill-0, #1F3444)" id="Vector_14" opacity="0.77" />
        </g>
      </svg>
    </div>
  );
}

function FinanceECommerceStartupWorkflowAccountInformationUserProfileData() {
  return (
    <div className="absolute contents left-[17.98px] top-[1.57px]" data-name="Finance, e-commerce, startup, workflow _ account, information, user, profile, data">
      <div className="absolute inset-[1.85%_18.35%_20.77%_28.14%]" data-name="Vector">
        <div className="absolute inset-[-0.92%_-0.93%_-0.7%_-0.93%]" style={{ "--stroke-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66 67">
            <path d={svgPaths.p260a8f00} id="Vector" stroke="var(--stroke-0, #1F3444)" strokeMiterlimit="10" strokeWidth="1.20397" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[40.14%_25.05%_12.12%_21%]" data-name="Vector_2">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66 41">
            <path d={svgPaths.p3e7f9800} fill="var(--fill-0, #1F3444)" id="Vector_2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.86%_55.96%_43.15%_28.52%]" data-name="Vector_3">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 13">
          <path d={svgPaths.p1d425680} fill="var(--fill-0, #607488)" id="Vector_3" />
        </svg>
      </div>
      <div className="absolute inset-[33.69%_66.77%_60.68%_28.19%]" data-name="Vector_4">
        <div className="absolute inset-[-6.56%_-9.88%_-12.58%_-4.43%]" style={{ "--stroke-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 6">
            <path d={svgPaths.pda8595c} id="Vector_4" stroke="var(--stroke-0, #1F3444)" strokeMiterlimit="10" strokeWidth="1.20397" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[33.7%_64.42%_60.79%_31.38%]" data-name="Vector_5">
        <div className="absolute inset-[-7.02%_-11.85%_-12.87%_-9.92%]" style={{ "--stroke-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 6">
            <path d={svgPaths.p3910380} id="Vector_5" stroke="var(--stroke-0, #1F3444)" strokeMiterlimit="10" strokeWidth="1.20397" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[28.04%_54.38%_12.12%_21%]" data-name="Vector_6">
        <div className="absolute inset-[-1.18%_-1.88%_-0.43%_-2.02%]" style={{ "--stroke-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 52">
            <path d={svgPaths.p1467c380} id="Vector_6" stroke="var(--stroke-0, #1F3444)" strokeMiterlimit="10" strokeWidth="1.20397" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[28.51%_61.54%_65.97%_32.59%]" data-name="Vector_7">
        <div className="absolute inset-[-12.23%_-8.47%_-12.11%_-2.61%]" style={{ "--stroke-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 6">
            <path d={svgPaths.p136e6580} id="Vector_7" stroke="var(--stroke-0, #1F3444)" strokeMiterlimit="10" strokeWidth="1.20397" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[49.3%_34.96%_35.78%_46.07%]" data-name="Vector_8">
        <div className="absolute inset-[-4.75%_-2.62%]" style={{ "--stroke-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 14">
            <path d={svgPaths.p2b0f1780} id="Vector_8" stroke="var(--stroke-0, #1F3444)" strokeMiterlimit="10" strokeWidth="1.20397" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[38.6%_48.38%_53.52%_30.36%]" data-name="Vector_9">
        <div className="absolute inset-[-1.57%_-0.02%_-15.06%_-3.07%]" style={{ "--stroke-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 8">
            <path d={svgPaths.p153e680} id="Vector_9" stroke="var(--stroke-0, #1F3444)" strokeMiterlimit="10" strokeWidth="1.20397" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[82.97%_29.12%_12.1%_67.56%]" data-name="Vector_10">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
          <path d={svgPaths.p30ba4580} fill="var(--fill-0, #4D6073)" id="Vector_10" />
        </svg>
      </div>
      <div className="absolute inset-[56.27%_49.65%_42.85%_47.67%]" data-name="Vector_11">
        <div className="absolute inset-[-80.17%_-11.22%_-43.2%_-15.61%]" style={{ "--stroke-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 2">
            <path d={svgPaths.pec1eb40} id="Vector_11" stroke="var(--stroke-0, #1F3444)" strokeMiterlimit="10" strokeWidth="1.20397" />
          </svg>
        </div>
      </div>
      <Group />
      <div className="absolute inset-[58.68%_49.81%_40.14%_47.6%]" data-name="Vector_15">
        <div className="absolute inset-[-60.34%_-6.03%_-1.63%_-19.2%]" style={{ "--stroke-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
            <path d={svgPaths.p7f9cc00} id="Vector_15" stroke="var(--stroke-0, #1F3444)" strokeMiterlimit="10" strokeWidth="1.20397" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[58.26%_48.69%_18.22%_22.3%]" data-name="Vector_16">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 20">
          <path d={svgPaths.p80eec00} fill="var(--fill-0, white)" id="Vector_16" opacity="0.54" />
        </svg>
      </div>
      <div className="absolute inset-[53.62%_48.69%_35.75%_47.57%]" data-name="Vector_17">
        <div className="absolute inset-[-6.72%_-13.29%_-6.69%_-13.29%]" style={{ "--stroke-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 11">
            <path d={svgPaths.p656acc0} id="Vector_17" stroke="var(--stroke-0, #1F3444)" strokeMiterlimit="10" strokeWidth="1.20397" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[58.19%_48.74%_18.29%_22.25%]" data-name="Vector_18">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 20">
          <path d={svgPaths.p80eec00} fill="var(--fill-0, #607488)" id="Vector_18" />
        </svg>
      </div>
      <div className="absolute inset-[59.17%_49.81%_19.13%_23.42%]" data-name="Vector_20">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 19">
          <path d={svgPaths.p139be200} fill="var(--fill-0, #607488)" id="Vector_20" />
        </svg>
      </div>
      <div className="absolute inset-[76.23%_29.16%_12.12%_67.32%]" data-name="Vector_21">
        <div className="absolute inset-[-2.4%_-13%]" style={{ "--stroke-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 11">
            <path d={svgPaths.p38667700} id="Vector_21" stroke="var(--stroke-0, #1F3444)" strokeMiterlimit="10" strokeWidth="1.20397" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[87.88%_16%_12.12%_14.86%]" data-name="Vector_22">
        <div className="absolute bottom-[-0.6px] left-0 right-0 top-[-0.6px]" style={{ "--stroke-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 84 2">
            <path d="M83.667 0.601983H0" id="Vector_22" stroke="var(--stroke-0, #1F3444)" strokeMiterlimit="10" strokeWidth="1.20397" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[35.27%_48.7%_64.12%_49.4%]" data-name="Vector_23">
        <div className="absolute inset-[-82.01%_-18.4%_-115.67%_-19.16%]" style={{ "--stroke-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
            <path d={svgPaths.p233c06e0} id="Vector_23" stroke="var(--stroke-0, #1F3444)" strokeMiterlimit="10" strokeWidth="1.20397" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[31.53%_59.56%_52.54%_36.11%]" data-name="Vector_24">
        <div className="absolute inset-[-4.45%_-8.05%_-3.17%_-7.87%]" style={{ "--stroke-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 15">
            <path d={svgPaths.pd5874c0} id="Vector_24" stroke="var(--stroke-0, #1F3444)" strokeMiterlimit="10" strokeWidth="1.20397" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[44.28%_56.06%_43.15%_32.99%]" data-name="Vector_25">
        <div className="absolute inset-[-6.75%_-4.54%_-5.63%_-0.94%]" style={{ "--stroke-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 13">
            <path d={svgPaths.p340f1300} id="Vector_25" stroke="var(--stroke-0, #1F3444)" strokeMiterlimit="10" strokeWidth="1.20397" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[36.23%_56.04%_43.1%_27.74%]" data-name="Vector_26">
        <div className="absolute inset-[-3.35%_-3.07%_-3.43%_-3.36%]" style={{ "--stroke-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 19">
            <path d={svgPaths.p35b44d00} id="Vector_26" stroke="var(--stroke-0, #1F3444)" strokeMiterlimit="10" strokeWidth="1.20397" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.21%_41.85%_65.39%_44.73%]" data-name="Vector_27">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 13">
          <path d={svgPaths.p247c3200} fill="var(--fill-0, #4D6073)" id="Vector_27" />
        </svg>
      </div>
      <div className="absolute inset-[18.85%_41.39%_61.18%_44.64%]" data-name="Vector_28">
        <div className="absolute inset-[-3.55%_-3.56%_-3.55%_-3.76%]" style={{ "--stroke-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
            <path d={svgPaths.p2c88b880} id="Vector_28" stroke="var(--stroke-0, #1F3444)" strokeMiterlimit="10" strokeWidth="1.20397" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[31.43%_51.35%_67.29%_47.88%]" data-name="Vector_29">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 2">
            <path d={svgPaths.p10f47e00} fill="var(--fill-0, #1F3444)" id="Vector_29" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[31.3%_48.43%_67.43%_50.81%]" data-name="Vector_30">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 2">
            <path d={svgPaths.p20e133c0} fill="var(--fill-0, #1F3444)" id="Vector_30" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.88%_49.78%_66.38%_46.94%]" data-name="Vector_31">
        <div className="absolute inset-[-18.92%_-7.51%_-18.92%_-6.94%]" style={{ "--stroke-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <path d={svgPaths.p33258000} id="Vector_31" stroke="var(--stroke-0, #1F3444)" strokeMiterlimit="10" strokeWidth="1.20397" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[69.69%] left-1/2 right-[47.39%] top-[29.44%]" data-name="Vector_32">
        <div className="absolute inset-[-80.77%_-14.06%_-54.49%_-8.54%]" style={{ "--stroke-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
            <path d={svgPaths.p14f50f00} id="Vector_32" stroke="var(--stroke-0, #1F3444)" strokeMiterlimit="10" strokeWidth="1.20397" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[38.81%_41.43%_53.76%_50.74%]" data-name="Vector_33">
        <div className="absolute inset-[-1.81%_-6.36%_-9.53%_-6.36%]" style={{ "--stroke-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 8">
            <path d={svgPaths.p2a309c60} id="Vector_33" stroke="var(--stroke-0, #1F3444)" strokeMiterlimit="10" strokeWidth="1.20397" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[40.14%_48.03%_57.47%_51.62%]" data-name="Vector_34">
        <div className="absolute inset-[-6.04%_-138.4%]" style={{ "--stroke-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 3">
            <path d={svgPaths.p1a035500} id="Vector_34" stroke="var(--stroke-0, #1F3444)" strokeMiterlimit="10" strokeWidth="1.20397" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[34.03%_25.04%_18.74%_49.79%]" data-name="Vector_35">
        <div className="absolute inset-[-0.22%_-1.98%_-1.5%_-1.12%]" style={{ "--stroke-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 41">
            <path d={svgPaths.p1981b600} id="Vector_35" stroke="var(--stroke-0, #1F3444)" strokeMiterlimit="10" strokeWidth="1.20397" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[76.22%_30.89%_16.89%_54.94%]" data-name="Vector_38">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 6">
          <path d={svgPaths.p3035a742} fill="var(--fill-0, white)" id="Vector_38" />
        </svg>
      </div>
      <div className="absolute inset-[83.07%_40.89%_12.12%_53.1%]" data-name="Vector_39">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 5">
            <path d={svgPaths.pd1e6600} fill="var(--fill-0, #1F3444)" id="Vector_39" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[76.3%_28.79%_16.89%_64.9%]" data-name="Vector_40">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 6">
            <path d={svgPaths.p1f112d00} fill="var(--fill-0, #1F3444)" id="Vector_40" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[76.23%_28.79%_16.89%_54.88%]" data-name="Vector_41">
        <div className="absolute inset-[-10.29%_-3.05%]" style={{ "--stroke-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 8">
            <path d={svgPaths.p3d1c1280} id="Vector_41" stroke="var(--stroke-0, #1F3444)" strokeLinecap="square" strokeLinejoin="round" strokeWidth="1.20397" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[76.29%_32.74%_16.93%_54.9%]" data-name="Vector_42">
        <div className="absolute inset-[-10.44%_-4.02%]" style={{ "--stroke-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 7">
            <path d={svgPaths.p30b3a680} id="Vector_42" stroke="var(--stroke-0, #1F3444)" strokeLinecap="square" strokeLinejoin="round" strokeWidth="1.20397" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[83.07%_30.94%_12.12%_53.1%]" data-name="Vector_43">
        <div className="absolute inset-[-14.71%_-3.12%]" style={{ "--stroke-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 6">
            <path d={svgPaths.p3b0d6500} id="Vector_43" stroke="var(--stroke-0, #1F3444)" strokeLinecap="square" strokeLinejoin="round" strokeWidth="1.20397" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[83.07%_31.05%_12.12%_57.43%]" data-name="Vector_44">
        <div className="absolute inset-[-14.71%_-4.32%]" style={{ "--stroke-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 6">
            <path d={svgPaths.p3943cca0} id="Vector_44" stroke="var(--stroke-0, #1F3444)" strokeLinecap="square" strokeLinejoin="round" strokeWidth="1.20397" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[39.74%_76.5%_60.09%_23.43%]" data-name="Vector_54">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 1">
          <path d={svgPaths.p11220630} fill="var(--fill-0, #607488)" id="Vector_54" />
        </svg>
      </div>
      <div className="absolute inset-[42.16%_63.25%_51.36%_32.87%]" data-name="Vector_55">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 6">
          <path d={svgPaths.p447e980} fill="var(--fill-0, #4D6073)" id="Vector_55" />
        </svg>
      </div>
    </div>
  );
}

function Ilustracion() {
  return (
    <div className="h-[85px] opacity-80 relative shrink-0 w-[121px]" data-name="Ilustración">
      <div className="absolute h-[42.962px] left-[0.79px] top-[42px] w-[120px]" data-name="BG Blob">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(31, 52, 68, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 120 43">
            <path clipRule="evenodd" d={svgPaths.p2612b671} fill="var(--fill-0, #1F3444)" fillRule="evenodd" id="BG Blob" opacity="0.3" />
          </svg>
        </div>
      </div>
      <FinanceECommerceStartupWorkflowAccountInformationUserProfileData />
    </div>
  );
}

function TypographyApp3() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative rounded-[10px] shrink-0" data-name="Typography app">
      <p className="font-['Proxima_Nova:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#1f3444] text-[16px] tracking-[0.15px] w-full">¿No has recibido el código?</p>
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full" data-name="HEADER">
      <TypographyApp3 />
    </div>
  );
}

function UnstyledButton() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] items-start overflow-clip px-[11px] py-[4px] relative shrink-0" data-name="UnstyledButton">
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Proxima_Nova:Bold',sans-serif] leading-[26px] not-italic relative shrink-0 text-[#1c9996] text-[12px] text-nowrap tracking-[0.46px] underline uppercase whitespace-pre">haz click aquí y te lo reenviamos</p>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[24px] shrink-0 w-full" data-name="Button">
      <UnstyledButton />
    </div>
  );
}

function CardHelper() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex flex-col h-[191px] items-center justify-between px-0 py-[8px] relative rounded-[8px] shrink-0 w-full" data-name="CARD HELPER">
      <Ilustracion />
      <Header1 />
      <Button />
    </div>
  );
}

function CardGroup() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[24px] grow items-center mb-[-19px] min-h-px min-w-px pb-[24px] pt-[32px] px-[24px] relative shrink-0 w-[375px]" data-name="CARD GROUP">
      <InputPin />
      <CardHelper />
    </div>
  );
}

function UnstyledButton1() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] items-start overflow-clip px-[22px] py-[8px] relative shrink-0" data-name="UnstyledButton">
      <p className="font-['Proxima_Nova:Regular',sans-serif] leading-[26px] not-italic relative shrink-0 text-[#1f3444] text-[15px] text-nowrap tracking-[0.46px] uppercase whitespace-pre">CANCELAR</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[48px] relative rounded-[4px] shrink-0 w-[150px]" data-name="Button">
      <div className="box-border content-stretch flex flex-col gap-[4px] h-[48px] items-center justify-center overflow-clip px-[24px] py-0 relative rounded-[inherit] w-[150px]">
        <UnstyledButton1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#1f3444] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function UnstyledButton2() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] items-start overflow-clip px-[22px] py-[8px] relative shrink-0" data-name="UnstyledButton">
      <p className="font-['Proxima_Nova:Regular',sans-serif] leading-[26px] not-italic relative shrink-0 text-[#f7f7f7] text-[15px] text-nowrap tracking-[0.46px] uppercase whitespace-pre">avanzar</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#1f3444] box-border content-stretch flex flex-col gap-[4px] h-[48px] items-center justify-center overflow-clip px-[24px] py-0 relative rounded-[4px] shrink-0 w-[150px]" data-name="Button">
      <UnstyledButton2 />
    </div>
  );
}

function BtnCard() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[27px] h-[89px] items-center justify-center mb-[-19px] px-[24px] py-0 relative rounded-bl-[8px] rounded-br-[8px] shrink-0 w-[375px]" data-name="BTN CARD">
      <Button1 />
      <Button2 />
    </div>
  );
}

function CardSignUp() {
  return (
    <div className="basis-0 bg-white box-border content-stretch flex flex-col grow items-start mb-[-10px] min-h-px min-w-px pb-[19px] pt-0 px-0 relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-[375px]" data-name="CARD SIGN UP">
      <Header />
      <CardGroup />
      <BtnCard />
    </div>
  );
}

export default function SidebarCliente() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[10px] pt-0 px-0 relative size-full" data-name="SIDEBAR CLIENTE">
      <Hs />
      <CardSignUp />
    </div>
  );
}