import React, { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../store/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { selectedConversation, messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      console.log(newMessage);
      const sound = new Audio(notificationSound);
      sound.play();
      if (newMessage.senderId === selectedConversation._id) {
        setMessages([...messages, newMessage]);
      }
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
