import mongoose from "mongoose";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: conversationId } = req.params;
    const senderId = req.user._id;

    // Find conversation by ID
    let conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // Get the receiver ID (the other participant)
    const receiverId = conversation.participants.find(
      (participantId) => participantId.toString() !== senderId.toString()
    );

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    // Send socket event to receiver
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: conversationId } = req.params;

    const conversation = await Conversation.findById(conversationId).populate(
      "messages"
    );

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // Verify that the requesting user is a participant
    if (!conversation.participants.includes(req.user._id)) {
      return res
        .status(403)
        .json({ error: "Not authorized to view these messages" });
    }

    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
