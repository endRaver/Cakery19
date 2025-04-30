import { map } from "lodash";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";

import CartItem from "./CartItem";

import { useCartStore } from "@/stores/useCartStore";
import AnimatedUnderline from "@/components/animation/AnimatedUnderline";
import AnimatedButton from "@/components/AnimatedButton";

const CartsCheckoutSection = ({
  setDisplayScreen,
}: {
  setDisplayScreen: (screen: "cart" | "pickup") => void;
}) => {
  const { isLoading, cartItems, handleGetCartItems } = useCartStore();

  useEffect(() => {
    handleGetCartItems();
  }, [handleGetCartItems]);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.variant.price * item.quantity, 0);

  return (
    <motion.div
      className="min-h-[500px]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.7 }}
    >
      <section className="container mx-auto mb-10 mt-20">
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

      {isLoading ? (
        <div className="my-10 flex items-center justify-center">
          <Loader2 className="h-16 w-16 animate-spin text-primary-400" />
        </div>
      ) : (
        <section className="container mx-auto">
          {cartItems.length === 0 ? (
            <div className="my-20 flex items-center justify-center">
              <p className="text-center text-sm tracking-widest text-primary-200">
                Your shopping cart is empty
              </p>
            </div>
          ) : (
            <>
              <div className="border-t border-primary-75">
                <AnimatePresence>
                  {map(cartItems, (item, index) => (
                    <CartItem key={index} cartProduct={item} />
                  ))}
                </AnimatePresence>
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
      )}

      <div className="container mx-auto flex justify-center">
        <AnimatedButton onClick={() => setDisplayScreen("pickup")} disabled={cartItems.length == 0}>
          PICK UP IN STORE
        </AnimatedButton>
      </div>
    </motion.div>
  );
};

export default CartsCheckoutSection;
