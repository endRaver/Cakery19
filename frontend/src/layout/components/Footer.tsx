import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="border-t border-[#4A1D1F38]">
      <footer className="container relative mx-auto pb-20 pt-5 lg:pt-9">
        <div className="flex flex-col flex-wrap justify-between gap-8 sm:flex-row">
          <ul className="grid grid-cols-2 gap-2 text-sm font-medium leading-6 tracking-wider text-primary-500 sm:grid-cols-1">
            <li className="text-nowrap text-center sm:text-left">
              <Link
                to={"/"}
                className="border-b border-transparent duration-300 hover:border-primary-500"
              >
                Home
              </Link>
            </li>
            <li className="text-nowrap text-center sm:text-left">
              <Link
                to={"/shop"}
                className="border-b border-transparent duration-300 hover:border-primary-500"
              >
                Shop
              </Link>
            </li>
            <li className="text-nowrap text-center sm:text-left">
              <Link
                to={"/event"}
                className="border-b border-transparent duration-300 hover:border-primary-500"
              >
                Event
              </Link>
            </li>
            <li className="text-nowrap text-center sm:text-left">
              <Link
                to={"/about-us"}
                className="border-b border-transparent duration-300 hover:border-primary-500"
              >
                About Us
              </Link>
            </li>
            <li className="text-nowrap text-center sm:text-left">
              <Link
                to={"/faqs"}
                className="border-b border-transparent duration-300 hover:border-primary-500"
              >
                FAQs
              </Link>
            </li>
            <li className="text-nowrap text-center sm:text-left">
              <Link
                to={"/contact"}
                className="border-b border-transparent duration-300 hover:border-primary-500"
              >
                Contact
              </Link>
            </li>
          </ul>

          <div className="max-w-[245px] space-y-2 text-sm leading-6 tracking-wider text-primary-500">
            <h4 className="font-medium">Cakery 19</h4>
            <p>Address: 123 Street Name, State, Switzerland</p>
            <p>Tel: 0124 456 789</p>
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

            <Button className="w-fit rounded-none bg-[#89896E] text-xs">SUBSCRIBE</Button>
          </div>
        </div>

        <div className="bottom-8 left-1/2 flex flex-col items-center pt-10 lg:absolute lg:-translate-x-1/2">
          <img src="/images/cakery_logo_dark.svg" alt="logo" className="w-[100px]" />
          <div className="mt-2 flex gap-3 text-xs text-primary-200">Website by Cakery</div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
