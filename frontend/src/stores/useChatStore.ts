import { axiosInstance } from "@/lib/axios";
import { Message, User } from "@/types";
import { create } from "zustand";
import { io, Socket } from "socket.io-client";

interface ChatStore {
  users: User[];
  isLoading: boolean;
  isUploadingImages: boolean;
  error: string | null;
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: Set<string>;
  userActivities: Map<string, string>;
  messages: Message[];
  selectedUser: User | null;
  notifications: Map<string, number>;

  fetchUsers: () => Promise<void>;
  initSocket: (userId: string) => void;
  disconnectSocket: () => void;
  sendMessage: (receiverId: string, senderId: string, text: string, images: File[]) => void;
  fetchMessages: (userId: string) => Promise<void>;
  setSelectedUser: (user: User | null) => void;
  handleGetNotifications: () => void;
  handleClearNotifications: (user: User) => void;
}

const baseURL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/"; // backend url

const socket = io(baseURL, {
  autoConnect: false, // only connect if user is authenticated
  withCredentials: true,
});

export const useChatStore = create<ChatStore>((set, get) => ({
  users: [],
  isLoading: false,
  isUploadingImages: false,
  error: null,
  socket: socket,
  isConnected: false,
  onlineUsers: new Set(),
  userActivities: new Map(),
  messages: [],
  selectedUser: null,
  notifications: new Map(),

  setSelectedUser: (user) => set({ selectedUser: user }),

  fetchUsers: async () => {
    try {
      const response = await axiosInstance.get("/users");
      set({ users: response.data });
    } catch (error: unknown) {
      const err = error as { response: { data: { message: string } } };
      set({ error: err.response.data.message });
    }
  },

  initSocket: (userId) => {
    if (!get().isConnected) {
      socket.auth = { userId };
      socket.connect();

      socket.emit("user_connected", userId);

      socket.on("users_online", (users: string[]) => {
        set({ onlineUsers: new Set(users) });
      });

      socket.on("activities", (activities: [string, string][]) => {
        set({ userActivities: new Map(activities) });
      });

      socket.on("user_connected", (userId: string) => {
        set((state) => ({
          onlineUsers: new Set([...state.onlineUsers, userId]),
        }));
      });

      socket.on("user_disconnected", (userId: string) => {
        set((state) => {
          const newOnlineUser = new Set(state.onlineUsers);
          newOnlineUser.delete(userId);
          return { onlineUsers: newOnlineUser };
        });
      });

      socket.on("receive_message", (message: Message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });

      socket.on("message_sent", (message: Message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });

      socket.on("activity_updated", ({ userId, activity }) => {
        set((state) => {
          const newActivities = new Map(state.userActivities);
          newActivities.set(userId, activity);
          return { userActivities: newActivities };
        });
      });

      set({ isConnected: true });
    }
  },

  disconnectSocket: () => {
    if (get().isConnected) {
      socket.disconnect();
      set({ isConnected: false });
    }
  },

  sendMessage: async (receiverId, senderId, text, images) => {
    set({ isUploadingImages: true, error: null });
    const messages = get().messages;

    const formData = new FormData();
    formData.append("receiverId", receiverId);
    formData.append("senderId", senderId);
    formData.append("text", text);
    images.forEach((image, index) => {
      formData.append(`imageFiles[${index}]`, image);
    });

    try {
      const response = await axiosInstance.post(`/users/messages/${receiverId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      set({ messages: [...messages, response.data] });
    } catch (error: unknown) {
      const err = error as { response: { data: { message: string } } };
      set({ error: err.response.data.message });
    } finally {
      set({ isUploadingImages: false, error: null });
    }

    socket.emit("send_notification", { receiverId, senderId, text });
  },

  fetchMessages: async (userId: string, page = 1, limit = 10) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get(`/users/messages/${userId}`, {
        params: {
          page,
          limit,
        },
      });

      console.log(response);

      set({ messages: response.data });
    } catch (error: unknown) {
      const err = error as { response: { data: { message: string } } };
      set({ error: err.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
  handleGetNotifications: () => {
    const socket = get().socket;
    if (!socket) return;

    socket.on("receive_notification", (notification: [string, number][]) => {
      set({ notifications: new Map(notification) });
    });
  },

  handleClearNotifications: (user) => {
    const socket = get().socket;
    if (!socket) return;

    socket.emit("clear_notification", user.clerkId);
  },
}));
