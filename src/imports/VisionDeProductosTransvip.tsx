import imgVisionDeProductosTransvip from "figma:asset/a071203af6e3a2f88489671218e31f4f1b63c06a.png";

function Footer() {
  return (
    <div className="absolute font-['Roboto:Regular',sans-serif] font-normal h-[48px] leading-[0] left-[calc(7.14%+42.86px)] text-[18px] text-white top-[calc(88.89%+28px)] w-[1560.1px]" data-name="Footer">
      <div className="absolute bottom-0 flex flex-col justify-end left-0 right-[84.74%] top-[54.17%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">rodrigo.gaete@trasnvip.cl</p>
      </div>
      <div className="absolute bottom-0 flex flex-col justify-end left-[76.19%] right-0 text-right top-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal]">Junio 2023</p>
      </div>
    </div>
  );
}

export default function VisionDeProductosTransvip() {
  return (
    <div className="relative size-full" data-name="Vision de productos  TRANSVIP">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-white inset-0" />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={imgVisionDeProductosTransvip} />
      </div>
      <p className="absolute font-['Proxima_Nova:Black',sans-serif] leading-[136px] left-[calc(7.14%+42.86px)] not-italic text-[112px] text-white top-[calc(22.22%+16px)] w-[1560px]">
        <span className="font-['Proxima_Nova:Regular',sans-serif]">{`Vision de productos `}</span>
        <span>
          <br aria-hidden="true" />
          TRANSVIP
        </span>
      </p>
      <div className="absolute font-['Proxima_Nova:Bold',sans-serif] leading-[48px] left-[calc(7.14%+42.86px)] not-italic text-[36px] text-white top-[calc(55.56%+72px)] w-[636px]">
        <p className="mb-0">Rodrigo Gaete</p>
        <p>Product Designer</p>
      </div>
      <Footer />
    </div>
  );
}