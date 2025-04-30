import AnimatedUnderline from "@/components/animation/AnimatedUnderline";
import { Plus } from "lucide-react";
import { useState } from "react";

const CakeSizeQuestion = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className={`space-y-3 tracking-wider text-primary-400 duration-300 ${isOpen && "mb-4"}`}>
      <div className="flex cursor-pointer items-center gap-1.5" onClick={() => setIsOpen(!isOpen)}>
        <AnimatedUnderline>
          <h3 className={`text-sm duration-300 sm:text-lg ${isOpen && "font-medium"}`}>
            How big are your cakes?
          </h3>
        </AnimatedUnderline>
        <Plus className={`size-4 text-[#89896E] duration-300 ${isOpen && "rotate-45"}`} />
      </div>
      <p
        className={`transition-max-height overflow-hidden text-xs duration-700 sm:text-sm ${
          isOpen ? "max-h-[200px]" : "max-h-0"
        }`}
      >
        <span className="mb-2 block">I offer various cake sizes as follows:</span>

        <div className="space-y-3">
          <div>
            <h4 className="mb-1 font-medium">Cakes</h4>
            <ul className="ml-2 space-y-1">
              <li>• Small size - 14 cm: Perfect for 6-8 portions</li>
              <li>• Medium size - 16 cm: Perfect for 10 portions</li>
              <li>• Large size - 18 cm: Perfect for 12 portions</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-1 font-medium">Cheesecakes</h4>
            <ul className="ml-2 space-y-1">
              <li>• Medium size - 16 cm: Perfect for 8-10 portions</li>
              <li>• Large size - 20 cm: Perfect for 12-14 portions</li>
            </ul>
          </div>
        </div>
      </p>
    </li>
  );
};

export default CakeSizeQuestion;
