function Group() {
  return (
    <div className="absolute contents left-[calc(7.14%+42.86px)] not-italic top-[calc(11.11%+21px)]">
      <div className="absolute font-['Proxima_Nova:Black',sans-serif] leading-[normal] left-[calc(7.14%+42.86px)] text-[#666565] text-[72px] top-[calc(11.11%+61px)] w-[500px]">
        <p className="mb-0">Objetivos</p>
        <p>Journey Map</p>
      </div>
      <p className="absolute font-['Proxima_Nova:Semibold',sans-serif] leading-[32px] left-[calc(7.14%+42.86px)] text-[#ff6900] text-[21px] text-nowrap top-[calc(11.11%+21px)] tracking-[2.1px] whitespace-pre">Taller Design Thinking - APP Shopper</p>
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute font-['Roboto:Regular',sans-serif] font-normal h-[48px] leading-[0] left-[calc(7.14%+42.86px)] text-[18px] top-[calc(88.89%+28px)] w-[1560.1px]" data-name="Footer">
      <div className="absolute bottom-0 flex flex-col justify-end left-0 right-[84.74%] text-[#ff6900] top-[54.17%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">rodrigo.gaete@transvip.cl</p>
      </div>
      <div className="absolute bottom-0 flex flex-col justify-end left-[76.19%] right-0 text-right text-white top-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">Agosto 2023</p>
      </div>
    </div>
  );
}

export default function Component5ViajeDelUsuario() {
  return (
    <div className="bg-white relative size-full" data-name="5 - Viaje del usuario">
      <div className="absolute flex h-[1080px] items-center justify-center right-0 top-0 w-[1178px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="bg-[#666565] h-[1080px] w-[1178px]" />
        </div>
      </div>
      <div className="absolute h-[497px] left-[calc(42.86%+47.14px)] rounded-[8px] top-[calc(50%+0.5px)] translate-y-[-50%] w-[880px]" data-name="Captura de pantalla 2023-08-23 a la(s) 11.29 1" />
      <Group />
      <div className="absolute font-['Proxima_Nova:Regular',sans-serif] h-[603px] leading-[40px] left-[calc(7.14%+42.86px)] not-italic text-[#333333] text-[24px] top-[calc(33.33%+1px)] w-[500px]">
        <p className="mb-0">
          <span className="font-['Proxima_Nova:Bold',sans-serif] not-italic">{`En la sesión 2 `}</span>como equipo
          <a className="[text-decoration-skip-ink:none] [text-underline-position:from-font] cursor-pointer decoration-solid underline" href="https://www.figma.com/file/mdWSGYqQtrZvrQhvihoEFt/Taller-Design-Thinking---Sprint-Design-Shopper?type=whiteboard&node-id=0%3A1&t=HIS50Pdhqzuvrg8K-1">
            <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-[40px]" href="https://www.figma.com/file/mdWSGYqQtrZvrQhvihoEFt/Taller-Design-Thinking---Sprint-Design-Shopper?type=whiteboard&node-id=0%3A1&t=HIS50Pdhqzuvrg8K-1">{` construimos el viaje del usuario`}</span>
          </a>
          , lo que nos permite visualizar todos los puntos de contacto, desde la conciencia de la existencia de la app hasta el proceso de fidelización.
        </p>
        <p className="mb-0">&nbsp;</p>
        <p className="mb-0">Así que documentamos todas las oportunidades de mejora en los procesos declarados, haciéndonos cargo tanto de sus necesidades, como dolores.</p>
        <p>&nbsp;</p>
      </div>
      <Footer />
    </div>
  );
}