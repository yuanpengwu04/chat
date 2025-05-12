import { useRef, useEffect } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import Message from "./Message";
import MessageSkeleton from "../skeletons/MessageSkeleton";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  const lastMessageRef = useRef();
  useListenMessages();

  useEffect(() => {
    // Scroll to the last message whenever messages change
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading ? (
        [...Array(3)].map((_, index) => <MessageSkeleton key={index} />)
      ) : (
        <div className="flex flex-col gap-2">
          {messages && messages.length > 0 ? (
            messages.map((message, index) => {
              const isLastMessage = index === messages.length - 1;
              return (
                <div 
                  key={message._id} 
                  ref={isLastMessage ? lastMessageRef : null}
                  className="w-full"
                >
                  <Message message={message} />
                </div>
              );
            })
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500">No messages yet. Start the conversation!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Messages;
