interface ImageRevealProps {
  leftImage: string;
  middleImage: string;
  rightImage: string;
  spread?: number;
}

export default function ImageReveal({
  leftImage,
  middleImage,
  rightImage,
}: ImageRevealProps) {
  const tileBase =
    "image-tile absolute overflow-hidden rounded-[12px] border border-[#DAEBFF] bg-white transition-shadow duration-300 hover:shadow-[0_20px_50px_-24px_rgba(28,60,140,0.18)]";

  return (
    <div className="relative h-[240px] w-[280px]">
      {/* Left tile — back, portrait */}
      <div
        className={`${tileBase} h-[170px] w-[120px]`}
        style={{
          zIndex: 10,
          left: "20px",
          top: "40px",
          ["--tile-rot" as string]: "-8deg",
          ["--tile-delay" as string]: "0s",
        }}
      >
        <img
          src={leftImage}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Middle tile — middle, portrait */}
      <div
        className={`${tileBase} h-[170px] w-[120px]`}
        style={{
          zIndex: 20,
          left: "80px",
          top: "30px",
          ["--tile-rot" as string]: "4deg",
          ["--tile-delay" as string]: "0.15s",
        }}
      >
        <img
          src={rightImage}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right tile — front, portrait */}
      <div
        className={`${tileBase} h-[170px] w-[120px]`}
        style={{
          zIndex: 30,
          left: "140px",
          top: "40px",
          ["--tile-rot" as string]: "8deg",
          ["--tile-delay" as string]: "0.3s",
        }}
      >
        <img
          src={middleImage}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
