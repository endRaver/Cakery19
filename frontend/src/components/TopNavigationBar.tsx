import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import useScroll from "@/hooks/useScroll";
import {
  cakery_logo_dark,
  cakery_logo_light,
  instagram_dark,
  instagram_light,
  menu,
  search,
  whatsapp_dark,
  whatsapp_light,
} from "@/assets/icons";
import useWindowWidth from "@/hooks/useWindowWidth";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { SignedIn, SignedOut, SignOutButton, useUser } from "@clerk/clerk-react";
import { LayoutDashboardIcon, X } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";

const linkStyle =
  "my-1 text-nowrap font-medium border border-transparent px-1.5 lg:px-3 py-1 text-sm leading-6 tracking-wider duration-300 ease-in-out ";

const TopNavigationBar = () => {
  const location = useLocation().pathname;
  const isHome = location === "/";
  const windowWidth = useWindowWidth();

  return (
    <>
      {(!isHome || windowWidth <= 1024) && (
        <div
          className={`${windowWidth > 1024 ? "h-[140px]" : windowWidth > 640 ? "h-[96px]" : "h-[84px]"}`}
        ></div>
      )}

      {windowWidth > 1024 ? <NavbarDesktop /> : <NavbarMobile />}
    </>
  );
};

const NavbarDesktop = () => {
  const location = useLocation().pathname;
  const isHome = location === "/";
  const { scrollY, scrollDirection } = useScroll();
  const { user } = useUser();
  const { isAdmin } = useAuthStore();

  return (
    <div
      className={`fixed top-0 z-50 mx-auto w-full duration-500 ${scrollY > 200 && "shadow-lg"} ${isHome && scrollY < 200 ? "bg-transparent" : "bg-primary-50"} ${scrollDirection === "down" && "!-top-[140px]"}`}
    >
      <div className="container relative mx-auto flex justify-between gap-3 py-5">
        <div
          className={`my-2 flex h-fit flex-1 justify-center gap-4 self-end border-y lg:gap-10 ${isHome && scrollY < 200 ? "border-transparent" : "border-primary-400"}`}
        >
          <a
            href="/"
            className={`${linkStyle} ${isHome && scrollY < 200 ? "border-b-primary-50 text-primary-50 hover:border-b-primary-50" : "text-primary-500 hover:border-b-primary-500"} ${location === "/" ? "border-b-primary-50" : ""}`}
          >
            HOME
          </a>
          <a
            href="/shop"
            className={`${linkStyle} ${isHome && scrollY < 200 ? "text-primary-50 hover:border-b-primary-50" : "text-primary-500 hover:border-b-primary-500"} ${location === "/shop" ? "border-b-primary-500" : ""}`}
          >
            SHOP
          </a>
          <a
            href="/event"
            className={`${linkStyle} ${isHome && scrollY < 200 ? "text-primary-50 hover:border-b-primary-50" : "text-primary-500 hover:border-b-primary-500"} ${location === "/event" ? "border-b-primary-500" : ""}`}
          >
            EVENT
          </a>
        </div>

        <a href="/">
          <img
            src={`${isHome && scrollY < 200 ? cakery_logo_light : cakery_logo_dark}`}
            alt="logo"
          />
        </a>

        <div
          className={`my-2 flex h-fit flex-1 justify-center gap-4 self-end border-y lg:gap-10 ${isHome && scrollY < 200 ? "border-transparent" : "border-primary-400"}`}
        >
          <a
            href="/about-us"
            className={`${linkStyle} ${isHome && scrollY < 200 ? "text-primary-50 hover:border-b-primary-50" : "text-primary-500 hover:border-b-primary-500"} ${location === "/about-us" ? "border-b-primary-500" : ""}`}
          >
            ABOUT US
          </a>
          <a
            href="/faqs"
            className={`${linkStyle} ${isHome && scrollY < 200 ? "text-primary-50 hover:border-b-primary-50" : "text-primary-500 hover:border-b-primary-500"} ${location === "/faqs" ? "border-b-primary-500" : ""}`}
          >
            FAQS
          </a>
          <a
            href="/contact"
            className={`${linkStyle} ${isHome && scrollY < 200 ? "text-primary-50 hover:border-b-primary-50" : "text-primary-500 hover:border-b-primary-500"} ${location === "/contact" ? "border-b-primary-500" : ""}`}
          >
            CONTACT
          </a>
        </div>

        <div className="absolute right-8 top-4 flex items-center gap-2">
          <SignedIn>
            <span
              className={`${linkStyle} max-w-[200px] truncate text-nowrap !p-0 font-normal capitalize leading-none ${isHome && scrollY < 200 ? "text-primary-50" : "text-primary-500"}`}
            >
              {`Hello, ${user?.fullName || user?.emailAddresses[0]?.emailAddress.split("@")[0] || "N/a"}`}
            </span>

            <div
              className={`duration-300 ${isHome && scrollY < 200 ? "text-primary-50" : "text-primary-500"}`}
            >
              |
            </div>

            <span
              className={`${linkStyle} !px-0 font-normal leading-none ${isHome && scrollY < 200 ? "text-primary-50 hover:border-b-primary-50" : "text-primary-500 hover:border-b-primary-500"}`}
            >
              <SignOutButton redirectUrl="/login" />
            </span>
          </SignedIn>

          <SignedOut>
            <a
              href="/login"
              className={`${linkStyle} !p-0 font-normal leading-none ${isHome && scrollY < 200 ? "text-primary-50 hover:border-b-primary-50" : "text-primary-500 hover:border-b-primary-500"}`}
            >
              Sign in
            </a>
          </SignedOut>
        </div>

        <div className="absolute left-8 top-6 flex items-center gap-4">
          <a
            href={"https://www.instagram.com/cakery19.ch/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            {isHome && scrollY < 200 ? (
              <img src={instagram_light} className="size-5" />
            ) : (
              <img src={instagram_dark} className="size-5" />
            )}
          </a>
          <a
            href={
              "https://api.whatsapp.com/send?phone=41764598116&text=Hi%20My%2C%0A%0AI%20would%20like%20to%20make%20an%20order%20"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            {isHome && scrollY < 200 ? (
              <img src={whatsapp_light} className="size-5" />
            ) : (
              <img src={whatsapp_dark} className="size-5" />
            )}
          </a>

          <SignedIn>
            {isAdmin && (
              <a
                href="/admin"
                className={`flex items-center gap-2 border-b border-transparent duration-300 ${isHome && scrollY < 200 ? "text-primary-50 hover:border-primary-50" : "text-primary-500 hover:border-primary-500"} ms-10`}
              >
                <LayoutDashboardIcon className="mr-1 size-4" />
                Dashboard
              </a>
            )}
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

const NavbarMobile = () => {
  const { scrollY, scrollDirection } = useScroll();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div
        className={`fixed top-0 z-40 mx-auto w-full py-2 duration-500 ${scrollY > 200 && "shadow-lg"} bg-primary-50 ${scrollDirection === "down" && "!-top-[97px]"}`}
      >
        <div className="mx-4 flex items-center justify-between sm:mx-8">
          <Button
            className="bg-transparent p-2 duration-300 hover:bg-primary-75"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <X className="mx-1 size-5 text-[#525244] sm:size-7" />
            ) : (
              <img src={menu} alt="menu" className="h-5 w-6 sm:size-7" />
            )}
          </Button>

          <a href="/">
            <img src={cakery_logo_dark} alt="logo" className="size-[68px] sm:size-[80px]" />
          </a>
          <Button className="bg-transparent p-2 duration-300 hover:bg-primary-75">
            <img src={search} alt="search" className="size-5 sm:size-7" />
          </Button>
        </div>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default TopNavigationBar;
