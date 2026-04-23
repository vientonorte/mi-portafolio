import img211 from "figma:asset/2ca85dae07f2e9ebad27cc29f689df7f2ff0cd05.png";
import img115 from "figma:asset/ebe0e06c4fc32f665e80315679b4b0dd7b1525f1.png";

function Footer() {
  return (
    <div className="absolute font-['Roboto:Regular',sans-serif] font-normal h-[48px] leading-[0] left-[calc(7.14%+42.86px)] text-[#ff6900] text-[18px] top-[calc(88.89%+28px)] w-[1560.1px]" data-name="Footer">
      <div className="absolute bottom-0 flex flex-col justify-end left-0 right-[73.95%] top-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">Juan Cortés</p>
      </div>
      <div className="absolute bottom-0 flex flex-col justify-end left-[16.92%] right-[57.03%] top-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">UX UI Designer</p>
      </div>
      <div className="absolute bottom-0 flex flex-col justify-end left-[76.19%] right-0 text-right top-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">Transvip · Septiembre 2023</p>
      </div>
    </div>
  );
}

export default function Component1Intro() {
  return (
    <div className="bg-white relative size-full" data-name="1 INTRO">
      <div className="absolute flex flex-col font-['Open_Sauce_One:Black',sans-serif] h-[66px] justify-center leading-[0] left-[calc(7.14%+38.86px)] not-italic text-[#333333] text-[72px] top-[calc(11.11%+93px)] translate-y-[-50%] w-[427px]">
        <p className="leading-[normal]">Benchmark</p>
      </div>
      <div className="absolute font-['Open_Sauce_One:Regular',sans-serif] h-[597px] leading-[0] left-[calc(7.14%+42.86px)] not-italic text-[#333333] text-[18px] top-[calc(22.22%+30px)] tracking-[0.18px] w-[423px]">
        <p className="leading-[36px] mb-[24px]">Descubrir buenas prácticas para mejorar la UX con el fin de aumentar la fidelización de los shoppers de Karri.</p>
        <ol className="list-decimal mb-[24px]">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[36px]">BOOSMAP - APP</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[36px]">ZUBALE - APP</span>
          </li>
        </ol>
        <p className="leading-[36px]">A continuación revisaremos los puntos más destacables del estudio.</p>
      </div>
      <Footer />
      <div className="absolute inset-[21.85%_22.55%_14.44%_60%] rounded-[8px] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]" data-name="21 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full" src={img211} />
      </div>
      <div className="absolute h-[688px] left-[calc(35.71%+16.29px)] rounded-[8px] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] top-[calc(11.11%+116px)] w-[385px]" data-name="1 15">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full" src={img115} />
      </div>
    </div>
  );
}
