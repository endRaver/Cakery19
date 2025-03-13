import { motion } from "framer-motion";
import { cakery_logo_light } from "@/assets/icons";

const FullpageLoader = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-primary-50">
      <motion.div
        className="rounded-full bg-primary-500 p-8"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <img src={cakery_logo_light} className="size-20" alt="logo" />
      </motion.div>
    </div>
  );
};

export default FullpageLoader;
