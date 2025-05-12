import User from "../models/user.model.js";
import Conversation from "../models/conversation.model.js";

export const searchUsers = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const currentUserId = req.user._id; // Get current user from auth middleware

    if (!searchTerm) {
      return res.status(200).json([]);
    }

    // Create a case-insensitive regex pattern for fuzzy search
    const searchPattern = new RegExp(searchTerm, "i");

    // Search in both username and fullName fields, exclude current user
    const users = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, // Exclude current user
        {
          $or: [{ username: searchPattern }, { fullName: searchPattern }],
        },
      ],
    }).select("username fullName profilePic _id");

    // For each user, check if a conversation already exists
    const usersWithConversation = await Promise.all(
      users.map(async (user) => {
        const existingConversation = await Conversation.findOne({
          participants: { $all: [currentUserId, user._id] },
        });

        return {
          ...user.toObject(),
          conversationId: existingConversation?._id || null,
        };
      })
    );

    res.status(200).json(usersWithConversation);
  } catch (error) {
    console.error("Error in searchUsers: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
