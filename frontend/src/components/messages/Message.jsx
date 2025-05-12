import React from "react";
import extractTime from "../../utils/extractTime";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../store/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  
  // Check if current user is the sender
  const isSender = authUser._id === message.senderId;
  
  // Get the correct profile picture based on sender/receiver
  const profilePic = isSender ? authUser.profilePic : selectedConversation.profilePic;
  
  // Get the correct name based on sender/receiver
  const displayName = isSender ? authUser.username : selectedConversation.username;

  return (
    <div 
      className={`chat ${isSender ? "chat-end" : "chat-start"} w-full`}
      key={message._id}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt={`${displayName}'s avatar`}
            src={profilePic || "/default-avatar.png"}
          />
        </div>
      </div>
      <div className="chat-header">
        {displayName}
      </div>
      <div
        className={`chat-bubble ${
          isSender ? "text-white bg-[#8686de]" : "text-black bg-white"
        } ${message.shouldShake && "shake"}`}
        style={{
          wordWrap: "break-word",
          overflowWrap: "break-word",
          wordBreak: "break-word",
          maxWidth: "100%",
        }}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-gray-100">
        {extractTime(message.createdAt)}
      </div>
    </div>
  );
};

export default Message;
