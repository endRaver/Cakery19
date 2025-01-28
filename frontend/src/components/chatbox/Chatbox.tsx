import { MessageCircleMore, SquareChevronDownIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <Button
          className="border-100 fixed bottom-0 right-4 z-50 flex items-center gap-2 rounded-b-none rounded-t bg-primary-300 p-2 text-primary-50 shadow-2xl hover:bg-primary-400"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircleMore className="h-5 w-5" />
          Chat with Cakery19
        </Button>
      )}

      {isOpen && (
        <div className="border-100 fixed bottom-0 right-4 z-50 grid h-[560px] w-[700px] grid-rows-[auto_1fr] rounded-b-none rounded-t border border-primary-50 bg-white text-primary-300 shadow-2xl">
          <div className="flex items-center justify-between border-b border-primary-75 p-2">
            <h3 className="text-xl font-medium">Chat</h3>
            <button className="rounded-full p-1.5 duration-300 hover:bg-primary-75/60">
              <SquareChevronDownIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-[200px_1fr]">
            <div className="border-r border-primary-75">dd</div>
            <div>dd</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbox;
