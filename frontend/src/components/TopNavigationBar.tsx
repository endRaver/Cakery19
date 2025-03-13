import { useLocation, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import useScroll from "@/hooks/useScroll";
import {
  cakery_logo_dark,
  cakery_logo_light,
  instagram_dark,
  instagram_light,
  whatsapp_dark,
  whatsapp_light,
  cart_dark,
  cart_light,
  menu,
  search,
} from "@/assets/icons";
import useWindowWidth from "@/hooks/useWindowWidth";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { SignedIn, SignedOut, SignOutButton, useUser } from "@clerk/clerk-react";
import { LayoutDashboardIcon, X } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import TopbarLinkToolTip from "./TopbarLinkToolTip";
import AnimatedUnderline from "@/pages/shopping-cart/components/AnimationUnderline";
import { useProductStore } from "@/stores/useProductStore";

const linkStyle =
  "my-1 text-nowrap font-medium border border-transparent px-1.5 lg:px-3 py-1 text-sm leading-6 tracking-wider duration-300 ease-in-out ";

const getResponsiveHeight = (width: number) => {
  if (width > 1024) return "h-[140px]";
  if (width > 640) return "h-[96px]";
  return "h-[84px]";
};

const getActiveBorderStyle = (isActive: boolean, isTransparentHeader: boolean) => {
  if (!isActive) return "";
  return isTransparentHeader ? "border-b-primary-50" : "border-b-primary-500";
};

const TopNavigationBar = () => {
  const location = useLocation().pathname;
  const isHome = location === "/";
  const windowWidth = useWindowWidth();

  return (
    <>
      {(!isHome || windowWidth <= 1024) && <div className={getResponsiveHeight(windowWidth)}></div>}

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
  const { cartProducts, handleSetCartProducts } = useProductStore();

  const isTransparentHeader = isHome && scrollY < 200;

  useEffect(() => {
    handleSetCartProducts();
  }, [handleSetCartProducts]);

  const numberOfCartItems = cartProducts.reduce((total, item) => total + item.quantity, 0);

  return (
    <div
      className={`fixed top-0 z-50 mx-auto w-full duration-500 ${scrollY > 200 && "shadow-lg"} ${isTransparentHeader ? "bg-transparent" : "bg-primary-50"} ${scrollDirection === "down" && "!-top-[140px]"}`}
    >
      <div className="container relative mx-auto flex justify-between gap-3 py-5">
        <div
          className={`my-2 flex h-fit flex-1 justify-center gap-4 self-end border-y lg:gap-10 ${isTransparentHeader ? "border-transparent" : "border-primary-400"}`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkStyle} ${isTransparentHeader ? "text-primary-50 hover:border-b-primary-50" : "text-primary-500 hover:border-b-primary-500"} ${getActiveBorderStyle(isActive, isTransparentHeader)}`
            }
          >
            HOME
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `${linkStyle} ${isTransparentHeader ? "text-primary-50 hover:border-b-primary-50" : "text-primary-500 hover:border-b-primary-500"} ${getActiveBorderStyle(isActive, isTransparentHeader)}`
            }
          >
            SHOP
          </NavLink>
          <NavLink
            to="/event"
            className={({ isActive }) =>
              `${linkStyle} ${isTransparentHeader ? "text-primary-50 hover:border-b-primary-50" : "text-primary-500 hover:border-b-primary-500"} ${getActiveBorderStyle(isActive, isTransparentHeader)}`
            }
          >
            EVENT
          </NavLink>
        </div>

        <NavLink to="/">
          <img src={`${isTransparentHeader ? cakery_logo_light : cakery_logo_dark}`} alt="logo" />
        </NavLink>

        <div
          className={`my-2 flex h-fit flex-1 justify-center gap-4 self-end border-y lg:gap-10 ${isTransparentHeader ? "border-transparent" : "border-primary-400"}`}
        >
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              `${linkStyle} ${isTransparentHeader ? "text-primary-50 hover:border-b-primary-50" : "text-primary-500 hover:border-b-primary-500"} ${getActiveBorderStyle(isActive, isTransparentHeader)}`
            }
          >
            ABOUT US
          </NavLink>
          <NavLink
            to="/faqs"
            className={({ isActive }) =>
              `${linkStyle} ${isTransparentHeader ? "text-primary-50 hover:border-b-primary-50" : "text-primary-500 hover:border-b-primary-500"} ${getActiveBorderStyle(isActive, isTransparentHeader)}`
            }
          >
            FAQS
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${linkStyle} ${isTransparentHeader ? "text-primary-50 hover:border-b-primary-50" : "text-primary-500 hover:border-b-primary-500"} ${getActiveBorderStyle(isActive, isTransparentHeader)}`
            }
          >
            CONTACT
          </NavLink>
        </div>

        <div className="absolute right-8 top-6 flex items-center gap-2">
          <SignedIn>
            <span
              className={`${linkStyle} max-w-[200px] truncate text-nowrap !p-0 font-normal capitalize leading-none ${isTransparentHeader ? "text-primary-50" : "text-primary-500"}`}
            >
              {`Hello, ${user?.fullName ?? user?.emailAddresses[0]?.emailAddress.split("@")[0] ?? "N/a"}`}
            </span>

            <div
              className={`duration-300 ${isTransparentHeader ? "text-primary-50" : "text-primary-500"}`}
            >
              |
            </div>

            <span
              className={`${linkStyle} !px-0 font-normal leading-none ${isTransparentHeader ? "text-primary-50 hover:border-b-primary-50" : "text-primary-500 hover:border-b-primary-500"}`}
            >
              <SignOutButton redirectUrl="/login" />
            </span>
          </SignedIn>

          <SignedOut>
            <AnimatedUnderline mode={isTransparentHeader ? "dark" : "light"}>
              <NavLink
                to="/login"
                className={`${linkStyle} !p-0 font-normal leading-none ${isTransparentHeader ? "text-primary-50" : "text-primary-500"}`}
              >
                Sign in
              </NavLink>
            </AnimatedUnderline>
          </SignedOut>
        </div>

        <div className="absolute left-8 top-6 flex items-center gap-3">
          <TopbarLinkToolTip
            url={"https://www.instagram.com/cakery19.ch/"}
            label="Instagram"
            images={{ light: instagram_light, dark: instagram_dark }}
            isLight={isTransparentHeader}
            newTab={true}
            imgClassName="m-1.5"
          />
          <TopbarLinkToolTip
            url={
              "https://api.whatsapp.com/send?phone=41764598116&text=Hi%20My%2C%0A%0AI%20would%20like%20to%20make%20an%20order%20"
            }
            label="Whatsapp"
            images={{ light: whatsapp_light, dark: whatsapp_dark }}
            isLight={isTransparentHeader}
            newTab={true}
            imgClassName="m-1.5"
          />

          <TopbarLinkToolTip
            url={"/cart"}
            label="My Cart"
            images={{ light: cart_light, dark: cart_dark }}
            isLight={isTransparentHeader}
            imgClassName="size-8"
            number={numberOfCartItems}
          />

          <SignedIn>
            {isAdmin && (
              <NavLink
                to="/admin"
                className={`flex items-center gap-2 border-b border-transparent duration-300 ${isTransparentHeader ? "text-primary-50 hover:border-primary-50" : "text-primary-500 hover:border-primary-500"} ms-10`}
              >
                <LayoutDashboardIcon className="mr-1 size-4" />
                Dashboard
              </NavLink>
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

          <NavLink to="/">
            <img src={cakery_logo_dark} alt="logo" className="size-[68px] sm:size-[80px]" />
          </NavLink>
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
