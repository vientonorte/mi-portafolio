import img5 from "figma:asset/b39a807f5a67223b2c7c2fd9399005166e91a018.png";

function Txt() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[46px] h-full items-start not-italic pl-[40px] pr-[22px] py-[64px] relative shrink-0 text-[#f8f8f8] w-[589px]" data-name="TXT">
      <div className="font-['Chillax:Bold',sans-serif] leading-[normal] relative shrink-0 text-[92px] w-full">
        <p className="mb-0">Paleta de</p>
        <p>colores</p>
      </div>
      <p className="font-['Chillax:Light',sans-serif] leading-[48px] relative shrink-0 text-[40px] w-full">De esta inspiración entre los colores que provienen del sol y el reflejo del cuerpo que lo sostiene es que, construí una paleta de colores vibrante y moderna los cuales constituyen los pilares de la marca.</p>
    </div>
  );
}

function Swatch() {
  return (
    <div className="absolute bg-[#ffe8e9] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">17.97 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function TextColor1() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor1 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`1.17 `}</p>
    </div>
  );
}

function Swatch1() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Light</p>
      <DarkRatio />
      <WhiteRatio />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#ffe8e9</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(255, 232, 233)</p>
    </div>
  );
}

function Swatch2() {
  return (
    <div className="absolute bg-[#ffddde] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor2() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor2 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">16.65 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function TextColor3() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor3 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`1.26 `}</p>
    </div>
  );
}

function Swatch3() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch2 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Light :hover</p>
      <DarkRatio1 />
      <WhiteRatio1 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#ffddde</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(255, 221, 222)</p>
    </div>
  );
}

function Swatch4() {
  return (
    <div className="absolute bg-[#ffb9bb] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor4() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio2() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor4 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">12.91 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function TextColor5() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio2() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor5 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`1.63 `}</p>
    </div>
  );
}

function Swatch5() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch4 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Light :active</p>
      <DarkRatio2 />
      <WhiteRatio2 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#ffb9bb</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(255, 185, 187)</p>
    </div>
  );
}

function Swatch6() {
  return (
    <div className="absolute bg-[#ff1d25] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor6() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio3() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor6 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">5.45 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AA</p>
    </div>
  );
}

function TextColor7() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio3() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor7 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">3.85 AA</p>
    </div>
  );
}

function Swatch7() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch6 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Normal</p>
      <DarkRatio3 />
      <WhiteRatio3 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#ff1d25</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(255, 29, 37)</p>
    </div>
  );
}

function Swatch8() {
  return (
    <div className="absolute bg-[#e61a21] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor8() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio4() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor8 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">4.53 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AA</p>
    </div>
  );
}

function TextColor9() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio4() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor9 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">4.63 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AA</p>
    </div>
  );
}

function Swatch9() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch8 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Normal :hover</p>
      <DarkRatio4 />
      <WhiteRatio4 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#e61a21</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(230, 26, 33)</p>
    </div>
  );
}

function Swatch10() {
  return (
    <div className="absolute bg-[#cc171e] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor10() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio5() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor10 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">3.71 AA</p>
    </div>
  );
}

function TextColor11() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio5() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor11 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">5.66 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AA</p>
    </div>
  );
}

function Swatch11() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch10 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Normal :active</p>
      <DarkRatio5 />
      <WhiteRatio5 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#cc171e</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(204, 23, 30)</p>
    </div>
  );
}

function Swatch12() {
  return (
    <div className="absolute bg-[#bf161c] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor12() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio6() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor12 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">3.35 AA</p>
    </div>
  );
}

function TextColor13() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio6() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor13 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">6.27 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AA</p>
    </div>
  );
}

function Swatch13() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch12 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Dark</p>
      <DarkRatio6 />
      <WhiteRatio6 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#bf161c</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(191, 22, 28)</p>
    </div>
  );
}

function Swatch14() {
  return (
    <div className="absolute bg-[#991116] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor14() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio7() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor14 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`2.45 `}</p>
    </div>
  );
}

function TextColor15() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio7() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor15 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">8.58 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function Swatch15() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch14 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Dark :hover</p>
      <DarkRatio7 />
      <WhiteRatio7 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#991116</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(153, 17, 22)</p>
    </div>
  );
}

function Swatch16() {
  return (
    <div className="absolute bg-[#730d11] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor16() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio8() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor16 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`1.79 `}</p>
    </div>
  );
}

function TextColor17() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio8() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor17 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">11.70 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function Swatch17() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch16 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Dark :active</p>
      <DarkRatio8 />
      <WhiteRatio8 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#730d11</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(115, 13, 17)</p>
    </div>
  );
}

function Swatch18() {
  return (
    <div className="absolute bg-[#590a0d] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor18() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio9() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor18 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`1.47 `}</p>
    </div>
  );
}

function TextColor19() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio9() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor19 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">14.25 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function Swatch19() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch18 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Darker</p>
      <DarkRatio9 />
      <WhiteRatio9 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#590a0d</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(89, 10, 13)</p>
    </div>
  );
}

function Swatches() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 w-[300px]" data-name="Swatches">
      <Swatch1 />
      <Swatch3 />
      <Swatch5 />
      <Swatch7 />
      <Swatch9 />
      <Swatch11 />
      <Swatch13 />
      <Swatch15 />
      <Swatch17 />
      <Swatch19 />
    </div>
  );
}

function Red() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[16px] h-[816px] items-start overflow-clip p-[32px] relative rounded-bl-[12px] rounded-tl-[12px] shrink-0 w-[364px]" data-name="Red">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[40px] not-italic relative shrink-0 text-[24px] text-black text-nowrap whitespace-pre">Red</p>
      <Swatches />
    </div>
  );
}

function Swatch20() {
  return (
    <div className="absolute bg-[#fff4e9] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor20() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio10() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor20 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">19.37 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function TextColor21() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio10() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor21 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`1.08 `}</p>
    </div>
  );
}

function Swatch21() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch20 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Light</p>
      <DarkRatio10 />
      <WhiteRatio10 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#fff4e9</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(255, 244, 233)</p>
    </div>
  );
}

function Swatch22() {
  return (
    <div className="absolute bg-[#ffeedd] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor22() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio11() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor22 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">18.53 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function TextColor23() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio11() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor23 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`1.13 `}</p>
    </div>
  );
}

function Swatch23() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch22 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Light :hover</p>
      <DarkRatio11 />
      <WhiteRatio11 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#ffeedd</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(255, 238, 221)</p>
    </div>
  );
}

function Swatch24() {
  return (
    <div className="absolute bg-[#ffddba] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor24() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio12() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor24 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">16.30 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function TextColor25() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio12() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor25 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`1.29 `}</p>
    </div>
  );
}

function Swatch25() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch24 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Light :active</p>
      <DarkRatio12 />
      <WhiteRatio12 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#ffddba</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(255, 221, 186)</p>
    </div>
  );
}

function Swatch26() {
  return (
    <div className="absolute bg-[#ff901f] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor26() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio13() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor26 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">9.26 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function TextColor27() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio13() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor27 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`2.27 `}</p>
    </div>
  );
}

function Swatch27() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch26 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Normal</p>
      <DarkRatio13 />
      <WhiteRatio13 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#ff901f</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(255, 144, 31)</p>
    </div>
  );
}

function Swatch28() {
  return (
    <div className="absolute bg-[#e6821c] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor28() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio14() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor28 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">7.57 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function TextColor29() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio14() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor29 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`2.77 `}</p>
    </div>
  );
}

function Swatch29() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch28 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Normal :hover</p>
      <DarkRatio14 />
      <WhiteRatio14 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#e6821c</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(230, 130, 28)</p>
    </div>
  );
}

function Swatch30() {
  return (
    <div className="absolute bg-[#cc7319] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor30() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio15() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor30 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">6.03 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AA</p>
    </div>
  );
}

function TextColor31() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio15() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor31 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">3.48 AA</p>
    </div>
  );
}

function Swatch31() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch30 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Normal :active</p>
      <DarkRatio15 />
      <WhiteRatio15 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#cc7319</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(204, 115, 25)</p>
    </div>
  );
}

function Swatch32() {
  return (
    <div className="absolute bg-[#bf6c17] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor32() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio16() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor32 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">5.37 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AA</p>
    </div>
  );
}

function TextColor33() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio16() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor33 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">3.91 AA</p>
    </div>
  );
}

function Swatch33() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch32 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Dark</p>
      <DarkRatio16 />
      <WhiteRatio16 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#bf6c17</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(191, 108, 23)</p>
    </div>
  );
}

function Swatch34() {
  return (
    <div className="absolute bg-[#995613] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor34() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio17() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor34 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">3.69 AA</p>
    </div>
  );
}

function TextColor35() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio17() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor35 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">5.68 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AA</p>
    </div>
  );
}

function Swatch35() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch34 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Dark :hover</p>
      <DarkRatio17 />
      <WhiteRatio17 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#995613</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(153, 86, 19)</p>
    </div>
  );
}

function Swatch36() {
  return (
    <div className="absolute bg-[#73410e] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor36() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio18() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor36 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`2.49 `}</p>
    </div>
  );
}

function TextColor37() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio18() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor37 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">8.43 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function Swatch37() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch36 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Dark :active</p>
      <DarkRatio18 />
      <WhiteRatio18 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#73410e</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(115, 65, 14)</p>
    </div>
  );
}

function Swatch38() {
  return (
    <div className="absolute bg-[#59320b] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor38() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio19() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor38 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`1.89 `}</p>
    </div>
  );
}

function TextColor39() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio19() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor39 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">11.14 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function Swatch39() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch38 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Darker</p>
      <DarkRatio19 />
      <WhiteRatio19 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#59320b</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(89, 50, 11)</p>
    </div>
  );
}

function Swatches1() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 w-[300px]" data-name="Swatches">
      <Swatch21 />
      <Swatch23 />
      <Swatch25 />
      <Swatch27 />
      <Swatch29 />
      <Swatch31 />
      <Swatch33 />
      <Swatch35 />
      <Swatch37 />
      <Swatch39 />
    </div>
  );
}

function Orange() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[16px] h-[816px] items-start overflow-clip p-[32px] relative shrink-0 w-[364px]" data-name="Orange">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[40px] not-italic relative shrink-0 text-[24px] text-black text-nowrap whitespace-pre">Orange</p>
      <Swatches1 />
    </div>
  );
}

function Swatch40() {
  return (
    <div className="absolute bg-[#ebebeb] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor40() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio20() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor40 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">17.62 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function TextColor41() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio20() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor41 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`1.19 `}</p>
    </div>
  );
}

function Swatch41() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch40 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Light</p>
      <DarkRatio20 />
      <WhiteRatio20 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#ebebeb</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(235, 235, 235)</p>
    </div>
  );
}

function Swatch42() {
  return (
    <div className="absolute bg-[#e0e0e0] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor42() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio21() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor42 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">15.91 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function TextColor43() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio21() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor43 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`1.32 `}</p>
    </div>
  );
}

function Swatch43() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch42 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Light :hover</p>
      <DarkRatio21 />
      <WhiteRatio21 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#e0e0e0</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(224, 224, 224)</p>
    </div>
  );
}

function Swatch44() {
  return (
    <div className="absolute bg-[silver] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor44() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio22() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor44 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">11.54 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function TextColor45() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio22() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor45 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`1.82 `}</p>
    </div>
  );
}

function Swatch45() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch44 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Light :active</p>
      <DarkRatio22 />
      <WhiteRatio22 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#c0c0c0</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(192, 192, 192)</p>
    </div>
  );
}

function Swatch46() {
  return (
    <div className="absolute bg-[#333333] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor46() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio23() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor46 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`1.66 `}</p>
    </div>
  );
}

function TextColor47() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio23() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor47 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">12.63 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function Swatch47() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch46 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Normal</p>
      <DarkRatio23 />
      <WhiteRatio23 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#333333</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(51, 51, 51)</p>
    </div>
  );
}

function Swatch48() {
  return (
    <div className="absolute bg-[#2e2e2e] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor48() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio24() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor48 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`1.55 `}</p>
    </div>
  );
}

function TextColor49() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio24() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor49 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">13.58 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function Swatch49() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch48 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Normal :hover</p>
      <DarkRatio24 />
      <WhiteRatio24 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#2e2e2e</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(46, 46, 46)</p>
    </div>
  );
}

function Swatch50() {
  return (
    <div className="absolute bg-[#292929] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor50() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio25() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor50 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`1.44 `}</p>
    </div>
  );
}

function TextColor51() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio25() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor51 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">14.55 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function Swatch51() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch50 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Normal :active</p>
      <DarkRatio25 />
      <WhiteRatio25 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#292929</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(41, 41, 41)</p>
    </div>
  );
}

function Swatch52() {
  return (
    <div className="absolute bg-neutral-800 h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor52() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio26() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor52 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`1.39 `}</p>
    </div>
  );
}

function TextColor53() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio26() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor53 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">15.13 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function Swatch53() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch52 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Dark</p>
      <DarkRatio26 />
      <WhiteRatio26 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#262626</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(38, 38, 38)</p>
    </div>
  );
}

function Swatch54() {
  return (
    <div className="absolute bg-[#1f1f1f] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor54() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio27() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor54 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`1.27 `}</p>
    </div>
  );
}

function TextColor55() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio27() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor55 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">16.48 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function Swatch55() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch54 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Dark :hover</p>
      <DarkRatio27 />
      <WhiteRatio27 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#1f1f1f</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(31, 31, 31)</p>
    </div>
  );
}

function Swatch56() {
  return (
    <div className="absolute bg-neutral-900 h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor56() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio28() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor56 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`1.17 `}</p>
    </div>
  );
}

function TextColor57() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio28() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor57 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">17.93 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function Swatch57() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch56 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Dark :active</p>
      <DarkRatio28 />
      <WhiteRatio28 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#171717</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(23, 23, 23)</p>
    </div>
  );
}

function Swatch58() {
  return (
    <div className="absolute bg-[#121212] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor58() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio29() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor58 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`1.12 `}</p>
    </div>
  );
}

function TextColor59() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio29() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor59 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">18.73 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function Swatch59() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch58 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Darker</p>
      <DarkRatio29 />
      <WhiteRatio29 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#121212</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(18, 18, 18)</p>
    </div>
  );
}

function Swatches2() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 w-[300px]" data-name="Swatches">
      <Swatch41 />
      <Swatch43 />
      <Swatch45 />
      <Swatch47 />
      <Swatch49 />
      <Swatch51 />
      <Swatch53 />
      <Swatch55 />
      <Swatch57 />
      <Swatch59 />
    </div>
  );
}

function Grey() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[16px] h-[816px] items-start overflow-clip p-[32px] relative shrink-0 w-[364px]" data-name="Grey">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[40px] not-italic relative shrink-0 text-[24px] text-black text-nowrap whitespace-pre">Black</p>
      <Swatches2 />
    </div>
  );
}

function Swatch60() {
  return (
    <div className="absolute bg-[#fefefe] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor60() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio30() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor60 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">20.82 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function TextColor61() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio30() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor61 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`1.01 `}</p>
    </div>
  );
}

function Swatch61() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch60 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Light</p>
      <DarkRatio30 />
      <WhiteRatio30 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#fefefe</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(254, 254, 254)</p>
    </div>
  );
}

function Swatch62() {
  return (
    <div className="absolute bg-[#fefefe] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor62() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio31() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor62 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">20.82 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function TextColor63() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio31() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor63 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`1.01 `}</p>
    </div>
  );
}

function Swatch63() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch62 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Light :hover</p>
      <DarkRatio31 />
      <WhiteRatio31 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#fefefe</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(254, 254, 254)</p>
    </div>
  );
}

function Swatch64() {
  return (
    <div className="absolute bg-[#fdfdfd] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor64() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio32() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor64 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">20.65 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function TextColor65() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio32() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor65 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`1.02 `}</p>
    </div>
  );
}

function Swatch65() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch64 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Light :active</p>
      <DarkRatio32 />
      <WhiteRatio32 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#fdfdfd</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(253, 253, 253)</p>
    </div>
  );
}

function Swatch66() {
  return (
    <div className="absolute bg-[#f8f8f8] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor66() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio33() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor66 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">19.77 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function TextColor67() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio33() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor67 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`1.06 `}</p>
    </div>
  );
}

function Swatch67() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch66 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Normal</p>
      <DarkRatio33 />
      <WhiteRatio33 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#f8f8f8</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(248, 248, 248)</p>
    </div>
  );
}

function Swatch68() {
  return (
    <div className="absolute bg-[#dfdfdf] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor68() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio34() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor68 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">15.76 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function TextColor69() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio34() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor69 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`1.33 `}</p>
    </div>
  );
}

function Swatch69() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch68 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Normal :hover</p>
      <DarkRatio34 />
      <WhiteRatio34 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#dfdfdf</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(223, 223, 223)</p>
    </div>
  );
}

function Swatch70() {
  return (
    <div className="absolute bg-[#c6c6c6] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor70() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio35() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor70 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">12.29 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function TextColor71() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio35() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor71 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`1.71 `}</p>
    </div>
  );
}

function Swatch71() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch70 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Normal :active</p>
      <DarkRatio35 />
      <WhiteRatio35 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#c6c6c6</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(198, 198, 198)</p>
    </div>
  );
}

function Swatch72() {
  return (
    <div className="absolute bg-[#bababa] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor72() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio36() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor72 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">10.82 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function TextColor73() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio36() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor73 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`1.94 `}</p>
    </div>
  );
}

function Swatch73() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch72 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Dark</p>
      <DarkRatio36 />
      <WhiteRatio36 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#bababa</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(186, 186, 186)</p>
    </div>
  );
}

function Swatch74() {
  return (
    <div className="absolute bg-[#959595] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor74() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio37() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor74 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">7.01 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AA</p>
    </div>
  );
}

function TextColor75() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio37() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor75 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`3.00 `}</p>
    </div>
  );
}

function Swatch75() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch74 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Dark :hover</p>
      <DarkRatio37 />
      <WhiteRatio37 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#959595</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(149, 149, 149)</p>
    </div>
  );
}

function Swatch76() {
  return (
    <div className="absolute bg-[#707070] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor76() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio38() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor76 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">4.24 AA</p>
    </div>
  );
}

function TextColor77() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio38() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor77 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">4.95 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AA</p>
    </div>
  );
}

function Swatch77() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch76 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Dark :active</p>
      <DarkRatio38 />
      <WhiteRatio38 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#707070</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(112, 112, 112)</p>
    </div>
  );
}

function Swatch78() {
  return (
    <div className="absolute bg-[#575757] h-[56px] left-0 rounded-[12px] top-0 w-[160px]" data-name="Swatch">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextColor78() {
  return (
    <div className="bg-black relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function DarkRatio39() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[8px]" data-name="Dark Ratio">
      <TextColor78 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">{`2.91 `}</p>
    </div>
  );
}

function TextColor79() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[10px]" data-name="Text Color">
      <div aria-hidden="true" className="absolute border border-[#e9ebf8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function WhiteRatio39() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] box-border content-stretch flex gap-[2px] h-[14px] items-start left-[8px] overflow-clip px-[4px] py-[2px] rounded-[7px] top-[26px]" data-name="White Ratio">
      <TextColor79 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[8px] text-black text-nowrap whitespace-pre">7.23 AAA</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[10px] not-italic relative shrink-0 text-[6px] text-black text-nowrap whitespace-pre">AAA</p>
    </div>
  );
}

function Swatch79() {
  return (
    <div className="bg-white h-[56px] overflow-clip relative shrink-0 w-[300px]" data-name="Swatch">
      <Swatch78 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[176px] not-italic text-[14px] text-black text-nowrap top-[2px] whitespace-pre">Darker</p>
      <DarkRatio39 />
      <WhiteRatio39 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[22px] whitespace-pre">#575757</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[176px] not-italic text-[#8e98a8] text-[10px] text-nowrap top-[38px] whitespace-pre">rgb(87, 87, 87)</p>
    </div>
  );
}

function Swatches3() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 w-[300px]" data-name="Swatches">
      <Swatch61 />
      <Swatch63 />
      <Swatch65 />
      <Swatch67 />
      <Swatch69 />
      <Swatch71 />
      <Swatch73 />
      <Swatch75 />
      <Swatch77 />
      <Swatch79 />
    </div>
  );
}

function White() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[16px] h-[816px] items-start overflow-clip p-[32px] relative rounded-br-[12px] rounded-tr-[12px] shrink-0 w-[364px]" data-name="White">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[40px] not-italic relative shrink-0 text-[24px] text-black text-nowrap whitespace-pre">White</p>
      <Swatches3 />
    </div>
  );
}

function SistemaDeColores() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Sistema de colores">
      <Red />
      <Orange />
      <Grey />
      <White />
    </div>
  );
}

function Icons() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[128px] h-[923px] items-center justify-center left-[776px] pl-[12px] pr-0 py-[40px] rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.12)] top-[64px] w-[1539px]" data-name="ICONS">
      <SistemaDeColores />
    </div>
  );
}

function Contenedor() {
  return (
    <div className="box-border content-stretch flex gap-[112px] h-[918px] items-center px-0 py-[64px] relative shrink-0 w-[2315px]" data-name="CONTENEDOR">
      <Txt />
      <Icons />
    </div>
  );
}

function Marca() {
  return (
    <div className="h-[50px] relative shrink-0 w-full" data-name="MARCA">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] h-[50px] items-center px-[40px] py-0 relative w-full">
          <p className="font-['Chillax:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#f8f8f8] text-[36px] text-nowrap whitespace-pre">
            <span>{`Rodrigo Gaete `}</span>
            <span className="font-['Chillax:Regular',sans-serif]">BrandBook 2023</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[264px] h-[1232px] items-start justify-center left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[2315px]" data-name="BODY">
      <Contenedor />
      <Marca />
    </div>
  );
}

export default function Component() {
  return (
    <div className="relative size-full" data-name="5">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#1d1326] inset-0" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={img5} />
      </div>
      <div className="absolute bg-[#333333] h-[1556px] left-0 top-0 w-[2765px]" />
      <Body />
    </div>
  );
}