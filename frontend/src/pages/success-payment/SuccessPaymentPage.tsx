import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useOrderStore } from "@/stores/useOrderStore";
import { CheckCircle2, Clock, Loader2, Mail, Package } from "lucide-react";

const SuccessPaymentPage = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const { currentOrder, handleCheckoutSuccess, isLoading } = useOrderStore();

  useEffect(() => {
    const handleCheckout = async () => {
      const sessionId = new URLSearchParams(window.location.search).get("session_id");
      setIsProcessing(true);

      if (sessionId) {
        await handleCheckoutSuccess(sessionId);
      }
      setIsProcessing(false);
    };

    handleCheckout();
  }, [handleCheckoutSuccess]);

  if (isProcessing || isLoading)
    return (
      <div className="flex h-[500px] items-center justify-center">
        <Loader2 className="h-20 w-20 animate-spin" color="#5f5f4e " />
      </div>
    );

  return (
    <div className="my-5 flex items-center justify-center bg-primary-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl rounded-lg bg-white p-8 text-center shadow-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-primary-50/50"></div>
            <CheckCircle2 className="relative h-20 w-20 text-primary-400" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6 text-3xl font-semibold text-primary-500"
        >
          Payment Successful!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8 text-lg text-primary-400"
        >
          Thank you for your order. Your payment has been processed successfully.
        </motion.p>

        {currentOrder && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8 rounded-lg bg-primary-50/50 p-6"
          >
            <h3 className="mb-4 text-lg font-medium text-primary-500">Order Summary</h3>
            <div className="space-y-4">
              {currentOrder.products.map((item) => (
                <div
                  key={item.product._id}
                  className="flex items-center justify-between border-b border-primary-100 pb-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-md">
                      <img
                        src={item.product.imageUrl[0]}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-primary-500">{item.product.name}</p>
                      <p className="text-sm text-primary-400">Type: {item.variant?.size}</p>
                      {item.excludeNuts && <p className="text-sm text-primary-400">Exclude Nuts</p>}
                      <p className="text-sm text-primary-400">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium text-primary-500">
                    {(item.product.variants[0].price * item.quantity).toFixed(2)} CHF
                  </p>
                </div>
              ))}
              <div className="flex justify-between border-t border-primary-200 pt-2">
                <p className="font-medium text-primary-500">Total</p>
                <p className="font-medium text-primary-500">
                  {currentOrder.totalAmount.toFixed(2)} CHF
                </p>
              </div>
              <div className="flex justify-between border-t border-primary-200 pt-2">
                <p className="font-medium text-primary-500">Pickup Date & Time</p>
                <p className="font-medium text-primary-500">
                  {new Date(currentOrder.pickupDate).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  at{" "}
                  {new Date(currentOrder.pickupDate).toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    hour12: true,
                  })}{" "}
                  -{" "}
                  {new Date(
                    new Date(currentOrder.pickupDate).getTime() + 60 * 60 * 1000
                  ).toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8 grid gap-6 rounded-lg bg-primary-50/50 p-6 sm:grid-cols-3"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-primary-100 p-3">
              <Package className="h-6 w-6 text-primary-400" />
            </div>
            <p className="font-medium text-primary-500">Order Processing</p>
            <p className="text-sm text-primary-400">Your order is being prepared</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-primary-100 p-3">
              <Clock className="h-6 w-6 text-primary-400" />
            </div>
            <p className="font-medium text-primary-500">Pick-up Time</p>
            <p className="text-sm text-primary-400">
              Your order will be ready on your selected pick-up date
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-primary-100 p-3">
              <Mail className="h-6 w-6 text-primary-400" />
            </div>
            <p className="font-medium text-primary-500">Email Confirmation</p>
            <p className="text-sm text-primary-400">Check your inbox</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col gap-4 sm:flex-row sm:justify-center"
        >
          <Link to="/" className="sm:w-48">
            <Button
              variant="outline"
              className="w-full border-primary-400 text-primary-500 hover:bg-primary-50"
            >
              Continue Shopping
            </Button>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-sm text-primary-400"
        >
          Need help? Contact me at{" "}
          <a href="mailto:Cakery19.ch@gmail.com" className="text-primary-500 hover:underline">
            Cakery19.ch@gmail.com
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SuccessPaymentPage;
