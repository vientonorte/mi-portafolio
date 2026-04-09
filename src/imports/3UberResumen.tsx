import img6 from "figma:asset/cc2a6336d20bfd98d5c7da3861869d6cebc7e1a2.png";
import img5 from "figma:asset/f88b43537c2b32df75546b730b772752060980c3.png";

function Footer() {
  return (
    <div className="absolute font-['Roboto:Regular',sans-serif] font-normal inset-[91.48%_9.37%_4.07%_9.38%] leading-[0] text-[#ff6900] text-[18px]" data-name="Footer">
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

export default function Component3UberResumen() {
  return (
    <div className="bg-white relative size-full" data-name="3- UBER RESUMEN">
      <p className="absolute font-['Open_Sauce_One:Regular',sans-serif] leading-[32px] left-[calc(50%+12px)] not-italic text-[#333333] text-[18px] top-[calc(77.78%-12px)] tracking-[0.18px] w-[341px]">No se le muestra al usuario el estado de aprobación de los documentos, aún así se le permite continuar.</p>
      <p className="absolute font-['Open_Sauce_One:Regular',sans-serif] leading-[32px] left-[calc(71.43%+9.57px)] not-italic text-[#333333] text-[18px] top-[calc(77.78%-12px)] tracking-[0.18px] w-[341px]">Rotulación genera confusión en cuanto a donde se debe continuar con el proceso.</p>
      <div className="absolute font-['Proxima_Nova:Regular',sans-serif] h-[704px] leading-[0] left-[calc(7.14%+42.86px)] not-italic text-[#333333] text-[24px] top-[calc(22.22%+48px)] w-[636px]">
        <p className="font-['Open_Sauce_One:Bold',sans-serif] leading-[36px] mb-0">Puntaje obtenido : 25 / 35 pts.</p>
        <p className="leading-[36px] mb-0">&nbsp;</p>
        <p className="font-['Open_Sauce_One:Regular',sans-serif] leading-[36px] mb-0">Esta app acota el proceso de postulación a los pasos justos, lo que genera una mejor experiencia para el usuario, en general tiene un diseño bastante cohesivo pero presenta fallas de rotulación, faltas de feedback e interrupciones del proceso que le terminan restando valor a esto.</p>
        <p className="leading-[36px] mb-0">&nbsp;</p>
        <p className="font-['Open_Sauce_One:Regular',sans-serif] leading-[36px] mb-0">En base a esto se considera relevante la acotación del proceso de postulación así como tener en cuenta los feedback necesarios para el usuario, con tal de generar una mejor experiencia.</p>
        <p className="leading-[36px] mb-0">&nbsp;</p>
        <p className="cursor-pointer leading-[36px] underline">
          <a className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Open_Sauce_One:Bold',sans-serif]" href="https://transvipchile.atlassian.net/browse/WT2-835">
            <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-[36px] not-italic underline" href="https://transvipchile.atlassian.net/browse/WT2-835">
              Para ver el estudio completo haz click aquí
            </span>
          </a>
          <a className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Open_Sauce_One:ExtraBold',sans-serif]" href="https://transvipchile.atlassian.net/browse/WT2-835">
            <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] cursor-pointer decoration-solid leading-[36px] not-italic underline" href="https://transvipchile.atlassian.net/browse/WT2-835">
              .
            </span>
          </a>
        </p>
      </div>
      <div className="absolute flex flex-col font-['Open_Sauce_One:Black',sans-serif] justify-center leading-[0] left-[calc(7.14%+42.86px)] not-italic text-[#333333] text-[72px] top-[calc(11.11%+106px)] translate-y-[-50%] w-[562px]">
        <p className="leading-[normal]">ZUBALE</p>
      </div>
      <div className="absolute flex flex-col font-['Open_Sauce_One:Regular',sans-serif] h-[23px] justify-center leading-[0] left-[calc(7.14%+42.86px)] not-italic text-[#9d9d9d] text-[21px] top-[calc(11.11%+32.5px)] tracking-[2.1px] translate-y-[-50%] w-[642px]">
        <p className="leading-[32px]">BENCHMARK · APP SHOPPER</p>
      </div>
      <Footer />
      <div className="absolute bg-[#fffeff] h-[14px] left-[calc(57.14%+38.86px)] top-[calc(22.22%+114px)] w-[91px]" />
      <div className="absolute h-[591px] left-1/2 rounded-[8px] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] top-[calc(11.11%+61px)] w-[334px]" data-name="6">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full" src={img6} />
      </div>
      <div className="absolute h-[592px] left-[calc(71.43%-2.43px)] rounded-[8px] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] top-[calc(11.11%+61px)] w-[334px]" data-name="5">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full" src={img5} />
      </div>
    </div>
  );
}