import { motion, AnimatePresence } from "framer-motion";
import { cakery_logo_light } from "@/assets/icons";

const LoadingScreen = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-primary-50"
      >
        <div className="animate-ping rounded-full bg-primary-500 p-8 duration-1000">
          <img src={cakery_logo_light} className="size-20" alt="logo" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
