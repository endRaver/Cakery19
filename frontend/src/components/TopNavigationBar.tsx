import { instagram_dark, instagram_light, whatsapp_dark, whatsapp_light } from "@/assets/icons";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const linkStyle =
  "my-1 text-nowrap font-medium border border-transparent px-3 py-1 text-sm leading-6 tracking-wider duration-300 ease-in-out";

const TopNavigationBar = () => {
  const location = useLocation().pathname;
  const isHome = location === "/";

  const [scrollY, setScrollY] = useState(0);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("");

  const handleScroll = () => {
    setScrollY(window.scrollY); // Capture the current scroll position

    // Determine scroll direction
    if (window.scrollY > prevScrollY) {
      setScrollDirection("down"); // Scrolling down
    } else if (window.scrollY < prevScrollY) {
      setScrollDirection("up"); // Scrolling up
    }

    // Update previous scroll position
    setPrevScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // Add scroll event listener

    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up on unmount
    };
  }, [prevScrollY]);

  return (
    <>
      {!isHome && <div className="h-[140px]"></div>}
      <div
        className={`fixed top-0 z-50 mx-auto w-full duration-500 ${isHome && scrollY < 200 ? "bg-transparent" : "bg-primary-50"} ${scrollDirection === "down" && "-top-[140px]"}`}
      >
        <div className="container relative mx-auto flex justify-between gap-3 py-5">
          <div
            className={`my-2 flex h-fit flex-1 justify-center gap-10 self-end border-y ${isHome && scrollY < 200 ? "border-transparent" : "border-primary-400"}`}
          >
            <Link
              to="/"
              className={`${linkStyle} ${isHome && scrollY < 200 ? "border-b-primary-50 text-primary-50 hover:border-b-primary-50" : "text-primary-500 hover:border-b-primary-500"} ${location === "/" ? "border-b-primary-50" : ""}`}
            >
              HOME
            </Link>
            <Link
              to="/shop"
              className={`${linkStyle} ${isHome && scrollY < 200 ? "text-primary-50 hover:border-b-primary-50" : "text-primary-500 hover:border-b-primary-500"} ${location === "/shop" ? "border-b-primary-500" : ""}`}
            >
              SHOP
            </Link>
            <Link
              to="/event"
              className={`${linkStyle} ${isHome && scrollY < 200 ? "text-primary-50 hover:border-b-primary-50" : "text-primary-500 hover:border-b-primary-500"} ${location === "/event" ? "border-b-primary-500" : ""}`}
            >
              EVENT
            </Link>
          </div>

          <img
            src={`${isHome && scrollY < 200 ? "/images/cakery_logo_light.svg" : "/images/cakery_logo_dark.svg"}`}
            alt="logo"
          />

          <div
            className={`my-2 flex h-fit flex-1 justify-center gap-10 self-end border-y border-primary-400 ${isHome && scrollY < 200 ? "border-transparent" : "text-primary-500 hover:border-b-primary-500"}`}
          >
            <Link
              to="/about-us"
              className={`${linkStyle} ${isHome && scrollY < 200 ? "text-primary-50 hover:border-b-primary-50" : "text-primary-500 hover:border-b-primary-500"} ${location === "/about-us" ? "border-b-primary-500" : ""}`}
            >
              ABOUT US
            </Link>
            <Link
              to="/faqs"
              className={`${linkStyle} ${isHome && scrollY < 200 ? "text-primary-50 hover:border-b-primary-50" : "text-primary-500 hover:border-b-primary-500"} ${location === "/faqs" ? "border-b-primary-500" : ""}`}
            >
              FAQs
            </Link>
            <Link
              to="/contact"
              className={`${linkStyle} ${isHome && scrollY < 200 ? "text-primary-50 hover:border-b-primary-50" : "text-primary-500 hover:border-b-primary-500"} ${location === "/contact" ? "border-b-primary-500" : ""}`}
            >
              CONTACT
            </Link>
          </div>

          <div className="absolute right-8 top-4 flex gap-4">
            <a href={"https://www.instagram.com/cakery19.ch/"}>
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
            >
              {isHome && scrollY < 200 ? (
                <img src={whatsapp_light} className="size-5" />
              ) : (
                <img src={whatsapp_dark} className="size-5" />
              )}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNavigationBar;
