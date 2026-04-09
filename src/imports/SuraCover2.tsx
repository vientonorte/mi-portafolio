import suraProjectImg from "figma:asset/93f752ccf2bf3e160e29c0654ed37065e66cd03a.png";

export default function SuraCover2() {
  return (
    <div className="relative w-full h-full bg-neutral-50">
      <img 
        src={suraProjectImg} 
        alt="SURA CL Házte Cliente Sitios Público" 
        className="w-full h-full object-cover"
      />
    </div>
  );
}
