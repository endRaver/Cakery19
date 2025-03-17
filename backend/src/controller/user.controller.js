import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";
import { uploadToCloudinary } from "../services/cloudinaryService.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.auth.userId;

    // Aggregate pipeline to get users with their last message
    const users = await User.aggregate([
      // Exclude current user
      {
        $match: {
          clerkId: { $ne: currentUserId },
        },
      },
      // Left join with messages where user is either sender or receiver
      {
        $lookup: {
          from: "messages",
          let: { userId: "$clerkId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $or: [
                    { $eq: ["$senderId", "$$userId"] },
                    { $eq: ["$receiverId", "$$userId"] },
                  ],
                },
              },
            },
            // Sort messages by timestamp to get the latest
            { $sort: { createdAt: -1 } },
            // Take only the most recent message
            { $limit: 1 },
          ],
          as: "lastMessage",
        },
      },
      // Add field for sorting (using the timestamp of last message)
      {
        $addFields: {
          lastMessageAt: {
            $cond: {
              if: { $gt: [{ $size: "$lastMessage" }, 0] },
              then: { $arrayElemAt: ["$lastMessage.createdAt", 0] },
              else: null,
            },
          },
        },
      },
      // Sort users by last message timestamp
      {
        $sort: {
          lastMessageAt: -1,
          createdAt: -1, // Secondary sort for users with no messages
        },
      },
      // Optional: Remove the lastMessage array if you don't need it in response
      {
        $project: {
          lastMessage: 0,
          lastMessageAt: 0,
        },
      },
    ]);

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const myId = req.auth.userId;
    const { userId } = req.params;

    const message = await Message.find({
      $or: [
        { senderId: userId, receiverId: myId },
        { senderId: myId, receiverId: userId },
      ],
    })
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const totalMessages = await Message.countDocuments();
    const totalPages = Math.ceil(totalMessages / limit);

    res.status(200).json({
      message,
      totalMessages,
      totalPages,
      currentPage: Number(page),
    });
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { senderId, receiverId, text } = req.body;
    const imageFiles = req.files;
    let imageUrls = [];

    // Process images if they exist
    if (imageFiles && Object.keys(imageFiles).length > 0) {
      const filesArray = Array.isArray(imageFiles)
        ? imageFiles
        : Object.values(imageFiles);

      // Upload each image
      for (const imageFile of filesArray) {
        if (!imageFile || !imageFile.data) {
          console.error("Invalid file:", imageFile);
          continue;
        }

        try {
          const imageUrl = await uploadToCloudinary(
            imageFile,
            "Cakery19/messages"
          );
          imageUrls.push(imageUrl);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    }

    // Create new message
    const newMessage = await Message.create({
      senderId,
      receiverId,
      content: {
        text,
        images: imageUrls,
      },
    });

    // Send real-time updates
    if (newMessage) {
      const receiverSocketId = getReceiverSocketId(receiverId);

      // Send to receiver if they're online
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receive_message", newMessage);
      }

      // Send confirmation to sender
      if (req.socket) {
        req.socket.emit("message_sent", newMessage);
      }

      res.status(201).json(newMessage);
    } else {
      throw new Error("Failed to create message");
    }
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};
