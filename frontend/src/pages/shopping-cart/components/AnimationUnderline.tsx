import { motion, useAnimation } from "framer-motion";

const AnimatedUnderline = ({
  children,
  mode = "light",
}: {
  children: React.ReactNode;
  mode?: string;
}) => {
  const rightLine = useAnimation();
  const leftLine = useAnimation();

  const handleHoverStart = () => {
    leftLine.start({ scaleX: 1, transformOrigin: "right" });
    rightLine.start({ scaleX: 1, transformOrigin: "left" });
  };

  const handleHoverEnd = () => {
    leftLine.start({ scaleX: 0, transformOrigin: "left" });
    rightLine.start({ scaleX: 0, transformOrigin: "right" });
  };

  const lineStyles = `absolute bottom-0 h-[0.5px] w-1/2 ${mode === "light" ? "bg-primary-300" : "bg-primary-50"}`;
  const transition = {
    ease: [0.34, 0.24, 0.8, 0.54],
    duration: 0.3,
  };

  return (
    <motion.div className="relative" onHoverStart={handleHoverStart} onHoverEnd={handleHoverEnd}>
      {children}
      <motion.div
        className={`${lineStyles} left-0`}
        initial={{ scaleX: 0 }}
        animate={leftLine}
        transition={transition}
      />
      <motion.div
        className={`${lineStyles} right-0`}
        initial={{ scaleX: 0 }}
        animate={rightLine}
        transition={transition}
      />
    </motion.div>
  );
};

export default AnimatedUnderline;
