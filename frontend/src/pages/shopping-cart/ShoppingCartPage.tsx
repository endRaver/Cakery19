import { map } from "lodash";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProductStore } from "@/stores/useProductStore";
import FullWidthBanner from "@/components/FullWidthBanner";
import AnimatedUnderline from "../../components/animation/AnimatedUnderline";
import CartItem from "./components/CartItem";
import useMediaLoader from "@/hooks/useMediaLoader";
import LoadingScreen from "@/components/LoadingScreen";

const ShoppingCartPage = () => {
  const isLoadingMedia = useMediaLoader();
  const { cartProducts } = useProductStore();

  const totalPrice = cartProducts.reduce(
    (total, item) => total + (item.variant?.price ?? 0) * item.quantity,
    0
  );

  return (
    <>
      {isLoadingMedia && <LoadingScreen />}
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
          {cartProducts.length === 0 ? (
            <div className="my-20 flex items-center justify-center">
              <p className="text-center text-sm tracking-widest text-primary-200">
                Your shopping cart is empty
              </p>
            </div>
          ) : (
            <>
              <div className="border-t border-primary-75">
                {map(cartProducts, (product, index) => (
                  <CartItem key={index} cartProduct={product} />
                ))}
              </div>

              <div className="mt-8 flex flex-col items-end gap-2">
                <span className="text-2xl font-medium text-primary-400">
                  {totalPrice.toFixed(2)} CHF
                </span>
                <span className="text-sm text-primary-200">
                  Shipping and discounts calculated at checkout
                </span>
              </div>
            </>
          )}
        </section>

        <div className="container mx-auto flex justify-center">
          <Button
            className="h-[48px] rounded-[2px] bg-primary_btn p-1 hover:bg-hover-outline_btn"
            disabled={cartProducts.length == 0}
          >
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
    </>
  );
};

export default ShoppingCartPage;
