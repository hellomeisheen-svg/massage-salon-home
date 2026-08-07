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
    "absolute overflow-hidden bg-white p-2";

  return (
    <div className="relative h-[230px] w-[320px]">
      {/* Left tile — back, portrait, leaning left */}
      <div
        className={`${tileBase} h-[170px] w-[130px] rounded-[20px]`}
        style={{
          zIndex: 10,
          left: "10px",
          top: "30px",
          transform: "rotate(-12deg)",
        }}
      >
        <img
          src={leftImage}
          alt=""
          loading="lazy"
          className="h-full w-full rounded-[12px] object-cover"
        />
      </div>

      {/* Middle tile — middle, portrait, leaning right */}
      <div
        className={`${tileBase} h-[170px] w-[130px] rounded-[20px]`}
        style={{
          zIndex: 20,
          left: "90px",
          top: "20px",
          transform: "rotate(6deg)",
        }}
      >
        <img
          src={middleImage}
          alt=""
          loading="lazy"
          className="h-full w-full rounded-[12px] object-cover"
        />
      </div>

      {/* Right tile — front, landscape, leaning right */}
      <div
        className={`${tileBase} h-[130px] w-[190px] rounded-[20px]`}
        style={{
          zIndex: 30,
          left: "130px",
          top: "50px",
          transform: "rotate(8deg)",
        }}
      >
        <img
          src={rightImage}
          alt=""
          loading="lazy"
          className="h-full w-full rounded-[12px] object-cover"
        />
      </div>
    </div>
  );
}
