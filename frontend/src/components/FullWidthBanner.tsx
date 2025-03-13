import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const FullWidthBanner = ({
  className,
  webpImage,
  jpegImage,
}: {
  className?: string;
  webpImage?: string;
  jpegImage?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // Starts zooming slower and finishes earlier
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 70 });

  return (
    <div ref={ref} className={`h-[425px] w-full overflow-hidden ${className}`}>
      <picture>
        {/* WebP format for modern browsers */}
        <source srcSet={webpImage} type="image/webp" />
        {/* Fallback JPEG for older browsers */}
        <motion.img
          src={jpegImage}
          alt="Bakery Hero Banner"
          loading="eager"
          className="fade-in-image h-full w-full object-cover object-center"
          onLoad={(e) => (e.target as HTMLImageElement).classList.add("loaded")}
          style={{ scale: smoothScale }}
        />
      </picture>
    </div>
  );
};

export default FullWidthBanner;
