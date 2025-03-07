import { Loader2Icon, MessageCircleMore, SquareChevronDownIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import UsersList from "./chat_components/UsersList";
import ChatHeader from "./chat_components/ChatHeader";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import MessageInput from "./chat_components/MessageInput";
import { useAuthStore } from "@/stores/useAuthStore";
import { find } from "lodash";
import useWindowWidth from "@/hooks/useWindowWidth";
import ContentComponent from "./chat_components/ContentComponent";

const adminEmail = "tungthanh254@gmail.com";

const Chatbox = () => {
  const { user } = useUser();
  const {
    users,
    isLoading,
    messages,
    selectedUser,
    fetchUsers,
    fetchMessages,
    setSelectedUser,
    handleGetNotifications,
  } = useChatStore();
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin } = useAuthStore();
  const windowWidth = useWindowWidth();
  const { notifications } = useChatStore();

  useEffect(() => {
    if (user) {
      fetchUsers();
      handleGetNotifications();
    }
  }, [user, fetchUsers, handleGetNotifications]);

  useEffect(() => {
    if (selectedUser) fetchMessages(selectedUser.clerkId);
  }, [selectedUser, fetchMessages]);

  useEffect(() => {
    if (!selectedUser && !isAdmin) {
      const adminUser = find(users, { email: adminEmail }) || null;
      setSelectedUser(adminUser);
    }
  }, [isAdmin, selectedUser, setSelectedUser, users]);

  return (
    <>
      {!isOpen && (
        <Button
          className="border-100 fixed bottom-0 right-0 z-20 flex items-center gap-2 rounded-b-none rounded-t bg-primary-300 p-2 text-primary-50 shadow-2xl hover:bg-primary-400 sm:right-4"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircleMore className="h-5 w-5" />
          <span>Chat {windowWidth > 640 && <span>with Us</span>}</span>

          {/* notification indicator */}
          {Array.from(notifications?.entries() || []).some(([, value]) => value > 0) && (
            <div className="absolute -right-1 -top-1 z-10 size-3 animate-bounce justify-center rounded-full bg-red-500 ring-zinc-700 lg:hidden"></div>
          )}
        </Button>
      )}

      <div
        className={`border-100 fixed bottom-0 right-0 z-20 grid h-[560px] w-[360px] grid-rows-[auto_1fr] overflow-hidden rounded-b-none rounded-t border border-primary-100 bg-white text-primary-300 shadow-2xl duration-300 ease-in-out sm:right-4 sm:w-[600px] md:w-[700px] ${isOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="flex items-center justify-between border-b border-primary-75 bg-primary-300 px-4 py-2 text-primary-50">
          <h3 className="text-xl font-medium">Chat</h3>
          <button
            className="rounded-full p-1.5 duration-300 hover:bg-primary-75/60"
            onClick={() => setIsOpen(false)}
          >
            <SquareChevronDownIcon className="h-5 w-5" />
          </button>
        </div>
        <div
          className={`grid ${isAdmin ? "grid-cols-[auto_1fr] lg:grid-cols-[200px_1fr]" : "grid-cols-[1fr]"} `}
        >
          {isAdmin && <UsersList />}

          <div className="text-primary-500">
            {selectedUser ? (
              <div className="grid max-h-[508px] grid-rows-[auto_1fr_auto]">
                <ChatHeader />

                <ScrollArea className="max-h-[390px] overflow-auto">
                  {isLoading ? (
                    <div className="flex h-[390px] items-center justify-center">
                      <Loader2Icon className="animate-spin" />
                    </div>
                  ) : (
                    <div className="h-[390px] space-y-2 p-4">
                      {messages.map((message) => (
                        <ContentComponent message={message} key={message._id} />
                      ))}
                    </div>
                  )}
                </ScrollArea>

                <MessageInput />
              </div>
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
      <img src="/images/cakery_logo_light.svg" alt="logo" className="size-20" />
    </div>
    <div className="text-center">
      <h3 className="mb-1 text-lg font-medium">No conversation selected</h3>
      <p className="text-sm text-zinc-500">Choose a user to start chatting</p>
    </div>
  </div>
);
