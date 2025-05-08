import React from "react";
import extractTime from "../../utils/extractTime";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../store/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const isSender = authUser._id === message.senderId;

  return (
    <div className={`chat ${isSender ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={`${
              isSender ? authUser.profilePic : selectedConversation.profilePic
            }`}
          />
        </div>
      </div>
      <div
        className={`chat-bubble ${
          isSender ? "text-white bg-blue-500" : "text-black"
        } ${message.shouldShake && "shake"}`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50">
        {extractTime(message.createdAt)}
      </div>
    </div>
  );
};
export default Message;
