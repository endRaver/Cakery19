import { useEffect } from "react";
import useWindowWidth from "@/hooks/useWindowWidth";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const linkStyle =
  "mx-6 mb-6 w-fit text-nowrap border border-transparent text-lg font-medium leading-6 tracking-wider text-[#73573F] duration-300 ease-in-out hover:border-b-primary-500";

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const windowWidth = useWindowWidth();
  const location = useLocation().pathname;

  useEffect(() => {
    onClose();
  }, [location]);

  useEffect(() => {
    // Disable scroll when sidebar is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed z-40 flex flex-col border border-[#c5b6ad] bg-primary-50 ps-3 pt-11 shadow-xl duration-500 ease-in ${windowWidth > 640 ? "top-[96px]" : "top-[84px]"} ${windowWidth > 640 ? "w-[300px]" : "w-full"} ${isOpen ? "left-0" : "-left-full"}`}
        style={{ height: windowWidth > 640 ? "calc(100vh - 96px)" : "calc(100vh - 84px)" }}
      >
        <a href="/" className={`${linkStyle}`}>
          HOME
        </a>
        <a href="/shop" className={`${linkStyle}`}>
          SHOP
        </a>
        <a href="/event" className={`${linkStyle}`}>
          EVENTS
        </a>
        <a href="/about-us" className={`${linkStyle}`}>
          ABOUT US
        </a>
        <a href="/faqs" className={`${linkStyle}`}>
          FAQS
        </a>
        <a href="/contact" className={`${linkStyle}`}>
          CONTACT
        </a>
      </div>

      {isOpen && (
        <motion.div
          className="fixed z-10 h-screen w-screen bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={onClose}
        ></motion.div>
      )}
    </>
  );
};

export default Sidebar;
