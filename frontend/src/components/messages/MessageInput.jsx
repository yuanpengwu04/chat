import { BsSend } from "react-icons/bs";
import useSendMessages from "../../hooks/useSendMessages";
import { useState } from "react";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessages();

  function handleChange(event) {
    const value = event.target.value;

    setMessage(value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  }

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 pe-16 bg-gray-300 border-gray-600 focus:border-[#9696ee] text-gray-900"
          placeholder="Say something..."
          value={message}
          onChange={handleChange}
        />
        <button
          disabled={loading}
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center justify-center pe-3 bg-[#7676ce] opacity-75 hover:bg-[#8686de] w-[64px] rounded-r-lg border border-[#9696ee]"
        >
          {loading ? (
            <span class="loading loading-spinner loading-sm"></span>
          ) : (
            <BsSend className="text-white text-center font-bold"/>
          )}
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
