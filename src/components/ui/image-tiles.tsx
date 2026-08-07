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
    "absolute overflow-hidden rounded-[16px] border-2 border-[#88C1FF]";

  return (
    <div className="relative h-[240px] w-[280px]">
      {/* Left tile — back, portrait */}
      <div
        className={`${tileBase} h-[170px] w-[120px]`}
        style={{
          zIndex: 10,
          left: "20px",
          top: "40px",
          transform: "rotate(-8deg)",
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
          transform: "rotate(4deg)",
        }}
      >
        <img
          src={middleImage}
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
          transform: "rotate(8deg)",
        }}
      >
        <img
          src={rightImage}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
