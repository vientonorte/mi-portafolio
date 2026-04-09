import img13BienvenidaApp1 from "figma:asset/deca6bc1a3a2801577b021b134a72cf71a3c5753.png";
import img181 from "figma:asset/b87e8d13e8b7c413ed8058ac4f94f3c039ee34f2.png";

function Footer() {
  return (
    <div className="absolute inset-[91.48%_9.37%_4.07%_9.38%] leading-[0] text-[#ff6900] text-[18px]" data-name="Footer">
      <div className="absolute bottom-0 flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-end left-0 right-[92.05%] top-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">Juan Cortés</p>
      </div>
      <div className="absolute bottom-0 flex flex-col font-['Proxima_Nova:Regular',sans-serif] justify-end left-[16.92%] not-italic right-[57.03%] top-0">
        <p className="leading-[normal]">UX UI Designer</p>
      </div>
      <div className="absolute bottom-0 flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-end left-[76.19%] right-0 text-right top-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">Transvip · Septiembre 2023</p>
      </div>
    </div>
  );
}

export default function Component2CabifyResumen() {
  return (
    <div className="bg-white relative size-full" data-name="2- CABIFY RESUMEN">
      <p className="absolute font-['Open_Sauce_One:Regular',sans-serif] h-[162px] leading-[32px] left-[calc(50%+12px)] not-italic text-[#333333] text-[18px] top-[calc(77.78%-12px)] tracking-[0.18px] w-[349px]">Se puede observar como aquí se corta el flujo puesto que una vez realizado el registro pide cambiar de pantalla para continuar con la postulación.</p>
      <p className="absolute font-['Open_Sauce_One:Regular',sans-serif] h-[162px] leading-[32px] left-[calc(71.43%+2.57px)] not-italic text-[#333333] text-[18px] top-[calc(77.78%-12px)] tracking-[0.18px] w-[349px]">Feedback de los estado de aprobación de los documentos del usuario, mantenerlo informado mejora la experiencia y reduce la ansiedad respecto al proceso</p>
      <div className="absolute font-['Roboto:Regular',sans-serif] font-normal h-[684px] leading-[36px] left-[calc(7.14%+42.86px)] text-[#333333] text-[24px] top-[calc(22.22%+48px)] w-[636px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="font-['Open_Sauce_One:Bold',sans-serif] mb-0 not-italic">Puntaje obtenido : 24 / 35 pts.</p>
        <p className="mb-0">&nbsp;</p>
        <p className="font-['Open_Sauce_One:Regular',sans-serif] mb-0 not-italic">De acuerdo a lo que se pudo observar, se intenta guiar lo más posible al usuario en el proceso de postulación, pero ciertas fallas como la accesibilidad y el flujo le juegan en contra. Cabe mencionar que la realización del registro inicial en el sitio web desde la app corta el flujo debido a que no redirecciona al área en donde se realiza el registro.</p>
        <p className="mb-0">&nbsp;</p>
        <p className="font-['Open_Sauce_One:Regular',sans-serif] mb-0 not-italic">En relación a lo mencionado se recomienda más allá de las pantallas necesaria el proceso de postulación y tener en cuenta la accesibilidad al momento de entregar información, con el fin de no perder el flujo del usuario.</p>
        <p className="mb-0">&nbsp;</p>
        <p className="font-['Open_Sauce_One:Bold',sans-serif] mb-0 not-italic">
          <span>{`Para ver el estudio completo `}</span>haz click aquí.
        </p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">&nbsp;</p>
        <p>&nbsp;</p>
      </div>
      <div className="absolute flex flex-col font-['Open_Sauce_One:Black',sans-serif] justify-center leading-[0] left-[calc(7.14%+42.86px)] not-italic text-[#333333] text-[72px] top-[calc(11.11%+106px)] translate-y-[-50%] w-[562px]">
        <p className="leading-[normal]">BOOSMAP</p>
      </div>
      <div className="absolute flex flex-col font-['Proxima_Nova:Regular',sans-serif] justify-center leading-[0] left-[calc(7.14%+42.86px)] not-italic text-[#9d9d9d] text-[21px] text-nowrap top-[calc(11.11%+37px)] tracking-[2.1px] translate-y-[-50%]">
        <p className="leading-[32px] whitespace-pre">BENCHMARK · APP SHOPPER</p>
      </div>
      <Footer />
      <div className="absolute h-[596px] left-[calc(50%+42px)] rounded-[8px] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] top-[calc(11.11%+64px)] w-[290px]" data-name="13. Bienvenida app 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full" src={img13BienvenidaApp1} />
      </div>
      <div className="absolute h-[596px] left-[calc(71.43%+37.57px)] rounded-[8px] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] top-[calc(11.11%+64px)] w-[290px]" data-name="18 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full" src={img181} />
      </div>
    </div>
  );
}