import { Plus } from "lucide-react";
import { useState } from "react";

import AnimatedUnderline from "@/components/animation/AnimatedUnderline";

const QuestionExpand = ({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className={`space-y-3 tracking-wider text-primary-400 duration-300 ${isOpen && "mb-4"}`}>
      <button
        className="flex cursor-pointer items-center gap-1.5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AnimatedUnderline>
          <h3 className={`text-sm duration-300 sm:text-lg ${isOpen && "font-medium"}`}>
            {question}
          </h3>
        </AnimatedUnderline>
        <Plus className={`size-4 text-[#89896E] duration-300 ${isOpen && "rotate-45"}`} />
      </button>
      <p
        className={`transition-max-height overflow-hidden text-xs duration-700 sm:text-sm ${
          isOpen ? "max-h-[80px] sm:max-h-[60px]" : "max-h-0"
        }`}
      >
        {children}
      </p>
    </li>
  );
};

export default QuestionExpand;
