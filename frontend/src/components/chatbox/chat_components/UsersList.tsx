import { AvatarFallback } from "@/components/ui/avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/stores/useChatStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";
import { User } from "@/types";
// import UsersListSkeleton from "@/components/skeletons/UsersListSkeleton";

const UsersList = () => {
  const {
    users,
    selectedUser,
    setSelectedUser,
    messages,
    fetchUsers,
    notifications,
    handleClearNotifications,
  } = useChatStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, messages]);

  const handleSelectedUser = (user: User) => {
    setSelectedUser(user);
    handleClearNotifications(user);
  };

  return (
    <div className="max-h-[510px] border-r border-primary-75">
      <div className="flex flex-col">
        <ScrollArea className="">
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => handleSelectedUser(user)}
              className={`flex cursor-pointer items-center justify-center gap-3 p-3 transition-colors lg:justify-start ${
                selectedUser?.clerkId === user.clerkId ? "bg-primary-50" : "hover:bg-primary-50/50"
              }`}
            >
              <div className="relative">
                {/* notification indicator */}
                {notifications.has(user.clerkId) && notifications.get(user.clerkId)! > 0 && (
                  <div className="absolute -right-1 top-0 z-10 size-2 justify-center rounded-full bg-red-500 ring-zinc-700 lg:hidden"></div>
                )}

                <Avatar className="size-8">
                  <AvatarImage src={user.imageUrl} />
                  <AvatarFallback className="text-sm">{user.fullname[0]}</AvatarFallback>
                </Avatar>

                {/* online indicator */}
                {/* <div
                  className={`absolute bottom-0 right-0 h-2 w-2 rounded-full ring-1 ring-zinc-700 ${
                    onlineUsers.has(user.clerkId) ? "bg-green-500" : "bg-zinc-500"
                  }`}
                /> */}
              </div>

              <div className="hidden min-w-0 flex-1 lg:block">
                <span className="truncate text-sm font-medium text-primary-500">
                  {user.fullname || user.email.split("@")[0]}
                </span>
              </div>

              {notifications.has(user.clerkId) && notifications.get(user.clerkId)! > 0 && (
                <div className="hidden h-4 w-[20px] items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white lg:flex">
                  {notifications.get(user.clerkId)}
                </div>
              )}
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export default UsersList;
