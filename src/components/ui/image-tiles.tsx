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
    "absolute overflow-hidden rounded-[16px]";

  return (
    <div className="relative h-[220px] w-[320px]">
      {/* Left tile — back, landscape rectangle */}
      <div
        className={`${tileBase} h-[120px] w-[180px]`}
        style={{
          zIndex: 10,
          left: "10px",
          top: "60px",
          transform: "rotate(-10deg)",
        }}
      >
        <img
          src={leftImage}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Middle tile — middle, landscape rectangle */}
      <div
        className={`${tileBase} h-[120px] w-[180px]`}
        style={{
          zIndex: 20,
          left: "70px",
          top: "40px",
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

      {/* Right tile — front, landscape rectangle */}
      <div
        className={`${tileBase} h-[120px] w-[180px]`}
        style={{
          zIndex: 30,
          left: "130px",
          top: "60px",
          transform: "rotate(10deg)",
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
