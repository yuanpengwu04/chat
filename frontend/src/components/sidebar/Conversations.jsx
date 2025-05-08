import React, { useEffect, useState } from "react";
import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

const Conversations = ({ searchTerm }) => {
  const { loading, conversations } = useGetConversations();
  //console.log(conversations)
  const filteredConversations = conversations.filter((conversation) =>
    conversation.username.toLowerCase().includes(searchTerm)
  );
  //console.log(filteredConversations)
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {loading ? (
        <div className="center-container">
          <span className="loading loading-dots loading-sm"></span>
        </div>
      ) : (
        filteredConversations.map((conversation, index) => {
          return (
            <Conversation
              key={conversation._id}
              conversation={conversation}
              bar={filteredConversations.length - 1 !== index}
            />
          );
        })
      )}
    </div>
  );
};
export default Conversations;
