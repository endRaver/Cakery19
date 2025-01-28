import { AvatarFallback } from "@/components/ui/avatar";
import UsersListSkeleton from "@/components/skeletons/UsersListSkeleton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/stores/useChatStore";
import { ScrollArea } from "@/components/ui/scroll-area";

const UsersList = () => {
  const { users, selectedUser, isLoading, setSelectedUser, onlineUsers } = useChatStore();

  return (
    <div className="border-r border-primary-75">
      <div className="flex h-full flex-col">
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="">
            {isLoading ? (
              <UsersListSkeleton />
            ) : (
              users.map((user) => (
                <>
                  <div
                    key={user._id}
                    onClick={() => setSelectedUser(user)}
                    className={`flex cursor-pointer items-center justify-center gap-3 p-3 transition-colors lg:justify-start ${
                      selectedUser?.clerkId === user.clerkId
                        ? "bg-primary-50"
                        : "hover:bg-primary-50/50"
                    }`}
                  >
                    <div className="relative">
                      <Avatar className="size-8">
                        <AvatarImage src={user.imageUrl} />
                        <AvatarFallback className="text-sm">{user.fullname[0]}</AvatarFallback>
                      </Avatar>
                      {/* online indicator */}
                      <div
                        className={`absolute bottom-0 right-0 h-2 w-2 rounded-full ring-1 ring-zinc-700 ${
                          onlineUsers.has(user.clerkId) ? "bg-green-500" : "bg-zinc-500"
                        }`}
                      />
                    </div>

                    <div className="hidden min-w-0 flex-1 lg:block">
                      <span className="truncate font-medium text-sm text-primary-500">
                        {user.fullname || user.email.split("@")[0]}
                      </span>
                    </div>
                  </div>
                </>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default UsersList;
