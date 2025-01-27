import { useEffect } from "react";
import useWindowWidth from "@/hooks/useWindowWidth";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { LayoutDashboardIcon, LogOutIcon, User2 } from "lucide-react";
import { instagram_dark, whatsapp_dark } from "@/assets/icons";
import { SignedIn, SignedOut, SignOutButton, useUser } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { useAuthStore } from "@/stores/useAuthStore";

const linkStyle =
  "mx-6 mb-6 w-fit text-nowrap border border-transparent text-lg font-medium leading-6 tracking-wider text-[#73573F] duration-300 ease-in-out hover:border-b-primary-500";

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const windowWidth = useWindowWidth();
  const location = useLocation().pathname;

  const { user } = useUser();
  const { isAdmin } = useAuthStore();

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
        className={`fixed z-40 flex flex-col border border-[#c5b6ad] bg-primary-50 ps-3 pt-11 shadow-xl duration-500 ease-in ${windowWidth > 640 ? "top-[96px]" : "top-[84px]"} ${windowWidth > 640 ? "w-[400px]" : "w-full"} ${isOpen ? "left-0" : "-left-full"}`}
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

        <div className="me-3 flex flex-nowrap items-center justify-between border-t border-[#c5b6ad] pt-5 text-xs font-medium uppercase tracking-widest text-[#73573F]">
          <a
            href={"https://www.instagram.com/cakery19.ch/"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-nowrap items-center gap-1"
          >
            <img src={instagram_dark} className="size-4" />
            Instagram
          </a>
          <a
            href={
              "https://api.whatsapp.com/send?phone=41764598116&text=Hi%20My%2C%0A%0AI%20would%20like%20to%20make%20an%20order%20"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-nowrap items-center justify-center gap-1"
          >
            <img src={whatsapp_dark} className="size-4" />
            Whatsapp
          </a>
          <SignedIn>
            <div className="flex w-[110px] flex-nowrap items-center justify-end gap-1">
              <User2 className="size-4 flex-shrink-0" />
              <p className="truncate capitalize">
                {user?.fullName || user?.emailAddresses[0]?.emailAddress.split("@")[0] || "N/a"}
              </p>
            </div>
          </SignedIn>

          <SignedOut>
            <div className="">
              <a href="/login" className="flex flex-nowrap items-center justify-end gap-1">
                <User2 className="size-4 flex-shrink-0" />
                <p>Sign In</p>
              </a>
            </div>
          </SignedOut>
        </div>

        <SignedIn>
          {isAdmin && (
            <a
              href="/admin"
              className={`absolute bottom-14 left-3 flex items-center gap-2 border-b border-transparent text-primary-500 duration-300 hover:border-primary-500`}
            >
              <LayoutDashboardIcon className="mr-1 size-4" />
              Dashboard
            </a>
          )}

          <SignOutButton redirectUrl="/login">
            <Button className="absolute bottom-10 right-3 rounded-full bg-primary-100 !py-6 hover:bg-primary-300">
              <LogOutIcon />
            </Button>
          </SignOutButton>
        </SignedIn>
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
