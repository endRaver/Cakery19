import { motion, useAnimation } from "framer-motion";

const AddToCartButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  const animation = useAnimation();

  const handleHoverStart = () => {
    animation.start({ bottom: "0%" });
  };

  const handleHoverEnd = () => {
    animation.start({ bottom: "-100%" });
  };

  return (
    <motion.button
      className="bg-primary_btn relative h-[48px] w-full overflow-hidden rounded-[2px] p-1"
      onClick={onClick}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      <motion.span
        className="absolute left-0 z-10 h-full w-full bg-[#493022]"
        animate={animation}
        initial={{ bottom: "-100%" }}
        transition={{ ease: [0.785, 0.135, 0.15, 0.86], duration: 0.45 }}
      />
      <span className="relative z-20 flex h-full w-full items-center justify-center rounded-[2px] border border-primary-50/40 px-5 py-1.5 text-xs font-medium text-white">
        {children}
      </span>
    </motion.button>
  );
};

export default AddToCartButton;
