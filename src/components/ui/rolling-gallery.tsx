import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
  PanInfo,
} from "framer-motion";

const IMGS: { url: string; alt: string }[] = [
  { url: "/images/uslugi-klassicheskii-massazh.webp", alt: "Классический массаж спины в кабинете" },
  { url: "/images/uslugi-massazh-vorotnikovoi-zony.webp", alt: "Массаж воротниковой зоны" },
  { url: "/images/uslugi-atmosfera-ruki-maslo-white.webp", alt: "Руки мастера с массажным маслом" },
  { url: "/images/uslugi-girudoterapiya-litsa.webp", alt: "Гирудотерапия лица" },
  { url: "/images/uslugi-massazh-nog.webp", alt: "Массаж ног" },
  { url: "/images/uslugi-atmosfera-chai-white.webp", alt: "Чай в спокойной атмосфере кабинета" },
  { url: "/images/uslugi-massazh-golovy.webp", alt: "Массаж головы" },
  { url: "/images/uslugi-girudoterapiya.webp", alt: "Гирудотерапия" },
  { url: "/images/uslugi-ketgut.webp", alt: "Акупунктурный кетгут" },
  { url: "/images/uslugi-limfodrenazhnyi-massazh.webp", alt: "Лимфодренажный массаж" },
  { url: "/images/uslugi-massazh-litsa.webp", alt: "Массаж лица" },
  { url: "/images/uslugi-atmosfera-polotenca-white.webp", alt: "Уютные полотенца в кабинете" },
];



type GalleryImage = { url: string; alt: string };

interface RollingGalleryProps {
  autoplay?: boolean;
  pauseOnHover?: boolean;
  images?: string[] | GalleryImage[];
}

export const RollingGallery: React.FC<RollingGalleryProps> = ({
  autoplay = false,
  pauseOnHover = false,
  images = [],
}) => {
  const galleryImages: GalleryImage[] =
    images.length > 0
      ? images.map((img) =>
          typeof img === "string" ? { url: img, alt: "gallery" } : img
        )
      : IMGS;

  const [isScreenSizeSm, setIsScreenSizeSm] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const check = () => setIsScreenSizeSm(window.innerWidth <= 640);
      check();
      const handleResize = () => check();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const cylinderWidth: number = isScreenSizeSm ? 1600 : 2600;
  const imgWidth: number = isScreenSizeSm ? 120 : 150;
  const imgHeight: number = isScreenSizeSm ? 180 : 250;
  const faceCount: number = galleryImages.length;
  const faceWidth: number = (cylinderWidth / faceCount) * 1.5;
  const radius: number = cylinderWidth / (2 * Math.PI);

  const dragFactor: number = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  const transform = useTransform(
    rotation,
    (val: number) => `rotate3d(0,1,0,${val}deg)`
  );

  const startInfiniteSpin = (startAngle: number) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 35,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    if (autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

  const handleUpdate = (latest: any) => {
    if (typeof latest.rotateY === "number") {
      rotation.set(latest.rotateY);
    }
  };

  const handleDrag = (_: any, info: PanInfo): void => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_: any, info: PanInfo): void => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);
    if (autoplay) {
      startInfiniteSpin(finalAngle);
    }
  };

  const handleMouseEnter = (): void => {
    if (autoplay && pauseOnHover) {
      controls.stop();
    }
  };

  const handleMouseLeave = (): void => {
    if (autoplay && pauseOnHover) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    }
  };

  return (
    <div className="relative h-[480px] w-full overflow-x-clip sm:h-[580px]">
      <div
        className="absolute top-0 left-0 h-full w-[48px] z-10"
        style={{
          background:
            "linear-gradient(to left, rgba(239,246,255,0) 0%, #EFF6FF 100%)",
        }}
      />
      <div
        className="absolute top-0 right-0 h-full w-[48px] z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(239,246,255,0) 0%, #EFF6FF 100%)",
        }}
      />

      <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
          onUpdate={handleUpdate}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-[200px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
        >
          {galleryImages.map(({ url, alt }, i) => (
            <div
              key={i}
              className="group absolute left-1/2 top-1/2 flex h-fit items-center justify-center p-[8%] [backface-visibility:hidden]"
              style={{
                width: `${faceWidth}px`,
                transform: `translateX(-50%) translateY(-50%) rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
              }}
            >
              <img
                src={url}
                alt={alt}
                draggable={false}
                loading="lazy"
                decoding="async"
                style={{ width: imgWidth, height: imgHeight, flexShrink: 0, maxWidth: "none" }}
                className={`pointer-events-none rounded-[12px] ds-bento-shadow object-cover`}
              />

            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
