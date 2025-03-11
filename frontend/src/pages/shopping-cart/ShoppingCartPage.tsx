import AnimatedUnderline from "./components/AnimationUnderline";
import CartItem from "./components/CartItem";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FullWidthBanner from "@/components/FullWidthBanner";

const ShoppingCartPage = () => {
  return (
    <div className="space-y-10">
      <section className="container mx-auto mt-20">
        <div className="flex items-end justify-between">
          <h2 className="text-center text-2xl font-light text-primary-500 sm:text-3xl sm:leading-[46px]">
            BASKET
          </h2>

          <a href="/shop">
            <AnimatedUnderline>
              <p className="lg:text-md text-center text-sm font-medium tracking-wider text-primary-300 sm:text-sm">
                CONTINUE MY SHOPPING
              </p>
            </AnimatedUnderline>
          </a>
        </div>
      </section>

      <section className="container mx-auto">
        <CartItem />
        <CartItem />
        <CartItem />

        <div className="mt-8 flex flex-col items-end gap-2">
          <span className="text-2xl font-medium text-primary-400">1,80€</span>
          <span className="text-sm text-primary-200">
            Shipping and discounts calculated at checkout
          </span>
        </div>
      </section>

      <div className="container mx-auto flex justify-center">
        <Button className="h-[48px] rounded-[2px] bg-[#89896E] p-1 hover:bg-hover-outline_btn">
          <Link
            to="/"
            className="flex h-full items-center rounded-[2px] border border-primary-50/40 px-5 py-1.5 text-xs font-medium"
          >
            PICK UP IN STORE
          </Link>
        </Button>
      </div>

      <FullWidthBanner
        webpImage="/images/webp/menu_banner.webp"
        jpegImage="/images/menu_banner.jpg"
      />
    </div>
  );
};

export default ShoppingCartPage;
