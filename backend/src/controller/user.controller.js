import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";

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
  try {
    const myId = req.auth.userId;
    const { userId } = req.params;

    const message = await Message.find({
      $or: [
        { senderId: userId, receiverId: myId },
        { senderId: myId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};
