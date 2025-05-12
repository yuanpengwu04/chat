import React, { useEffect, useState } from "react";
import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

const Conversations = ({ searchTerm }) => {
  const { loading, conversations } = useGetConversations();

  const filteredConversations = conversations.filter((conversation) => {
    if (!searchTerm) return true;
    
    const searchTermLower = searchTerm.toLowerCase();
    const username = conversation.username?.toLowerCase() || '';
    const fullName = conversation.fullName?.toLowerCase() || '';
    
    // Fuzzy search implementation
    return username.includes(searchTermLower) || 
           fullName.includes(searchTermLower) ||
           // Check if search term is a substring of username or fullName
           username.split('').some((char, i) => {
             const remaining = username.slice(i);
             return remaining.startsWith(searchTermLower);
           });
  });

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
