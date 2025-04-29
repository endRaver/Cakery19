import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import FullWidthBanner from "@/components/FullWidthBanner";
import CartsCheckoutSection from "./components/CartsCheckoutSection";
import PickupScheduleSection from "./components/PickupScheduleSection";

const ShoppingCartPage = () => {
  const [displayScreen, setDisplayScreen] = useState<"cart" | "pickup">("cart");

  return (
    <main className="space-y-10">
      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait">
          {displayScreen === "cart" && (
            <CartsCheckoutSection key="cart" setDisplayScreen={setDisplayScreen} />
          )}
          {displayScreen === "pickup" && (
            <PickupScheduleSection key="pickup" setDisplayScreen={setDisplayScreen} />
          )}
        </AnimatePresence>
      </div>

      <FullWidthBanner
        webpImage="/images/webp/menu_banner.webp"
        jpegImage="/images/menu_banner.jpg"
      />
    </main>
  );
};

export default ShoppingCartPage;
