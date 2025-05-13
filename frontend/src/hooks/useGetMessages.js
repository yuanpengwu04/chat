import { useEffect, useState } from "react";
import useConversation from "../store/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();

        if (data?.error) {
          throw new Error(data.error);
        }
        setMessages(data || []);
      } catch (error) {
        toast.error(error.message);
        setMessages([]); // Reset messages on error
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
    else setMessages([]); // Reset messages when no conversation is selected
  }, [selectedConversation?._id, setMessages]);

  return { loading, messages };
};

export default useGetMessages;
