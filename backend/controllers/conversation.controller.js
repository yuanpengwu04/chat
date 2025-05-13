import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";

export const getConversationsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all conversations where the user is a participant
    const conversations = await Conversation.find({
      participants: userId,
    }).populate({
      path: "participants",
      select: "username fullName profilePic", // Explicitly select the fields we need
    });

    // Transform the conversations to include user details
    const transformedConversations = conversations
      .map((conversation) => {
        // Get the other participant (not the current user)
        const otherParticipant = conversation.participants.find(
          (participant) => participant._id.toString() !== userId
        );

        // If no other participant found, skip this conversation
        if (!otherParticipant) {
          console.warn(
            `No other participant found for conversation ${conversation._id}`
          );
          return null;
        }

        // Create the transformed conversation object
        const transformedConversation = {
          _id: otherParticipant._id,
          participants: conversation.participants.map((p) => ({
            _id: p._id,
            username: p.username,
            fullName: p.fullName,
            profilePic: p.profilePic,
          })),
          lastMessage:
            conversation.messages[conversation.messages.length - 1] || null,
          createdAt: conversation.createdAt,
          updatedAt: conversation.updatedAt,
          username: otherParticipant.username,
          fullName: otherParticipant.fullName,
          profilePic: otherParticipant.profilePic,
        };

        return transformedConversation;
      })
      .filter(Boolean); // Remove any null entries

    res.status(200).json(transformedConversations);
  } catch (error) {
    console.error("Error in getConversationsByUserId: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
