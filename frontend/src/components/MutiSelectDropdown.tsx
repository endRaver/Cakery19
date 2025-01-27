import { ChevronDown } from "lucide-react";
import { useState } from "react";

const MultiSelectDropdown = ({
  options,
  onChange,
  selectedOptions,
}: {
  options: string[];
  selectedOptions: string[];
  onChange: (selectedOptions: string[]) => void;
}) => {
  // const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [setOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    if (selectedOptions.some((selected) => selected === option)) {
      onChange(selectedOptions.filter((selected) => selected !== option));
    } else {
      onChange([...selectedOptions, option]);
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative flex flex-wrap items-center justify-between overflow-hidden rounded border border-primary-400 pe-10">
        <div className="flex flex-wrap gap-2 rounded p-2">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option, index) => (
              <span
                key={index}
                className="mr-1 inline-flex items-center gap-2 text-nowrap rounded bg-primary-50 px-2 py-0.5 text-sm font-medium text-primary-400"
              >
                {option}
                <button
                  className="ml-1 text-primary-400 hover:text-primary-400"
                  onClick={() => handleSelect(option)}
                >
                  &times;
                </button>
              </span>
            ))
          ) : (
            <span className="text-gray-500">Select options...</span>
          )}
        </div>

        <button
          className="absolute right-0 h-full bg-primary-300 p-2"
          onClick={() => setIsOpen(!setOpen)}
        >
          <ChevronDown className="text-white" />
        </button>
      </div>

      {setOpen && (
        <div className="absolute left-0 z-10 mt-1 w-full rounded border bg-white shadow-lg">
          {options.map((option) => (
            <div
              key={option}
              className={`cursor-pointer p-2 hover:bg-gray-200 ${
                selectedOptions.some((selected) => selected === option) ? "bg-gray-100" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
