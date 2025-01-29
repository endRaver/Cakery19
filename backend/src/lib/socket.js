import { Server } from "socket.io";
import { Message } from "../models/message.model.js";

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // frontend Url
      credentials: true,
    },
  });

  const userSockets = new Map(); // {userId: socketId}
  const userActivities = new Map(); // {userId: activity}
  const userNotifications = new Map(); // {userId: count}

  io.on("connection", (socket) => {
    socket.on("user_connected", (userId) => {
      userSockets.set(userId, socket.id);
      userActivities.set(userId, "Idle");

      // broadcast to all connected sockets that this user just logged in
      io.emit("user_connected", userId);

      socket.emit("users_online", Array.from(userSockets.keys()));
      io.emit("activities", Array.from(userActivities.entries()));
      io.emit("receive_notification", Array.from(userNotifications.entries()));
    });

    socket.on("update_activity", ({ userId, activity }) => {
      userActivities.set(userId, activity);
      io.emit("activity_updated", { userId, activity });
    });

    socket.on("send_message", async (data) => {
      try {
        const { senderId, receiverId, content } = data;

        const message = await Message.create({
          senderId,
          receiverId,
          content,
        });

        // send to receiver in realtime, if they are online
        const receiverSocketId = userSockets.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive_message", message);
        }

        socket.emit("message_sent", message);
      } catch (error) {
        console.error("Message error", error);
        socket.emit("message_error", error.message);
      }
    });

    socket.on(
    "send_notification",
      async ({ senderId, receiverId, content }) => {
        try {
          userNotifications.set(
            senderId,
            (userNotifications.get(senderId) || 0) + 1
          );

          // send to receiver in realtime, if they are online
          const receiverSocketId = userSockets.get(receiverId);
          if (receiverSocketId) {
            io.to(receiverSocketId).emit(
              "receive_notification",
              Array.from(userNotifications.entries())
            );
          }
        } catch (error) {
          console.error("Notification error", error);
        }
      }
    );

    socket.on("clear_notification", (userId) => {
      userNotifications.set(userId, 0);
      io.emit("receive_notification", Array.from(userNotifications.entries()));
    });

    socket.on("disconnect", () => {
      let disconnectedUserId;
      for (const [userId, socketId] of userSockets.entries()) {
        // find disconnected user
        if (socketId === socket.id) {
          disconnectedUserId = userId;
          userSockets.delete(userId);
          userActivities.delete(userId);
          break;
        }
      }

      if (disconnectedUserId) {
        io.emit("user_disconnected", disconnectedUserId); // send to every one that user just logged out
      }
    });
  });
};
