import { AvatarImage } from "@/components/ui/avatar";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { useChatStore } from "@/stores/useChatStore";

const ChatHeader = () => {
  const { selectedUser, onlineUsers } = useChatStore();

  if (!selectedUser) return null;

  return (
    <div className="border-b border-primary-75 px-4 py-2">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar>
            <AvatarImage src={selectedUser.imageUrl} />
            <AvatarFallback>{selectedUser.fullname[0]}</AvatarFallback>
          </Avatar>

          <div
            className={`absolute bottom-0 right-0 h-2 w-2 rounded-full ring-1 ring-zinc-700 ${
              onlineUsers.has(selectedUser.clerkId) ? "bg-green-500" : "bg-zinc-500"
            }`}
          />
        </div>

        <div>
          <h2 className="font-medium">{selectedUser.fullname}</h2>
          <p className="text-sm text-zinc-400">
            {onlineUsers.has(selectedUser.clerkId) ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
