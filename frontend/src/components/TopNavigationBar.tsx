import { Link, useLocation } from "react-router-dom";

const linkStyle =
  "my-1 text-nowrap border border-transparent px-3 py-1 text-sm uppercase leading-6 tracking-wider duration-300 ease-in-out";

const TopNavigationBar = () => {
  const location = useLocation().pathname;
  const isHome = location === "/";

  return (
    <div className="container z-20 mx-auto">
      <div className="flex justify-between gap-3 py-5">
        <div
          className={`my-2 flex h-fit flex-1 justify-center gap-10 self-end border-y border-primary-400 ${isHome ? "border-transparent" : ""}`}
        >
          <Link
            to="/"
            className={`${linkStyle} ${isHome ? "border-b-primary-50 text-primary-50 hover:border-b-primary-50" : "text-primary-500 hover:border-b-primary-500"} ${location === "/" ? "border-b-primary-50" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={`${linkStyle} ${isHome ? "text-primary-50 hover:border-b-primary-50" : "text-primary-500 hover:border-b-primary-500"} ${location === "/shop" ? "border-b-primary-500" : ""}`}
          >
            Shop
          </Link>
          <Link
            to="/event"
            className={`${linkStyle} ${isHome ? "text-primary-50 hover:border-b-primary-50" : "text-primary-500 hover:border-b-primary-500"} ${location === "/event" ? "border-b-primary-500" : ""}`}
          >
            Event
          </Link>
        </div>

        <img
          src={`${isHome ? "/images/cakery_logo_light.svg" : "/images/cakery_logo_dark.svg"}`}
          alt="logo"
        />

        <div
          className={`my-2 flex h-fit flex-1 justify-center gap-10 self-end border-y border-primary-400 ${isHome ? "border-transparent" : "text-primary-500 hover:border-b-primary-500"}`}
        >
          <Link
            to="/about-us"
            className={`${linkStyle} ${isHome ? "text-primary-50 hover:border-b-primary-50" : "text-primary-500 hover:border-b-primary-500"} ${location === "/about-us" ? "border-b-primary-500" : ""}`}
          >
            About Us
          </Link>
          <Link
            to="/faqs"
            className={`${linkStyle} ${isHome ? "text-primary-50 hover:border-b-primary-50" : "text-primary-500 hover:border-b-primary-500"} ${location === "/faqs" ? "border-b-primary-500" : ""}`}
          >
            FAQs
          </Link>
          <Link
            to="/contact"
            className={`${linkStyle} ${isHome ? "text-primary-50 hover:border-b-primary-50" : "text-primary-500 hover:border-b-primary-500"} ${location === "/contact" ? "border-b-primary-500" : ""}`}
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopNavigationBar;
