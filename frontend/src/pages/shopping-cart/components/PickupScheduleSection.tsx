import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import CalendarSelector from "./CalendarSelector";
import { useEffect, useState } from "react";
import AnimatedButton from "@/components/AnimatedButton";

const PickupScheduleSection = ({
  setDisplayScreen,
}: {
  setDisplayScreen: (screen: "cart" | "pickup") => void;
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  useEffect(() => {
    if (date && selectedSlot) {
      combineDateAndTimeSlot(date, selectedSlot);
    }
  }, [date, selectedSlot]);

  function combineDateAndTimeSlot(date: Date, slot: string): string {
    const regex = /(\d{1,2})\s*(A\.M\.|P\.M\.)/i;
    const match = regex.exec(slot);
    if (!match) return "";

    let hour = parseInt(match[1], 10);
    const period = match[2].toUpperCase();

    if (period === "P.M." && hour !== 12) hour += 12;
    if (period === "A.M." && hour === 12) hour = 0;

    // Clone the date to avoid mutating the original
    const combined = new Date(date);
    combined.setHours(hour, 0, 0, 0);

    return combined.toISOString();
  }

  const convertToLocalTime = (date: Date | undefined): string => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <motion.div
      className="min-h-[500px]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.7 }}
    >
      <section className="container mx-auto mt-20">
        <button
          onClick={() => setDisplayScreen("cart")}
          className="flex items-center gap-2 text-sm text-primary-500"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="text-sm">Return</span>
        </button>

        <div className="space-y-2">
          <div className="w-full text-center text-sm text-primary-300">CLICK AND COLLECT</div>
          <h2 className="text-center text-2xl font-light uppercase tracking-widest text-primary-500 sm:text-3xl sm:leading-[40px]">
            Choose A Date
            <br />
            <span className="text-primary-500"> and Time</span>
          </h2>
        </div>

        <CalendarSelector
          date={date}
          setDate={setDate}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
        />

        <div
          className={`mt-10 w-full justify-center text-center text-sm text-primary-300 duration-300 ${date && selectedSlot ? "opacity-100" : "opacity-0"}`}
        >
          <p>
            Your order will be ready on{" "}
            <span className="font-medium">{convertToLocalTime(date)}</span> between{" "}
            <span className="font-medium">{selectedSlot?.toLowerCase() ?? ""}</span>
          </p>
          <p>
            <span>In order to avoid waiting times,</span> please contact us at{" "}
            <a href="tel:+41764598116" className="text-primary-500">
              +41 76 459 81 16
            </a>{" "}
            <span>before arriving.</span>
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <AnimatedButton
            onClick={() => {}}
            className="text-center"
            disabled={!date || !selectedSlot}
          >
            <p className="text-xs font-medium">MAKING PAYMENT</p>
          </AnimatedButton>
        </div>
      </section>
    </motion.div>
  );
};

export default PickupScheduleSection;
