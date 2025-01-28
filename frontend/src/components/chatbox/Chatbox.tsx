import { MessageCircleMore, SquareChevronDownIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import UsersList from "./chat_components/UsersList";
import ChatHeader from "./chat_components/ChatHeader";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import MessageInput from "./chat_components/MessageInput";

const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const Chatbox = () => {
  const { user } = useUser();
  const { fetchUsers, fetchMessages, selectedUser, messages } = useChatStore();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user) fetchUsers();
  }, [user, fetchUsers]);

  useEffect(() => {
    if (selectedUser) fetchMessages(selectedUser.clerkId);
  }, [selectedUser, fetchMessages]);

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

      <div
        className={`border-100 fixed bottom-0 right-4 z-20 grid h-[560px] w-[700px] grid-rows-[auto_1fr] rounded-b-none rounded-t border border-primary-50 bg-white text-primary-300 shadow-2xl duration-300 ease-in-out ${isOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="flex items-center justify-between border-b border-primary-75 p-2">
          <h3 className="text-xl font-medium">Chat</h3>
          <button
            className="rounded-full p-1.5 duration-300 hover:bg-primary-75/60"
            onClick={() => setIsOpen(false)}
          >
            <SquareChevronDownIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="grid grid-cols-[200px_1fr]">
          <UsersList />

          <div className="flex h-full flex-col text-primary-500">
            {selectedUser ? (
              <>
                <ChatHeader />

                <ScrollArea className="h-[390px] overflow-auto">
                  <div className="space-y-4 p-4">
                    {messages.map((message) => (
                      <div
                        key={message._id}
                        className={`flex items-center gap-3 ${
                          message.senderId === user?.id ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded p-3 ${
                            message.senderId === user?.id
                              ? "bg-primary-300 text-white"
                              : "bg-primary-50 text-black"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <span
                            className={`mt-1 block text-[10px] text-primary-300 ${
                              message.senderId === user?.id
                                ? "bg-primary-300 text-right text-white"
                                : "bg-primary-50 text-black"
                            }`}
                          >
                            {formatTime(message.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <MessageInput />
              </>
            ) : (
              <NoConversationPlaceholder />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbox;

const NoConversationPlaceholder = () => (
  <div className="flex h-[500px] flex-col items-center justify-center space-y-6">
    <div className="flex animate-bounce items-center justify-center rounded-full bg-primary-300 p-8">
      <img src="/images/cakery_logo_light.svg" alt="Spotify" className="size-20" />
    </div>
    <div className="text-center">
      <h3 className="mb-1 text-lg font-medium">No conversation selected</h3>
      <p className="text-sm text-zinc-500">Choose a user to start chatting</p>
    </div>
  </div>
);
