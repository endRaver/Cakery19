import { Link } from "react-router-dom";

import { cakery_logo_dark } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimatedUnderline from "@/components/animation/AnimatedUnderline";

const Footer = () => {
  return (
    <div className="border-t border-[#4A1D1F38]">
      <footer className="container relative mx-auto pb-20 pt-5 lg:pt-9">
        <div className="flex flex-col flex-wrap justify-between gap-8 sm:flex-row">
          <ul className="grid grid-cols-2 gap-2 text-sm font-medium leading-6 tracking-wider text-primary-500 sm:grid-cols-1">
            <li className="text-nowrap text-center sm:text-left">
              <AnimatedUnderline>
                <Link to={"/"}>Home</Link>
              </AnimatedUnderline>
            </li>
            <li className="text-nowrap text-center sm:text-left">
              <AnimatedUnderline>
                <Link to={"/shop"}>Shop</Link>
              </AnimatedUnderline>
            </li>
            <li className="text-nowrap text-center sm:text-left">
              <AnimatedUnderline>
                <Link to={"/event"}>Event</Link>
              </AnimatedUnderline>
            </li>
            <li className="text-nowrap text-center sm:text-left">
              <AnimatedUnderline>
                <Link to={"/about-us"}>About Us</Link>
              </AnimatedUnderline>
            </li>
            <li className="text-nowrap text-center sm:text-left">
              <AnimatedUnderline>
                <Link to={"/faqs"}>FAQs</Link>
              </AnimatedUnderline>
            </li>
            <li className="text-nowrap text-center sm:text-left">
              <AnimatedUnderline>
                <Link to={"/contact"}>Contact</Link>
              </AnimatedUnderline>
            </li>
          </ul>

          <div className="max-w-[245px] space-y-2 text-sm leading-6 tracking-wider text-primary-500">
            <h4 className="font-medium">Cakery 19</h4>
            <p>Address: 123 Street Name, State, Switzerland</p>
            <AnimatedUnderline>
              <a href="tel:0124 456 789">Tel: 0124 456 789</a>
            </AnimatedUnderline>
          </div>

          <div className="space-y-2 text-sm leading-6 tracking-wider text-primary-500">
            <h4 className="font-medium">Opening Hours</h4>
            <div className="grid w-fit grid-cols-2 gap-x-10 gap-y-2 lg:gap-x-14">
              <p className="text-nowrap">Monday - Friday</p>
              <p className="text-nowrap">8.00 - 18.30</p>
              <p className="text-nowrap">Saturday</p>
              <p className="text-nowrap">Closed</p>
              <p className="text-nowrap">Sunday</p>
              <p className="text-nowrap">Closed</p>
            </div>
          </div>

          <div className="space-y-4 text-justify text-sm leading-6 tracking-wider text-primary-500 sm:max-w-[250px]">
            <h4 className="font-medium">Newsletter</h4>
            <p className="max-w-[291px]">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <Input
              type="email"
              placeholder="Email"
              className="rounded-none border-primary-400 bg-transparent text-xs font-medium text-primary-400 outline-none placeholder:text-xs placeholder:text-primary-400 placeholder:opacity-70"
            />

            <Button className="w-fit rounded-none bg-primary_btn text-xs">SUBSCRIBE</Button>
          </div>
        </div>

        <div className="bottom-8 left-1/2 flex flex-col items-center pt-10 lg:absolute lg:-translate-x-1/2">
          <img src={cakery_logo_dark} alt="logo" className="w-[100px]" />
          <div className="mt-2 flex gap-3 text-xs text-primary-200">Website by Cakery</div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
