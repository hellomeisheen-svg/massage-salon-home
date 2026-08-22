import { motion } from "framer-motion";

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
    "absolute overflow-hidden rounded-[12px] bg-white ds-bento-shadow";

  const tiles = [
    { src: leftImage, zIndex: 10, left: "20px", top: "40px", rot: "-8deg", delay: 0 },
    { src: middleImage, zIndex: 20, left: "80px", top: "30px", rot: "4deg", delay: 0.15 },
    { src: rightImage, zIndex: 30, left: "140px", top: "40px", rot: "8deg", delay: 0.3 },
  ];

  return (
    <div className="relative h-[240px] w-[280px]">
      {tiles.map((tile, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: tile.delay, ease: "easeOut" }}
          className={`${tileBase} h-[170px] w-[120px]`}
          style={{
            zIndex: tile.zIndex,
            left: tile.left,
            top: tile.top,
            rotate: tile.rot,
          }}
        >
          <motion.div
            className="h-[calc(100%+12px)] w-full"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: tile.delay,
            }}
          >
            <img
              src={tile.src}
              alt=""
              role="presentation"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
