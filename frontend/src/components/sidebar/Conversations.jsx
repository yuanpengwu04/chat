import React, { useEffect, useState } from "react";
import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();


  return (
    <div className="py-2 flex flex-col overflow-auto">
      {loading ? (
        <div className="center-container">
          <span className="loading loading-dots loading-sm"></span>
        </div>
      ) : (
        conversations.map((conversation, index) => {
          return (
            <Conversation
              key={conversation._id}
              conversation={conversation}
              bar={conversations.length - 1 !== index}
            />
          );
        })
      )}
    </div>
  );
};
export default Conversations;
