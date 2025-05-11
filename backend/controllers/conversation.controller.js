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
      select: "-password", // Exclude password from the response
    });

    // Transform the conversations to include user details
    const transformedConversations = conversations.map((conversation) => {
      // Get the other participant (not the current user)
      const otherParticipant = conversation.participants.find(
        (participant) => participant._id.toString() !== userId
      );

      return {
        _id: conversation._id,
        participants: conversation.participants,
        lastMessage:
          conversation.messages[conversation.messages.length - 1] || null,
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
        // Include the other participant's details for easy access
        username: otherParticipant.username,
        fullName: otherParticipant.fullName,
        profilePic: otherParticipant.profilePic,
      };
    });

    res.status(200).json(transformedConversations);
  } catch (error) {
    console.error("Error in getConversationsByUserId: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
