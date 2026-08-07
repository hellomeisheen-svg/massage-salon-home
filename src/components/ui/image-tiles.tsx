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
  spread = 150,
}: ImageRevealProps) {
  const tileClass =
    "absolute h-40 w-40 overflow-hidden rounded-xl bg-white p-2 shadow-lg";

  return (
    <div
      className="relative flex h-56 w-56 items-center justify-center"
      style={{ width: `${spread * 2 + 160}px` }}
    >
      <div
        className={`${tileClass} origin-bottom-right`}
        style={{ zIndex: 30, transform: `rotate(-8deg) translateX(-${spread}px) translateY(10px)` }}
      >
        <img
          src={leftImage}
          alt=""
          loading="lazy"
          className="h-full w-full rounded-lg object-cover"
        />
      </div>

      <div
        className={`${tileClass} origin-bottom-left`}
        style={{ zIndex: 20, transform: "rotate(6deg)" }}
      >
        <img
          src={middleImage}
          alt=""
          loading="lazy"
          className="h-full w-full rounded-lg object-cover"
        />
      </div>

      <div
        className={`${tileClass} origin-bottom-right`}
        style={{ zIndex: 10, transform: `rotate(-6deg) translateX(${spread}px) translateY(20px)` }}
      >
        <img
          src={rightImage}
          alt=""
          loading="lazy"
          className="h-full w-full rounded-lg object-cover"
        />
      </div>
    </div>
  );
}
