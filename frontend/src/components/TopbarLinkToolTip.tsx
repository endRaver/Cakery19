import { motion, useAnimation } from "framer-motion";

interface TopbarLinkToolTipProps {
  url: string;
  label: string;
  images: { light: string; dark: string };
  isLight: boolean;
  newTab?: boolean;
  number?: number;
  className?: string;
  imgClassName?: string;
}

const TopbarLinkToolTip = ({
  url,
  label,
  images,
  isLight,
  newTab = false,
  number,
  className,
  imgClassName,
}: TopbarLinkToolTipProps) => {
  const animation = useAnimation();

  const handleHoverStart = () => {
    animation.start({ opacity: 1, bottom: "-100%" });
  };

  const handleHoverEnd = () => {
    animation.start({ opacity: 0, bottom: "-110%" });
  };

  return (
    <div className={`group relative ${className}`}>
      <motion.a
        href={url}
        target={newTab ? "_blank" : undefined}
        rel="noopener noreferrer"
        className={`flex`}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
      >
        {isLight ? (
          <img src={images.light} className={`size-5 ${imgClassName}`} alt="icon" />
        ) : (
          <img src={images.dark} className={`size-5 ${imgClassName}`} alt="icon" />
        )}
      </motion.a>

      <motion.div
        className="absolute left-1/2 -translate-x-1/2 cursor-default text-nowrap rounded-md bg-white px-2 py-1 text-sm text-primary-200 shadow-lg"
        initial={{ opacity: 0, bottom: "-100%" }}
        animate={animation}
        transition={{ duration: 0.2 }}
      >
        {label}
        <div className="absolute left-1/2 top-[-5px] h-2 w-2 -translate-x-1/2 rotate-45 bg-white shadow-xl" />
      </motion.div>

      {number !== undefined && number >= 1 && (
        <span className="absolute bottom-0 left-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary-300 p-1 text-center text-[8px] leading-5 text-white">
          {number <= 99 ? number : "99+"}
        </span>
      )}
    </div>
  );
};

export default TopbarLinkToolTip;
