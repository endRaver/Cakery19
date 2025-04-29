import { Calendar } from "@/components/ui/calendar";

const timeSlotsDesktop = [
  "10 A.M. - 11 A.M.",
  "3 P.M. - 4 P.M.",
  "11 A.M. - 12 NOON",
  "4 P.M. - 5 P.M.",
  "12 NOON - 1 P.M.",
  "5 P.M. - 6 P.M.",
  "1 P.M. - 2 P.M.",
  "6 P.M. - 7 P.M.",
  "2 P.M. - 3 P.M.",
  "7 P.M. - 8 P.M.",
];

type CalendarSelectorProps = {
  readonly date: Date | undefined;
  readonly setDate: (date: Date | undefined) => void;
  readonly selectedSlot: string | null;
  readonly setSelectedSlot: (slot: string | null) => void;
};

export default function CalendarSelector({
  date,
  setDate,
  selectedSlot,
  setSelectedSlot,
}: CalendarSelectorProps) {
  return (
    <div className="mt-10 flex w-full justify-center">
      <div className="flex w-full max-w-[700px] flex-col items-center gap-10 md:flex-row md:gap-20">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          fromDate={new Date()}
          toDate={new Date(new Date().getFullYear(), new Date().getMonth() + 1, 31)}
          className="rounded-md font-geometria"
        />

        <div className="grid h-fit w-full grid-cols-2 gap-x-4 gap-y-2">
          {timeSlotsDesktop.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`h-fit w-full rounded border px-4 py-4 text-center text-xs font-medium leading-none tracking-widest md:px-6 ${
                selectedSlot === slot
                  ? "border-primary-400 text-primary-100"
                  : "border-primary-100 text-primary-300"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
