import { motion, Variants } from "framer-motion";

interface ImageRevealProps {
  leftImage: string;
  middleImage: string;
  rightImage: string;
  /** horizontal spread in px (default 150/200) */
  spread?: number;
}

export default function ImageReveal({
  leftImage,
  middleImage,
  rightImage,
  spread = 150,
}: ImageRevealProps) {
  const containerVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { delay: 0.2, staggerChildren: 0.2 },
    },
  };

  const spring = { type: "spring" as const, stiffness: 120, damping: 12 };
  const springHover = { type: "spring" as const, stiffness: 200, damping: 15 };

  const leftImageVariants: Variants = {
    initial: { rotate: 0, x: 0, y: 0 },
    animate: { rotate: -8, x: -spread, y: 10, transition: spring },
    hover: { rotate: 1, x: -spread - 10, y: 0, transition: springHover },
  };

  const middleImageVariants: Variants = {
    initial: { rotate: 0, x: 0, y: 0 },
    animate: { rotate: 6, x: 0, y: 0, transition: spring },
    hover: { rotate: 0, x: 0, y: -10, transition: springHover },
  };

  const rightImageVariants: Variants = {
    initial: { rotate: 0, x: 0, y: 0 },
    animate: { rotate: -6, x: spread, y: 20, transition: spring },
    hover: { rotate: 3, x: spread, y: 10, transition: springHover },
  };

  const tileClass =
    "absolute h-40 w-40 overflow-hidden rounded-xl bg-white p-2 shadow-lg";

  return (
    <motion.div
      className="relative flex h-56 w-56 items-center justify-center"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className={`${tileClass} origin-bottom-right`}
        variants={leftImageVariants}
        whileHover="hover"
        style={{ zIndex: 30 }}
      >
        <img
          src={leftImage}
          alt=""
          loading="lazy"
          className="h-full w-full rounded-lg object-cover"
        />
      </motion.div>

      <motion.div
        className={`${tileClass} origin-bottom-left`}
        variants={middleImageVariants}
        whileHover="hover"
        style={{ zIndex: 20 }}
      >
        <img
          src={middleImage}
          alt=""
          loading="lazy"
          className="h-full w-full rounded-lg object-cover"
        />
      </motion.div>

      <motion.div
        className={`${tileClass} origin-bottom-right`}
        variants={rightImageVariants}
        whileHover="hover"
        style={{ zIndex: 10 }}
      >
        <img
          src={rightImage}
          alt=""
          loading="lazy"
          className="h-full w-full rounded-lg object-cover"
        />
      </motion.div>
    </motion.div>
  );
}
