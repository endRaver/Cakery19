import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { Image, Send } from "lucide-react";
import { useState } from "react";

const MessageInput = () => {
  const [newMessage, setNewMessage] = useState("");
  const { user } = useUser();
  const { selectedUser, sendMessage } = useChatStore();

  const handleSend = () => {
    if (!user || !selectedUser || !newMessage) return;
    sendMessage(selectedUser.clerkId, user.id, newMessage.trim());
    setNewMessage("");
  };

  return (
    <div className="border-t border-primary-75 p-2">
      <div className="flex gap-1">
        <Input
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="border-none bg-zinc-100"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />

        <div className="flex gap-1">
          <Button
            className="rounded-full bg-transparent px-3 text-primary-500 hover:bg-primary-50"
            onClick={handleSend}
          >
            <Image className="size-4" />
          </Button>

          <Button
            className="bg-primary-300 px-3"
            onClick={handleSend}
            disabled={!newMessage.trim()}
          >
            <Send className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
