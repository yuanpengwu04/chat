import { useEffect } from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import useConversation from "../../store/useConversation";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, []);
  return (
    <div className="flex-1g md:min-w-[450px] flex flex-col w-full h-full">
      {selectedConversation ? (
        <>
          {/* Header */}
          <div className="bg-[#efebf9] opacity-75 px-4 py-2 mb-2">
            <span className="label-text text-black">Chatting with:</span>{" "}
            <span className="text-gray-900 text-l font-bold px-2">
              {selectedConversation.username}
            </span>
          </div>

          <Messages />
          <MessageInput />
        </>
      ) : (
        <NoChatSelected />
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex-1g md:min-w-[450px] flex flex-col items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome to ❄Mirth, {authUser.fullName}! 👋</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
