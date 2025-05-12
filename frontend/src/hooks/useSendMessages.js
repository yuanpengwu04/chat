import React, { useState } from "react";
import useConversation from "../store/useConversation";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSendMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      // Find the other participant (receiver) in the conversation
      const receiverId = selectedConversation.participants.find(
        (participant) => participant._id !== authUser._id
      )?._id;

      if (!receiverId) {
        throw new Error("Receiver not found in conversation");
      }

      const res = await fetch(`/api/messages/send/${receiverId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
};

export default useSendMessages;
