import { motion, useAnimation } from "framer-motion";

const AddToCartButton = ({
  onClick,
  children,
  className,
  disabled,
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}) => {
  const animation = useAnimation();

  const handleHoverStart = () => {
    if (disabled) return;
    animation.start({ bottom: "0%" });
  };

  const handleHoverEnd = () => {
    if (disabled) return;
    animation.start({ bottom: "-100%" });
  };

  return (
    <motion.button
      className={`relative h-[48px] w-fit overflow-hidden rounded-[2px] bg-primary_btn p-1 ${className} disabled:opacity-50`}
      onClick={onClick}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      disabled={disabled}
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
